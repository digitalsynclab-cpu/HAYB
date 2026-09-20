'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Uygulama ekran görüntüleri: yatay kaydırılabilir şerit + büyütme penceresi.
 * Pencere dışına dokunarak, X ile veya Escape ile kapanır; oklar ve klavye okları ile gezilir.
 */
export function ScreenGallery({ name, images }: { name: string; images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', key);
      lastFocus.current?.focus();
    };
  }, [open === null, step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0" aria-label={`${name} ekran görüntüleri`}>
        {images.map((src, i) => (
          <li key={src} className="w-[10.5rem] shrink-0 snap-start sm:w-[12.5rem] lg:w-auto">
            <button
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`${name} ekran ${i + 1}, büyüt`}
              className="press group relative block aspect-[9/19.5] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-glass transition hover:-translate-y-1 hover:border-lime/60"
            >
              <Image src={src} alt={`${name} uygulaması ekran görüntüsü ${i + 1}`} fill sizes="(min-width:1024px) 180px, 200px" className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-sm text-fg-muted">Büyütmek için bir ekrana dokunun.</p>

      {open !== null &&
        createPortal(
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-3" onClick={() => setOpen(null)}>
            <div aria-hidden className="modal-backdrop absolute inset-0 bg-ink-950/90 backdrop-blur-sm" />
            <div role="dialog" aria-modal="true" aria-label={`${name} ekran görüntüsü ${open + 1} / ${images.length}`} className="modal-sheet relative flex max-h-full w-full max-w-md flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-[80dvh] w-full max-w-[24rem]">
                <Image key={images[open]} src={images[open]} alt={`${name} uygulaması ekran görüntüsü ${open + 1}`} fill sizes="400px" className="object-contain" priority />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button type="button" onClick={() => step(-1)} aria-label="Önceki ekran" className="press grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-lime hover:text-lime">
                  <ChevronLeft aria-hidden className="h-6 w-6" />
                </button>
                <span className="min-w-[4rem] text-center text-sm font-semibold text-white">
                  {open + 1} / {images.length}
                </span>
                <button type="button" onClick={() => step(1)} aria-label="Sonraki ekran" className="press grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white hover:border-lime hover:text-lime">
                  <ChevronRight aria-hidden className="h-6 w-6" />
                </button>
              </div>
              <button ref={closeRef} type="button" onClick={() => setOpen(null)} aria-label="Pencereyi kapat" className="press absolute right-0 top-0 grid h-11 w-11 place-items-center rounded-full bg-ink-950/80 text-lime ring-1 ring-white/20">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
