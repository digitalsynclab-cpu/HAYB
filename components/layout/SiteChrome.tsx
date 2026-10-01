'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const PARTNER_DASHBOARD_PREFIXES = [
  '/partner/panel',
  '/partner/leads',
  '/partner/satislar',
  '/partner/satis-olustur',
  '/partner/satis-rehberi',
  '/partner/musteri-datasi',
  '/partner/bildirimler',
  '/partner/kazanc',
  '/partner/profil',
  '/partner/materyaller',
  '/partner/destek',
];

/**
 * Şu sayfalarda HAYB site çerçevesi (menü, alt bilgi, açılış, asistan) gösterilmez:
 * - /template/webN şablon demo sayfaları
 * - /secretadmin/* — kendi başlığı/navigasyonu olan admin paneli
 * - /partner panel içi sayfalar (panel, leads, satışlar, kazanç, profil, materyaller, destek)
 *   — kendi başlığı/navigasyonu olan partner paneli. Public /partner, /partner/basvuru,
 *   /partner/giris sayfaları normal site çerçevesini korur.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (/^\/template\/.+/.test(pathname)) return null;
  if (/^\/secretadmin(\/.*)?$/.test(pathname)) return null;
  if (PARTNER_DASHBOARD_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
