type RankingRow = { partner_code: string; sale_count: number; total_amount: number };

export function PartnerRanking({ rows, currentPartnerCode }: { rows: RankingRow[]; currentPartnerCode?: string }) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Satış Performansı</h2>
      <p className="mt-1 text-xs text-fg-muted">Yalnızca onaylanmış satışlar sayılır. Diğer partnerlerin iletişim bilgileri gösterilmez.</p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Satış</th>
              <th className="px-4 py-3">Tutar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.partner_code} className={`border-t border-white/10 ${r.partner_code === currentPartnerCode ? 'bg-lime/10' : ''}`}>
                <td className="px-4 py-3 font-semibold text-lime">#{i + 1}</td>
                <td className="px-4 py-3">
                  {r.partner_code}
                  {r.partner_code === currentPartnerCode && <span className="ml-2 text-xs text-lime">(Siz)</span>}
                </td>
                <td className="px-4 py-3">{r.sale_count}</td>
                <td className="px-4 py-3 text-fg-muted">{Number(r.total_amount).toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
