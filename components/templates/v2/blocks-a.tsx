'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { BookField, BookingBlock, CardsBlock, HeroBlock, SplitBlock, StripBlock } from '@/data/template-types';
import { Btn, Compare, Counter, Ico, Lines, Pic, PlayBtn, RailArrows, Reveal, SectionHead, useRail, useV2 } from '@/components/templates/v2/ui';

/* ═════════════ Rezervasyon / randevu ═════════════ */

const isoIn = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

function Field({ f, value, onChange }: { f: BookField; value: string; onChange: (v: string) => void }) {
  const id = `f-${f.id}`;
  return (
    <label className="v2-field" htmlFor={id}>
      <span>{f.label}</span>
      {f.kind === 'date' ? (
        <input id={id} type="date" className="v2-input" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : f.kind === 'text' ? (
        <input id={id} type="text" className="v2-input" placeholder={f.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <select id={id} className="v2-input" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">{f.placeholder ?? 'Seçiniz'}</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

function useFields(fields: BookField[]) {
  const init = () => Object.fromEntries(fields.map((f) => [f.id, f.value ?? '']));
  const [vals, setVals] = useState<Record<string, string>>(init);
  useEffect(() => {
    // Tarih alanlarına bugüne göre makul varsayılan (istemcide).
    setVals((p) => {
      const n = { ...p };
      fields.forEach((f, i) => {
        if (f.kind === 'date' && !n[f.id]) n[f.id] = isoIn(3 + i * 3);
      });
      return n;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [vals, (id: string, v: string) => setVals((p) => ({ ...p, [id]: v }))] as const;
}

export function BookingView({ b, embedded = false }: { b: BookingBlock; embedded?: boolean }) {
  const { toast } = useV2();
  const allFields = b.steps ? b.steps.flatMap((s) => s.fields) : b.fields;
  const [vals, setVal] = useFields(allFields);
  const [tab, setTab] = useState(b.tabs?.[0] ?? '');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [carResult, setCarResult] = useState<string[] | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (b.layout === 'car') {
      setCarResult(b.car?.results[vals.service] ?? Object.values(b.car?.results ?? {})[0] ?? []);
      return;
    }
    if (b.layout === 'stepper' && b.steps && step < b.steps.length - 1) {
      const missing = b.steps[step].fields.find((f) => !vals[f.id]);
      if (missing) {
        toast(`Lütfen "${missing.label}" alanını seçin.`);
        return;
      }
      setStep(step + 1);
      return;
    }
    setDone(true);
    toast(b.done ?? 'Örnek şablon: talebiniz alındı (demo). Bilgiler hiçbir yere gönderilmez.');
  };

  if (b.layout === 'car' && b.car) {
    const models = b.car.models[vals.brand] ?? [];
    return (
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          {b.kicker && <p className="v2-kicker mb-3">{b.kicker}</p>}
          <h2 className="v2-h text-[clamp(1.7rem,3.6vw,2.6rem)]">{b.title}</h2>
          {b.text && <p className="v2-mute mt-2 max-w-sm text-sm">{b.text}</p>}
          <div className="relative mt-5 hidden aspect-[3.4/1] max-w-md lg:block">
            <Pic src={b.car.image} alt="Örnek araç" sizes="420px" className="object-contain" />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {b.fields.map((f) => (
              <Field
                key={f.id}
                f={f.id === 'model' ? { ...f, options: models, placeholder: vals.brand ? 'Seçiniz' : 'Önce marka' } : f}
                value={vals[f.id] ?? ''}
                onChange={(v) => {
                  setVal(f.id, v);
                  if (f.id === 'brand') setVal('model', '');
                  setCarResult(null);
                }}
              />
            ))}
          </div>
          <button type="submit" className="v2-btn v2-btn-solid mt-4 w-full md:w-auto">
            {b.submit} <ArrowRight className="h-4 w-4" />
          </button>
          {carResult && (
            <div className="v2-slide mt-5 rounded-2xl border v2-line p-4">
              <p className="v2-kicker mb-3">
                {vals.brand} {vals.model} {vals.year} için uygun servisler
              </p>
              <ul className="flex flex-wrap gap-2">
                {carResult.map((r) => (
                  <li key={r} className="rounded-full border v2-line px-3.5 py-1.5 text-sm font-semibold">
                    {r}
                  </li>
                ))}
              </ul>
              <p className="v2-mute mt-3 text-xs">Örnek sonuçtur; gerçek sitede burada randevu takvimi açılır.</p>
            </div>
          )}
        </div>
      </form>
    );
  }

  if (b.layout === 'stepper' && b.steps) {
    const s = b.steps[step];
    return (
      <form onSubmit={submit} className="w-full">
        <ol className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]" aria-label="Randevu adımları">
          {b.steps.map((st, i) => (
            <li key={st.label} className="flex items-center gap-2" aria-current={i === step ? 'step' : undefined}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[0.7rem] ${i <= step ? 'bg-[var(--v-accent)] text-[var(--v-accent-ink)]' : 'border v2-line'}`}>{i + 1}</span>
              <span className={i === step ? '' : 'v2-mute hidden sm:inline'}>{st.label}</span>
              {i < b.steps!.length - 1 && <span aria-hidden className="h-px w-5 bg-current opacity-25 sm:w-8" />}
            </li>
          ))}
        </ol>
        {done ? (
          <p className="v2-pop rounded-2xl border v2-line p-5 font-semibold">Talebiniz alındı (örnek). Gerçek sitede kısa sürede sizi arayacağız.</p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              {s.fields.map((f) => (
                <Field key={f.id} f={f} value={vals[f.id] ?? ''} onChange={(v) => setVal(f.id, v)} />
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {step > 0 && (
                <button type="button" onClick={() => setStep(step - 1)} className="v2-btn v2-btn-ghost">
                  Geri
                </button>
              )}
              <button type="submit" className="v2-btn v2-btn-solid">
                {step < b.steps.length - 1 ? 'Devam Et' : b.submit} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </form>
    );
  }

  const isCard = b.layout === 'card';
  return (
    <form onSubmit={submit} className={embedded || isCard ? '' : ''}>
      {b.title && <h3 className="v2-h mb-4 text-[clamp(1.4rem,2.6vw,1.9rem)]">{b.title}</h3>}
      {b.tabs && (
        <div role="tablist" aria-label="Rezervasyon türü" className="mb-4 grid grid-flow-col auto-cols-fr rounded-xl bg-black/25 p-1">
          {b.tabs.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`min-h-10 rounded-lg px-2 text-[0.8rem] font-semibold transition ${tab === t ? 'bg-white text-black' : 'opacity-80 hover:opacity-100'}`}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className={isCard ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 gap-3 md:grid-flow-col md:auto-cols-fr md:items-end lg:gap-4'}>
        {b.fields.map((f, i) => (
          <div key={f.id} className={isCard && (f.kind === 'guests' || i === b.fields.length - 1) ? 'col-span-2' : ''}>
            <Field f={f} value={vals[f.id] ?? ''} onChange={(v) => setVal(f.id, v)} />
          </div>
        ))}
        {!isCard && (
          <button type="submit" className="v2-btn v2-btn-solid col-span-2 md:col-span-1">
            {b.submit} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
      {isCard && (
        <button type="submit" className="v2-btn v2-btn-light mt-4 w-full">
          {b.submit} <ArrowRight className="h-4 w-4" />
        </button>
      )}
      {b.note && <p className="v2-mute mt-3 flex items-center gap-2 text-xs">{b.note}</p>}
      {done && <p className="v2-pop mt-3 text-sm font-semibold">Örnek talep alındı.</p>}
    </form>
  );
}

export function Booking({ b }: { b: BookingBlock }) {
  const dark = (b.tone ?? 'light') === 'dark';
  if (b.layout === 'bar') {
    return (
      <div id={b.id} data-v2id={b.id} className="v2-wrap relative z-20 -mt-10 md:-mt-14">
        <Reveal>
          <div className={`rounded-[calc(var(--v-cr)+4px)] p-4 shadow-[0_24px_70px_rgb(0_0_0/0.28)] md:p-5 ${dark ? '' : 'bg-white text-[#141414]'}`} data-tone={dark ? 'dark' : undefined} style={dark ? undefined : { ['--v-accent' as string]: 'var(--v-accent)' }}>
            <BookingView b={b} />
          </div>
        </Reveal>
      </div>
    );
  }
  return (
    <section id={b.id} data-v2id={b.id} data-tone={b.tone ?? 'soft'} className="v2-sec">
      <div className="v2-wrap">
        <Reveal>
          {b.layout === 'stepper' ? (
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
              <div>
                {b.kicker && <p className="v2-kicker mb-3">{b.kicker}</p>}
                <h2 className="v2-h text-[clamp(2rem,4.4vw,3.2rem)]">{b.title}</h2>
                {b.text && <p className="v2-mute mt-3 max-w-sm">{b.text}</p>}
              </div>
              <div className="rounded-[calc(var(--v-cr)+6px)] bg-white p-5 text-[#161616] shadow-[0_20px_60px_rgb(0_0_0/0.10)] sm:p-7">
                <BookingView b={b} />
              </div>
            </div>
          ) : (
            <div className="rounded-[calc(var(--v-cr)+6px)] border v2-line p-5 sm:p-8">
              <BookingView b={b} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════ Hero ═════════════ */

function HeroTexts({ h, center = false }: { h: HeroBlock; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {h.kicker && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="v2-kicker mb-5">
          {h.kicker}
        </motion.p>
      )}
      <h1 className="v2-h text-[clamp(2.7rem,8.2vw,6.6rem)]">
        <Lines lines={h.lines} italic={h.italic} accent={h.accent} immediate />
      </h1>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }} className="v2-mute mt-6 max-w-md text-[1.02rem] leading-relaxed md:text-lg">
        {h.text}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-8 flex flex-wrap items-center gap-3">
        <Btn cta={h.primary} />
        {h.secondary && <Btn cta={h.secondary} variant="ghost" />}
      </motion.div>
    </div>
  );
}

function HeroExtras({ h }: { h: HeroBlock }) {
  return (
    <>
      {h.metrics && (
        <ul className="mt-10 flex flex-wrap gap-x-9 gap-y-4">
          {h.metrics.map((m) => (
            <li key={m.l} className="border-l border-current/25 pl-4 first:border-0 first:pl-0">
              <p className="v2-h text-3xl md:text-4xl">
                <Counter value={m.v} />
              </p>
              <p className="v2-mute mt-0.5 text-[0.7rem] font-bold uppercase tracking-[0.14em]">{m.l}</p>
            </li>
          ))}
        </ul>
      )}
      {h.steps && (
        <ol className="mt-10 grid max-w-md grid-cols-3 gap-4">
          {h.steps.map((s) => (
            <li key={s.n}>
              <p className="v2-h text-2xl">{s.n}</p>
              <p className="v2-mute mt-1 text-xs font-semibold">{s.t}</p>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export function Hero({ h }: { h: HeroBlock }) {
  const tone = h.tone ?? (h.variant === 'full' ? 'dark' : 'light');
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 70]);
  const { go } = useV2();

  if (h.variant === 'full') {
    return (
      <section id={h.id} data-v2id={h.id} data-tone={tone} className="relative isolate flex min-h-[max(40rem,94svh)] items-end overflow-hidden pt-28 pb-14 lg:items-center lg:pb-20">
        <motion.div style={{ y }} className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[72%]">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0,#000_30%)] lg:[mask-image:linear-gradient(to_right,transparent_0,#000_42%)]">
            <Pic src={h.image} alt={h.alt} sizes="(min-width:1024px) 72vw, 100vw" priority className="v2-kb" focus={h.focus ?? '60% 50%'} />
          </div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--v-dark)_0,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.3)_100%)] lg:bg-[linear-gradient(to_right,var(--v-dark)_0,transparent_46%)]" />
        <div className="v2-wrap grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)] lg:items-center">
          <div>
            <HeroTexts h={h} />
            <HeroExtras h={h} />
            {h.script && <p className="v2-script v2-accent mt-6 text-5xl">{h.script}</p>}
            {h.coords && <p className="v2-mute mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em]">{h.coords}</p>}
          </div>
          {h.panel && (
            <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9 }} className="rounded-[calc(var(--v-cr)+8px)] border border-white/15 bg-black/35 p-5 text-white backdrop-blur-xl sm:p-6" aria-label="Rezervasyon">
              <BookingView b={h.panel} embedded />
            </motion.aside>
          )}
        </div>
        {h.note && (
          <ul aria-hidden className="v2-kicker absolute right-8 top-1/2 hidden -translate-y-1/2 space-y-1 text-right xl:block">
            {h.note.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
        <button type="button" onClick={() => go(h.primary.to ?? '')} aria-label="Aşağı kaydır" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 animate-bounce opacity-70 lg:block">
          <ChevronDown className="h-6 w-6" />
        </button>
      </section>
    );
  }

  if (h.variant === 'poster') {
    return (
      <section id={h.id} data-v2id={h.id} data-tone={tone} className="relative isolate overflow-hidden pt-28 pb-12 lg:min-h-[94svh] lg:pb-0">
        <div className="v2-wrap relative grid gap-8 lg:min-h-[calc(94svh-7rem)] lg:grid-cols-12 lg:items-center">
          <div className="relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <HeroTexts h={h} />
            <HeroExtras h={h} />
          </div>
          <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:col-span-5 lg:aspect-auto lg:w-[46vw] lg:max-w-[42rem]">
            <Pic src={h.image} alt={h.alt} sizes="(min-width:1024px) 46vw, 100vw" priority className="v2-kb" focus={h.focus} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            {h.note && (
              <ul className="v2-kicker absolute bottom-5 right-5 space-y-1 text-right text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
                {h.note.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // split | arch
  const arch = h.variant === 'arch';
  return (
    <section id={h.id} data-v2id={h.id} data-tone={tone} className="relative isolate overflow-hidden pt-28 pb-14 lg:pb-20">
      <div className="v2-wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <HeroTexts h={h} />
          <HeroExtras h={h} />
          {h.script && <p className="v2-script v2-accent mt-6 text-4xl">{h.script}</p>}
        </div>
        <motion.div style={{ y }} className="relative order-1 lg:order-2">
          <div className={`relative aspect-[4/4.6] overflow-hidden lg:aspect-[4/4.9] ${arch ? 'rounded-t-[999px] rounded-b-[2rem]' : 'rounded-[calc(var(--v-cr)+4px)]'}`}>
            <Pic src={h.image} alt={h.alt} sizes="(min-width:1024px) 46vw, 92vw" priority className="v2-kb" focus={h.focus} />
            {h.note && (
              <ul aria-hidden className="v2-kicker absolute bottom-4 right-4 hidden space-y-0.5 text-right text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)] sm:block">
                {h.note.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </div>
          {h.badge && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.7 }} className="absolute -bottom-5 left-3 max-w-[15rem] rounded-2xl bg-white p-4 text-[#161616] shadow-2xl sm:-left-6">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] opacity-60">{h.badge.title}</p>
              <p className="mt-1 text-sm font-semibold leading-snug">{h.badge.text}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
      {h.marquee && <Marquee words={h.marquee} />}
    </section>
  );
}

export function Marquee({ words, tone }: { words: string[]; tone?: string }) {
  const row = [...words, ...words];
  return (
    <div aria-hidden data-tone={tone} className="mt-10 overflow-hidden border-y v2-line py-4">
      <div className="v2-marq">
        {[0, 1].map((k) => (
          <div key={k} className="flex flex-none items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="v2-h flex items-center px-6 text-2xl opacity-80 md:text-4xl">
                {w}
                <span className="v2-accent ml-12">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═════════════ Şerit ═════════════ */

export function Strip({ s }: { s: StripBlock }) {
  const { go } = useV2();
  if (s.layout === 'thumbs') {
    return (
      <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'light'} className="py-6 md:py-8">
        <div className="v2-wrap">
          <div className="v2-rail v2-bleed lg:grid lg:grid-flow-col lg:auto-cols-fr lg:gap-5 lg:overflow-visible">
            {s.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06} className="w-[15rem] sm:w-[17rem] lg:w-auto">
                <button type="button" onClick={() => go(it.to ?? '')} className="group flex w-full items-center gap-4 rounded-[calc(var(--v-cr)+2px)] border v2-line p-3 text-left transition hover:bg-[color-mix(in_srgb,currentColor_5%,transparent)]">
                  {it.image ? (
                    <span className="relative h-16 w-20 flex-none overflow-hidden rounded-[calc(var(--v-cr)-2px)] v2-zoom">
                      <Pic src={it.image} alt="" sizes="96px" />
                    </span>
                  ) : (
                    it.icon && (
                      <span className="grid h-14 w-14 flex-none place-items-center rounded-full v2-fill">
                        <Ico name={it.icon} className="h-6 w-6" />
                      </span>
                    )
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-tight">{it.title}</span>
                    {it.text && <span className="v2-mute mt-0.5 block text-sm leading-snug">{it.text}</span>}
                  </span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 flex-none opacity-60 transition group-hover:opacity-100" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }
  const numbered = s.layout === 'numbered';
  return (
    <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'light'} className="border-y v2-line py-8 md:py-10">
      <div className="v2-wrap">
        <ul className={`grid gap-6 ${numbered ? 'md:grid-cols-3' : 'grid-cols-2 md:grid-flow-col md:auto-cols-fr'}`}>
          {s.items.map((it, i) => (
            <li key={it.title} className={`${numbered ? '' : 'md:border-l md:pl-6 first:md:border-0 first:md:pl-0'} v2-line`}>
              <Reveal delay={i * 0.07}>
                <div className="flex items-start gap-4">
                  {numbered && <span className="v2-h text-[clamp(2.4rem,5vw,3.6rem)] leading-none opacity-30">{it.n ?? String(i + 1).padStart(2, '0')}</span>}
                  {it.icon && (
                    <span className={`grid flex-none place-items-center rounded-full v2-fill ${numbered ? 'h-12 w-12' : 'h-11 w-11'}`}>
                      <Ico name={it.icon} className="h-5 w-5" />
                    </span>
                  )}
                  <div>
                    <p className="font-semibold leading-tight">{it.title}</p>
                    {it.text && <p className="v2-mute mt-1 text-sm leading-snug">{it.text}</p>}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════ Kartlar ═════════════ */

export function Cards({ c }: { c: CardsBlock }) {
  const { go } = useV2();
  const rail = useRail();
  const [active, setActive] = useState(0);
  const tone = c.tone ?? 'light';

  const head = c.head && (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <SectionHead {...c.head} className="!mb-0 md:mb-0" />
      {c.arrows && <RailArrows edge={rail.edge} by={rail.by} className="hidden md:flex" />}
    </div>
  );

  if (c.layout === 'feature') {
    return (
      <section id={c.id} data-v2id={c.id} data-tone={tone} className="v2-sec !py-0">
        <div className="v2-wrap">
          <ul className="grid border-y v2-line md:grid-flow-col md:auto-cols-fr">
            {c.items.map((it, i) => {
              const on = active === i;
              return (
                <li key={it.title} className="border-b v2-line last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setActive(i);
                      go(it.to ?? '');
                    }}
                    aria-pressed={on}
                    className={`group flex h-full w-full flex-col justify-between gap-6 p-5 text-left transition-colors duration-500 md:min-h-[17rem] md:p-6 ${on ? 'bg-[var(--v-accent)] text-[var(--v-accent-ink)]' : 'hover:bg-[color-mix(in_srgb,currentColor_5%,transparent)]'}`}
                  >
                    <span className="flex items-start justify-between">
                      <span className="v2-h text-2xl opacity-70">{it.n ?? String(i + 1).padStart(2, '0')}</span>
                      {it.icon && <Ico name={it.icon} className="h-7 w-7" />}
                    </span>
                    <span>
                      <span className="v2-h block text-[1.15rem] leading-tight">{it.title}</span>
                      {it.text && <span className={`mt-2 block text-sm leading-snug transition ${on ? 'opacity-90' : 'v2-mute'}`}>{it.text}</span>}
                      <span className={`mt-4 grid h-10 w-10 place-items-center rounded-full border transition ${on ? 'border-current' : 'v2-line'}`}>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }

  if (c.layout === 'wide') {
    return (
      <section id={c.id} data-v2id={c.id} data-tone={tone} className="p-0">
        <ul className="grid md:grid-flow-col md:auto-cols-fr">
          {c.items.map((it, i) => (
            <li key={it.title} className="group v2-zoom relative isolate flex min-h-[26rem] items-end overflow-hidden text-white md:min-h-[34rem]">
              <Pic src={it.image} alt="" sizes="(min-width:768px) 50vw, 100vw" focus={it.focus} className="-z-10" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <Reveal delay={i * 0.1} className="p-6 md:p-10">
                {it.tag && <p className="v2-kicker mb-3 text-white/70">{it.tag}</p>}
                <h3 className="v2-h text-[clamp(1.7rem,3.4vw,2.6rem)]">{it.title}</h3>
                {it.text && <p className="mt-2 max-w-xs text-sm text-white/80">{it.text}</p>}
                <button type="button" onClick={() => go(it.to ?? '')} className="v2-btn v2-btn-text mt-5 text-white">
                  Keşfet <ArrowRight className="h-4 w-4" />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (c.layout === 'events') {
    return (
      <section id={c.id} data-v2id={c.id} data-tone={tone} className="v2-sec">
        <div className="v2-wrap grid items-center gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.6fr)] lg:gap-12">
          <div>{c.head && <SectionHead {...c.head} className="!mb-0" />}</div>
          <div>
            <div ref={rail.ref} className="v2-rail v2-bleed lg:mx-0 lg:px-0">
              {c.items.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.08} className="w-[14.5rem] sm:w-[16rem]">
                  <button type="button" onClick={() => go(it.to ?? '')} className="group v2-zoom relative isolate flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-[calc(var(--v-cr)+2px)] p-4 text-left text-white">
                    <Pic src={it.image} alt="" sizes="260px" className="-z-10" focus={it.focus} />
                    <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
                    {it.date && (
                      <span>
                        <span className="v2-h block text-4xl leading-none">{it.date.d}</span>
                        <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em]">{it.date.m}</span>
                      </span>
                    )}
                    <span className="flex items-end justify-between gap-2">
                      <span>
                        <span className="block font-semibold leading-tight">{it.title}</span>
                        {it.sub && <span className="mt-0.5 block text-xs text-white/75">{it.sub}</span>}
                      </span>
                      <span className="v2-round border-white/50 !h-9 !w-9">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
            {c.arrows && <RailArrows edge={rail.edge} by={rail.by} className="mt-4 justify-end" />}
          </div>
        </div>
      </section>
    );
  }

  // overlay | poster | caption
  const caption = c.layout === 'caption';
  const gridCols = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[c.cols ?? 4];
  const railOnDesktop = c.arrows && !caption;
  return (
    <section id={c.id} data-v2id={c.id} data-tone={tone} className={`v2-sec relative isolate ${c.bgImage ? 'text-white' : ''}`}>
      {c.bgImage && (
        <>
          <Pic src={c.bgImage} alt="" sizes="100vw" className="-z-20" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
        </>
      )}
      <div className="v2-wrap">
        {head && <div className="mb-8 md:mb-12">{head}</div>}
        <div ref={rail.ref} className={`v2-rail v2-bleed ${railOnDesktop ? 'lg:mx-0 lg:px-0' : `lg:grid ${gridCols} lg:gap-5 lg:overflow-visible`}`}>
          {c.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 4) * 0.07} className={`${caption ? 'w-[15.5rem] sm:w-[17rem] lg:w-auto' : c.layout === 'poster' ? 'w-[15rem] sm:w-[17rem] lg:w-auto' : 'w-[16rem] sm:w-[18rem] lg:w-[19rem]'} ${railOnDesktop ? 'lg:!w-[21rem]' : ''}`}>
              {caption ? (
                <button type="button" onClick={() => go(it.to ?? '')} className="group block w-full text-left">
                  <span className="relative block aspect-[4/3.1] overflow-hidden rounded-[calc(var(--v-cr)+2px)] v2-zoom">
                    <Pic src={it.image} alt="" sizes="(min-width:1024px) 22vw, 70vw" focus={it.focus} />
                    {it.n && <span className="v2-h absolute left-3 top-2 text-3xl text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.45)]">{it.n}</span>}
                  </span>
                  <span className="mt-4 flex items-start justify-between gap-3">
                    <span>
                      <span className="block font-semibold leading-tight">{it.title}</span>
                      {it.text && <span className="v2-mute mt-1 block text-sm leading-snug">{it.text}</span>}
                    </span>
                    <span className="v2-round !h-10 !w-10 transition group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              ) : (
                <button type="button" onClick={() => go(it.to ?? '')} className={`group v2-zoom relative isolate flex w-full flex-col justify-end overflow-hidden rounded-[calc(var(--v-cr)+2px)] p-5 text-left text-white ${c.layout === 'poster' ? 'aspect-[3/4.6]' : 'aspect-[3/4.1]'}`}>
                  <Pic src={it.image} alt="" sizes="(min-width:1024px) 22vw, 70vw" className="-z-10" focus={it.focus} />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  {it.n && <span className="v2-h absolute left-5 top-4 text-3xl opacity-80">{it.n}</span>}
                  {it.tag && <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-black">{it.tag}</span>}
                  <span className="flex items-end justify-between gap-3">
                    <span>
                      <span className="v2-h block text-[1.5rem] leading-tight">{it.title}</span>
                      {(it.text || it.sub) && <span className="mt-1 block text-[0.82rem] leading-snug text-white/80">{it.text ?? it.sub}</span>}
                      {it.meta && (
                        <span className="mt-2 flex flex-wrap gap-x-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white/70">
                          {it.meta.map((m) => (
                            <span key={m}>{m}</span>
                          ))}
                        </span>
                      )}
                    </span>
                    <span className="v2-round !h-10 !w-10 border-white/60 transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              )}
            </Reveal>
          ))}
        </div>
        {c.arrows && (
          <div className="mt-5 flex items-center justify-between">
            <span className="v2-mute text-xs md:hidden">Yana kaydırın</span>
            <RailArrows edge={rail.edge} by={rail.by} className="md:hidden lg:flex" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ═════════════ Bölünmüş içerik ═════════════ */

export function Split({ s }: { s: SplitBlock }) {
  const m = s.media;
  const cnt = s.content;
  const [sel, setSel] = useState(0);
  const prof = cnt.profiles?.[sel];
  const img = prof?.image ?? m.image;
  const aspect = { portrait: 'aspect-[4/4.9]', landscape: 'aspect-[4/3]', square: 'aspect-square' }[m.aspect ?? 'portrait'];
  const frame = m.frame === 'arch' ? 'rounded-t-[999px] rounded-b-[1.5rem]' : m.frame === 'oval' ? 'rounded-[999px]' : 'rounded-[calc(var(--v-cr)+4px)]';

  return (
    <section id={s.id} data-v2id={s.id} data-tone={s.tone ?? 'light'} className="v2-sec">
      <div className="v2-wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={s.flip ? 'lg:order-2' : ''}>
          {m.compare ? (
            <div>
              <Compare before={m.compare.before} after={m.compare.after} labels={m.compare.labels} alt={m.alt} className={`${aspect} ${frame}`} />
              <p className="v2-mute mt-3 text-xs">{m.compare.note}</p>
            </div>
          ) : (
            <div className={`grid gap-3 ${m.stack ? 'grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]' : ''}`}>
              <div className={`relative isolate overflow-hidden ${aspect} ${frame} v2-zoom`}>
                <motion.div key={img} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                  <Pic src={img} alt={prof?.name ?? m.alt} sizes="(min-width:1024px) 46vw, 92vw" focus={m.focus} />
                </motion.div>
                {m.badge && (
                  <div className="absolute bottom-4 left-4 grid h-24 w-24 place-items-center rounded-full bg-[var(--v-accent)] text-center text-[var(--v-accent-ink)] shadow-xl">
                    <span>
                      <span className="v2-h block text-3xl leading-none">{m.badge.v}</span>
                      <span className="block text-[0.58rem] font-bold uppercase leading-tight tracking-[0.08em]">{m.badge.l}</span>
                    </span>
                  </div>
                )}
                {m.play && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                    <PlayBtn label={m.play} />
                  </div>
                )}
              </div>
              {m.stack && (
                <div className="grid gap-3">
                  {m.stack.map((st) => (
                    <div key={st} className={`relative aspect-[4/3] overflow-hidden ${frame} v2-zoom`}>
                      <Pic src={st} alt="" sizes="20vw" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Reveal>

        <div className={s.flip ? 'lg:order-1' : ''}>
          {cnt.kicker && <p className="v2-kicker mb-4">{cnt.kicker}</p>}
          <h2 className="v2-h text-[clamp(2rem,4.6vw,3.5rem)]">
            <Lines lines={cnt.title} italic={cnt.italic} />
          </h2>
          {cnt.text && <p className="v2-mute mt-5 max-w-lg text-[1.02rem] leading-relaxed">{cnt.text}</p>}

          {cnt.facts && (
            <dl className="mt-6 max-w-md divide-y v2-line border-y v2-line text-sm">
              {cnt.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5">
                  <dt className="v2-mute">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {cnt.list && (
            <ul className="mt-6 space-y-3">
              {cnt.list.map((l) => (
                <li key={l.t} className="flex items-start gap-3">
                  {l.icon ? (
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full v2-fill">
                      <Ico name={l.icon} className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                  ) : (
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--v-accent)]" />
                  )}
                  <span>
                    <span className="block font-semibold leading-tight">{l.t}</span>
                    {l.x && <span className="v2-mute block text-sm">{l.x}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {cnt.steps && (
            <ol className="mt-6 max-w-md divide-y v2-line border-y v2-line">
              {cnt.steps.map((st) => (
                <li key={st.n} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-3">
                  <span className="v2-mute text-sm font-bold">{st.n}</span>
                  <span>
                    <span className="block text-[0.72rem] font-extrabold uppercase tracking-[0.14em]">{st.t}</span>
                    {st.x && <span className="v2-mute text-sm">{st.x}</span>}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {cnt.profiles && (
            <div className="mt-6">
              {cnt.profiles.length > 1 && (
                <div role="tablist" aria-label="Ekip" className="mb-5 flex gap-2">
                  {cnt.profiles.map((p, i) => (
                    <button key={p.name} type="button" role="tab" aria-selected={sel === i} onClick={() => setSel(i)} className={`v2-btn ${sel === i ? 'v2-btn-solid' : 'v2-btn-ghost'} !min-h-10 !px-4 !text-[0.82rem]`}>
                      {p.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              )}
              {prof && (
                <div key={prof.name} className="v2-slide">
                  <p className="v2-h text-2xl md:text-3xl">{prof.name}</p>
                  <p className="v2-kicker mt-1">{prof.role}</p>
                  <p className="v2-mute mt-3 max-w-md leading-relaxed">{prof.text}</p>
                  {prof.kpis && (
                    <ul className="mt-5 flex gap-8">
                      {prof.kpis.map((k) => (
                        <li key={k.l}>
                          <p className="v2-h text-3xl">
                            <Counter value={k.v} />
                          </p>
                          <p className="v2-kicker !text-[0.62rem]">{k.l}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {prof.creds && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                      {prof.creds.map((c) => (
                        <li key={c.t} className="flex items-start gap-2.5 text-[0.82rem] leading-snug">
                          <Ico name={c.icon} className="mt-0.5 h-4 w-4 flex-none opacity-70" />
                          {c.t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {prof.signature && <p className="v2-script mt-4 text-4xl opacity-80">{prof.signature}</p>}
                </div>
              )}
            </div>
          )}

          {cnt.kpis && (
            <ul className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {cnt.kpis.map((k) => (
                <li key={k.l}>
                  <p className="v2-h text-[clamp(1.8rem,3vw,2.5rem)]">
                    <Counter value={k.v} />
                  </p>
                  <p className="v2-mute text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.1em]">{k.l}</p>
                </li>
              ))}
            </ul>
          )}

          {cnt.quote && <blockquote className="v2-h mt-8 max-w-sm border-l-2 border-[var(--v-accent)] pl-4 text-xl italic">“{cnt.quote}”</blockquote>}
          {cnt.cta && (
            <div className="mt-8">
              <Btn cta={cnt.cta} variant={s.tone === 'dark' ? 'ghost' : 'text'} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
