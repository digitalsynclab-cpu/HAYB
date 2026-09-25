import { templates, type MinimumPackage } from '@/data/templates';
import { templateUrl } from '@/data/template-paths';
import { ORDER_STORAGE_KEY, ORDER_TTL_MS } from '@/lib/order-storage';

export { ORDER_STORAGE_KEY, ORDER_TTL_MS };
import { whatsappUrl } from '@/data/site';

/** Web sitesi sipariş formu: veri modeli, doğrulama, paket kuralları ve WhatsApp mesajı. Sunucuya veri gönderilmez. */


export type Tri = 'yes' | 'no' | 'unknown';
export type PackageId = 'starter' | 'business' | 'professional' | 'premium' | 'eticaret-start' | 'eticaret-growth' | 'eticaret-elite';
export type PackageChoice = PackageId | 'unknown' | '';

export interface WebsiteOrderForm {
  step: number;
  updatedAt: number;

  businessName: string;
  sector: string;
  businessDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;

  hasWebsite: 'yes' | 'no' | '';
  websiteUrl: string;
  hasDomain: Tri | '';
  domain: string;
  hasHosting: Tri | '';
  hostingProvider: string;

  pages: string[];
  pagesOther: string;
  services: string;

  hasLogo: 'yes' | 'no' | '';
  designMode: 'custom' | 'ready' | '';
  packageChoice: PackageChoice;
  templateSlug: string;
  referenceWebsites: string[];

  specialRequests: string[];
  specialOther: string;
  additionalNotes: string;

  consent: boolean;
}

export const STEPS = [
  { id: 'business', label: 'İşletmeniz', title: 'İşletmenizi tanıyalım.' },
  { id: 'website', label: 'Web Siteniz', title: 'Web siteniz ve alan adınız.' },
  { id: 'content', label: 'İçerik ve Sayfalar', title: 'Sitenizde neleri göstermek istiyorsunuz?' },
  { id: 'design', label: 'Tasarım', title: 'Tasarım tercihiniz.' },
  { id: 'requests', label: 'Özel İstekler', title: 'Özellikle istediğiniz bir şey var mı?' },
  { id: 'review', label: 'Kontrol ve Gönder', title: 'Bilgilerinizi kontrol edin.' },
] as const;
export const REVIEW_STEP = STEPS.length - 1;

export const SECTOR_SUGGESTIONS = [
  'Restoran', 'Kafe', 'Tekstil', 'Hukuk', 'Emlak', 'Sağlık', 'Diş Kliniği', 'Otomotiv', 'E-ticaret', 'İnşaat',
  'Mimarlık', 'Güzellik ve Bakım', 'Spor Salonu', 'Eğitim', 'Yazılım', 'Turizm ve Otel', 'Mobilya', 'Kuaför',
];

export const PAGE_OPTIONS = [
  'Ana Sayfa', 'Hakkımızda', 'Hizmetler', 'Ürünler', 'Referanslar / Projeler', 'Blog', 'İletişim', 'Sık Sorulan Sorular', 'Galeri',
] as const;
export const OTHER_PAGE = 'Diğer';

export const SPECIAL_REQUEST_OPTIONS = ['WhatsApp', 'Randevu', 'Teklif Formu', 'Online Ödeme', 'Çoklu Dil', 'Ürün Kataloğu', 'Blog', 'Özel Bir İstek'] as const;

/** Paketler sayfasındaki karşılaştırma tablosuyla tutarlı bilgi notları (özel istek seçildiğinde gösterilir). */
export const REQUEST_PACKAGE_NOTES: Record<string, string> = {
  'Online Ödeme': 'Online ödeme için e-ticaret paketi seçmelisiniz.',
  'Çoklu Dil': 'Çoklu dil desteği Premium pakette yer alır.',
  Blog: 'Blog sistemi Business ve üzeri paketlerde yer alır.',
  'Teklif Formu': 'Teklif formu Business ve üzeri paketlerde yer alır.',
};

export const PACKAGE_OPTIONS: { id: PackageId; label: string }[] = [
  { id: 'starter', label: 'Starter' },
  { id: 'business', label: 'Business' },
  { id: 'professional', label: 'Professional' },
  { id: 'premium', label: 'Premium' },
  { id: 'eticaret-start', label: 'E-Ticaret Start' },
  { id: 'eticaret-growth', label: 'E-Ticaret Growth' },
  { id: 'eticaret-elite', label: 'E-Ticaret Elite' },
];

