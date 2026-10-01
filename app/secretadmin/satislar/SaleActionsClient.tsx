'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { markSaleCompletedAction } from './actions';

export function MarkCompletedButton({ saleId }: { saleId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const res = await markSaleCompletedAction(saleId);
            if (!res.ok) setError(res.error || 'Hata');
            router.refresh();
          })
        }
        className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50"
      >
        {pending ? 'İşleniyor…' : 'Tamamlandı Olarak İşaretle'}
      </button>
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
