import { createSupabaseServerClient } from '@/lib/supabase/server';
import { supportStatusLabel } from '@/lib/partner/support-status';
import { NewTicketForm, ReplyForm } from './SupportClient';

export default async function PartnerSupportPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();

  const { data: tickets } = await supabase
    .from('support_tickets')
    .select('id, subject, status, created_at, support_messages(id, message, author_role, created_at)')
    .eq('partner_id', partner!.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Destek</h1>
        <NewTicketForm />
      </div>

      <div className="mt-8 space-y-4">
        {(tickets ?? []).map((t) => {
          const messages = (t.support_messages ?? []).slice().sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          return (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{t.subject}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-fg-muted">{supportStatusLabel(t.status)}</span>
              </div>
              <div className="mt-3 space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`rounded-xl px-4 py-2 text-sm ${m.author_role === 'partner' ? 'ml-auto max-w-[80%] bg-lime/15' : 'mr-auto max-w-[80%] bg-white/10'}`}>
                    {m.message}
                  </div>
                ))}
              </div>
              {t.status !== 'closed' && <ReplyForm ticketId={t.id} />}
            </div>
          );
        })}
        {(!tickets || tickets.length === 0) && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-fg-muted">Henüz destek talebiniz yok.</p>
          </div>
        )}
      </div>
    </div>
  );
}
