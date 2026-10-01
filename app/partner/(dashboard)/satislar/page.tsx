import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { saleStatusLabel } from '@/lib/partner/sale-status';

export default async function PartnerSalesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();
  const { data: sales } = await supabase
    .from('sales')
    .select('id, amount, currency, sale_status, payment_status, sold_at, services(name)')
    .eq('partner_id', partner!.id)
    .order('sold_at', { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Satışlarım</h1>
        <Link href="/partner/satis-olustur" className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
          Yeni Satış
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Hizmet</th>
              <th className="px-4 py-3">Tutar</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {(sales ?? []).map((s) => {
              const service = Array.isArray(s.services) ? s.services[0] : s.services;
              return (
                <tr key={s.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{service?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-fg-muted">
                    {Number(s.amount).toLocaleString('tr-TR')} {s.currency}
                  </td>
                  <td className="px-4 py-3">{saleStatusLabel(s.sale_status)}</td>
                  <td className="px-4 py-3 text-fg-muted">{new Date(s.sold_at).toLocaleDateString('tr-TR')}</td>
                </tr>
              );
            })}
            {(!sales || sales.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-fg-muted">
                  Henüz satış oluşturmadınız.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
