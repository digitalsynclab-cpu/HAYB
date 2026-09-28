import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { templateThumb } from '@/data/template-paths';
import type { TemplateMeta } from '@/data/template-types';

/**
 * Şablon kartı: tam kadraj önizleme, altta koyu geçişle marka ve sektör, üstte kod etiketi.
 * Üzerine gelince önizleme yavaşça yakınlaşır, "Canlı dene" bilgisi yukarı kayar. Yalnızca hafif üst veriyi kullanır.
 */
export function TemplateCard({ t, dup, className = '' }: { t: TemplateMeta; dup?: boolean; className?: string }) {
  return (
    <Link
      href={`/template/${t.slug}`}
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      className={`group relative block overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-900 transition-colors duration-300 hover:border-white/30 ${className}`}
    >
      <div className="relative aspect-[900/620] overflow-hidden bg-ink-800">
        <Image
          src={templateThumb(t.slug)}
          alt={dup ? '' : `${t.code} ${t.brand} ${t.sector} web sitesi şablonu önizlemesi`}
          fill
          sizes="(min-width:1024px) 420px, 80vw"
          className="object-cover object-top transition duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">{t.code}</span>
        <span
          aria-hidden
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-lime text-ink-950 opacity-0 transition duration-300 group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="truncate text-lg font-bold leading-tight text-white">{t.brand}</p>
          <p className="mt-0.5 flex items-center justify-between gap-3 text-sm text-white/70">
            <span className="truncate">{t.sector}</span>
            <span className="shrink-0 font-semibold text-white/90 transition group-hover:text-lime">Canlı dene</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
