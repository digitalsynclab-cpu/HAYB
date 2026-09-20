'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/** Şablon demo sayfalarında (/template/webN) HAYB site çerçevesi (menü, alt bilgi, açılış, asistan) gösterilmez. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (/^\/template\/.+/.test(pathname)) return null;
  return <>{children}</>;
}
