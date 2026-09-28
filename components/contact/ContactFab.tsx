'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { Hand, Mail, PenLine } from 'lucide-react';

// Pencere yalnızca ilk açılışta yüklenir (ilk boyamayı geciktirmez).
const ContactSheet = dynamic(() => import('@/components/contact/ContactSheet'), { ssr: false });

/** Her simge kendi hareketiyle görünür: el sallar, mektup zıplar, kalem yazar. */
const ICONS = [
  {
    key: 'hand',
    node: (
      <motion.span
        className="block origin-[60%_90%]"
        animate={{ rotate: [0, 22, -14, 22, -8, 0] }}
        transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
      >
        <Hand strokeWidth={1.9} className="h-7 w-7" />
      </motion.span>
    ),
  },
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
