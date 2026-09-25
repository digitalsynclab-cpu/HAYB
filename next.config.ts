import type { NextConfig } from 'next';

// Yalnızca gerçekten kullanılan kaynaklar. next/font kendi kendine barındırılır; Google alanları yalnızca
// ölçüm kimliği tanımlıysa ve ziyaretçi çerez onayı verdiyse (lib/analytics.ts) kullanılır.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: CSP },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  // Harici görsel kaynağı kullanılmıyor (eski hizliresim izinleri kaldırıldı).
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    // Değişmeyen görseller tarayıcıda önbelleğe alınır: yavaş bağlantıda her açılışta yeniden doğrulanmaz.
    const assetCache = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }];
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/brand/:path*', headers: assetCache },
      { source: '/icon/:path*', headers: assetCache },
      { source: '/images/:path*', headers: assetCache },
    ];
  },
  async redirects() {
    return [
      // Fiyatlandırma sayfası "Paketler" oldu: eski adres kalıcı (301) olarak yeni adrese gider. Eski yönlendirmeler silinmez.
      { source: '/fiyatlandirma', destination: '/paketler', statusCode: 301 },
    ];
  },
};

export default nextConfig;
