'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import {
  Activity, ArrowRight, Award, Bath, BedDouble, Briefcase, Building2, Calendar, Camera, Car, Check, ChevronLeft, ChevronRight, Clock, Compass, Droplets,
  Dumbbell, Factory, FileText, Flame, Flower2, Gauge, Gem, Globe, Hammer, Hand, Heart, House, Infinity as InfinityIcon, Key, Landmark, Leaf, Mail, MapPin,
  Microscope, Mountain, Music, Palette, Phone, Play, Recycle, Route, Ruler, Scale, Shield, Ship, Shirt, ShoppingBag, Smile, Snowflake, Sofa, Sparkles, Star,
  Stethoscope, Sun, Timer, TreePine, Truck, Users, Utensils, Waves, Wind, Wine, Wrench, Zap,
} from 'lucide-react';
import type { V2Cta, V2Icon } from '@/data/template-types';

/* ───────────── Bağlam: bilgi mesajı ve sayfa içi gezinme ───────────── */

interface Ctx {
  toast: (text: string) => void;
  go: (id: string) => void;
  /** Sepet sayacı (demo) */
  addCart: () => void;
}
const V2Context = createContext<Ctx>({ toast: () => {}, go: () => {}, addCart: () => {} });
export const V2Provider = V2Context.Provider;
export const useV2 = () => useContext(V2Context);

/* ───────────── Simgeler ───────────── */

const ICONS: Record<V2Icon, typeof Check> = {
  calendar: Calendar, smile: Smile, shield: Shield, stethoscope: Stethoscope, heart: Heart, sparkles: Sparkles, leaf: Leaf, waves: Waves, utensils: Utensils,
  wine: Wine, bed: BedDouble, car: Car, wrench: Wrench, zap: Zap, gauge: Gauge, snowflake: Snowflake, shirt: Shirt, gem: Gem, recycle: Recycle, truck: Truck,
  dumbbell: Dumbbell, flame: Flame, timer: Timer, users: Users, activity: Activity, droplets: Droplets, sun: Sun, pin: MapPin, phone: Phone, mail: Mail, key: Key,
  scale: Scale, landmark: Landmark, building: Building2, hammer: Hammer, ruler: Ruler, home: House, trees: TreePine, compass: Compass, camera: Camera, award: Award,
  clock: Clock, check: Check, star: Star, wind: Wind, flower: Flower2, sofa: Sofa, bath: Bath, briefcase: Briefcase, factory: Factory, route: Route, bag: ShoppingBag,
  music: Music, ship: Ship, palette: Palette, microscope: Microscope, hand: Hand, infinity: InfinityIcon, mountain: Mountain, file: FileText, globe: Globe,
};

export function Ico({ name, className = 'h-5 w-5', stroke = 1.5 }: { name: V2Icon; className?: string; stroke?: number }) {
  const C = ICONS[name] ?? Check;
  return <C aria-hidden className={className} strokeWidth={stroke} />;
}

/* ───────────── Görsel ───────────── */

/** Üst öğe `relative` olmalı. */
export function Pic({ src, alt, sizes, className = '', focus, priority = false }: { src: string; alt: string; sizes: string; className?: string; focus?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} style={focus ? { objectPosition: focus } : undefined} />;
}

/* ───────────── Animasyon: görününce belirme ───────────── */

