'use client';

import { useActionState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { sendAnnouncementAction, type AnnouncementResult } from './actions';

const initial: AnnouncementResult = { ok: false };

export function AnnouncementForm({ activePartnerCount }: { activePartnerCount: number }) {
  const [state, formAction, pending] = useActionState(sendAnnouncementAction, initial);

  return (
    <form action={formAction} key={state.ok ? state.sentCount : 'idle'} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm font-medium text-red-300">{state.error}</p>}
      {state.ok && <p className="text-sm font-medium text-lime">Duyuru {state.sentCount} aktif partnere gönderildi.</p>}

      <Field id="title" label="Başlık">
        {(a) => <input {...inputProps(a)} name="title" required autoFocus className={a.className} />}
      </Field>
      <Field id="body" label="Mesaj" hint={`Şu an ${activePartnerCount} aktif partnerin bildirimlerine düşecek.`}>
        {(a) => <textarea {...inputProps(a)} name="body" required className={`${a.className} min-h-32`} />}
      </Field>

      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50 sm:w-auto">
        {pending ? 'Gönderiliyor…' : 'Duyuruyu Gönder'}
      </button>
    </form>
  );
}
