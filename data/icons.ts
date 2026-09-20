/**
 * HAYB 3D icon seti — public/icon/<ad>.webp
 * Dosyalar Desktop\HAYB_NEW_TASARIM\icon kaynaklarından yalnızca
 * yeniden boyutlandırılarak (512px, şeffaf WebP) üretilmiştir.
 * Görünümlerine (ışık, cam, renk) müdahale edilmez.
 */
export const iconNames = [
  'basari', 'bulutcozumleri', 'dijitalbuyume', 'entegrasyon', 'entegrecozumler', 'eticaret',
  'globaluyum', 'guvenlik', 'hedefodakli', 'hizliperformans', 'icerikyonetimi', 'iletisim',
  'isletmeler', 'kolaykullanim', 'konumveyerelisletmeler', 'mobiluyumlu', 'musteriodakli',
  'odemesistemleri', 'ozelyazilim', 'projeyonetimi', 'randevusistemi', 'raporlama', 'sinirsiz',
  'strateji', 'sunucualtyapisi', 'surekligelisim', 'tasarim', 'teknikdestek', 'veriguvenligi',
  'veriyonetimi', 'websitesi', 'yapayzeka', 'yapayzeka2', 'yenimusteri', 'yonetimpaneli',
] as const;

export type IconName = (typeof iconNames)[number];

export const iconSrc = (name: IconName) => `/icon/${name}.webp`;
