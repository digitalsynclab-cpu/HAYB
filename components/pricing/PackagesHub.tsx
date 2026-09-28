'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Gift, Globe, Layers, Megaphone, Minus, PenTool, QrCode, Share2, ShoppingBag, type LucideIcon } from 'lucide-react';
import { Price } from '@/components/ui/Price';
import { AddToCartButton } from '@/components/pricing/AddToCartButton';
import { PlanDetails, type DetailRow } from '@/components/pricing/PlanDetails';
import { whatsappUrl } from '@/data/site';
import { openContact } from '@/lib/contact-events';
import type { PricingPlan } from '@/types';

export interface PackageCard {
  plan: PricingPlan;
  /** Kartın başlığı (plan adından farklıysa) */
  title?: string;
  blurb?: string;
  rows: DetailRow[];
  gift?: string;
  example?: { href: string; label: string };
}

export interface CompareTable {
  title: string;
  columns: string[];
  rows: { label: string; values: (string | boolean)[] }[];
}

export interface PackageTab {
  id: string;
  label: string;
  /** Eski adres çapaları (#eticaret vb.) bu sekmeye yönlenir */
  aliases?: string[];
  category: string;
  intro: string;
  cards: PackageCard[];
  compare?: CompareTable;
  notes?: string[];
  /** Teklif kartı gösterilecekse */
  custom?: { title: string; text: string; features: string[] }[];
}

const MAX_POINTS = 5;

const TAB_ICON: Record<string, LucideIcon> = {
  web: Globe,
  eticaret: ShoppingBag,
  'sosyal-medya': Share2,
  'qr-menu': QrCode,
  logo: PenTool,
  reklam: Megaphone,
  diger: Layers,
};

function Cell({ v }: { v: string | boolean }) {
  if (typeof v === 'string') return <span className="font-medium text-fg">{v}</span>;
  return v ? (
    <>
      <Check aria-hidden className="mx-auto h-4 w-4 text-lime" />
      <span className="sr-only">Var</span>
    </>
  ) : (
    <>
      <Minus aria-hidden className="mx-auto h-4 w-4 text-fg-muted/50" />
      <span className="sr-only">Yok</span>
    </>
  );
}

