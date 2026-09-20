import type { IconName } from '@/data/icons';

/** Ana sayfadaki sade süreç */
export const homeSteps = [
  { n: '01', title: 'Anlatın', text: 'İhtiyacınızı ve fikrinizi bize anlatın.' },
  { n: '02', title: 'Tasarlayalım', text: 'Markanıza özel bir tasarım hazırlayalım.' },
  { n: '03', title: 'Geliştirelim', text: 'Tasarımı hızlı ve sağlam şekilde koda dökelim.' },
  { n: '04', title: 'Yayına Alalım', text: 'Testleri tamamlayıp canlıya alalım.' },
  { n: '05', title: 'Destekleyelim', text: 'Yayından sonra da yanınızda olalım.' },
] as const;

export interface ProcessStep {
  n: string;
  title: string;
  text: string;
  icon: IconName;
}

/** /surec sayfasındaki 10 adım (mevcut data/capabilities.ts içeriği) */
export const processSteps: ProcessStep[] = [
  { n: '01', icon: 'strateji', title: 'Fikir Analizi', text: 'Projenizin hedeflerini, hedef kitlesini ve kapsamını birlikte netleştiririz.' },
  { n: '02', icon: 'hedefodakli', title: 'Strateji ve Planlama', text: 'Projenin önceliklerini, takvimini ve yol haritasını belirleriz.' },
  { n: '03', icon: 'tasarim', title: 'UI/UX Tasarım', text: 'Kullanıcı akışları, wireframe ve yüksek kaliteli arayüz tasarımları hazırlarız.' },
  { n: '04', icon: 'icerikyonetimi', title: 'Görsel Tasarım', text: 'Logo, marka kimliği ve sosyal medya içeriklerini (post, story) tasarlarız.' },
  { n: '05', icon: 'websitesi', title: 'Frontend Geliştirme', text: 'Next.js ve Tailwind ile hızlı, erişilebilir arayüzler kodlarız.' },
  { n: '06', icon: 'sunucualtyapisi', title: 'Backend Geliştirme', text: 'API ve iş mantığını güvenli, ölçeklenebilir biçimde kurarız.' },
  { n: '07', icon: 'veriyonetimi', title: 'Veritabanı', text: 'Veri modelini ve sorgu yapısını projenin ihtiyacına göre yapılandırırız.' },
  { n: '08', icon: 'dijitalbuyume', title: 'SEO', text: 'Teknik SEO ve meta yapıyı arama motorları için optimize ederiz.' },
  { n: '09', icon: 'bulutcozumleri', title: 'Yayınlama', text: 'Hosting ve alan adı ayarlarıyla projeyi canlıya alırız.' },
  { n: '10', icon: 'teknikdestek', title: 'Bakım ve Destek', text: 'Yayın sonrası güncelleme, geliştirme ve destek süreçlerini yönetiriz.' },
];

export const processPromises = [
  { icon: 'iletisim', title: 'Şeffaf iletişim', text: 'Süreç boyunca her adımda sizi bilgilendiririz.' },
  { icon: 'entegrasyon', title: 'Esnek çözüm', text: 'İhtiyacınız değiştiğinde plana hızlıca uyum sağlarız.' },
  { icon: 'guvenlik', title: 'Güvenilir ortaklık', text: 'Söz verdiğimiz kapsamı, konuştuğumuz şekilde teslim ederiz.' },
  { icon: 'teknikdestek', title: 'Sürekli destek', text: 'Yayından sonra da yanınızdayız.' },
] as const satisfies readonly { icon: IconName; title: string; text: string }[];
