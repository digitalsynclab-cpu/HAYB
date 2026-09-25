import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { ReferenceSites } from '@/components/sections/HomeSections';
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { templates } from '@/data/templates';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

const count = templates.length;
const sectors = new Set(templates.map((t) => t.category)).size;

export const metadata = buildMetadata({
  title: 'Web Sitesi Şablonları: Canlı Deneyin',
  description: `Kafe, restoran, klinik, otel, otomotiv, moda, inşaat, spor ve daha fazlası için hazırladığımız ${count} örnek web sitesi şablonu. Sektöre göre filtreleyin, canlı deneyin.`,
  path: '/template',
});

export default function TemplatesPage() {
  // İstemciye yalnızca hafif üst veri gönderilir (şablonların tam içeriği demo sayfalarında yüklenir).
  const items = templates.map(({ slug, code, minimumPackage, brand, sector, category, summary, features }) => ({ slug, code, minimumPackage, brand, sector, category, summary, features }));
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Web Sitesi Şablonları', path: '/template' }]} />
      <PageHero
        eyebrow="Şablonlar"
        title="Web sitenizi satın almadan"
        accent="önce canlı deneyin."
        text={`${sectors} farklı sektör için tasarladığımız ${count} örnek siteyi açın; menüyü, sepeti, filtreleri, randevu ve rezervasyon formlarını kendi telefonunuzda kullanın. Markalar ve içerikler kurgusaldır, tasarım ve kalite gerçektir.`}
        actions={<Button href="/proje-baslat">Kendi Sitemi İstiyorum</Button>}
      />
      <Section tone="dark-2" labelledBy="sablon-listesi">
        <h2 id="sablon-listesi" className="sr-only">
          Örnek web sitesi şablonları
        </h2>
        <TemplateGallery items={items} />
        <p className="mt-8 text-sm text-fg-muted">
          Beğendiğiniz şablonu kendi markanıza uyarlıyoruz: renk, yazı tipi, içerik ve görseller sizin olur.{' '}
          <Link href="/paketler" className="font-semibold text-lime underline underline-offset-4">
            Paketleri görün
          </Link>
        </p>
      </Section>
      <ReferenceSites tone="light" />
      <CTASection tone="dark" />
    </>
  );
}
