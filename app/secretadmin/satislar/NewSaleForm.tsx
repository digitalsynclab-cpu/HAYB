'use client';

import { useActionState } from 'react';
import { createSaleAction, type SaleActionResult } from './actions';

const initial: SaleActionResult = { ok: false };

interface Options {
  partners: { id: string; partner_code: string }[];
  services: { id: string; name: string }[];
  packages: { id: string; name: string; service_id: string }[];
}

export function NewSaleForm({ partners, services, packages }: Options) {
  const [state, formAction, pending] = useActionState(createSaleAction, initial);

  return (
    <form action={formAction} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2 lg:grid-cols-5">
      {state.error && <p className="text-sm font-medium text-red-300 sm:col-span-2 lg:col-span-5">{state.error}</p>}
      <select name="partnerId" required className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm">
        <option value="">Partner</option>
        {partners.map((p) => (
          <option key={p.id} value={p.id}>
            {p.partner_code}
          </option>
        ))}
      </select>
      <select name="serviceId" required className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm">
        <option value="">Hizmet</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <select name="packageId" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm">
        <option value="">Paket (opsiyonel)</option>
        {packages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input name="amount" type="number" min="0" step="0.01" required placeholder="Tutar (₺)" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm" />
      <button type="submit" disabled={pending} className="min-h-11 rounded-xl bg-lime px-4 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Ekleniyor…' : 'Satış Ekle'}
      </button>
    </form>
  );
}
