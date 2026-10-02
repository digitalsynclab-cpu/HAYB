import { createSupabaseServerClient } from '@/lib/supabase/server';
import { CommissionActions } from './CommissionActions';

const STATUS_LABEL: Record<string, string> = { pending: 'Bekliyor', calculated: 'Hesaplandı', approved: 'Onaylandı', payable: 'Ödemeye Hazır', paid: 'Ödendi', cancelled: 'İptal', reversed: 'Geri Alındı' };

export default async function AdminCommissionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: commissions } = await supabase
    .from('commissions')
    .select('id, commission_amount, status, calculated_at, partners(partner_code, account_holder_name, iban), sales(amount)')
    .order('calculated_at', { ascending: false })
    .limit(150);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Komisyonlar</h1>

      <div className="mt-8 space-y-3">
        {(commissions ?? []).map((c) => {
          const partner = Array.isArray(c.partners) ? c.partners[0] : c.partners;
          return (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="font-semibold">{Number(c.commission_amount).toLocaleString('tr-TR')} ₺</p>
                <p className="text-sm text-fg-muted">
                  {partner?.partner_code} · {STATUS_LABEL[c.status]} · {new Date(c.calculated_at).toLocaleDateString('tr-TR')}
                </p>
                {partner?.iban ? (
                  <p className="mt-1 text-xs text-fg-muted">
                    <span className="text-fg">{partner.account_holder_name}</span> · <span className="font-mono tracking-wide">{partner.iban}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-amber-400">IBAN henüz girilmemiş</p>
                )}
              </div>
              <CommissionActions commissionId={c.id} status={c.status} />
            </div>
          );
        })}
        {(!commissions || commissions.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz komisyon yok.</p>}
      </div>
    </main>
  );
}
