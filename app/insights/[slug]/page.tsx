import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { ArticleBody, Inline } from '@/components/insights/RichText';
import { InsightCard, formatDate } from '@/components/insights/InsightCard';
import { ArticleSchema } from '@/components/schema/ArticleSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { insightBySlug, insights, readingMinutes } from '@/data/insights';
import { projectById } from '@/data/projects';
import { serviceBySlug } from '@/data/services';
import { templateBySlug } from '@/data/templates';
import { buildMetadata } from '@/lib/metadata';

type Params = { slug: string };

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = insightBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/insights/${p.slug}`,
    article: { publishedTime: p.date, ...(p.updated && { modifiedTime: p.updated }), section: p.category },
  });
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = insightBySlug(slug);
  if (!post) notFound();

  const services = post.related.services.map((s) => serviceBySlug(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const projectsRel = post.related.projects.map((p) => projectById(p)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const tpls = post.related.templates.map((t) => templateBySlug(t)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const others = insights.filter((i) => i.slug !== post.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: post.title, path: `/insights/${post.slug}` },
        ]}
      />
      <ArticleSchema title={post.title} description={post.description} path={`/insights/${post.slug}`} datePublished={post.date} dateModified={post.updated} category={post.category} />

      <header className="tone-dark relative overflow-hidden pb-[calc(var(--hayb-curve)+1.5rem)] pt-[calc(var(--hayb-header-h)+1.5rem)] sm:pt-[calc(var(--hayb-header-h)+2.5rem)]">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Konum" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
              <li className="flex items-center gap-1.5">
                <Link href="/insights" className="inline-flex min-h-8 items-center hover:text-lime">Insights</Link>
                <ChevronRight aria-hidden className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-fg">{post.category}</li>
            </ol>
          </nav>
          <h1 id="makale-baslik" className="text-balance text-[1.8rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-fg-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} dk okuma · HAYB
          </p>
        </div>
      </header>

      <Section tone="light" labelledBy="makale-baslik">
        <article aria-labelledby="makale-baslik" className="mx-auto max-w-3xl">
          <p className="text-balance text-xl font-semibold leading-snug sm:text-2xl">
            <Inline text={post.intro} />
          </p>
          <div className="mt-8">
            <ArticleBody blocks={post.blocks} />
          </div>

          {(services.length > 0 || projectsRel.length > 0 || tpls.length > 0) && (
            <aside aria-label="İlgili bağlantılar" className="mt-12 rounded-2xl border border-on-light/15 bg-white p-5 sm:p-6">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em]">Bu yazıyla ilgili</p>
              <ul className="mt-3 space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/hizmetler/${s.slug}`} className="inline-flex min-h-9 items-center gap-2 font-semibold underline decoration-lime underline-offset-4 hover:text-on-light-muted">
                      Hizmet: {s.title} <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
                {projectsRel.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projeler/${p.id}`} className="inline-flex min-h-9 items-center gap-2 font-semibold underline decoration-lime underline-offset-4 hover:text-on-light-muted">
                      Proje: {p.name} <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
                {tpls.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/template/${t.slug}`} className="inline-flex min-h-9 items-center gap-2 font-semibold underline decoration-lime underline-offset-4 hover:text-on-light-muted">
                      Şablon: {t.code} · {t.brand} ({t.sector}) <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Button href={post.related.cta.href}>{post.related.cta.label}</Button>
              </div>
            </aside>
          )}
        </article>
      </Section>

      {others.length > 0 && (
        <Section tone="white" labelledBy="diger-yazilar">
          <h2 id="diger-yazilar" className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Diğer yazılar
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <InsightCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection tone="dark" />
    </>
  );
}
