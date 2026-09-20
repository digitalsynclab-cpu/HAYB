import { HomeHero, HomeServices, HomeProducts, HomeProcess, HomeDataService, HomeTrust } from '@/components/sections/HomeSections';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/data/site';

// Ana sayfa title/description/canonical layout.tsx içindeki (mevcut) değerleri kullanır.
export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: site.name,
          url: site.url,
          logo: `${site.url}/brand/hayb-mark.png`,
          image: `${site.url}/og-image.png`,
          description:
            'HAYB; web siteleri, özel yazılım, yönetim paneli, mobil uygulama, yapay zeka, sosyal medya ve marka tasarımı hizmetleri sunan dijital ürün stüdyosudur.',
          telephone: `+${site.whatsapp}`,
          areaServed: 'TR',
          inLanguage: 'tr',
        }}
      />
      <HomeHero />
      <HomeServices />
      <HomeProducts />
      <HomeProcess />
      <HomeDataService />
      <HomeTrust />
      <CTASection />
    </>
  );
}
