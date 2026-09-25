import { absoluteUrl } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';

interface CollectionPageSchemaProps {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}

/** Liste sayfalarına (ör. Insights) eklenir: CollectionPage + ItemList. */
export function CollectionPageSchema({ name, description, path, items }: CollectionPageSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: 'tr',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: absoluteUrl(item.path),
          })),
        },
      }}
    />
  );
}
