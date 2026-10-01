import { createSupabaseServerClient } from '@/lib/supabase/server';
import { StageEmailButton } from '../StageEmailButton';

const STAGES: { key: string; label: string; title: string; message: string }[] = [
  { key: 'lead_received', label: 'Alındı Bilgisi Gönder', title: 'Talebiniz alındı', message: 'Talebiniz HAYB ekibine ulaştı, en kısa sürede sizinle iletişime geçeceğiz.' },
  { key: 'lead_preparing', label: 'Hazırlanıyor Bilgisi Gönder', title: 'Teklifiniz hazırlanıyor', message: 'İhtiyaçlarınıza uygun teklifimizi hazırlıyoruz, kısa süre içinde sizinle paylaşacağız.' },
  { key: 'lead_in_progress', label: 'Süreç Devam Ediyor Bilgisi Gönder', title: 'Projeniz üzerinde çalışıyoruz', message: 'Projeniz HAYB ekibi tarafından hazırlanmaya devam ediyor.' },
];

export default async function AdminLeadsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: leads } = await supabase
    .from('leads')
    .select('id, contact_name, company_name, email, phone, status, created_at, partners(partner_code)')
    .order('created_at', { ascending: false })
    .limit(200);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Tüm Lead&apos;ler</h1>

      <div className="mt-8 space-y-3">
        {(leads ?? []).map((l) => {
          const partner = Array.isArray(l.partners) ? l.partners[0] : l.partners;
          return (
            <div key={l.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {l.contact_name} {l.company_name && <span className="text-fg-muted">· {l.company_name}</span>}
                  </p>
                  <p className="text-sm text-fg-muted">
                    {l.phone} {l.email && `· ${l.email}`} · Partner: {partner?.partner_code ?? '—'} · {l.status}
                  </p>
                </div>
                {l.email && (
                  <div className="flex flex-wrap gap-2">
                    {STAGES.map((s) => (
                      <StageEmailButton
                        key={s.key}
                        toEmail={l.email!}
                        customerName={l.contact_name}
                        stageKey={s.key}
                        stageTitle={s.title}
                        message={s.message}
                        relatedEntityType="lead"
                        relatedEntityId={l.id}
                        label={s.label}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {(!leads || leads.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz lead yok.</p>}
      </div>
    </main>
  );
}
