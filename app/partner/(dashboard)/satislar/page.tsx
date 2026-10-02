import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { SalesList } from './SalesList';

export default async function PartnerSalesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();
  const { data: sales } = await supabase
    .from('sales')
    .select('id, amount, currency, sale_status, sold_at, services(name), leads(contact_name)')
    .eq('partner_id', partner!.id)
    .order('sold_at', { ascending: false });

  const rows = (sales ?? []).map((s) => {
    const service = Array.isArray(s.services) ? s.services[0] : s.services;
    const lead = Array.isArray(s.leads) ? s.leads[0] : s.leads;
    return { id: s.id, amount: Number(s.amount), currency: s.currency, sale_status: s.sale_status, sold_at: s.sold_at, serviceName: service?.name ?? null, customerName: lead?.contact_name ?? null };
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Satışlar</h1>
        <Link href="/partner/satis-olustur" className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
          + Yeni Satış
        </Link>
      </div>
      <div className="mt-6">
        <SalesList sales={rows} />
      </div>
    </div>
  );
}
