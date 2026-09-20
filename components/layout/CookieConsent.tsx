'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEY = 'hayb-cookie';
const OPEN_EVENT = 'hayb:cookie-open';

type Choice = 'accepted' | 'rejected';

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

function Cookie() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full">
      <path d="M32 3a29 29 0 1 0 29 29 11 11 0 0 1-13-11 11 11 0 0 1-11-13 6 6 0 0 0-5-5z" fill="rgb(var(--hayb-lime))" />
      <circle cx="21" cy="24" r="3.4" fill="#111" />
      <circle cx="36" cy="38" r="3.8" fill="#111" />
      <circle cx="22" cy="43" r="2.8" fill="#111" />
      <circle cx="44" cy="46" r="2.4" fill="#111" />
      <circle cx="32" cy="18" r="2.2" fill="#111" />
    </svg>
  );
}

/** Tercihi sonradan değiştirmek için düğme (politika sayfası ve alt bilgi). */
export function CookiePrefsButton({ className = '', children = 'Çerez tercihleri' }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  );
}

/**
 * Çerez onayı. Seçim tarayıcıda saklanır; isteğe bağlı bir ölçümleme aracı eklenirse yalnızca
 * "accepted" ise yüklenmelidir. Açılış animasyonu ve kampanya penceresi kapandıktan 2,5 saniye sonra görünür.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let timer = 0;
    const schedule = (ms: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setLeaving(false);
        setOpen(true);
      }, ms);
    };
    if (readChoice() === null) {
      if (document.documentElement.classList.contains('intro-active')) {
        window.addEventListener('hayb:campaign-end', () => schedule(2500), { once: true });
      } else {
        schedule(1200);
      }
    }
    const reopen = () => schedule(0);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const choose = (c: Choice) => {
    try {
      window.localStorage.setItem(KEY, c);
    } catch {
      /* depolama kapalıysa bu oturum için kapanır */
    }
    window.dispatchEvent(new CustomEvent('hayb:cookie-choice', { detail: c }));
    setLeaving(true);
    window.setTimeout(() => setOpen(false), 380);
  };

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[85] p-3 sm:bottom-4 sm:left-4 sm:right-auto sm:w-[27rem] sm:p-0">
      <section
        role="dialog"
        aria-labelledby="cerez-baslik"
        aria-describedby="cerez-metin"
        className={`cookie-card pointer-events-auto ${leaving ? 'cookie-out' : 'cookie-in'}`}
      >
        <span aria-hidden className="cookie-glow" />
        <div className="cookie-body">
          <div className="flex items-start gap-4">
            <span className="cookie-roll" aria-hidden>
              <Cookie />
            </span>
            <div>
              <h2 id="cerez-baslik" className="text-lg font-extrabold leading-tight">
                Çerezlere <span className="accent-text">ne dersiniz?</span>
              </h2>
              <p id="cerez-metin" className="mt-1.5 text-[0.9rem] leading-snug text-white/70">
                Tercihinizi hatırlamak için küçük bir kayıt tutuyoruz. İsteğe bağlı ölçümleme yalnızca onayınızla çalışır.{' '}
                <Link href="/cerez-politikasi" className="font-semibold text-lime underline underline-offset-2">
                  Çerez politikası
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="press min-h-12 rounded-xl bg-lime px-4 font-extrabold text-ink-950 transition hover:brightness-110"
            >
              Evet, kabul
            </button>
            <button
              type="button"
              onClick={() => choose('rejected')}
              className="press min-h-12 rounded-xl border border-white/25 px-4 font-bold text-white transition hover:border-lime hover:text-lime"
            >
              Hayır
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
