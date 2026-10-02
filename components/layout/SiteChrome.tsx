'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * /partner/* altında yalnızca bu sayfalar PUBLIC'tir (HAYB site çerçevesini korur).
 * Bunların dışındaki HER /partner/... sayfası varsayılan olarak authenticated kabul
 * edilir ve chrome gizlenir — yeni bir partner panel sayfası eklendiğinde bu listeye
 * dokunmaya gerek yoktur, otomatik olarak doğru davranır (eski liste-tabanlı yaklaşım
 * yeni sayfa eklendiğinde unutulup public navbar'ın panelde sızmasına neden oluyordu).
 */
const PUBLIC_PARTNER_PREFIXES = ['/partner/basvuru', '/partner/giris'];

function isPublicPartnerPath(pathname: string): boolean {
  if (pathname === '/partner') return true;
  return PUBLIC_PARTNER_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Şu sayfalarda HAYB site çerçevesi (menü, alt bilgi, açılış, asistan) gösterilmez:
 * - /template/webN şablon demo sayfaları
 * - /secretadmin/* — kendi başlığı/navigasyonu olan admin paneli
 * - /partner/* altında public olmayan HER sayfa — kendi başlığı/navigasyonu olan partner paneli
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (/^\/template\/.+/.test(pathname)) return null;
  if (/^\/secretadmin(\/.*)?$/.test(pathname)) return null;
  if (pathname.startsWith('/partner') && !isPublicPartnerPath(pathname)) return null;
  return <>{children}</>;
}
