import { createSupabaseServerClient } from '@/lib/supabase/server';

async function getCounts() {
  const supabase = await createSupabaseServerClient();
  const [applications, partners, leads, sales] = await Promise.all([
    supabase.from('partner_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('partners').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('sales').select('id', { count: 'exact', head: true }),
  ]);
  return {
    pendingApplications: applications.count ?? 0,
    activePartners: partners.count ?? 0,
    totalLeads: leads.count ?? 0,
    totalSales: sales.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const kpis = [
    { label: 'Bekleyen Başvuru', value: counts.pendingApplications },
    { label: 'Aktif Partner', value: counts.activePartners },
    { label: 'Toplam Lead', value: counts.totalLeads },
    { label: 'Toplam Satış', value: counts.totalSales },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
        <h1 className="mt-2 text-2xl font-bold">Genel Bakış</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-bold text-lime">{k.value}</p>
            <p className="mt-1 text-sm text-fg-muted">{k.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
