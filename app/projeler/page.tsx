import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ProjectsExplorer } from '@/components/sections/ProjectsExplorer';
import { CTASection } from '@/components/sections/CTASection';
import { ReferenceSites } from '@/components/sections/HomeSections';
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
        text="Topluluk platformundan QR menüye, kurumsal web sitelerinden mobil arayüzlere: yaptığımız işleri yakından inceleyin."
        actions={<Button href="/proje-baslat">Sizin Projeniz Sırada</Button>}
      />
      <Section tone="dark-2" labelledBy="proje-listesi">
        <h2 id="proje-listesi" className="sr-only">
          Proje listesi
        </h2>
        <ProjectsExplorer />
      </Section>
      <ReferenceSites />
      <CTASection tone="dark-2" />
    </>
  );
}
