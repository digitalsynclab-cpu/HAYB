'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { markSaleCompletedAction, updateSaleStatusAction, requestSaleInformationAction, rejectSaleAction } from './actions';

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

export function ApproveSaleButton({ saleId, nextStatus, label }: { saleId: string; nextStatus: 'reviewing' | 'approved' | 'payment_pending' | 'paid' | 'project_started' | 'in_progress'; label: string }) {
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
            const res = await updateSaleStatusAction(saleId, nextStatus);
            if (!res.ok) setError(res.error || 'Hata');
            router.refresh();
          })
        }
        className="rounded-lg border border-lime/40 bg-lime/10 px-3 py-1.5 text-xs font-semibold text-lime hover:bg-lime/20 disabled:opacity-50"
      >
        {pending ? 'İşleniyor…' : label}
      </button>
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function RequestInfoButton({ saleId }: { saleId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-fg hover:border-white/40"
      >
        Ek Bilgi İste
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-80">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Partnere hangi bilgi eksik, açıklayın."
        rows={2}
        className="w-full rounded-lg border border-white/20 bg-black/20 p-2 text-xs text-fg"
      />
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending || !message.trim()}
          onClick={() =>
            startTransition(async () => {
              const fd = new FormData();
              fd.set('message', message);
              const res = await requestSaleInformationAction(saleId, fd);
              if (!res.ok) setError(res.error || 'Hata');
              else setOpen(false);
              router.refresh();
            })
          }
          className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50"
        >
          {pending ? 'Gönderiliyor…' : 'Gönder'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-fg-muted">
          Vazgeç
        </button>
      </div>
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function RejectSaleButton({ saleId }: { saleId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/20"
      >
        Reddet
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-80">
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reddetme nedeni (partnere gösterilecek)"
        rows={2}
        className="w-full rounded-lg border border-white/20 bg-black/20 p-2 text-xs text-fg"
      />
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending || !reason.trim()}
          onClick={() =>
            startTransition(async () => {
              const fd = new FormData();
              fd.set('reason', reason);
              const res = await rejectSaleAction(saleId, fd);
              if (!res.ok) setError(res.error || 'Hata');
              else setOpen(false);
              router.refresh();
            })
          }
          className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 disabled:opacity-50"
        >
          {pending ? 'Gönderiliyor…' : 'Reddet'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-fg-muted">
          Vazgeç
        </button>
      </div>
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
