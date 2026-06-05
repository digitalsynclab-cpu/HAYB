# Implementation Plan: HAYB Dijital Ürün Stüdyosu Web Sitesi

## Overview

Next.js 15 App Router üzerine inşa edilmiş, TypeScript (strict), Tailwind CSS, Framer Motion ve ShadCN UI kullanan tek sayfa premium dijital ürün stüdyosu web sitesinin adım adım uygulama planı. Her görev bir öncekinin üzerine inşa edilir; son adımda tüm bileşenler ana sayfada birleştirilir.

---

## Tasks

- [x] 1. Proje İskeleti ve Temel Yapılandırma
  - Next.js 15 App Router projesi oluştur (`create-next-app --typescript`)
  - `tsconfig.json` içinde `strict: true` ve `noImplicitAny: true` ayarla
  - Tailwind CSS v3'ü yapılandır; `tailwind.config.ts` içinde `content` alanlarını doğru tanımla
  - Framer Motion v11 ve ShadCN UI bağımlılıklarını kur
  - `next/font` ile Inter veya Geist fontunu `app/layout.tsx` içinde tanımla
  - `src/` klasör yapısını oluştur: `app/`, `components/layout/`, `components/sections/`, `components/ui/`, `components/motion/`, `data/`, `hooks/`, `lib/`, `types/`
  - Vitest ve `@testing-library/react` test altyapısını kur; `vitest.config.ts` yapılandır
  - fast-check kütüphanesini kur (`npm install fast-check`)
  - _Gereksinimler: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Renk Sistemi, CSS Değişkenleri ve Tailwind Yapılandırması
  - [x] 2.1 `app/globals.css` içinde Tailwind direktiflerini ve CSS özel değişkenlerini tanımla
    - `--color-bg: #0B0F14`, `--color-card: #111827`, `--color-gradient-from: #FF4D6D`, `--color-gradient-to: #FF7A59`, `--color-text-primary: #FFFFFF`, `--color-text-secondary: #94A3B8`, `--color-border: rgba(255,255,255,0.08)` değerlerini ekle
    - _Gereksinimler: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 2.2 `tailwind.config.ts` içinde renk paletini ve breakpoint ayarlarını yapılandır
    - `sm: 641px`, `md: 769px`, `lg: 1025px` breakpoint değerlerini doğrula
    - Özel renk tokenlarını Tailwind'e ekle
    - _Gereksinimler: 1.1, 3.1, 3.2, 3.3_
  - [x] 2.3 `lib/utils.ts` içinde `COLORS` sabitini ve `cn()` yardımcı fonksiyonunu yaz
    - `COLORS` nesnesini tasarım belgesindeki değerlerle oluştur
    - ShadCN uyumlu `cn(clsx, twMerge)` yardımcı fonksiyonu ekle
    - _Gereksinimler: 1.1, 2.2_
  - [ ]* 2.4 Renk sistemi ve Tailwind yapılandırması için smoke testleri yaz
    - CSS değişkenlerinin doğru değerlere sahip olduğunu doğrula
    - Tailwind grid sınıflarının (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`) tanımlı olduğunu kontrol et
    - _Gereksinimler: 1.1, 3.1_

- [x] 3. TypeScript Tip Tanımları ve Veri Dosyaları
  - [x] 3.1 `types/index.ts` içinde tüm veri modellerini tanımla
    - `Service`, `Project`, `Reference`, `PricingPlan`, `ProcessStep`, `Capability`, `FormStatus`, `FormState`, `ContactApiResponse` arayüzlerini yaz
    - _Gereksinimler: 2.2, 5.2, 7.2, 8.3, 10.3, 11.2_
  - [x] 3.2 `data/services.ts` — 6 hizmet kartı verisini yaz
    - Web Geliştirme, Mobil Uygulama, Yapay Zeka Sistemleri, Özel Yazılım Çözümleri, Yönetim Panelleri, Startup MVP; her birinde `id`, `icon`, `title`, `description` (≤160 karakter)
    - _Gereksinimler: 5.1, 5.2_
  - [x] 3.3 `data/portfolio.ts` — 5 proje verisini yaz
    - Dertleş App, BebeklerSoruyor, Başkan Havlu Yönetim Sistemi, EkoTakip, Ultra AI CRM; her birinde `id`, `image`, `name`, `category`, `description` (≤200 karakter), opsiyonel `href` / `externalUrl`
    - _Gereksinimler: 7.1, 7.2, 7.3_
  - [x] 3.4 `data/references.ts` — 5 referans marka verisini yaz
    - Stripe, Linear, Vercel, Apple, Notion; her birinde `brand`, `approach`, `colorLanguage`, `uiPrinciple`, `uxNote` (her alan ≥30 karakter)
    - _Gereksinimler: 8.2, 8.3_
  - [x] 3.5 `data/capabilities.ts` — 10 yetenek adımı verisini yaz
    - 1–10 sıralı: Fikir Analizi → Bakım ve Destek; her birinde `step`, `icon`, `title`, `description`
    - _Gereksinimler: 9.2, 9.3_
  - [x] 3.6 `data/pricing.ts` — 3 fiyatlandırma paketi verisini yaz
    - Başlangıç (15.000 TL+), Kurumsal (35.000 TL+ — `recommended: true`), Özel Yazılım (Teklif Al); her birinde `id`, `name`, `price`, `features[]`, `recommended`, `ctaLabel`
    - _Gereksinimler: 10.1, 10.2, 10.3_
  - [x] 3.7 `data/process.ts` — 4 çalışma süreci adımı verisini yaz
    - Analiz, Planlama, Geliştirme, Yayına Alma; her birinde `step`, `title`, `description` (≤30 kelime)
    - _Gereksinimler: 11.1, 11.2_

- [ ] 4. Layout Bileşenleri: Navbar ve Footer
  - [-] 4.1 `components/layout/Navbar.tsx` istemci bileşenini yaz
    - `"use client"` direktifi; `sticky top-0 z-50` konumlandırma
    - `scrolled` state ile `backdrop-blur` + `bg-[#0B0F14]/80` geçişi (200ms)
    - Masaüstü: Logo + Hizmetler, Portfolyo, Fiyatlandırma, Hakkımda, İletişim nav linkleri
    - Mobil (≤768px): Logo + hamburger ikonu; `isMenuOpen` state ile tam genişlik dropdown
    - `aria-label="Menüyü aç"` / `aria-expanded` nitelikleri; `Escape` ile menü kapanma
    - `href="#section-id"` smooth scroll (400–600ms)
    - _Gereksinimler: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8_
  - [-] 4.2 `components/layout/Footer.tsx` bileşenini yaz
    - Instagram, LinkedIn, GitHub, E-Posta ikonları; her biri `aria-label` ile
    - Sosyal linkler `target="_blank"`, E-Posta `mailto:` aynı sekmede
    - "© [Mevcut Yıl] HAYB. Tüm hakları saklıdır." telif hakkı metni
    - _Gereksinimler: 14.1, 14.2, 14.3, 14.4, 14.5_
  - [ ]* 4.3 Navbar ve Footer için birim testleri yaz
    - Navbar: sticky class, nav link listesi, hamburger ≤768px görünümü
    - Footer: 4 ikon varlığı, aria-label değerleri, telif hakkı metni, `target="_blank"` linkleri
    - _Gereksinimler: 14.1, 15.1, 15.3, 15.5_

- [ ] 5. Temel Yardımcı Bileşenler
  - [-] 5.1 `hooks/useReducedMotion.ts` hook'unu yaz
    - Framer Motion'ın `useReducedMotion` hook'unu sarmalayan `useMotionConfig()` fonksiyonu
    - `shouldReduce`, `duration`, `transition` değerlerini döndür
    - _Gereksinimler: 4.8, 16.5_
  - [~] 5.2 `components/motion/FadeInSection.tsx` istemci bileşenini yaz
    - `useInView` + `motion.div`; `opacity 0→1`, `y 20→0`, 500ms ease-out
    - `once: true` — yalnızca bir kez tetiklenir
    - `useMotionConfig` ile `prefers-reduced-motion` desteği
    - _Gereksinimler: 16.1, 16.2, 16.5_
  - [-] 5.3 `components/ui/SectionWrapper.tsx` bileşenini yaz
    - `{ id, children, className }` props; `<section id={id}>` + `FadeInSection` sarıcısı
    - `aria-labelledby` ile başlık etiket ilişkisi
    - _Gereksinimler: 16.1_
  - [ ] 5.4 `components/ui/GradientButton.tsx` bileşenini yaz
    - `bg-gradient-to-r from-[#FF4D6D] to-[#FF7A59]`; hover `scale(1.05)` 200ms
    - `{ children, onClick, href, className }` props; `href` varsa `<a>`, yoksa `<button>`
    - _Gereksinimler: 1.3, 1.8, 16.3_
  - [ ]* 5.5 `FadeInSection` için property-based test yaz
    - **Property 4: Bölüm Animasyonu Yalnızca Bir Kez Tetiklenir**
    - `fc.integer({ min: 2, max: 20 })` ile N ≥ 2 görünürlük döngüsünde `animatedCount === 1` doğrula
    - **Validates: Requirements 16.2**
    - _Etiket: `Feature: hayb-studio-website, Property 4`_
  - [ ]* 5.6 `GradientButton` ve `SectionWrapper` için birim testleri yaz
    - GradientButton: gradient class varlığı, href ile `<a>` render, onClick çağrısı
    - SectionWrapper: id niteliği, FadeInSection sarmalama
    - _Gereksinimler: 1.3, 16.1_

- [~] 6. Kontrol Noktası — Altyapı Doğrulaması
  - Tüm testlerin geçtiğini doğrula (`npx vitest --run`)
  - TypeScript derleme hatası olmadığını kontrol et (`tsc --noEmit`)
  - Kullanıcıya soru varsa ilet.

- [ ] 7. Bölüm Bileşenleri — İçerik Bölümleri
  - [~] 7.1 `components/motion/FloatingMockup.tsx` istemci bileşenini yaz
    - `useMotionConfig` ile `animate={{ y: [0, -12, 0] }}`, döngü süresi 3s
    - `prefers-reduced-motion` etkinse animasyon yok, mockup sabit
    - `next/image` ile `priority={true}`, `placeholder="blur"` hero mockup görseli
    - _Gereksinimler: 4.6, 4.7, 4.8_
  - [~] 7.2 `components/sections/HeroSection.tsx` istemci bileşenini yaz
    - H1: "Fikirleri Gerçek Dijital Ürünlere Dönüştürüyorum"
    - Alt başlık metni; `GradientButton` ("İletişime Geç") + outline düğmesi ("Projeleri İncele")
    - İki sütun layout; mobilde tek sütun, mockup alta
    - Smooth scroll onClick handler'ları
    - _Gereksinimler: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [~] 7.3 `components/ui/ServiceCard.tsx` bileşenini yaz
    - `{ icon, title, description }` props; hover: `bg-[#1a2234]` + shadow, 200–300ms geçiş
    - `role="article"` ve erişilebilirlik nitelikleri
    - _Gereksinimler: 5.2, 5.3, 16.4_
  - [~] 7.4 `components/sections/ServicesSection.tsx` sunucu bileşenini yaz
    - `services.ts` verisinden 6 `ServiceCard` render; `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
    - H2 bölüm başlığı; `SectionWrapper id="hizmetler"`
    - _Gereksinimler: 5.1, 5.4_
  - [~] 7.5 `components/ui/MockupGallery.tsx` bileşenini yaz
    - Kategori etiketleri: Mobil, Web, Dashboard; her kategoride ≥2 mockup
    - `next/image` ile lazy loading; toplamda ≥6 görsel
    - _Gereksinimler: 6.2, 6.4_
  - [~] 7.6 `components/sections/UiUxSection.tsx` sunucu bileşenini yaz
    - H2: "UI/UX Tasarım ve Ürün Deneyimi"; `MockupGallery` bileşenini dahil et
    - Prototip/interaktif örnekler listesi; her örnekte başlık, açıklama (≥20 karakter), tıklanabilir bağlantı
    - `SectionWrapper id="uiux"`
    - _Gereksinimler: 6.1, 6.2, 6.3, 6.4_
  - [~] 7.7 `components/ui/PortfolioCard.tsx` bileşenini yaz
    - `{ image, name, category, description, href, externalUrl }` props
    - Görsel yüklenemezse gri placeholder div (`onError` handler)
    - `aria-label="Proje görseli yüklenemedi"` fallback
    - "İncele" düğmesi: iç sayfa veya `target="_blank"` dış link
    - _Gereksinimler: 7.2, 7.4, 7.5, 7.6_
  - [~] 7.8 `components/sections/PortfolioSection.tsx` sunucu bileşenini yaz
    - `portfolio.ts` verisinden 5 `PortfolioCard` render; `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
    - `SectionWrapper id="portfolyo"`
    - _Gereksinimler: 7.1, 7.3, 7.7_
  - [~] 7.9 `components/ui/ReferenceCard.tsx` bileşenini yaz
    - `{ brand, approach, colorLanguage, uiPrinciple, uxNote }` props
    - Her bölüm ayrı etiketle görünür (en az 30 karakter doğrulaması veri katmanında)
    - _Gereksinimler: 8.3_
  - [~] 7.10 `components/sections/ReferencesSection.tsx` sunucu bileşenini yaz
    - H2: "Referans Aldığım Dijital Ürün Standartları"
    - `references.ts` verisinden 5 `ReferenceCard` render
    - `SectionWrapper id="referanslar"`
    - _Gereksinimler: 8.1, 8.2, 8.4_
  - [~] 7.11 `components/sections/CapabilitiesSection.tsx` sunucu bileşenini yaz
    - H2: "Bir Fikirle Geldiğinizde Uçtan Uca Ürün Geliştirme Sürecini Yönetebilirim"
    - `capabilities.ts` verisinden 10 adımı sırayla render; `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
    - Tüm adımlar etkileşim gerekmeksizin görünür
    - `SectionWrapper id="yetenekler"`
    - _Gereksinimler: 9.1, 9.2, 9.3, 9.4_
  - [~] 7.12 `components/ui/PricingCard.tsx` bileşenini yaz
    - `{ name, price, features, recommended, ctaLabel, ctaAction }` props
    - `recommended: true` ise gradient kenarlık + "Önerilen" rozeti
    - CTA düğmesi: string ise smooth scroll, fonksiyon ise onClick
    - `#111827` arka plan, `rgba(255,255,255,0.08)` kenarlık
    - _Gereksinimler: 10.2, 10.3, 10.4_
  - [~] 7.13 `components/sections/PricingSection.tsx` sunucu bileşenini yaz
    - H2 başlık; `pricing.ts` verisinden 3 `PricingCard` render
    - "Teklif Al" CTA → İletişim bölümüne smooth scroll
    - `SectionWrapper id="fiyatlandirma"`
    - _Gereksinimler: 10.1, 10.5_
  - [~] 7.14 `components/ui/ProcessStep.tsx` bileşenini yaz
    - `{ step, title, description }` props; sıra numarası görünür
    - _Gereksinimler: 11.1, 11.2_
  - [~] 7.15 `components/sections/ProcessSection.tsx` sunucu bileşenini yaz
    - H2 başlık; `process.ts` verisinden 4 `ProcessStep` render
    - Adımlar arası ok/çizgi SVG (masaüstü: yatay, mobil: dikey)
    - `SectionWrapper id="surec"`
    - _Gereksinimler: 11.1, 11.3_
  - [~] 7.16 `components/sections/AboutSection.tsx` sunucu bileşenini yaz
    - H2: "Problem Çözmeye Odaklı Yazılım Geliştirici"
    - Zorunlu metin paragrafı; birinci tekil şahıs dili
    - `SectionWrapper id="hakkimda"`
    - _Gereksinimler: 12.1, 12.2, 12.3_
  - [ ]* 7.17 Bölüm bileşenleri için birim testleri yaz
    - HeroSection: H1 içeriği, CTA düğme etiketleri, mockup görsel varlığı
    - ServicesSection: 6 kart sayısı, her kartta icon/title/description
    - PortfolioSection: 5 proje kartı, fallback placeholder davranışı
    - ReferencesSection: 5 marka kartı, her alanda ≥30 karakter
    - CapabilitiesSection: 10 adım sıralı render, tümü görünür
    - PricingSection: 3 kart, Kurumsal önerilen rozeti
    - ProcessSection: 4 adım, ok/çizgi SVG varlığı
    - AboutSection: H2 başlık, zorunlu metin, "biz"/"ekibimiz" yok
    - FloatingMockup: `prefers-reduced-motion` etkinken duration:0
    - _Gereksinimler: 4.1, 4.8, 5.1, 7.3, 8.2, 9.2, 9.4, 10.2, 11.1, 12.1, 12.3_

- [~] 8. Kontrol Noktası — Bölüm Bileşenleri Doğrulaması
  - Tüm bölüm testlerinin geçtiğini doğrula (`npx vitest --run`)
  - TypeScript derleme hatası olmadığını kontrol et (`tsc --noEmit`)
  - Kullanıcıya soru varsa ilet.

- [ ] 9. Property-Based Testler — İçerik Taşması
  - [ ]* 9.1 Dar ekranda içerik taşması property testi yaz
    - **Property 1: Dar Ekranda İçerik Taşması Olmaz**
    - `fc.string({ minLength: 1, maxLength: 500 })` ile `ServiceCard` render; `scrollWidth ≤ clientWidth` ve öğe çakışması yok
    - 100 iterasyon (`numRuns: 100`)
    - **Validates: Requirements 3.4**
    - _Etiket: `Feature: hayb-studio-website, Property 1`_

- [ ] 10. İletişim Formu ve API Route
  - [~] 10.1 `lib/contact-schema.ts` içinde Zod şemasını yaz
    - `contactSchema`: `fullName` (min:2, max:100), `phone` (min:10, regex), `email` (email format), `projectDescription` (min:20, max:2000)
    - `ContactFormData` type export et
    - _Gereksinimler: 13.3, 13.4_
  - [~] 10.2 `app/api/contact/route.ts` Edge Runtime Route Handler yaz
    - `POST /api/contact`; `contactSchema.safeParse` ile doğrulama
    - Başarıda `{ success: true, message: "..." }` 200 yanıtı
    - Hata durumunda `{ success: false, message: "Sunucu hatası oluştu." }` 500 yanıtı
    - _Gereksinimler: 13.5, 13.6_
  - [~] 10.3 `components/ui/ContactForm.tsx` istemci bileşenini yaz
    - `react-hook-form` + `zodResolver(contactSchema)` entegrasyonu
    - `FormStatus` state: `idle | submitting | success | error`
    - `fullName`, `phone`, `email`, `projectDescription` alanları; `htmlFor` eşleşmesi
    - Form hataları `aria-live="polite"` + `role="alert"` ile gösterilir
    - Submit düğmesi 400ms disabled (çift gönderim koruması)
    - Başarıda form gizlenir, başarı mesajı `opacity 0→1` 400ms ile belirir
    - Hata durumunda form korunur, "Tekrar Dene" seçeneği sunulur
    - _Gereksinimler: 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_
  - [~] 10.4 `components/sections/ContactSection.tsx` istemci bileşenini yaz
    - H2: "Projeni Gerçeğe Dönüştürelim"
    - `ContactForm` bileşenini dahil et
    - `SectionWrapper id="iletisim"`
    - _Gereksinimler: 13.1, 13.2_
  - [ ]* 10.5 Zorunlu alan validasyonu property testi yaz
    - **Property 2: Zorunlu Alan Validasyonu Her Kombinasyonda Çalışır**
    - `fc.record({ fullName, phone, email, projectDescription })` — her alan `fc.oneof(fc.constant(''), geçerli değer)` ile üretilir
    - Herhangi bir alan boşsa `contactSchema.safeParse().success === false` doğrula
    - 100 iterasyon
    - **Validates: Requirements 13.3**
    - _Etiket: `Feature: hayb-studio-website, Property 2`_
  - [ ]* 10.6 Geçersiz e-posta reddi property testi yaz
    - **Property 3: Geçersiz E-Posta Her Zaman Reddedilir**
    - `fc.string().filter(s => !s.includes('@') || s.startsWith('@') || s.endsWith('@'))` ile geçersiz e-posta üret
    - `contactSchema.shape.email.safeParse(invalid).success === false` doğrula
    - 100 iterasyon
    - **Validates: Requirements 13.4**
    - _Etiket: `Feature: hayb-studio-website, Property 3`_
  - [ ]* 10.7 `ContactForm` davranış testleri yaz
    - Başarı senaryosu: form submit → success state render, form gizlenir
    - Hata senaryosu: fetch mock 500 → error state + "Tekrar Dene" görünür
    - Çift gönderim: submit sonrası düğme 400ms disabled
    - _Gereksinimler: 13.5, 13.6, 13.7_

- [ ] 11. SEO Yapılandırması
  - [~] 11.1 `app/layout.tsx` içinde Next.js Metadata API ile SEO meta etiketlerini yapılandır
    - `title: 'HAYB | Dijital Ürün Stüdyosu'`
    - `description`: 155 karakter sınırında hizmeti özetleyen metin
    - `openGraph`: `og:title`, `og:description`, `og:image` (`/og-image.png`, 1200×630)
    - `robots: { index: true, follow: true }`
    - `alternates: { canonical: 'https://hayb.dev' }`
    - `locale: 'tr_TR'`
    - _Gereksinimler: 17.1, 17.2, 17.3_
  - [~] 11.2 `app/robots.txt` ve `app/sitemap.ts` dosyalarını oluştur
    - `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://hayb.dev/sitemap.xml`
    - `sitemap.ts`: `MetadataRoute.Sitemap` — URL, `lastModified`, `changeFrequency: 'monthly'`, `priority: 1.0`
    - _Gereksinimler: 17.6_
  - [ ]* 11.3 SEO metadata ve sitemap için birim testleri yaz
    - `title`, `description`, `og:title`, `og:image` değerlerinin doğruluğunu kontrol et
    - `sitemap.ts`: URL ve `changeFrequency` değerlerini doğrula
    - _Gereksinimler: 17.1, 17.2, 17.3, 17.6_

- [ ] 12. Performans Optimizasyonu
  - [~] 12.1 `app/page.tsx` içinde Hero dışındaki bölümleri `next/dynamic` ile lazy yükle
    - `ServicesSection`, `UiUxSection`, `PortfolioSection`, `ReferencesSection`, `CapabilitiesSection`, `PricingSection`, `ProcessSection`, `AboutSection`, `ContactSection` dynamic import
    - _Gereksinimler: 2.8_
  - [~] 12.2 Tüm `next/image` kullanımlarını optimize et
    - Hero mockup: `priority={true}`, `placeholder="blur"`, `blurDataURL`
    - Portfolyo ve UI/UX görselleri: `loading="lazy"` (varsayılan)
    - Tüm görsellere açıklayıcı `alt` metni ekle
    - _Gereksinimler: 17.5_
  - [~] 12.3 `app/page.tsx` ana sayfa bileşenini tamamla — tüm bölümleri sırayla monte et
    - `layout.tsx` içinde root layout, font, global CSS bağlantısı
    - Bölüm sırası: Hero → Hizmetler → UI/UX → Portfolyo → Referanslar → Yetenekler → Fiyatlandırma → Çalışma Süreci → Hakkımda → İletişim
    - `<main>`, `<nav>`, `<footer>` semantik HTML yapısı
    - _Gereksinimler: 2.1, 2.9, 2.10_

- [ ] 13. Lighthouse CI Yapılandırması
  - [~] 13.1 `.lighthouserc.json` veya `lighthouserc.js` yapılandırma dosyasını oluştur
    - Tüm kategoriler için minimum puan eşiği: `performance: 95`, `accessibility: 95`, `best-practices: 95`, `seo: 95`
    - `lhci autorun` komutu için proje URL'si tanımla
    - _Gereksinimler: 2.8_
  - [~] 13.2 `package.json` içine Lighthouse CI ve test script'lerini ekle
    - `"test": "vitest --run"`, `"lhci": "lhci autorun"`, `"type-check": "tsc --noEmit"`
    - _Gereksinimler: 2.8_

- [~] 14. Final Kontrol Noktası — Tam Uygulama Doğrulaması
  - Tüm birim ve property testlerinin geçtiğini doğrula (`npx vitest --run`)
  - TypeScript derleme hatası olmadığını kontrol et (`tsc --noEmit`)
  - H1 başlık tekliği, H2/H3 hiyerarşisi, tüm görsellerin `alt` metni varlığını kontrol et
  - `prefers-reduced-motion` davranışını manuel doğrula
  - Kullanıcıya soru varsa ilet.

---

## Notes

- `*` ile işaretli alt görevler isteğe bağlıdır; MVP için atlanabilir.
- Her görev önceki görevin üzerine inşa edilir; bağımlılıklar sıra numarasıyla belirtilmiştir.
- Property testleri minimum 100 iterasyon (`numRuns: 100`) çalıştırır.
- Tüm animasyonlar `useMotionConfig` hook'u aracılığıyla `prefers-reduced-motion` kontrolü yapılır.
- `next/image` tüm görsellerde zorunludur; ham `<img>` etiketi kullanılmaz.
- TypeScript `strict` mod zorunludur; `any` tip kullanımı yasaktır.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "3.1"] },
    { "id": 1, "tasks": ["2.3", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7"] },
    { "id": 2, "tasks": ["2.4", "5.1", "5.3", "5.4"] },
    { "id": 3, "tasks": ["4.1", "4.2", "5.2", "7.1"] },
    { "id": 4, "tasks": ["4.3", "5.5", "5.6", "7.2", "7.3", "7.5", "7.9", "7.12", "7.14"] },
    { "id": 5, "tasks": ["7.4", "7.6", "7.7", "7.8", "7.10", "7.11", "7.13", "7.15", "7.16"] },
    { "id": 6, "tasks": ["7.17", "9.1", "10.1"] },
    { "id": 7, "tasks": ["10.2", "10.3", "11.1", "11.2"] },
    { "id": 8, "tasks": ["10.4", "10.5", "10.6", "10.7", "11.3"] },
    { "id": 9, "tasks": ["12.1", "12.2"] },
    { "id": 10, "tasks": ["12.3", "13.1"] },
    { "id": 11, "tasks": ["13.2"] }
  ]
}
```
