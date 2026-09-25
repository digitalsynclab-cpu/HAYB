export const site = {
  name: 'HAYB',
  /** Google/AI sistemlerinde entity kimliği için resmi ad. */
  officialName: 'HAYB Yunus Emre Başkan',
  url: 'https://www.hayb.com.tr',
  domain: 'HAYB.COM.TR',
  tagline: 'Dijital ürün stüdyosu',
  footerLine: 'Dijitalde daha güçlü yarınlar.',
  whatsapp: '905073420661',
  locale: 'tr_TR',
  /** Veri sorumlusu / ticari unvan (KVKK, gizlilik, asistan) */
  legalName: 'Dijital Ürün Geliştirme ve Satış Bireysel Hesap Yunus Emre Başkan - HAYB',
  /** Doğrulanmış kuruluş yılı. */
  founded: 2025,
  /** Yayında olan diller. plannedLocales: henüz yayınlanmayan (llms.txt'te belirtilir, hreflang üretilmez). */
  locales: ['tr'] as string[],
  plannedLocales: ['en'] as string[],
  contact: {
    email: 'hayb@outlook.com.tr',
    whatsappUrl: 'https://wa.me/905073420661',
  },
  /**
   * Gizlilik nedeniyle yalnızca ilçe/il yayınlanır; sokak seviyesi verilmez.
   * Tam adres görünür yapılması istenirse streetAddress doldurulur.
   */
  address: {
    streetAddress: '',
    addressLocality: 'Osmangazi',
    addressRegion: 'Bursa',
    postalCode: '',
    addressCountry: 'TR',
  },
  social: {
    instagram: 'https://www.instagram.com/haybcomtr/',
  },
} as const;

export const nav = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Projeler', href: '/projeler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Süreç', href: '/surec' },
  { label: 'Paketler', href: '/paketler' },
  { label: 'İletişim', href: '/iletisim' },
] as const;

/** Ana menüye sığmayan ama her sayfadan erişilebilir olması gereken sayfalar (alt bilgi). */
export const moreLinks = [
  { label: 'Şablonlar', href: '/template' },
  { label: 'Web Sitesi Siparişi', href: '/web-sitesi-siparis' },
  { label: 'Insights', href: '/insights' },
  { label: 'Bursa Web Tasarım', href: '/bursa-web-tasarim' },
] as const;

export const legalLinks = [
  { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  { label: 'KVKK Aydınlatma Metni', href: '/kvkk' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
] as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = '/'): string {
  return path === '/' ? site.url : `${site.url}${path}`;
}
