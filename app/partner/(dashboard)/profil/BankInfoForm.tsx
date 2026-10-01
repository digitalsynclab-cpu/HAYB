'use client';

import { startTransition, useActionState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { updateBankInfoAction, type BankInfoResult } from './actions';

const initial: BankInfoResult = { ok: false };

export function BankInfoForm({ accountHolderName, iban }: { accountHolderName: string; iban: string }) {
  const [state, formAction, pending] = useActionState(updateBankInfoAction, initial);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      {state.error && <p className="text-sm font-medium text-red-300">{state.error}</p>}
      {state.ok && <p className="text-sm font-medium text-lime">Ödeme bilgileriniz kaydedildi.</p>}
      <Field id="accountHolderName" label="IBAN Sahibinin Adı Soyadı">
        {(a) => <input {...inputProps(a)} name="accountHolderName" defaultValue={accountHolderName} required className={a.className} />}
      </Field>
      <Field id="iban" label="IBAN" hint="TR ile başlayan 26 karakter">
        {(a) => (
          <input
            {...inputProps(a)}
            name="iban"
            defaultValue={iban}
            placeholder="TR00 0000 0000 0000 0000 0000 00"
            required
            className={`${a.className} font-mono tracking-wider`}
          />
        )}
      </Field>
      <button type="submit" disabled={pending} className="min-h-12 rounded-xl bg-lime px-6 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    </form>
  );
}
