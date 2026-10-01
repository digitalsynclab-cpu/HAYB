'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

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

export interface RuleActionResult {
  ok: boolean;
  error?: string;
}

export async function createCommissionRuleAction(_prev: RuleActionResult, formData: FormData): Promise<RuleActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const name = String(formData.get('name') || '').trim();
  const commissionType = String(formData.get('commissionType') || '');
  const commissionValue = Number(formData.get('commissionValue') || 0);
  const serviceId = String(formData.get('serviceId') || '') || null;
  const packageId = String(formData.get('packageId') || '') || null;
  const partnerId = String(formData.get('partnerId') || '') || null;
  const minimumSaleAmount = formData.get('minimumSaleAmount') ? Number(formData.get('minimumSaleAmount')) : null;
  const maximumSaleAmount = formData.get('maximumSaleAmount') ? Number(formData.get('maximumSaleAmount')) : null;

  if (!name || (commissionType !== 'percentage' && commissionType !== 'fixed') || !commissionValue) {
    return { ok: false, error: 'Kural adı, komisyon tipi ve değeri gerekli.' };
  }
  if (commissionType === 'percentage' && (commissionValue < 0 || commissionValue > 100)) {
    return { ok: false, error: 'Yüzde değeri 0-100 arasında olmalı.' };
  }

  const { error } = await admin.from('commission_rules').insert({
    name,
    commission_type: commissionType,
    commission_value: commissionValue,
    service_id: serviceId,
    package_id: packageId,
    partner_id: partnerId,
    minimum_sale_amount: minimumSaleAmount,
    maximum_sale_amount: maximumSaleAmount,
    is_active: true,
    created_by: adminId,
  });
  if (error) return { ok: false, error: error.message };

  await writeAuditLog(admin, { actorId: adminId, action: 'commission_rule_created', entityType: 'commission_rule' });
  revalidatePath('/secretadmin/komisyon-kurallari');
  return { ok: true };
}

export async function toggleCommissionRuleAction(ruleId: string, isActive: boolean) {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  await admin.from('commission_rules').update({ is_active: isActive }).eq('id', ruleId);
  await writeAuditLog(admin, { actorId: adminId, action: isActive ? 'commission_rule_activated' : 'commission_rule_deactivated', entityType: 'commission_rule', entityId: ruleId });
  revalidatePath('/secretadmin/komisyon-kurallari');
}
