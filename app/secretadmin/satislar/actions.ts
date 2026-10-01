'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { calculateCommissionForSale } from '@/lib/partner/commission-engine';
import { writeAuditLog } from '@/lib/partner/audit';
import type { Database } from '@/types/supabase';

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

export interface SaleActionResult {
  ok: boolean;
  error?: string;
}

export async function createSaleAction(_prev: SaleActionResult, formData: FormData): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const leadId = String(formData.get('leadId') || '') || null;
  const partnerId = String(formData.get('partnerId') || '');
  const serviceId = String(formData.get('serviceId') || '');
  const packageId = String(formData.get('packageId') || '') || null;
  const amount = Number(formData.get('amount') || 0);

  if (!partnerId || !serviceId || !amount || amount <= 0) return { ok: false, error: 'Partner, hizmet ve geçerli bir tutar gerekli.' };

  const { error } = await admin.from('sales').insert({
    lead_id: leadId,
    partner_id: partnerId,
    service_id: serviceId,
    package_id: packageId,
    amount,
    sale_status: 'submitted',
    created_by_role: 'admin',
    payment_status: 'unpaid',
    created_by: adminId,
  });
  if (error) return { ok: false, error: error.message };

  await writeAuditLog(admin, { actorId: adminId, action: 'sale_created', entityType: 'sale' });
  revalidatePath('/secretadmin/satislar');
  return { ok: true };
}

type SaleStatus = Database['public']['Enums']['sale_status'];

const ADMIN_SALE_TRANSITIONS = ['reviewing', 'approved', 'payment_pending', 'paid', 'project_started', 'in_progress'] as const;

export async function updateSaleStatusAction(saleId: string, nextStatus: (typeof ADMIN_SALE_TRANSITIONS)[number]): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  if (!ADMIN_SALE_TRANSITIONS.includes(nextStatus)) return { ok: false, error: 'Geçersiz durum.' };
  const target: SaleStatus = nextStatus;

  const { data: sale } = await admin.from('sales').select('sale_status').eq('id', saleId).single();
  if (!sale) return { ok: false, error: 'Satış bulunamadı.' };

  await admin.from('sales').update({ sale_status: target }).eq('id', saleId);
  await admin.from('sale_status_history').insert({ sale_id: saleId, previous_status: sale.sale_status, new_status: target, changed_by: adminId });
  await writeAuditLog(admin, { actorId: adminId, action: 'sale_status_changed', entityType: 'sale', entityId: saleId, newData: { status: target } });

  revalidatePath('/secretadmin/satislar');
  return { ok: true };
}

export async function requestSaleInformationAction(saleId: string, formData: FormData): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const message = String(formData.get('message') || '').trim();
  if (!message) return { ok: false, error: 'Partnere iletilecek bir mesaj girin.' };

  const { data: sale } = await admin.from('sales').select('sale_status, partner_id').eq('id', saleId).single();
  if (!sale) return { ok: false, error: 'Satış bulunamadı.' };

  await admin.from('sales').update({ sale_status: 'information_required' }).eq('id', saleId);
  await admin.from('sale_status_history').insert({ sale_id: saleId, previous_status: sale.sale_status, new_status: 'information_required', changed_by: adminId });

  const { data: partner } = await admin.from('partners').select('profile_id').eq('id', sale.partner_id).single();
  if (partner) {
    await admin.from('notifications').insert({
      profile_id: partner.profile_id,
      title: 'Satışınız için ek bilgi gerekiyor',
      body: message,
      type: 'sale_information_required',
      metadata: { sale_id: saleId },
    });
  }

  await writeAuditLog(admin, { actorId: adminId, action: 'sale_information_requested', entityType: 'sale', entityId: saleId, newData: { message } });
  revalidatePath('/secretadmin/satislar');
  return { ok: true };
}