function Card({ c, category, index }: { c: PackageCard; category: string; index: number }) {
  const { plan } = c;
  const rec = plan.recommended;
  const points = plan.features.slice(0, MAX_POINTS);
  const more = plan.features.length - points.length;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 260, damping: 26 }}
      className={`relative flex h-full flex-col rounded-[1.6rem] border p-6 sm:p-7 ${rec ? 'border-lime/60 bg-white/[0.05] shadow-[0_0_0_1px_rgb(166_255_65/0.15)] lg:-translate-y-2' : 'border-white/10 bg-white/[0.03]'}`}
    >
      {rec && <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">Önerilen</span>}
      <h3 className="text-xl font-bold tracking-tight">{c.title ?? plan.name}</h3>
      {c.blurb && <p className="mt-1.5 text-sm text-fg-muted">{c.blurb}</p>}
      <Price price={plan.price} tone="dark" className="mt-5 text-fg" />
      {c.gift && (
        <p className="mt-4 inline-flex items-start gap-2 self-start rounded-xl bg-lime px-3 py-2 text-sm font-bold text-ink-950">
          <Gift aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> {c.gift}
        </p>
      )}
      <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-5">
        {points.map((f) => (
          <li key={f} className="flex gap-2.5 text-[0.95rem] text-fg/90">
            <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
        {more > 0 && <li className="pl-7 text-sm text-fg-muted">+ {more} özellik daha</li>}
      </ul>
      <div className="mt-6 space-y-2">
        <AddToCartButton plan={plan} category={category} />
        <PlanDetails plan={plan} rows={c.rows} category={category} />
        <a
          href={whatsappUrl(`Merhaba, ${category} - ${plan.name} paketi hakkında bilgi almak istiyorum.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-fg-muted transition hover:text-lime"
        >
          WhatsApp’tan sor
        </a>
        {c.example && (
          <Link href={c.example.href} className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 text-sm font-semibold text-lime hover:underline">
            {c.example.label} <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

/** Sekmeli paket vitrini: tek seferde tek kategori; eski #çapa adresleri ilgili sekmeyi açar. */
export function PackagesHub({ tabs }: { tabs: PackageTab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  const fromHash = useCallback(() => {
    const h = window.location.hash.replace('#', '');
    const hit = tabs.find((t) => t.id === h || t.aliases?.includes(h));
    if (hit) setActive(hit.id);
  }, [tabs]);

  useEffect(() => {
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [fromHash]);

  const choose = (id: string) => {
    setActive(id);
    try {
      window.history.replaceState(null, '', `#${id}`);
    } catch {
      /* adres güncellenemezse zararsız */
    }
  };

  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  const cols = tab.cards.length >= 4 ? 'lg:grid-cols-4 md:grid-cols-2' : tab.cards.length === 3 ? 'lg:grid-cols-3 md:grid-cols-2' : tab.cards.length === 2 ? 'md:grid-cols-2' : 'max-w-md mx-auto';

  return (
    <div>
      <div className="sticky top-[var(--hayb-header-h)] z-20 -mx-4 border-b border-white/10 bg-ink-950/92 px-4 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:border sm:px-3">
        <div role="tablist" aria-label="Paket kategorileri" className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] lg:grid lg:grid-cols-7 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const on = t.id === active;
            const Icon = TAB_ICON[t.id] ?? Layers;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls="paket-icerik"
                onClick={() => choose(t.id)}
                className={`relative flex shrink-0 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-[0.95rem] font-bold transition-colors lg:px-2 ${on ? 'border-lime text-ink-950' : 'border-white/10 bg-white/[0.04] text-fg hover:border-white/30'}`}
              >
                {on && <motion.span layoutId="paket-tab" className="absolute inset-0 rounded-2xl bg-lime" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <Icon aria-hidden className="relative h-[1.15rem] w-[1.15rem]" />
                <span className="relative whitespace-nowrap">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="paket-icerik" role="tabpanel" aria-labelledby={`tab-${tab.id}`} key={tab.id} className="mt-10">
        <p className="mx-auto max-w-2xl text-center text-lg text-fg-muted">{tab.intro}</p>

        {tab.cards.length > 0 && (
          <ul className={`mt-12 grid items-stretch gap-5 ${cols}`}>
            {tab.cards.map((c, i) => (
              <li key={c.plan.id}>
                <Card c={c} category={tab.category} index={i} />
              </li>
            ))}
          </ul>
        )}

        {tab.custom && (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {tab.custom.map((b) => (
              <div key={b.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <h3 className="text-xl font-bold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{b.text}</p>
                <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {b.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.93rem] text-fg/90">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-2">
              <button type="button" onClick={openContact} className="press inline-flex min-h-12 items-center gap-2 rounded-xl bg-lime px-6 font-semibold text-ink-950 hover:bg-lime-soft">
                Teklif Al <ArrowRight aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {tab.compare && (
          <details className="group mt-12 rounded-[1.6rem] border border-white/10 bg-white/[0.02]">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {tab.compare.title}
              <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-xl leading-none transition group-open:rotate-45">+</span>
            </summary>
            <div className="overflow-x-auto px-2 pb-4 sm:px-4" tabIndex={0} role="region" aria-label={`${tab.compare.title} (kaydırılabilir)`}>
              <table className="w-full min-w-[34rem] border-collapse text-left text-[0.93rem]">
                <thead>
                  <tr className="border-b border-white/10 text-fg-muted">
                    <th scope="col" className="sticky left-0 bg-ink-950 px-3 py-3 font-semibold">Özellik</th>
                    {tab.compare.columns.map((c) => (
                      <th key={c} scope="col" className="px-3 py-3 text-center font-bold text-fg">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tab.compare.rows.map((r) => (
                    <tr key={r.label} className="border-b border-dashed border-white/10 last:border-0">
                      <th scope="row" className="sticky left-0 bg-ink-950 px-3 py-2.5 font-medium text-fg/90">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={i} className="px-3 py-2.5 text-center">
                          <Cell v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}

        {tab.notes && tab.notes.length > 0 && (
          <div className="mx-auto mt-8 max-w-3xl space-y-2 text-center text-sm text-fg-muted">
            {tab.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 border-t border-white/10 pt-12">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Diğer paketlere de bakın</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tabs
            .filter((t) => t.id !== tab.id)
            .map((t) => {
              const Icon = TAB_ICON[t.id] ?? Layers;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      choose(t.id);
                      document.getElementById('paket-vitrini')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="group flex min-h-24 w-full flex-col items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-lime/60 hover:bg-white/[0.06]"
                  >
                    <Icon aria-hidden className="h-6 w-6 text-lime" />
                    <span className="flex w-full items-center justify-between font-bold">
                      {t.label}
                      <ArrowRight aria-hidden className="h-4 w-4 text-fg-muted transition group-hover:translate-x-1 group-hover:text-lime" />
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
