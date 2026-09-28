'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Minus, X } from 'lucide-react';
import { Price } from '@/components/ui/Price';
import { AddToCartButton } from '@/components/pricing/AddToCartButton';
import type { PricingPlan } from '@/types';

export interface DetailRow {
  label: string;
  value: string | boolean;
}

/**
 * "Detayları gör": paket özelliklerini sayfadan ayrılmadan bir pencerede gösterir.
 * Pencere dışına dokunarak, Kapat düğmesiyle veya Escape ile kapanır.
 */
export function PlanDetails({ plan, rows, category = 'Web Sitesi' }: { plan: PricingPlan; rows: DetailRow[]; category?: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const opener = openerRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open]);

  const included = rows.filter((r) => r.value !== false);
  const excluded = rows.filter((r) => r.value === false);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="press inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-on-light/25 bg-white px-5 font-semibold text-on-light transition hover:border-on-light"
      >
        Detayları gör
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center" onClick={() => setOpen(false)}>
            <div aria-hidden className="modal-backdrop absolute inset-0 bg-ink-950/70 backdrop-blur-sm" />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`plan-${plan.id}-baslik`}
              onClick={(e) => e.stopPropagation()}
              className="modal-sheet relative flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] bg-paper-50 text-on-light shadow-glass sm:rounded-[1.75rem]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-on-light/10 px-5 pb-4 pt-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-light-muted">Paket detayları</p>
                  <h3 id={`plan-${plan.id}-baslik`} className="mt-1 text-2xl font-extrabold">
                    {plan.name}
                  </h3>
                  <Price price={plan.price} size="md" className="mt-1" />
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Pencereyi kapat"
                  className="press grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink-950 text-lime"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto overscroll-contain px-5 py-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-on-light-muted">Pakete dahil</h4>
                <ul className="mt-3 space-y-2.5">
                  {included.map((r) => (
                    <li key={r.label} className="flex gap-3 text-[0.97rem]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-ink-950">
                        <Check aria-hidden className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        {r.label}
                        {typeof r.value === 'string' && <span className="block font-semibold">{r.value}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                {excluded.length > 0 && (
                  <>
                    <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-on-light-muted">Bu pakette yok</h4>
                    <ul className="mt-3 space-y-2 text-[0.95rem] text-on-light-muted">
                      {excluded.map((r) => (
                        <li key={r.label} className="flex gap-3">
                          <Minus aria-hidden className="mt-1 h-4 w-4 shrink-0" />
                          {r.label}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="grid gap-2 border-t border-on-light/10 bg-white px-5 py-4 sm:grid-cols-2">
                <AddToCartButton plan={plan} category={category} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="press inline-flex min-h-12 items-center justify-center rounded-xl border border-on-light/25 px-5 font-semibold"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
