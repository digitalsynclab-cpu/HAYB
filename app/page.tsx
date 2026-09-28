import { HomeHeroV2, HomeGroups, HomeWork, HomeBanners, HomePackages } from '@/components/sections/HomeV2';
import { CTASection } from '@/components/sections/CTASection';
import { OrganizationSchema } from '@/components/schema/OrganizationSchema';
import { WebSiteSchema } from '@/components/schema/WebSiteSchema';

// Ana sayfa title/description/canonical layout.tsx içindeki (mevcut) değerleri kullanır.
export default function Home() {
  return (
    <>
      {/* Tek birleşik işletme entity'si (Organization+LocalBusiness) + WebSite şeması */}
      <OrganizationSchema />
      <WebSiteSchema />
      <HomeHeroV2 />
      <HomeGroups />
      <HomeBanners />
      <HomeWork />
      <HomePackages />
      <CTASection />
    </>
  );
}
