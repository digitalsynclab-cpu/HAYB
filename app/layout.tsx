import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'HAYB | Dijital Ürün Stüdyosu',
  description:
    'Web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım ürünleri geliştiriyorum. Premium dijital ürün stüdyosu.',
  openGraph: {
    title: 'HAYB | Dijital Ürün Stüdyosu',
    description:
      'Fikirleri gerçek dijital ürünlere dönüştürüyorum. Web, mobil, AI ve özel yazılım geliştirme.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HAYB Dijital Ürün Stüdyosu' }],
    locale: 'tr_TR',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.hayb.com.tr' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
