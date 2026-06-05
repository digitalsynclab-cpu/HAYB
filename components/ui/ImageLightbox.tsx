'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  // ESC ile kapat
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${alt} görseli`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

        {/* Kapat butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors duration-200"
          aria-label="Kapat"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Görsel */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
          style={{ aspectRatio: '4/3' }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain rounded-xl"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Alt ipucu */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40 z-10">
          Kapatmak için tıklayın veya ESC'ye basın
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
