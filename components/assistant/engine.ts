import { priceWithList } from '@/data/campaign';
import {
  webPackages,
  webPricingRows,
  socialMediaPlans,
  qrMenuPlans,
  logoPlan,
  adsTerms,
  adsTotalLabel,
  specialProjectFeatures,
} from '@/data/pricing';
import { projects, GAME } from '@/data/projects';
import { campaign } from '@/data/campaign';
import { templates } from '@/data/templates';
import { panelSamples } from '@/data/panels';
import { site } from '@/data/site';

/**
 * Asistan motoru (saf fonksiyonlar, test edilebilir).
 * Fiyat ve paket bilgisi data/pricing.ts'den üretilir; metin içinde elle fiyat tutulmaz.
 */

/** Türkçe'ye duyarlı küçük harf + aksan/ı katlama: "İletişim" → "iletisim". */
export function normalize(input: string): string {
  return input
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const row = (label: string) => webPricingRows.find((r) => r.label === label);
const cell = (r: ReturnType<typeof row>, id: string) => (r ? (r as unknown as Record<string, string | boolean>)[id] : undefined);

const webAnswer = () =>
  'Web sitesi paketlerimiz:\n\n' +
  webPackages
    .map((p) => {
      const days = cell(row('Teslim Süresi'), p.id);
      const pages = cell(row('Sayfa Sayısı'), p.id);
      const domain = cell(row('Alan Adı (Ücretsiz)'), p.id);
      return `• ${p.name} – ${priceWithList(p.price)}${p.recommended ? ' (Önerilen)' : ''}: ${days} teslim, ${pages}, ${domain} alan adı.`;
    })
    .join('\n') +
  '\n\nTüm paketlerde SSL, mobil uyum ve WhatsApp entegrasyonu vardır. Ayrıntılar için Fiyatlandırma sayfasına bakabilirsiniz.';

const plansAnswer = (title: string, plans: { name: string; price: string; recommended: boolean; features: string[] }[]) =>
  `${title}\n\n` +
  plans.map((p) => `• ${p.name} – ${priceWithList(p.price)}${p.recommended ? ' (Önerilen)' : ''}: ${p.features.slice(0, 3).join(', ')}.`).join('\n');

const deliveryAnswer = () => {
  const r = row('Teslim Süresi');
  return (
    'Web sitesi teslim süreleri pakete göre değişir:\n' +
    webPackages.map((p) => `• ${p.name}: ${cell(r, p.id)}`).join('\n') +
    '\n\nDiğer hizmetlerde süre, projenin kapsamına göre belirlenir.'
  );
};

const domainAnswer = () => {
  const r = row('Alan Adı (Ücretsiz)');
  return 'Alan adı (domain) paketlere dahildir:\n' + webPackages.map((p) => `• ${p.name}: ${cell(r, p.id)}`).join('\n');
};

interface Topic {
  id: string;
  /** Anahtar kelimeler normalize edilmiş halde (ascii, küçük harf) */
  keywords: string[];
  /** Bu konuyu açıkça belirten kelimeler: en yüksek ağırlık */
  strong?: string[];
  /** Genel kelimeler düşük ağırlık taşır */
  weak?: string[];
  answer: () => string;
}

// Eşit skorda listede önce gelen kazanır: mobil oyun ve mobil uygulama öncelikli.
export const TOPICS: Topic[] = [
  {
    id: 'game',
    keywords: ['mobil oyun', 'oyun', 'game', 'bb block', 'bbblock', 'puzzle', 'app store', 'google play', 'play store'],
    answer: () =>
      `Mobil oyun geliştiriyoruz: oyun tasarımından iOS ve Android geliştirmeye, mağaza yayınına kadar uçtan uca.\n\nYayındaki oyunumuz ${GAME.name}:\n• App Store: ${GAME.appStore}\n• Google Play: ${GAME.googlePlay}\n\nFiyat, oyunun kapsamına göre belirlenir; ücretsiz keşif görüşmesi yapılır.`,
  },
  {
    id: 'mobile',
    keywords: ['mobil uygulama', 'mobil', 'uygulama', 'ios', 'android', 'react native', 'iphone', 'taleb', 'ekotakip', 'bebekler soruyor', 'bebeklersoruyor'],
    answer: () =>
      `Mobil uygulama en çok yaptığımız işlerden biri. iOS ve Android için tasarım, geliştirme ve mağaza yayını dahil:\n\n• Giriş, profil, arama, bildirim gibi temel ekranlar\n• Ödeme entegrasyonu (iyzico, Stripe), harita ve konum servisleri\n• App Store ve Google Play yayını, sonrasında güncelleme ve destek\n\nÖrnekler:\n• BebeklerSoruyor: ebeveynler için soru-cevap topluluğu\n• EkoTakip Pro: bir müşterimiz için özel geliştirdiğimiz, yalnızca kendi cihazında çalışan bireysel ve işletme gelir-gider takip uygulaması (raporlama ve yapay zekâ analizi var)\n• Taleb-e: öğrencilerin burs talebi oluşturduğu, bağışçıların güvenle destek olduğu uygulama\n• Mobil oyunumuz ${GAME.name}\n\nUygulamaların ekran görüntülerini /projeler sayfasında tek tek inceleyebilirsiniz. Fiyat kapsama göre belirlenir; ücretsiz keşif görüşmesi yapılır.`,
  },
  {
    id: 'campaign',
    keywords: ['kampanya', 'indirim', 'indirimli', 'firsat', 'ucuz', 'promosyon'],
    strong: ['indirim', 'kampanyali', 'kampanya var', 'kampanya ne'],
    answer: () => {
      const end = new Date(campaign.endsAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul' });
      return `${campaign.title}: web sitesi, sosyal medya, QR menü, logo ve reklam yönetimi paketlerinde %${campaign.rate} indirim vardır. Kampanya ${end} tarihine kadar geçerlidir.\n\nÖrnek: Starter web sitesi ${priceWithList(webPackages[0].price)}.\n\nTüm kampanyalı fiyatlar /fiyatlandirma sayfasında.`;
    },
  },
  {
    id: 'templates',
    keywords: ['sablon', 'sablonlari', 'sablonlar', 'template', 'ornek site', 'ornek web', 'demo site', 'canli dene', 'canli test'],
    strong: ['sablon', 'template'],
    answer: () =>
      'Canlı deneyebileceğiniz 8 örnek web sitesi şablonumuz var (menü, sepet, filtre ve formlar gerçekten çalışır; markalar kurgusaldır):\n\n' +
      templates.map((t) => `• ${t.brand} (${t.sector}): /template/${t.slug}`).join('\n') +
      '\n\nHepsini /template sayfasında görebilirsiniz. Beğendiğinizi kendi markanıza uyarlıyoruz.',
  },
  {
    id: 'panel',
    keywords: ['yonetim paneli', 'yonetim panelleri', 'dashboard', 'panel', 'admin panel', 'admin paneli'],
    strong: ['yonetim paneli', 'yonetim panelleri'],
    answer: () =>
      'Yönetim paneli tasarlıyoruz: gelir-gider, satış, sipariş, müşteri, rapor ve yetki yönetimi gibi ekranlar. Örnek panellerimiz:\n' +
      panelSamples.map((p) => `• ${p.name}`).join('\n') +
      '\n\nHepsini /hizmetler/yonetim-paneli sayfasında görebilirsiniz. Fiyat, projenin kapsamına göre belirlenir.',
  },
  {
    id: 'legal',
    keywords: ['kvkk', 'gizlilik', 'cerez', 'veri sorumlusu', 'firma unvani', 'unvan', 'kisisel veri'],
    strong: ['kvkk', 'cerez', 'gizlilik'],
    answer: () =>
      `Veri sorumlusu: ${site.legalName}.\n\nKVKK Aydınlatma Metni (/kvkk), Gizlilik Politikası (/gizlilik-politikasi) ve Çerez Politikası (/cerez-politikasi) sayfalarımızda ayrıntılar var. Çerez tercihinizi sayfanın altındaki "Çerez tercihleri" bağlantısından değiştirebilirsiniz.`,
  },
  { id: 'qr', keywords: ['qr', 'qr menu', 'dijital menu', 'restoran menusu', 'kafe menusu'], answer: () => plansAnswer('QR Menü paketleri:', qrMenuPlans) },
  {
    id: 'ads',
    keywords: ['reklam', 'google ads', 'meta ads', 'google reklam', 'meta reklam', 'facebook reklam', 'instagram reklam', 'ads', 'kampanya yonetimi'],
    answer: () =>
      'Google & Meta reklam yönetimi paketlerimiz (aylık, reklam bütçesi dahil değildir):\n\n' +
      adsTerms.map((t, i) => `• ${t.months} ay (${t.name}) – ${priceWithList(`${t.monthly.toLocaleString('tr-TR')} ₺`)} / ay, toplam ${adsTotalLabel(i)}${t.googleGift ? ': Meta + Google Ads (Google hediye)' : ': Meta Ads yönetimi'}. ${t.blurb}`).join('\n') +
      '\n\nReklam bütçenizi doğrudan kendi Google/Meta hesabınızdan ödersiniz; biz yönetim hizmetini faturalandırırız. Ayrıntılar: /hizmetler/reklam-yonetimi',
  },
  {
    id: 'social',
    keywords: ['sosyal medya', 'sosyal', 'instagram', 'story', 'post', 'icerik takvimi'],
    weak: ['haftalik', 'aylik', '3 aylik'],
    answer: () => plansAnswer('Sosyal medya paketleri:', socialMediaPlans),
  },
  {
    id: 'logo',
    keywords: ['logo', 'marka tasarimi', 'kurumsal kimlik', 'marka kimligi', 'ikon tasarimi'],
    answer: () =>
      `Logo tasarımı: ${priceWithList(logoPlan.price)}.\n\n` + logoPlan.features.map((f) => `• ${f}`).join('\n') + '\n\nÖrnek logolar /hizmetler/marka-tasarimi sayfasında; sipariş için /fiyatlandirma sayfasındaki Logo bölümü. Kurumsal kimlik ve marka rehberi için teklif alabilirsiniz.',
  },
  {
    id: 'custom',
    keywords: ['ozel yazilim', 'ozel proje', 'startup', 'girisim', 'sosyal ag'],
    answer: () =>
      'Özel projelerde şunları yapıyoruz:\n' +
      specialProjectFeatures.slice(0, 8).map((f) => `• ${f}`).join('\n') +
      '\n\nFiyat projenin kapsamına göre belirlenir.',
  },
  {
    id: 'ai',
    keywords: ['yapay zeka', 'ai', 'chatbot', 'asistan', 'otomasyon'],
    answer: () =>
      'Yapay zeka: Premium web paketinde Yapay Zeka Asistan dahildir, QR Menü Premium\'da yapay zeka ile ürün görseli üretilir, özel projelerde chatbot ve otomasyon entegrasyonu yapılır.',
  },
  {
    id: 'seo',
    keywords: ['seo', 'google', 'arama motoru', 'search console', 'analytics', 'schema', 'sitemap'],
    answer: () =>
      'SEO kapsamı pakete göre değişir: Business ve üstünde güçlü SEO ve site haritası, Professional ve üstünde Google Analytics, Schema ve Search Console bulunur.',
  },
  { id: 'domain', keywords: ['domain', 'alan adi', 'com tr', 'net tr'], answer: domainAnswer },
  { id: 'delivery', keywords: ['teslim', 'ne kadar surer', 'kac gun', 'sure'], answer: deliveryAnswer },
  {
    id: 'projects',
    keywords: ['proje', 'projeler', 'portfolyo', 'ornek', 'referans', 'bebekler', 'ekotakip', 'taleb'],
    answer: () => 'Projelerimizden bazıları:\n' + projects.map((p) => `• ${p.name}: ${p.type}`).join('\n') + '\n\nHepsini ve uygulama ekran görüntülerini /projeler sayfasında görebilirsiniz.',
  },
  {
    id: 'web',
    keywords: ['web sitesi', 'web', 'internet sitesi', 'site', 'starter', 'business', 'professional', 'premium'],
    weak: ['paket', 'fiyat', 'ucret', 'ne kadar'],
    answer: webAnswer,
  },
  {
    id: 'about',
    keywords: ['kimsiniz', 'hayb nedir', 'hakkinda', 'ne yapiyorsunuz', 'hizmet'],
    answer: () =>
      'HAYB, mobil uygulama, mobil oyun, web sitesi, özel yazılım, yönetim paneli, yapay zeka, sosyal medya, marka/logo tasarımı ve Google & Meta reklam yönetimi hizmetleri sunan bir dijital ürün stüdyosudur.',
  },
  {
    id: 'contact',
    keywords: ['iletisim', 'ulas', 'whatsapp', 'telefon', 'gorusme', 'teklif'],
    answer: () => 'Bize WhatsApp\'tan hemen yazabilir ya da Proje Başlat sayfasından teklif isteyebilirsiniz.',
  },
];

const GREETING_WORDS = ['merhaba', 'selam', 'selamlar', 'hey', 'iyi gunler', 'gunaydin', 'iyi aksamlar'];
const THANKS_WORDS = ['tesekkur', 'tesekkurler', 'sagol', 'sag olun', 'eyvallah', 'harika', 'tamam', 'anladim'];

export const GREETING = 'Merhaba! Size nasıl yardımcı olabilirim? Mobil uygulama, mobil oyun, web sitesi ve şablonları, QR menü, sosyal medya, logo, reklam yönetimi, kampanya ve fiyatlar hakkında soru sorabilirsiniz.';
export const THANKS = 'Rica ederim! Başka bir sorunuz olursa buradayım. İsterseniz WhatsApp\'tan da yazabilirsiniz.';
export const FALLBACK = 'Bunu tam anlayamadım. Mobil uygulama, mobil oyun, web sitesi, şablonlar, QR menü, sosyal medya, logo, reklam yönetimi, kampanya veya teslim süreleri hakkında sorabilirsiniz; ya da WhatsApp\'tan bize yazın.';

const matches = (text: string, kw: string) => new RegExp(`(^| )${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text);

/** Her konu için skor: özel kelime = 3, genel kelime = 1. En yüksek skorlu konu kazanır. */
export function routeTopic(text: string): Topic | null {
  let best: Topic | null = null;
  let bestScore = 0;
  for (const t of TOPICS) {
    let score = 0;
    for (const k of t.keywords) if (matches(text, k)) score += 3 + (k.includes(' ') ? 1 : 0);
    for (const k of t.weak ?? []) if (matches(text, k)) score += 1;
    for (const k of t.strong ?? []) if (matches(text, k)) score += 8;
    if (score > bestScore) {
      best = t;
      bestScore = score;
    }
  }
  return best;
}

export function getAnswer(input: string): string {
  const text = normalize(input);
  if (!text) return FALLBACK;

  const topic = routeTopic(text);
  if (topic) return topic.answer();

  // Konu bulunamadıysa: selamlaşma / teşekkür
  if (GREETING_WORDS.some((g) => matches(text, g))) return GREETING;
  if (THANKS_WORDS.some((g) => matches(text, g))) return THANKS;
  return FALLBACK;
}
