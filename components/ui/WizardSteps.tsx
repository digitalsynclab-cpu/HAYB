'use client';

// 21st.dev "Wizard Steps" bileşeninden uyarlanmıştır (ddoemonn), HAYB marka tonlarına (ink/lime) taşınmıştır.
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const RAIL = { type: 'spring', stiffness: 520, damping: 40, mass: 0.5 } as const;

type Direction = 1 | -1;

export interface WizardStepDef {
  id: string;
  label: string;
  content: ReactNode;
}

interface WizardStepsProps {
  steps: WizardStepDef[];
  index: number;
  onIndexChange: (index: number, direction: Direction) => void;
  onFinish?: () => void;
  canAdvance?: boolean;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  className?: string;
}

function clampIndex(value: number, total: number) {
  if (total < 1) return 0;
  return Math.max(0, Math.min(total - 1, Math.trunc(value)));
}

export function WizardSteps({
  steps,
  index,
  onIndexChange,
  onFinish,
  canAdvance = true,
  backLabel = 'Geri',
  nextLabel = 'Devam Et',
  finishLabel = 'Gönder',
  className = '',
}: WizardStepsProps) {
  const total = steps.length;
  const at = clampIndex(index, total);
  const reduced = useReducedMotion();
  const [furthest, setFurthest] = useState(at);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFurthest((f) => Math.max(f, at));
  }, [at]);

  const goTo = useCallback(
    (target: number) => {
      const clamped = clampIndex(target, total);
      if (clamped === at) return;
      onIndexChange(clamped, clamped > at ? 1 : -1);
    },
    [at, onIndexChange, total],
  );

  const isFirst = at === 0;
  const isLast = at === total - 1;

  const next = () => {
    if (isLast) {
      onFinish?.();
      return;
    }
    if (!canAdvance) return;
    goTo(at + 1);
  };
  const back = () => goTo(at - 1);

  const onStepKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    let target = at;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = at + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = at - 1;
    else return;
    e.preventDefault();
    target = Math.min(clampIndex(target, total), furthest);
    if (target !== at) goTo(target);
  };

  const step = steps[at];
  if (!step) return null;
  const position = `Adım ${at + 1} / ${total}: ${step.label}`;

  return (
    <div className={`w-full ${className}`}>
      <p aria-live="polite" className="sr-only">
        {position}
      </p>
      <ol aria-label="Adımlar" className="mb-6 flex list-none items-center gap-1.5 p-0">
        {steps.map((s, i) => {
          const done = i < at;
          const here = i === at;
          const reachable = i <= furthest;
          const tile = (
            <motion.span
              aria-hidden
              className={`grid size-8 place-items-center rounded-lg border text-[13px] font-semibold tabular-nums transition-colors duration-150 ${
                done
                  ? 'border-lime bg-lime text-ink-950'
                  : here
                    ? 'border-lime/60 bg-white/10 text-fg'
                    : 'border-white/15 bg-white/5 text-fg-muted'
              }`}
              initial={false}
              animate={{ scale: here ? 1 : 0.92 }}
              transition={reduced ? { duration: 0 } : RAIL}
            >
              {done ? '✓' : i + 1}
            </motion.span>
          );
          return (
            <li key={s.id} className="flex flex-1 items-center gap-1.5 last:flex-none">
              {reachable ? (
                <button
                  type="button"
                  data-current={here ? 'true' : undefined}
                  aria-current={here ? 'step' : undefined}
                  aria-label={`Adım ${i + 1}: ${s.label}`}
                  onKeyDown={onStepKeyDown}
                  onClick={() => !here && goTo(i)}
                  className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  {tile}
                </button>
              ) : (
                <span>
                  <span className="sr-only">{`Adım ${i + 1}: ${s.label}`}</span>
                  {tile}
                </span>
              )}
              {i < total - 1 && (
                <span aria-hidden className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-lime"
                    initial={false}
                    animate={{ scaleX: i < at ? 1 : 0 }}
                    transition={reduced ? { duration: 0 } : RAIL}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mb-3 text-sm font-semibold text-fg-muted">{step.label}</p>
      {/*
        ÖNEMLİ: Tüm adımlar TEK, SABİT bir listede her zaman mount edilmiş kalır; yalnızca CSS (hidden)
        ile gizlenir. Adımı koşullu render edip unmount etmek (örn. AnimatePresence ile içerik değişimi),
        native <form> submit edildiğinde yalnızca o an görünen adımın input'larının FormData'ya girmesine
        ve önceki adımlarda girilen tüm verinin sessizce kaybolmasına yol açar. React reconciliation da
        aynı içeriği ağaçta farklı bir konuma taşımak unmount/remount'a (ve değer kaybına) neden olur —
        bu yüzden her adım, render sırasında hep AYNI .map() çıktısındaki sabit konumunda kalır.
      */}
      <div
        ref={viewportRef}
        role="group"
        aria-label={position}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        {steps.map((s, i) => (
          <div key={s.id} className={i === at ? '' : 'hidden'} aria-hidden={i === at ? undefined : true}>
            {s.content}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        {!isFirst && (
          <button
            type="button"
            onClick={back}
            className="min-h-11 rounded-xl border border-white/20 px-5 text-sm font-semibold text-fg hover:border-white/40"
          >
            {backLabel}
          </button>
        )}
        <button
          type={isLast ? 'submit' : 'button'}
          onClick={isLast ? undefined : next}
          disabled={!canAdvance}
          className="ml-auto min-h-11 rounded-xl bg-lime px-6 text-sm font-semibold text-ink-950 transition hover:bg-lime-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLast ? finishLabel : nextLabel}
        </button>
      </div>
    </div>
  );
}
