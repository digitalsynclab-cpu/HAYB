'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Field, inputProps } from '@/components/forms/Field';
import { updateBankInfoAction, type BankInfoResult } from './actions';

const initial: BankInfoResult = { ok: false };

export function BankInfoForm({ accountHolderName, iban }: { accountHolderName: string; iban: string }) {
  const [state, formAction, pending] = useActionState(updateBankInfoAction, initial);
  // IBAN zaten kayıtlıysa alan kilitli (salt okunur) açılır; kaydedince de otomatik kilitlenir.
  const [editing, setEditing] = useState(!iban);

  useEffect(() => {
    if (state.ok) setEditing(false);
  }, [state.ok]);

  if (!editing) {
    return (
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        {state.ok && <p className="text-sm font-medium text-lime">Ödeme bilgileriniz kaydedildi.</p>}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">IBAN Sahibi</p>
            <p className="mt-1 font-medium">{accountHolderName}</p>
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Ödeme bilgilerini düzenle"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 text-fg-muted hover:border-lime/50 hover:text-lime"
          >
            <Pencil aria-hidden className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">IBAN</p>
          <p className="mt-1 font-mono tracking-wider">{iban}</p>
        </div>
      </div>
    );
  }

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
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="min-h-12 rounded-xl bg-lime px-6 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
          {pending ? 'Kaydediliyor…' : 'Kaydet ve Onayla'}
        </button>
        {!!iban && (
          <button type="button" onClick={() => setEditing(false)} className="min-h-12 rounded-xl border border-white/20 px-6 text-sm text-fg-muted hover:border-white/40">
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}
