import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

type CommissionRule = Database['public']['Tables']['commission_rules']['Row'];

interface FindRuleInput {
  partnerId: string;
  serviceId: string;
  packageId: string | null;
  saleAmount: number;
  now?: Date;
}

/**
 * Kural önceliği: partner-özel > paket-özel > hizmet-özel > global.
 * Birden fazla AYNI öncelik seviyesinde aktif kural eşleşirse (çakışma), hesaplama YAPILMAZ —
 * çağıran taraf bunu admin'e bildirmelidir (bkz. calculateCommissionForSale).
 */
export async function findApplicableCommissionRule(
  supabase: SupabaseClient<Database>,
  input: FindRuleInput,
): Promise<{ rule: CommissionRule | null; conflict: boolean }> {
  const now = input.now ?? new Date();
  const todayIso = now.toISOString().slice(0, 10);

  const { data: rules, error } = await supabase
    .from('commission_rules')
    .select('*')
    .eq('is_active', true)
    .or(`start_date.is.null,start_date.lte.${todayIso}`)
    .or(`end_date.is.null,end_date.gte.${todayIso}`)
    .or(`minimum_sale_amount.is.null,minimum_sale_amount.lte.${input.saleAmount}`)
    .or(`maximum_sale_amount.is.null,maximum_sale_amount.gte.${input.saleAmount}`);

  if (error || !rules) return { rule: null, conflict: false };

  const matches = rules.filter(
    (r) =>
      (r.partner_id === null || r.partner_id === input.partnerId) &&
      (r.package_id === null || r.package_id === input.packageId) &&
      (r.service_id === null || r.service_id === input.serviceId),
  );
  if (matches.length === 0) return { rule: null, conflict: false };

  const priority = (r: CommissionRule) => (r.partner_id ? 3 : r.package_id ? 2 : r.service_id ? 1 : 0);
  const maxPriority = Math.max(...matches.map(priority));
  const topMatches = matches.filter((r) => priority(r) === maxPriority);

  if (topMatches.length > 1) return { rule: null, conflict: true };
  return { rule: topMatches[0], conflict: false };
}

export function calculateCommissionAmount(baseAmount: number, rule: Pick<CommissionRule, 'commission_type' | 'commission_value'>): number {
  if (rule.commission_type === 'percentage') {
    return Math.round(((baseAmount * rule.commission_value) / 100) * 100) / 100;
  }
  return Number(rule.commission_value);
}

/**
 * Bir satış için komisyonu hesaplar ve `commissions` tablosuna snapshot olarak yazar.
 * Kural bulunamazsa veya çakışma varsa komisyon oluşturulmaz, sebep döner.
 */
export async function calculateCommissionForSale(
  supabase: SupabaseClient<Database>,
  saleId: string,
): Promise<{ ok: boolean; reason?: 'no_rule' | 'conflict' | 'error'; commissionId?: string }> {
  const { data: sale, error: saleError } = await supabase.from('sales').select('*').eq('id', saleId).single();
  if (saleError || !sale) return { ok: false, reason: 'error' };

  const { rule, conflict } = await findApplicableCommissionRule(supabase, {
    partnerId: sale.partner_id,
    serviceId: sale.service_id,
    packageId: sale.package_id,
    saleAmount: Number(sale.amount),
  });

  if (conflict) return { ok: false, reason: 'conflict' };
  if (!rule) return { ok: false, reason: 'no_rule' };

  const commissionAmount = calculateCommissionAmount(Number(sale.amount), rule);

  const { data: commission, error } = await supabase
    .from('commissions')
    .upsert(
      {
        sale_id: sale.id,
        partner_id: sale.partner_id,
        rule_id: rule.id,
        base_amount: sale.amount,
        commission_type: rule.commission_type,
        commission_value: rule.commission_value,
        commission_amount: commissionAmount,
        status: 'calculated',
        calculated_at: new Date().toISOString(),
      },
      { onConflict: 'sale_id' },
    )
    .select('id')
    .single();

  if (error || !commission) return { ok: false, reason: 'error' };
  return { ok: true, commissionId: commission.id };
}
