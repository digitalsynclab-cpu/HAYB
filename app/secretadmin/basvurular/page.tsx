import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DeleteApplicationButton } from './DeleteApplicationButton';

const STATUS_LABEL: Record<string, string> = {
  pending: 'Bekliyor',
  reviewing: 'İnceleniyor',
  interview: 'Görüşme',
  approved: 'Onaylandı',
  rejected: 'Reddedildi',
  cancelled: 'İptal',
};

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-300',
  reviewing: 'bg-blue-500/20 text-blue-300',
  interview: 'bg-purple-500/20 text-purple-300',
  approved: 'bg-lime/20 text-lime',
  rejected: 'bg-red-500/20 text-red-300',
  cancelled: 'bg-white/10 text-fg-muted',
};

export default async function AdminApplicationsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: applications } = await supabase
    .from('partner_applications')
    .select('id, status, submitted_at, application_data, profiles!partner_applications_profile_id_fkey(full_name, email, phone)')
    .order('submitted_at', { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Partner Başvuruları</h1>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Ad Soyad</th>
              <th className="px-4 py-3">Şehir</th>
              <th className="px-4 py-3">Meslek</th>
              <th className="px-4 py-3">Tarih</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(applications ?? []).map((a) => {
              const profile = Array.isArray(a.profiles) ? a.profiles[0] : a.profiles;
              const data = a.application_data as Record<string, unknown>;
              return (
                <tr key={a.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{profile?.full_name}</td>
                  <td className="px-4 py-3 text-fg-muted">{String(data.city ?? '—')}</td>
                  <td className="px-4 py-3 text-fg-muted">{String(data.occupation ?? '—')}</td>
                  <td className="px-4 py-3 text-fg-muted">{new Date(a.submitted_at).toLocaleDateString('tr-TR')}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLOR[a.status]}`}>{STATUS_LABEL[a.status]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/secretadmin/basvurular/${a.id}`} className="text-lime underline">
                        İncele
                      </Link>
                      <DeleteApplicationButton applicationId={a.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {(!applications || applications.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-fg-muted">
                  Henüz başvuru yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
