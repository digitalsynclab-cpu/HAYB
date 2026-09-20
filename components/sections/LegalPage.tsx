import type { ReactNode } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';

export interface LegalSection {
  title: string;
  body: ReactNode;
}

/** Yasal sayfa iskeleti. */
export function LegalPage({ eyebrow, title, intro, updated = '20 Eylül 2026', sections }: { eyebrow: string; title: string; intro: string; updated?: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={intro} />
      <Section tone="light" labelledBy="yasal-icerik">
        <h2 id="yasal-icerik" className="sr-only">
          {title} metni
        </h2>
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm font-semibold text-on-light-muted">Son güncelleme: {updated}</p>
          <div className="space-y-9">
            {sections.map((s) => (
              <section key={s.title}>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <div className="mt-3 space-y-3 text-on-light-muted">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
