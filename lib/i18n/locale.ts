import { RATES } from '@/lib/i18n/rates';

export type Locale = 'tr' | 'en' | 'de';
export type Currency = 'TRY' | 'USD' | 'EUR';

export const LOCALES: { code: Locale; label: string; short: string; currency: Currency; intl: string }[] = [
  { code: 'tr', label: 'Türkçe', short: 'TR', currency: 'TRY', intl: 'tr-TR' },
  { code: 'de', label: 'Deutsch', short: 'DE', currency: 'EUR', intl: 'de-DE' },
  { code: 'en', label: 'English', short: 'EN', currency: 'USD', intl: 'en-US' },
];

export const STORAGE_KEY = 'hayb-locale';

export const isLocale = (v: unknown): v is Locale => v === 'tr' || v === 'en' || v === 'de';

export const localeInfo = (l: Locale) => LOCALES.find((x) => x.code === l) ?? LOCALES[0];

/** TL tutarını seçili dilin para birimine çevirir ve biçimlendirir. */
export function formatTry(amountTry: number, locale: Locale): string {
  const info = localeInfo(locale);
  if (info.currency === 'TRY') return `${Math.round(amountTry).toLocaleString('tr-TR')} ₺`;
  const rate = info.currency === 'USD' ? RATES.USD : RATES.EUR;
  return new Intl.NumberFormat(info.intl, { style: 'currency', currency: info.currency, maximumFractionDigits: 0 }).format(amountTry / rate);
}

const PRICE_RE = /(\d{1,3}(?:\.\d{3})+|\d+)\s?₺/g;

/** Metindeki "5.000 ₺" biçimli tutarları seçili para birimine çevirir. */
export function convertPrices(text: string, locale: Locale): string {
  if (locale === 'tr' || !text.includes('₺')) return text;
  return text.replace(PRICE_RE, (_, n: string) => formatTry(Number(n.replace(/\./g, '')), locale));
}
