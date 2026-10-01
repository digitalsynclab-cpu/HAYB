import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PartnerRanking } from './PartnerRanking';
import { PaymentInfoCard } from '../rehber/PaymentInfoCard';

const APPROVED_SALE_STATUSES = ['approved', 'payment_pending', 'paid', 'project_started', 'in_progress', 'completed'] as const;

export default async function PartnerDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id, profile_id, partner_code').eq('profile_id', user!.id).single();
  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user!.id).single();

  const [activeLeads, pendingSales, approvedSales, totalSales, commissions, ranking] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).in('status', ['new', 'contacted', 'qualified', 'negotiation', 'proposal']),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).in('sale_status', ['submitted', 'reviewing', 'information_required']),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id).in('sale_status', APPROVED_SALE_STATUSES),
    supabase.from('sales').select('id', { count: 'exact', head: true }).eq('partner_id', partner!.id),
    supabase.from('commissions').select('commission_amount, status').eq('partner_id', partner!.id),
    supabase.rpc('get_partner_ranking', { limit_count: 10 }),
  ]);

  const pendingCommission = (commissions.data ?? []).filter((c) => c.status === 'pending' || c.status === 'calculated').reduce((s, c) => s + Number(c.commission_amount), 0);
  const approvedCommission = (commissions.data ?? []).filter((c) => c.status === 'approved' || c.status === 'payable').reduce((s, c) => s + Number(c.commission_amount), 0);
  const paidCommission = (commissions.data ?? []).filter((c) => c.status === 'paid').reduce((s, c) => s + Number(c.commission_amount), 0);

  const kpis = [
    { label: 'Aktif Lead', value: activeLeads.count ?? 0 },
    { label: 'Onay Bekleyen Satış', value: pendingSales.count ?? 0 },
    { label: 'Onaylanmış Satış', value: approvedSales.count ?? 0 },
    { label: 'Toplam Satış', value: totalSales.count ?? 0 },
    { label: 'Bekleyen Komisyon', value: `${pendingCommission.toLocaleString('tr-TR')} ₺` },
    { label: 'Onaylanmış Komisyon', value: `${approvedCommission.toLocaleString('tr-TR')} ₺` },
    { label: 'Ödenen Komisyon', value: `${paidCommission.toLocaleString('tr-TR')} ₺` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Merhaba, {profile?.full_name?.split(' ')[0] ?? 'Partner'}.</h1>
      <p className="mt-1 text-sm text-fg-muted">Partner Aktif</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-2xl font-bold text-lime">{k.value}</p>
            <p className="mt-1 text-sm text-fg-muted">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/partner/satis-olustur" className="rounded-xl bg-lime px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
          Yeni Satış
        </Link>
        <Link href="/partner/leads/yeni" className="rounded-xl border border-white/20 px-6 py-3 text-sm hover:border-white/40">
          Yeni Lead
        </Link>
        <Link href="/partner/materyaller" className="rounded-xl border border-white/20 px-6 py-3 text-sm hover:border-white/40">
          Materyaller
        </Link>
        <Link href="/partner/rehber" className="rounded-xl border border-white/20 px-6 py-3 text-sm hover:border-white/40">
          Başlangıç Rehberi
        </Link>
      </div>

      <div className="mt-8">
        <PaymentInfoCard />
      </div>

      <PartnerRanking rows={ranking.data ?? []} currentPartnerCode={partner?.partner_code} />
    </div>
  );
}
