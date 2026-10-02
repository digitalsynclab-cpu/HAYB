import { NextResponse } from 'next/server';

/**
 * /partner sayfaları için ayrı manifest route'u.
 * Next.js'in app/manifest.ts dosya konvansiyonu yalnızca kökte çalıştığından,
 * /partner altına "Ana Ekrana Ekle" ile eklenirken start_url'ün site ana sayfasına
 * değil /partner/giris'e gitmesi için ayrı bir route handler kullanılıyor.
 */
export function GET() {
  return NextResponse.json(
    {
      name: 'HAYB Partner',
      short_name: 'HAYB Partner',
      description: 'HAYB Partner paneline hızlı erişim.',
      start_url: '/partner/giris',
      scope: '/partner',
      display: 'standalone',
      background_color: '#111111',
      theme_color: '#111111',
      lang: 'tr',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    { headers: { 'Content-Type': 'application/manifest+json' } }
  );
}
