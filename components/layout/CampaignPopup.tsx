'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { campaign, priceParts } from '@/data/campaign';
import { webPackages } from '@/data/pricing';

const END = new Date(campaign.endsAt).getTime();
const pad = (n: number) => String(n).padStart(2, '0');

function useCountdown() {
  const [left, setLeft] = useState(() => Math.max(0, END - Date.now()));
  useEffect(() => {
    const t = window.setInterval(() => setLeft(Math.max(0, END - Date.now())), 1000);
    return () => window.clearInterval(t);
  }, []);
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1100);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}</>;
}

function Box({ v, label }: { v: number; label: string }) {
  return (
    <div className="camp-box">
      <span className="text-xl font-extrabold tabular-nums leading-none sm:text-3xl">{pad(v)}</span>
      <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white/60">{label}</span>
    </div>
  );
}

/** Süreli kampanya penceresi: açılış animasyonundan sonra çıkar; dışına dokunarak, X ile veya Escape ile kapanır. */
export function CampaignPopup() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = useCountdown();
  const starter = webPackages[0];
  const parts = priceParts(starter.price);

  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    let started = false;
    const show = () => {
      if (started) return;
      started = true;
      window.clearTimeout(timer);
      window.removeEventListener('hayb:intro-end', show);
      if (Date.now() >= END) {
        window.dispatchEvent(new Event('hayb:campaign-end'));
        return;
      }
      window.setTimeout(() => setOpen(true), 500);
    };
    if (root.classList.contains('intro-active')) {
      window.addEventListener('hayb:intro-end', show);
      // Güvenlik: açılış olayı gelmese de kampanya açılıştan sonra mutlaka çıkar.
      timer = window.setTimeout(show, Math.max(1200, 3000 - performance.now()));
    } else {
      show();
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hayb:intro-end', show);
    };
  }, []);

  const close = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      window.dispatchEvent(new Event('hayb:campaign-end'));
    }, 320);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4" onClick={close}>
      <div aria-hidden className={`absolute inset-0 bg-ink-950/75 backdrop-blur-sm ${leaving ? 'camp-fade-out' : 'modal-backdrop'}`} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="kampanya-baslik"
        onClick={(e) => e.stopPropagation()}
        className={`camp-card relative w-full max-w-[21rem] sm:max-w-md ${leaving ? 'camp-out' : 'camp-in'}`}
      >
        <span aria-hidden className="cookie-glow" />
        <div className="camp-body">
          {['left-[8%] top-[14%]', 'right-[10%] top-[26%]', 'left-[16%] bottom-[30%]', 'right-[18%] bottom-[18%]'].map((c, i) => (
            <span key={c} aria-hidden className={`camp-spark ${c}`} style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Kampanya penceresini kapat"
            className="press absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:border-lime hover:text-lime"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>

          <p className="camp-tag">
            <span aria-hidden className="h-2 w-2 rounded-full bg-ink-950 camp-pulse" /> Süreli kampanya
          </p>
          <h2 id="kampanya-baslik" className="sr-only">
            {campaign.title}: tüm paketlerde %{campaign.rate} indirim
          </h2>

          <div aria-hidden className="mt-3 flex items-end justify-center gap-2 text-lime sm:mt-4">
            <span className="camp-percent text-[3.9rem] font-black leading-[0.8] tracking-tighter sm:text-[8rem]">
              %<CountUp to={campaign.rate} />
            </span>
            <span className="mb-1 text-lg font-extrabold text-white sm:mb-2 sm:text-3xl">
              İNDİRİM
            </span>
          </div>
          <p className="mt-3 text-center text-[0.85rem] leading-snug text-white/75 sm:mt-4 sm:text-base">{campaign.text}</p>

          {parts && (
            <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:mt-4 sm:px-4 sm:py-3 sm:text-sm [&_s]:whitespace-nowrap [&_strong]:whitespace-nowrap">
              <span className="text-white/60">Örn. {starter.name.charAt(0) + starter.name.slice(1).toLowerCase()} web sitesi</span>
              <s className="text-white/50">{parts.list}</s>
              <strong className="text-lg font-extrabold text-lime sm:text-xl">{parts.sale}</strong>
            </p>
          )}

          <div className="mt-4 sm:mt-5" role="timer" aria-label="Kampanya bitişine kalan süre">
            <p className="mb-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/60 sm:mb-2 sm:text-xs">Kampanya bitimine</p>
            <div className="grid grid-cols-4 gap-2">
              <Box v={t.d} label="Gün" />
              <Box v={t.h} label="Saat" />
              <Box v={t.m} label="Dk" />
              <Box v={t.s} label="Sn" />
            </div>
          </div>

          <div className="mt-4 grid gap-1.5 sm:mt-5 sm:gap-2.5">
            <Link
              href="/paketler"
              onClick={close}
              className="press camp-cta inline-flex min-h-12 items-center justify-center rounded-xl bg-lime px-5 py-3 text-base font-extrabold text-ink-950 sm:min-h-13 sm:py-3.5 sm:text-lg"
            >
              Kampanyalı fiyatları gör
            </Link>
            <button type="button" onClick={close} className="press min-h-11 rounded-xl px-5 text-sm font-semibold text-white/70 hover:text-white">
              Şimdi değil
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
