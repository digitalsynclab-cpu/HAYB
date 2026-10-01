import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewSaleForm } from './NewSaleForm';
import { MarkCompletedButton, ApproveSaleButton, RequestInfoButton, RejectSaleButton } from './SaleActionsClient';
import { StageEmailButton } from '../StageEmailButton';
import { saleStatusLabel } from '@/lib/partner/sale-status';

const SALE_STAGES: { key: string; label: string; title: string; message: string }[] = [
  { key: 'sale_received', label: 'Sipariş Alındı Maili', title: 'Siparişiniz alındı', message: 'Siparişiniz tarafımıza ulaştı, hazırlık sürecine başlıyoruz.' },
  { key: 'sale_confirmed', label: 'Onaylandı Maili', title: 'Siparişiniz onaylandı', message: 'Siparişiniz onaylandı ve hazırlanıyor.' },
  { key: 'sale_preparing', label: 'Hazırlanıyor Maili', title: 'Siparişiniz hazırlanıyor', message: 'Ekibimiz siparişiniz üzerinde çalışıyor, en kısa sürede sizinle paylaşacağız.' },
  { key: 'sale_completed', label: 'Teslim Edildi Maili', title: 'Siparişiniz tamamlandı', message: 'Siparişiniz tamamlandı ve teslim edildi. Bizi tercih ettiğiniz için teşekkür ederiz.' },
];

export default async function AdminSalesPage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: sales }, { data: partners }, { data: services }, { data: packages }] = await Promise.all([
    supabase
      .from('sales')
      .select('id, amount, currency, sale_status, created_by_role, sold_at, partners(partner_code), services(name), leads(contact_name, email)')
      .order('sold_at', { ascending: false })
      .limit(100),
    supabase.from('partners').select('id, partner_code').eq('status', 'active').order('partner_code'),
    supabase.from('services').select('id, name').eq('active', true).order('display_order'),
    supabase.from('packages').select('id, name, service_id').eq('active', true),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Satışlar</h1>

      <div className="mt-6">
        <NewSaleForm partners={partners ?? []} services={services ?? []} packages={packages ?? []} />
      </div>

      <div className="mt-8 space-y-3">
        {(sales ?? []).map((s) => {
          const partner = Array.isArray(s.partners) ? s.partners[0] : s.partners;
          const service = Array.isArray(s.services) ? s.services[0] : s.services;
          const lead = Array.isArray(s.leads) ? s.leads[0] : s.leads;
          return (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {service?.name} · {Number(s.amount).toLocaleString('tr-TR')} {s.currency}
                  </p>
                  <p className="text-sm text-fg-muted">
                    {partner?.partner_code} · {saleStatusLabel(s.sale_status)} · {s.created_by_role === 'partner' ? 'Partner satışı' : 'Admin girişi'} · {new Date(s.sold_at).toLocaleDateString('tr-TR')}
                    {lead?.contact_name && ` · Müşteri: ${lead.contact_name}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(s.sale_status === 'submitted' || s.sale_status === 'reviewing') && (
                    <>
                      <ApproveSaleButton saleId={s.id} nextStatus="approved" label="Onayla" />
                      <RequestInfoButton saleId={s.id} />
                      <RejectSaleButton saleId={s.id} />
                    </>
                  )}
                  {s.sale_status === 'information_required' && <p className="text-xs text-amber-300">Partnerden yanıt bekleniyor</p>}
                  {s.sale_status === 'approved' && <ApproveSaleButton saleId={s.id} nextStatus="payment_pending" label="Ödeme Bekleniyor İşaretle" />}
                  {s.sale_status === 'payment_pending' && <ApproveSaleButton saleId={s.id} nextStatus="paid" label="Ödeme Alındı İşaretle" />}
                  {(s.sale_status === 'paid' || s.sale_status === 'project_started' || s.sale_status === 'in_progress') && <MarkCompletedButton saleId={s.id} />}
                </div>
              </div>
              {lead?.email && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                  {SALE_STAGES.map((stage) => (
                    <StageEmailButton
                      key={stage.key}
                      toEmail={lead.email!}
                      customerName={lead.contact_name}
                      stageKey={stage.key}
                      stageTitle={stage.title}
                      message={stage.message}
                      relatedEntityType="sale"
                      relatedEntityId={s.id}
                      label={stage.label}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {(!sales || sales.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz satış yok.</p>}
      </div>
    </main>
  );
}