export async function rejectSaleAction(saleId: string, formData: FormData): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const reason = String(formData.get('reason') || '').trim();
  if (!reason) return { ok: false, error: 'Reddetme nedeni zorunludur.' };

  const { data: sale } = await admin.from('sales').select('sale_status, partner_id').eq('id', saleId).single();
  if (!sale) return { ok: false, error: 'Satış bulunamadı.' };

  await admin.from('sales').update({ sale_status: 'rejected' }).eq('id', saleId);
  await admin.from('sale_status_history').insert({ sale_id: saleId, previous_status: sale.sale_status, new_status: 'rejected', changed_by: adminId });

  const { data: partner } = await admin.from('partners').select('profile_id').eq('id', sale.partner_id).single();
  if (partner) {
    await admin.from('notifications').insert({
      profile_id: partner.profile_id,
      title: 'Satışınız reddedildi',
      body: reason,
      type: 'sale_rejected',
      metadata: { sale_id: saleId },
    });
  }

  await writeAuditLog(admin, { actorId: adminId, action: 'sale_rejected', entityType: 'sale', entityId: saleId, newData: { reason } });
  revalidatePath('/secretadmin/satislar');
  return { ok: true };
}

export async function markSaleCompletedAction(saleId: string): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const { data: sale } = await admin.from('sales').select('sale_status').eq('id', saleId).single();
  if (!sale) return { ok: false, error: 'Satış bulunamadı.' };

  await admin.from('sales').update({ sale_status: 'completed', payment_status: 'paid', completed_at: new Date().toISOString() }).eq('id', saleId);
  await admin.from('sale_status_history').insert({ sale_id: saleId, previous_status: sale.sale_status, new_status: 'completed', changed_by: adminId });

  const commissionResult = await calculateCommissionForSale(admin, saleId);
  await writeAuditLog(admin, { actorId: adminId, action: 'sale_completed', entityType: 'sale', entityId: saleId, newData: { commissionResult } });

  revalidatePath('/secretadmin/satislar');
  revalidatePath('/secretadmin/komisyonlar');

  if (!commissionResult.ok) {
    const reasonLabel = commissionResult.reason === 'conflict' ? 'Birden fazla komisyon kuralı eşleşti.' : commissionResult.reason === 'no_rule' ? 'Uygun komisyon kuralı bulunamadı.' : 'Komisyon hesaplanamadı.';
    return { ok: false, error: `Satış tamamlandı ancak komisyon hesaplanmadı: ${reasonLabel}` };
  }
  return { ok: true };
}

export async function approveCommissionAction(commissionId: string): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const { data: commission } = await admin.from('commissions').select('status').eq('id', commissionId).single();
  if (!commission) return { ok: false, error: 'Komisyon bulunamadı.' };

  await admin.from('commissions').update({ status: 'approved', approved_at: new Date().toISOString(), approved_by: adminId }).eq('id', commissionId);
  await admin.from('commission_status_history').insert({ commission_id: commissionId, previous_status: commission.status, new_status: 'approved', changed_by: adminId });
  await writeAuditLog(admin, { actorId: adminId, action: 'commission_approved', entityType: 'commission', entityId: commissionId });
  revalidatePath('/secretadmin/komisyonlar');
  return { ok: true };
}

export async function markCommissionPaidAction(commissionId: string, formData: FormData): Promise<SaleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  const { data: commission } = await admin.from('commissions').select('status').eq('id', commissionId).single();
  if (!commission) return { ok: false, error: 'Komisyon bulunamadı.' };

  const paymentMethod = String(formData.get('paymentMethod') || '');
  const paymentReference = String(formData.get('paymentReference') || '');
  const note = String(formData.get('note') || '');

  await admin.from('commissions').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', commissionId);
  await admin.from('commission_payments').insert({ commission_id: commissionId, payment_method: paymentMethod || null, payment_reference: paymentReference || null, note: note || null, created_by: adminId });
  await admin.from('commission_status_history').insert({ commission_id: commissionId, previous_status: commission.status, new_status: 'paid', changed_by: adminId });
  await writeAuditLog(admin, { actorId: adminId, action: 'commission_paid', entityType: 'commission', entityId: commissionId });
  revalidatePath('/secretadmin/komisyonlar');
  return { ok: true };
}
