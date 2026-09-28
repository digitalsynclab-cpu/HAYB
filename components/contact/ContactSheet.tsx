'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, type PanInfo, type Variants } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { whatsappUrl } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

const PHONE_DISPLAY = '+90 507 342 06 61';
const PHONE_TEL = '+905073420661';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { name?: string; email?: string; phone?: string; consent?: string };

export function buildContactMessage(name: string, email: string, phone = '') {
  return `Merhabalar, HAYB hakkında bilgi almak istiyorum. Beni arayabilir misiniz?\n\nAd Soyad: ${name.trim()}\nE-posta: ${email.trim()}`;
}

/* Yay (spring) ile yükselen ve içeriği sırayla getiren çekmece: 21st.dev "Smooth Drawer" yaklaşımı (kokonutd). */
const sheetVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8, staggerChildren: 0.07, delayChildren: 0.18 } },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.26, ease: [0.7, 0, 0.84, 0] } },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } },
};

/**
 * Alttan açılan iletişim penceresi: üstte sarkan kapat düğmesi, "Sizi Arayalım mı?" başlığı, ad soyad, e-posta, KVKK onayı,
 * Gönder (WhatsApp mesajı) ve doğrudan arama. Aşağı sürükleyerek de kapanır.
 */
export default function ContactSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstRef.current?.focus(), 450);
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
      if (e.key === 'Tab' && panelRef.current) {
        const f = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input'));
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
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (name.trim().length < 2) err.name = 'Adınızı ve soyadınızı yazın.';
    if (!EMAIL_RE.test(email.trim())) err.email = 'Geçerli bir e-posta adresi girin.';
    if (!/^5\d{9}$/.test(phone)) err.phone = 'Telefonu 5 ile başlayarak 10 haneli yazın (örn. 5xx xxx xx xx).';
    if (!consent) err.consent = 'Devam etmek için KVKK metnini onaylayın.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const url = whatsappUrl(buildContactMessage(name, email, phone));
    setSentUrl(url);
    trackEvent('whatsapp_click', { location: 'contact_fab' });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) onClose();
  };

  const field = (bad?: string) =>
    `w-full min-h-[3.4rem] rounded-full border bg-white/[0.05] px-6 text-base text-white placeholder:text-white/85 transition focus:border-lime focus:bg-white/[0.08] ${bad ? 'border-red-400/70' : 'border-white/12'}`;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]" role="presentation">
          <motion.div
            onClick={onClose}
            aria-hidden
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center sm:inset-0 sm:items-center sm:p-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cfab-title"
              className="pointer-events-auto relative w-full max-w-md"
              variants={sheetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={onDragEnd}
            >
              {/* Üst şerit: yumuşak yeşil ışık; altında kapat düğmesinin oturduğu içbükey (U) kavis */}
              <div className="relative h-28 overflow-hidden rounded-t-[2rem] bg-[#0d0d0d]">
                <motion.div
                  aria-hidden
                  className="absolute -top-20 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-full bg-lime/45 blur-3xl"
                  animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div aria-hidden className="absolute left-[12%] top-6 h-8 w-24 rounded-full bg-white/30 blur-xl" />
                <svg aria-hidden viewBox="0 0 400 64" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full">
                  <path d="M0 64V26H128C154 26 164 56 200 56S246 26 272 26H400V64Z" fill="#0d0d0d" />
                </svg>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="press absolute left-1/2 top-[2.1rem] z-10 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border border-white/10 bg-[#0d0d0d]/90 text-white/85 backdrop-blur transition hover:text-white"
              >
                <X aria-hidden className="h-6 w-6" />
              </button>

              <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain rounded-b-none bg-[#0d0d0d] px-6 pb-8 pt-3 sm:rounded-b-[2rem]">
                {sentUrl ? (
                  <motion.div role="status" className="text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 id="cfab-title" className="text-2xl font-bold text-white">Mesajınız hazır</h2>
                    <p className="mt-3 text-white/90">WhatsApp’ta mesajı gönderin; sizi en kısa sürede arayalım.</p>
                    <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="press mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-lime px-6 text-base font-bold text-ink-950">
                      WhatsApp’ı Aç
                    </a>
                    <button type="button" onClick={onClose} className="press mt-3 min-h-12 w-full rounded-full text-sm font-semibold text-white/85 hover:text-white">
                      Kapat
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <motion.h2 variants={itemVariants} id="cfab-title" className="text-center text-[1.7rem] font-semibold text-white">
                      Sizi Arayalım mı?
                    </motion.h2>
                    <div className="mt-7 space-y-3">
                      <motion.div variants={itemVariants}>
                        <label htmlFor="cfab-name" className="sr-only">Ad Soyad</label>
                        <input ref={firstRef} id="cfab-name" type="text" autoComplete="name" maxLength={80} placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={errors.name ? true : undefined} className={field(errors.name)} />
                        {errors.name && <p role="alert" className="mt-1.5 px-3 text-sm text-red-300">{errors.name}</p>}
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label htmlFor="cfab-email" className="sr-only">E-posta</label>
                        <input id="cfab-email" type="email" autoComplete="email" inputMode="email" maxLength={120} placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} className={field(errors.email)} />
                        {errors.email && <p role="alert" className="mt-1.5 px-3 text-sm text-red-300">{errors.email}</p>}
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label htmlFor="cfab-phone" className="sr-only">Telefon</label>
                        <div className={`flex min-h-[3.4rem] items-center rounded-full border bg-white/[0.05] px-6 transition focus-within:border-lime focus-within:bg-white/[0.08] ${errors.phone ? 'border-red-400/70' : 'border-white/12'}`}>
                          <span aria-hidden className="pr-2 text-base font-semibold text-white/80">+90</span>
                          <input id="cfab-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="5xx xxx xx xx" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 10))} aria-invalid={errors.phone ? true : undefined} className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/85" />
                        </div>
                        {errors.phone && <p role="alert" className="mt-1.5 px-3 text-sm text-red-300">{errors.phone}</p>}
                      </motion.div>
                    </div>
                    <motion.label variants={itemVariants} className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-white/90">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={errors.consent ? true : undefined} className="mt-0.5 h-5 w-5 shrink-0 accent-[rgb(var(--hayb-lime))]" />
                      <span>
                        Şartları okudum ve kabul ediyorum:{' '}
                        <Link href="/kvkk" target="_blank" className="underline underline-offset-2 hover:text-white">KVKK Aydınlatma Metni</Link>
                      </span>
                    </motion.label>
                    {errors.consent && <p role="alert" className="mt-1.5 px-1 text-sm text-red-300">{errors.consent}</p>}
                    <motion.div variants={itemVariants}>
                      <button type="submit" className="group relative mt-5 inline-flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-[#1c1c1c] to-[#101010] px-6 text-base font-semibold text-white transition hover:border-lime/60">
                        <motion.span aria-hidden className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/15 to-transparent" whileHover={{ x: ['-200%', '200%'] }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
                        <span className="relative">Gönder</span>
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-7 border-t border-white/10 pt-6">
                      <div className="flex items-end justify-between gap-4">
                        <p className="text-lg font-semibold leading-tight text-white">Siz mi<br />Arayacaksınız?</p>
                        <p className="max-w-[10.5rem] text-right text-xs leading-snug text-white/85">Hemen konuşmak isterseniz bizi doğrudan arayabilirsiniz.</p>
                      </div>
                      <a href={`tel:${PHONE_TEL}`} className="press mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full border border-lime/40 bg-gradient-to-r from-lime to-[#7ee81f] px-6 text-lg font-semibold text-ink-950 transition hover:brightness-105">
                        <motion.span aria-hidden className="inline-flex origin-center" animate={{ rotate: [0, -16, 14, -12, 10, -6, 0] }} transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}><Phone className="h-5 w-5" fill="currentColor" /></motion.span> {PHONE_DISPLAY}
                      </a>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
