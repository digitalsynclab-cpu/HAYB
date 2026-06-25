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
  { id: 'starter',      name: 'STARTER',      price: '5.000 ₺',  recommended: false, color: '#60A5FA' },
  { id: 'business',     name: 'BUSINESS',     price: '10.000 ₺', recommended: false, color: '#A78BFA' },
  { id: 'professional', name: 'PROFESSIONAL', price: '15.000 ₺', recommended: true,  color: '#FBBF24' },
  { id: 'premium',      name: 'PREMIUM',      price: '20.000 ₺', recommended: false, color: '#F87171' },
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
      '2 adet reels tasarımı',
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
      '8 adet reels tasarımı',
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
      'Video / reels tasarımı',
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
    price: '1.500 ₺',
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
    price: '3.000 ₺',
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
    price: '5.000 ₺',
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
