import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { parseTicketSubject } from '@/lib/partner/support-category';
import { AdminReplyForm, StatusSelect } from './AdminSupportClient';

const OPEN_STATUSES = ['open', 'in_progress', 'waiting_partner'];

export default async function AdminSupportPage() {
  const supabase = await createSupabaseServerClient();
  const { data: tickets } = await supabase
    .from('support_tickets')
    .select('id, subject, status, created_at, partners(partner_code, profiles!partners_profile_id_fkey(email)), support_messages(id, message, author_role, created_at)')
    .order('created_at', { ascending: false })
    .limit(100);

  const sorted = (tickets ?? []).slice().sort((a, b) => {
    const aOpen = OPEN_STATUSES.includes(a.status) ? 0 : 1;
    const bOpen = OPEN_STATUSES.includes(b.status) ? 0 : 1;
    return aOpen - bOpen;
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Destek Talepleri</h1>

      <div className="mt-8 space-y-4">
        {sorted.map((t) => {
          const partner = Array.isArray(t.partners) ? t.partners[0] : t.partners;
          const partnerProfile = partner ? (Array.isArray(partner.profiles) ? partner.profiles[0] : partner.profiles) : null;
          const { category, title } = parseTicketSubject(t.subject);
          const messages = (t.support_messages ?? []).slice().sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          return (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    {category && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg-muted">{category}</span>}
                    <p className="font-semibold">{title}</p>
                  </div>
                  <p className="text-xs text-fg-muted">{partner?.partner_code}</p>
                </div>
                <div className="flex items-center gap-2">
                  {partnerProfile?.email && (
                    <Link
                      href={`/secretadmin/mail-gonder?to=${encodeURIComponent(partnerProfile.email)}&subject=${encodeURIComponent(`Destek talebiniz: ${title}`)}`}
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-fg-muted hover:border-lime hover:text-lime"
                    >
                      Mail Gönder
                    </Link>
                  )}
                  <StatusSelect ticketId={t.id} status={t.status} />
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`rounded-xl px-4 py-2 text-sm ${m.author_role === 'admin' ? 'ml-auto max-w-[80%] bg-lime/15' : 'mr-auto max-w-[80%] bg-white/10'}`}>
                    {m.message}
                  </div>
                ))}
              </div>
              <AdminReplyForm ticketId={t.id} />
            </div>
          );
        })}
        {(!tickets || tickets.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-fg-muted">Henüz destek talebi yok.</p>}
      </div>
    </main>
  );
}