const PACKAGE_RANK: Record<PackageId, number> = { starter: 0, business: 1, professional: 2, premium: 3, 'eticaret-start': 1, 'eticaret-growth': 2, 'eticaret-elite': 3 };
const MIN_RANK: Record<MinimumPackage, number> = { business: 1, professional: 2, premium: 3 };
const MIN_LABEL: Record<MinimumPackage, string> = { business: 'Business', professional: 'Professional', premium: 'Premium' };

export const minimumPackageLabel = (m: MinimumPackage) => MIN_LABEL[m];
export const packageLabel = (p: PackageId) => PACKAGE_OPTIONS.find((o) => o.id === p)?.label ?? p;

export type Availability = 'available' | 'locked' | 'unknown';

/**
 * Paket seçildiyse yalnızca uygun şablonlar açıktır. Starter pakette hazır tasarım kullanılamaz.
 * Paket henüz seçilmediyse şablon seçilebilir ("unknown"); gereken paket özette ve mesajda belirtilir.
 */
export function templateAvailability(min: MinimumPackage, choice: PackageChoice): Availability {
  if (choice === '' || choice === 'unknown') return 'unknown';
  return PACKAGE_RANK[choice] >= MIN_RANK[min] ? 'available' : 'locked';
}

export function lockedMessage(min: MinimumPackage, choice: PackageChoice): string {
  if (choice === 'starter') return 'Hazır tasarım seçenekleri Business paketi ve üzerindeki projelerde kullanılabilir.';
  return `Bu tasarım ${MIN_LABEL[min]} paket ve üzeri projelerde kullanılabilir.`;
}

/** Seçilen paket e-ticaret paketi mi? (Online Ödeme uyarısı için) */
export const isEcommercePackage = (c: PackageChoice) => c.startsWith('eticaret-');

export const templateBySlugSafe = (slug: string) => templates.find((t) => t.slug === slug);

export function emptyOrder(): WebsiteOrderForm {
  return {
    step: 0,
    updatedAt: Date.now(),
    businessName: '',
    sector: '',
    businessDescription: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    hasWebsite: '',
    websiteUrl: '',
    hasDomain: '',
    domain: '',
    hasHosting: '',
    hostingProvider: '',
    pages: ['Ana Sayfa'],
    pagesOther: '',
    services: '',
    hasLogo: '',
    designMode: '',
    packageChoice: '',
    templateSlug: '',
    referenceWebsites: [''],
    specialRequests: [],
    specialOther: '',
    additionalNotes: '',
    consent: false,
  };
}

/** Saklanan taslağı güvenle okur: bozuk, eski veya süresi dolmuş kayıt yok sayılır. */
export function parseStoredOrder(raw: string | null, now = Date.now()): WebsiteOrderForm | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as Partial<WebsiteOrderForm>;
    if (!o || typeof o !== 'object') return null;
    if (typeof o.updatedAt !== 'number' || now - o.updatedAt > ORDER_TTL_MS) return null;
    const base = emptyOrder();
    const merged = { ...base, ...o } as WebsiteOrderForm;
    // Tür güvenliği: dizi alanları dizi kalmalı.
    if (!Array.isArray(merged.pages)) merged.pages = base.pages;
    if (!Array.isArray(merged.specialRequests)) merged.specialRequests = [];
    if (!Array.isArray(merged.referenceWebsites) || merged.referenceWebsites.length === 0) merged.referenceWebsites = [''];
    merged.step = Number.isInteger(merged.step) ? Math.min(Math.max(merged.step, 0), REVIEW_STEP) : 0;
    if (merged.templateSlug && !templateBySlugSafe(merged.templateSlug)) merged.templateSlug = '';
    return merged;
  } catch {
    return null;
  }
}

/* ───────────── Doğrulama ───────────── */

export type Errors = Partial<Record<keyof WebsiteOrderForm | 'consent', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digits = (s: string) => s.replace(/\D/g, '');

