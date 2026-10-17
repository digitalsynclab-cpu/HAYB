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
}

type Hint = 'rotate' | 'zoom' | 'scroll';

/** WebGL yoksa (eski tarayıcı / kapalı donanım hızlandırma) 3B sahne açılmaz, sabit görsel gösterilir. */
function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Ana sayfa 3B cihaz vitrini. Kaydırdıkça MacBook ve iPhone ekranlarında sıradaki gerçek proje açılır.
 * - three.js yalnızca bölüm ekrana yaklaşınca yüklenir (ilk açılış hızı etkilenmez).
 * - Ekran dışındayken çizim durur.
 * - "Hareketi azalt" açık cihazlarda ve WebGL olmayan tarayıcılarda sabit görsel gösterilir.
 * - Proje adı, açıklaması ve bağlantısı normal HTML'dir (Google ve yapay zekalar okur).
 */
export function DeviceShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<ShowcaseHandle | null>(null);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [mode, setMode] = useState<'pending' | '3d' | 'static'>('pending');
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState<Record<Hint, boolean>>({ rotate: false, zoom: false, scroll: false });
  const [introHidden, setIntroHidden] = useState(false);
  const [touch, setTouch] = useState(false);

  const markDone = useCallback((h: Hint) => setDone((d) => (d[h] ? d : { ...d, [h]: true })), []);

  const getProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
  }, []);

  // Proje değişince yazılar yumuşakça değişir
  useEffect(() => {
    if (index === shown) return;
    setSwapping(true);
    const t = window.setTimeout(() => {
      setShown(index);
      setSwapping(false);
    }, 280);
    return () => window.clearTimeout(t);
  }, [index, shown]);

  // 3B sahneyi bölüm yaklaşınca yükle
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    setTouch(window.matchMedia('(pointer: coarse)').matches);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !hasWebGL()) {
      setMode('static');
      return;
    }
    let cancelled = false;
    let visible = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible && !handleRef.current && !cancelled) {
          try {
            const { mountShowcase } = await import('@/lib/three/device-showcase');
            if (cancelled || handleRef.current) return;
            handleRef.current = mountShowcase({
              canvas,
              desktopImages: projects.map((p) => `/images/projects/${p.id}.webp`),
              mobileImages: projects.map((p) => `/images/apps/${p.id}/1.webp`),
              getProgress,
              onProject: setIndex,
              onReady: () => setReady(true),
              onGesture: markDone,
              reduceMotion: reduce,
            });
            setMode('3d');
          } catch {
            setMode('static');
            return;
          }
        }
        handleRef.current?.setActive(visible);
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(section);
    return () => {
      cancelled = true;
      io.disconnect();
      handleRef.current?.destroy();
      handleRef.current = null;
    };
  }, [projects, getProgress, markDone]);

  // Kaydırma: başlık gizlenir, kaydırma ipucu tamamlanır; statik modda proje kaydırmayla seçilir
  useEffect(() => {
    let start: number | null = null;
    const onScroll = () => {
      const p = getProgress();
      setIntroHidden(p > 0.03);
      if (start === null && p > 0) start = window.scrollY;
      if (start !== null && Math.abs(window.scrollY - start) > window.innerHeight * 0.6) markDone('scroll');
      if (mode === 'static') {
        const rest = Math.max(0, (p - 0.08) / 0.92);
        setIndex(Math.min(projects.length - 1, Math.floor(rest * projects.length * 0.9999)));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [getProgress, markDone, mode, projects.length]);

  const p = projects[shown] ?? projects[0]!;
  const allDone = done.rotate && done.zoom && done.scroll;
  const hintCls = (h: Hint) =>
    `flex max-w-[16rem] items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full border border-white/10 bg-white/[0.07] py-1.5 pl-2 pr-3 text-[0.72rem] font-medium text-white/60 backdrop-blur-md transition-all duration-500 sm:text-xs ${
      done[h] ? 'pointer-events-none !max-w-0 scale-90 !border-0 !px-0 opacity-0' : ''
    }`;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="vitrin-baslik"
      className="relative bg-black"
      style={{ height: `${Math.round(100 + projects.length * 55)}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(60%_55%_at_50%_52%,#1d1d1f_0%,#0a0a0a_55%,#000_100%)]">
        {mode === 'static' ? (
          <div className="absolute inset-x-4 top-[30%] bottom-[34%] mx-auto max-w-3xl">
            <Image
              key={p.id}
              src={`/images/projects/${p.id}.webp`}
              alt={`${p.name} web sitesi ekran görüntüsü`}
              fill
              sizes="(min-width: 768px) 768px, 92vw"
              className="rounded-2xl object-contain"
            />
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            aria-hidden
            className={`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-700 active:cursor-grabbing ${ready ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Apple tarzı soluk ipuçları: hareket yapılınca kaybolur */}
        {mode === '3d' && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 top-[calc(var(--hayb-header-h)+0.75rem)] z-10 flex flex-wrap justify-center gap-2 px-3 transition-opacity duration-500 ${allDone ? 'opacity-0' : ''}`}
          >
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
            <span className={hintCls('scroll')}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="3.5" width="10" height="17" rx="5" />
                <path className="hint-y" d="M12 8v3" />
              </svg>
              Kaydırarak sonraki proje
            </span>
          </div>
        )}

        <div
          className={`pointer-events-none absolute inset-x-0 top-[calc(var(--hayb-header-h)+6rem)] z-10 px-4 text-center transition duration-500 sm:top-[calc(var(--hayb-header-h)+3.75rem)] ${introHidden ? '-translate-y-3 opacity-0' : ''}`}
        >
          <p className="text-sm font-semibold text-white/50">HAYB Projeleri</p>
          <h2 id="vitrin-baslik" className="mt-2 text-balance text-[1.9rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Gerçek işler.
            <br />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Her ekranda kusursuz.</span>
          </h2>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-7 text-center sm:pb-9">
          <div aria-live="polite" className={`transition duration-300 ${swapping ? 'translate-y-3 opacity-0 blur-sm' : ''}`}>
            <p className="text-[0.8rem] font-semibold text-white/50">{p.type}</p>
            <h3 className="mt-1 text-[1.9rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{p.name}</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/60 sm:text-base">{p.description}</p>
            <Link href={`/projeler/${p.id}`} className="pointer-events-auto mt-3 inline-flex min-h-10 items-center font-semibold text-lime hover:underline">
              Projeyi inceleyin ›
            </Link>
          </div>
          <div className="mt-4 flex gap-1.5" aria-hidden>
            {projects.map((x, i) => (
              <span key={x.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-7 bg-white' : 'w-1.5 bg-white/25'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
