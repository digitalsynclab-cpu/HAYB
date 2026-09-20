import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';
import { services } from '@/data/services';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });
  return [
    entry('/', 1, 'weekly'),
    entry('/hizmetler', 0.9),
    ...services.map((s) => entry(`/hizmetler/${s.slug}`, 0.8)),
    entry('/projeler', 0.8),
    ...projects.map((p) => entry(`/projeler/${p.id}`, 0.6)),
    entry('/hakkimizda', 0.6),
    entry('/surec', 0.6),
    entry('/fiyatlandirma', 0.8),
    entry('/template', 0.7),
    entry('/iletisim', 0.7),
    entry('/proje-baslat', 0.7),
    entry('/gizlilik-politikasi', 0.3),
    entry('/kvkk', 0.3),
    entry('/cerez-politikasi', 0.3),
  ];
}
