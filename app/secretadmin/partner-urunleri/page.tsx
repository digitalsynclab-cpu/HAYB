import { createSupabaseServerClient } from '@/lib/supabase/server';
import { saleStatusLabel } from '@/lib/partner/sale-status';
import { OrderStatusSelect, PriceEditForm } from './PartnerProductsClient';

export default async function AdminPartnerProductsPage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: products }, { data: orders }] = await Promise.all([
    supabase.from('partner_products').select('slug, name, price, is_active').order('price'),
    supabase
      .from('partner_product_orders')
      .select('id, product_name, price, status, form_data, created_at, partners(partner_code)')
      .order('created_at', { ascending: false }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Partnerine Özel Ürünler</h1>
      <p className="mt-1 text-sm text-fg-muted">Partner Start / Partner Premium fiyatları ve gelen talepler.</p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {(products ?? []).map((p) => (
          <div key={p.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold">{p.name}</p>
            <div className="mt-2">
              <PriceEditForm slug={p.slug} price={Number(p.price)} />
            </div>
          </div>
        ))}
      </section>

      <h2 className="mt-10 text-lg font-bold">Talepler</h2>
      <div className="mt-4 space-y-3">
        {(orders ?? []).map((o) => {
          const partner = Array.isArray(o.partners) ? o.partners[0] : o.partners;
          const form = (o.form_data ?? {}) as Record<string, string>;
          return (
            <div key={o.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {o.product_name} · {Number(o.price).toLocaleString('tr-TR')} ₺
                  </p>
                  <p className="text-xs text-fg-muted">
                    {partner?.partner_code} · {new Date(o.created_at).toLocaleDateString('tr-TR')} · {saleStatusLabel(o.status)}
                  </p>
                </div>
                <OrderStatusSelect orderId={o.id} status={o.status} />
              </div>
              <div className="mt-3 grid gap-1 text-sm text-fg-muted sm:grid-cols-2">
                {Object.entries(form).map(([k, v]) => (
                  <p key={k}>
                    <span className="text-fg">{k}:</span> {String(v)}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
        {(!orders || orders.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz talep yok.</p>}
      </div>
    </main>
  );
}
