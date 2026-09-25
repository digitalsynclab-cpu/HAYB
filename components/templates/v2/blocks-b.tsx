'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Heart, Play, SlidersHorizontal } from 'lucide-react';
import type { CountdownBlock, CtaBlock, GalleryBlock, JournalBlock, PricingBlock, Product, QuotesBlock, ScheduleBlock, ShopBlock, ShowcaseBlock, StatsBlock } from '@/data/template-types';
import { Btn, Counter, Ico, Lines, Pic, RailArrows, Reveal, SectionHead, useRail, useV2 } from '@/components/templates/v2/ui';

/* ═════════════ Vitrin (seçilebilir oda / proje / uygulama) ═════════════ */

export function Showcase({ s }: { s: ShowcaseBlock }) {
  const [i, setI] = useState(0);
  const cur = s.items[i];
  const n = s.items.length;
  const go = (d: 1 | -1) => setI((p) => (p + d + n) % n);
  const pad = (k: number) => String(k + 1).padStart(2, '0');
  const rooms = s.layout === 'rooms';
  const list = s.layout === 'list';

  return (
    <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'dark'} className="v2-sec !py-0">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)_minmax(0,0.85fr)]">
        {/* Sol: içerik */}
        <div className="order-2 flex flex-col justify-between gap-8 p-6 sm:p-10 lg:order-1 lg:min-h-[34rem] lg:p-12">
          <div>
            {s.head?.kicker && <p className="v2-kicker mb-4">{s.head.kicker}</p>}
            {s.head && (
              <h2 className="v2-h text-[clamp(2rem,3.6vw,3.2rem)]">
                <Lines lines={s.head.title} italic={s.head.italic} />
              </h2>
            )}
            <div key={i} className="v2-slide">
              {!rooms && <p className="v2-mute mb-3 text-sm font-semibold">{pad(i)} / {pad(n - 1)}</p>}
              <h3 className={`v2-h ${list ? 'text-[clamp(2.2rem,4vw,3.4rem)]' : rooms ? 'mt-6 text-[clamp(1.8rem,3vw,2.6rem)]' : 'text-[clamp(2rem,3.4vw,3rem)]'}`}>{cur.title}</h3>
              <p className="v2-mute mt-3 max-w-sm leading-relaxed">{cur.text}</p>
              {cur.facts && (
                <dl className="mt-5 max-w-sm divide-y v2-line border-y v2-line text-sm">
                  {cur.facts.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[5rem_1fr] gap-3 py-2">
                      <dt className="v2-mute">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-6">
                <Btn cta={cur.cta} variant="ghost" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Önceki" onClick={() => go(-1)} className="v2-round">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Sonraki" onClick={() => go(1)} className="v2-round">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Orta: büyük görsel */}
        <div className="relative order-1 aspect-[4/3.4] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[34rem]">
          <motion.div key={cur.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
            <Pic src={cur.image} alt={cur.title} sizes="(min-width:1024px) 52vw, 100vw" focus={cur.focus} />
          </motion.div>
        </div>

        {/* Sağ: liste */}
        <div className="order-3 bg-[color-mix(in_srgb,currentColor_6%,transparent)] p-4 sm:p-6 lg:p-0">
          <ul className={`flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 ${list ? '' : ''} [scrollbar-width:none]`}>
            {s.items.map((it, k) => (
              <li key={it.title} className="flex-none lg:flex-auto lg:border-b lg:v2-line">
                <button
                  type="button"
                  onClick={() => setI(k)}
                  aria-current={k === i}
                  className={`group flex w-[12.5rem] items-center gap-3 rounded-xl p-2.5 text-left transition lg:w-full lg:rounded-none lg:p-4 ${k === i ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  {!list && (
                    <span className="relative h-14 w-16 flex-none overflow-hidden rounded-lg lg:h-16 lg:w-[4.5rem]">
                      <Pic src={it.image} alt="" sizes="80px" focus={it.focus} />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="v2-mute block text-[0.68rem] font-bold tracking-[0.14em]">{pad(k)}</span>
                    <span className={`block text-sm font-semibold leading-tight ${k === i ? 'underline decoration-[var(--v-accent)] decoration-2 underline-offset-4' : ''}`}>{it.title}</span>
                  </span>
                  <span aria-hidden className={`v2-round !h-8 !w-8 ${k === i ? 'bg-white text-black' : ''}`}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {s.side && (
            <div className="relative mt-4 hidden overflow-hidden lg:block">
              <div className="relative aspect-[4/3]">
                <Pic src={s.side.image} alt={s.side.alt} sizes="20vw" />
              </div>
              <p className="v2-kicker absolute bottom-3 right-4 space-y-0.5 text-right !text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
                {s.side.text.map((t) => (
                  <span key={t} className="block">
                    {t}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Sayılar ═════════════ */

export function Stats({ s }: { s: StatsBlock }) {
  return (
    <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'dark'} className="v2-sec relative isolate overflow-hidden">
      {s.image && (
        <>
          <Pic src={s.image} alt="" sizes="100vw" className="-z-20 opacity-90" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--v-dark)_10%,color-mix(in_srgb,var(--v-dark)_55%,transparent)_60%,transparent)]" />
        </>
      )}
      <div className="v2-wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          {s.kicker && <p className="v2-kicker mb-4">{s.kicker}</p>}
          {s.title && (
            <h2 className="v2-h text-[clamp(2.1rem,5vw,4rem)]">
              <Lines lines={s.title} />
            </h2>
          )}
          {s.quote && <p className="v2-h mt-6 max-w-xs text-xl italic opacity-80">“{s.quote}”</p>}
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-8">
          {s.items.map((it, i) => (
            <li key={it.l} className={`border-t v2-line pt-4 ${i % 2 ? '' : ''}`}>
              <p className="v2-h text-[clamp(2.2rem,4.4vw,3.6rem)] leading-none">
                <Counter value={it.v} />
              </p>
              <p className="v2-mute mt-2 text-[0.72rem] font-bold uppercase tracking-[0.14em]">{it.l}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════ Ders programı ═════════════ */

export function Schedule({ s }: { s: ScheduleBlock }) {
  const { toast } = useV2();
  const [day, setDay] = useState(0);
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const d = s.days[day];
  const key = (t: string) => `${day}-${t}`;

  return (
    <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'dark'} className="v2-sec">
      <div className="v2-wrap grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)_minmax(0,0.8fr)] lg:gap-10">
        <div>
          <SectionHead {...s.head} className="!mb-6" />
          <div role="tablist" aria-label="Gün seçimi" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {s.days.map((dd, i) => (
              <button key={dd.label} type="button" role="tab" aria-selected={day === i} onClick={() => setDay(i)} className={`flex-none rounded-lg border px-4 py-2 text-left transition ${day === i ? 'border-[var(--v-accent)] bg-[var(--v-accent)] text-[var(--v-accent-ink)]' : 'v2-line hover:border-current'}`}>
                <span className="v2-h block text-xl leading-none">{dd.date}</span>
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.12em] opacity-80">{dd.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div key={day} className="v2-slide overflow-hidden rounded-[calc(var(--v-cr)+4px)] border v2-line">
          <ul className="divide-y v2-line">
            {d.classes.map((c) => {
              const full = c.spots === 0;
              const on = joined[key(c.time)];
              return (
                <li key={c.time} className="grid grid-cols-[3.6rem_1fr_auto] items-center gap-x-3 gap-y-1 p-4 sm:grid-cols-[4.5rem_1fr_auto_auto] sm:gap-x-5 sm:p-5">
                  <span className="v2-h text-2xl">{c.time}</span>
                  <span>
                    <span className="v2-h block text-lg leading-tight">{c.name}</span>
                    <span className="v2-mute text-sm">{c.coach}</span>
                  </span>
                  <span className={`col-start-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] sm:col-start-auto ${full ? 'v2-mute' : ''}`}>{full ? 'Kayıt dolu' : `${on ? c.spots - 1 : c.spots} spot var`}</span>
                  <button
                    type="button"
                    disabled={full}
                    aria-pressed={on}
                    onClick={() => {
                      setJoined((p) => ({ ...p, [key(c.time)]: !p[key(c.time)] }));
                      toast(on ? 'Katılımınız iptal edildi (örnek).' : `${c.name} dersine katıldınız (örnek).`);
                    }}
                    className={`v2-btn !min-h-10 !px-4 !text-[0.74rem] font-extrabold uppercase tracking-[0.1em] row-span-2 col-start-3 row-start-1 sm:row-span-1 sm:col-start-auto sm:row-start-auto ${full ? 'v2-btn-ghost opacity-40' : on ? 'v2-btn-ghost' : 'v2-btn-solid'}`}
                  >
                    {on ? (
                      <>
                        <Check className="h-4 w-4" /> Katıldın
                      </>
                    ) : (
                      'Katıl'
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative hidden aspect-[3/4] overflow-hidden rounded-[calc(var(--v-cr)+4px)] lg:block v2-zoom">
          <Pic src={s.image} alt={s.imageAlt} sizes="24vw" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <p className="absolute bottom-5 left-5 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.1em] text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/60">
              <Play className="h-4 w-4" fill="currentColor" />
            </span>
            {s.imageLabel}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Paketler ═════════════ */

export function Pricing({ p }: { p: PricingBlock }) {
  const { toast } = useV2();
  const [sel, setSel] = useState(Math.max(0, p.plans.findIndex((x) => x.featured)));
  return (
    <section id={p.id} data-v2id={p.id} data-tone={p.tone ?? 'light'} className="v2-sec">
      <div className="v2-wrap">
        <SectionHead {...p.head} />
        <div className="grid gap-5 md:grid-cols-3">
          {p.plans.map((pl, i) => {
            const on = sel === i;
            return (
              <Reveal key={pl.name} delay={i * 0.08}>
                <div className={`relative flex h-full flex-col rounded-[calc(var(--v-cr)+4px)] border p-6 transition ${on ? 'border-[var(--v-accent)] shadow-[0_18px_50px_color-mix(in_srgb,var(--v-accent)_22%,transparent)]' : 'v2-line'}`}>
                  {pl.tag && <span className="absolute -top-3 left-6 rounded-full bg-[var(--v-accent)] px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-[var(--v-accent-ink)]">{pl.tag}</span>}
                  <p className="v2-h text-2xl">{pl.name}</p>
                  <p className="v2-mute mt-1 text-sm">{pl.note}</p>
                  <p className="mt-5 flex items-baseline gap-1">
                    <span className="v2-h text-[2.6rem] leading-none">{pl.price}</span>
                    <span className="v2-mute text-sm">{pl.per}</span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {pl.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-[var(--v-accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setSel(i);
                      toast(`${pl.name} paketi seçildi (örnek).`);
                    }}
                    className={`v2-btn mt-6 w-full ${on ? 'v2-btn-solid' : 'v2-btn-ghost'}`}
                  >
                    {on ? 'Seçildi' : 'Seç'} {on ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Mağaza (filtreli ürün ızgarası / kayan ürünler) ═════════════ */

const money = (n: number) => `₺${n.toLocaleString('tr-TR')}`;

function ProductCard({ p, wish, onWish, onAdd, hover = true }: { p: Product; wish: boolean; onWish: () => void; onAdd: () => void; hover?: boolean }) {
  const [color, setColor] = useState(0);
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--v-cr)+2px)] bg-[var(--v-surface)] v2-zoom">
        <Pic src={p.image} alt={p.name} sizes="(min-width:1024px) 22vw, 60vw" />
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.1em] text-black">{p.tag}</span>}
        <button type="button" aria-label={wish ? 'Favorilerden çıkar' : 'Favorilere ekle'} aria-pressed={wish} onClick={onWish} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black transition hover:scale-110">
          <Heart className="h-4 w-4" fill={wish ? 'currentColor' : 'none'} />
        </button>
        {hover && (
          <button type="button" onClick={onAdd} className="v2-btn v2-btn-light absolute inset-x-3 bottom-3 translate-y-4 !min-h-10 text-[0.8rem] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
            Sepete Ekle
          </button>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold leading-tight">{p.name}</p>
          <p className="v2-mute mt-0.5 text-sm">{money(p.price)}</p>
        </div>
        <div className="flex gap-1.5 pt-1">
          {p.colors.map((c, i) => (
            <button key={c} type="button" aria-label={`Renk ${i + 1}`} aria-pressed={color === i} onClick={() => setColor(i)} className={`h-4 w-4 rounded-full border transition ${color === i ? 'scale-125 ring-1 ring-current ring-offset-1 ring-offset-transparent' : 'border-black/15'}`} style={{ background: c }} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Shop({ s }: { s: ShopBlock }) {
  const { toast, addCart } = useV2();
  const [cat, setCat] = useState('Tümü');
  const [size, setSize] = useState('');
  const [max, setMax] = useState(s.maxPrice);
  const [wish, setWish] = useState<Record<string, boolean>>({});
  const rail = useRail();
  const list = useMemo(() => s.products.filter((p) => (cat === 'Tümü' || p.category === cat) && (!size || p.sizes.includes(size)) && p.price <= max), [s.products, cat, size, max]);
  const counts = useMemo(() => Object.fromEntries(s.categories.map((c) => [c, c === 'Tümü' ? s.products.length : s.products.filter((p) => p.category === c).length])), [s]);
  const add = (n: string) => {
    addCart();
    toast(`${n} sepete eklendi (örnek).`);
  };

  if (s.layout === 'carousel') {
    return (
      <div id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'light'} className="p-6 sm:p-10 lg:p-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {s.head.kicker && <p className="v2-kicker mb-3">{s.head.kicker}</p>}
            <h2 className="v2-h text-[clamp(1.6rem,2.6vw,2.2rem)]">{s.head.title.join(' ')}</h2>
          </div>
          {s.head.cta && <Btn cta={s.head.cta} variant="text" />}
        </div>
        <div ref={rail.ref} className="v2-rail -mx-1 px-1">
          {s.products.map((p) => (
            <div key={p.name} className="w-[11.5rem] sm:w-[13rem]">
              <ProductCard p={p} wish={!!wish[p.name]} onWish={() => setWish((w) => ({ ...w, [p.name]: !w[p.name] }))} onAdd={() => add(p.name)} />
            </div>
          ))}
        </div>
        <RailArrows edge={rail.edge} by={rail.by} className="mt-4 justify-end" />
      </div>
    );
  }

  const filters = (
    <div className="space-y-7">
      <div>
        <p className="v2-kicker mb-3">Kategori</p>
        <ul className="space-y-1.5">
          {s.categories.map((c) => (
            <li key={c}>
              <button type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition ${cat === c ? 'v2-fill font-semibold' : 'v2-mute hover:opacity-100'}`}>
                {c}
                <span className="text-xs opacity-60">{counts[c]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="v2-kicker mb-3">Beden</p>
        <div className="flex flex-wrap gap-2">
          {s.sizes.map((z) => (
            <button key={z} type="button" aria-pressed={size === z} onClick={() => setSize(size === z ? '' : z)} className={`grid h-9 min-w-9 place-items-center rounded-md border px-2 text-xs font-semibold transition ${size === z ? 'border-[var(--v-accent)] bg-[var(--v-accent)] text-[var(--v-accent-ink)]' : 'v2-line hover:border-current'}`}>
              {z}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="v2-kicker mb-3">Fiyat aralığı</p>
        <input type="range" min={0} max={s.maxPrice} step={100} value={max} onChange={(e) => setMax(Number(e.target.value))} aria-label="En yüksek fiyat" className="w-full accent-[var(--v-accent)]" />
        <p className="v2-mute mt-1 flex justify-between text-xs">
          <span>₺0</span>
          <span>{money(max)}</span>
        </p>
      </div>
      {(cat !== 'Tümü' || size || max !== s.maxPrice) && (
        <button type="button" onClick={() => { setCat('Tümü'); setSize(''); setMax(s.maxPrice); }} className="v2-btn-text v2-btn text-sm">
          Filtreleri temizle
        </button>
      )}
    </div>
  );

  return (
    <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'light'} className="v2-sec">
      <div className="v2-wrap">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="v2-h text-[clamp(2.2rem,5vw,3.8rem)]">
            <Lines lines={s.head.title} italic={s.head.italic} />
          </h2>
          <p className="v2-mute text-sm" aria-live="polite">{list.length} ürün</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside aria-label="Ürün filtreleri">
            <details className="lg:hidden rounded-xl border v2-line p-4 [&[open]>summary>span]:text-[var(--v-accent)]">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal className="h-4 w-4" /> <span>Filtrele</span>
              </summary>
              <div className="mt-5">{filters}</div>
            </details>
            <div className="hidden lg:block">{filters}</div>
          </aside>
          {list.length === 0 ? (
            <p className="v2-mute rounded-xl border v2-line p-8 text-center">Bu filtrelere uygun ürün yok. Filtreleri gevşetmeyi deneyin.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
              {list.map((p) => (
                <li key={p.name} className="v2-slide">
                  <ProductCard p={p} wish={!!wish[p.name]} onWish={() => setWish((w) => ({ ...w, [p.name]: !w[p.name] }))} onAdd={() => add(p.name)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Yorumlar (kurgusal örnek) ═════════════ */

export function Quotes({ q }: { q: QuotesBlock }) {
  const rail = useRail();
  return (
    <section id={q.id} data-v2id={q.id} data-tone={q.tone ?? 'light'} className="v2-sec">
      <div className="v2-wrap grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.6fr)] lg:gap-14">
        <div>
          <SectionHead {...q.head} className="!mb-4" />
          <RailArrows edge={rail.edge} by={rail.by} className="hidden lg:flex" />
        </div>
        <div>
          <div ref={rail.ref} className="v2-rail v2-bleed lg:mx-0 lg:px-0">
            {q.items.map((it, i) => (
              <Reveal key={it.name} delay={i * 0.08} className="w-[17rem] sm:w-[19rem]">
                <figure className="h-full rounded-[calc(var(--v-cr)+4px)] border v2-line p-6">
                  <blockquote className="v2-h text-[1.25rem] leading-snug italic">“{it.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-sm">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--v-accent)] text-xs font-bold text-[var(--v-accent-ink)]">{it.name.charAt(0)}</span>
                    <span className="font-semibold">— {it.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="v2-mute mt-4 text-xs">{q.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Günlük / yazılar ═════════════ */

export function Journal({ j }: { j: JournalBlock }) {
  const { toast } = useV2();
  if (j.layout === 'panel') {
    return (
      <section id={j.id} data-v2id={j.id} data-tone={j.tone ?? 'dark'} className="v2-sec !py-0">
        <div className="grid lg:grid-cols-2">
          <div className="relative isolate flex min-h-[22rem] items-end overflow-hidden p-6 sm:p-10 lg:min-h-[30rem] lg:p-14">
            {j.image && <Pic src={j.image} alt="" sizes="(min-width:1024px) 50vw, 100vw" className="-z-20" />}
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
            <div className="text-white">
              {j.head.kicker && <p className="v2-kicker mb-4 !text-white/70">{j.head.kicker}</p>}
              <h2 className="v2-h text-[clamp(2.1rem,4.2vw,3.4rem)]">
                <Lines lines={j.head.title} italic={j.head.italic} />
              </h2>
              {j.head.text && <p className="mt-4 max-w-xs text-sm text-white/80">{j.head.text}</p>}
              {j.head.cta && <Btn cta={j.head.cta} variant="text" className="mt-5 text-white" />}
            </div>
          </div>
          <ul className="divide-y v2-line p-6 sm:p-10 lg:p-14">
            {j.items.map((it) => (
              <li key={it.title}>
                <button type="button" onClick={() => toast('Örnek şablon: yazı sayfası demoda yoktur.')} className="group flex w-full items-center gap-4 py-5 text-left">
                  {it.image && (
                    <span className="relative h-16 w-24 flex-none overflow-hidden rounded-md v2-zoom">
                      <Pic src={it.image} alt="" sizes="100px" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="v2-mute block text-xs">{it.date}</span>
                    <span className="mt-1 block font-semibold leading-snug">{it.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 flex-none opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  return (
    <section id={j.id} data-v2id={j.id} data-tone={j.tone ?? 'light'} className="v2-sec">
      <div className="v2-wrap grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.7fr)] lg:gap-12">
        <SectionHead {...j.head} className="!mb-0" />
        <ul className="v2-rail v2-bleed lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
          {j.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08} className="w-[16rem] sm:w-[18rem] lg:w-auto">
              <button type="button" onClick={() => toast('Örnek şablon: yazı sayfası demoda yoktur.')} className="group block w-full text-left">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[calc(var(--v-cr)+2px)] v2-zoom">{it.image && <Pic src={it.image} alt="" sizes="(min-width:1024px) 26vw, 70vw" />}</span>
                {it.tag && <span className="v2-accent mt-4 block text-[0.68rem] font-extrabold uppercase tracking-[0.16em]">{it.tag}</span>}
                <span className="v2-h mt-1.5 block text-[1.2rem] leading-snug">{it.title}</span>
                <span className="v2-mute mt-2 flex items-center justify-between text-xs">
                  {it.date}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════ Geri sayım (kampanya) ═════════════ */

export function Countdown({ c }: { c: CountdownBlock }) {
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const e = Date.now() + c.days * 86400000 + 6 * 3600000 + 28 * 60000;
    setEnd(e);
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [c.days]);
  const left = Math.max(0, (end ?? 0) - now);
  const p = (n: number) => String(n).padStart(2, '0');
  const parts = [
    ['Gün', Math.floor(left / 86400000)],
    ['Saat', Math.floor((left % 86400000) / 3600000)],
    ['Dakika', Math.floor((left % 3600000) / 60000)],
    ['Saniye', Math.floor((left % 60000) / 1000)],
  ] as const;
  return (
    <section id={c.id} data-v2id={c.id} data-tone={c.tone ?? 'light'} className="v2-sec">
      <div className="v2-wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--v-cr)+4px)] v2-zoom">
            <Pic src={c.image} alt={c.alt} sizes="(min-width:1024px) 46vw, 92vw" />
          </div>
        </Reveal>
        <div>
          <p className="v2-kicker mb-4">{c.kicker}</p>
          <h2 className="v2-h text-[clamp(2rem,4.2vw,3.2rem)]">
            <Lines lines={c.title} />
          </h2>
          <p className="v2-mute mt-4 max-w-md">{c.text}</p>
          <div className="mt-6">
            <Btn cta={c.cta} />
          </div>
          <div className="mt-8" role="timer" aria-label="Kampanya bitimine kalan süre">
            <p className="v2-kicker mb-3">Kampanyanın bitmesine</p>
            <ul className="grid max-w-md grid-cols-4 divide-x v2-line">
              {parts.map(([l, v]) => (
                <li key={l} className="px-2 text-center first:pl-0 sm:px-4">
                  <p className="v2-h text-[clamp(1.8rem,4vw,2.8rem)] leading-none tabular-nums">{end ? p(v) : '--'}</p>
                  <p className="v2-mute mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em]">{l}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Galeri ═════════════ */

export function Gallery({ g }: { g: GalleryBlock }) {
  const { toast } = useV2();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id={g.id} data-v2id={g.id} data-tone={g.tone ?? 'light'} className="v2-sec !pt-0">
      <div className="v2-wrap grid gap-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,2fr)] lg:items-center lg:gap-10">
        <SectionHead {...g.head} className="!mb-0" />
        <div>
          <div className="v2-rail v2-bleed lg:mx-0 lg:grid lg:grid-cols-[1.3fr_0.55fr_1fr_1.2fr_1.3fr] lg:gap-3 lg:overflow-visible lg:px-0">
            {g.items.map((it, i) => (
              <button
                key={it.alt}
                type="button"
                onClick={() => (it.play ? toast('Örnek şablon: video burada oynatılır.') : setOpen(open === i ? null : i))}
                aria-label={it.alt}
                className={`group relative aspect-[3/3.6] w-[10.5rem] overflow-hidden rounded-[calc(var(--v-cr)+2px)] v2-zoom sm:w-[12rem] lg:aspect-[3/3.4] lg:w-auto ${open === i ? 'ring-2 ring-[var(--v-accent)]' : ''}`}
              >
                <Pic src={it.image} alt={it.alt} sizes="(min-width:1024px) 18vw, 45vw" />
                {it.play && (
                  <span className="absolute inset-0 grid place-items-center bg-black/15">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/25 backdrop-blur">
                      <Play className="h-5 w-5 text-white" fill="currentColor" />
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
          {g.head.cta && (
            <div className="mt-4 flex justify-end">
              <Btn cta={g.head.cta} variant="text" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Çağrı bölümleri ═════════════ */

export function Cta({ c }: { c: CtaBlock }) {
  const { toast } = useV2();
  const [sent, setSent] = useState(false);

  if (c.layout === 'banner') {
    return (
      <section id={c.id} data-v2id={c.id} data-tone={c.tone ?? 'dark'} className="relative isolate overflow-hidden py-16 md:py-24">
        {c.image && <Pic src={c.image} alt="" sizes="100vw" className="-z-20" />}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(0_0_0/0.78)_10%,rgb(0_0_0/0.35)_70%,rgb(0_0_0/0.2))]" />
        <div className="v2-wrap grid items-end gap-10 text-white lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            {c.kicker && <p className="v2-kicker mb-4 !text-white/70">{c.kicker}</p>}
            <h2 className="v2-h text-[clamp(2rem,4.6vw,3.6rem)]">
              <Lines lines={c.title} italic={c.italic} />
            </h2>
            {c.text && <p className="mt-4 max-w-md text-white/80">{c.text}</p>}
            {c.primary && (
              <div className="mt-7">
                <Btn cta={c.primary} variant="light" />
              </div>
            )}
          </div>
          {c.metrics && (
            <ul className="grid grid-cols-3 divide-x divide-white/25">
              {c.metrics.map((m) => (
                <li key={m.l} className="px-4 first:pl-0">
                  <p className="v2-h text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none">
                    <Counter value={m.v} />
                  </p>
                  <p className="mt-1 text-xs text-white/70">{m.l}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }

  if (c.layout === 'contact') {
    return (
      <section id={c.id} data-v2id={c.id} data-tone={c.tone ?? 'dark'} className="relative isolate overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.6fr)]">
          <div className="relative isolate flex min-h-[20rem] items-end p-6 sm:p-10 lg:p-12">
            {c.image && <Pic src={c.image} alt="" sizes="(min-width:1024px) 34vw, 100vw" className="-z-20" />}
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />
            <div className="text-white">
              {c.kicker && <p className="v2-kicker mb-4 !text-white/70">{c.kicker}</p>}
              <h2 className="v2-h text-[clamp(2rem,3.6vw,3rem)]">
                <Lines lines={c.title} />
              </h2>
              {c.text && <p className="mt-4 max-w-xs text-sm text-white/80">{c.text}</p>}
              {c.primary && (
                <div className="mt-6">
                  <Btn cta={c.primary} variant="light" />
                </div>
              )}
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast('Örnek şablon: mesajınız alındı (demo). Bilgiler hiçbir yere gönderilmez.');
            }}
            className="space-y-4 p-6 sm:p-10 lg:p-12"
          >
            <label className="v2-field">
              <span>Adınız Soyadınız</span>
              <input className="v2-input" required autoComplete="name" />
            </label>
            <label className="v2-field">
              <span>E-posta Adresiniz</span>
              <input className="v2-input" type="email" required autoComplete="email" />
            </label>
            <label className="v2-field">
              <span>{c.typeLabel ?? 'Proje Türü'}</span>
              <select className="v2-input" defaultValue="">
                <option value="">Seçiniz</option>
                {c.projectTypes?.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="v2-field">
              <span>Mesajınız</span>
              <textarea className="v2-input" placeholder="Projeniz hakkında kısaca bilgi verin…" />
            </label>
            <button type="submit" className="v2-btn v2-btn-ghost w-full">
              {sent ? 'Gönderildi (örnek)' : 'Gönder'} <ArrowRight className="h-4 w-4" />
            </button>
            <p className="v2-mute text-xs">Örnek form: bilgileriniz hiçbir yere gönderilmez.</p>
          </form>
          <div className="border-t v2-line p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-10">
            <p className="v2-kicker mb-4">İletişim</p>
            <ul className="space-y-3 text-sm">
              {c.info?.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  if (c.layout === 'newsletter') {
    return (
      <section id={c.id} data-v2id={c.id} data-tone={c.tone ?? 'dark'} className="v2-sec">
        <div className="v2-wrap grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            {c.kicker && <p className="v2-kicker mb-3 !text-[var(--v-accent)]">{c.kicker}</p>}
            <h2 className="v2-h text-[clamp(2rem,4.4vw,3.4rem)]">
              <Lines lines={c.title} />
            </h2>
            {c.text && <p className="v2-mute mt-3 max-w-md">{c.text}</p>}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast('Örnek şablon: kaydınız alındı (demo).');
            }}
            className="flex gap-2"
          >
            <label className="v2-field flex-1">
              <span className="sr-only">E-posta adresi</span>
              <input className="v2-input" type="email" required placeholder="E-posta adresiniz" />
            </label>
            <button type="submit" className="v2-btn v2-btn-solid" aria-label="Kaydol">
              {sent ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </section>
    );
  }

  // features
  return (
    <section id={c.id} data-v2id={c.id} data-tone={c.tone ?? 'dark'} className="relative isolate overflow-hidden py-14 md:py-24">
      {c.image && (
        <>
          <Pic src={c.image} alt="" sizes="(min-width:1024px) 50vw, 100vw" className="-z-20 lg:!left-auto lg:!w-1/2" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--v-dark)_45%,color-mix(in_srgb,var(--v-dark)_40%,transparent))]" />
        </>
      )}
      <div className="v2-wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div>
          {c.kicker && <p className="v2-kicker mb-4 !text-[var(--v-accent)]">{c.kicker}</p>}
          <h2 className="v2-h text-[clamp(2.2rem,5vw,4rem)]">
            <Lines lines={c.title} />
          </h2>
          {c.text && <p className="v2-mute mt-4 max-w-sm">{c.text}</p>}
          {c.primary && (
            <div className="mt-7">
              <Btn cta={c.primary} variant="light" />
            </div>
          )}
        </div>
        {c.features && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:max-w-lg">
            {c.features.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.07}>
                <li className="flex gap-3 rounded-xl border v2-line bg-black/30 p-4 backdrop-blur">
                  <Ico name={f.icon} className="h-6 w-6 flex-none text-[var(--v-accent)]" />
                  <div>
                    <p className="text-sm font-semibold">{f.t}</p>
                    <p className="v2-mute text-xs">{f.x}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
