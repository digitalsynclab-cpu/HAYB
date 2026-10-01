'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface PackageActionResult {
  ok: boolean;
  error?: string;
}

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

export async function updatePackageAction(_prev: PackageActionResult, formData: FormData): Promise<PackageActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const id = String(formData.get('id') || '');
  const name = String(formData.get('name') || '').trim();
  const price = Number(formData.get('price') || 0);
  const active = formData.get('active') === 'on';

  if (!id || !name || price < 0) return { ok: false, error: 'Geçerli bir isim ve fiyat girin.' };

  const { error } = await admin.from('packages').update({ name, price, active }).eq('id', id);
  if (error) return { ok: false, error: error.message };

  await writeAuditLog(admin, { actorId: adminId, action: 'package_updated', entityType: 'package', entityId: id, newData: { name, price, active } });
  revalidatePath('/secretadmin/paketler');
  return { ok: true };
}

export async function createPackageAction(_prev: PackageActionResult, formData: FormData): Promise<PackageActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const serviceId = String(formData.get('serviceId') || '');
  const name = String(formData.get('name') || '').trim();
  const price = Number(formData.get('price') || 0);

  if (!serviceId || !name || price < 0) return { ok: false, error: 'Hizmet, isim ve geçerli bir fiyat gerekli.' };

  const { data: pkg, error } = await admin.from('packages').insert({ service_id: serviceId, name, price, active: true }).select('id').single();
  if (error) return { ok: false, error: error.message };

  await writeAuditLog(admin, { actorId: adminId, action: 'package_created', entityType: 'package', entityId: pkg.id, newData: { name, price } });
  revalidatePath('/secretadmin/paketler');
  return { ok: true };
}

export async function updateServiceActiveAction(serviceId: string, active: boolean): Promise<PackageActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('services').update({ active }).eq('id', serviceId);
  if (error) return { ok: false, error: error.message };
  await writeAuditLog(admin, { actorId: adminId, action: 'service_visibility_changed', entityType: 'service', entityId: serviceId, newData: { active } });
  revalidatePath('/secretadmin/paketler');
  return { ok: true };
}
