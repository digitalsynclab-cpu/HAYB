# Tasarım Belgesi — HAYB Dijital Ürün Stüdyosu Web Sitesi

## Overview

## Genel Bakış

HAYB, premium bir dijital ürün stüdyosunun tek sayfa (one-page) tanıtım sitesidir. Site; web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım hizmetlerini potansiyel müşterilere sergilemek amacıyla tasarlanmıştır. Tasarım dili Stripe, Linear ve Vercel referans alınarak minimal, teknik ve premium bir estetik benimser.

### Temel Hedefler

- Potansiyel müşterilerin hizmetleri, portföyü ve fiyatlandırmayı kolayca keşfetmesi
- Birinci tekil şahıs anlatımıyla özgün ve güvenilir bir kişisel marka oluşturması
- Proje başvurularını form aracılığıyla toplamak
- Google Lighthouse ile tüm kategorilerde ≥95 puan elde etmek

### Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Dil | TypeScript (strict, no implicit any) |
| Stil | Tailwind CSS v3 |
| Animasyon | Framer Motion v11 |
| UI Bileşenler | ShadCN UI |
| Form | React Hook Form + Zod |
| SEO | Next.js Metadata API |
| Font | next/font (Geist veya Inter) |


---

## Architecture

## Mimari

### Uygulama Mimarisi

Site, Next.js 15 App Router üzerine inşa edilmiş **tek rota** (`/`) yapısındadır. Tüm bölümler bir ana `page.tsx` dosyasında sırayla monte edilir; her bölüm kendi bağımsız istemci bileşenidir.

```
App Router
└── app/
    ├── layout.tsx          ← Root layout (metadata, font, global CSS)
    ├── page.tsx            ← Ana sayfa: tüm bölümleri sırayla render eder
    ├── globals.css         ← Tailwind direktifleri + CSS değişkenleri
    └── robots.txt          ← Statik robots dosyası (ya da route handler)
    └── sitemap.ts          ← next/sitemap veya manuel MetadataRoute.Sitemap
```

### Veri Akışı

Tüm içerik **statik** olarak saklanır — harici API veya veritabanı bağlantısı yoktur. Bileşenler veriyi yerel TypeScript sabit dosyalarından (`/data/*.ts`) okur. Tek dinamik yan etki **İletişim Formu**'dur; form verisi bir Next.js Route Handler (`/app/api/contact/route.ts`) aracılığıyla işlenir.

```
[Statik Veri]  →  [Server Component / page.tsx]  →  [Client Bileşenler]
[Form Girdisi] →  [React Hook Form + Zod]         →  [API Route Handler]
```

### Render Stratejisi

| Sayfa / Rota | Strateji |
|---|---|
| `/` (ana sayfa) | Static Site Generation (SSG) |
| `/api/contact` | Edge Runtime Route Handler |


---

## Components and Interfaces

## Bileşenler ve Arayüzler

### Klasör Yapısı

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── robots.txt
│   ├── sitemap.ts
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── UiUxSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ReferencesSection.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── SectionWrapper.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── PortfolioCard.tsx
│   │   ├── PricingCard.tsx
│   │   ├── ReferenceCard.tsx
│   │   ├── ProcessStep.tsx
│   │   ├── MockupGallery.tsx
│   │   ├── GradientButton.tsx
│   │   └── ContactForm.tsx
│   └── motion/
│       ├── FadeInSection.tsx
│       └── FloatingMockup.tsx
├── data/
│   ├── services.ts
│   ├── portfolio.ts
│   ├── references.ts
│   ├── capabilities.ts
│   ├── pricing.ts
│   └── process.ts
├── hooks/
│   └── useReducedMotion.ts
├── lib/
│   ├── utils.ts
│   └── contact-schema.ts
└── types/
    └── index.ts
