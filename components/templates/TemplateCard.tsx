import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { templateThumb } from '@/data/template-paths';
import type { TemplateMeta } from '@/data/template-types';

/** Tarayıcı çerçeveli şablon kartı: canlı demoya bağlanır. Yalnızca hafif üst veriyi kullanır. */
export function TemplateCard({ t, dup, className = '' }: { t: TemplateMeta; dup?: boolean; className?: string }) {
  return (
    <Link
      href={`/template/${t.slug}`}
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      className={`group block overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-glass transition hover:-translate-y-1 hover:border-lime/60 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-900 px-3 py-2" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 truncate rounded-full bg-white/10 px-3 py-0.5 text-[0.65rem] text-white/60">hayb.com.tr/template/{t.slug}</span>
      </div>
      <div className="relative aspect-[900/560] overflow-hidden bg-ink-900">
        <Image src={templateThumb(t.slug)} alt={dup ? '' : `${t.code} ${t.brand} ${t.sector} web sitesi şablonu önizlemesi`} fill sizes="(min-width:1024px) 420px, 80vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <p className="text-[0.7rem] font-extrabold uppercase leading-none tracking-[0.14em] text-lime">{t.code}</p>
          <p className="mt-1 truncate text-base font-bold text-white">{t.brand}</p>
          <p className="truncate text-sm text-white/65">{t.sector}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-lime px-3.5 py-2 text-sm font-extrabold text-ink-950">
          Canlı dene <ArrowUpRight aria-hidden className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
