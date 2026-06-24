'use client';
import { useEffect, useRef } from 'react';

/**
 * Bir elementin viewport'a girdiğinde 'visible' class'ı almasını sağlar.
 * globals.css'teki .reveal-section ve .stagger-children ile çalışır.
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
