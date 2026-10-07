import { whatsappUrl } from '@/data/site';
import type { PricingPlan } from '@/types';

/** HAYB Data Service uygulaması: tarayıcı / telefon girişi ve Windows programı. */
export const DS_APP_URL = 'https://app.hayb.com.tr';

/** Satın al → WhatsApp'a hazır mesaj. */
export const dsBuyUrl = (plan?: PricingPlan) =>
  whatsappUrl(
    plan
      ? `Merhaba, HAYB Data Service "${plan.name}" paketini (${plan.price}) satın almak istiyorum.`
      : 'Merhaba, HAYB Data Service satın almak istiyorum. Paketler hakkında bilgi alabilir miyim?',
  );

export const dsScreens: { src: string; title: string; text: string }[] = [
  { src: '/images/products/data-service/search.webp', title: 'İşletme arama', text: 'Şehir ve sektörü yazın; işletmeler telefon, e-posta, web sitesi ve sosyal medya bilgileriyle listelensin. Pazarın dijital durumu özetlenir.' },
  { src: '/images/products/data-service/cityscan.webp', title: 'Şehir taraması', text: 'Bir ilin seçtiğiniz bütün sektörlerini ve ilçelerini tek seferde tarayın. Bayi, toptancı ve kurumsal müşteri arayanlar için.' },
  { src: '/images/products/data-service/businesses.webp', title: 'Müşteri adayları', text: 'Bulunan işletmeler fırsat skoru, şehir ve iletişim bilgileriyle tek listede. “Web sitesi yok”, “Sıcak fırsat” gibi filtrelerle tek tıkla süzün, Excel’e aktarın.' },
  { src: '/images/products/data-service/business.webp', title: 'İşletme kartı', text: 'Her işletmenin dijital karnesi: fırsat skoru ve nedenleri, rakip kıyası, notlar, takip ve rapor.' },
  { src: '/images/products/data-service/analysis.webp', title: 'Website analizi', text: 'Teknik altyapı, SEO, hız, kullanıcı deneyimi ve güvenlik 100 üzerinden puanlanır; eksik hizmetler satış fırsatı olarak çıkar.' },
  { src: '/images/products/data-service/audit.webp', title: 'Derin site denetimi', text: '25 sayfaya kadar tarama; SEO, yapay zekâ aramalarında görünürlük (GEO) ve yerel SEO. Her bulgu kanıtı ve hazır çözümüyle gelir.' },
  { src: '/images/products/data-service/proposal.webp', title: 'Teklif oluşturucu', text: 'Denetim bulguları kendi fiyatlarınızla kalem kalem teklife dönüşür; PDF olarak kaydedin veya e-postayla gönderin.' },
  { src: '/images/products/data-service/pipeline.webp', title: 'Satış panosu', text: 'Müşterilerinizi aşama aşama sürükle-bırak ile takip edin; açık fırsat tutarı ve kazanma oranı bir bakışta.' },
  { src: '/images/products/data-service/sentinel.webp', title: 'Site Nöbeti', text: 'Siteler 5 dakikada bir kontrol edilir; kesinti ve SSL uyarıları anında gelir. Rakip fiyat ve kampanya sayfaları günlük izlenir.' },
];
