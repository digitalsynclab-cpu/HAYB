/**
 * Partner, web sitesi/e-ticaret satışlarında müşteriden bilgi toplamak için kendisi form
 * doldurmaz — bu metni kopyalayıp müşteriye gönderir, müşteri yanıtlar, partner yanıtı
 * olduğu gibi satış formuna yapıştırır. Admin'e HAYB'nin kendi sipariş formuyla aynı
 * detayda bilgi ulaşır, sadece serbest metin olarak.
 */
export function buildCustomerFormTemplate(serviceName: string): string {
  return `${serviceName} siparişiniz için birkaç bilgiye ihtiyacımız var. Aşağıdaki soruları yanıtlayıp bu mesajı olduğu gibi geri gönderebilir misiniz?

1) Sektörünüz / iş alanınız nedir?
2) İşletmeniz kısaca ne iş yapıyor?
3) Bir domain (alan adınız) var mı? (Var / Yok / Bilmiyorum)
4) Hosting (barındırma) hizmetiniz var mı? (Var / Yok / Bilmiyorum)
5) Sitenizde hangi sayfalar olsun istersiniz? (Örn: Anasayfa, Hakkımızda, Hizmetler, İletişim, Blog, Ürünler/Mağaza...)
6) Özel istekleriniz var mı? (Örn: WhatsApp butonu, Randevu sistemi, Teklif formu, Online ödeme, Çoklu dil, Ürün kataloğu...)
7) Beğendiğiniz, referans alabileceğimiz bir web sitesi var mı? (varsa linkini paylaşın)

Teşekkürler!`;
}
