export type ProjectFilter = 'Web' | 'Mobil' | 'UI/UX' | 'Dashboard' | 'Yazılım';

export interface StoreLinks {
  appStore?: string;
  googlePlay?: string;
}

export interface Project {
  id: string;
  name: string;
  /** Kartta gösterilen proje türü */
  type: string;
  filters: ProjectFilter[];
  image: string;
  imageAlt: string;
  /**
   * transparent: arka planı şeffaf ürün görseli (koyu yüzeyde gösterilir)
   * cover: kadrajı dolduran kapak görseli
   */
  imageTone: 'transparent' | 'cover';
  description: string;
  /** İlgili hizmet slug'ları (data/services.ts) */
  serviceSlugs: string[];
  /** Kartta etiket olarak gösterilen kapsam */
  scope: string[];
  liveUrl?: string;
  stores?: StoreLinks;
  /** Uygulama ekran görüntüleri (ilki kapaktır) */
  gallery?: string[];
}

const shots = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/images/apps/${slug}/${i + 1}.webp`);

// Açıklamalar mevcut repository içeriğinden alınmıştır. Sonuç, metrik veya
// müşteri yorumu eklenmemiştir.
export const projects: Project[] = [
  {
    id: 'bbblock',
    name: 'BB Block: Wood Puzzle',
    type: 'Mobil Oyun',
    filters: ['Mobil'],
    image: '/images/projects/bbblock.webp',
    imageAlt: 'BB Block: Wood Puzzle mobil oyun kapak görseli',
    imageTone: 'cover',
    description:
      'Ahşap blok bulmaca temalı mobil oyun. App Store ve Google Play’de yayında; oyunu tasarladık, geliştirdik ve mağazalara yayınladık.',
    serviceSlugs: ['mobil-oyun', 'mobil-uygulama'],
    scope: ['Mobil Oyun', 'iOS', 'Android'],
    gallery: shots('bbblock', 5),
    stores: {
      appStore: 'https://apps.apple.com/us/app/bb-block-wood-puzzle/id6798715444',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.eyegames.bbblock&pcampaignid=web_share',
    },
  },
  {
    id: 'bebeklersoruyor',
    name: 'BebeklerSoruyor',
    type: 'Topluluk Platformu',
    filters: ['Web', 'Mobil', 'UI/UX'],
    image: '/images/projects/bebeklersoruyor.webp',
    imageAlt: 'BebeklerSoruyor mobil uygulama ekranları: ana sayfa, sorular ve topluluk grupları',
    imageTone: 'transparent',
    description:
      'Annelerin ve anne adaylarının deneyimlerini paylaştığı, birbirlerine destek olduğu sıcak bir dayanışma ve topluluk platformu.',
    serviceSlugs: ['web-sitesi', 'mobil-uygulama', 'ui-ux'],
    scope: ['Web', 'Mobil', 'UI/UX'],
    liveUrl: 'https://bebeklersoruyor.com',
    stores: {
      appStore: 'https://apps.apple.com/tr/app/bebekler-soruyor/id6801300588?l=tr',
    },
    gallery: shots('bebeklersoruyor', 6),
  },
  {
    id: 'ekotakippro',
    name: 'EkoTakip Pro',
    type: 'Mobil Uygulama',
    filters: ['Mobil', 'Dashboard', 'Yazılım'],
    image: '/images/projects/ekotakippro.webp',
    imageAlt: 'EkoTakip Pro mobil uygulama ekranları: performans özeti, grafikler ve raporlar',
    imageTone: 'transparent',
    description:
      'Bir müşterimiz için, yalnızca kendi cihazında çalışacak şekilde özel geliştirdiğimiz mobil uygulama. Bireysel ve işletme modu; gelir ve gider ekleme, takip, raporlama ve yapay zekâ destekli analiz sunar.',
    serviceSlugs: ['mobil-uygulama', 'ozel-yazilim', 'yapay-zeka'],
    scope: ['Mobil', 'Özel Yazılım', 'Yapay Zekâ'],
    gallery: shots('ekotakippro', 7),
  },
  {
    id: 'taleb-e',
    name: 'Taleb-e',
    type: 'Mobil Uygulama',
    filters: ['Mobil', 'UI/UX'],
    image: '/images/projects/taleb-e.webp',
    imageAlt: 'Taleb-e mobil uygulama ekranları: burs talebi oluşturma, bağış yapma ve destek akışı',
    imageTone: 'cover',
    description:
      'Öğrencilerin burs talebi oluşturabildiği, bağışçıların doğrulanmış öğrencilere güvenli ve şeffaf biçimde destek olabildiği mobil uygulama.',
    serviceSlugs: ['mobil-uygulama', 'ui-ux', 'ozel-yazilim'],
    scope: ['Mobil', 'UI/UX', 'Özel Yazılım'],
    gallery: shots('taleb-e', 6),
  },
  {
    id: 'qrmenu',
    name: 'QR Menü Sistemi',
    type: 'Dijital Menü',
    filters: ['Web', 'Mobil', 'Yazılım'],
    image: '/images/projects/qrmenu.webp',
    imageAlt: 'QR Menü Sistemi mobil menü ekranları',
    imageTone: 'transparent',
    description:
      'Restoran ve kafeler için QR kod tabanlı dijital menü sistemi. Anlık güncelleme, kategori yönetimi ve çoklu şube desteği.',
    serviceSlugs: ['ozel-yazilim', 'mobil-uygulama'],
    scope: ['Web', 'Mobil', 'Yazılım'],
  },
  {
    id: 'webevtekstil',
    name: 'Ev Tekstili Web Sitesi',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/webevtekstil.webp',
    imageAlt: 'Ev tekstili markası web sitesi ana sayfa tasarımı',
    imageTone: 'transparent',
    description:
      'Ev tekstili markası için modern, ürün odaklı kurumsal web sitesi. Koleksiyon sayfaları, marka kimliği ve iletişim altyapısı.',
    serviceSlugs: ['web-sitesi', 'ui-ux'],
    scope: ['Web Tasarım', 'UI/UX', 'Geliştirme'],
  },
  {
    id: 'webinsaat',
    name: 'İnşaat & Yapı Web Sitesi',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/webinsaat.webp',
    imageAlt: 'İnşaat ve yapı firması web sitesi ana sayfa tasarımı',
    imageTone: 'transparent',
    description:
      'İnşaat ve yapı firması için proje vitrinli, referans portföylü kurumsal web sitesi. Güven odaklı tasarım ve mobil uyumlu altyapı.',
    serviceSlugs: ['web-sitesi', 'ui-ux'],
    scope: ['Web Tasarım', 'UI/UX', 'Geliştirme'],
  },
  {
    id: 'websosyal',
    name: 'Sosyal Medya Ajansı Web Sitesi',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/websosyal.webp',
    imageAlt: 'Sosyal medya ajansı web sitesi ana sayfa tasarımı',
    imageTone: 'transparent',
    description:
      'Dijital pazarlama ve sosyal medya ajansı için hizmet odaklı, dinamik kurumsal web sitesi. Hizmet paketleri ve müşteri kazanım odaklı tasarım.',
    serviceSlugs: ['web-sitesi', 'sosyal-medya'],
    scope: ['Web Tasarım', 'UI/UX', 'Geliştirme'],
  },
];

export const projectFilters = ['Tümü', 'Web', 'Mobil', 'UI/UX', 'Dashboard', 'Yazılım'] as const;
export const projectById = (id: string) => projects.find((p) => p.id === id);

/** Referans siteler: yalnızca alan adı ve bağlantı (içerik uydurulmaz). */
export const referenceSites = [
  { domain: 'eyegames.net', url: 'https://eyegames.net' },
  { domain: 'gürgentekstil.com', url: 'https://gürgentekstil.com' },
  { domain: 'msgko.net', url: 'https://msgko.net' },
  { domain: 'baskanhavlu.com', url: 'https://baskanhavlu.com' },
  { domain: 'bebeklersoruyor.com', url: 'https://bebeklersoruyor.com' },
  { domain: 'taleb-e.com', url: 'https://taleb-e.com' },
] as const;

export const GAME = {
  name: 'BB Block: Wood Puzzle',
  appStore: 'https://apps.apple.com/us/app/bb-block-wood-puzzle/id6798715444',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.eyegames.bbblock&pcampaignid=web_share',
} as const;
