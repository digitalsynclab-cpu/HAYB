import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/Cards';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Hizmetler',
  description:
    'Web sitesi, özel yazılım, yönetim paneli, UI/UX, mobil uygulama, yapay zeka, sosyal medya ve marka tasarımı. İhtiyacınıza uygun dijital çözümü birlikte seçelim.',
  path: '/hizmetler',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="İhtiyacınız neyse,"
        accent="dijital çözümünü tasarlıyoruz."
        text="Markanız için yalnızca bugünü değil, yarını da düşünen modern, güvenilir ve etkili dijital çözümler sunuyoruz."
        actions={
          <>
            <Button href="/proje-baslat">Projenizi Anlatın</Button>
            <Button href="/fiyatlandirma" variant="secondary">
              Fiyatları Gör
            </Button>
          </>
        }
      />
      <Section tone="light" labelledBy="hizmet-listesi">
        <SectionHeading id="hizmet-listesi" eyebrow="Neler yapıyoruz?" title="Hizmetlerimiz," accent="tek çatı altında." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 4) * 60} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
      <CTASection />
    </>
  );
}
