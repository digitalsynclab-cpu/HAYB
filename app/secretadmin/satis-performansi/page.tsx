import { createSupabaseServerClient } from '@/lib/supabase/server';

const APPROVED_STATUSES = ['approved', 'payment_pending', 'paid', 'project_started', 'in_progress', 'completed'];
const PENDING_STATUSES = ['submitted', 'reviewing', 'information_required'];
const REJECTED_STATUSES = ['rejected', 'cancelled'];

export default async function AdminSalesPerformancePage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: partners }, { data: sales }, { data: commissions }] = await Promise.all([
    supabase.from('partners').select('id, partner_code, is_demo, status'),
    supabase.from('sales').select('partner_id, amount, sale_status, is_demo, sold_at'),
    supabase.from('commissions').select('partner_id, commission_amount, status, is_demo'),
  ]);

  const rows = (partners ?? [])
    .map((p) => {
      const partnerSales = (sales ?? []).filter((s) => s.partner_id === p.id);
      const approved = partnerSales.filter((s) => APPROVED_STATUSES.includes(s.sale_status));
      const pending = partnerSales.filter((s) => PENDING_STATUSES.includes(s.sale_status));
      const rejected = partnerSales.filter((s) => REJECTED_STATUSES.includes(s.sale_status));
      const partnerCommissions = (commissions ?? []).filter((c) => c.partner_id === p.id);
      const approvedCommission = partnerCommissions.filter((c) => c.status === 'approved' || c.status === 'payable').reduce((s, c) => s + Number(c.commission_amount), 0);
      const paidCommission = partnerCommissions.filter((c) => c.status === 'paid').reduce((s, c) => s + Number(c.commission_amount), 0);
      const lastSale = partnerSales.slice().sort((a, b) => new Date(b.sold_at).getTime() - new Date(a.sold_at).getTime())[0];
      return {
        partnerCode: p.partner_code,
        isDemo: p.is_demo,
        status: p.status,
        totalSales: partnerSales.length,
        approvedSales: approved.length,
        pendingSales: pending.length,
        rejectedSales: rejected.length,
        totalAmount: approved.reduce((s, c) => s + Number(c.amount), 0),
        approvedCommission,
        paidCommission,
        lastSaleAt: lastSale?.sold_at,
      };
    })
    .filter((r) => r.totalSales > 0)
    .sort((a, b) => b.approvedSales - a.approvedSales);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Satış Performansı</h1>
      <p className="mt-1 text-sm text-fg-muted">Demo partnerler (is_demo) açıkça etiketlenir; gerçek iş kararlarında filtrelenmelidir.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Toplam</th>
              <th className="px-4 py-3">Onaylı</th>
              <th className="px-4 py-3">Bekleyen</th>
              <th className="px-4 py-3">Reddedilen</th>
              <th className="px-4 py-3">Onaylı Tutar</th>
              <th className="px-4 py-3">Onaylı Komisyon</th>
              <th className="px-4 py-3">Ödenen Komisyon</th>
              <th className="px-4 py-3">Son Satış</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.partnerCode} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">
                  {r.partnerCode}
                  {r.isDemo && <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase text-fg-muted">Demo</span>}
                </td>
                <td className="px-4 py-3">{r.totalSales}</td>
                <td className="px-4 py-3 text-lime">{r.approvedSales}</td>
                <td className="px-4 py-3">{r.pendingSales}</td>
                <td className="px-4 py-3 text-red-300">{r.rejectedSales}</td>
                <td className="px-4 py-3 text-fg-muted">{r.totalAmount.toLocaleString('tr-TR')} ₺</td>
                <td className="px-4 py-3 text-fg-muted">{r.approvedCommission.toLocaleString('tr-TR')} ₺</td>
                <td className="px-4 py-3 text-fg-muted">{r.paidCommission.toLocaleString('tr-TR')} ₺</td>
                <td className="px-4 py-3 text-fg-muted">{r.lastSaleAt ? new Date(r.lastSaleAt).toLocaleDateString('tr-TR') : '—'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-fg-muted">
                  Henüz satış kaydı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
