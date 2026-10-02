'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Download, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PARTNER_BADGES } from '@/lib/partner/partner-badges';

/**
 * Dashboard'da sade bir promosyon kartı: tıklanınca tam ekran, tek-görsel-odaklı
 * bir galeri açar (yan yana grid değil). Yeni nav öğesi veya route eklenmez.
 */
export function PartnerBadgeCard() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const badge = PARTNER_BADGES[index];

  const goPrev = () => setIndex((i) => (i - 1 + PARTNER_BADGES.length) % PARTNER_BADGES.length);
  const goNext = () => setIndex((i) => (i + 1) % PARTNER_BADGES.length);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleDownload() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(badge.src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = badge.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(badge.src);
      const blob = await res.blob();
      const file = new File([blob], badge.fileName, { type: blob.type });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'HAYB Partneri', text: 'HAYB Partneri olarak dijital çözümler sunuyorum.' });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: 'HAYB Partneri', text: 'HAYB Partneri olarak dijital çözümler sunuyorum.', url: window.location.origin + badge.src });
        return;
      }
      // Fallback: paylaşım API'si yoksa (çoğunlukla masaüstü) indirmeye yönlendir.
      await handleDownload();
    } catch {
      /* kullanıcı paylaşım penceresini iptal etti — sessizce yok say */
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-lime/25 bg-gradient-to-br from-lime/10 via-white/5 to-transparent p-5">
        <p className="font-semibold">Partner kimliğini paylaş</p>
        <p className="mt-1 text-sm text-fg-muted">HAYB Partneri olduğunu gösteren özel rozetlerini keşfet.</p>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className="mt-3 rounded-lg bg-lime px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-lime-soft"
        >
          Partner Rozetlerini Al
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink-950">
          <div className="flex items-center justify-end p-4">
            <button type="button" onClick={() => setOpen(false)} aria-label="Kapat" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-fg hover:border-white/30">
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current == null) return;
              const diff = e.changedTouches[0].clientX - touchStartX.current;
              if (diff > 50) goPrev();
              else if (diff < -50) goNext();
              touchStartX.current = null;
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Önceki"
              className="absolute left-2 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-fg hover:border-white/30 sm:flex"
            >
              <ChevronLeft aria-hidden className="h-5 w-5" />
            </button>

            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl">
              <Image src={badge.src} alt={badge.label} fill sizes="400px" className="object-contain" priority />
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Sonraki"
              className="absolute right-2 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-fg hover:border-white/30 sm:flex"
            >
              <ChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pb-4 text-center">
            <p className="font-semibold">{badge.label}</p>
            <p className="mt-1 text-sm text-fg-muted">Paylaşmak istediğin tasarımı seç.</p>

            <div className="mt-3 flex justify-center gap-1.5">
              {PARTNER_BADGES.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-label={`${i + 1}. görsel`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-lime' : 'w-1.5 bg-white/25'}`}
                />
              ))}
            </div>

            <div className="mt-5 flex justify-center gap-3 pb-[env(safe-area-inset-bottom)]">
              <button type="button" disabled={busy} onClick={handleDownload} className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:border-white/40 disabled:opacity-50">
                <Download aria-hidden className="h-4 w-4" />
                Görseli İndir
              </button>
              <button type="button" disabled={busy} onClick={handleShare} className="flex items-center gap-2 rounded-xl bg-lime px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
                <Share2 aria-hidden className="h-4 w-4" />
                {busy ? 'Hazırlanıyor…' : 'Paylaş'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
