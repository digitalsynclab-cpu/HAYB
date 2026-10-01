import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { buildMetadata } from '@/lib/metadata';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildMetadata({ title: 'Başvuru Durumu', description: 'HAYB Partner başvuru durumunuz.', path: '/partner/basvuru/durum', noindex: true });

const STATUS_LABEL: Record<string, string> = {
  pending: 'Başvurunuz alındı, inceleme sırasında.',
  reviewing: 'Başvurunuz inceleniyor.',
  interview: 'Başvurunuz görüşme aşamasında.',
  approved: 'Başvurunuz onaylandı.',
  rejected: 'Başvurunuz bu dönem için onaylanmadı.',
  cancelled: 'Başvurunuz iptal edildi.',
};

export default async function ApplicationStatusPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/partner/giris');

  const { data: application } = await supabase
    .from('partner_applications')
    .select('status, created_at')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const status = application?.status ?? 'pending';

  return (
    <Section curve={false}>
      <div className="mx-auto max-w-xl py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">Başvuru Durumu</p>
        <h1 className="mt-2 text-3xl font-bold">{STATUS_LABEL[status] ?? 'Başvurunuz alındı.'}</h1>
        <p className="mt-4 text-fg-muted">Onaylandığında bu e-posta adresine giriş bilgileri gönderilecek ve partner paneline erişebileceksiniz.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Ana Sayfaya Dön</Button>
        </div>
      </div>
    </Section>
  );
}
