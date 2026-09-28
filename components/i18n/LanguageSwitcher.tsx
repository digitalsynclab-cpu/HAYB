'use client';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Globe, X } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { LOCALES, type Locale } from '@/lib/i18n/locale';
import { COUNTRY_MAPS, MAP_VIEWBOX } from '@/data/i18n-maps';

const COPY: Record<Locale, { title: string; text: string; close: string; open: string }> = {
  tr: { title: 'Dilinizi Seçin', text: 'Sitenin dilini değiştirin. Seçiminiz bir sonraki ziyaretinizde de hatırlanır.', close: 'Kapat', open: 'Dil seçimi' },
  en: { title: 'Choose Your Language', text: 'Change the language of the site. Your choice is remembered on your next visit.', close: 'Close', open: 'Language' },
  de: { title: 'Wählen Sie Ihre Sprache', text: 'Ändern Sie die Sprache der Website. Ihre Auswahl wird beim nächsten Besuch gespeichert.', close: 'Schließen', open: 'Sprache' },
};

const NAMES: Record<Locale, string> = { tr: 'Türkiye', de: 'Deutschland', en: 'United Kingdom' };

/** Gerçek coğrafi veriden (Natural Earth) üretilmiş ülke silüeti ve şehir noktası. */
function CountryMap({ code, active }: { code: Locale; active: boolean }) {
  const m = COUNTRY_MAPS[code];
  return (
    <svg viewBox={MAP_VIEWBOX} aria-hidden className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <path d={m.d} fill={active ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.17)'} stroke="none" fillRule="evenodd" strokeLinejoin="round" />
      <circle cx={m.dot[0]} cy={m.dot[1]} r="3.4" fill="#fff" />
    </svg>
  );
}

/** Yuvarlak bayrak simgeleri (sade, yalnızca renk blokları). */
function Flag({ code }: { code: Locale }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
      <clipPath id={`fl-${code}`}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#fl-${code})`}>
        {code === 'tr' && (
          <>
            <rect width="24" height="24" fill="#E30A17" />
            <circle cx="10" cy="12" r="5" fill="#fff" />
            <circle cx="11.4" cy="12" r="4" fill="#E30A17" />
            <path d="M15.6 12l2.6-.9-1.6 2.2v-2.6l1.6 2.2z" fill="#fff" />
          </>
        )}
        {code === 'de' && (
          <>
            <rect width="24" height="8" fill="#000" />
            <rect y="8" width="24" height="8" fill="#DD0000" />
            <rect y="16" width="24" height="8" fill="#FFCE00" />
          </>
        )}
        {code === 'en' && (
          <>
            <rect width="24" height="24" fill="#012169" />
            <path d="M0 0L24 24M24 0L0 24" stroke="#fff" strokeWidth="4.5" />
            <path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" strokeWidth="2" />
            <path d="M12 0V24M0 12H24" stroke="#fff" strokeWidth="7" />
            <path d="M12 0V24M0 12H24" stroke="#C8102E" strokeWidth="4" />
          </>
        )}
      </g>
    </svg>
  );
}

/** Header'daki dünya simgeli dil düğmesi. */
export function LanguageButton({ className = '' }: { className?: string }) {
  const { locale, openPicker } = useLocale();
  return (
    <button
      type="button"
      onClick={openPicker}
      aria-label={COPY[locale].open}
      aria-haspopup="dialog"
      data-no-i18n
      className={`press inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-fg transition hover:border-lime/60 ${className}`}
    >
      <Globe aria-hidden className="h-[1.2rem] w-[1.2rem]" />
    </button>
  );
}

const panel: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.08, delayChildren: 0.12 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const row: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
};

/**
 * Dil seçim penceresi: tam ekran koyu zemin, üstte kapat düğmesi, her dil için ülke silüeti ve bayraklı düğme.
 * Yalnızca dil seçimi; fiyat veya alan adı bilgisi içermez.
 */
export function LanguageModal() {
  const { locale, setLocale, pickerOpen, closePicker } = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = COPY[locale];

  useEffect(() => {
    if (!pickerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 250);
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePicker();
      if (e.key === 'Tab' && panelRef.current) {
        const f = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled])'));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', key);
    };
  }, [pickerOpen, closePicker]);

  return (
    <AnimatePresence>
      {pickerOpen && (
        <motion.div className="fixed inset-0 z-[95] overflow-y-auto bg-[#060608]/95 backdrop-blur-xl" role="presentation" data-no-i18n initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={closePicker}>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-lime/15 to-transparent" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lang-title"
            className="relative mx-auto flex min-h-full w-full max-w-md flex-col px-5 pb-10 pt-16"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closePicker}
              aria-label={copy.close}
              className="press absolute left-1/2 top-6 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border border-white/10 bg-[#0d0d10] text-white/80 transition hover:text-white"
            >
              <X aria-hidden className="h-6 w-6" />
            </button>
            <motion.h2 variants={row} id="lang-title" className="mt-14 text-center text-2xl font-semibold text-white sm:text-[1.7rem]">
              {copy.title}
            </motion.h2>
            <motion.p variants={row} className="mx-auto mt-4 max-w-xs text-center text-sm leading-relaxed text-white/55">
              {copy.text}
            </motion.p>

            <ul className="mt-12 space-y-4">
              {LOCALES.map((l) => {
                const on = l.code === locale;
                                return (
                  <motion.li key={l.code} variants={row}>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setLocale(l.code);
                        window.setTimeout(closePicker, 320);
                      }}
                      aria-pressed={on}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex min-h-[7.5rem] w-full items-center justify-between gap-3 overflow-hidden rounded-[1.4rem] px-5 text-left ${on ? 'border border-lime/40' : 'border border-transparent'}`}
                    >
                      {on && (
                        <motion.span
                          layoutId="lang-active"
                          aria-hidden
                          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(166,255,65,0.55),rgba(166,255,65,0.16)_55%,rgba(166,255,65,0.04))]"
                          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                        />
                      )}
                      <span aria-hidden className="pointer-events-none absolute inset-y-2 left-2 w-[46%] opacity-90">
                        <CountryMap code={l.code} active={on} />
                      </span>
                      <span className="relative z-10 pl-[3.2rem] text-[1.35rem] font-medium text-white sm:text-2xl">{NAMES[l.code]}</span>
                      <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-2 text-sm font-semibold text-white">
                        <Flag code={l.code} />
                        {l.label}
                      </span>
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
