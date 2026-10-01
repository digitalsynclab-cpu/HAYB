import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ApplicationForm } from './ApplicationForm';

export const metadata: Metadata = buildMetadata({
  title: 'HAYB Partner Başvurusu',
  description: 'HAYB Partner ağına katılmak için başvuru formunu doldurun.',
  path: '/partner/basvuru',
  noindex: true,
});

export default function PartnerApplicationPage() {
  return (
    <>
      <PageHero eyebrow="HAYB Partner" title="Başvuru" accent="Formu" text="Birkaç dakikanızı ayırın, başvurunuzu inceleyip size dönüş yapalım." />
      <Section>
        <div className="mx-auto max-w-2xl">
          <ApplicationForm />
        </div>
      </Section>
    </>
  );
}