```


### Bileşen Detayları

#### `Navbar.tsx`
- **Tür:** Client Component (`"use client"`)
- **Davranış:** `sticky top-0 z-50`; scroll değerine göre `backdrop-blur` + `bg-[#0B0F14]/80` opacity geçişi
- **Masaüstü:** Logo + nav linkleri (Hizmetler, Portfolyo, Fiyatlandırma, Hakkımda, İletişim)
- **Mobil (≤768px):** Logo + hamburger ikonu (`☰`); tıklandığında tam genişlik dropdown menü açılır
- **Smooth scroll:** Her link `href="#section-id"` ile ilgili bölüme 500ms easing ile kaydırır
- **Props:** Yok (kendi iç state'i: `isMenuOpen: boolean`, `scrolled: boolean`)

#### `HeroSection.tsx`
- **Tür:** Client Component
- **İçerik:** H1, alt başlık, iki CTA düğmesi, `FloatingMockup` bileşeni
- **Düzen:** İki sütun (metin sol, mockup sağ); ≤768px tek sütun, mockup alta gelir
- **CTA Düğmeleri:** `GradientButton` + `OutlineButton`

#### `FloatingMockup.tsx`
- **Tür:** Client Component
- **Animasyon:** `useReducedMotion` hook'una göre `animate={{ y: [0, -12, 0] }}` `duration: 3s`, `repeat: Infinity`; reduced-motion'da animasyon yok
- **Görsel:** `next/image` ile optimize edilmiş PNG mockup

#### `ServicesSection.tsx`
- **Tür:** Server Component (veri statik)
- **İçerik:** `services.ts` dosyasından 6 kart render eder
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

#### `ServiceCard.tsx`
- **Props:** `{ icon: ReactNode; title: string; description: string }`
- **Hover:** `transition-all duration-300 hover:bg-[#1a2234] hover:shadow-lg hover:shadow-pink-500/10`

#### `UiUxSection.tsx`
- **Tür:** Server Component
- **İçerik:** Kategori etiketleri (Mobil, Web, Dashboard) + `MockupGallery`
- **Mockup Sayısı:** Toplamda ≥6; her kategoride ≥2

#### `PortfolioSection.tsx`
- **Tür:** Server Component
- **İçerik:** `portfolio.ts`'den 5 proje kartı
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

#### `PortfolioCard.tsx`
- **Props:** `{ image: string; name: string; category: string; description: string; href?: string; external?: boolean }`
- **Fallback:** Görsel yüklenemezse `bg-gray-800` placeholder

#### `ReferencesSection.tsx`
- **Tür:** Server Component
- **İçerik:** Stripe, Linear, Vercel, Apple, Notion için `ReferenceCard` x5

#### `ReferenceCard.tsx`
- **Props:** `{ brand: string; approach: string; colorLanguage: string; uiPrinciple: string; uxNote: string }`

#### `CapabilitiesSection.tsx`
- **Tür:** Server Component
- **İçerik:** 10 adım, sıra numaralı, tümü görünür
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` ile doğal akış

#### `PricingSection.tsx`
- **Tür:** Server Component
- **İçerik:** 3 `PricingCard`; Kurumsal kart gradient kenarlık + "Önerilen" rozeti
- **"Teklif Al" düğmesi:** İletişim bölümüne smooth scroll

#### `PricingCard.tsx`
- **Props:** `{ name: string; price: string; features: string[]; recommended?: boolean; ctaLabel: string; ctaAction: string | (() => void) }`

#### `ProcessSection.tsx`
- **Tür:** Server Component
- **İçerik:** 4 `ProcessStep` + aralarında ok/çizgi SVG bağlantısı
- **Düzen:** Masaüstü: yatay; mobil: dikey

#### `AboutSection.tsx`
- **Tür:** Server Component
- **İçerik:** H2 + metin paragrafları (1. tekil şahıs)

#### `ContactSection.tsx`
- **Tür:** Client Component
- **İçerik:** H2 + `ContactForm`

#### `ContactForm.tsx`
- **Tür:** Client Component
- **Kütüphane:** `react-hook-form` + `zod`
- **Alanlar:** Ad Soyad, Telefon, E-Posta, Proje Açıklaması
- **Durumlar:** `idle | submitting | success | error`
- **Çift gönderim koruması:** Submit düğmesi 400ms disabled

#### `SectionWrapper.tsx`
- **Props:** `{ id: string; children: ReactNode; className?: string }`
- **İşlev:** `<section id={id}>` + `FadeInSection` animasyon sarıcısı

#### `FadeInSection.tsx`
- **Tür:** Client Component
- **Animasyon:** `useInView` + `motion.div`; `opacity: 0→1`, `y: 20→0`, 400–600ms; yalnızca bir kez tetiklenir (`once: true`)

#### `GradientButton.tsx`
- **Props:** `{ children: ReactNode; onClick?: () => void; href?: string; className?: string }`
- **Stil:** `bg-gradient-to-r from-[#FF4D6D] to-[#FF7A59]`; hover: `scale(1.05)`, 200ms


---

## Data Models

## Veri Modelleri

### Renk Sistemi Sabitleri (`lib/utils.ts`)

```typescript
export const COLORS = {
  background: '#0B0F14',
  card: '#111827',
  gradientFrom: '#FF4D6D',
  gradientTo: '#FF7A59',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
} as const;
```

### Hizmet Veri Modeli (`types/index.ts`)

```typescript
export interface Service {
  id: string;
  icon: string;          // Lucide ikon adı
  title: string;
  description: string;   // max 160 karakter
}
```

### Portfolyo Veri Modeli

```typescript
export interface Project {
  id: string;
  image: string;         // /images/portfolio/*.png
  name: string;
  category: string;
  description: string;   // max 200 karakter
  href?: string;         // iç sayfa yolu
  externalUrl?: string;  // dış bağlantı
}
```

### Referans Veri Modeli

```typescript
export interface Reference {
  brand: string;
  approach: string;      // min 30 karakter
  colorLanguage: string; // min 30 karakter
  uiPrinciple: string;   // min 30 karakter
  uxNote: string;        // min 30 karakter
}
```

### Fiyatlandırma Veri Modeli

```typescript
export interface PricingPlan {
  id: string;
  name: string;
  price: string;         // "15.000 TL+" | "35.000 TL+" | "Teklif Al"
  features: string[];
  recommended: boolean;
  ctaLabel: string;
}
```

### Süreç Adım Modeli

```typescript
export interface ProcessStep {
  step: number;          // 1-4
  title: string;
  description: string;   // max 30 kelime
}
```

### Yetenek Adım Modeli

```typescript
export interface Capability {
  step: number;          // 1-10
  icon: string;          // Lucide ikon adı
  title: string;
  description: string;
}
```

### İletişim Formu Zod Şeması (`lib/contact-schema.ts`)

```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Ad Soyad en az 2 karakter olmalıdır')
    .max(100, 'Ad Soyad en fazla 100 karakter olabilir'),
  phone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası giriniz')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Geçersiz telefon numarası'),
  email: z
    .string()
    .email('Geçersiz e-posta adresi'),
  projectDescription: z
    .string()
    .min(20, 'Proje açıklaması en az 20 karakter olmalıdır')
    .max(2000, 'Proje açıklaması en fazla 2000 karakter olabilir'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Form Durum Modeli

```typescript
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FormState {
  status: FormStatus;
  errorMessage?: string;
}
```


### API Route Giriş/Çıkış Modeli (`app/api/contact/route.ts`)

```typescript
// POST /api/contact
// Request Body: ContactFormData
// Response: ContactApiResponse

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
```

---

## Animasyon Stratejisi

### Temel İlkeler

1. **Framer Motion** tüm animasyonlar için kullanılır — sıfırdan CSS animasyon yazılmaz.
2. **`prefers-reduced-motion`** her animasyonlu bileşende kontrol edilir; etkin ise tüm transform/opacity geçişleri `duration: 0` olarak ayarlanır.
3. Animasyonlar **performansı etkilememeli**: yalnızca `transform` ve `opacity` özellikleri animasyona girer (layout reflow tetiklemez).
4. Bölüm fade-in animasyonları `once: true` ile yalnızca **bir kez** tetiklenir.

### `useReducedMotion` Hook'u

```typescript
// hooks/useReducedMotion.ts
import { useReducedMotion } from 'framer-motion';

export function useMotionConfig() {
  const shouldReduce = useReducedMotion();
  return {
    shouldReduce,
    duration: shouldReduce ? 0 : undefined,
    transition: (base: number) => ({ duration: shouldReduce ? 0 : base }),
  };
}
```

### Animasyon Türleri ve Değerleri

| Animasyon | Bileşen | Değer | Süre |
|-----------|---------|-------|------|
| Bölüm Giriş (Fade-In) | `FadeInSection` | opacity 0→1, y 20→0 | 500ms ease-out |
| Hero Floating | `FloatingMockup` | y 0→-12→0, sonsuz döngü | 3000ms ease-in-out |
| Düğme Hover Scale | `GradientButton` | scale 1.0→1.05 | 200ms |
| Kart Hover Parlaklık | `ServiceCard`, `PortfolioCard` | background opacity +10% | 200ms |
| Navbar Blur | `Navbar` | bg-opacity 0→0.8, backdrop-blur | 200ms |
| Hamburger Menü | `Navbar` | height 0→auto, opacity 0→1 | 300ms |
| Form Başarı Gösterimi | `ContactForm` | opacity 0→1 | 400ms |

### `FadeInSection.tsx` Uygulama Taslağı

```typescript
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useMotionConfig } from '@/hooks/useReducedMotion';

interface FadeInSectionProps {
  children: React.ReactNode;
  threshold?: number; // default 0.2
}

export function FadeInSection({ children, threshold = 0.2 }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const { shouldReduce } = useMotionConfig();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduce ? 0 : 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```


---

## Form Mimarisi

### Kütüphaneler

- **React Hook Form** — form state ve validation yönetimi
- **Zod** — şema doğrulama (tip güvenli)
- **`zodResolver`** — iki kütüphaneyi bağlar

### Form Akış Diyagramı

```
Kullanıcı Girdisi
      ↓
React Hook Form (register, watch)
      ↓
Zod Şema Doğrulama (contactSchema)
      ↓ (geçersiz)  ↓ (geçerli)
Hata Mesajları   handleSubmit()
                      ↓
               Submit Düğmesi disable (400ms)
                      ↓
               POST /api/contact
                      ↓
              ↙ success    error ↘
      Başarı Mesajı        Hata Mesajı + "Tekrar Dene"
      (form gizlenir)      (form korunur)
```

### Hata Mesajları (Türkçe)

| Alan | Kural | Mesaj |
|------|-------|-------|
| Ad Soyad | Boş | "Ad Soyad zorunludur" |
| Ad Soyad | min:2 | "En az 2 karakter giriniz" |
| Telefon | Boş | "Telefon numarası zorunludur" |
| Telefon | Format | "Geçersiz telefon numarası" |
| E-Posta | Boş | "E-posta adresi zorunludur" |
| E-Posta | RFC format | "Geçersiz e-posta adresi" |
| Proje Açıklaması | Boş | "Proje açıklaması zorunludur" |
| Proje Açıklaması | min:20 | "En az 20 karakter giriniz" |

### `ContactForm.tsx` Durum Yönetimi

```typescript
const [formState, setFormState] = useState<FormState>({ status: 'idle' });

const onSubmit = async (data: ContactFormData) => {
  setFormState({ status: 'submitting' });
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Sunucu hatası');
    setFormState({ status: 'success' });
  } catch (err) {
    setFormState({
      status: 'error',
      errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    });
  }
};
```

---

## SEO Yapısı

### Next.js Metadata API (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HAYB | Dijital Ürün Stüdyosu',
  description:
    'Web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım geliştirme hizmetleri sunan premium dijital ürün stüdyosu.',
  openGraph: {
    title: 'HAYB | Dijital Ürün Stüdyosu',
    description:
      'Web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım ürünleri geliştiriyorum.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'tr_TR',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://hayb.dev' },
};
```

### Başlık Hiyerarşisi

| Seviye | Kullanım | Örnek |
|--------|----------|-------|
| H1 | Hero başlığı (tek adet) | "Fikirleri Gerçek Dijital Ürünlere Dönüştürüyorum" |
| H2 | Bölüm başlıkları | "Hizmetlerim", "Portfolyo", "Fiyatlandırma" vb. |
| H3 | Kart/alt başlıklar | Hizmet adları, proje adları |

### `robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://hayb.dev/sitemap.xml
```

### `sitemap.ts` (Next.js MetadataRoute)

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hayb.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
```


---

## Performans Optimizasyonu

### Görsel Optimizasyonu

- Tüm görseller `next/image` bileşeni ile kullanılır: otomatik WebP dönüşümü, srcset, lazy loading.
- Hero mockup: `priority={true}` (LCP kritik yol).
- Portfolyo ve UI/UX görseller: `loading="lazy"` (varsayılan).
- Mockup boyutları: minimum 800×600px; PNG veya SVG formatında.
- Görsel placeholder: `placeholder="blur"` + `blurDataURL` (base64 küçük görsel).

```typescript
<Image
  src="/images/hero-mockup.png"
  alt="HAYB - Web, Mobil ve Dashboard Mockup"
  width={600}
  height={480}
  priority
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### Font Optimizasyonu

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
```

### Lazy Loading — Bölüm Bileşenleri

Hero dışındaki bölüm bileşenleri `next/dynamic` ile tembel yüklenir; ilk sayfa yükü küçülür:

```typescript
import dynamic from 'next/dynamic';

const ServicesSection   = dynamic(() => import('@/components/sections/ServicesSection'));
const PortfolioSection  = dynamic(() => import('@/components/sections/PortfolioSection'));
const PricingSection    = dynamic(() => import('@/components/sections/PricingSection'));
// ... diğer bölümler
```

### Tailwind CSS Boyut Azaltma

`tailwind.config.ts` içinde `content` alanı doğru yapılandırılarak kullanılmayan CSS kaldırılır.

### Bundle Analizi

`@next/bundle-analyzer` paketi ile düzenli bundle boyutu kontrolü yapılır.

---

## Erişilebilirlik

### Genel Kurallar

- Tüm etkileşimli öğeler (`<button>`, `<a>`, `<input>`) en az **44×44px** dokunma hedefi.
- Renk kontrastı WCAG AA standardını karşılar: `#FFFFFF / #0B0F14` → ≥7:1, `#94A3B8 / #0B0F14` → ≥4.5:1.
- Klavye navigasyonu: Tab sırası mantıksal akışı izler; focus ring her odak durumunda görünür.
- `prefers-reduced-motion`: tüm Framer Motion animasyonları bu tercih algılandığında devre dışı.

### ARIA Yapısı

| Bileşen | ARIA Niteliği |
|---------|---------------|
| Navbar hamburger ikonu | `aria-label="Menüyü aç"` / `aria-expanded` |
| Footer sosyal ikon linkleri | `aria-label="Instagram profili"` vb. |
| Form alanları | `aria-label` veya `htmlFor` eşleşmesi |
| Form hata mesajları | `aria-live="polite"` + `role="alert"` |
| Hero mockup görseli | `alt="HAYB - Web, Mobil ve Dashboard Mockup Ekranları"` |
| Portfolyo placeholder | `aria-label="Proje görseli yüklenemedi"` |

### Klavye Gezinme

- Hamburger menü: `Enter` ve `Space` ile açılır/kapanır.
- Menü açıkken `Escape` menüyü kapatır ve focus hamburger ikonuna döner.
- Fiyatlandırma ve portfolyo kartlarındaki düğmeler Tab ile odaklanabilir.

### Ekran Okuyucu Desteği

- `<main>`, `<nav>`, `<footer>`, `<section>` semantik HTML yapısı kullanılır.
- Her `<section>` için `aria-labelledby` ile başlık etiket ilişkisi kurulur.

---

## Error Handling

## Hata Yönetimi

| Durum | Davranış |
|-------|----------|
| Portfolyo görseli yüklenemedi | `onError` handler → gri placeholder `div` gösterilir |
| Form alanı boş gönderildi | Zod + RHF → alan altında Türkçe hata mesajı |
| Geçersiz e-posta formatı | "Geçersiz e-posta adresi" mesajı |
| Sunucu / ağ hatası (form) | Hata mesajı + "Tekrar Dene" butonu; form alanları korunur |
| Route Handler 500 | `{ success: false, message: "Sunucu hatası oluştu." }` JSON yanıtı |
| Görüntü lazy load hatası | `next/image` varsayılan hata sınırı + fallback |


---

## Correctness Properties

*Bir özellik (property), bir sistemin geçerli tüm çalışmalarında doğru olması gereken bir karakteristik veya davranıştır — özünde, sistemin ne yapması gerektiğine dair biçimsel bir ifadedir. Özellikler, insan tarafından okunabilir spesifikasyonlar ile makine tarafından doğrulanabilir doğruluk güvenceleri arasındaki köprüyü oluşturur.*

Bu bölüm yalnızca property-based testing için uygun olan gereksinimleri içermektedir. Tasarım sistemi renkleri, teknoloji seçimleri, SEO meta verileri ve statik içerik gereksinimleri snapshot/example tabanlı testlerle kapsanır. Özellikle şu gereksinimler PBT için anlamlı adaylardır: form validasyon mantığı, responsive davranış ve animasyon tekrar-tetikleme kuralı.

---

### Property 1: Dar Ekranda İçerik Taşması Olmaz

*Herhangi bir* geçerli içerik uzunluğuna sahip bileşen, ≤640px genişliğinde render edildiğinde, kapsayıcının sağına yatay taşma (overflow-x) oluşturmaz ve öğeler birbiriyle çakışmaz.

**Validates: Requirements 3.4**

---

### Property 2: Zorunlu Alan Validasyonu Her Kombinasyonda Çalışır

*Herhangi bir* zorunlu form alanı boş bırakılmış geçersiz girdi kombinasyonunda, iletişim formu gönderimi engeller ve her boş zorunlu alan için Türkçe hata mesajı gösterir; form state değişmez.

**Validates: Requirements 13.3**

---

### Property 3: Geçersiz E-Posta Her Zaman Reddedilir

*Herhangi bir* RFC 5321 standardına uymayan e-posta string'i (örn. `@domain.com`, `user@`, `user@domain`, rastgele karakter dizisi) e-posta alanına girildiğinde, form validasyonu "Geçersiz e-posta adresi" hatasını üretir ve formu göndermez.

**Validates: Requirements 13.4**

---

### Property 4: Bölüm Animasyonu Yalnızca Bir Kez Tetiklenir

*Herhangi bir* N ≥ 2 bölüm görünürlük döngüsünde (görünüm alanına giriş → çıkış → giriş tekrarı), `FadeInSection` bileşeninin animate durumu ilk tetiklenmeden sonra değişmez; `once: true` parametresi gereği animasyon ikinci girişte yeniden başlatılmaz.

**Validates: Requirements 16.2**

---

## Testing Strategy

### Genel Yaklaşım

Site, iki tamamlayıcı test katmanıyla doğrulanır: **birim/example testler** belirli davranışları ve kenar durumları kapsar; **property-based testler** evrensel özellikleri kapsamlı girdi aralığında doğrular.

### Property-Based Testing Kütüphanesi

**fast-check** (TypeScript native PBT kütüphanesi) kullanılır. Her property testi minimum **100 iterasyon** çalıştırır.

```typescript
// Örnek yapılandırma
fc.assert(fc.property(fc.string(), (input) => { ... }), { numRuns: 100 });
```

**Etiketleme Formatı:**
```
Feature: hayb-studio-website, Property {N}: {property_text}
```

### Test Kategorileri

#### 1. Smoke Testler (Konfigürasyon Doğrulama)

- Renk sistemi CSS değişkenlerinin doğruluğu
- Tailwind breakpoint sınıflarının varlığı (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`)
- TypeScript derleme (`tsc --noEmit`)
- Transition duration değerleri

#### 2. Birim / Example Testler

- `HeroSection`: H1 içeriği, CTA düğme etiketleri, mockup görsel varlığı
- `ServicesSection`: 6 kart, her kartta ikon/başlık/açıklama, açıklama ≤160 karakter
- `PortfolioSection`: 5 proje, her kartta gerekli alanlar, fallback placeholder
- `ReferencesSection`: 5 marka kartı, her alanda ≥30 karakter içerik
- `CapabilitiesSection`: 10 adım sıralı render, tümü görünür
- `PricingSection`: 3 kart, Kurumsal önerilen rozeti, fiyat değerleri
- `ProcessSection`: 4 adım, ok/çizgi bağlantı SVG varlığı
- `AboutSection`: H2 başlık, belirli metin içeriği, "biz"/"ekibimiz" yok
- `ContactSection`: 4 form alanı varlığı
- `Navbar`: Bağlantı listesi, hamburger ≤768px, `sticky` class
- `Footer`: 4 ikon, aria-label, telif hakkı metni, `target="_blank"` linkleri
- `FloatingMockup`: `prefers-reduced-motion` etkinken duration:0
- `FadeInSection`: `useInView` mock ile ilk görünümde animate çalışması
- `ContactForm` başarı: form submit → success state render
- `ContactForm` hata: fetch mock 500 → error state + "Tekrar Dene"
- `ContactForm` çift gönderim: submit buton 400ms disabled
- SEO metadata: `title`, `description`, `og:title`, `og:image` değerleri
- `sitemap.ts`: URL ve changeFrequency değerleri

#### 3. Property-Based Testler

```typescript
// Özellik 1: Dar ekranda taşma yok
// Feature: hayb-studio-website, Property 1: Dar ekranda içerik taşması olmaz
fc.assert(
  fc.property(
    fc.string({ minLength: 1, maxLength: 500 }),
    (content) => {
      render(<ServiceCard title={content} description={content} icon={<span />} />);
      const container = screen.getByRole('article');
      expect(container.scrollWidth).toBeLessThanOrEqual(container.clientWidth);
    }
  ),
  { numRuns: 100 }
);
```

```typescript
// Özellik 2: Zorunlu alan validasyonu
// Feature: hayb-studio-website, Property 2: Zorunlu alan validasyonu her kombinasyonda çalışır
fc.assert(
  fc.property(
    fc.record({
      fullName: fc.oneof(fc.constant(''), fc.string({ minLength: 2 })),
      phone: fc.oneof(fc.constant(''), fc.string({ minLength: 10 })),
      email: fc.oneof(fc.constant(''), fc.emailAddress()),
      projectDescription: fc.oneof(fc.constant(''), fc.string({ minLength: 20 })),
    }),
    (formData) => {
      const result = contactSchema.safeParse(formData);
      const hasEmpty = Object.values(formData).some(v => v === '');
      if (hasEmpty) {
        expect(result.success).toBe(false);
      }
    }
  ),
  { numRuns: 100 }
);
```

```typescript
// Özellik 3: Geçersiz e-posta reddedilir
// Feature: hayb-studio-website, Property 3: Geçersiz e-posta her zaman reddedilir
fc.assert(
  fc.property(
    fc.string().filter(s => !s.includes('@') || s.startsWith('@') || s.endsWith('@')),
    (invalidEmail) => {
      const result = contactSchema.shape.email.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    }
  ),
  { numRuns: 100 }
);
```

```typescript
// Özellik 4: Animasyon yalnızca bir kez tetiklenir
// Feature: hayb-studio-website, Property 4: Bölüm animasyonu yalnızca bir kez tetiklenir
fc.assert(
  fc.property(
    fc.integer({ min: 2, max: 20 }),
    (cycleCount) => {
      const { animatedCount } = simulateFadeInCycles(cycleCount);
      expect(animatedCount).toBe(1);
    }
  ),
  { numRuns: 100 }
);
```

#### 4. Entegrasyon Testleri

- **Lighthouse CI**: `lhci autorun` ile CI/CD pipeline'da; tüm kategoriler ≥95 puan
- **Form API Route**: `POST /api/contact` uçtan uca testi (geçerli veri → 200 OK)

### Test Araçları

| Araç | Amaç |
|------|-------|
| Vitest | Birim ve property testleri (ESM native) |
| @testing-library/react | Bileşen render testleri |
| fast-check | Property-based testing |
| Lighthouse CI | Performans / a11y / SEO otomasyonu |
| Playwright (isteğe bağlı) | E2E navigasyon ve form testleri |

### Test Çalıştırma

```bash
# Birim + property testleri (single-run)
npx vitest --run

# Lighthouse CI
npx lhci autorun
```

