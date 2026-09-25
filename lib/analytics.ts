/**
 * HAYB Conversion Intelligence: tek noktadan olay gönderimi.
 *
 * Kurallar:
 *  - Ölçüm kimliği (NEXT_PUBLIC_GA_MEASUREMENT_ID) tanımlı değilse hiçbir şey yüklenmez ve gönderilmez.
 *  - Çerez tercihi "kabul" değilse hiçbir şey yüklenmez ve gönderilmez (bkz. components/layout/CookieConsent.tsx).
 *  - Kişisel veri gönderilmez: yalnızca izin verilen anonim/teknik parametreler geçer, e-posta/telefon
 *    benzeri değerler düşürülür.
 *  - Bileşenler doğrudan gtag çağırmaz; yalnızca trackEvent() kullanır. Yarın başka bir sisteme geçilirse
 *    yalnızca bu dosya değişir.
 */

export const GA_ID = process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] ?? '';
export const CONSENT_KEY = 'hayb-cookie';
const ATTR_KEY = 'hayb-attrib';
const PREV_KEY = 'hayb-prev-path';

/** Yalnızca bu anahtarlar gönderilir. Ad, telefon, e-posta, adres gibi alanlar bilerek yoktur. */
export const ALLOWED_PARAMS = [
  'templateId',
  'package',
  'page',
  'source',
  'medium',
  'campaign',
  'from',
  'location',
  'service',
  'project',
  'designMode',
] as const;
type ParamKey = (typeof ALLOWED_PARAMS)[number];
export type EventParams = Partial<Record<ParamKey, string | number | boolean>>;

/** Huni (funnel) olayları. Yeni bir olay eklerken burada tanımlayın. */
export type EventName =
  | 'page_view'
  | 'template_demo_view'
  | 'template_use_click'
  | 'template_selected'
  | 'order_form_start'
  | 'order_form_complete'
  | 'whatsapp_click';

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE = /(?:\+?\d[\s().-]?){9,}/;

/** İzin verilmeyen anahtarları ve kişisel veri gibi görünen değerleri düşürür. */
export function sanitizeParams(params: Record<string, unknown> = {}): EventParams {
  const out: EventParams = {};
  for (const key of ALLOWED_PARAMS) {
    const v = params[key];
    if (v === undefined || v === null) continue;
    if (typeof v === 'string') {
      const s = v.trim().slice(0, 100);
      if (!s || EMAIL.test(s) || PHONE.test(s)) continue;
      out[key] = s;
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      out[key] = v;
    }
  }
  return out;
}

/** İç yolu huni bağlamına çevirir: hangi sayfa türünden geldi? */
export function classifyOrigin(path: string | null | undefined): 'template' | 'project' | 'service' | 'pricing' | 'home' | 'page' {
  if (!path) return 'page';
  if (path.startsWith('/template')) return 'template';
  if (path.startsWith('/projeler')) return 'project';
  if (path.startsWith('/hizmetler')) return 'service';
  if (path.startsWith('/paketler')) return 'pricing';
  if (path === '/') return 'home';
  return 'page';
}

/** Trafik kaynağı: önce UTM, sonra yönlendiren site, yoksa direct. */
export function classifySource(utmSource: string | null, referrerHost: string | null): string {
  const u = (utmSource ?? '').trim().toLowerCase();
  if (u) return u.slice(0, 40);
  const h = (referrerHost ?? '').toLowerCase();
  if (!h) return 'direct';
  if (h.includes('instagram')) return 'instagram';
  if (h.includes('google')) return 'google';
  if (h.includes('whatsapp') || h === 'wa.me') return 'whatsapp';
  if (h.includes('facebook') || h === 'fb.me' || h.includes('fb.com')) return 'facebook';
  if (h.includes('bing')) return 'bing';
  if (h.includes('yandex')) return 'yandex';
  return 'referral';
}

export interface Attribution {
  source: string;
  medium?: string;
  campaign?: string;
}

function safeStorage(kind: 'local' | 'session'): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Oturumun ilk kaynağı (UTM'ler sayfalar arası gezinirken kaybolmasın diye oturumda saklanır). */
export function captureAttribution(): Attribution {
  const ss = safeStorage('session');
  const stored = ss?.getItem(ATTR_KEY);
  const params = new URLSearchParams(window.location.search);
  const hasUtm = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign');
  if (stored && !hasUtm) {
    try {
      return JSON.parse(stored) as Attribution;
    } catch {
      /* bozuk kayıt: yeniden üretilir */
    }
  }
  let host: string | null = null;
  try {
    host = document.referrer ? new URL(document.referrer).hostname : null;
    if (host && host === window.location.hostname) host = null;
  } catch {
    host = null;
  }
  const attr: Attribution = {
    source: classifySource(params.get('utm_source'), host),
    ...(params.get('utm_medium') && { medium: params.get('utm_medium')!.slice(0, 40) }),
    ...(params.get('utm_campaign') && { campaign: params.get('utm_campaign')!.slice(0, 60) }),
  };
  try {
    ss?.setItem(ATTR_KEY, JSON.stringify(attr));
  } catch {
    /* depolama kapalı */
  }
  return attr;
}

/** Bir önceki iç sayfayı (yalnızca yol) saklar: sipariş formunun hangi sayfadan geldiği anlaşılır. */
export function rememberPath(path: string) {
  const ss = safeStorage('session');
  if (!ss) return;
  try {
    const cur = ss.getItem('hayb-cur-path');
    if (cur && cur !== path) ss.setItem(PREV_KEY, cur);
    ss.setItem('hayb-cur-path', path);
  } catch {
    /* depolama kapalı */
  }
}

export function previousPath(): string | null {
  return safeStorage('session')?.getItem(PREV_KEY) ?? null;
}

export function hasAnalyticsConsent(): boolean {
  return safeStorage('local')?.getItem(CONSENT_KEY) === 'accepted';
}

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let loaded = false;

/** GA4 betiğini yalnızca kimlik varsa ve onay verildiyse yükler. Birden çok çağrı güvenlidir. */
export function loadAnalytics(): boolean {
  if (!GA_ID || loaded || typeof window === 'undefined' || !hasAnalyticsConsent()) return loaded;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  window.gtag('js', new Date());
  // Reklam kişiselleştirme ve Google sinyalleri kapalı; sayfa görüntüleme yönlendirici bileşenden gönderilir.
  window.gtag('config', GA_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
  loaded = true;
  return true;
}

/** Onay geri çekilirse ölçümü durdurur. */
export function disableAnalytics() {
  if (!GA_ID || typeof window === 'undefined') return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
}

/** Tek olay gönderim noktası. Kimlik yoksa veya onay yoksa sessizce hiçbir şey yapmaz. */
export function trackEvent(name: EventName, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !GA_ID || !hasAnalyticsConsent()) return;
  if (!loaded && !loadAnalytics()) return;
  const attr = captureAttribution();
  const clean = sanitizeParams({
    source: attr.source,
    medium: attr.medium,
    campaign: attr.campaign,
    ...params,
  });
  window.gtag?.('event', name, clean);
}
