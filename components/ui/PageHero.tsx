import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { SplitHeading } from '@/components/motion/SplitText';

interface PageHeroProps {
  /** İsteğe bağlı: ana sayfada gösterilmez */
  eyebrow?: string;
  title: string;
  accent?: string;
  text?: ReactNode;
  actions?: ReactNode;
  /** Sağ tarafta gösterilecek görsel / mockup */
  visual?: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  id?: string;
  /** Mobilde görsel başlığın üstünde gösterilir (ilk ekranda marka/ürün görünür) */
  visualFirst?: boolean;
}

/** Tüm iç sayfaların koyu hero bölümü. Bir sonraki bölüm üzerine eğriyle biner. */
export function PageHero({ eyebrow, title, accent, text, actions, visual, breadcrumb, id = 'sayfa-baslik', visualFirst = false }: PageHeroProps) {
  return (
    <section aria-labelledby={id} className="tone-dark relative overflow-hidden pb-[calc(var(--hayb-curve)+2.5rem)] pt-[calc(var(--hayb-header-h)+2rem)] sm:pt-[calc(var(--hayb-header-h)+3rem)] lg:pt-[calc(var(--hayb-header-h)+4.5rem)]">
      {/* Hero ışığı: statik, animasyonsuz */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[36rem] w-[36rem] rounded-full opacity-60"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--hayb-lime) / 0.14), transparent)' }}
      />
      <div className={`relative mx-auto grid max-w-page items-center gap-10 px-4 sm:px-6 lg:gap-12 lg:px-8 ${visual ? 'lg:grid-cols-[1.05fr_1fr]' : ''}`}>
        <div className="max-w-2xl">
          {breadcrumb && (
            <nav aria-label="Konum" className="rise mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
                {breadcrumb.map((b, i) => (
                  <li key={b.label} className="flex items-center gap-1.5">
                    {b.href ? (
                      <Link href={b.href} className="inline-flex min-h-8 items-center hover:text-lime">
                        {b.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-fg">
                        {b.label}
                      </span>
                    )}
                    {i < breadcrumb.length - 1 && <ChevronRight aria-hidden className="h-4 w-4" />}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <div className="rise">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <SplitHeading
            as="h1"
            id={id}
            title={title}
            accent={accent}
            className="text-balance text-[2.35rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl"
          />
          {text && <p className="rise rise-3 mt-6 max-w-xl text-[1.0625rem] text-fg-muted sm:text-xl">{text}</p>}
          {actions && <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">{actions}</div>}
        </div>
        {visual && <div className={`rise rise-3 relative min-w-0 ${visualFirst ? 'order-first lg:order-none' : ''}`}>{visual}</div>}
      </div>
    </section>
  );
}
