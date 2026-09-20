export const site = {
  name: 'HAYB',
  url: 'https://www.hayb.com.tr',
  domain: 'HAYB.COM.TR',
  tagline: 'Dijital ürün stüdyosu',
  footerLine: 'Dijitalde daha güçlü yarınlar.',
  whatsapp: '905073420661',
  locale: 'tr_TR',
  /** Veri sorumlusu / ticari unvan (KVKK, gizlilik, asistan) */
  legalName: 'Dijital Ürün Geliştirme ve Satış Bireysel Hesap Yunus Emre Başkan - HAYB',
} as const;

export const nav = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Projeler', href: '/projeler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Süreç', href: '/surec' },
  { label: 'Fiyatlandırma', href: '/fiyatlandirma' },
  { label: 'İletişim', href: '/iletisim' },
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
