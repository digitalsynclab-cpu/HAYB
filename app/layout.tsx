import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
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
import { CampaignPopup } from '@/components/layout/CampaignPopup';
import { AssistantLoader } from '@/components/assistant/AssistantLoader';
import { EntityBlock } from '@/components/schema/EntityBlock';
import { Analytics } from '@/components/analytics/Analytics';

const googleVerification = process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'];
const bingVerification = process.env['NEXT_PUBLIC_BING_SITE_VERIFICATION'];

// Türkçe karakterler (ş, ğ, ı, İ) için latin-ext zorunlu.
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Ana sayfa başlığı ve açıklaması mevcut indekslenmiş değerlerle aynı tutuldu.
  title: {
    default: 'HAYB | Dijital Ürün Stüdyosu',
    template: '%s | HAYB',
  },
  description:
    'Web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım ürünleri geliştiriyoruz. Premium dijital ürün stüdyosu.',
  applicationName: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  openGraph: {
    title: 'HAYB | Dijital Ürün Stüdyosu',
    description: 'Fikirleri gerçek dijital ürünlere dönüştürüyoruz. Web, mobil, AI ve özel yazılım geliştirme.',
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HAYB Dijital Ürün Stüdyosu' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAYB | Dijital Ürün Stüdyosu',
    description: 'Fikirleri gerçek dijital ürünlere dönüştürüyoruz.',
    images: ['/og-image.png'],
  },
  // Doğrulama etiketleri yalnızca env tanımlıysa basılır (Search Console / Bing Webmaster henüz kurulmadı).
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
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="font-sans">
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
          <CampaignPopup />
          <CartPanel />
          <AssistantLoader />
        </SiteChrome>
        </CartProvider>
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
