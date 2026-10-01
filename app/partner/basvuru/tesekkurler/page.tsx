import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Başvurunuz Alındı',
  description: 'HAYB Partner başvurunuz alındı.',
  path: '/partner/basvuru/tesekkurler',
  noindex: true,
});

export default function ApplicationThanksPage() {
  return (
    <Section curve={false}>
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="text-3xl font-bold">Başvurunuz alındı</h1>
        <p className="mt-4 text-fg-muted">
          HAYB Partner başvurunuz tarafımıza ulaştı. İnceleme sonucunu e-posta adresinize ileteceğiz.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Ana Sayfaya Dön</Button>
        </div>
      </div>
    </Section>
  );
}
