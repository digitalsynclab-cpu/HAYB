import { PricingPlan } from '@/types';

// ─── Web Site Paket Karşılaştırma Tablosu ────────────────────────────────────
export interface WebPricingRow {
  label:        string;
  starter:      string | boolean;
  business:     string | boolean;
  professional: string | boolean;
  premium:      string | boolean;
}

export const webPricingRows: WebPricingRow[] = [
  // Temel bilgiler
  { label: 'Teslim Süresi',              starter: '3 Gün',                              business: '4 Gün',                              professional: '5 Gün',                              premium: '7 Gün'                         },
  { label: 'Alan Adı (Ücretsiz)',         starter: '.com.tr / .net.tr / .org.tr (1 Yıl)', business: '.com.tr / .net.tr / .org.tr (2 Yıl)', professional: '.com / .net / .org (1 Yıl)',         premium: '.com / .net / .org (2 Yıl)'    },
  { label: 'Sayfa Sayısı',               starter: '3 Sayfa',                            business: '5 Sayfaya Kadar',                    professional: '10 Sayfaya Kadar',                   premium: 'Sınırsız Sayfa'                },

  // Teknik altyapı
  { label: 'SSL Sertifikası',             starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Mobil Uyumlu Tasarım',        starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Tablet Uyumlu Tasarım',       starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Hız Optimizasyonu',           starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'CDN Performans Sistemi',      starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Modern UI/UX Tasarım',        starter: true,  business: true,  professional: true,  premium: true  },

  // Entegrasyonlar
  { label: 'WhatsApp Entegrasyonu',       starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'İletişim Formu',              starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Google Harita Entegrasyonu',  starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Sosyal Medya Bağlantıları',   starter: true,  business: true,  professional: true,  premium: true  },

  // Yasal & güvenlik
  { label: 'KVKK & Çerez Bildirimi',      starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Gizlilik Politikası',          starter: true,  business: true,  professional: true,  premium: true  },
  { label: '404 Hata Sayfası',             starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Spam Korumalı Formlar',        starter: true,  business: true,  professional: true,  premium: true  },
  { label: 'Temel Güvenlik Koruması',      starter: true,  business: true,  professional: true,  premium: true  },

  // İçerik sayfaları
  { label: 'Ürünler / Hizmetler Sayfası', starter: false, business: true,  professional: true,  premium: true  },
  { label: 'Blog Sistemi',                starter: false, business: true,  professional: true,  premium: true  },
  { label: 'Referanslar Sayfası',         starter: false, business: true,  professional: true,  premium: true  },
  { label: 'Teklif Formu',                starter: false, business: true,  professional: true,  premium: true  },

  // Yönetim paneli
  { label: 'Dashboard',                   starter: false, business: true,  professional: true,  premium: true  },
  { label: 'Ürün Yönetimi',               starter: false, business: true,  professional: true,  premium: true  },
  { label: 'Yönetim Paneli',              starter: false, business: true,  professional: true,  premium: true  },

  // SEO — Business: temel SEO var, analytics/schema yok
  { label: 'Güçlü SEO',                   starter: false, business: true,  professional: true,  premium: true  },
  { label: 'Gelişmiş SEO Optimizasyonu',  starter: false, business: true,  professional: true,  premium: true  },
  { label: 'XML Site Haritası (Sitemap)', starter: false, business: true,  professional: true,  premium: true  },

  // Professional ve üstü: analytics & schema
  { label: 'Google Analytics',            starter: false, business: false, professional: true,  premium: true  },
  { label: 'Schema SEO (Yapısal Veri)',   starter: false, business: false, professional: true,  premium: true  },
  { label: 'Google Search Console',       starter: false, business: false, professional: true,  premium: true  },

  // Premium ekstraları
  { label: 'Çoklu Dil Desteği',           starter: false, business: false, professional: false, premium: true  },
  { label: 'Premium Animasyonlar',        starter: false, business: false, professional: false, premium: true  },
  { label: 'Yapay Zeka Asistan',          starter: false, business: false, professional: false, premium: true  },
  { label: '7/24 Canlı Destek',           starter: false, business: false, professional: false, premium: true  },
];

export const webPackages = [
  { id: 'starter',      name: 'STARTER',      price: '5.000 ₺',  recommended: false},
  { id: 'business',     name: 'BUSINESS',     price: '10.000 ₺', recommended: false},
  { id: 'professional', name: 'PROFESSIONAL', price: '15.000 ₺', recommended: true },
  { id: 'premium',      name: 'PREMIUM',      price: '20.000 ₺', recommended: false},
];

// ─── Özel Proje Paketi ────────────────────────────────────────────────────────
export const specialProjectFeatures: string[] = [
  'Sosyal ağ platformu geliştirme',
  'Girişim fikri → ürün dönüşümü',
  'Özel proje & startup ürünleri',
  'Tam kapsamlı UI/UX tasarım süreci',
  'Sıfırdan yazılım mimarisi',
  'Backend API & veritabanı geliştirme',
  'Yönetim paneli & dashboard',
  'Yapay zeka entegrasyonu',
  'Otomasyon altyapısı',
  'Ölçeklenebilir bulut mimarisi',
  'DevOps & CI/CD kurulumu',
  'Performans & güvenlik denetimi',
  '7/24 teknik destek & SLA garantisi',
  'Uzun vadeli bakım & geliştirme',
  'Teknik danışmanlık',
];

// ─── Mobil Uygulama Özellikleri (fiyat verilmez) ─────────────────────────────
export const mobileAppFeatures: { category: string; items: string[] }[] = [
  {
    category: 'Tasarım & UX',
    items: [
      'iOS & Android native tasarım',
      'Özel UI/UX arayüz tasarımı',
      'Animasyonlu geçiş & etkileşimler',
      'Dark / Light mod desteği',
      'Erişilebilirlik standartları',
    ],
  },
  {
    category: 'Geliştirme',
    items: [
      'React Native cross-platform geliştirme',
      'Swift (iOS) / Kotlin (Android) native seçeneği',
      'Backend API entegrasyonu',
      'Offline çalışma modu',
      'Push notification sistemi',
    ],
  },
  {
    category: 'Entegrasyonlar',
    items: [
      'Ödeme sistemi (iyzico, Stripe)',
      'Harita & konum servisleri',
      'Sosyal medya girişi',
      'Kamera & medya erişimi',
      'Yapay zeka özellikleri',
    ],
  },
  {
    category: 'Yayın & Destek',
    items: [
      'App Store & Google Play yayını',
      'Test & QA süreci',
      'Uygulama güncellemeleri',
      'Bakım & destek',
    ],
  },
];

// ─── Sepet için pricingPlans (webPackages\'tan türetilir) ─────────────────────
export const pricingPlans: PricingPlan[] = webPackages.map((pkg) => ({
  id:          pkg.id,
  name:        pkg.name.charAt(0) + pkg.name.slice(1).toLowerCase(),
  price:       pkg.price,
  recommended: pkg.recommended,
  ctaLabel:    'Sepete Ekle',
  features: webPricingRows
    .filter((r) => r[pkg.id as keyof WebPricingRow] !== false)
    .map((r) => {
      const v = r[pkg.id as keyof WebPricingRow];
      return typeof v === 'string' ? `${r.label}: ${v}` : r.label;
    }),
}));

// ─── Sosyal Medya Paketleri ───────────────────────────────────────────────────
export const socialMediaPlans: PricingPlan[] = [
  {
    id: 'sosyal-haftalik',
    name: 'Haftalık Paket',
    price: '3.000 ₺ / hafta',
    recommended: false,
    ctaLabel: 'Hemen Başla',
    features: [
      '6 adet post tasarımı',
      '4 adet story tasarımı',
      'Logo tasarımı',
      'Marka renk ve font uyumu',
      'PNG + kaynak dosya teslimi',
      '2 revizyon hakkı',
    ],
  },
  {
    id: 'sosyal-aylik',
    name: 'Aylık Paket',
    price: '10.000 ₺ / ay',
    recommended: true,
    ctaLabel: 'Sepete Ekle',
    features: [
      '20 adet post tasarımı',
      '18 adet story tasarımı',
      'Logo tasarımı',
      'Marka kimlik rehberi',
      'İçerik takvimi planlaması',
      'PNG + kaynak dosya teslimi',
      '8 revizyon hakkı',
    ],
  },
  {
    id: 'sosyal-3aylik',
    name: '3 Aylık Paket',
    price: '25.000 ₺ / 3 ay',
    recommended: false,
    ctaLabel: 'Teklif Al',
    features: [
      'Aylık paketin tüm özellikleri',
      'Reklam görseli tasarımı',
      'Satış platformları için logo',
      'Banner ve mağaza tasarımı',
      'Kampanya ve sezon özel içerikler',
      'Haftalık içerik raporu',
      'Öncelikli destek',
    ],
  },
];

// ─── QR Menü Paketleri ────────────────────────────────────────────────────────
export const qrMenuPlans: PricingPlan[] = [
  {
    id: 'qr-temel',
    name: 'QR Menü Temel',
    price: '2.500 ₺',
    recommended: false,
    ctaLabel: 'Sepete Ekle',
    features: [
      'Standart kafe ve restoran QR Menü sistemi',
      'Hızlı ve sorunsuz dijital menü',
      'Mobil uyumlu arayüz',
      '1 şube',
      '6 ay destek',
    ],
  },
  {
    id: 'qr-standart',
    name: 'QR Menü Standart',
    price: '5.000 ₺',
    recommended: false,
    ctaLabel: 'Sepete Ekle',
    features: [
      'Temel paketin tüm özellikleri',
      'Kategori ve ürün yönetimi',
      'Marka rengi ve logo entegrasyonu',
      'Çoklu şube desteği',
      'Sınırsız güncelleme',
      '1 yıl destek',
    ],
  },
  {
    id: 'qr-premium',
    name: 'QR Menü Premium',
    price: '7.500 ₺',
    recommended: true,
    ctaLabel: 'Sepete Ekle',
    features: [
      'Standart paketin tüm özellikleri',
      'Yapay zeka ile profesyonel ürün görselleri',
      'Özel tema ve renk tasarımı',
      'Sınırsız şube desteği',
      'Öncelikli destek',
    ],
  },
];

// ─── Logo Tasarımı ────────────────────────────────────────────────────────────
export const logoPlan: PricingPlan = {
  id: 'logo',
  name: 'Logo Tasarımı',
  price: '499 ₺',
  recommended: false,
  ctaLabel: 'Sepete Ekle',
  features: [
    'Markanıza özel logo tasarımı',
    'Uygulama ikonu (app icon) sürümü',
    'Şeffaf arka planlı PNG teslimi',
    'Açık ve koyu zemin uyumu',
    'Revizyon hakkı',
  ],
};

// ─── Google & Meta Reklam Yönetimi ────────────────────────────────────────────
// 3 aylık paket yalnızca Meta Ads içerir; 6 ve 12 aylık paketlerde Google Ads yönetimi HEDİYEDİR.
// Reklam bütçesi hiçbir pakete dahil değildir.
export const adsTerms = [
  { months: 3, name: 'Kısa Dönem', monthly: 15000, googleGift: false, recommended: false, blurb: 'İlk strateji, kurulum, hedef kitle testleri ve optimizasyon süreci.' },
  { months: 6, name: 'Büyüme', monthly: 13000, googleGift: true, recommended: true, blurb: 'Daha uzun optimizasyon süreci, A/B testleri, remarketing ve düzenli geliştirme.' },
  { months: 12, name: 'Yıllık Yönetim', monthly: 10000, googleGift: true, recommended: false, blurb: 'Sürekli reklam yönetimi, optimizasyon, ölçeklendirme ve yıllık strateji.' },
] as const;

/** Değerler: [3 ay, 6 ay, 12 ay] */
export const adsRows: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: 'Meta Ads (Facebook ve Instagram) yönetimi', values: [true, true, true] },
  { label: 'Google Ads yönetimi', values: [false, 'Hediye', 'Hediye'] },
  { label: 'Reklam hesabı kurulumu', values: [true, true, true] },
  { label: 'Kampanya oluşturma ve yönetimi', values: [true, true, true] },
  { label: 'Hedef kitle / anahtar kelime çalışması', values: [true, true, true] },
  { label: 'Pixel, dönüşüm ve ölçümleme kurulumu', values: [true, true, 'Gelişmiş'] },
  { label: 'Kreatif yönlendirme', values: [true, true, true] },
  { label: 'Bütçe ve teklif optimizasyonu', values: [true, true, true] },
  { label: 'Performans takibi', values: [true, true, true] },
  { label: 'Aylık raporlama', values: [true, true, true] },
  { label: 'Remarketing', values: [false, true, true] },
  { label: 'A/B testleri', values: [false, true, true] },
  { label: 'Haftalık optimizasyon', values: [false, true, true] },
  { label: 'Strateji görüşmesi', values: [false, 'Aylık', '2× / ay'] },
  { label: 'Detaylı performans analizi', values: [false, true, true] },
  { label: 'Ölçeklendirme', values: [false, false, true] },
];

