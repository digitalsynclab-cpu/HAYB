'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GA_ID, captureAttribution, classifyOrigin, disableAnalytics, hasAnalyticsConsent, loadAnalytics, previousPath, rememberPath, trackEvent } from '@/lib/analytics';

/**
 * Ölçümleme köprüsü. Ölçüm kimliği yoksa veya ziyaretçi çerez onayı vermediyse hiçbir betik yüklenmez.
 * Görevleri: onay olayını dinlemek, sayfa görüntülemelerini göndermek, WhatsApp bağlantı tıklamalarını saymak
 * ve trafik kaynağını (UTM / yönlendiren site) oturum boyunca korumak.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    if (!GA_ID) return;

    const onChoice = (e: Event) => {
      const choice = (e as CustomEvent<string>).detail;
      if (choice === 'accepted') {
        if (loadAnalytics()) trackEvent('page_view', { page: window.location.pathname });
      } else {
        disableAnalytics();
      }
    };
    window.addEventListener('hayb:cookie-choice', onChoice);
    if (hasAnalyticsConsent()) loadAnalytics();

    // Sitedeki tüm wa.me bağlantıları: sipariş formu gibi kendi olayını gönderenler data-track-skip ile hariç tutulur.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a || a.hasAttribute('data-track-skip')) return;
      const href = a.getAttribute('href') ?? '';
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        trackEvent('whatsapp_click', { location: 'link', from: classifyOrigin(window.location.pathname), page: window.location.pathname });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('hayb:cookie-choice', onChoice);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  useEffect(() => {
    rememberPath(pathname);
    if (!GA_ID) return;
    // Başlık (document.title) yeni sayfaya güncellensin diye kısa bir bekleme.
    const t = window.setTimeout(() => trackEvent('page_view', { page: pathname, from: classifyOrigin(previousPath()) }), 150);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
