'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { approveCommissionAction, markCommissionPaidAction } from '../satislar/actions';

export function CommissionActions({ commissionId, status }: { commissionId: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showPay, setShowPay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'paid') return <span className="text-xs text-fg-muted">Ödendi</span>;

  return (
    <div className="space-y-2">
      {error && <p className="text-xs text-red-300">{error}</p>}
      <div className="flex gap-2">
        {status !== 'approved' && status !== 'payable' && (
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                const res = await approveCommissionAction(commissionId);
                if (!res.ok) setError(res.error || 'Hata');
                router.refresh();
              })
            }
            className="rounded-lg border border-white/20 px-3 py-1.5 text-xs hover:border-white/40 disabled:opacity-50"
          >
            Onayla
          </button>
        )}
        <button type="button" onClick={() => setShowPay((v) => !v)} className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-lime-soft">
          Ödemeyi Gerçekleştir
        </button>
      </div>
      {showPay && (
        <form
          action={(fd) =>
            startTransition(async () => {
              const res = await markCommissionPaidAction(commissionId, fd);
              if (!res.ok) setError(res.error || 'Hata');
              else setShowPay(false);
              router.refresh();
            })
          }
          className="flex flex-wrap gap-2"
        >
          <input name="paymentMethod" placeholder="Yöntem (EFT, Havale…)" className="min-h-9 rounded-lg border border-white/15 bg-ink-950/60 px-2 text-xs" />
          <input name="paymentReference" placeholder="Referans no" className="min-h-9 rounded-lg border border-white/15 bg-ink-950/60 px-2 text-xs" />
          <button type="submit" disabled={pending} className="rounded-lg border border-lime px-3 py-1.5 text-xs font-semibold text-lime disabled:opacity-50">
            Kaydet
          </button>
        </form>
      )}
    </div>
  );
}
