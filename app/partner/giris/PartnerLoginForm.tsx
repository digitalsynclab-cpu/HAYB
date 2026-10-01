'use client';

import { useActionState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { partnerLoginAction, type LoginResult } from '../actions';

const initial: LoginResult = { ok: false };

export function PartnerLoginForm() {
  const [state, formAction, pending] = useActionState(partnerLoginAction, initial);
  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      <Field id="email" label="E-posta" error={state.error}>
        {(a) => <input {...inputProps(a)} name="email" type="email" autoComplete="username" required className={a.className} />}
      </Field>
      <Field id="password" label="Şifre">
        {(a) => <input {...inputProps(a)} name="password" type="password" autoComplete="current-password" required className={a.className} />}
      </Field>
      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 transition hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Giriş yapılıyor…' : 'Giriş Yap'}
      </button>
    </form>
  );
}
