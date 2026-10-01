'use client';

import { useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { adminReplyTicketAction, updateTicketStatusAction, type SupportActionResult } from './actions';
import type { Database } from '@/types/supabase';

type SupportStatus = Database['public']['Enums']['support_status'];

const initial: SupportActionResult = { ok: false };

export function AdminReplyForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(adminReplyTicketAction, initial);
  return (
    <form action={formAction} className="mt-3 flex gap-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      <input name="message" placeholder="Partnere yanıt yazın…" required className="min-h-11 flex-1 rounded-xl border border-white/15 bg-black/20 px-4 text-sm" />
      <button type="submit" disabled={pending} className="rounded-xl bg-lime px-4 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? '…' : 'Gönder'}
      </button>
      {state.error && <p className="text-xs text-red-300">{state.error}</p>}
    </form>
  );
}

export function StatusSelect({ ticketId, status }: { ticketId: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(async () => { await updateTicketStatusAction(ticketId, e.target.value as SupportStatus); router.refresh(); })}
      className="rounded-lg border border-white/20 bg-black/30 px-3 py-1.5 text-xs"
    >
      <option value="open">Açık</option>
      <option value="in_progress">İnceleniyor</option>
      <option value="waiting_partner">Yanıt Bekleniyor</option>
      <option value="resolved">Çözüldü</option>
      <option value="closed">Kapatıldı</option>
    </select>
  );
}
