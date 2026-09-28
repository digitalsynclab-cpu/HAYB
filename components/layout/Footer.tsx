import Image from 'next/image';
import Link from 'next/link';
import { legalLinks, site } from '@/data/site';
import { Logo } from '@/components/ui/Logo';

const linkCls = 'inline-flex min-h-10 items-center text-fg-muted transition-colors hover:text-lime';

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Hizmetler',
    links: [
      { label: 'Web Sitesi', href: '/hizmetler/web-sitesi' },
      { label: 'E-Ticaret', href: '/hizmetler/e-ticaret' },
      { label: 'Mobil Uygulama', href: '/hizmetler/mobil-uygulama' },
      { label: 'Özel Yazılım', href: '/hizmetler/ozel-yazilim' },
      { label: 'Marka ve Pazarlama', href: '/hizmetler/marka-tasarimi' },
      { label: 'Tüm hizmetler', href: '/hizmetler' },
    ],
  },
  {
    title: 'Keşfedin',
    links: [
      { label: 'Projeler', href: '/projeler' },
      { label: 'Şablonlar', href: '/template' },
      { label: 'Paketler', href: '/paketler' },
      { label: 'Web Sitesi Siparişi', href: '/web-sitesi-siparis' },
      { label: 'Insights', href: '/insights' },
      { label: 'Bursa Web Tasarım', href: '/bursa-web-tasarim' },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Süreç', href: '/surec' },
      { label: 'İletişim', href: '/iletisim' },
      ...legalLinks.map((l) => ({ label: l.label, href: l.href })),
    ],
  },
];

export function Footer() {
  return (
    <footer className="tone-dark relative isolate overflow-hidden border-t border-white/10">
      {/* Arka plan görseli: değiştirilmeden, düşük opaklıkta; içerik okunurluğu için koyu katman */}
      <Image src="/brand/footer-bg.webp" alt="" fill sizes="100vw" aria-hidden className="pointer-events-none -z-20 select-none object-cover object-center opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950/85" />
      <div className="mx-auto grid max-w-page grid-cols-2 gap-x-6 gap-y-9 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:px-8">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-fg-muted">
            {site.tagline}. Fikirleri gerçek dijital ürünlere dönüştürüyoruz.
          </p>
        </div>

        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title} className={c.title === 'Şirket' ? 'col-span-2 lg:col-span-1' : ''}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-fg">{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-col items-center gap-4 px-4 py-6 text-center text-sm text-fg-muted sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>
            © 2026 HAYB. Tüm Hakları Saklıdır.
          </p>
          <p className="hidden tracking-[0.2em] sm:block">{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
