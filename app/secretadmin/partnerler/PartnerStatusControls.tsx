'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setPartnerStatusAction } from './actions';

export function PartnerStatusControls({ partnerId, status }: { partnerId: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const set = (s: 'active' | 'suspended' | 'inactive') =>
    startTransition(async () => {
      await setPartnerStatusAction(partnerId, s);
      router.refresh();
    });

  return (
    <div className="flex gap-2">
      {status !== 'active' && (
        <button type="button" disabled={pending} onClick={() => set('active')} className="rounded-lg border border-lime/50 px-3 py-1.5 text-xs text-lime hover:border-lime disabled:opacity-50">
          Aktifleştir
        </button>
      )}
      {status !== 'suspended' && (
        <button type="button" disabled={pending} onClick={() => set('suspended')} className="rounded-lg border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:border-red-400 disabled:opacity-50">
          Askıya Al
        </button>
      )}
    </div>
  );
}
