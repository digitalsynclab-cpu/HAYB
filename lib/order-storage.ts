/** Sipariş formu taslağının yerel depolama anahtarı ve süresi (hafif; şablon verisini içe aktarmaz). */
export const ORDER_STORAGE_KEY = 'hayb-web-order-v1';
/** Taslak bu süreden sonra silinir (paylaşılan cihazlarda kişisel veri kalmasın). */
export const ORDER_TTL_MS = 7 * 24 * 60 * 60 * 1000;
