'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Globe, X } from 'lucide-react';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { LOCALES, type Locale } from '@/lib/i18n/locale';
import { RATES } from '@/lib/i18n/rates';

const COPY: Record<Locale, { title: string; text: string; note: string; close: string; open: string }> = {
  tr: {
    title: 'Dilinizi Seçin',
    text: 'Sitenin dilini ve fiyatların gösterileceği para birimini değiştirin.',
    note: 'Fiyatlar TL esaslıdır. EUR ve USD tutarları 28 Eylül 2026 kurlarıyla hesaplanır.',
    close: 'Kapat',
    open: 'Dil seçimi',
  },
  en: {
    title: 'Choose Your Language',
    text: 'Change the site language and the currency prices are shown in.',
    note: 'Prices are set in Turkish lira. USD and EUR amounts use the rates of 28 September 2026.',
    close: 'Close',
    open: 'Language',
  },
  de: {
    title: 'Wählen Sie Ihre Sprache',
    text: 'Ändern Sie die Sprache der Website und die Währung der Preise.',
    note: 'Die Preise gelten in türkischen Lira. USD- und EUR-Beträge werden zum Kurs vom 28. September 2026 berechnet.',
    close: 'Schließen',
    open: 'Sprache',
  },
};

const CURRENCY_LINE: Record<Locale, string> = {
  tr: 'Türk Lirası · ₺',
  de: `Euro · € (1 € = ${RATES.EUR.toLocaleString('tr-TR')} ₺)`,
  en: `US Dollar · $ (1 $ = ${RATES.USD.toLocaleString('tr-TR')} ₺)`,
};

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
      className={`press inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] px-3 text-sm font-semibold text-fg transition hover:border-lime/60 ${className}`}
    >
      <Globe aria-hidden className="h-[1.15rem] w-[1.15rem]" />
      <span className="hidden sm:inline">{LOCALES.find((l) => l.code === locale)?.short}</span>
    </button>
  );
}

/** Dil ve para birimi seçim penceresi: üstte sarkan kapat düğmesi, sırayla beliren satırlar. */
export function LanguageModal() {
  const { locale, setLocale, pickerOpen, closePicker } = useLocale();
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = COPY[locale];

  const finish = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      closePicker();
    }, 240);
  }, [closePicker]);

  useEffect(() => {
    if (!pickerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
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
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', key);
    };
  }, [pickerOpen, finish]);

  if (!pickerOpen) return null;

  return (
    <div className="fixed inset-0 z-[95]" role="presentation" data-no-i18n>
      <div onClick={finish} aria-hidden className={`absolute inset-0 bg-ink-950/90 backdrop-blur-md ${closing ? 'cs-fade-out' : 'cs-fade-in'}`} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lang-title"
          className={`pointer-events-auto relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-ink-900 px-5 pb-6 pt-14 sm:px-8 ${closing ? 'cs-sheet-out' : 'cs-sheet-in'}`}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={finish}
            aria-label={copy.close}
            className="press absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-ink-900 text-white/80 hover:text-white"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
          <h2 id="lang-title" className="text-center text-2xl font-bold sm:text-[1.7rem]">{copy.title}</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-white/55">{copy.text}</p>

          <ul className="mt-8 space-y-3">
            {LOCALES.map((l, i) => {
              const on = l.code === locale;
              return (
                <li key={l.code} className="lang-row" style={{ ['--i' as string]: i }}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocale(l.code);
                      window.setTimeout(finish, 280);
                    }}
                    aria-pressed={on}
                    className={`group relative flex min-h-[4.75rem] w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border px-5 text-left transition duration-300 ${
                      on ? 'border-lime/70 bg-lime/[0.09]' : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
                    }`}
                  >
                    {on && <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-lime/20 to-transparent" />}
                    <span className="relative">
                      <span className="block text-xl font-semibold sm:text-2xl">{l.label}</span>
                      <span className="mt-0.5 block text-xs text-white/50">{CURRENCY_LINE[l.code]}</span>
                    </span>
                    <span className="relative inline-flex items-center gap-2">
                      <span className={`grid h-10 min-w-10 place-items-center rounded-full border px-2 text-sm font-bold ${on ? 'border-lime bg-lime text-ink-950' : 'border-white/20 text-white/80'}`}>
                        {on ? <Check aria-hidden className="h-4 w-4" /> : l.short}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-xs leading-relaxed text-white/40">{copy.note}</p>
        </div>
      </div>
    </div>
  );
}
