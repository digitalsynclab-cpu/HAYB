'use client';

import { useActionState, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Field, inputProps } from '@/components/forms/Field';
import { adminPasswordLoginAction, adminVerifyOtpAction, type ActionResult } from '../actions';

const initial: ActionResult = { ok: false };

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<'password' | 'otp'>(searchParams.get('step') === 'otp' ? 'otp' : 'password');

  const [passwordState, passwordAction, passwordPending] = useActionState(async (prev: ActionResult, fd: FormData) => {
    const res = await adminPasswordLoginAction(prev, fd);
    if (res.ok && res.step === 'otp') setStep('otp');
    return res;
  }, initial);

  const [otpState, otpAction, otpPending] = useActionState(async (prev: ActionResult, fd: FormData) => {
    const res = await adminVerifyOtpAction(prev, fd);
    if (res.ok) router.push('/secretadmin');
    return res;
  }, initial);

  if (step === 'otp') {
    return (
      <form action={otpAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-fg-muted">E-postanıza gönderilen 6 haneli kodu girin. Kod 10 dakika geçerlidir.</p>
        <Field id="code" label="Doğrulama Kodu" error={otpState.error}>
          {(a) => (
            <input
              {...inputProps(a)}
              name="code"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              placeholder="••••••"
              className={`${a.className} text-center text-2xl tracking-[0.5em]`}
            />
          )}
        </Field>
        <button
          type="submit"
          disabled={otpPending}
          className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 transition hover:bg-lime-soft disabled:opacity-50"
        >
          {otpPending ? 'Doğrulanıyor…' : 'Giriş Yap'}
        </button>
      </form>
    );
  }

  return (
    <form action={passwordAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      <Field id="email" label="E-posta" error={passwordState.error}>
        {(a) => <input {...inputProps(a)} name="email" type="email" autoComplete="username" required className={a.className} />}
      </Field>
      <Field id="password" label="Şifre">
        {(a) => <input {...inputProps(a)} name="password" type="password" autoComplete="current-password" required className={a.className} />}
      </Field>
      <button
        type="submit"
        disabled={passwordPending}
        className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 transition hover:bg-lime-soft disabled:opacity-50"
      >
        {passwordPending ? 'Kontrol ediliyor…' : 'Devam Et'}
      </button>
    </form>
  );
}
