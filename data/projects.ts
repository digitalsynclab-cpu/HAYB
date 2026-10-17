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
  /** Örnek / şablon çalışma (gerçek müşteri işi değil): kartta ve sayfada "Örnek tasarım" etiketi */
  sample?: boolean;
  /** Masaüstü ekran görüntüleri (yazılım ürünleri için yatay galeri) */
  desktopShots?: { src: string; title: string }[];
  /** Uygulama ekran görüntüleri (ilki kapaktır) */
  gallery?: string[];
}

import { DS_APP_URL, dsScreens } from '@/data/data-service';

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
    liveUrl: 'https://taleb-e.com',
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
    id: 'tigerwood',
    name: 'TIGERWOOD',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/tigerwood.webp',
    imageAlt: 'TIGERWOOD geri dönüşüm kompozit panel kurumsal web sitesi: masaüstü ve mobil ekranlar',
    imageTone: 'cover',
    description:
      'Tetra Pak ambalaj firelerinden kompozit panel üreten TIGERWOOD için kurumsal web sitesi. Ziyaretçi, atıkları ana sayfada kendisi parçalıyor; parçacıkların preslenip panele, panelin de seçtiği ürüne dönüştüğünü 3B animasyonla izliyor. SEO, yapay zekâ arama görünürlüğü ve güvenlik altyapısı dahil.',
    serviceSlugs: ['web-sitesi', 'ui-ux', 'ozel-yazilim'],
    scope: ['Web Tasarım', '3B Etkileşim', 'SEO', 'Geliştirme'],
    liveUrl: 'https://tigerwoodrec.com',
    gallery: shots('tigerwood', 6),
  },
  {
    id: 'baskanhavlu',
    name: 'Başkan Havlu Tekstil',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/baskanhavlu.webp',
    imageAlt: 'Başkan Havlu Tekstil kurumsal web sitesi ana sayfası: havlu ve bornoz imalatı',
    imageTone: 'cover',
    description:
      '1996’dan bu yana Bursa’da havlu ve bornoz üreten Başkan Havlu Tekstil için kurumsal web sitesi. Ürün kategorileri, sektöre özel çözümler (otel, SPA, klinik, promosyon), teklif formu, WhatsApp ve Türkçe/İngilizce dil desteği.',
    serviceSlugs: ['web-sitesi', 'ui-ux'],
    scope: ['Kurumsal Web', 'Çoklu Dil', 'Teklif Formu', 'SEO'],
    liveUrl: 'https://baskanhavlu.com',
    gallery: shots('baskanhavlu', 5),
  },
  {
    id: 'eyegames',
    name: 'Eye Games',
    type: 'Oyun Stüdyosu Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/eyegames.webp',
    imageAlt: 'Eye Games bağımsız oyun stüdyosu web sitesi ana sayfası',
    imageTone: 'cover',
    description:
      'Özgün ve sürükleyici oyunlar geliştiren bağımsız oyun stüdyosu Eye Games’in web sitesi. Oyun vitrini (BB Block: Wood Puzzle, App Store ve Google Play bağlantılarıyla), stüdyo tanıtımı, kariyer ve sık sorulan sorular bölümleri.',
    serviceSlugs: ['web-sitesi', 'ui-ux', 'mobil-oyun'],
    scope: ['Web Tasarım', 'Oyun Vitrini', 'UI/UX'],
    liveUrl: 'https://eyegames.net',
    gallery: shots('eyegames', 5),
  },
  {
    id: 'msgko',
    name: 'MSGKO',
    type: 'Oyun Rehber Platformu',
    filters: ['Web', 'UI/UX', 'Yazılım'],
    image: '/images/projects/msgko.webp',
    imageAlt: 'MSGKO Knight Online rehber platformu ana sayfası',
    imageTone: 'cover',
    description:
      'Knight Online oyuncuları için Türkçe rehber platformu. Asas, Okçu, Warrior, Mage ve Priest build rehberleri, boss drop listeleri, harita ve farm rotaları, YouTube video arşivi ve duvar kâğıdı galerisi; mobilde uygulama gibi alt menüyle.',
    serviceSlugs: ['web-sitesi', 'ui-ux', 'ozel-yazilim'],
    scope: ['İçerik Platformu', 'Arama', 'Video Arşivi', 'Mobil Uyum'],
    liveUrl: 'https://msgko.net',
    gallery: shots('msgko', 5),
  },
  {
    id: 'hayb-data-service',
    name: 'HAYB Data Service',
    type: 'Yazılım Ürünü',
    filters: ['Yazılım', 'Dashboard'],
    image: '/images/projects/hayb-data-service.webp',
    imageAlt: 'HAYB Data Service müşteri adayları ekranı: işletmeler fırsat skoru ve iletişim bilgileriyle listeleniyor',
    imageTone: 'cover',
    description:
      'Kendi geliştirdiğimiz müşteri bulma, site analizi ve satış takibi programı. Şehir ve sektöre göre işletmeleri iletişim bilgileriyle listeler, web sitelerini SEO, hız ve güvenlik açısından puanlar, bulgulardan teklif hazırlar ve satışları panoda takip eder. Windows programı olarak ve tarayıcıdan çalışır.',
    serviceSlugs: ['hayb-data-service', 'ozel-yazilim', 'yonetim-paneli'],
    scope: ['Windows', 'Web Uygulaması', 'Veri', 'Satış Takibi'],
    liveUrl: DS_APP_URL,
    desktopShots: dsScreens.map(({ src, title }) => ({ src, title })),
  },
  {
    id: 'gurgentekstil',
    name: 'Gürgentekstil',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/gurgentekstil.webp',
    imageAlt: 'Gürgentekstil toptan havlu üreticisi kurumsal web sitesi ana sayfası',
    imageTone: 'cover',
    description:
      'Denizli’de toptan havlu üretimi ve tedariki yapan Gürgentekstil için kurumsal web sitesi. El, yüz, banyo ve otel havlusu ürün grupları, ürün kodlu katalog, hazır stok ve özel üretim bilgisi, WhatsApp ile teklif ve Türkçe/İngilizce dil desteği.',
    serviceSlugs: ['web-sitesi', 'ui-ux'],
    scope: ['Kurumsal Web', 'Ürün Kataloğu', 'Çoklu Dil', 'SEO'],
    liveUrl: 'https://gürgentekstil.com',
    gallery: shots('gurgentekstil', 5),
  },
  {
    id: 'talebenet',
    name: 'Taleb-e.net',
    type: 'Öğrenci Forumu',
    filters: ['Web', 'Yazılım'],
    image: '/images/projects/talebenet.webp',
    imageAlt: 'Taleb-e.net lise ve üniversite öğrencileri forumu ana sayfası',
    imageTone: 'cover',
    description:
      'Lise ve üniversite öğrencilerinin eğitim, sınavlar, üniversite, kariyer ve öğrenci hayatı hakkında konu açıp bilgi paylaştığı forum. Kategori ve alt forumlar, üyelik, mesajlaşma, popüler konular, forum istatistikleri ve mobilde uygulama gibi alt menü.',
    serviceSlugs: ['web-sitesi', 'ozel-yazilim', 'ui-ux'],
    scope: ['Forum Yazılımı', 'Üyelik', 'Mesajlaşma', 'Mobil Uyum'],
    liveUrl: 'https://taleb-e.net',
    gallery: shots('talebenet', 5),
  },
  {
    id: 'webevtekstil',
    sample: true,
    name: 'Ev Tekstili Web Sitesi',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/webevtekstil.webp',
    imageAlt: 'Ev tekstili sektörü için örnek web sitesi ana sayfa tasarımı',
    imageTone: 'transparent',
    description:
      'Örnek tasarım: ev tekstili sektörü için hazırladığımız modern, ürün odaklı kurumsal web sitesi. Koleksiyon sayfaları, marka kimliği ve iletişim altyapısı. Marka ve içerik kurgusaldır.',
    serviceSlugs: ['web-sitesi', 'ui-ux'],
    scope: ['Web Tasarım', 'UI/UX', 'Geliştirme'],
  },
  {
    id: 'webinsaat',
    sample: true,
    name: 'İnşaat & Yapı Web Sitesi',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/webinsaat.webp',
    imageAlt: 'İnşaat ve yapı sektörü için örnek web sitesi ana sayfa tasarımı',
    imageTone: 'transparent',
    description:
      'Örnek tasarım: inşaat ve yapı sektörü için hazırladığımız proje vitrinli, referans portföylü kurumsal web sitesi. Güven odaklı tasarım ve mobil uyumlu altyapı. Marka ve içerik kurgusaldır.',
    serviceSlugs: ['web-sitesi', 'ui-ux'],
    scope: ['Web Tasarım', 'UI/UX', 'Geliştirme'],
  },
  {
    id: 'websosyal',
    sample: true,
    name: 'Sosyal Medya Ajansı Web Sitesi',
    type: 'Kurumsal Web Sitesi',
    filters: ['Web', 'UI/UX'],
    image: '/images/projects/websosyal.webp',
    imageAlt: 'Sosyal medya ajansları için örnek web sitesi ana sayfa tasarımı',
    imageTone: 'transparent',
    description:
      'Örnek tasarım: dijital pazarlama ve sosyal medya ajansları için hazırladığımız hizmet odaklı, dinamik kurumsal web sitesi. Hizmet paketleri ve müşteri kazanım odaklı tasarım. Marka ve içerik kurgusaldır.',
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
  { domain: 'tigerwoodrec.com', url: 'https://tigerwoodrec.com' },
  { domain: 'taleb-e.net', url: 'https://taleb-e.net' },
] as const;

export const GAME = {
  name: 'BB Block: Wood Puzzle',
  appStore: 'https://apps.apple.com/us/app/bb-block-wood-puzzle/id6798715444',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.eyegames.bbblock&pcampaignid=web_share',
} as const;
