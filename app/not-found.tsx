import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon3D } from '@/components/ui/Icon3D';
import type { IconName } from '@/data/icons';

export const metadata = { title: 'Sayfa bulunamadı', robots: { index: false, follow: false } };

const links: { href: string; title: string; text: string; icon: IconName }[] = [
  { href: '/', title: 'Ana Sayfa', text: 'Yolculuğa buradan başlayın.', icon: 'websitesi' },
  { href: '/hizmetler', title: 'Hizmetler', text: 'Size özel çözümlerimizi inceleyin.', icon: 'ozelyazilim' },
  { href: '/projeler', title: 'Projeler', text: 'Gerçek işler, gerçek ürünler.', icon: 'projeyonetimi' },
  { href: '/hakkimizda', title: 'Hakkımızda', text: 'Yaklaşımımızı keşfedin.', icon: 'musteriodakli' },
  { href: '/iletisim', title: 'İletişim', text: 'Bir fikriniz mi var? Konuşalım.', icon: 'iletisim' },
];

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404 | Sayfa bulunamadı"
        title="Bu sayfa"
        accent="başka bir yerde olabilir."
        text="Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir. Endişelenmeyin, sizi doğru yola yönlendirelim."
        actions={
          <>
            <Button href="/">Ana Sayfaya Dön</Button>
            <Button href="/projeler" variant="secondary" arrow={false}>
              Projeleri Gör
            </Button>
          </>
        }
        visual={
          <p aria-hidden className="select-none text-center text-[9rem] font-extrabold leading-none tracking-tighter text-lime/90 sm:text-[12rem]" style={{ textShadow: '0 0 60px rgb(var(--hayb-lime) / 0.25)' }}>
            404
          </p>
        }
      />
      <Section tone="dark-2" labelledBy="yonlendirme">
        <h2 id="yonlendirme" className="text-3xl font-extrabold tracking-tight">
          Nereye gitmek istersiniz?
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="glass group flex h-full flex-col gap-2 rounded-card p-5 transition hover:border-lime/50">
                <Icon3D name={l.icon} size={56} />
                <span className="text-lg font-bold">{l.title}</span>
                <span className="flex-1 text-sm text-fg-muted">{l.text}</span>
                <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