/** Zorunlu alanlar: işletme adı, sektör, kısa tanım, telefon, e-posta, mevcut site durumu, alan adı durumu. */
export function validateStep(f: WebsiteOrderForm, step: number): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (f.businessName.trim().length < 2) e.businessName = 'İşletme veya marka adını yazın.';
    if (f.sector.trim().length < 2) e.sector = 'Sektörünüzü yazın.';
    if (f.businessDescription.trim().length < 10) e.businessDescription = 'Ne iş yaptığınızı kısaca anlatın (en az 10 karakter).';
    if (digits(f.phone).length < 10) e.phone = 'Geçerli bir telefon numarası girin.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Geçerli bir e-posta adresi girin.';
    if (f.whatsapp.trim() && digits(f.whatsapp).length < 10) e.whatsapp = 'WhatsApp numarasını 10 haneli olarak girin ya da boş bırakın.';
  }
  if (step === 1) {
    if (!f.hasWebsite) e.hasWebsite = 'Mevcut web sitenizin olup olmadığını seçin.';
    if (!f.hasDomain) e.hasDomain = 'Alan adı durumunuzu seçin.';
  }
  if (step === 3 && f.designMode === 'ready' && f.templateSlug) {
    const t = templateBySlugSafe(f.templateSlug);
    if (t && templateAvailability(t.minimumPackage, f.packageChoice) === 'locked') e.templateSlug = lockedMessage(t.minimumPackage, f.packageChoice);
  }
  if (step === REVIEW_STEP && !f.consent) e.consent = 'Devam etmek için KVKK Aydınlatma Metni’ni onaylayın.';
  return e;
}

/** Tüm adımları denetler; ilk hatalı adımı döndürür (gönderimde oraya gidilir). */
export function validateAll(f: WebsiteOrderForm): { errors: Errors; firstStep: number | null } {
  let errors: Errors = {};
  let firstStep: number | null = null;
  for (let s = 0; s < STEPS.length; s++) {
    const e = validateStep(f, s);
    if (Object.keys(e).length > 0) {
      errors = { ...errors, ...e };
      if (firstStep === null) firstStep = s;
    }
  }
  return { errors, firstStep };
}

/** Alan adı hata mesajı olan ilk alanın kimliği (kaydırma/odak için). */
export const FIELD_ID: Record<string, string> = {
  businessName: 'wo-businessName',
  sector: 'wo-sector',
  businessDescription: 'wo-businessDescription',
  phone: 'wo-phone',
  whatsapp: 'wo-whatsapp',
  email: 'wo-email',
  hasWebsite: 'wo-hasWebsite',
  hasDomain: 'wo-hasDomain',
  templateSlug: 'wo-templates',
  consent: 'wo-consent',
};

/* ───────────── WhatsApp mesajı ───────────── */

const LINE = '━━━━━━━━━━━━━━━━';

const triText = (v: Tri | '') => (v === 'yes' ? 'Var' : v === 'no' ? 'Yok' : v === 'unknown' ? 'Emin değilim' : 'Belirtilmedi');
const clean = (s: string) => s.trim().replace(/\s+\n/g, '\n');
const bullets = (items: string[]) => items.map((i) => `• ${i}`).join('\n');

