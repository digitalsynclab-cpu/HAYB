import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ReviewActions } from './ReviewActions';

const LABELS: Record<string, string> = {
  fullName: 'Ad Soyad',
  phone: 'Telefon',
  city: 'Şehir',
  district: 'İlçe',
  occupation: 'Meslek',
  employmentStatus: 'Çalışma Durumu',
  hasCompany: 'Şirketi Var mı',
  companyName: 'Şirket Adı',
  website: 'Web Sitesi',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  salesExperience: 'Satış Deneyimi',
  motivation: 'Motivasyon',
  targetCustomerGroups: 'Hedef Müşteri Grupları',
  hasSalesExperienceBefore: 'Daha Önce Satış Yaptı mı',
  sectorsConnected: 'Bağlantılı Sektörler',
  estimatedReach: 'Tahmini Erişim',
  interestedServices: 'İlgilendiği Hizmetler',
  previousProducts: 'Önceki Ürün/Hizmetler',
  digitalExperience: 'Dijital Deneyim',
  customerPortfolio: 'Müşteri Portföyü',
  additionalInfo: 'Ek Bilgi',
};

function formatValue(v: unknown): string {
  if (v === null || v === undefined || v === '') return '—';
  if (typeof v === 'boolean') return v ? 'Evet' : 'Hayır';
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

export default async function AdminApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: application } = await supabase
    .from('partner_applications')
    .select('id, status, submitted_at, application_data, decision_reason, profiles!inner(full_name, email, phone)')
    .eq('id', id)
    .single();

  if (!application) notFound();
  const profile = Array.isArray(application.profiles) ? application.profiles[0] : application.profiles;
  const data = application.application_data as Record<string, unknown>;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">Başvuru Detayı</p>
      <h1 className="mt-2 text-2xl font-bold">{profile?.full_name}</h1>
      <p className="text-fg-muted">
        {profile?.email} · {profile?.phone}
      </p>

      <div className="mt-8">
        <ReviewActions applicationId={application.id} status={application.status} />
      </div>

      {application.decision_reason && (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-fg-muted">Karar notu: {application.decision_reason}</p>
      )}

      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {Object.entries(LABELS).map(([key, label]) => (
          <div key={key} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">{label}</dt>
            <dd className="mt-1 text-sm text-fg">{formatValue(data[key])}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
