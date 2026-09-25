import { site } from '@/data/site';

/** Hafif yardımcılar: istemci bileşenleri şablon verisinin tamamını yüklemeden kullanabilsin. */
export const templateThumb = (slug: string) => `/images/templates/${slug}-thumb.webp`;

/** Şablonun canlı demo adresi (sipariş mesajında kod değil, bu tam adres gönderilir). */
export const templateUrl = (slug: string) => `${site.url}/template/${slug}`;
