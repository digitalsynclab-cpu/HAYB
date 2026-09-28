'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Hand, Headset, Mail, PenLine, X } from 'lucide-react';
import { whatsappUrl } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

const PHONE_DISPLAY = '+90 507 342 06 61';
const PHONE_TEL = '+905073420661';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { name?: string; email?: string; consent?: string };

export function buildContactMessage(name: string, email: string) {
  return `Merhabalar, HAYB hakkında bilgi almak istiyorum. Beni arayabilir misiniz?\n\nAd Soyad: ${name.trim()}\nE-posta: ${email.trim()}`;
}

/**
 * Sağ altta dönüşümlü animasyonlu (el sallayan el, mektup, kalem) iletişim düğmesi.
 * Dokununca alttan/ortadan animasyonla açılan "Sizi arayalım mı?" penceresi: ad soyad, e-posta, KVKK onayı
 * ve gönderimde WhatsApp mesajı. Telefon numarası doğrudan aranabilir.
 */
export function ContactFab() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      openerRef.current?.focus();
    }, 260);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstRef.current?.focus(), 350);
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', key);
    };
  }, [open, close]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (name.trim().length < 2) err.name = 'Adınızı ve soyadınızı yazın.';
    if (!EMAIL_RE.test(email.trim())) err.email = 'Geçerli bir e-posta adresi girin.';
    if (!consent) err.consent = 'Devam etmek için KVKK metnini onaylayın.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const url = whatsappUrl(buildContactMessage(name, email));
    setSentUrl(url);
    trackEvent('whatsapp_click', { location: 'contact_fab' });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const field = (bad?: string) =>
    `w-full min-h-[3.25rem] rounded-full border bg-white/[0.04] px-5 text-base text-white placeholder:text-white/45 transition focus:border-lime focus:bg-white/[0.06] ${bad ? 'border-red-400/70' : 'border-white/12'}`;

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="İletişim: sizi arayalım mı?"
        aria-haspopup="dialog"
        className="cfab press fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-lime text-ink-950 shadow-[0_8px_30px_rgb(0_0_0/0.5)] sm:bottom-6 sm:right-6"
      >
        <span aria-hidden className="cfab-ring" />
        <span aria-hidden className="cfab-i cfab-i1"><Hand strokeWidth={1.8} className="h-6 w-6" /></span>
        <span aria-hidden className="cfab-i cfab-i2"><Mail strokeWidth={1.8} className="h-6 w-6" /></span>
        <span aria-hidden className="cfab-i cfab-i3"><PenLine strokeWidth={1.8} className="h-6 w-6" /></span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90]" role="presentation">
          <div onClick={close} aria-hidden className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${closing ? 'cs-fade-out' : 'cs-fade-in'}`} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center sm:inset-0 sm:items-center sm:p-6">
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cfab-title"
              className={`pointer-events-auto relative w-full max-w-md overflow-visible rounded-t-[2rem] border border-white/10 bg-ink-900 px-6 pb-7 pt-14 shadow-[0_-20px_80px_rgb(0_0_0/0.6)] sm:rounded-[2rem] ${closing ? 'cs-sheet-out' : 'cs-sheet-in'}`}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Kapat"
                className="press absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-ink-900 text-white/80 hover:text-white"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>

              <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain px-0.5">
              {sentUrl ? (
                <div role="status" className="text-center">
                  <h2 id="cfab-title" className="text-2xl font-bold">Mesajınız hazır</h2>
                  <p className="mt-3 text-white/70">
                    WhatsApp’ta mesajı gönderin; sizi en kısa sürede arayalım.
                  </p>
                  <a
                    href={sentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-lime px-6 text-base font-semibold text-ink-950"
                  >
                    WhatsApp’ı Aç
                  </a>
                  <button type="button" onClick={close} className="press mt-3 min-h-12 w-full rounded-full text-sm font-semibold text-white/60 hover:text-white">
                    Kapat
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 id="cfab-title" className="text-center text-2xl font-bold">Sizi Arayalım mı?</h2>
                  <div className="mt-7 space-y-3">
                    <div>
                      <label htmlFor="cfab-name" className="sr-only">Ad Soyad</label>
                      <input
                        ref={firstRef}
                        id="cfab-name"
                        type="text"
                        autoComplete="name"
                        maxLength={80}
                        placeholder="Ad Soyad"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={errors.name ? true : undefined}
                        className={field(errors.name)}
                      />
                      {errors.name && <p role="alert" className="mt-1.5 px-2 text-sm text-red-300">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="cfab-email" className="sr-only">E-posta</label>
                      <input
                        id="cfab-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        maxLength={120}
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={errors.email ? true : undefined}
                        className={field(errors.email)}
                      />
                      {errors.email && <p role="alert" className="mt-1.5 px-2 text-sm text-red-300">{errors.email}</p>}
                    </div>
                  </div>
                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-white/70">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[rgb(var(--hayb-lime))]"
                    />
                    <span>
                      Şartları okudum ve kabul ediyorum:{' '}
                      <Link href="/kvkk" target="_blank" className="underline underline-offset-2 hover:text-white">KVKK Aydınlatma Metni</Link>
                    </span>
                  </label>
                  {errors.consent && <p role="alert" className="mt-1.5 px-2 text-sm text-red-300">{errors.consent}</p>}
                  <button type="submit" className="press mt-5 min-h-14 w-full rounded-full bg-lime px-6 text-base font-semibold text-ink-950 transition hover:bg-lime-soft">
                    Gönder
                  </button>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-sm font-semibold text-white">Siz mi arayacaksınız?</p>
                    <p className="mt-1 text-sm text-white/55">Hemen konuşmak isterseniz bizi doğrudan arayabilirsiniz.</p>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="press mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-6 text-lg font-semibold text-white hover:border-lime hover:text-lime"
                    >
                      <Headset aria-hidden className="h-5 w-5" /> {PHONE_DISPLAY}
                    </a>
                  </div>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
