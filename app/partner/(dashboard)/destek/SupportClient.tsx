'use client';

import { useActionState, useState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { createTicketAction, replyTicketAction, type SupportActionResult } from './actions';
import { SUPPORT_CATEGORIES } from '@/lib/partner/support-category';

const initial: SupportActionResult = { ok: false };

export function NewTicketForm() {
  const [state, formAction, pending] = useActionState(createTicketAction, initial);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
        + Yeni Destek Talebi
      </button>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm text-red-300">{state.error}</p>}
      <Field id="category" label="Kategori">
        {(a) => (
          <select {...inputProps(a)} name="category" required defaultValue="" className={a.className}>
            <option value="" disabled>
              Seçiniz
            </option>
            {SUPPORT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="subject" label="Konu">
        {(a) => <input {...inputProps(a)} name="subject" required autoFocus className={a.className} />}
      </Field>
      <Field id="message" label="Mesajınız">
        {(a) => <textarea {...inputProps(a)} name="message" required className={`${a.className} min-h-28`} />}
      </Field>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
          {pending ? 'Gönderiliyor…' : 'Gönder'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-fg-muted">
          Vazgeç
        </button>
      </div>
    </form>
  );
}

export function ReplyForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(replyTicketAction, initial);
  return (
    <form action={formAction} className="mt-3 flex gap-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      <input name="message" placeholder="Mesaj yazın…" required className="min-h-11 flex-1 rounded-xl border border-white/15 bg-black/20 px-4 text-sm" />
      <button type="submit" disabled={pending} className="rounded-xl bg-lime px-4 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? '…' : 'Gönder'}
      </button>
      {state.error && <p className="text-xs text-red-300">{state.error}</p>}
    </form>
  );
}
