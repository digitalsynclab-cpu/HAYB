'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { ORDER_STORAGE_KEY } from '@/lib/order-storage';

const PACKAGE_LABEL = { business: 'Business', professional: 'Professional', premium: 'Premium' } as const;

/**
 * "Bu Tasarımı Kullan": sipariş formuna gider ve şablonu önceden seçer.
 * Seçim form taslağına da yazılır; başka sekmede açık form bilgileri kaybolmadan güncellenir.
 * Hafif tutulur: şablon verisinin tamamını istemciye yüklemez (paket bilgisi dışarıdan verilir).
 */
export function UseTemplateLink({
  slug,
  from,
  code,
  minimumPackage,
  className = '',
  children = 'Bu Tasarımı Kullan',
}: {
  slug: string;
  from: 'template_page' | 'demo';
  code?: string;
  minimumPackage?: keyof typeof PACKAGE_LABEL;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={`/web-sitesi-siparis?template=${encodeURIComponent(slug)}`}
      onClick={() => {
        try {
          const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
          const cur = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
          window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ ...cur, designMode: 'ready', templateSlug: slug, updatedAt: Date.now() }));
        } catch {
          /* depolama kapalıysa ?template= parametresi yeterlidir */
        }
        trackEvent('template_use_click', { templateId: slug, package: minimumPackage, from });
      }}
      title={code && minimumPackage ? `${code} · ${PACKAGE_LABEL[minimumPackage]} ve üzeri paketlerde` : undefined}
      className={className || 'press group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-lime px-5 text-[0.95rem] font-semibold text-ink-950 transition hover:bg-lime-soft'}
    >
      {children} <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
