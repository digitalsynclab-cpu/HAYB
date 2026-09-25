'use client';
import { useMemo, useState } from 'react';
import { Check, Search } from 'lucide-react';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { UseTemplateLink } from '@/components/order/UseTemplateLink';
import type { TemplateMeta } from '@/data/template-types';

type Meta = TemplateMeta;

const PACKAGE_LABEL = { business: 'Business', professional: 'Professional', premium: 'Premium' } as const;

/** Sektör filtreli şablon galerisi. Filtre ve arama yalnızca tarayıcıda çalışır; tüm şablonlar HTML'de bulunur. */
export function TemplateGallery({ items }: { items: Meta[] }) {
  const [cat, setCat] = useState('Tümü');
  const [q, setQ] = useState('');

  const cats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of items) counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
    return [['Tümü', items.length] as const, ...Array.from(counts.entries())];
  }, [items]);

  const list = useMemo(() => {
    const s = q.trim().toLocaleLowerCase('tr-TR');
    return items.filter((t) => (cat === 'Tümü' || t.category === cat) && (!s || `${t.brand} ${t.sector} ${t.category} ${t.code}`.toLocaleLowerCase('tr-TR').includes(s)));
  }, [items, cat, q]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Sektöre göre filtrele" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {cats.map(([c, n]) => {
            const on = cat === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c)}
                className={`press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${on ? 'border-lime bg-lime text-ink-950' : 'border-white/20 text-fg hover:border-lime/60'}`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-[0.7rem] font-bold ${on ? 'bg-ink-950/15' : 'bg-white/10'}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Şablon ara</span>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Sektör veya marka ara"
            className="min-h-12 w-full rounded-full border border-white/15 bg-ink-950/60 pl-11 pr-4 text-base text-fg placeholder:text-fg-muted/70 focus:border-lime"
          />
        </label>
      </div>

      <p className="mb-5 text-sm text-fg-muted" aria-live="polite">
        {list.length} şablon{cat !== 'Tümü' ? ` · ${cat}` : ''}
      </p>

      {list.length === 0 ? (
        <p className="rounded-card border border-white/10 p-8 text-center text-fg-muted">Bu aramaya uygun şablon yok. Başka bir sektör seçin.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <li key={t.slug} className="flex">
              <div className="flex w-full flex-col">
                <TemplateCard t={t} className="w-full" />
                <div className="px-1 pt-3">
                  <p className="text-[0.95rem] text-fg-muted">{t.summary}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg">
                    {t.features.map((f) => (
                      <li key={f} className="inline-flex items-center gap-1.5">
                        <Check aria-hidden className="h-3.5 w-3.5 text-lime" /> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">{PACKAGE_LABEL[t.minimumPackage]} ve üzeri paketlerde</p>
                  <UseTemplateLink
                    slug={t.slug}
                    from="template_page"
                    code={t.code}
                    minimumPackage={t.minimumPackage}
                    className="press group mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-lime/60 px-4 text-[0.95rem] font-semibold text-lime transition hover:bg-lime hover:text-ink-950"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
