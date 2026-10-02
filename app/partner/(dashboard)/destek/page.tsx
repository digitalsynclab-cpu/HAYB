import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { supportStatusLabel } from '@/lib/partner/support-status';
import { parseTicketSubject } from '@/lib/partner/support-category';
import { NewTicketForm } from './SupportClient';

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'az önce';
  if (mins < 60) return `${mins} dk önce`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} sa önce`;
  const days = Math.floor(hours / 24);
  return `${days} gün önce`;
}

export default async function PartnerSupportPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();

  const { data: tickets } = await supabase
    .from('support_tickets')
    .select('id, subject, status, created_at, support_messages(created_at)')
    .eq('partner_id', partner!.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Destek</h1>
          <p className="mt-1 text-sm text-fg-muted">HAYB ekibine soru sorun, yanıtları buradan takip edin.</p>
        </div>
        <NewTicketForm />
      </div>

      <div className="mt-8 space-y-3">
        {(tickets ?? []).map((t) => {
          const { category, title } = parseTicketSubject(t.subject);
          const messages = t.support_messages ?? [];
          const lastMessageAt = messages.length > 0 ? messages.reduce((latest, m) => (m.created_at > latest ? m.created_at : latest), messages[0].created_at) : t.created_at;
          const needsAttention = t.status === 'waiting_partner';
          return (
            <Link
              key={t.id}
              href={`/partner/destek/${t.id}`}
              className={`block rounded-2xl border p-5 transition hover:border-lime/40 ${needsAttention ? 'border-lime/40 bg-lime/5' : 'border-white/10 bg-white/5'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {category && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg-muted">{category}</span>}
                  <p className="font-medium">{title}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${needsAttention ? 'bg-lime/20 text-lime' : 'bg-white/10 text-fg-muted'}`}>{supportStatusLabel(t.status)}</span>
              </div>
              <p className="mt-2 text-xs text-fg-muted">Son mesaj: {timeAgo(lastMessageAt)}</p>
            </Link>
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
