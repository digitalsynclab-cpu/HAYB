'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';
import type { Database } from '@/types/supabase';

type SaleStatus = Database['public']['Enums']['sale_status'];

export interface AdminProductResult {
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

export async function updateProductOrderStatusAction(orderId: string, status: SaleStatus): Promise<AdminProductResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('partner_product_orders').update({ status }).eq('id', orderId);
  if (error) return { ok: false, error: error.message };
  await writeAuditLog(admin, { actorId: adminId, action: 'partner_product_order_status_changed', entityType: 'partner_product_order', entityId: orderId, newData: { status } });
  revalidatePath('/secretadmin/partner-urunleri');
  return { ok: true };
}

export async function updateProductPriceAction(_prev: AdminProductResult, formData: FormData): Promise<AdminProductResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const slug = String(formData.get('slug') || '');
  const price = Number(formData.get('price') || 0);
  if (!slug || price <= 0) return { ok: false, error: 'Geçerli bir fiyat girin.' };
  const { error } = await admin.from('partner_products').update({ price }).eq('slug', slug);
  if (error) return { ok: false, error: error.message };
  await writeAuditLog(admin, { actorId: adminId, action: 'partner_product_price_changed', entityType: 'partner_product', entityId: slug, newData: { price } });
  revalidatePath('/secretadmin/partner-urunleri');
  return { ok: true };
}
