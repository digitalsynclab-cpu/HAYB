'use client';

import { useState } from 'react';
import { Smartphone, ChevronRight } from 'lucide-react';
import { PwaInstallModal } from './PwaInstallModal';

export function PwaInstallCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="press mt-6 flex w-full items-center gap-3 rounded-2xl border border-lime/25 bg-lime/5 p-4 text-left transition hover:border-lime/50 hover:bg-lime/10"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-lime/30 bg-lime/10 text-lime">
          <Smartphone aria-hidden className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-fg">Telefonunda uygulama gibi kullan</span>
          <span className="mt-0.5 block text-xs text-fg-muted">Ana ekranına ekle, tek dokunuşla panele ulaş. Nasıl eklenir?</span>
        </span>
        <ChevronRight aria-hidden className="h-4 w-4 flex-none text-lime" />
      </button>
      <PwaInstallModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