const normalizeUrl = (u: string) => {
  const s = u.trim();
  if (!s) return '';
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

export function selectedPages(f: WebsiteOrderForm): string[] {
  const list = f.pages.filter((p) => p !== OTHER_PAGE);
  if (f.pages.includes(OTHER_PAGE)) list.push(f.pagesOther.trim() ? `Diğer: ${f.pagesOther.trim()}` : 'Diğer');
  return list;
}

export function selectedRequests(f: WebsiteOrderForm): string[] {
  const list = f.specialRequests.filter((r) => r !== 'Özel Bir İstek');
  if (f.specialRequests.includes('Özel Bir İstek')) list.push(f.specialOther.trim() ? `Özel istek: ${f.specialOther.trim()}` : 'Özel bir istek');
  return list;
}

export function referenceList(f: WebsiteOrderForm): string[] {
  return f.referenceWebsites.map(normalizeUrl).filter(Boolean);
}

/**
 * Tüm form verisini okunaklı, bölümlü bir WhatsApp metnine çevirir.
 * Seçilen hazır tasarım için "WEB 04" gibi kod DEĞİL, yalnızca tam adres gönderilir.
 * Şifre, hesap bilgisi gibi hiçbir gizli veri toplanmaz.
 */
export function buildWebsiteOrderWhatsAppMessage(f: WebsiteOrderForm): string {
  const out: string[] = [];
  out.push('HAYB WEB SİTESİ PROJE TALEBİ', '', 'Merhaba HAYB,', 'web sitesi projem için aşağıdaki bilgileri iletmek istiyorum.');

  const biz = [
    `İşletme / Marka:\n${clean(f.businessName)}`,
    `Sektör:\n${clean(f.sector)}`,
    `İşletme Tanımı:\n${clean(f.businessDescription)}`,
    `Telefon:\n${clean(f.phone)}`,
    ...(f.whatsapp.trim() ? [`WhatsApp:\n${clean(f.whatsapp)}`] : []),
    `E-posta:\n${clean(f.email)}`,
    ...(f.address.trim() ? [`Adres:\n${clean(f.address)}`] : []),
  ];
  out.push('', LINE, '', 'İŞLETME BİLGİLERİ', '', biz.join('\n\n'));

  const web: string[] = [];
  web.push(`Mevcut web sitesi:\n${f.hasWebsite === 'yes' ? normalizeUrl(f.websiteUrl) || 'Var' : f.hasWebsite === 'no' ? 'Yok' : 'Belirtilmedi'}`);
  web.push(`Domain:\n${f.hasDomain === 'yes' ? (f.domain.trim() ? `Var — ${clean(f.domain)}` : 'Var') : triText(f.hasDomain)}`);
  web.push(`Hosting:\n${f.hasHosting === 'yes' ? (f.hostingProvider.trim() ? `Var — ${clean(f.hostingProvider)}` : 'Var') : triText(f.hasHosting)}`);
  out.push('', LINE, '', 'WEB SİTESİ', '', web.join('\n\n'));

  const pages = selectedPages(f);
  const content: string[] = [];
  if (pages.length) content.push(`İstenen Sayfalar:\n${bullets(pages)}`);
  const svc = f.services
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (svc.length) content.push(`Hizmet / Ürünler:\n${bullets(svc)}`);
  if (content.length) out.push('', LINE, '', 'SİTE İÇERİĞİ', '', content.join('\n\n'));

  const design: string[] = [];
  design.push(`Logo:\n${f.hasLogo === 'yes' ? 'Var' : f.hasLogo === 'no' ? 'Yok' : 'Belirtilmedi'}`);
  if (f.designMode) design.push(`Tasarım Tercihi:\n${f.designMode === 'ready' ? 'Hazır tasarım' : 'Özel tasarım'}`);
  if (f.designMode === 'ready' && f.packageChoice && f.packageChoice !== 'unknown') design.push(`Düşünülen Paket:\n${packageLabel(f.packageChoice)}`);
  const refs = referenceList(f);
  if (refs.length) design.push(`Referans Web Siteleri:\n${refs.join('\n')}`);
  out.push('', LINE, '', 'TASARIM', '', design.join('\n\n'));

  const tpl = f.designMode === 'ready' ? templateBySlugSafe(f.templateSlug) : undefined;
  if (tpl) {
    // Yalnızca tam adres: "WEB 04" gibi kod tek başına gönderilmez.
    const lines = [templateUrl(tpl.slug)];
    if (templateAvailability(tpl.minimumPackage, f.packageChoice) === 'unknown') {
      lines.push('', `Not: Bu tasarım ${MIN_LABEL[tpl.minimumPackage]} paket ve üzeri projelerde kullanılabilir.`);
    }
    out.push('', LINE, '', 'SEÇİLEN TASARIM', '', lines.join('\n'));
  }

  const reqs = selectedRequests(f);
  if (reqs.length) out.push('', LINE, '', 'ÖZEL İSTEKLER', '', bullets(reqs));

  if (f.additionalNotes.trim()) out.push('', LINE, '', 'EK NOT', '', clean(f.additionalNotes));

  out.push('', LINE, '', 'Web sitesi projem için iletişime geçebilirsiniz.', '', 'HAYB', 'Fikirleri Gerçek Dijital Ürünlere Dönüştürüyoruz.');
  return out.join('\n');
}

export function websiteOrderWhatsAppUrl(f: WebsiteOrderForm): string {
  return whatsappUrl(buildWebsiteOrderWhatsAppMessage(f));
}

/**
 * Şablon galerisinden "Bu Tasarımı Kullan": seçimi form taslağına yazar. Açık başka bir sipariş sekmesi
 * bu değişikliği "storage" olayıyla alır; form bilgileri korunur.
 */
export function selectTemplateForOrder(slug: string): void {
  if (!templateBySlugSafe(slug)) return;
  try {
    const cur = parseStoredOrder(window.localStorage.getItem(ORDER_STORAGE_KEY)) ?? emptyOrder();
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ ...cur, designMode: 'ready', templateSlug: slug, updatedAt: Date.now() }));
  } catch {
    /* depolama kapalıysa ?template= parametresi yeterlidir */
  }
}
