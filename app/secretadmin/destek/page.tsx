import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AdminReplyForm, StatusSelect } from './AdminSupportClient';

export default async function AdminSupportPage() {
  const supabase = await createSupabaseServerClient();
  const { data: tickets } = await supabase
    .from('support_tickets')
    .select('id, subject, status, created_at, partners(partner_code), support_messages(id, message, author_role, created_at)')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Destek Talepleri</h1>

      <div className="mt-8 space-y-4">
        {(tickets ?? []).map((t) => {
          const partner = Array.isArray(t.partners) ? t.partners[0] : t.partners;
          const messages = (t.support_messages ?? []).slice().sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          return (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{t.subject}</p>
                  <p className="text-xs text-fg-muted">{partner?.partner_code}</p>
                </div>
                <StatusSelect ticketId={t.id} status={t.status} />
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
