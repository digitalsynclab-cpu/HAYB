import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { supportStatusLabel } from '@/lib/partner/support-status';
import { parseTicketSubject } from '@/lib/partner/support-category';
import { ReplyForm } from '../SupportClient';

export default async function PartnerTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();

  // RLS zaten yalnızca kendi ticket'ına izin verir; partner_id eşleşmesini burada da
  // kontrol ederek IDOR'u server-side açıkça reddediyoruz (başka partnerin ticket id'si denenirse 404).
  const { data: ticket } = await supabase
    .from('support_tickets')
    .select('id, subject, status, created_at, partner_id, support_messages(id, message, author_role, created_at)')
    .eq('id', id)
    .eq('partner_id', partner!.id)
    .single();

  if (!ticket) notFound();

  const { category, title } = parseTicketSubject(ticket.subject);
  const messages = (ticket.support_messages ?? []).slice().sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/partner/destek" className="text-sm text-fg-muted hover:text-fg">
        ← Destek
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          {category && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-fg-muted">{category}</span>}
          <h1 className="mt-1 text-xl font-bold">{title}</h1>
          <p className="mt-1 text-xs text-fg-muted">Oluşturuldu: {new Date(ticket.created_at).toLocaleString('tr-TR')}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-fg-muted">{supportStatusLabel(ticket.status)}</span>
      </div>

      <div className="mt-6 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.author_role === 'partner' ? 'ml-auto bg-lime/15' : 'mr-auto bg-white/10'}`}>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-fg-muted">{m.author_role === 'partner' ? 'Siz' : 'HAYB Destek'}</p>
            <p>{m.message}</p>
            <p className="mt-1 text-[11px] text-fg-muted">{new Date(m.created_at).toLocaleString('tr-TR')}</p>
          </div>
        ))}
      </div>

      {ticket.status !== 'closed' && ticket.status !== 'resolved' ? (
        <div className="mt-6">
          <ReplyForm ticketId={ticket.id} />
        </div>
      ) : (
        <p className="mt-6 text-sm text-fg-muted">Bu talep kapatıldı. Yeni bir konu için yeni destek talebi oluşturabilirsiniz.</p>
      )}
    </div>
  );
}
