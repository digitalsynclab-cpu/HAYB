/**
 * Süreli kampanya. Sitede gösterilen fiyatlar KAMPANYA fiyatıdır; üstü çizili liste fiyatı buradan türetilir.
 * Kampanyayı değiştirmek veya bitirmek için yalnızca bu dosyayı düzenleyin (bitiş tarihini gerçek tutun).
 */
export const campaign = {
  /** Yüzde indirim */
  rate: 35,
  /** Bitiş anı (Türkiye saati) */
  endsAt: '2026-10-31T23:59:59+03:00',
  title: 'Açılış kampanyası',
  text: 'Tüm web, sosyal medya ve QR menü paketlerinde geçerli.',
} as const;

export interface PriceParts {
  /** Kampanya fiyatı, örn. "5.000 ₺" */
  sale: string;
  /** Üstü çizili liste fiyatı, örn. "7.700 ₺" */
  list: string;
  /** "/ hafta" gibi sonek */
  suffix: string;
  rate: number;
}

const fmt = (n: number) => `${n.toLocaleString('tr-TR')} ₺`;

/** "3.000 ₺ / hafta" → kampanya + liste fiyatı. Sayı yoksa null. */
export function priceParts(price: string): PriceParts | null {
  const m = price.match(/^([\d.]+)\s*₺\s*(.*)$/);
  if (!m) return null;
  const sale = Number(m[1].replace(/\./g, ''));
  if (!Number.isFinite(sale) || sale <= 0) return null;
  const list = Math.round(sale / (1 - campaign.rate / 100) / 100) * 100;
  return { sale: fmt(sale), list: fmt(list), suffix: m[2].trim(), rate: campaign.rate };
}

/** Düz metin (asistan, WhatsApp mesajı): "5.000 ₺ (liste 7.700 ₺, %35 kampanya)" */
export function priceWithList(price: string): string {
  const p = priceParts(price);
  return p ? `${price} (liste ${p.list}${p.suffix ? ` ${p.suffix}` : ''}, %${p.rate} kampanya)` : price;
}