const tl = (n: number) => `${n.toLocaleString('tr-TR')} ₺`;
export const adsTotal = (i: number) => adsTerms[i].monthly * adsTerms[i].months;
export const adsTotalLabel = (i: number) => tl(adsTotal(i));

/** Sepet ve WhatsApp mesajı için paket. */
export function adsPlan(i: number): PricingPlan {
  const t = adsTerms[i];
  return {
    id: `reklam-${t.months}`,
    name: `${t.googleGift ? 'Meta + Google' : 'Meta'} Reklam Yönetimi · ${t.months} Ay`,
    price: `${tl(t.monthly)} / ay`,
    recommended: t.recommended,
    ctaLabel: 'Sepete Ekle',
    features: [
      `Toplam ${adsTotalLabel(i)} (${t.months} ay)`,
      ...adsRows.filter((r) => r.values[i] !== false).map((r) => (typeof r.values[i] === 'string' ? `${r.label}: ${r.values[i]}` : r.label)),
      'Reklam bütçesi dahil değildir',
    ],
  };
}

// ─── HAYB Data Service (tek seferlik satın alım) ──────────────────────────────
export const dataServicePlan: PricingPlan = {
  id: 'hayb-data-service',
  name: 'HAYB Data Service',
  price: '9.999 ₺',
  recommended: false,
  ctaLabel: 'Sepete Ekle',
  features: [
    'Sektöre göre işletme arama (ör. Restoran, Otel, Diş Kliniği)',
    'Türkiye geneli veya il / ilçe filtresi',
    'Firma, telefon, adres ve web sitesi alanları (mevcut olanlar)',
    'Sonuçları tek tabloda inceleme',
    'Excel (.xlsx) ve desteklenen formatlarda dışa aktarma',
    'Tek seferlik satın alım ücreti',
  ],
};
