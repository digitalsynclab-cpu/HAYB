import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { saleStatusLabel } from '@/lib/partner/sale-status';

export default async function PartnerSaleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();

  // RLS zaten partner_id eşleşmesini zorunlu kılar; burada da açıkça kontrol edip
  // başka partnerin satış id'si denenirse 404 döndürüyoruz (IDOR koruması).
  const { data: sale } = await supabase
    .from('sales')
    .select(
      'id, amount, currency, sale_status, sold_at, completed_at, partner_id, services(name), packages(name), leads(contact_name, company_name, phone, email, description), commissions(commission_amount, status)',
    )
    .eq('id', id)
    .eq('partner_id', partner!.id)
    .single();

  if (!sale) notFound();

  const { data: history } = await supabase
    .from('sale_status_history')
    .select('previous_status, new_status, created_at')
    .eq('sale_id', id)
    .order('created_at', { ascending: true });

  const service = Array.isArray(sale.services) ? sale.services[0] : sale.services;
  const pkg = Array.isArray(sale.packages) ? sale.packages[0] : sale.packages;
  const lead = Array.isArray(sale.leads) ? sale.leads[0] : sale.leads;
  const commission = Array.isArray(sale.commissions) ? sale.commissions[0] : sale.commissions;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/partner/satislar" className="text-sm text-fg-muted hover:text-fg">
        ← Satışlar
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">
            {service?.name}
            {pkg?.name && ` · ${pkg.name}`}
          </h1>
          <p className="mt-1 text-sm text-fg-muted">{Number(sale.amount).toLocaleString('tr-TR')} ₺ · {new Date(sale.sold_at).toLocaleDateString('tr-TR')}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{saleStatusLabel(sale.sale_status)}</span>
      </div>

      {sale.sale_status === 'information_required' && (
        <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-200">
          Bu satış için HAYB ekibi ek bilgi istedi. Detayı bildirimlerinizde görebilir, gerekirse Destek üzerinden iletebilirsiniz.
          <Link href="/partner/destek" className="ml-2 font-semibold underline">
            Destek&apos;e Git
          </Link>
        </div>
      )}

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Müşteri Bilgileri</p>
        <div className="mt-2 space-y-1 text-sm">
          <p>{lead?.contact_name}{lead?.company_name && ` · ${lead.company_name}`}</p>
          {lead?.phone && <p className="text-fg-muted">{lead.phone}</p>}
          {lead?.email && <p className="text-fg-muted">{lead.email}</p>}
          {lead?.description && <p className="mt-2 whitespace-pre-line text-fg-muted">{lead.description}</p>}
        </div>
      </section>

      {commission && (
        <section className="mt-4 rounded-2xl border border-lime/25 bg-lime/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-lime">Komisyon</p>
          <p className="mt-2 text-lg font-semibold">{Number(commission.commission_amount).toLocaleString('tr-TR')} ₺</p>
        </section>
      )}

      <section className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-fg-muted">Zaman Çizelgesi</p>
        <div className="space-y-2">
          {(history ?? []).map((h, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm">
              <span className="text-lime">{saleStatusLabel(h.new_status)}</span>
              <span className="ml-auto text-xs text-fg-muted">{new Date(h.created_at).toLocaleString('tr-TR')}</span>
            </div>
          ))}
          {(!history || history.length === 0) && <p className="text-sm text-fg-muted">Henüz durum değişikliği yok.</p>}
        </div>
      </section>
    </div>
  );
}
