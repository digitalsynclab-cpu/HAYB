'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, PenLine } from 'lucide-react';

// Pencere yalnızca ilk açılışta yüklenir (ilk boyamayı geciktirmez).
const ContactSheet = dynamic(() => import('@/components/contact/ContactSheet'), { ssr: false });

/** Dolgulu, yumuşak hatlı el: parmaklar yelpaze gibi açık, bilekten sallanır; yanında iki selam çizgisi belirir. */
function WavingHand() {
  return (
    <span className="relative block h-9 w-9">
      <motion.svg
        viewBox="0 0 32 32"
        aria-hidden
        className="absolute inset-0 h-full w-full origin-[45%_92%]"
        fill="currentColor"
        animate={{ rotate: [0, 20, -12, 20, -8, 14, 0] }}
        transition={{ duration: 1.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
      >
        <rect x="6" y="14" width="18.5" height="16" rx="8" />
        <rect x="7.4" y="4" width="4.3" height="16" rx="2.15" transform="rotate(-13 9.5 19)" />
        <rect x="12.1" y="1.5" width="4.4" height="18" rx="2.2" transform="rotate(-4 14 19)" />
        <rect x="16.9" y="2.4" width="4.4" height="17" rx="2.2" transform="rotate(5 19 19)" />
        <rect x="21.4" y="6" width="4.2" height="13.5" rx="2.1" transform="rotate(15 23 19)" />
        <rect x="1.4" y="14.8" width="4.6" height="13" rx="2.3" transform="rotate(-42 5.5 23)" />
      </motion.svg>
      <motion.svg viewBox="0 0 32 32" aria-hidden className="absolute -right-1.5 -top-1 h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.9, repeat: Infinity, repeatDelay: 0.5 }}>
        <path d="M26.5 5.5c1.8 1.1 3 2.9 3.4 5" />
        <path d="M23.5 2.6c2.8.7 5 2.8 5.9 5.6" />
      </motion.svg>
    </span>
  );
}

const ICONS = [
  { key: 'hand', node: <WavingHand /> },
  {
    key: 'mail',
    node: (
      <motion.span className="block" animate={{ y: [0, -5, 0, -3, 0], rotate: [0, -6, 4, -3, 0] }} transition={{ duration: 1.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3 }}>
        <Mail strokeWidth={1.9} className="h-7 w-7" />
      </motion.span>
    ),
  },
  {
    key: 'pen',
    node: (
      <motion.span className="block" animate={{ x: [0, 4, -3, 4, 0], y: [0, -3, 1, -3, 0], rotate: [0, 8, -4, 8, 0] }} transition={{ duration: 1.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3 }}>
        <PenLine strokeWidth={1.9} className="h-7 w-7" />
      </motion.span>
    ),
  },
] as const;

/**
 * Sağ altta dönüşümlü hareketli simgeli iletişim düğmesi (el sallayan el, mektup, kalem). Dokununca "Sizi arayalım mı?" penceresi açılır.
 * Simge hareketleri küçüktür ve işletim sisteminin "hareketi azalt" ayarına takılmaz.
 */
export function ContactFab() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % ICONS.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => openerRef.current?.focus(), 300);
  };

  return (
    <>
      <motion.button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="İletişim: sizi arayalım mı?"
        aria-haspopup="dialog"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        className="fixed bottom-4 right-4 z-40 grid h-16 w-16 place-items-center rounded-full bg-lime text-ink-950 shadow-[0_10px_30px_rgb(0_0_0/0.45)] sm:bottom-6 sm:right-6"
      >
        <span aria-hidden className="cfab-ring" />
        <AnimatePresence mode="wait">
          <motion.span
            key={ICONS[i].key}
            aria-hidden
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            {ICONS[i].node}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <ContactSheet open={open} onClose={close} />
    </>
  );
}
