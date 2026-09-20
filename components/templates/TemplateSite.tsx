'use client';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity, ArrowRight, ArrowUpRight, Award, BedDouble, Bath, Bone, Brush, Building2, Calendar, Camera, ChartBar, ChefHat, Clock, Coffee, CreditCard, CupSoda,
  Check, Droplets, FlaskConical, Flame, Gift, Globe, Headphones, Heart, Hospital, House, Key, Lamp, Leaf, Lightbulb, Lock, Mail, MapPin, Megaphone, Menu, MessageCircle,
  Package, Palette, PawPrint, PenTool, Phone, Play, Recycle, RefreshCw, Salad, Scissors, Search, ShieldCheck, ShoppingBag, ShoppingCart, Smile, Sofa, Sparkles, Sprout,
  Stethoscope, Syringe, Tag, Trash2, Truck, User, Users, Utensils, Wheat, Wine, X,
} from 'lucide-react';
import { SplitWords } from '@/components/motion/SplitText';
import { whatsappUrl } from '@/data/site';
import type { GridItem, TIcon, TSection, TemplateDef, Tone } from '@/data/templates';

const ICONS: Record<TIcon, typeof Leaf> = {
  coffee: Coffee, cup: CupSoda, leaf: Leaf, truck: Truck, recycle: Recycle, cart: ShoppingCart, bag: ShoppingBag, heart: Heart, user: User, stethoscope: Stethoscope,
  syringe: Syringe, paw: PawPrint, sparkles: Sparkles, droplets: Droplets, scissors: Scissors, home: House, shield: ShieldCheck, package: Package, headphones: Headphones,
  chef: ChefHat, utensils: Utensils, users: Users, calendar: Calendar, clock: Clock, building: Building2, sprout: Sprout, palette: Palette, globe: Globe, chart: ChartBar,
  bulb: Lightbulb, pen: PenTool, megaphone: Megaphone, bed: BedDouble, sofa: Sofa, lamp: Lamp, key: Key, wine: Wine, flame: Flame, badge: Award, tag: Tag, gift: Gift,
  smile: Smile, bone: Bone, bath: Bath, wheat: Wheat, flask: FlaskConical, salad: Salad, award: Award, refresh: RefreshCw, lock: Lock, card: CreditCard, map: MapPin,
  phone: Phone, mail: Mail, camera: Camera, brush: Brush, activity: Activity, hospital: Hospital,
};
const I = ({ name, className = 'h-5 w-5' }: { name: TIcon; className?: string }) => {
  const C = ICONS[name] ?? Leaf;
  return <C aria-hidden className={className} />;
};

const priceNum = (p?: string) => (p ? Number(p.replace(/[^\d]/g, '')) || 0 : 0);
const fmt = (n: number) => `${n.toLocaleString('tr-TR')} ₺`;
const secId = (id: string) => `tp-${id}`;

/** Bölüm tonu → renk değişkenleri (zemin, yazı, düğme) */
function toneVars(t: TemplateDef['theme'], tone: Tone): CSSProperties {
  const btn = t.accent;
  const map: Record<Tone, [string, string, string, string]> = {
    bg: [t.bg, t.ink, btn, t.accentInk],
    soft: [t.soft, t.ink, btn, t.accentInk],
    dark: [t.dark, t.darkInk, t.accent, t.accentInk],
    accent: [t.accent, t.accentInk, t.dark, t.darkInk],
    lime: [t.accent2 ?? t.accent, '#111111', '#111111', '#ffffff'],
  };
  const [bg, ink, b, bi] = map[tone];
  return { ['--s-bg' as string]: bg, ['--s-ink' as string]: ink, ['--b' as string]: b, ['--bi' as string]: bi, background: bg, color: ink };
}

interface Ctx {
  t: TemplateDef;
  go: (id: string) => void;
  toast: (m: string) => void;
  cart: Record<string, GridItem>;
  addToCart: (i: GridItem) => void;
  wish: Set<string>;
  toggleWish: (k: string) => void;
}

const btn = 'tp-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition hover:brightness-110 active:scale-[0.97]';
const btnGhost = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border tp-bd40 px-6 font-semibold transition tp-hv active:scale-[0.97]';

function R({ children, d = 0, className = '' }: { children: ReactNode; d?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal className={`reveal-blur ${className}`} style={d ? { transitionDelay: `${d}ms` } : undefined}>
      {children}
    </div>
  );
}

