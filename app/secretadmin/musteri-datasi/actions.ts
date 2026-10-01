'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface DatasetActionResult {
  ok: boolean;
  error?: string;
}

const ALLOWED_MIME = new Set([
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .xls
  'text/csv',
]);
const ALLOWED_EXT = new Set(['xlsx', 'xls', 'csv']);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

async function requireAdminId() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Yetkisiz.');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') throw new Error('Yetkisiz.');
  return user.id;
}

function sanitizeFileName(name: string): string {
  const base = name.normalize('NFKD').replace(/[^\w.\-]/g, '_');
  return base.slice(-100);
}

export async function createDatasetAction(_prev: DatasetActionResult, formData: FormData): Promise<DatasetActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim() || null;
  const sector = String(formData.get('sector') || '').trim() || null;
  const city = String(formData.get('city') || '').trim() || null;
  const district = String(formData.get('district') || '').trim() || null;
  const recordCount = formData.get('recordCount') ? Number(formData.get('recordCount')) : null;
  const file = formData.get('file') as File | null;

  if (!name) return { ok: false, error: 'Dataset adı zorunludur.' };

  let filePath: string | null = null;
  let fileName: string | null = null;
  let fileSize: number | null = null;
  let mimeType: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED_EXT.has(ext) || (file.type && !ALLOWED_MIME.has(file.type))) {
      return { ok: false, error: 'Yalnızca .xlsx, .xls veya .csv dosyaları yüklenebilir.' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { ok: false, error: 'Dosya 10 MB sınırını aşıyor.' };
    }
    const safeName = sanitizeFileName(file.name);
    const path = `${crypto.randomUUID()}/${safeName}`;
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await admin.storage.from('customer-datasets').upload(path, arrayBuffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });
    if (uploadError) return { ok: false, error: `Dosya yüklenemedi: ${uploadError.message}` };

    filePath = path;
    fileName = file.name.slice(0, 200);
    fileSize = file.size;
    mimeType = file.type || null;
  }

  const { data: dataset, error } = await admin
    .from('datasets')
    .insert({
      name,
      description,
      sector,
      city,
      district,
      record_count: recordCount,
      file_path: filePath,
      file_name: fileName,
      file_size: fileSize,
      mime_type: mimeType,
      created_by: adminId,
    })
    .select('id')
    .single();

  if (error || !dataset) return { ok: false, error: 'Dataset oluşturulamadı.' };

  await writeAuditLog(admin, { actorId: adminId, action: 'dataset_created', entityType: 'dataset', entityId: dataset.id, newData: { name } });
  revalidatePath('/secretadmin/musteri-datasi');
  return { ok: true };
}

export async function toggleDatasetActiveAction(id: string, active: boolean): Promise<DatasetActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('datasets').update({ is_active: active }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  await writeAuditLog(admin, { actorId: adminId, action: 'dataset_visibility_changed', entityType: 'dataset', entityId: id, newData: { active } });
  revalidatePath('/secretadmin/musteri-datasi');
  return { ok: true };
}

export async function deleteDatasetAction(id: string): Promise<DatasetActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const { data: dataset } = await admin.from('datasets').select('file_path').eq('id', id).single();
  if (dataset?.file_path) {
    await admin.storage.from('customer-datasets').remove([dataset.file_path]);
  }
  const { error } = await admin.from('datasets').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };

  await writeAuditLog(admin, { actorId: adminId, action: 'dataset_deleted', entityType: 'dataset', entityId: id });
  revalidatePath('/secretadmin/musteri-datasi');
  return { ok: true };
}

export async function grantDatasetAccessAction(_prev: DatasetActionResult, formData: FormData): Promise<DatasetActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const datasetId = String(formData.get('datasetId') || '');
  const partnerId = String(formData.get('partnerId') || '');
  if (!datasetId || !partnerId) return { ok: false, error: 'Dataset ve partner seçimi zorunlu.' };

  const { error } = await admin.from('dataset_access').insert({ dataset_id: datasetId, partner_id: partnerId, granted_by: adminId });
  if (error) {
    if (error.code === '23505') return { ok: false, error: 'Bu partnerin zaten erişimi var.' };
    return { ok: false, error: error.message };
  }

  await writeAuditLog(admin, { actorId: adminId, action: 'dataset_access_granted', entityType: 'dataset', entityId: datasetId, newData: { partnerId } });
  revalidatePath('/secretadmin/musteri-datasi');
  return { ok: true };
}

export async function revokeDatasetAccessAction(accessId: string): Promise<DatasetActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('dataset_access').delete().eq('id', accessId);
  if (error) return { ok: false, error: error.message };
  await writeAuditLog(admin, { actorId: adminId, action: 'dataset_access_revoked', entityType: 'dataset_access', entityId: accessId });
  revalidatePath('/secretadmin/musteri-datasi');
  return { ok: true };
}
