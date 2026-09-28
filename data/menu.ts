import type { IconName } from '@/data/icons';

export interface MenuLink {
  label: string;
  href: string;
  text?: string;
  icon?: IconName;
}
export interface MenuGroup {
  title?: string;
  links: MenuLink[];
}
export interface MenuItem {
  label: string;
  href: string;
  /** Alt menü grupları; yoksa doğrudan bağlantıdır. */
  groups?: MenuGroup[];
}

/** Üst menü: 5 öğe, ayrıntılar alt menülerde. Adresler değişmedi. */
export const menu: MenuItem[] = [
  {
    label: 'Hizmetler',
    href: '/hizmetler',
    groups: [
      {
        title: 'Web ve E-Ticaret',
        links: [
          { label: 'Web Sitesi', href: '/hizmetler/web-sitesi', icon: 'websitesi', text: 'Kurumsal ve tanıtım siteleri' },
          { label: 'E-Ticaret', href: '/hizmetler/e-ticaret', icon: 'eticaret', text: 'iyzico / PayTR ile online satış' },
          { label: 'UI/UX Tasarım', href: '/hizmetler/ui-ux', icon: 'tasarim', text: 'Arayüz ve ürün deneyimi' },
        ],
      },
      {
        title: 'Mobil ve Oyun',
        links: [
          { label: 'Mobil Uygulama', href: '/hizmetler/mobil-uygulama', icon: 'mobiluyumlu', text: 'iOS ve Android' },
          { label: 'Mobil Oyun', href: '/hizmetler/mobil-oyun', icon: 'basari', text: 'Tasarımdan mağaza yayınına' },
        ],
      },
      {
        title: 'Yazılım ve Yapay Zeka',
        links: [
          { label: 'Özel Yazılım', href: '/hizmetler/ozel-yazilim', icon: 'ozelyazilim', text: 'İşinize göre uygulamalar' },
          { label: 'Yönetim Paneli', href: '/hizmetler/yonetim-paneli', icon: 'yonetimpaneli', text: 'Verilerinizi tek yerde yönetin' },
          { label: 'Yapay Zeka', href: '/hizmetler/yapay-zeka', icon: 'yapayzeka', text: 'Asistan ve otomasyon' },
          { label: 'HAYB Data Service', href: '/hizmetler/hayb-data-service', icon: 'veriyonetimi', text: 'İşletme verisi, Excel çıktısı' },
        ],
      },
      {
        title: 'Marka ve Pazarlama',
        links: [
          { label: 'Marka Tasarımı', href: '/hizmetler/marka-tasarimi', icon: 'strateji', text: 'Logo ve kurumsal kimlik' },
          { label: 'Sosyal Medya', href: '/hizmetler/sosyal-medya', icon: 'yenimusteri', text: 'Post ve story tasarımı' },
          { label: 'Google & Meta Reklamları', href: '/hizmetler/reklam-yonetimi', icon: 'hedefodakli', text: 'Reklam kurulumu ve yönetimi' },
        ],
      },
    ],
  },
  {
    label: 'Çalışmalar',
    href: '/projeler',
    groups: [
      {
        links: [
          { label: 'Projeler', href: '/projeler', icon: 'projeyonetimi', text: 'Yayındaki web, mobil ve yazılım işleri' },
          { label: 'Şablonlar', href: '/template', icon: 'websitesi', text: '20 sektör için canlı denenebilir siteler' },
          { label: 'Insights', href: '/insights', icon: 'icerikyonetimi', text: 'Web, yazılım ve tasarım yazıları' },
        ],
      },
    ],
  },
  { label: 'Paketler', href: '/paketler' },
  {
    label: 'Hakkımızda',
    href: '/hakkimizda',
    groups: [
      {
        links: [
          { label: 'Biz Kimiz', href: '/hakkimizda', icon: 'isletmeler', text: 'HAYB, değerlerimiz ve çalışma biçimimiz' },
          { label: 'Sürecimiz', href: '/surec', icon: 'surekligelisim', text: 'Fikirden yayına 5 adım' },
        ],
      },
    ],
  },
  { label: 'İletişim', href: '/iletisim' },
];
