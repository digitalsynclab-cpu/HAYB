'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ShowcaseHandle } from '@/lib/three/device-showcase';

export interface ShowcaseProject {
  id: string;
  name: string;
  type: string;
  description: string;
  /** Varsayılan proje görseli yerine vitrine özel ekran görüntüsü (ör. uygulama değil web sitesi) */
  desktop?: string;
  mobile?: string;
}

type Hint = 'rotate' | 'zoom';

/** WebGL yoksa (eski tarayıcı / kapalı donanım hızlandırma) 3B sahne açılmaz, sabit görsel gösterilir. */
function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const desktopOf = (p: ShowcaseProject) => p.desktop ?? `/images/projects/${p.id}.webp`;
const mobileOf = (p: ShowcaseProject) => p.mobile ?? `/images/apps/${p.id}/1.webp`;

/**
 * Ana sayfa 3B cihaz vitrini: tek ekranlık bölüm, MacBook + iPhone'da seçili proje.
 * Proje alttaki butonlarla değişir (kaydırmaya bağlı değil).
 * - three.js giriş animasyonu bittikten sonra ve bölüme yaklaşınca yüklenir (açılış donmaz).
 * - 3B hazır olana kadar ilk projenin görseli gösterilir (siyah ekran yok); ekran dışında çizim durur.
 * - "Hareketi azalt" açık cihazlarda ve WebGL olmayan tarayıcılarda sabit görsel kullanılır.
 * - Proje adı, açıklaması ve bağlantıları normal HTML'dir (Google ve yapay zekalar okur).
 */
