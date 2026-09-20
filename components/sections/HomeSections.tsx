import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon3D } from '@/components/ui/Icon3D';
import { StoreButtons } from '@/components/ui/StoreButtons';
import { ServiceCard, ProjectImage } from '@/components/ui/Cards';
import { AppCovers, PanelSlider } from '@/components/ui/Sliders';
import { AiChatDemo } from '@/components/ui/AiChatDemo';
import { SocialTemplates } from '@/components/ui/SocialTemplates';
import { BrandLogos } from '@/components/ui/BrandLogos';
import { Reveal } from '@/components/motion/Reveal';
import { Price } from '@/components/ui/Price';
import { dataServicePlan } from '@/data/pricing';
import { TemplateMarquee } from '@/components/templates/TemplateShowcase';
import { services } from '@/data/services';
import { projectById, referenceSites } from '@/data/projects';
import { homeSteps } from '@/data/process';
import type { IconName } from '@/data/icons';

/** Ana sayfa hero: eyebrow yok, sağda markanın özel 3D logosu. */
export function HomeHero() {
  return (
    <PageHero
      id="ana-baslik"
      visualFirst
      title="Fikirleri"
      accent="Dijital Gerçeğe Dönüştürüyoruz."
      text="Web siteleri, mobil uygulamalar, oyunlar ve özel yazılımlarla işinizi dijitale taşıyoruz. Tasarımdan yayına kadar yanınızdayız."
      actions={
        <>
          <Button href="/proje-baslat">Projenizi Anlatın</Button>
          <Button href="/hizmetler" variant="secondary">
            Hizmetleri Keşfet
          </Button>
        </>
      }
      visual={
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/brand/hayb-3d.webp"
            alt="HAYB logosu"
            width={1000}
            height={1000}
            priority
            sizes="(min-width: 1024px) 460px, 50vw"
            className="hero-float h-auto w-[min(46vw,11.5rem)] sm:w-[min(50vw,16rem)] lg:w-[28rem]"
          />
        </div>
      }
    />
  );
}

