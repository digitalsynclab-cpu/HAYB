import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconCard } from '@/components/ui/Cards';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { ServiceShowcase } from '@/components/sections/ServiceShowcase';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { ORGANIZATION_ID } from '@/components/schema/OrganizationSchema';
import { Icon3D } from '@/components/ui/Icon3D';
import { InsightCard } from '@/components/insights/InsightCard';
import { insightsForService } from '@/data/insights';
import Link from 'next/link';
import Image from 'next/image';
import { brandLogos } from '@/data/brands';
import { serviceBySlug, services } from '@/data/services';
import { absoluteUrl, site } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/hizmetler/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const relatedInsights = insightsForService(s.slug);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          description: s.metaDescription,
          url: absoluteUrl(`/hizmetler/${s.slug}`),
          provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: site.name, url: site.url },
          areaServed: 'TR',
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Hizmetler', path: '/hizmetler' },
          { name: s.title, path: `/hizmetler/${s.slug}` },
        ]}
      />
      {s.slug === 'hayb-data-service' && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: s.title,
            description: s.metaDescription,
            url: absoluteUrl(`/hizmetler/${s.slug}`),
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: site.name, url: site.url },
          }}
        />
      )}
      <PageHero
        visualFirst
        eyebrow={s.title}
        title={s.heroTitle}
        accent={s.heroAccent}
        text={s.heroText}
        breadcrumb={[{ label: 'Hizmetler', href: '/hizmetler' }, { label: s.title }]}
        actions={
          <>
            {s.slug === 'e-ticaret' ? (
              <>
                <Button href="/paketler#eticaret">Paketleri Gör · 39.990 ₺</Button>
                <Button href="/web-sitesi-siparis" variant="secondary">
                  Sipariş Formu
                </Button>
              </>
            ) : s.slug === 'hayb-data-service' ? (
              <>
                <Button href="/paketler#data-service">Fiyatı Gör · 9.999 ₺</Button>
                <Button href="/iletisim" variant="secondary">
                  Bize Sorun
                </Button>
              </>
            ) : s.slug === 'marka-tasarimi' ? (
              <>
                <Button href="/paketler#logo">Logo Sipariş Et · 499 ₺</Button>
                <Button href="/proje-baslat" variant="secondary">
                  Kimlik İçin Teklif Al
                </Button>
              </>
            ) : (
              <>
                <Button href="/proje-baslat">Teklif Al</Button>
                <Button href="/projeler" variant="secondary">
                  Örnekleri İncele
                </Button>
              </>
            )}
          </>
        }
        visual={
          s.slug === 'marka-tasarimi' ? (
            <ul className="mx-auto grid w-full max-w-[19rem] grid-cols-4 gap-2.5 sm:max-w-md sm:grid-cols-4 lg:ml-auto lg:max-w-lg">
              {brandLogos.map((b, i) => (
                <li key={b.name} className="brand-tile" style={{ animationDelay: `${i * 0.3}s` }}>
                  <Image src={b.src} alt={`${b.name} logosu (örnek)`} width={640} height={640} sizes="120px" priority={i < 4} className="h-auto w-full" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center lg:justify-end">
              <Icon3D name={s.icon} size={300} priority fluid className="h-28 w-28 sm:h-44 sm:w-44 lg:h-[19rem] lg:w-[19rem]" />
            </div>
          )
        }
      />

      {(s.showcase === 'dashboard' || s.showcase === 'mobile') && (
        <Section tone="dark-2" labelledBy="gosterim-once">
          <SectionHeading id="gosterim-once" eyebrow={s.showcase === 'dashboard' ? 'Örnek paneller' : 'Uygulamalarımız'} title={s.showcase === 'dashboard' ? 'Yönetim panellerini' : 'Uygulamaları'} accent={s.showcase === 'dashboard' ? 'önce görün.' : 'yakından inceleyin.'} />
          <Reveal>
            <ServiceShowcase kind={s.showcase} />
          </Reveal>
        </Section>
      )}

      <Section tone="light" labelledBy="fayda">
        <SectionHeading id="fayda" eyebrow="Ne kazanırsınız?" title={`${s.title} ile`} accent="neler değişir?" />
        <ul className={`grid gap-5 sm:grid-cols-2 ${s.benefits.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
          {s.benefits.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={(i % 3) * 60} className="h-full">
                <IconCard icon={b.icon} title={b.title} text={b.text} />
              </Reveal>
            </li>
          ))}
        </ul>
        {s.pricingNote && (
          <p className="mt-8 text-lg">
            {s.pricingNote}{' '}
            <Link href={s.slug === 'e-ticaret' ? '/paketler#eticaret' : '/paketler'} className="font-semibold underline underline-offset-4 hover:text-on-light-muted">
              Paketlere git
            </Link>
          </p>
        )}
      </Section>

      {s.slug === 'web-sitesi' && (
        <Section tone="dark" labelledBy="eticaret">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">E-Ticaret</p>
              <h2 id="eticaret" className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Ürünlerinizi online satmak mı istiyorsunuz?</h2>
              <p className="mt-2 text-fg-muted">iyzico veya PayTR ile ödeme alan, ürün, stok ve siparişi tek panelden yöneten e-ticaret sitesi kuruyoruz. Paketler 39.990 ₺’den başlar.</p>
            </div>
            <Button href="/hizmetler/e-ticaret" arrow>
              E-Ticaret Hizmetini İncele
            </Button>
          </div>
        </Section>
      )}

      {s.showcase !== 'dashboard' && s.showcase !== 'mobile' && (
        <Section tone="dark" labelledBy="gosterim">
          <SectionHeading id="gosterim" eyebrow="Nasıl görünür?" title="Ürünün" accent="kendisini görün." />
          <Reveal>
            <ServiceShowcase kind={s.showcase} />
          </Reveal>
        </Section>
      )}

      <Section tone="white" labelledBy="adimlar">
        <SectionHeading id="adimlar" eyebrow="Süreç" title={s.stepsTitle} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.steps.map((st, i) => (
            <li key={st.title}>
              <Reveal delay={(i % 3) * 60} className="surface-light h-full rounded-card p-5">
                <span className="inline-flex rounded-full bg-lime px-2.5 py-0.5 text-xs font-extrabold tracking-widest text-ink-950">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg font-bold">{st.title}</h3>
                <p className="mt-1.5 text-on-light-muted">{st.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {relatedInsights.length > 0 && (
        <Section tone="light" labelledBy="ilgili-yazilar">
          <SectionHeading id="ilgili-yazilar" eyebrow="Insights" title="Bu konuda" accent="okuyabileceğiniz yazılar." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.map((p) => (
              <li key={p.slug}>
                <InsightCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {s.slug === 'web-sitesi' ? (
        <CTASection
          tone="dark"
          title="Web sitenizi"
          accent="birlikte başlatalım."
          text="İşletmenizi tanıyalım, ihtiyaçlarınızı anlayalım ve size uygun web sitesini birlikte planlayalım."
          extra={{ href: '/web-sitesi-siparis', label: 'Web Sitesi Siparişini Başlat' }}
        />
      ) : (
        <CTASection tone="dark" />
      )}
    </>
  );
}
