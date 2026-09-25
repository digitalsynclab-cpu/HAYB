import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { insights } from '@/data/insights';

// TEK ROUTE KAYDI: sitemap.xml ve llms.txt buradan beslenir. Yeni sayfa = buraya bir satır.
// noindex sayfalar (/template/[slug]) BURAYA KONMAZ.
export type RouteGroup = 'core' | 'service' | 'project' | 'insight' | 'legal';

export interface RouteEntry {
  path: string;
  title: string;
  description?: string;
  group: RouteGroup;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** YALNIZCA gerçek içerik tarihi (ISO). Yoksa verilmez; build anı gibi sahte tazelik sinyali üretilmez. */
  lastModified?: string;
}

const CORE: RouteEntry[] = [
  { path: '/', title: 'Ana Sayfa', group: 'core', priority: 1, changeFrequency: 'weekly' },
  { path: '/hizmetler', title: 'Hizmetler', group: 'core', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projeler', title: 'Projeler', group: 'core', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/hakkimizda', title: 'Hakkımızda', group: 'core', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/surec', title: 'Süreç', group: 'core', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/paketler', title: 'Paketler', group: 'core', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/template', title: 'Web Sitesi Şablonları', group: 'core', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/iletisim', title: 'İletişim', group: 'core', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/proje-baslat', title: 'Proje Başlat', group: 'core', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/web-sitesi-siparis', title: 'Web Sitesi Siparişi', group: 'core', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/bursa-web-tasarim', title: 'Bursa Web Tasarım ve Dijital Ürün Stüdyosu', group: 'core', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', title: 'Insights', group: 'core', priority: 0.7, changeFrequency: 'weekly' },
];

const LEGAL: RouteEntry[] = [
  { path: '/gizlilik-politikasi', title: 'Gizlilik Politikası', group: 'legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/kvkk', title: 'KVKK Aydınlatma Metni', group: 'legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cerez-politikasi', title: 'Çerez Politikası', group: 'legal', priority: 0.3, changeFrequency: 'yearly' },
];

export function getAllRoutes(): RouteEntry[] {
  return [
    ...CORE,
    ...services.map(
      (s): RouteEntry => ({
        path: `/hizmetler/${s.slug}`,
        title: s.title,
        description: s.summary,
        group: 'service',
        priority: 0.8,
        changeFrequency: 'monthly',
      })
    ),
    ...projects.map(
      (p): RouteEntry => ({
        path: `/projeler/${p.id}`,
        title: `${p.name}: ${p.type}`,
        description: p.description,
        group: 'project',
        priority: 0.6,
        changeFrequency: 'monthly',
      })
    ),
    ...insights.map(
      (i): RouteEntry => ({
        path: `/insights/${i.slug}`,
        title: i.title,
        description: i.description,
        group: 'insight',
        priority: 0.6,
        changeFrequency: 'monthly',
        lastModified: i.updated ?? i.date,
      })
    ),
    ...LEGAL,
  ];
}

// /template/[slug] sayfaları demo içerik olduğu için noindex'tir; bilinçli olarak sitemap/llms dışında tutulur.
