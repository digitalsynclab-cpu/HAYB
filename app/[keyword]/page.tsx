import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/Cards';
import { ContactButton } from '@/components/contact/ContactButton';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ORGANIZATION_ID } from '@/components/schema/OrganizationSchema';
import { keywordPageBySlug, keywordPages } from '@/data/keyword-pages';
import { projectById, type Project } from '@/data/projects';
import { campaign } from '@/data/campaign';
import { absoluteUrl, site } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

type Params = { keyword: string };

// Yalnızca keywordPages'teki adresler üretilir; diğer her kök adres 404 olur.
export const dynamicParams = false;

export function generateStaticParams() {
  return keywordPages.map((p) => ({ keyword: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { keyword } = await params;
  const p = keywordPageBySlug(keyword);
  if (!p) return {};
  return buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/${p.slug}` });
}

export default async function KeywordPage({ params }: { params: Promise<Params> }) {
  const { keyword } = await params;
  const p = keywordPageBySlug(keyword);
  if (!p) notFound();
  const projects = p.projectIds.map(projectById).filter((x): x is Project => Boolean(x));
  const url = absoluteUrl(`/${p.slug}`);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: p.heading,
          serviceType: p.serviceType,
          description: p.metaDescription,
          url,
          provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: site.name, url: site.url },
          areaServed: [
            { '@type': 'City', name: 'Bursa' },
            { '@type': 'Country', name: 'Türkiye' },
          ],
          ...(p.prices && {
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: p.prices.title,
              itemListElement: p.prices.rows.map((r) => ({
                '@type': 'Offer',
                name: r.name,
                price: r.price.replace(/[^\d]/g, ''),
                priceCurrency: 'TRY',
                priceValidUntil: campaign.endsAt.slice(0, 10),
                availability: 'https://schema.org/InStock',
                url,
              })),
            },
          }),
        }}
      />
      <FAQSchema items={p.faq.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: p.heading, path: `/${p.slug}` }]} />

      <PageHero
        heading={p.heading}
        title={p.title}
        accent={p.accent}
        text={p.intro}
        breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: p.heading }]}
        actions={
          <>
            <Button href={p.cta.href}>{p.cta.label}</Button>
            <ContactButton variant="secondary">WhatsApp’tan Sor</ContactButton>
          </>
        }
      />

      {p.prices && (
        <Section tone="light" labelledBy="fiyatlar">
          <SectionHeading id="fiyatlar" title={p.prices.title} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.prices.rows.map((r) => (
              <li key={r.name} className="surface-light flex h-full flex-col rounded-card p-6">
                <h3 className="text-lg font-bold">{r.name}</h3>
                <p className="mt-2 text-3xl font-extrabold tracking-tight">{r.price}</p>
                {r.note && <p className="mt-3 text-[0.95rem] text-on-light-muted">{r.note}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-on-light-muted">
            Fiyatlar %{campaign.rate} açılış kampanyası fiyatlarıdır.{' '}
            <Link href="/paketler" className="font-semibold underline underline-offset-4">
              Tüm paket ayrıntıları
            </Link>
          </p>
        </Section>
      )}

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-12">
          {p.sections.map((s) => (
            <article key={s.title}>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{s.title}</h2>
              <p className="mt-4 text-lg text-on-light-muted">{s.text}</p>
              {s.bullets && (
                <ul className="mt-5 space-y-3 text-lg">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-lime" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Section>

      {projects.length > 0 && (
        <Section tone="dark-2" labelledBy="ornek-projeler">
          <SectionHeading
            id="ornek-projeler"
            title="Yaptığımız"
            accent="projelerden örnekler."
            action={
              <Button href="/projeler" variant="secondary" arrow>
                Tüm projeler
              </Button>
            }
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((pr) => (
              <li key={pr.id}>
                <ProjectCard project={pr} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="light" labelledBy="sss">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="sss" className="!mb-0" title="Sık sorulan" accent="sorular." />
          <div className="divide-y divide-on-light/10 border-y border-on-light/10">
            {p.faq.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-left text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-on-light/20 text-lg leading-none transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-4 pr-10 text-on-light-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="ilgili">
        <h2 id="ilgili" className="text-xl font-bold">
          İlgili sayfalar
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[...p.related, ...keywordPages.filter((k) => k.slug !== p.slug && !p.related.some((r) => r.href === `/${k.slug}`)).slice(0, 4).map((k) => ({ label: k.heading, href: `/${k.slug}` }))].map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="surface-light group flex min-h-14 items-center justify-between gap-3 rounded-card px-5 py-3 font-semibold">
                {r.label}
                <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection title={`${p.heading} için`} accent="ücretsiz teklif alın." text="İhtiyacınızı kısaca anlatın; size en uygun paketi ve net fiyatı en kısa sürede iletelim." extra={p.cta} />
    </>
  );
}
