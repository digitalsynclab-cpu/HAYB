import Link from 'next/link';
import { legalLinks, moreLinks, nav, site } from '@/data/site';
import { services } from '@/data/services';
import { Logo } from '@/components/ui/Logo';

const linkCls = 'inline-flex min-h-10 items-center text-fg-muted transition-colors hover:text-lime';

export function Footer() {
  return (
    <footer className="tone-dark border-t border-white/10">
      <div className="mx-auto grid max-w-page grid-cols-2 gap-x-6 gap-y-9 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:px-8">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-fg-muted">
            {site.tagline}. Fikirleri gerçek dijital ürünlere dönüştürüyoruz.
          </p>
        </div>

        <nav aria-label="Site haritası">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-fg">Sayfalar</h2>
          <ul>
            {[...nav, ...moreLinks].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Hizmetler">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-fg">Hizmetler</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className={linkCls}>
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Yasal" className="col-span-2 lg:col-span-1">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-fg">Yasal</h2>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-col items-center gap-4 px-4 py-6 text-center text-sm text-fg-muted sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>
            © HAYB. {site.footerLine}
          </p>
          <p className="hidden tracking-[0.2em] sm:block">{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
