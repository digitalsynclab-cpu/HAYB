'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateCommissionRuleValueAction, type RuleActionResult } from './actions';

const initial: RuleActionResult = { ok: false };

export function RuleValueEdit({ ruleId, commissionType, commissionValue }: { ruleId: string; commissionType: string; commissionValue: number }) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(updateCommissionRuleValueAction, initial);

  useEffect(() => {
    if (state.ok) setEditing(false);
  }, [state.ok]);

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-fg-muted hover:border-lime/50 hover:text-lime">
        Değeri Düzenle
      </button>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-1.5">
      <input type="hidden" name="ruleId" value={ruleId} />
      <input
        name="commissionValue"
        type="number"
        step="0.01"
        min="0"
        max={commissionType === 'percentage' ? 100 : undefined}
        defaultValue={commissionValue}
        required
        autoFocus
        className="h-8 w-24 rounded-lg border border-white/15 bg-ink-950/60 px-2 text-sm"
      />
      <button type="submit" disabled={pending} className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink-950 disabled:opacity-50">
        Kaydet
      </button>
      <button type="button" onClick={() => setEditing(false)} className="rounded-full border border-white/15 px-3 py-1 text-xs text-fg-muted">
        Vazgeç
      </button>
      {state.error && <span className="text-xs text-red-300">{state.error}</span>}
    </form>
  );
}
