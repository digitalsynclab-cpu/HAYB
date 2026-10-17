import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { IntroSplash } from '@/components/layout/IntroSplash';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { CartProvider } from '@/lib/cart-context';
import { CartPanel } from '@/components/pricing/CartPanel';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { ContactFab } from '@/components/contact/ContactFab';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { LanguageModal } from '@/components/i18n/LanguageSwitcher';
import { EntityBlock } from '@/components/schema/EntityBlock';
import { Analytics } from '@/components/analytics/Analytics';

// Search Console doğrulama kodu herkese açıktır (sayfa kaynağında görünür); env tanımlıysa o kullanılır.
const googleVerification = process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'] || 'KgvAc16VDQQPQuv7H1Vb4EkKrFooCxfcmRqugcfqBvM';
const bingVerification = process.env['NEXT_PUBLIC_BING_SITE_VERIFICATION'];

// Türkçe karakterler (ş, ğ, ı, İ) için latin-ext zorunlu.
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

// Başlıklar ve giriş metinleri Montserrat; gövde metni okunaklılık için Inter.
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Ana sayfa başlığı: aranan kelimeler (Bursa, web tasarım, e-ticaret) + başlangıç fiyatı.
  title: {
    default: 'HAYB | Bursa Web Tasarım, E-Ticaret ve Yazılım Stüdyosu',
    template: '%s | HAYB',
  },
  description:
    'Bursa’da web sitesi, e-ticaret, mobil uygulama ve özel yazılım. Web sitesi paketleri 5.000 ₺’den başlar, 3 günde teslim. Ücretsiz teklif alın.',
  applicationName: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  openGraph: {
    title: 'HAYB | Bursa Web Tasarım, E-Ticaret ve Yazılım Stüdyosu',
    description: 'Bursa’da web sitesi, e-ticaret, mobil uygulama ve özel yazılım. Web sitesi paketleri 5.000 ₺’den başlar, 3 günde teslim. Ücretsiz teklif alın.',
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HAYB Dijital Ürün Stüdyosu' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAYB | Bursa Web Tasarım, E-Ticaret ve Yazılım Stüdyosu',
    description: 'Bursa’da web sitesi, e-ticaret, mobil uygulama ve özel yazılım. Web sitesi paketleri 5.000 ₺’den başlar, 3 günde teslim. Ücretsiz teklif alın.',
    images: ['/og-image.png'],
  },
  // Search Console doğrulaması (Bing Webmaster, Search Console'dan içe aktarılabilir).
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { 'msvalidate.01': bingVerification } }),
    },
  }),
};

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'dark light',
};

// Yalnızca sabit bir metin. Animasyonlar her zaman açıktır; reveal başlangıç durumunu ekler.
// Paket yüklenemezse 4 sn sonra sınıf kaldırılır ve içerik görünür kalır.
const revealBootstrap = `(function(d,w){try{var e=d.documentElement;e.classList.add('js-reveal');if(w.location.pathname.indexOf('/template/')!==0)e.classList.add('intro-active');w.setTimeout(function(){if(!w.__haybReveal)e.classList.remove('js-reveal');e.classList.remove('intro-active')},4500)}catch(_){}})(document,window);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="font-sans">
        <LocaleProvider>
        <CartProvider>
        <SiteChrome>
        <IntroSplash />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-3 focus:font-semibold focus:text-ink-950"
        >
          İçeriğe geç
        </a>
        <Navbar />
        </SiteChrome>
        <main id="icerik">{children}</main>
        <SiteChrome>
          <EntityBlock />
          <Footer />
          <CookieConsent />
          <CartPanel />
          <ContactFab />
          <LanguageModal />
        </SiteChrome>
        </CartProvider>
        </LocaleProvider>
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