function Heading({ kicker, title, text, className = '' }: { kicker?: string; title: string; text?: string; className?: string }) {
  return (
    <div className={className}>
      {kicker && <p className="tp-kicker mb-3 text-xs font-bold uppercase tracking-[0.22em] opacity-70">{kicker}</p>}
      <h2 data-split className="split-words tp-h text-[1.85rem] font-bold leading-[1.08] sm:text-4xl lg:text-[2.35rem]" aria-label={title}>
        <SplitWords text={title} />
      </h2>
      {text && <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed opacity-75">{text}</p>}
    </div>
  );
}

/* ───────────── Hero ───────────── */
function Hero({ s, c }: { s: Extract<TSection, { type: 'hero' }>; c: Ctx }) {
  const tone: Tone = s.variant === 'dark' ? 'dark' : 'bg';
  let offset = 0;
  return (
    <section id={secId(s.id)} style={toneVars(c.t.theme, tone)} className="tp-section relative overflow-hidden">
      <div className="mx-auto grid max-w-[80rem] md:min-h-[35rem] md:grid-cols-[1.05fr_1fr] md:items-center">
        <div className="relative z-10 px-5 pb-2 pt-10 sm:px-8 md:py-16 lg:px-10">
          {s.kicker && (
            <R>
              <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.24em] opacity-70">{s.kicker}</p>
            </R>
          )}
          <h1 data-split className="split-words tp-h text-[2.45rem] font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[4rem]" aria-label={s.title.join(' ')}>
            {s.title.map((line, i) => {
              const start = offset;
              offset += line.split(/\s+/).filter(Boolean).length;
              return (
                <span key={line + i} className={`block ${s.accentLine === i ? 'tp-accent' : ''}`}>
                  <SplitWords text={line} offset={start} />
                </span>
              );
            })}
          </h1>
          <R d={200}>
            <p className="mt-5 max-w-md text-base leading-relaxed opacity-80">{s.text}</p>
          </R>
          <R d={300} className="mt-7 flex flex-wrap gap-3">
            <button type="button" className={btn} onClick={() => c.go(s.primary.to ?? 'ust')}>
              {s.primary.label} <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
            {s.secondary && (
              <button type="button" className={btnGhost} onClick={() => (s.secondary?.play ? c.toast('Demo: burada markanın tanıtım videosu açılır.') : c.go(s.secondary?.to ?? 'ust'))}>
                {s.secondary.play && (
                  <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full tp-bg15">
                    <Play className="h-3.5 w-3.5" />
                  </span>
                )}
                {s.secondary.label}
              </button>
            )}
          </R>
          {s.points && (
            <R d={400}>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6">
                {s.points.map((p) => (
                  <li key={p.text} className="flex items-center gap-2 text-sm font-semibold opacity-85">
                    <span className="tp-ico grid h-9 w-9 shrink-0 place-items-center rounded-full">
                      <I name={p.icon} className="h-4 w-4" />
                    </span>
                    {p.text}
                  </li>
                ))}
              </ul>
            </R>
          )}
        </div>
        <div className="tp-hero-media relative h-[19rem] sm:h-[26rem] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
          <Image src={s.image} alt="" fill priority sizes="(min-width:768px) 58vw, 100vw" className="tp-hero-img object-cover object-right" />
        </div>
      </div>
    </section>
  );
}

