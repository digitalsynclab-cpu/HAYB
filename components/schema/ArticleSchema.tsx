import { site as S, absoluteUrl } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { ORGANIZATION_ID } from '@/components/schema/OrganizationSchema';
import { WEBSITE_ID } from '@/components/schema/WebSiteSchema';

interface ArticleSchemaProps {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
}

/** Insights makalelerine eklenir. dateModified yalnızca içerik gerçekten güncellendiyse verilir. */
export function ArticleSchema({ title, description, path, datePublished, dateModified, category }: ArticleSchemaProps) {
  const url = absoluteUrl(path);
  const org = { '@type': 'Organization', '@id': ORGANIZATION_ID, name: S.name, url: S.url };
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished,
        dateModified: dateModified ?? datePublished,
        image: absoluteUrl('/og-image.png'),
        author: org,
        publisher: { ...org, logo: { '@type': 'ImageObject', url: absoluteUrl('/og-image.png') } },
        inLanguage: 'tr',
        ...(category && { articleSection: category }),
        isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID, name: S.name, url: S.url },
      }}
    />
  );
}
