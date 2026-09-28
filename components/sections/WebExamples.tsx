import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { templates } from '@/data/templates';
import { referenceSites } from '@/data/projects';

const SLUGS = ['web1', 'web9', 'web11', 'web12', 'web13', 'web19'];

/** Web Sitesi hizmet sayfası: canlı denenebilir örnek siteler ve yayındaki referanslarımız. */
export function WebExamples() {
  const list = SLUGS.map((s) => templates.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const meta = list.map(({ slug, code, minimumPackage, brand, sector, category, summary, features }) => ({ slug, code, minimumPackage, brand, sector, category, summary, features }));
  return (
    <Section tone="dark" labelledBy="ornek-siteler">
      <SectionHeading
        id="ornek-siteler"
        title="Diğer"
        accent="örnek siteler."
        text="Şablonlarımızı canlı deneyin; menüsünü, sepetini ve formlarını kendi telefonunuzda kullanın."
        action={
          <Button href="/template" variant="secondary" arrow>
            Tüm şablonlar
          </Button>
        }
      />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {meta.map((t, i) => (
          <li key={t.slug} className="w-[17rem] shrink-0 snap-start sm:w-auto">
            <Reveal delay={(i % 3) * 70}>
              <TemplateCard t={t} />
            </Reveal>
          </li>
        ))}
      </ul>

      <h3 className="mt-14 text-xl font-bold sm:text-2xl">Yayındaki referans sitelerimiz</h3>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {referenceSites.map((r) => (
          <li key={r.domain}>
            <Link
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 font-semibold transition hover:border-lime/60 hover:bg-white/[0.06]"
            >
              {r.domain}
              <ArrowUpRight aria-hidden className="h-4 w-4 text-fg-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
