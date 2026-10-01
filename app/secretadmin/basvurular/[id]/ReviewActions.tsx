'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { approveApplicationAction, rejectApplicationAction, setApplicationStatusAction } from '../actions';

export function ReviewActions({ applicationId, status }: { applicationId: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [reason, setReason] = useState('');
  const [showReject, setShowReject] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runApprove = () => {
    setError(null);
    startTransition(async () => {
      const res = await approveApplicationAction(applicationId);
      if (!res.ok) setError(res.error || 'Hata oluştu.');
      else router.refresh();
    });
  };

  const runReject = () => {
    setError(null);
    startTransition(async () => {
      const res = await rejectApplicationAction(applicationId, reason);
      if (!res.ok) setError(res.error || 'Hata oluştu.');
      else router.refresh();
    });
  };

  const setStatus = (s: 'reviewing' | 'interview') => {
    startTransition(async () => {
      await setApplicationStatusAction(applicationId, s);
      router.refresh();
    });
  };

  if (status === 'approved' || status === 'rejected') {
    return <p className="text-sm text-fg-muted">Bu başvuru için karar verilmiş.</p>;
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm font-medium text-red-300">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={pending} onClick={() => setStatus('reviewing')} className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 disabled:opacity-50">
          İncelemeye Al
        </button>
        <button type="button" disabled={pending} onClick={() => setStatus('interview')} className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 disabled:opacity-50">
          Görüşme Aşamasına Al
        </button>
        <button type="button" disabled={pending} onClick={runApprove} className="rounded-xl bg-lime px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
          Onayla
        </button>
        <button type="button" disabled={pending} onClick={() => setShowReject((v) => !v)} className="rounded-xl border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:border-red-400 disabled:opacity-50">
          Reddet
        </button>
      </div>
      {showReject && (
        <div className="flex gap-3">
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Red sebebi (opsiyonel)"
            className="min-h-11 flex-1 rounded-xl border border-white/15 bg-ink-950/60 px-4 text-sm text-fg placeholder:text-fg-muted/70"
          />
          <button type="button" disabled={pending} onClick={runReject} className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50">
            Reddi Onayla
          </button>
        </div>
      )}
    </div>
  );
}
