import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewRuleForm } from './NewRuleForm';
import { RuleToggle } from './RuleToggle';
import { RuleValueEdit } from './RuleValueEdit';

export default async function AdminCommissionRulesPage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: rules }, { data: services }, { data: partners }] = await Promise.all([
    supabase.from('commission_rules').select('id, name, commission_type, commission_value, is_active, services(name), packages(name), partners(partner_code)').order('created_at', { ascending: false }),
    supabase.from('services').select('id, name').eq('active', true).order('display_order'),
    supabase.from('partners').select('id, partner_code').eq('status', 'active').order('partner_code'),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Komisyon Kuralları</h1>
      <p className="mt-1 text-sm text-fg-muted">Öncelik: partner-özel &gt; paket-özel &gt; hizmet-özel &gt; global. Birden fazla aynı seviyede kural çakışırsa satış tamamlandığında uyarı verilir.</p>

      <div className="mt-6">
        <NewRuleForm services={services ?? []} partners={partners ?? []} />
      </div>

      <div className="mt-8 space-y-3">
        {(rules ?? []).map((r) => {
          const service = Array.isArray(r.services) ? r.services[0] : r.services;
          const pkg = Array.isArray(r.packages) ? r.packages[0] : r.packages;
          const partner = Array.isArray(r.partners) ? r.partners[0] : r.partners;
          return (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-fg-muted">
                  {r.commission_type === 'percentage' ? `%${r.commission_value}` : `${r.commission_value} ₺`}
                  {service && ` · ${service.name}`}
                  {pkg && ` · ${pkg.name}`}
                  {partner && ` · ${partner.partner_code}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <RuleValueEdit ruleId={r.id} commissionType={r.commission_type} commissionValue={Number(r.commission_value)} />
                <RuleToggle ruleId={r.id} isActive={r.is_active} />
              </div>
            </div>
          );
        })}
        {(!rules || rules.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz komisyon kuralı tanımlanmadı.</p>}
      </div>
    </main>
  );
}
