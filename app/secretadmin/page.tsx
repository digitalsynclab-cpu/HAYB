import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const PENDING_SALE_STATUSES = ['submitted', 'reviewing'] as const;
const INFO_REQUIRED_STATUS = 'information_required';

async function getCounts() {
  const supabase = await createSupabaseServerClient();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [
    pendingApplications,
    pendingSales,
    infoRequiredSales,
    pendingCommissions,
    payableCommissions,
    activePartners,
    activeLeads,
    monthSales,
  ] = await Promise.all([
    supabase.from('partner_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('is_demo', false).in('sale_status', PENDING_SALE_STATUSES),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('is_demo', false).eq('sale_status', INFO_REQUIRED_STATUS),
    supabase.from('commissions').select('id', { count: 'exact', head: true }).eq('is_demo', false).in('status', ['pending', 'calculated']),
    supabase.from('commissions').select('id', { count: 'exact', head: true }).eq('is_demo', false).in('status', ['approved', 'payable']),
    supabase.from('partners').select('id', { count: 'exact', head: true }).eq('status', 'active').eq('is_demo', false),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('is_demo', false).in('status', ['new', 'contacted', 'qualified', 'proposal', 'negotiation']),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('is_demo', false).gte('sold_at', monthStart.toISOString()),
  ]);

  return {
    pendingApplications: pendingApplications.count ?? 0,
    pendingSales: pendingSales.count ?? 0,
    infoRequiredSales: infoRequiredSales.count ?? 0,
    pendingCommissions: pendingCommissions.count ?? 0,
    payableCommissions: payableCommissions.count ?? 0,
    activePartners: activePartners.count ?? 0,
    activeLeads: activeLeads.count ?? 0,
    monthSales: monthSales.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const c = await getCounts();

  const actionItems = [
    { label: 'Bekleyen Partner Başvuruları', value: c.pendingApplications, href: '/secretadmin/basvurular', urgent: c.pendingApplications > 0 },
    { label: 'Onay Bekleyen Satışlar', value: c.pendingSales, href: '/secretadmin/satislar', urgent: c.pendingSales > 0 },
    { label: 'Ek Bilgi Bekleyenler', value: c.infoRequiredSales, href: '/secretadmin/satislar', urgent: c.infoRequiredSales > 0 },
    { label: 'Bekleyen Komisyonlar', value: c.pendingCommissions, href: '/secretadmin/komisyonlar', urgent: c.pendingCommissions > 0 },
    { label: 'Ödeme Bekleyenler', value: c.payableCommissions, href: '/secretadmin/komisyonlar', urgent: c.payableCommissions > 0 },
  ];

  const overviewItems = [
    { label: 'Aktif Partner', value: c.activePartners },
    { label: 'Aktif Lead', value: c.activeLeads },
    { label: 'Bu Ay Satış', value: c.monthSales },
  ];

  const quickActions = [
    { label: 'Başvuruları İncele', href: '/secretadmin/basvurular' },
    { label: 'Satışları Onayla', href: '/secretadmin/satislar' },
    { label: 'Komisyonları Yönet', href: '/secretadmin/komisyonlar' },
    { label: 'Partnerleri Gör', href: '/secretadmin/partnerler' },
    { label: 'Paketleri Yönet', href: '/secretadmin/paketler' },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
        <h1 className="mt-2 text-2xl font-bold">Genel Bakış</h1>
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Bekleyen İşler</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {actionItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-2xl border p-5 transition ${item.urgent ? 'border-lime/40 bg-lime/10 hover:border-lime/70' : 'border-white/10 bg-white/5 hover:border-white/25'}`}
            >
              <p className={`text-3xl font-bold ${item.urgent ? 'text-lime' : 'text-fg'}`}>{item.value}</p>
              <p className="mt-1 text-sm text-fg-muted">{item.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Genel Durum</h2>
        <div className="mt-3 grid grid-cols-3 gap-4">
          {overviewItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold text-fg">{item.value}</p>
              <p className="mt-1 text-sm text-fg-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Hızlı İşlemler</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {quickActions.map((a) => (
            <Link key={a.href} href={a.href} className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold hover:border-lime/50 hover:text-lime">
              {a.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
