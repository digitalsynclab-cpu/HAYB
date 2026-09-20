'use client';
import { useEffect, useState } from 'react';

const TOTAL_MS = 2500;

/**
 * Açılış: yalnızca özel 3D HAYB logosu. Neon çizgiler geçer, logo soldan kayarak gelir,
 * parlar, sonra ekrana doğru genişleyip siteyi açar. Sayfa her yüklendiğinde oynar (site içi geçişlerde tekrarlanmaz).
 * Süre boyunca sayfa animasyonları bekletilir (RevealObserver "hayb:intro-end" olayını dinler).
 * Tüm hareket CSS'tedir; JS yüklenmese bile katman kendiliğinden kaybolur.
 */
export function IntroSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      root.classList.remove('intro-active');
      root.classList.add('intro-seen');
      window.dispatchEvent(new Event('hayb:intro-end'));
      setShow(false);
    };
    // Süre, sayfanın açıldığı andan sayılır (yavaş yüklenen cihazda animasyon uzamaz).
    const t = window.setTimeout(finish, Math.max(400, TOTAL_MS - performance.now()));
    const skip = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      window.clearTimeout(t);
      finish();
    };
    window.addEventListener('keydown', skip);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', skip);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="intro"
      role="presentation"
      aria-hidden
      onClick={() => {
        const root = document.documentElement;
        root.classList.remove('intro-active');
        root.classList.add('intro-seen');
        window.dispatchEvent(new Event('hayb:intro-end'));
        setShow(false);
      }}
    >
      <span className="intro-grid" />
      <span className="intro-beam intro-beam-1" />
      <span className="intro-beam intro-beam-2" />
      <span className="intro-beam intro-beam-3" />
      <div className="intro-stage">
        <span className="intro-ring" />
        <span className="intro-ring intro-ring-2" />
        <div className="intro-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hayb-3d.webp" alt="" width={1000} height={1000} decoding="async" fetchPriority="high" />
          <span className="intro-shine" />
        </div>
      </div>
      <span className="intro-bar" />
    </div>
  );
}
