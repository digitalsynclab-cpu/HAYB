import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { InsightCard } from '@/components/insights/InsightCard';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { CollectionPageSchema } from '@/components/schema/CollectionPageSchema';
import { insightCategories, insights } from '@/data/insights';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Insights: Web, Yazılım ve Tasarım Üzerine Notlar',
  description:
    'HAYB’ın bilgi ve tasarım günlüğü: UI/UX, web, yazılım ve ürün geliştirme üzerine uygulanabilir, gerçek karar ve ayrıntılara odaklanan yazılar.',
  path: '/insights',
});

export default function InsightsPage() {
  const posts = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Insights', path: '/insights' },
        ]}
      />
      <CollectionPageSchema
        name="HAYB Insights"
        description="UI/UX, web, yazılım ve ürün geliştirme üzerine HAYB yazıları."
        path="/insights"
        items={posts.map((p) => ({ name: p.title, path: `/insights/${p.slug}` }))}
      />
      <PageHero
        eyebrow="Insights"
        title="Bilgi ve tasarım"
        accent="günlüğümüz."
        text="Genel bir blog değil: web, yazılım, ürün ve tasarım kararlarına odaklanan, uygulanabilir yazılar."
      />
      <Section tone="light" labelledBy="yazilar">
        <h2 id="yazilar" className="sr-only">
          Yazılar
        </h2>
        <ul aria-label="Kategoriler" className="mb-8 flex flex-wrap gap-2">
          {insightCategories().map((c) => (
            <li key={c} className="rounded-full border border-on-light/20 bg-white px-4 py-1.5 text-sm font-semibold">
              {c}
            </li>
          ))}
        </ul>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <InsightCard post={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
      <CTASection tone="dark" />
    </>
  );
}
