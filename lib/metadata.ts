import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/data/site';

const OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'HAYB Dijital Ürün Stüdyosu' };

interface PageMeta {
  /** Sayfa başlığı. Layout şablonu " | HAYB" ekler. */
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

/** Her route için benzersiz title, description, canonical, OG ve Twitter üretir. */
export function buildMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${title} | HAYB`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | HAYB`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
