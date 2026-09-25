import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/data/site';

const OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'HAYB Dijital Ürün Stüdyosu' };

interface PageMeta {
  /** Sayfa başlığı. Layout şablonu " | HAYB" ekler. */
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  keywords?: string[];
  /** Makale sayfaları için: OpenGraph türü "article" olur, yayın tarihi eklenir. */
  article?: { publishedTime: string; modifiedTime?: string; section?: string };
}

/** Arama sonuçlarında kesilmemesi için description en fazla 175 karakterdir; aşarsa sözcük sınırında kısaltılır. */
export function clipDescription(text: string, max = 175): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}

/** Her route için benzersiz title, description, canonical, OG ve Twitter üretir. */
export function buildMetadata({ title, description: rawDescription, path, noindex, keywords, article }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const description = clipDescription(rawDescription);
  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: `${title} | HAYB`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      ...(article
        ? { type: 'article' as const, publishedTime: article.publishedTime, ...(article.modifiedTime && { modifiedTime: article.modifiedTime }), ...(article.section && { section: article.section }), authors: [site.url] }
        : { type: 'website' as const }),
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
