'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Globe, LayoutGrid, Smartphone, Terminal } from 'lucide-react';
import { ProjectCard } from '@/components/ui/Cards';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { Price } from '@/components/ui/Price';
import { projects, referenceSites } from '@/data/projects';
import { webPackages } from '@/data/pricing';
import type { TemplateMeta } from '@/data/template-types';

type Tab = 'tumu' | 'web' | 'mobil' | 'yazilim';

const TABS: { id: Tab; label: string; icon: typeof Globe; hint: string }[] = [
  { id: 'tumu', label: 'Tümü', icon: LayoutGrid, hint: 'Bütün projeler' },
  { id: 'web', label: 'Web', icon: Globe, hint: 'Siteler, şablonlar, paketler' },
  { id: 'mobil', label: 'Mobil', icon: Smartphone, hint: 'Uygulamalar ve oyun' },
  { id: 'yazilim', label: 'Yazılım ve panel', icon: Terminal, hint: 'Özel yazılım, dashboard' },
];

const inFilter = (filters: readonly string[], list: string[]) => list.some((f) => filters.includes(f));
const isTab = (v: string): v is Tab => TABS.some((t) => t.id === v);

const PACKAGE_NOTE: Record<string, string> = {
  starter: 'Tek sayfalık, hızlı başlangıç',
  business: 'Hazır tasarım seçilebilir',
  professional: 'Daha fazla sayfa ve özellik',
  premium: 'Kapsamlı, tam donanımlı site',
};

function Head({ title, text, href, cta }: { title: string; text?: string; href?: string; cta?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
        {text && <p className="mt-1.5 max-w-xl text-fg-muted">{text}</p>}
      </div>
      {href && cta && (
        <Link href={href} className="press inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-semibold text-lime hover:underline">
          {cta} <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Sade proje merkezi: önce ne aradığınızı seçin, yalnızca ilgili içerik açılır. */
export function ProjectsHub({ templates }: { templates: TemplateMeta[] }) {
  const [tab, setTab] = useState<Tab>('tumu');

  useEffect(() => {
    const h = window.location.hash.replace('#', '');
    if (isTab(h)) setTab(h);
  }, []);

  const choose = useCallback((t: Tab) => {
    setTab(t);
    try {
      window.history.replaceState(null, '', t === 'tumu' ? window.location.pathname : `#${t}`);
    } catch {
      /* adres güncellenemezse zararsız */
    }
  }, []);

  const groups = useMemo(
    () => ({
      tumu: projects,
      web: projects.filter((p) => inFilter(p.filters, ['Web'])),
      mobil: projects.filter((p) => inFilter(p.filters, ['Mobil'])),
      yazilim: projects.filter((p) => inFilter(p.filters, ['Yazılım', 'Dashboard'])),
    }),
    [],
  );
  const counts: Record<Tab, number> = { tumu: projects.length, web: groups.web.length + templates.length, mobil: groups.mobil.length, yazilim: groups.yazilim.length };
  const list = groups[tab];

  return (
    <div>
      {/* Tek satırlık, büyük dokunma alanlı seçici */}
      <div role="tablist" aria-label="Ne arıyorsunuz?" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const on = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="proje-icerik"
              id={`tab-${t.id}`}
              onClick={() => choose(t.id)}
              className={`press flex min-h-14 shrink-0 items-center gap-3 rounded-2xl border px-4 text-left transition sm:px-5 ${on ? 'border-lime bg-lime text-ink-950' : 'border-white/15 bg-ink-900 text-fg hover:border-lime/60'}`}
            >
              <Icon aria-hidden className="h-5 w-5 shrink-0" />
              <span>
                <span className="block text-[0.95rem] font-bold leading-tight">
                  {t.label} <span className={`ml-1 text-xs font-bold ${on ? 'opacity-70' : 'text-fg-muted'}`}>{counts[t.id]}</span>
                </span>
                <span className={`hidden text-xs sm:block ${on ? 'opacity-75' : 'text-fg-muted'}`}>{t.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="proje-icerik" role="tabpanel" aria-labelledby={`tab-${tab}`} key={tab} className="space-y-14 [animation:hub-in_0.35s_ease-out]">
        {tab === 'web' && (
          <>
            <section aria-label="Web siteleri">
              <Head title="Yayındaki web siteleri" text="Tasarlayıp yayına aldığımız siteler." />
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groups.web.map((p, i) => (
                  <li key={p.id}>
                    <ProjectCard project={p} priority={i === 0} />
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Diğer referans siteler">
                {referenceSites.map((r) => (
                  <li key={r.domain}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 px-4 text-sm font-semibold text-fg-muted hover:border-lime hover:text-lime">
                      {r.domain} <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Örnek şablonlar">
              <Head title="Örnek şablonlar" text={`${templates.length} sektör için canlı deneyebileceğiniz hazır tasarım.`} href="/template" cta="Tüm şablonlar" />
              <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] sm:mx-0 sm:px-0">
                {templates.slice().reverse().slice(0, 8).map((t) => (
                  <div key={t.slug} className="w-[17rem] shrink-0 snap-start sm:w-[20rem]">
                    <TemplateCard t={t} />
                  </div>
                ))}
                <Link href="/template" className="press flex w-[12rem] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-2xl border border-lime/40 p-5 text-center font-bold text-lime hover:bg-lime/10">
                  Tümünü gör <ArrowRight aria-hidden className="h-5 w-5" />
                </Link>
              </div>
            </section>

            <section aria-label="Web sitesi paketleri">
              <Head title="Web sitesi paketleri" text="İhtiyacınıza uygun paketi seçin; kapsamı ve karşılaştırmayı Paketler sayfasında görün." href="/paketler#web" cta="Paketleri karşılaştır" />
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {webPackages.map((p) => (
                  <li key={p.id} className={`flex flex-col rounded-card border p-5 ${p.recommended ? 'border-lime bg-lime/[0.06]' : 'border-white/12 bg-ink-900'}`}>
                    <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-lime">{p.name}</p>
                    <Price price={p.price} tone="dark" size="md" className="mt-3 text-fg" />
                    <p className="mt-3 flex-1 text-sm text-fg-muted">{PACKAGE_NOTE[p.id]}</p>
                    <Link href="/paketler#web" className="press mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-semibold text-lime hover:underline">
                      İncele <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {tab !== 'web' && (
          <section aria-label="Projeler">
            <p className="sr-only" role="status" aria-live="polite">{list.length} proje gösteriliyor</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <li key={p.id}>
                  <ProjectCard project={p} priority={i === 0} />
                </li>
              ))}
            </ul>
            {tab === 'tumu' && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link href="#web" onClick={() => choose('web')} className="press flex min-h-16 items-center justify-between gap-4 rounded-card border border-white/12 bg-ink-900 px-5 py-4 hover:border-lime/60">
                  <span>
                    <span className="block font-bold">Web sitesi mi arıyorsunuz?</span>
                    <span className="text-sm text-fg-muted">Siteleri, örnek şablonları ve paketleri görün.</span>
                  </span>
                  <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-lime" />
                </Link>
                <Link href="/proje-baslat" className="press flex min-h-16 items-center justify-between gap-4 rounded-card border border-lime/40 bg-lime/[0.06] px-5 py-4 hover:border-lime">
                  <span>
                    <span className="block font-bold">Kendi projenizi anlatın</span>
                    <span className="text-sm text-fg-muted">Ne yapmak istediğinizi birkaç adımda iletin.</span>
                  </span>
                  <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-lime" />
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
