import { site as S } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { ORGANIZATION_ID } from '@/components/schema/OrganizationSchema';

export const WEBSITE_ID = `${S.url}/#website`;

/** Ana sayfaya eklenir. Site içi arama olmadığı için SearchAction eklenmez. */
export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: S.name,
        alternateName: [S.officialName, 'hayb.com.tr'],
        url: S.url,
        inLanguage: S.locales,
        publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: S.officialName, url: S.url },
      }}
    />
  );
}
