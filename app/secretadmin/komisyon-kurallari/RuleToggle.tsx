'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleCommissionRuleAction, deleteCommissionRuleAction } from './actions';

export function RuleToggle({ ruleId, isActive }: { ruleId: string; isActive: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex items-center gap-2">
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
      {!isActive && (
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (!window.confirm('Bu pasif kuralı kalıcı olarak silmek istediğinize emin misiniz?')) return;
            startTransition(async () => {
              await deleteCommissionRuleAction(ruleId);
              router.refresh();
            });
          }}
          className="rounded-full border border-red-400/30 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-400/10"
        >
          Sil
        </button>
      )}
    </div>
  );
}
