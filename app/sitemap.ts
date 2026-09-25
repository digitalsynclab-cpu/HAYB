import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';
import { getAllRoutes } from '@/data/routes';

// Sitemap'e yalnızca canonical, 200 dönen, indekslenebilir URL'ler girer.
// lastModified yalnızca gerçek içerik tarihi olan sayfalarda (Insights makaleleri) verilir; build anı gibi sahte tazelik sinyali üretilmez.
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    ...(r.lastModified && { lastModified: r.lastModified }),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
