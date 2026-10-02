'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteApplicationAction } from './actions';

export function DeleteApplicationButton({ applicationId, redirectTo }: { applicationId: string; redirectTo?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!window.confirm('Bu başvuruyu kalıcı olarak silmek istediğinize emin misiniz?')) return;
          setError(null);
          startTransition(async () => {
            const res = await deleteApplicationAction(applicationId);
            if (!res.ok) setError(res.error || 'Hata oluştu.');
            else if (redirectTo) router.push(redirectTo);
            else router.refresh();
          });
        }}
        className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-400/10 disabled:opacity-50"
      >
        {pending ? 'Siliniyor…' : 'Sil'}
      </button>
      {error && <p className="max-w-[12rem] text-right text-xs text-red-300">{error}</p>}
    </div>
  );
}