export function HomeServices() {
  const main = services.filter((s) => ['web-sitesi', 'mobil-uygulama', 'mobil-oyun', 'ozel-yazilim', 'yonetim-paneli', 'yapay-zeka', 'sosyal-medya', 'marka-tasarimi', 'reklam-yonetimi'].includes(s.slug));
  return (
    <Section tone="light" labelledBy="neler-yapiyoruz">
      <SectionHeading
        id="neler-yapiyoruz"
        eyebrow="Neler yapıyoruz?"
        title="İhtiyacınız olan"
        accent="dijital çözümler."
        text="Markanızın dijital dünyadaki tüm ihtiyaçları için sade, etkili ve sürdürülebilir çözümler sunuyoruz."
        action={
          <Button href="/hizmetler" variant="secondary-light" arrow>
            Tüm Hizmetleri Gör
          </Button>
        }
      />
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {main.map((s, i) => (
          <li key={s.slug}>
            <Reveal delay={(i % 3) * 70} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Başlık ve bağlantı görselin ÜSTÜNDE; altında ürün ekranı. */
function ProductTile({
  icon,
  title,
  href,
  children,
  className = '',
}: {
  icon: IconName;
  title: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`flex min-w-0 flex-col ${className}`}>
      <div data-spot className="flex h-full min-w-0 flex-col rounded-card border border-white/10 bg-ink-800 p-4 sm:p-6">
        <Link href={href} className="group mb-4 flex items-center gap-3 rounded-xl sm:mb-5">
          <Icon3D name={icon} size={48} />
          <span className="text-lg font-bold sm:text-xl">{title}</span>
          <span
            aria-hidden
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition group-hover:border-lime group-hover:bg-lime group-hover:text-ink-950"
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Reveal>
  );
}

/** Gerçek ürün ekranları: web, panel, mobil, oyun, yapay zeka ve sosyal medya. */
export function HomeProducts() {
  const game = projectById('bbblock')!;
  return (
    <Section tone="dark" labelledBy="urun-ekranlari">
      <SectionHeading
        id="urun-ekranlari"
        eyebrow="Gerçek ürün ekranları"
        title="Yaptığımız işi"
        accent="ekranda görün."
        text="Web, panel, mobil, oyun, yapay zekâ, sosyal medya ve marka çalışmalarımızdan örnekler."
        action={
          <Button href="/projeler" variant="secondary" arrow>
            Tüm Projeleri Gör
          </Button>
        }
      />
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <ProductTile icon="websitesi" title="Web Sitesi: canlı deneyin" href="/hizmetler/web-sitesi" className="lg:col-span-2">
          <TemplateMarquee />
          <div className="mt-4">
            <Button href="/template" variant="secondary" arrow>
              Tüm şablonları gör
            </Button>
          </div>
        </ProductTile>

        <ProductTile icon="yonetimpaneli" title="Yönetim Paneli" href="/hizmetler/yonetim-paneli" className="lg:col-span-2">
          <PanelSlider />
        </ProductTile>

        <ProductTile icon="mobiluyumlu" title="Mobil Uygulama" href="/hizmetler/mobil-uygulama" className="lg:col-span-2">
          <AppCovers />
        </ProductTile>

        <ProductTile icon="basari" title="Mobil Oyun" href="/hizmetler/mobil-oyun" className="lg:col-span-2">
          <div className="grid items-center gap-5 md:grid-cols-[1.3fr_1fr] md:gap-8">
            <div className="group relative aspect-[3/2] overflow-hidden rounded-xl">
              <ProjectImage project={game} sizes="(min-width: 1024px) 640px, 92vw" className="absolute inset-0" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">{game.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-lime">Yayında</p>
              <p className="mt-2 text-fg-muted">{game.description}</p>
              <StoreButtons stores={game.stores!} className="mt-4" />
            </div>
          </div>
        </ProductTile>

        <ProductTile icon="yapayzeka" title="Yapay Zeka" href="/hizmetler/yapay-zeka" className="lg:col-span-2">
          <AiChatDemo />
        </ProductTile>

        <ProductTile icon="iletisim" title="Sosyal Medya" href="/hizmetler/sosyal-medya" className="lg:col-span-2">
          <SocialTemplates />
        </ProductTile>

        <ProductTile icon="hedefodakli" title="Marka ve Logo Tasarımı" href="/hizmetler/marka-tasarimi" className="lg:col-span-2">
          <BrandLogos />
        </ProductTile>
      </div>
    </Section>
  );
}

export function HomeProcess() {
  return (
    <Section tone="light" labelledBy="surec-ozet">
      <SectionHeading
        id="surec-ozet"
        eyebrow="Nasıl çalışıyoruz?"
        title="Beş adımda"
        accent="fikirden yayına."
        text="Süreç baştan sona şeffaf. Ne zaman ne olacağını her adımda bilirsiniz."
        action={
          <Button href="/surec" variant="secondary-light" arrow>
            Sürecin Tamamı
          </Button>
        }
      />
      <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        {homeSteps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 70} className="surface-light flex h-full gap-4 rounded-card p-4 sm:block sm:p-5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-extrabold text-ink-950 sm:h-auto sm:w-auto sm:rounded-full sm:px-2.5 sm:py-0.5">{s.n}</span>
              <div>
              <h3 className="text-lg font-bold sm:mt-3 xl:text-xl">{s.title}</h3>
              <p className="mt-1 text-on-light-muted sm:mt-2">{s.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const trust = [
  { icon: 'iletisim', title: 'Şeffaf süreç', text: 'Her adımda ne yapıldığını ve sıradaki adımı bilirsiniz.' },
  { icon: 'projeyonetimi', title: 'Uçtan uca destek', text: 'Fikirden tasarıma, geliştirmeden yayına tek ekiple ilerlersiniz.' },
  { icon: 'websitesi', title: 'Gerçek ürün deneyimi', text: 'Sunumda değil, gerçekten çalışan ve yayında olan ürünlerde deneyimliyiz.' },
  { icon: 'surekligelisim', title: 'Uzun vadeli iş birliği', text: 'Yayından sonra da güncelleme ve destekle yanınızdayız.' },
] as const;

export function HomeDataService() {
  return (
    <Section tone="dark" labelledBy="data-service">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div>
          <p className="mb-4 flex items-center gap-2.5 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-muted">
            <span aria-hidden className="h-2 w-2 rounded-full bg-lime" /> Yeni ürün
          </p>
          <h2 id="data-service" className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            HAYB <span className="accent-text">Data Service</span>
          </h2>
          <p className="mt-4 text-xl font-semibold leading-snug">Sektörünü seç. İşletmeleri keşfet. Verilerini dışa aktar.</p>
          <p className="mt-3 max-w-lg text-fg-muted">Dijital pazarlama, satış ve iş geliştirme süreçleriniz için işletme verilerini daha hızlı keşfedin. Saatlerce işletme aramak yerine sonuçları tek tabloda görün, Excel olarak indirin.</p>
          <Price price={dataServicePlan.price} tone="dark" className="mt-6" />
          <p className="mt-1 text-sm text-fg-muted">Tek seferlik satın alım ücreti</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/hizmetler/hayb-data-service" arrow>
              Ürünü İncele
            </Button>
            <Button href="/fiyatlandirma#data-service" variant="secondary">
              Fiyatı ve Paketi Gör
            </Button>
          </div>
        </div>
        <Reveal blur>
          <div className="overflow-hidden rounded-card border border-white/10 bg-ink-800 shadow-glass">
            <Image src="/images/products/hayb-data-service.webp" alt="HAYB Data Service arayüzü: sektör arama, sonuç tablosu ve Excel olarak indirme" width={1200} height={1096} sizes="(min-width: 1024px) 620px, 92vw" className="h-auto w-full" />
          </div>
          <p className="mt-3 text-sm text-fg-muted">Örnek arayüz; gösterilen firmalar ve sayılar demo veridir.</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function HomeTrust() {
  return (
    <Section tone="dark-2" labelledBy="guven">
      <SectionHeading id="guven" eyebrow="Neden HAYB?" title="Sadece proje değil," accent="uzun vadeli iş birliği." />
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {trust.map((t, i) => (
          <li key={t.title}>
            <Reveal delay={i * 70} className="h-full">
              <div data-spot className="glass flex h-full items-center gap-4 rounded-card p-5 sm:block sm:p-6">
                <Icon3D name={t.icon} size={72} fluid className="h-14 w-14 shrink-0 sm:-ml-1 sm:h-[var(--sz)] sm:w-[var(--sz)]" />
                <div>
                <h3 className="text-lg font-bold sm:mt-4">{t.title}</h3>
                <p className="mt-1 text-fg-muted sm:mt-1.5">{t.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Referans siteler: yalnızca alan adı ve bağlantı. */
export function ReferenceSites({ tone = 'dark' }: { tone?: 'dark' | 'dark-2' | 'light' }) {
  return (
    <Section tone={tone} labelledBy="referanslar">
      <SectionHeading
        id="referanslar"
        eyebrow="Referanslar"
        title="Yayında olan"
        accent="referans sitelerimiz."
        text="Tasarlayıp geliştirdiğimiz web sitelerinden bazıları."
      />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {referenceSites.map((r, i) => (
          <li key={r.domain}>
            <Reveal delay={(i % 3) * 60} className="h-full">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                data-spot
                className="press group flex min-h-[4.5rem] items-center justify-between gap-4 rounded-card border border-lime/25 bg-ink-900 px-5 py-4 text-lime transition hover:border-lime hover:bg-ink-800"
              >
                <span className="min-w-0">
                  <span className="block truncate text-lg font-bold text-lime">{r.domain}</span>
                  <span className="text-sm text-white/70">Siteyi ziyaret et</span>
                </span>
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime/50 text-lime transition group-hover:border-lime group-hover:bg-lime group-hover:text-ink-950"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
