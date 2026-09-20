'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProjectImage } from '@/components/ui/Cards';
import { projects, projectFilters } from '@/data/projects';

type Filter = (typeof projectFilters)[number];

/** Filtrelenebilir, büyük "showcase" satırları. İlk satır LCP olabileceği için priority alır. */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>('Tümü');
  const list = filter === 'Tümü' ? projects : projects.filter((p) => (p.filters as string[]).includes(filter));

  return (
    <div>
      <div role="group" aria-label="Proje türü filtresi" className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((f) => {
          const count = f === 'Tümü' ? projects.length : projects.filter((p) => (p.filters as string[]).includes(f)).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-11 rounded-full border px-5 text-[0.9375rem] font-semibold transition ${
                filter === f ? 'border-lime bg-lime text-ink-950' : 'border-white/20 text-fg hover:border-lime/60'
              }`}
            >
              {f} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {list.length} proje gösteriliyor
      </p>

      <ol className="space-y-8">
        {list.map((p, i) => (
          <li key={p.id}>
            <article className="group relative grid items-center gap-6 rounded-card border border-white/10 bg-ink-800 p-4 transition hover:border-lime/40 sm:p-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:p-8">
              <div className="order-2 lg:order-1">
                <span aria-hidden className="text-6xl font-extrabold leading-none text-white/10 lg:text-7xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-lime">{p.type}</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                  <Link href={`/projeler/${p.id}`} className="after:absolute after:inset-0 after:rounded-card">
                    {p.name}
                  </Link>
                </h2>
                <p className="mt-3 max-w-md text-fg-muted">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Kapsam">
                  {p.scope.map((s) => (
                    <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-sm text-fg-muted">
                      {s}
                    </li>
                  ))}
                </ul>
                <span aria-hidden className="mt-6 inline-flex items-center gap-2 font-semibold group-hover:text-lime">
                  Proje Detayını İncele <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="order-1 overflow-hidden rounded-2xl border border-white/10 lg:order-2">
                <ProjectImage project={p} priority={i === 0 && filter === 'Tümü'} sizes="(min-width: 1024px) 620px, 92vw" className="aspect-[16/11]" />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
