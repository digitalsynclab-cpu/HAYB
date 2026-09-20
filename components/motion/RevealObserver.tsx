'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    __haybReveal?: boolean;
  }
}

const SELECTOR = '[data-reveal]:not(.is-visible), [data-split]:not(.is-visible)';

function observe(): () => void {
  const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-visible'));
    return () => undefined;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  nodes.forEach((n) => io.observe(n));
  return () => io.disconnect();
}

/**
 * 1) [data-reveal] / [data-split] öğelerini görünür olunca .is-visible ile açar (rota değişiminde yeniden tarar).
 *    Açılış animasyonu sürerken bekler; hero metni animasyon bittikten sonra akmaya başlar.
 * 2) [data-spot] kartlarında işaretçi/parmak konumunu CSS değişkenlerine yazar (tek global dinleyici, kart başına JS yok).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__haybReveal = true;
    const root = document.documentElement;
    if (!root.classList.contains('intro-active')) return observe();

    let stop: (() => void) | undefined;
    const go = () => {
      window.removeEventListener('hayb:intro-end', go);
      stop = observe();
    };
    window.addEventListener('hayb:intro-end', go);
    const t = window.setTimeout(go, 3200);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('hayb:intro-end', go);
      stop?.();
    };
  }, [pathname]);

  useEffect(() => {
    let active: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-spot]') ?? null;
      if (active && active !== el) active.classList.remove('spot-on');
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      el.classList.add('spot-on');
    };
    const leave = () => {
      active?.classList.remove('spot-on');
      active = null;
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', move, { passive: true });
    document.addEventListener('pointerup', leave, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', move);
      document.removeEventListener('pointerup', leave);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return null;
}
