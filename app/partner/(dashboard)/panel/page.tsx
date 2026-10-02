import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { saleStatusLabel } from '@/lib/partner/sale-status';
import { PartnerRanking } from './PartnerRanking';
import { PartnerBadgeCard } from '@/components/partner/PartnerBadgeGallery';

const REVIEWING_STATUSES = ['submitted', 'reviewing'] as const;
const IN_PROGRESS_STATUSES = ['approved', 'payment_pending', 'paid', 'project_started', 'in_progress'] as const;

export default async function PartnerDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id, partner_code').eq('profile_id', user!.id).single();
  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user!.id).single();

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [monthSales, reviewing, inProgress, waitingSupport, infoRequired, recentSales, commissions, ranking] = await Promise.all([
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).gte('sold_at', monthStart.toISOString()),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).in('sale_status', REVIEWING_STATUSES),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).in('sale_status', IN_PROGRESS_STATUSES),
    supabase.from('support_tickets').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).eq('status', 'waiting_partner'),
    supabase
      .from('sales')
      .select('id, amount, services(name), leads(contact_name)')
      .eq('partner_id', partner!.id)
      .eq('sale_status', 'information_required'),
    supabase.from('sales').select('id, amount, currency, sale_status, sold_at, services(name)').eq('partner_id', partner!.id).order('sold_at', { ascending: false }).limit(5),
    supabase.from('commissions').select('commission_amount, status, calculated_at').eq('partner_id', partner!.id),
    supabase.rpc('get_partner_ranking', { limit_count: 5 }),
  ]);

  const monthCommission = (commissions.data ?? [])
    .filter((c) => new Date(c.calculated_at) >= monthStart)
    .reduce((s, c) => s + Number(c.commission_amount), 0);

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Partner';

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Hoş geldin, {firstName}.</h1>

      <Link href="/partner/satis-olustur" className="mt-6 block rounded-xl bg-lime px-6 py-4 text-center text-base font-semibold text-ink-950 hover:bg-lime-soft">
        + Yeni Satış
      </Link>

      <section className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl font-bold text-lime">{monthSales.count ?? 0}</p>
          <p className="mt-1 text-sm text-fg-muted">Bu Ay Satış</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl font-bold text-lime">{monthCommission.toLocaleString('tr-TR')} ₺</p>
          <p className="mt-1 text-sm text-fg-muted">Bu Ay Kazanç</p>
        </div>
      </section>

      {(reviewing.count ?? 0) > 0 || (inProgress.count ?? 0) > 0 || (waitingSupport.count ?? 0) > 0 ? (
        <section className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-fg-muted">Aktif İşlemler</p>
          <div className="space-y-2 text-sm">
            {(reviewing.count ?? 0) > 0 && (
              <Link href="/partner/satislar" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/25">
                <span>{reviewing.count} satış incelemede</span>
                <span className="text-fg-muted">→</span>
              </Link>
            )}
            {(inProgress.count ?? 0) > 0 && (
              <Link href="/partner/satislar" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/25">
                <span>{inProgress.count} satış devam ediyor</span>
                <span className="text-fg-muted">→</span>
              </Link>
            )}
            {(waitingSupport.count ?? 0) > 0 && (
              <Link href="/partner/destek" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-white/25">
                <span>{waitingSupport.count} destek yanıtı bekliyor</span>
                <span className="text-fg-muted">→</span>
              </Link>
            )}
          </div>
        </section>
      ) : null}

      {(infoRequired.data ?? []).length > 0 && (
        <section className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-300">Gerekli Aksiyonlar</p>
          <div className="space-y-2">
            {(infoRequired.data ?? []).map((s) => {
              const service = Array.isArray(s.services) ? s.services[0] : s.services;
              const lead = Array.isArray(s.leads) ? s.leads[0] : s.leads;
              return (
                <Link key={s.id} href={`/partner/satislar/${s.id}`} className="block rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm">
                  <span className="font-medium">{lead?.contact_name ?? service?.name}</span> satışınız için ek bilgi gerekiyor.
                  <span className="ml-2 font-semibold text-amber-300">Görüntüle →</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Son Satışlar</p>
          <Link href="/partner/satislar" className="text-xs text-lime hover:underline">
            Tümünü gör
          </Link>
        </div>
        <div className="mt-3 space-y-2">
          {(recentSales.data ?? []).map((s) => {
            const service = Array.isArray(s.services) ? s.services[0] : s.services;
            return (
              <Link key={s.id} href={`/partner/satislar/${s.id}`} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:border-white/25">
                <span>{service?.name ?? 'Hizmet'}</span>
                <span className="text-fg-muted">
                  {Number(s.amount).toLocaleString('tr-TR')} {s.currency} · {saleStatusLabel(s.sale_status)}
                </span>
              </Link>
            );
          })}
          {(!recentSales.data || recentSales.data.length === 0) && (
            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-fg-muted">
              Henüz satışınız yok. İlk müşteriniz için bir satış oluşturun.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-lime">Partnerine Özel</p>
        <p className="mt-1 font-semibold">Kendi dijital markanı oluştur.</p>
        <p className="mt-1 text-sm text-fg-muted">Partnerlara özel web sitesi ve marka çözümlerini keşfet.</p>
        <Link href="/partner/avantajlar" className="mt-3 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold hover:border-lime/50 hover:text-lime">
          Avantajları Gör
        </Link>
      </section>

      <section className="mt-8">
        <PartnerBadgeCard />
      </section>

      {(ranking.data ?? []).length > 0 && (
        <section className="mt-8">
          <PartnerRanking rows={ranking.data ?? []} currentPartnerCode={partner?.partner_code} />
        </section>
      )}
    </div>
  );
}
