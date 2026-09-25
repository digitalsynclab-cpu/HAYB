import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ProjectsHub } from '@/components/sections/ProjectsHub';
import { templates } from '@/data/templates';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/Button';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Projeler',
  description:
    'HAYB projeleri: BB Block mobil oyunu, BebeklerSoruyor, EkoTakip Pro, Taleb-e, QR Menü Sistemi ve kurumsal web siteleri. Yayındaki dijital ürünlerimiz.',
  path: '/projeler',
});

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Projeler', path: '/projeler' }]} />
      <PageHero
        eyebrow="Projelerimiz"
        title="Gerçek işletmeler için"
        accent="geliştirdiğimiz ürünler."
        text="Ne aradığınızı seçin; size yalnızca ilgili projeleri, şablonları ve paketleri gösterelim."
        actions={<Button href="/proje-baslat">Sizin Projeniz Sırada</Button>}
      />
      <Section tone="dark-2" labelledBy="proje-listesi">
        <h2 id="proje-listesi" className="sr-only">
          Proje listesi
        </h2>
        <ProjectsHub templates={templates.map(({ slug, code, minimumPackage, brand, sector, category, summary, features }) => ({ slug, code, minimumPackage, brand, sector, category, summary, features }))} />
      </Section>
      <CTASection tone="dark-2" />
    </>
  );
}