export function Reveal({ children, delay = 0, y = 26, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Başlık satırları: her satır maskeden yukarı kayarak açılır.
 * italic: eğik yazılacak satır indeksleri, accent: vurgu rengiyle yazılacak satırlar.
 */
export function Lines({ lines, italic = [], accent = [], immediate = false, className = '' }: { lines: string[]; italic?: number[]; accent?: number[]; immediate?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // Kırpılan (overflow hidden) çocuk yerine kırpılmayan kapsayıcı izlenir; aksi halde satır hiç görünür sayılmaz.
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const show = immediate || seen;
  return (
    <span ref={ref} className="block">
      {lines.map((l, i) => (
        <span key={i} className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}>
          <motion.span
            className={`block ${italic.includes(i) ? 'v2-it' : ''} ${accent.includes(i) ? 'v2-accent' : ''}`}
            initial={reduce ? false : { y: '108%' }}
            animate={show || reduce ? { y: 0 } : { y: '108%' }}
            transition={{ duration: 0.95, delay: 0.06 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ───────────── Sayaç (21st.dev "Count Animation", bundui; framer-motion ile uyarlandı) ───────────── */

export function Counter({ value, className = '' }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const num = m ? parseFloat(m[2].replace(/\./g, '').replace(',', '.')) : 0;
  const decimals = m && /[.,]\d{1,2}$/.test(m[2]) && !/^\d{1,3}(\.\d{3})+$/.test(m[2]) ? (m[2].split(/[.,]/)[1] ?? '').length : 0;
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => (m ? `${m[1]}${v.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${m[3]}` : value));
  useEffect(() => {
    if (!m || !inView) return;
    if (reduce) {
      count.set(num);
      return;
    }
    const a = animate(count, num, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => a.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  if (!m) return <span className={className}>{value}</span>;
  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </motion.span>
  );
}

/* ───────────── Düğme ───────────── */

export function Btn({ cta, variant = 'solid', className = '', arrow = true, icon }: { cta: V2Cta; variant?: 'solid' | 'ghost' | 'light' | 'text'; className?: string; arrow?: boolean; icon?: ReactNode }) {
  const { go, toast } = useV2();
  const on = () => {
    if (cta.to) go(cta.to);
    else if (cta.play) toast('Örnek şablon: tanıtım filmi burada oynatılır.');
    else toast('Örnek şablon: bu düğme demoda bir sayfaya gitmez.');
  };
  return (
    <button type="button" onClick={on} className={`v2-btn v2-btn-${variant} group ${className}`}>
      {cta.play && (
        <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full border border-current/40">
          <Play className="h-3 w-3 translate-x-[1px]" fill="currentColor" />
        </span>
      )}
      {icon}
      <span>{cta.label}</span>
      {arrow && !cta.play && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
}

export function PlayBtn({ label, className = '' }: { label: string; className?: string }) {
  const { toast } = useV2();
  return (
    <button type="button" onClick={() => toast('Örnek şablon: tanıtım filmi burada oynatılır.')} className={`group inline-flex items-center gap-3 text-left ${className}`}>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-xl transition group-hover:scale-110">
        <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
      </span>
      <span className="text-sm font-semibold drop-shadow">{label}</span>
    </button>
  );
}

/* ───────────── Bölüm başlığı ───────────── */

export function SectionHead({ kicker, title, italic, text, cta, align = 'left', className = '' }: { kicker?: string; title: string[]; italic?: number[]; text?: string; cta?: V2Cta; align?: 'left' | 'center'; className?: string }) {
  return (
    <div className={`mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between ${align === 'center' ? 'items-center text-center md:flex-col md:items-center' : ''} ${className}`}>
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {kicker && <p className="v2-kicker mb-4">{kicker}</p>}
        <h2 className="v2-h text-[clamp(2rem,5.2vw,3.6rem)]">
          <Lines lines={title} italic={italic} />
        </h2>
        {text && <p className="v2-mute mt-4 max-w-xl text-[1.02rem] leading-relaxed">{text}</p>}
      </div>
      {cta && <Btn cta={cta} variant="text" className="self-start md:self-auto" />}
    </div>
  );
}

/* ───────────── Yatay şerit okları ───────────── */

export function useRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  const by = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: 'smooth' });
  return { ref, edge, by };
}

export function RailArrows({ edge, by, className = '' }: { edge: { start: boolean; end: boolean }; by: (d: 1 | -1) => void; className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button type="button" aria-label="Geri" disabled={edge.start} onClick={() => by(-1)} className="v2-round disabled:opacity-35">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" aria-label="İleri" disabled={edge.end} onClick={() => by(1)} className="v2-round disabled:opacity-35">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ───────────── Önce/Sonra karşılaştırma (21st.dev "Image Comparison", ibelick/motion-primitives; uyarlandı) ───────────── */

export function Compare({ before, after, labels, alt, className = '' }: { before: string; after: string; labels: [string, string]; alt: string; className?: string }) {
  const [dragging, setDragging] = useState(false);
  const mv = useMotionValue(50);
  const pos = useSpring(mv, { bounce: 0, duration: 120 });
  const leftClip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const rootRef = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(50);

  const move = (clientX: number) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return;
    const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    mv.set(p);
    setVal(Math.round(p));
  };
  return (
    <div
      ref={rootRef}
      role="slider"
      tabIndex={0}
      aria-label="Önce ve sonra karşılaştırma"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={val}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          const n = Math.min(100, Math.max(0, mv.get() + (e.key === 'ArrowRight' ? 5 : -5)));
          mv.set(n);
          setVal(Math.round(n));
        }
      }}
      onPointerDown={(e) => {
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className={`relative cursor-ew-resize touch-pan-y select-none overflow-hidden ${className}`}
    >
      <Image src={after} alt={alt} fill sizes="(min-width:1024px) 640px, 92vw" className="object-cover" draggable={false} />
      <motion.div className="absolute inset-0" style={{ clipPath: leftClip }}>
        <Image src={before} alt="" fill sizes="(min-width:1024px) 640px, 92vw" className="object-cover" style={{ filter: 'saturate(0.55) contrast(0.86) brightness(0.9) sepia(0.15)' }} draggable={false} />
      </motion.div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">{labels[0]}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">{labels[1]}</span>
      <motion.div className="pointer-events-none absolute bottom-0 top-0 w-px bg-white" style={{ left }}>
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl">
          <ChevronLeft className="h-3.5 w-3.5 -mr-0.5" />
          <ChevronRight className="h-3.5 w-3.5 -ml-0.5" />
        </span>
      </motion.div>
    </div>
  );
}
