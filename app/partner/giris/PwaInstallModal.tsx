'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, Share, SquarePlus, MoreVertical, Smartphone, X } from 'lucide-react';

type Platform = 'iphone' | 'android';

const IPHONE_STEPS = [
  { icon: Share, title: 'Safari’de HAYB Partner’ı aç', hint: 'Adres çubuğundaki paylaş simgesine dokun.' },
  { icon: Share, title: 'Paylaş butonuna dokun', hint: 'Ekranın altında beliren paylaş menüsü açılır.' },
  { icon: SquarePlus, title: '"Ana Ekrana Ekle"yi seç', hint: 'Menüde aşağı kaydırıp bu seçeneği bul.' },
  { icon: Smartphone, title: 'Artık uygulama gibi aç', hint: 'Ana ekranından tek dokunuşla panele ulaş.' },
] as const;

const ANDROID_STEPS = [
  { icon: MoreVertical, title: 'Chrome’da HAYB Partner’ı aç', hint: 'Sağ üstteki menü (üç nokta) butonuna dokun.' },
  { icon: MoreVertical, title: 'Menü butonuna dokun', hint: 'Açılan listede aşağı kaydır.' },
  { icon: Plus, title: '"Ana ekrana ekle"yi seç', hint: 'Onay penceresinde "Ekle"ye dokun.' },
  { icon: Smartphone, title: 'Artık uygulama gibi aç', hint: 'Ana ekranından tek dokunuşla panele ulaş.' },
] as const;

function StepCard({
  icon: Icon,
  title,
  hint,
  index,
  active,
}: {
  icon: typeof Share;
  title: string;
  hint: string;
  index: number;
  active: boolean;
}) {
  return (
    <div
      className="pwa-step flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5"
      style={{ ['--i' as string]: index }}
    >
      <div
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border text-sm font-bold transition-colors ${
          active ? 'border-lime bg-lime/10 text-lime shadow-[0_0_0_1px_rgb(var(--hayb-lime)/0.4),0_0_16px_rgb(var(--hayb-lime)/0.25)]' : 'border-white/20 text-fg-muted'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-fg">
          <Icon aria-hidden className="h-4 w-4 flex-none text-lime" />
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted">{hint}</p>
      </div>
    </div>
  );
}

export function PwaInstallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [platform, setPlatform] = useState<Platform>('iphone');
  const [closing, setClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const steps = platform === 'iphone' ? IPHONE_STEPS : ANDROID_STEPS;

  const requestClose = () => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 220);
  };

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-4" onClick={requestClose}>
      <div aria-hidden className={`absolute inset-0 bg-ink-950/75 backdrop-blur-sm ${closing ? 'pwa-backdrop-out' : 'modal-backdrop'}`} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-modal-baslik"
        onClick={(e) => e.stopPropagation()}
        className={`pwa-card relative flex w-full max-h-[92dvh] max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] sm:max-h-[85dvh] sm:rounded-[1.75rem] ${closing ? 'pwa-sheet-out' : 'pwa-sheet-in'}`}
      >
        <div className="relative flex-1 overflow-y-auto border border-white/10 bg-ink-950 p-5 sm:p-7">
          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="Pencereyi kapat"
            className="press absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-fg-muted hover:border-lime/50 hover:text-lime"
          >
            <X aria-hidden className="h-4.5 w-4.5" />
          </button>

          <p className="pr-12 text-xs font-semibold uppercase tracking-[0.25em] text-lime">HAYB Partner</p>
          <h2 id="pwa-modal-baslik" className="mt-1.5 pr-12 text-lg font-bold text-fg sm:text-xl">
            HAYB Partner&rsquo;ı uygulama gibi kullan
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Partner paneline daha hızlı ulaşmak için HAYB Partner&rsquo;ı telefonunun ana ekranına ekleyebilirsin.
          </p>

          <div role="tablist" aria-label="Platform seç" className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              role="tab"
              aria-selected={platform === 'iphone'}
              onClick={() => setPlatform('iphone')}
              className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors ${
                platform === 'iphone' ? 'bg-lime text-ink-950' : 'text-fg-muted hover:text-fg'
              }`}
            >
              iPhone
              <span className="block text-[0.68rem] font-normal opacity-80">Safari ile ekle</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={platform === 'android'}
              onClick={() => setPlatform('android')}
              className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors ${
                platform === 'android' ? 'bg-lime text-ink-950' : 'text-fg-muted hover:text-fg'
              }`}
            >
              Android
              <span className="block text-[0.68rem] font-normal opacity-80">Chrome ile ekle</span>
            </button>
          </div>

          <div key={platform} role="tabpanel" className="pwa-tabpanel mt-4 space-y-2.5">
            {steps.map((step, i) => (
              <StepCard key={step.title} icon={step.icon} title={step.title} hint={step.hint} index={i} active={i === steps.length - 1} />
            ))}
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="mt-5 min-h-12 w-full rounded-xl border border-white/15 text-sm font-semibold text-fg-muted hover:border-lime/40 hover:text-lime"
          >
            Anladım
          </button>
        </div>
      </section>
    </div>
  );
}
