import { site as S, absoluteUrl } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const ORGANIZATION_ID = `${S.url}/#organization`;

/**
 * Organization + LocalBusiness TEK birleşik entity (tek @id).
 * Yalnızca ana sayfada kullanılır: aynı işletme için ikinci bir @id açmak
 * (ör. iletişim sayfasında ayrı bir LocalBusiness) entity çözümlemesini böler.
 */
export function OrganizationSchema() {
  const sameAs = Object.values(S.social).filter(Boolean);

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness'],
        '@id': ORGANIZATION_ID,
        name: S.officialName,
        alternateName: [S.name],
        url: S.url,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/og-image.png') },
        image: absoluteUrl('/og-image.png'),
        foundingDate: String(S.founded),
        description:
          'HAYB; web siteleri, özel yazılım, yönetim paneli, mobil uygulama, yapay zeka, sosyal medya ve marka tasarımı hizmetleri sunan dijital ürün stüdyosudur.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: S.address.addressLocality,
          addressRegion: S.address.addressRegion,
          addressCountry: S.address.addressCountry,
        },
        email: S.contact.email,
        contactPoint: {
          '@type': 'ContactPoint',
          url: S.contact.whatsappUrl,
          contactType: 'customer service',
          areaServed: 'TR',
        },
        ...(sameAs.length > 0 && { sameAs }),
      }}
    />
  );
}
