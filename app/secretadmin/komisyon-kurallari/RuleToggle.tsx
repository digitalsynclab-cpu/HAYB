'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleCommissionRuleAction } from './actions';

export function RuleToggle({ ruleId, isActive }: { ruleId: string; isActive: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await toggleCommissionRuleAction(ruleId, !isActive);
          router.refresh();
        })
      }
      className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive ? 'bg-lime/20 text-lime' : 'bg-white/10 text-fg-muted'}`}
    >
      {isActive ? 'Aktif' : 'Pasif'}
    </button>
  );
}
