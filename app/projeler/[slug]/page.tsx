import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard, ProjectImage } from '@/components/ui/Cards';
import { Button } from '@/components/ui/Button';
import { StoreButtons } from '@/components/ui/StoreButtons';
import { ScreenGallery } from '@/components/ui/ScreenGallery';
import { CTASection } from '@/components/sections/CTASection';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { projectById, projects } from '@/data/projects';
import { serviceBySlug } from '@/data/services';
import { buildMetadata } from '@/lib/metadata';

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectById(slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.name}: ${p.type}`, description: p.description, path: `/projeler/${p.id}` });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectById(slug);
  if (!p) notFound();
  const services = p.serviceSlugs.map((s) => serviceBySlug(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const others = projects.filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Projeler', path: '/projeler' },
          { name: p.name, path: `/projeler/${p.id}` },
        ]}
      />
      <PageHero
        eyebrow={p.type}
        title={p.name}
        text={p.description}
        breadcrumb={[{ label: 'Projeler', href: '/projeler' }, { label: p.name }]}
        actions={
          <>
            {p.liveUrl && (
              <Button href={p.liveUrl} external>
                Canlı Siteyi Aç
              </Button>
            )}
            {p.stores && <StoreButtons stores={p.stores} />}
            <Button href="/proje-baslat" variant={p.liveUrl || p.stores ? 'secondary' : 'primary'}>
              Benzer Bir Proje İstiyorum
            </Button>
          </>
        }
        visual={
          <div className="group overflow-hidden rounded-card border border-white/15 bg-ink-800 shadow-glass">
            <ProjectImage project={p} priority sizes="(min-width: 1024px) 560px, 92vw" className="aspect-[4/3]" />
          </div>
        }
      />

      {p.gallery && (
        <Section tone="dark-2" labelledBy="ekranlar">
          <SectionHeading id="ekranlar" eyebrow="Uygulama ekranları" title={`${p.name}`} accent="ekran ekran inceleyin." />
          <ScreenGallery name={p.name} images={p.gallery} />
        </Section>
      )}

      <Section tone="light" labelledBy="kapsam">
        <SectionHeading id="kapsam" eyebrow="Proje özeti" title="Bu projede" accent="ne yaptık?" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold">Kapsam</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.scope.map((s) => (
                <li key={s} className="rounded-full border border-on-light/20 bg-white px-4 py-1.5 text-[0.9375rem] font-medium">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-lg text-on-light-muted">{p.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">İlgili hizmetler</h3>
            <ul className="mt-3 divide-y divide-on-light/10 rounded-card border border-on-light/10 bg-white">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className="flex min-h-14 items-center justify-between px-5 font-semibold hover:bg-paper-100">
                    {s.title}
                    <ArrowUpRight aria-hidden className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="diger-projeler">
        <SectionHeading id="diger-projeler" eyebrow="Diğer projeler" title="Diğer" accent="çalışmalarımız." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.id}>
              <ProjectCard project={o} />
            </li>
          ))}
        </ul>
      </Section>

      <CTASection tone="dark-2" />
    </>
  );
}