export function DeviceShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<ShowcaseHandle | null>(null);
  const [selected, setSelected] = useState(0);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<'pending' | '3d' | 'static'>('pending');
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState<Record<Hint, boolean>>({ rotate: false, zoom: false });
  const [touch, setTouch] = useState(false);

  const markDone = useCallback((h: Hint) => setDone((d) => (d[h] ? d : { ...d, [h]: true })), []);

  const choose = (i: number, el?: HTMLElement) => {
    setSelected(i);
    // Seçilen buton yatay listede ortalanır (sağ alttaki iletişim butonunun altında kalmaz)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    if (handleRef.current) handleRef.current.select(i);
    else setIndex(i);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    setTouch(coarse);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !hasWebGL()) {
      setMode('static');
      return;
    }
    const root = document.documentElement;
    let cancelled = false;
    let visible = false;
    let near = false;
    let mounting = false;

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 1500 }) : window.setTimeout(cb, 300));
    const mount = () => {
      // Giriş animasyonu sürerken ağır iş yapılmaz; ziyaretçi bölüme yaklaşınca, tarayıcı boştayken başlar
      if (mounting || cancelled || !near || root.classList.contains('intro-active')) return;
      mounting = true;
      idle(() => void start());
    };
    const start = () =>
      import('@/lib/three/device-showcase')
        .then(({ mountShowcase }) => {
          if (cancelled) return;
          const h = mountShowcase({
            canvas,
            desktopImages: projects.map(desktopOf),
            mobileImages: projects.map(mobileOf),
            onProject: setIndex,
            onReady: () => setReady(true),
            onError: () => setMode('static'),
            onGesture: markDone,
            reduceMotion: reduce,
            lowPower: coarse || window.innerWidth < 768,
          });
          handleRef.current = h;
          setMode('3d');
          h.setActive(visible);
        })
        .catch(() => setMode('static'));

    const nearIO = new IntersectionObserver(
      ([e]) => {
        near = Boolean(e?.isIntersecting);
        if (near) mount();
      },
      { rootMargin: '80% 0px' },
    );
    const screenIO = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      handleRef.current?.setActive(visible);
    });
    // Giriş animasyonu bitince (html.intro-active kalkınca) tekrar dene
    const mo = new MutationObserver(() => mount());
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    nearIO.observe(section);
    screenIO.observe(section);
    return () => {
      cancelled = true;
      nearIO.disconnect();
      screenIO.disconnect();
      mo.disconnect();
      handleRef.current?.destroy();
      handleRef.current = null;
    };
  }, [projects, markDone]);

  const p = projects[index] ?? projects[0]!;
  const allDone = done.rotate && done.zoom;
  const hintCls = (h: Hint) =>
    `flex max-w-[16rem] items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full border border-white/10 bg-white/[0.07] py-1.5 pl-2 pr-3 text-[0.72rem] font-medium text-white/60 backdrop-blur-md transition-all duration-500 sm:text-xs ${
      done[h] ? 'pointer-events-none !max-w-0 scale-90 !border-0 !px-0 opacity-0' : ''
    }`;

  return (
    <section ref={sectionRef} aria-labelledby="vitrin-baslik" className="relative overflow-hidden bg-black">
      <div className="relative mx-auto flex h-[100svh] max-h-[960px] min-h-[620px] flex-col bg-[radial-gradient(60%_50%_at_50%_48%,#1d1d1f_0%,#0a0a0a_55%,#000_100%)] pt-[calc(var(--hayb-header-h)+0.75rem)]">
        {/* Başlık + Apple tarzı soluk ipuçları */}
        <div className="relative z-10 px-4 text-center">
          <div aria-hidden className={`pointer-events-none flex flex-wrap justify-center gap-2 transition-opacity duration-500 ${mode === '3d' && !allDone ? '' : 'invisible opacity-0'}`}>
            <span className={hintCls('rotate')}>
              <svg viewBox="0 0 24 24" className="hint-x h-4 w-4 shrink-0 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" />
              </svg>
              Sürükleyerek çevirin
            </span>
            <span className={hintCls('zoom')}>
              <svg viewBox="0 0 24 24" className="hint-s h-4 w-4 shrink-0 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="6" />
                <path d="M11 8.5v5M8.5 11h5M20 20l-4.2-4.2" />
              </svg>
              {touch ? 'İki parmakla yakınlaştırın' : 'Çift tıklayarak yakınlaştırın'}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold text-white/50">HAYB Projeleri</p>
          <h2 id="vitrin-baslik" className="mt-1.5 text-balance text-[1.75rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            Gerçek işler. <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Her ekranda kusursuz.</span>
          </h2>
        </div>

        {/* 3B sahne (hazır olana kadar ilk projenin görseli) */}
        <div className="relative min-h-0 flex-1">
          {(mode === 'static' || !ready) && (
            <div aria-hidden={mode !== 'static'} className={`absolute inset-x-6 inset-y-[14%] mx-auto max-w-2xl transition-opacity duration-500 ${mode === 'static' ? '' : 'opacity-70'}`}>
              <Image
                key={mode === 'static' ? p.id : 'poster'}
                src={mode === 'static' ? desktopOf(p) : desktopOf(projects[0]!)}
                alt={mode === 'static' ? `${p.name} web sitesi ekran görüntüsü` : ''}
                fill
                sizes="(min-width: 768px) 672px, 88vw"
                className="rounded-xl object-contain"
              />
            </div>
          )}
          {mode !== 'static' && (
            <canvas
              ref={canvasRef}
              aria-hidden
              className={`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-700 active:cursor-grabbing ${ready ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>

        {/* Proje bilgisi + proje seçici */}
        <div className="relative z-10 px-4 pb-6 text-center sm:pb-8">
          <div aria-live="polite" key={p.id} className="showcase-fade">
            <p className="text-[0.8rem] font-semibold text-white/50">{p.type}</p>
            <h3 className="mt-1 text-[1.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-4xl">{p.name}</h3>
            <p className="mx-auto mt-1.5 max-w-lg text-sm text-white/60 sm:text-base">{p.description}</p>
            <Link href={`/projeler/${p.id}`} className="mt-1 inline-flex min-h-10 items-center font-semibold text-lime hover:underline">
              Projeyi inceleyin ›
            </Link>
          </div>
          <div role="tablist" aria-label="Projeler" className="-mx-4 mt-3 flex snap-x scroll-px-4 gap-2 overflow-x-auto pb-1 pl-4 pr-24 [scrollbar-width:none] sm:mx-auto sm:max-w-fit sm:justify-center sm:px-4 [&::-webkit-scrollbar]:hidden">
            {projects.map((x, i) => {
              const on = i === selected;
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={(e) => choose(i, e.currentTarget)}
                  className={`flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-semibold transition duration-300 ${
                    on ? 'border-white bg-white text-black' : 'border-white/15 bg-white/[0.06] text-white/75 hover:border-white/35 hover:text-white'
                  }`}
                >
                  <span className={`text-xs tabular-nums ${on ? 'text-black/50' : 'text-white/40'}`}>{String(i + 1).padStart(2, '0')}</span>
                  {x.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
