import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TemplateSite } from '@/components/templates/TemplateSite';
import { TemplateSiteV2 } from '@/components/templates/v2/TemplateSiteV2';
import { isV2, templateBySlug, templates } from '@/data/templates';
import { buildMetadata } from '@/lib/metadata';

type Params = { slug: string };

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = templateBySlug(slug);
  if (!t) return {};
  // Demo siteleri kurgusal markalardır; arama motoru dizinine alınmaz. Galeri sayfası (/template) dizinlenir.
  return buildMetadata({ title: `${t.code} ${t.brand} örnek şablonu (${t.sector})`, description: t.summary, path: `/template/${t.slug}`, noindex: true });
}

export default async function TemplatePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = templateBySlug(slug);
  if (!t) notFound();
  return isV2(t) ? <TemplateSiteV2 t={t} /> : <TemplateSite t={t} />;
}
