'use client';

import { useActionState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { sendFreeformEmailAction, type FreeformEmailResult } from './actions';

const initial: FreeformEmailResult = { ok: false };

export function FreeformEmailForm() {
  const [state, formAction, pending] = useActionState(sendFreeformEmailAction, initial);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm font-medium text-red-300">{state.error}</p>}
      {state.ok && <p className="text-sm font-medium text-lime">Mail gönderildi.</p>}

      <Field id="toEmail" label="Alıcı E-posta">
        {(a) => <input {...inputProps(a)} name="toEmail" type="email" required autoFocus className={a.className} />}
      </Field>
      <Field id="subject" label="Konu">
        {(a) => <input {...inputProps(a)} name="subject" required className={a.className} />}
      </Field>
      <Field id="message" label="Mesaj" hint="HAYB logolu, markalı e-posta şablonu içine otomatik yerleştirilir.">
        {(a) => <textarea {...inputProps(a)} name="message" required className={`${a.className} min-h-40`} />}
      </Field>

      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50 sm:w-auto">
        {pending ? 'Gönderiliyor…' : 'Mail Gönder'}
      </button>
    </form>
  );
}
