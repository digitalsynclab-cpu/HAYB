import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AnnouncementForm } from './AnnouncementForm';

export default async function AdminAnnouncementPage() {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase.from('partners').select('id', { count: 'exact', head: true }).eq('status', 'active');

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Duyuru Gönder</h1>
      <p className="mt-1 text-sm text-fg-muted">Yazdığınız duyuru, tüm aktif partnerlerin bildirimler sayfasına düşer.</p>

      <div className="mt-6">
        <AnnouncementForm activePartnerCount={count ?? 0} />
      </div>
    </main>
  );
}
