'use server';

import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface DownloadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

/**
 * Partnerin dataset'e yetkili olup olmadığını server-side doğrular (frontend görünürlüğüne güvenilmez),
 * sonra kısa ömürlü bir signed URL döner. Dosya hiçbir zaman public hale getirilmez.
 */
export async function requestDatasetDownloadAction(datasetId: string): Promise<DownloadResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { data: partner } = await supabase.from('partners').select('id, status').eq('profile_id', user.id).single();
  if (!partner || partner.status !== 'active') return { ok: false, error: 'Partner hesabınız aktif değil.' };

  const admin = createSupabaseAdminClient();

  const { data: access } = await admin.from('dataset_access').select('id').eq('dataset_id', datasetId).eq('partner_id', partner.id).maybeSingle();
  if (!access) return { ok: false, error: 'Bu dataset için erişiminiz yok.' };

  const { data: dataset } = await admin.from('datasets').select('id, is_active, file_path').eq('id', datasetId).single();
  if (!dataset || !dataset.is_active) return { ok: false, error: 'Dataset bulunamadı veya pasif.' };
  if (!dataset.file_path) return { ok: false, error: 'Bu dataset için henüz dosya yüklenmedi.' };

  const { data: signed, error: signError } = await admin.storage.from('customer-datasets').createSignedUrl(dataset.file_path, 60);
  if (signError || !signed) return { ok: false, error: 'İndirme bağlantısı oluşturulamadı.' };

  await writeAuditLog(admin, { actorId: user.id, action: 'dataset_downloaded', entityType: 'dataset', entityId: datasetId });

  return { ok: true, url: signed.signedUrl };
}
