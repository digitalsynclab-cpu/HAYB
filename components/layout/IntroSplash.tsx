'use client';
import { useCallback, useEffect, useState } from 'react';

const TOTAL_MS = 2500;

/**
 * Açılış: yalnızca özel 3D HAYB logosu. Neon çizgiler geçer, logo soldan kayarak gelir,
 * parlar, sonra ekrana doğru genişleyip siteyi açar. Sayfa her yüklendiğinde oynar (site içi geçişlerde tekrarlanmaz).
 * Süre boyunca sayfa animasyonları bekletilir (RevealObserver "hayb:intro-end" olayını dinler).
 * Tüm hareket CSS'tedir; JS yüklenmese bile katman kendiliğinden kaybolur.
 */
export function IntroSplash() {
  const [show, setShow] = useState(true);

  const finish = useCallback(() => {
    const root = document.documentElement;
    root.classList.remove('intro-active');
    root.classList.add('intro-seen');
    window.dispatchEvent(new Event('hayb:intro-end'));
    setShow(false);
  }, []);

  useEffect(() => {
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
  }, [finish]);

  if (!show) return null;

  return (
    <div
      className="intro"
      role="presentation"
      aria-hidden
      onClick={finish}
    >
      <span className="intro-grid" />
      <span className="intro-beam intro-beam-1" />
      <span className="intro-beam intro-beam-2" />
      <span className="intro-beam intro-beam-3" />
      <div className="intro-stage">
        <span className="intro-ring" />
        <span className="intro-ring intro-ring-2" />
        <div className="intro-logo">
          {/* WebP desteklemeyen eski tarayıcılar PNG alır; görsel hiçbir şekilde yüklenemezse kırık simge göstermek yerine açılış atlanır. */}
          <picture>
            <source srcSet="/brand/hayb-3d.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/hayb-3d.png"
              alt=""
              width={720}
              height={720}
              decoding="async"
              fetchPriority="high"
              onError={finish}
              onLoad={(e) => {
                if (!e.currentTarget.currentSrc.endsWith('.webp')) e.currentTarget.closest('.intro')?.classList.add('intro-plain');
              }}
            />
          </picture>
          <span className="intro-shine" />
        </div>
      </div>
      <span className="intro-bar" />
    </div>
  );
}
