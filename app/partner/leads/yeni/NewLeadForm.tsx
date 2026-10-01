'use client';

import { useActionState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { createLeadAction, type LeadActionResult } from '../actions';

const initial: LeadActionResult = { ok: false };

export function NewLeadForm({ services }: { services: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState(createLeadAction, initial);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm font-medium text-red-300">{state.error}</p>}
      <Field id="contactName" label="Müşteri Adı">
        {(a) => <input {...inputProps(a)} name="contactName" required autoFocus className={a.className} />}
      </Field>
      <Field id="phone" label="Telefon">
        {(a) => <input {...inputProps(a)} name="phone" type="tel" required className={a.className} />}
      </Field>
      <Field id="serviceId" label="İlgilendiği Hizmet" hint="Opsiyonel">
        {(a) => (
          <select {...inputProps(a)} name="serviceId" className={a.className}>
            <option value="">Seçiniz</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="description" label="Not" hint="Opsiyonel">
        {(a) => <textarea {...inputProps(a)} name="description" className={`${a.className} min-h-24`} />}
      </Field>

      <details className="rounded-xl border border-white/10 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-fg-muted">Daha fazla bilgi (opsiyonel)</summary>
        <div className="mt-4 space-y-4">
          <Field id="companyName" label="İşletme Adı">
            {(a) => <input {...inputProps(a)} name="companyName" className={a.className} />}
          </Field>
          <Field id="email" label="E-posta">
            {(a) => <input {...inputProps(a)} name="email" type="email" className={a.className} />}
          </Field>
          <Field id="city" label="Şehir">
            {(a) => <input {...inputProps(a)} name="city" className={a.className} />}
          </Field>
          <Field id="sector" label="Sektör">
            {(a) => <input {...inputProps(a)} name="sector" className={a.className} />}
          </Field>
        </div>
      </details>

      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Kaydediliyor…' : 'Lead’i Kaydet'}
      </button>
    </form>
  );
}
