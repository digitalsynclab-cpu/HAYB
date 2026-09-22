import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';
import { getAllRoutes } from '@/data/routes';

// Sitemap'e yalnızca canonical, 200 dönen, indekslenebilir URL'ler girer.
// lastModified verilmiyor: gerçek içerik tarihi yok, build anı gibi sahte tazelik sinyali üretilmez.
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