/* ───────────── Özellik şeridi ───────────── */
function Strip({ s, c }: { s: Extract<TSection, { type: 'strip' }>; c: Ctx }) {
  return (
    <section id={s.id ? secId(s.id) : undefined} style={toneVars(c.t.theme, s.tone)} className="tp-section">
      <ul className="mx-auto grid max-w-[80rem] grid-cols-2 gap-x-4 gap-y-7 px-5 py-9 sm:px-8 lg:grid-flow-col lg:auto-cols-fr lg:px-10">
        {s.items.map((it, i) => (
          <li key={it.title} className={`${s.items.length % 2 === 1 && i === s.items.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
            <R d={i * 70} className="flex flex-col items-center gap-2.5 text-center lg:flex-row lg:text-left">
              <span className="tp-ico grid h-14 w-14 shrink-0 place-items-center rounded-full">
                <I name={it.icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-[0.95rem] font-bold leading-tight">{it.title}</span>
                {it.text && <span className="block text-[0.8rem] leading-snug opacity-70">{it.text}</span>}
              </span>
            </R>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────── Kart parçaları ───────────── */
function WishBtn({ k, c, dark }: { k: string; c: Ctx; dark?: boolean }) {
  const on = c.wish.has(k);
  return (
    <button
      type="button"
      onClick={() => c.toggleWish(k)}
      aria-pressed={on}
      aria-label={on ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      className={`absolute right-2.5 top-2.5 z-10 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition active:scale-90 ${dark ? 'bg-black/40 text-white' : 'bg-white/85 text-black'}`}
    >
      <Heart aria-hidden className={`h-[1.05rem] w-[1.05rem] transition ${on ? 'scale-110 fill-[#e5484d] text-[#e5484d]' : ''}`} />
    </button>
  );
}

function AddBtn({ item, c, label }: { item: GridItem; c: Ctx; label?: string }) {
  const inCart = Boolean(c.cart[item.title]);
  return (
    <button
      type="button"
      onClick={() => c.addToCart(item)}
      aria-label={`${item.title} ${label ?? 'sepete ekle'}`}
      className={`tp-btn grid h-10 w-10 shrink-0 place-items-center rounded-full transition active:scale-90 ${inCart ? 'ring-2 ring-offset-2 ring-[var(--s-ink)]' : ''}`}
    >
      {inCart ? <Check aria-hidden className="h-[1.1rem] w-[1.1rem]" /> : <ShoppingBag aria-hidden className="h-[1.05rem] w-[1.05rem]" />}
    </button>
  );
}

const colsCls = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' } as const;

function ItemImage({ src, alt = '', contain, ratio = 'aspect-[4/3]', sizes = '(min-width:1024px) 25vw, 50vw' }: { src: string; alt?: string; contain?: boolean; ratio?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden ${ratio}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className={`transition duration-700 group-hover:scale-[1.06] ${contain ? 'object-contain p-3' : 'object-cover'}`} />
    </div>
  );
}

/* ───────────── Izgara (ürün, kategori, yemek, ilan, iş, hizmet, galeri) ───────────── */
function Grid({ s, c }: { s: Extract<TSection, { type: 'grid' }>; c: Ctx }) {
  const [filter, setFilter] = useState(s.filters?.[0] ?? '');
  const items = useMemo(() => (s.filters && filter && filter !== s.filters[0] ? s.items.filter((i) => i.category === filter) : s.items), [s, filter]);
  const cols = colsCls[s.cols ?? 4];
  const tone = s.tone ?? 'bg';
  const v = s.variant;

  let body: ReactNode;
  if (v === 'category') {
    body = (
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${cols}`}>
        {items.map((it, i) => (
          <li key={it.title} className={i === items.length - 1 && items.length % 2 === 1 ? 'col-span-2 lg:col-span-1' : ''}>
            <R d={i * 60}>
              <button type="button" onClick={() => c.toast(`Demo: ${it.title} kategorisi açılır.`)} className="group relative block w-full overflow-hidden rounded-2xl text-left">
                <ItemImage src={it.img!} ratio={i === items.length - 1 && items.length % 2 === 1 ? 'aspect-[16/8] lg:aspect-[3/4]' : 'aspect-[4/3] lg:aspect-[3/4]'} />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3.5 pb-3 pt-10 text-sm font-semibold text-white">
                  {it.title} <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            </R>
          </li>
        ))}
      </ul>
    );
  } else if (v === 'work') {
    body = (
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${cols}`}>
        {items.map((it, i) => (
          <li key={it.title} className={i === items.length - 1 && items.length % 2 === 1 ? 'col-span-2 lg:col-span-1' : ''}>
            <R d={i * 70}>
              <button type="button" onClick={() => c.toast(`Demo: ${it.title} proje detayı açılır.`)} className="group relative block w-full overflow-hidden rounded-xl text-left">
                <ItemImage src={it.img!} ratio={i === items.length - 1 && items.length % 2 === 1 ? 'aspect-[16/8] lg:aspect-[3/4]' : 'aspect-[4/3] lg:aspect-[3/4]'} />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3.5 pb-3 pt-12 text-white">
                  <span className="block text-[0.65rem] font-bold uppercase tracking-widest opacity-75">{it.tag}</span>
                  <span className="flex items-center justify-between text-base font-bold">
                    {it.title} <ArrowUpRight aria-hidden className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </button>
            </R>
          </li>
        ))}
      </ul>
    );
  } else if (v === 'service' || v === 'pastel') {
    body = (
      <ul className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 ${cols}`}>
        {items.map((it, i) => (
          <li key={it.title}>
            <R d={i * 60} className="h-full">
              <button
                type="button"
                onClick={() => c.toast(`Demo: ${it.title} sayfası açılır.`)}
                style={v === 'pastel' ? { background: it.tint } : undefined}
                className={`group flex h-full w-full items-start gap-4 rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:shadow-lg sm:flex-col ${v === 'pastel' ? 'text-[#1b1b1b]' : 'border tp-bd10 bg-[var(--t-card)] text-[var(--t-ink)]'}`}
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${v === 'pastel' ? 'bg-white/70' : 'tp-ico'}`}>
                  <I name={it.icon ?? 'sparkles'} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold leading-tight">{it.title}</span>
                  <span className="mt-1 block text-sm leading-snug opacity-75">{it.text}</span>
                </span>
                <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/85 text-white transition group-hover:translate-x-1 sm:mt-auto">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </R>
          </li>
        ))}
      </ul>
    );
  } else if (v === 'gallery') {
    const article = items.some((i) => i.text);
    body = article ? (
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((it, i) => (
          <li key={it.title}>
            <R d={i * 80} className="h-full">
              <article className="group grid h-full overflow-hidden rounded-3xl bg-[var(--t-card)] text-[var(--t-ink)] shadow-sm sm:grid-cols-2">
                <ItemImage src={it.img!} ratio="aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[13rem]" sizes="(min-width:768px) 25vw, 100vw" />
                <div className="flex flex-col justify-center gap-3 p-5">
                  <h3 className="tp-h text-lg font-bold leading-snug">{it.title}</h3>
                  <p className="text-sm opacity-70">{it.text}</p>
                  <button type="button" onClick={() => c.toast('Demo: yazı açılır.')} className="inline-flex items-center gap-1.5 self-start text-sm font-bold underline underline-offset-4">
                    Yazıyı oku <ArrowRight aria-hidden className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </R>
          </li>
        ))}
      </ul>
    ) : (
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${cols}`}>
        {items.map((it, i) => (
          <li key={it.title} className={i % 2 === 1 ? 'mt-6 sm:mt-0' : ''}>
            <R d={i * 80}>
              <div className="group relative overflow-hidden rounded-[2rem]">
                <ItemImage src={it.img!} ratio="aspect-[3/4]" />
                <span className="sr-only">{it.title}</span>
              </div>
            </R>
          </li>
        ))}
      </ul>
    );
  } else if (v === 'property') {
    body = (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title}>
            <R d={i * 80} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--t-card)] text-[var(--t-ink)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                  <ItemImage src={it.img!} ratio="aspect-[16/10]" />
                  {it.tag && <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-black">{it.tag}</span>}
                  <WishBtn k={it.title} c={c} />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="tp-h text-lg font-bold">{it.title}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-sm opacity-65">
                    <MapPin aria-hidden className="h-3.5 w-3.5" /> {it.meta?.[0]}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                    {it.meta?.slice(1).map((m) => (
                      <li key={m} className="rounded-full tp-bg07 px-2.5 py-1">
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t tp-bd10 pt-3">
                    <span className="text-lg font-extrabold">{it.price}</span>
                    <button type="button" onClick={() => c.go('iletisim')} className="text-sm font-bold underline underline-offset-4">
                      Bilgi al
                    </button>
                  </div>
                </div>
              </article>
            </R>
          </li>
        ))}
      </ul>
    );
  } else {
    // product | dish | bags
    const bags = v === 'bags';
    body = (
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${bags ? 'sm:grid-cols-3' : ''} ${cols}`}>
        {items.map((it, i) => (
          <li key={it.title} className={bags && i === items.length - 1 && items.length % 2 === 1 ? 'col-span-2 sm:col-span-1' : ''}>
            <R d={(i % 5) * 60} className="h-full">
              <article className={`group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${v === 'dish' ? 'bg-[#211812] text-[#f3e9dc]' : 'bg-[var(--t-card)] text-[var(--t-ink)]'}`}>
                <div className={`relative ${bags ? 'bg-black/[0.04]' : ''}`}>
                  <ItemImage src={it.img!} contain={bags} ratio={bags ? (i === items.length - 1 && items.length % 2 === 1 ? 'aspect-[16/10] sm:aspect-[3/4]' : 'aspect-[3/4]') : v === 'dish' ? 'aspect-[4/3]' : 'aspect-square'} alt={bags ? it.title : ''} />
                  {it.tag && <span className="tp-btn absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wide">{it.tag}</span>}
                  {v !== 'dish' && <WishBtn k={it.title} c={c} />}
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <h3 className="tp-h text-[0.98rem] font-bold leading-snug sm:text-base">{it.title}</h3>
                  {it.text && <p className="mt-1 text-[0.8rem] leading-snug opacity-70">{it.text}</p>}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="text-base font-extrabold sm:text-lg">{it.price}</span>
                    {v === 'dish' ? (
                      <button type="button" onClick={() => c.addToCart(it)} aria-label={`${it.title} siparişe ekle`} className="tp-btn grid h-10 w-10 place-items-center rounded-full text-xl font-bold active:scale-90">
                        +
                      </button>
                    ) : (
                      <AddBtn item={it} c={c} />
                    )}
                  </div>
                </div>
              </article>
            </R>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section id={secId(s.id)} style={toneVars(c.t.theme, tone)} className="tp-section">
      <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Heading kicker={s.kicker} title={s.title} text={s.text} className="mb-7 sm:mb-10" />
        {s.filters && (
          <div role="group" aria-label="Kategori filtresi" className="mb-6 flex flex-wrap gap-2">
            {s.filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${filter === f ? 'tp-btn border-transparent' : 'tp-bd25 tp-hv'}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
        {body}
      </div>
    </section>
  );
}

/* ───────────── Görsel + metin bandı ───────────── */
function Banner({ s, c }: { s: Extract<TSection, { type: 'banner' }>; c: Ctx }) {
  return (
    <section id={secId(s.id)} style={toneVars(c.t.theme, s.tone)} className="tp-section overflow-hidden">
      <div className={`mx-auto grid max-w-[80rem] md:grid-cols-2 md:items-stretch ${s.side === 'right' ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative min-h-[15rem] sm:min-h-[20rem] md:min-h-[26rem]">
          <Image src={s.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-5 py-10 sm:px-8 md:px-12 md:py-16">
          {s.kicker && <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.24em] opacity-70">{s.kicker}</p>}
          <h2 data-split className="split-words tp-h text-[1.75rem] font-bold leading-[1.1] sm:text-4xl" aria-label={s.title}>
            <SplitWords text={s.title} />
          </h2>
          <R d={150}>
            <p className="mt-4 max-w-md leading-relaxed opacity-80">{s.text}</p>
            {s.cta && (
              <button type="button" onClick={() => c.go(s.cta?.to ?? 'ust')} className={`${btn} mt-6`}>
                {s.cta.label} <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            )}
          </R>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Formlar (demo) ───────────── */
const field = 'min-h-12 w-full rounded-xl border tp-bd20 bg-white px-4 text-[1rem] text-[#1b1b1b] outline-none transition placeholder:text-black/40 focus:border-[var(--s-ink)] focus:ring-2 focus:ring-[var(--b)]';

function DemoForm({ s }: { s: Extract<TSection, { type: 'cta' }> }) {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };
  if (done) {
    return (
      <div role="status" className="tp-pop flex items-start gap-3 rounded-2xl bg-white p-5 text-[#1b1b1b] shadow-lg">
        <span className="tp-btn grid h-10 w-10 shrink-0 place-items-center rounded-full">
          <Check aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <p className="font-bold">Talebiniz alındı (demo)</p>
          <p className="mt-1 text-sm text-black/65">Bu bir örnek şablondur; form bilgileri hiçbir yere gönderilmez. Gerçek sitede burası e-postanıza, WhatsApp&apos;a veya bir yönetim paneline bağlanır.</p>
          <button type="button" className="mt-2 text-sm font-bold underline" onClick={() => setDone(false)}>
            Yeniden dene
          </button>
        </div>
      </div>
    );
  }
  const F = ({ label, children }: { label: string; children: ReactNode }) => (
    <label className="block text-left text-sm font-semibold">
      <span className="mb-1.5 block opacity-80">{label}</span>
      {children}
    </label>
  );
  if (s.form === 'newsletter') {
    return (
      <form onSubmit={submit} className="flex w-full max-w-lg flex-col gap-2.5 sm:flex-row">
        <label className="sr-only" htmlFor={`nl-${s.id}`}>E-posta adresi</label>
        <input id={`nl-${s.id}`} required type="email" placeholder="E-posta adresiniz" className={field} />
        <button className={`${btn} shrink-0`} type="submit">{s.button}</button>
      </form>
    );
  }
  return (
    <form onSubmit={submit} className="grid w-full max-w-xl gap-3.5 rounded-3xl bg-white/90 p-5 text-[#1b1b1b] shadow-xl sm:grid-cols-2 sm:p-6" aria-label={s.button}>
      <div className="sm:col-span-2">
        <F label="Ad Soyad"><input required className={field} placeholder="Adınız Soyadınız" autoComplete="name" /></F>
      </div>
      {s.form === 'reserve' && (
        <>
          <F label="Tarih"><input required type="date" className={field} /></F>
          <F label="Saat">
            <select className={field} defaultValue="20:00">{['18:00', '19:00', '20:00', '21:00', '22:00'].map((h) => <option key={h}>{h}</option>)}</select>
          </F>
          <div className="sm:col-span-2">
            <F label="Kişi sayısı">
              <select className={field} defaultValue="2">{[1, 2, 3, 4, 5, 6, 8].map((n) => <option key={n} value={n}>{n} kişi</option>)}</select>
            </F>
          </div>
        </>
      )}
      {s.form === 'appointment' && (
        <>
          <F label="Telefon"><input required type="tel" className={field} placeholder="05xx xxx xx xx" autoComplete="tel" /></F>
          <F label="Tercih edilen gün"><input required type="date" className={field} /></F>
        </>
      )}
      {s.form === 'contact' && (
        <>
          <F label="Telefon"><input required type="tel" className={field} placeholder="05xx xxx xx xx" autoComplete="tel" /></F>
          <F label="E-posta"><input required type="email" className={field} placeholder="ornek@eposta.com" autoComplete="email" /></F>
        </>
      )}
      <button className={`${btn} sm:col-span-2`} type="submit">{s.button}</button>
      <p className="text-xs text-black/50 sm:col-span-2">Örnek form: bilgileriniz hiçbir yere gönderilmez.</p>
    </form>
  );
}

function CtaSection({ s, c }: { s: Extract<TSection, { type: 'cta' }>; c: Ctx }) {
  const wide = s.form === 'newsletter';
  return (
    <section id={secId(s.id)} style={toneVars(c.t.theme, s.tone)} className="tp-section relative overflow-hidden">
      {s.image && <Image src={s.image} alt="" fill sizes="100vw" className="object-cover opacity-25" />}
      <div className={`relative mx-auto max-w-[80rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 ${wide ? 'flex flex-col items-center text-center' : 'grid items-center gap-8 md:grid-cols-2 md:gap-12'}`}>
        <div className={wide ? 'mb-6' : ''}>
          {s.kicker && <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.24em] opacity-70">{s.kicker}</p>}
          <h2 data-split className="split-words tp-h text-[1.85rem] font-bold leading-[1.08] sm:text-4xl lg:text-[2.75rem]" aria-label={s.title}>
            <SplitWords text={s.title} />
          </h2>
          <R d={120}><p className="mt-4 max-w-md leading-relaxed opacity-80">{s.text}</p></R>
        </div>
        <R d={200} className={wide ? 'flex w-full justify-center' : ''}><DemoForm s={s} /></R>
      </div>
    </section>
  );
}

/* ───────────── Üst çubuk, menü, arama, sepet ───────────── */
function Header({ c, onSearch, onCart, cartCount }: { c: Ctx; onSearch: () => void; onCart: () => void; cartCount: number }) {
  const [open, setOpen] = useState(false);
  const { t } = c;
  const nav = (to: string) => {
    setOpen(false);
    c.go(to);
  };
  return (
    <>
      <header style={toneVars(t.theme, 'bg')} className="sticky top-0 z-40 border-b tp-bd10 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[80rem] items-center gap-4 px-4 sm:px-8 lg:px-10">
          <button type="button" onClick={() => nav('ust')} className="flex items-center gap-2 text-left" aria-label={`${t.brand} ana sayfa`}>
            <span className="tp-btn grid h-9 w-9 place-items-center rounded-full"><I name={t.logoIcon} className="h-[1.15rem] w-[1.15rem]" /></span>
            <span className="tp-h text-xl font-bold tracking-tight">{t.brand}</span>
          </button>
          <nav aria-label="Ana menü" className="ml-6 hidden flex-1 items-center gap-6 lg:flex">
            {t.nav.map((n, i) => (
              <button key={n.label} type="button" onClick={() => nav(n.to)} className={`tp-navlink text-sm font-semibold ${i === 0 ? 'is-on' : ''}`}>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {t.actions.search && (
              <button type="button" onClick={onSearch} aria-label="Ara" className="grid h-11 w-11 place-items-center rounded-full tp-hv"><Search aria-hidden className="h-5 w-5" /></button>
            )}
            {t.actions.account && (
              <button type="button" onClick={() => c.toast('Demo: burada giriş / üyelik paneli açılır.')} aria-label="Hesabım" className="hidden h-11 w-11 place-items-center rounded-full tp-hv sm:grid"><User aria-hidden className="h-5 w-5" /></button>
            )}
            {t.actions.cart && (
              <button type="button" onClick={onCart} aria-label={`Sepet, ${cartCount} ürün`} className="relative grid h-11 w-11 place-items-center rounded-full tp-hv">
                <ShoppingCart aria-hidden className="h-5 w-5" />
                {cartCount > 0 && <span key={cartCount} className="tp-btn tp-pop absolute right-0.5 top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full px-1 text-[0.65rem] font-extrabold">{cartCount}</span>}
              </button>
            )}
            <button type="button" onClick={() => nav(t.cta.to ?? 'ust')} className={`${btn} !min-h-10 hidden !px-5 text-sm sm:inline-flex`}>{t.cta.label}</button>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} className="grid h-11 w-11 place-items-center rounded-full tp-hv lg:hidden">
              {open ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
            </button>
          </div>
        </div>

      {open && (
        <div style={toneVars(t.theme, 'bg')} className="tp-drop absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b tp-bd10 px-5 pb-6 pt-2 shadow-xl lg:hidden">
          <ul>
            {t.nav.map((n, i) => (
              <li key={n.label} className="tp-drop-item border-b tp-bd10" style={{ animationDelay: `${i * 45}ms` }}>
                <button type="button" onClick={() => nav(n.to)} className="flex min-h-14 w-full items-center justify-between text-lg font-semibold">
                  {n.label} <ArrowRight aria-hidden className="h-4 w-4 opacity-50" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => nav(t.cta.to ?? 'ust')} className={`${btn} mt-5 w-full`}>{t.cta.label}</button>
        </div>
      )}
      </header>
    </>
  );
}

function Overlay({ children, onClose, label, side = 'center' }: { children: ReactNode; onClose: () => void; label: string; side?: 'center' | 'right' }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', k);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', k);
    };
  }, [onClose]);
  return (
    <div className={`fixed inset-0 z-[70] flex ${side === 'right' ? 'justify-end' : 'items-start justify-center pt-[12vh]'}`} onClick={onClose}>
      <div aria-hidden className="modal-backdrop absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <div role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()} className={`relative ${side === 'right' ? 'tp-slide-r h-full w-[min(92vw,26rem)]' : 'modal-sheet mx-4 w-full max-w-xl'}`}>
        {children}
      </div>
    </div>
  );
}

function SearchPanel({ c, onClose }: { c: Ctx; onClose: () => void }) {
  const [q, setQ] = useState('');
  const all = useMemo(() => c.t.sections.flatMap((s) => (s.type === 'grid' ? s.items.filter((i) => i.title).map((i) => ({ ...i, sec: s.id, secTitle: s.title })) : [])), [c.t]);
  const res = q.trim() ? all.filter((i) => `${i.title} ${i.text ?? ''}`.toLocaleLowerCase('tr').includes(q.trim().toLocaleLowerCase('tr'))).slice(0, 8) : [];
  return (
    <Overlay onClose={onClose} label="Arama">
      <div style={toneVars(c.t.theme, 'bg')} className="overflow-hidden rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 border-b tp-bd10 px-4">
          <Search aria-hidden className="h-5 w-5 opacity-60" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ürün, hizmet veya sayfa ara…" aria-label="Ara" className="min-h-14 w-full bg-transparent text-lg outline-none placeholder:opacity-50" />
          <button type="button" onClick={onClose} aria-label="Kapat" className="grid h-10 w-10 shrink-0 place-items-center rounded-full tp-hv"><X aria-hidden className="h-5 w-5" /></button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {q.trim() && res.length === 0 && <li className="px-3 py-6 text-center opacity-60">Sonuç bulunamadı.</li>}
          {!q.trim() && <li className="px-3 py-6 text-center opacity-60">Yazmaya başlayın; bu sayfadaki ürün ve hizmetler aranır.</li>}
          {res.map((i) => (
            <li key={`${i.sec}-${i.title}`}>
              <button type="button" onClick={() => { onClose(); c.go(i.sec); }} className="flex min-h-14 w-full items-center gap-3 rounded-xl px-3 text-left tp-hv">
                {i.img ? <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg"><Image src={i.img} alt="" fill sizes="40px" className="object-cover" /></span> : <span className="tp-ico grid h-10 w-10 shrink-0 place-items-center rounded-lg"><I name={i.icon ?? 'sparkles'} className="h-5 w-5" /></span>}
                <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{i.title}</span><span className="block truncate text-xs opacity-60">{i.secTitle}</span></span>
                {i.price && <span className="text-sm font-bold">{i.price}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Overlay>
  );
}

function CartPanel({ c, onClose }: { c: Ctx; onClose: () => void }) {
  const items = Object.values(c.cart);
  const total = items.reduce((n, i) => n + priceNum(i.price), 0);
  return (
    <Overlay onClose={onClose} label="Sepet" side="right">
      <div style={toneVars(c.t.theme, 'bg')} className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b tp-bd10 px-5 py-4">
          <h2 className="tp-h text-xl font-bold">Sepetiniz</h2>
          <button type="button" onClick={onClose} aria-label="Sepeti kapat" className="grid h-11 w-11 place-items-center rounded-full tp-hv"><X aria-hidden className="h-5 w-5" /></button>
        </div>
        <ul className="flex-1 space-y-3 overflow-y-auto p-5">
          {items.length === 0 && <li className="py-10 text-center opacity-60">Sepetiniz boş. Ürün kartlarındaki çanta düğmesiyle ekleyin.</li>}
          {items.map((i) => (
            <li key={i.title} className="tp-pop flex items-center gap-3 rounded-2xl bg-[var(--t-card)] p-3 text-[var(--t-ink)] shadow-sm">
              {i.img && <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"><Image src={i.img} alt="" fill sizes="64px" className="object-cover" /></span>}
              <span className="min-w-0 flex-1"><span className="block font-semibold leading-snug">{i.title}</span><span className="text-sm font-bold">{i.price}</span></span>
              <button type="button" onClick={() => c.addToCart(i)} aria-label={`${i.title} sepetten çıkar`} className="grid h-11 w-11 place-items-center rounded-full hover:bg-black/10"><Trash2 aria-hidden className="h-[1.1rem] w-[1.1rem]" /></button>
            </li>
          ))}
        </ul>
        <div className="border-t tp-bd10 p-5">
          <p className="mb-3 flex justify-between text-lg font-bold"><span>Toplam</span><span>{fmt(total)}</span></p>
          <button type="button" disabled={items.length === 0} onClick={() => { c.toast('Demo: burada güvenli ödeme adımı açılır.'); onClose(); }} className={`${btn} w-full disabled:opacity-40`}>Ödemeye geç</button>
        </div>
      </div>
    </Overlay>
  );
}

/* ───────────── Alt bilgi ───────────── */
function SiteFooter({ c }: { c: Ctx }) {
  const { t } = c;
  const [sub, setSub] = useState(false);
  return (
    <footer style={toneVars(t.theme, 'dark')} className="tp-section">
      <div className="mx-auto grid max-w-[80rem] gap-9 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-10">
        <div>
          <p className="flex items-center gap-2"><span className="tp-btn grid h-9 w-9 place-items-center rounded-full"><I name={t.logoIcon} className="h-[1.15rem] w-[1.15rem]" /></span><span className="tp-h text-xl font-bold">{t.brand}</span></p>
          <p className="mt-3 max-w-xs opacity-75">{t.footer.about}</p>
        </div>
        {t.footer.columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest opacity-60">{col.title}</h3>
            <ul className="space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? <button type="button" onClick={() => c.go(l.to!)} className="min-h-9 text-left opacity-85 hover:opacity-100 hover:underline">{l.label}</button> : <span className="inline-block min-h-9 py-1 opacity-85">{l.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {t.footer.newsletter && (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest opacity-60">Bültene katıl</h3>
            {sub ? <p role="status" className="tp-pop font-semibold">Teşekkürler! (demo)</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setSub(true); }} className="flex gap-2">
                <label className="sr-only" htmlFor="ft-mail">E-posta</label>
                <input id="ft-mail" required type="email" placeholder="E-posta adresiniz" className={`${field} !min-h-11`} />
                <button type="submit" className="tp-btn grid h-11 w-11 shrink-0 place-items-center rounded-xl" aria-label="Abone ol"><ArrowRight aria-hidden className="h-5 w-5" /></button>
              </form>
            )}
          </div>
        )}
      </div>
      <div className="border-t tp-bd15 px-5 py-5 text-center text-xs opacity-70 sm:px-8 lg:px-10">
        © {t.brand}. Bu sayfa HAYB tarafından hazırlanmış bir örnek şablondur; marka, ürün ve fiyatlar kurgusaldır.
      </div>
    </footer>
  );
}

/* ───────────── Ana bileşen ───────────── */
export function TemplateSite({ t }: { t: TemplateDef }) {
  const [cart, setCart] = useState<Record<string, GridItem>>({});
  const [wish, setWish] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);
  const [panel, setPanel] = useState<null | 'search' | 'cart'>(null);
  const timer = useRef(0);

  const toast = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setMsg({ id: Date.now(), text });
    timer.current = window.setTimeout(() => setMsg(null), 2600);
  }, []);
  const go = useCallback((id: string) => {
    document.getElementById(secId(id))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  const addToCart = useCallback(
    (i: GridItem) => {
      setCart((prev) => {
        const next = { ...prev };
        if (next[i.title]) {
          delete next[i.title];
        } else next[i.title] = i;
        return next;
      });
      toast(cart[i.title] ? `${i.title} sepetten çıkarıldı` : `${i.title} sepete eklendi`);
    },
    [cart, toast],
  );
  const toggleWish = useCallback((k: string) => {
    setWish((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  }, []);

  const c: Ctx = { t, go, toast, cart, addToCart, wish, toggleWish };
  const th = t.theme;
  const family = t.font === 'serif' ? 'var(--f-serif)' : t.font === 'grotesk' ? 'var(--f-grotesk)' : 'var(--f-rounded)';
  const vars = {
    ['--t-bg' as string]: th.bg, ['--t-ink' as string]: th.ink, ['--t-accent' as string]: th.accent, ['--t-card' as string]: th.card,
    ['--tp-head' as string]: t.font === 'grotesk' ? 'var(--f-grotesk)' : family,
    ['--tp-body' as string]: t.font === 'serif' ? 'var(--font-inter)' : family,
    ['--tp-accent' as string]: th.accent,
    background: th.bg, color: th.ink,
  } as CSSProperties;

  return (
    <div className="tp" style={vars}>
      <div className="bg-black px-4 py-2 text-center text-xs font-semibold text-[#a6ff41]">
        HAYB örnek şablonu · Canlı deneyebilirsiniz: menüyü, filtreleri, sepeti ve formları kullanın.
      </div>
      <Header c={c} onSearch={() => setPanel('search')} onCart={() => setPanel('cart')} cartCount={Object.keys(cart).length} />
      <main>
        {t.sections.map((s, i) => {
          switch (s.type) {
            case 'hero': return <Hero key={i} s={s} c={c} />;
            case 'strip': return <Strip key={i} s={s} c={c} />;
            case 'grid': return <Grid key={i} s={s} c={c} />;
            case 'banner': return <Banner key={i} s={s} c={c} />;
            case 'cta': return <CtaSection key={i} s={s} c={c} />;
          }
        })}
      </main>
      <SiteFooter c={c} />

      {panel === 'search' && <SearchPanel c={c} onClose={() => setPanel(null)} />}
      {panel === 'cart' && <CartPanel c={c} onClose={() => setPanel(null)} />}

      {msg && (
        <p key={msg.id} role="status" className="tp-toast fixed left-1/2 top-20 z-[80] max-w-[90vw] -translate-x-1/2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          {msg.text}
        </p>
      )}

      {/* HAYB çubuğu */}
      <div className="fixed inset-x-3 bottom-3 z-50 flex justify-center gap-2 sm:inset-x-auto sm:right-4">
        <Link href="/template" className="press inline-flex min-h-12 items-center gap-1.5 rounded-full bg-black/90 px-4 text-sm font-semibold text-white shadow-2xl backdrop-blur">
          <ArrowRight aria-hidden className="h-4 w-4 rotate-180" /> Şablonlar
        </Link>
        <a
          href={whatsappUrl(`Merhaba, HAYB sitesindeki "${t.brand}" (${t.slug}) örnek şablonunu beğendim. Kendi işletmem için benzer bir site istiyorum.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a6ff41] px-5 text-sm font-extrabold text-black shadow-2xl"
        >
          <MessageCircle aria-hidden className="h-4 w-4" /> Bu şablonu istiyorum
        </a>
      </div>
    </div>
  );
}
