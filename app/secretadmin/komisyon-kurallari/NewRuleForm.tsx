'use client';

import { useActionState } from 'react';
import { createCommissionRuleAction, type RuleActionResult } from './actions';

const initial: RuleActionResult = { ok: false };

export function NewRuleForm({ services, partners }: { services: { id: string; name: string }[]; partners: { id: string; partner_code: string }[] }) {
  const [state, formAction, pending] = useActionState(createCommissionRuleAction, initial);

  return (
    <form action={formAction} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2 lg:grid-cols-4">
      {state.error && <p className="text-sm font-medium text-red-300 sm:col-span-2 lg:col-span-4">{state.error}</p>}
      <input name="name" placeholder="Kural adı" required className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm" />
      <select name="serviceId" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm">
        <option value="">Hizmet (opsiyonel)</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <select name="partnerId" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm">
        <option value="">Partner (opsiyonel)</option>
        {partners.map((p) => (
          <option key={p.id} value={p.id}>
            {p.partner_code}
          </option>
        ))}
      </select>
      <select name="commissionType" required className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm">
        <option value="">Komisyon Türü</option>
        <option value="percentage">Yüzde</option>
        <option value="fixed">Sabit Tutar</option>
      </select>
      <input name="commissionValue" type="number" step="0.01" min="0" required placeholder="Komisyon Değeri" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm" />
      <input name="minimumSaleAmount" type="number" step="0.01" min="0" placeholder="Min. satış tutarı (opsiyonel)" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm" />
      <input name="maximumSaleAmount" type="number" step="0.01" min="0" placeholder="Maks. satış tutarı (opsiyonel)" className="min-h-11 rounded-xl border border-white/15 bg-ink-950/60 px-3 text-sm" />
      <button type="submit" disabled={pending} className="min-h-11 rounded-xl bg-lime px-4 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Ekleniyor…' : 'Kural Ekle'}
      </button>
    </form>
  );
}
