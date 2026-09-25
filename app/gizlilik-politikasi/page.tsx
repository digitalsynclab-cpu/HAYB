import Link from 'next/link';
import { LegalPage } from '@/components/sections/LegalPage';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

export const metadata = buildMetadata({
  title: 'Gizlilik Politikası',
  description: 'HAYB web sitesini kullanırken hangi bilgilerin toplandığı, nasıl kullanıldığı ve nasıl korunduğu.',
  path: '/gizlilik-politikasi',
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Gizlilik Politikası', path: '/gizlilik-politikasi' }]} />
      <LegalPage
      updated="25 Eylül 2026"
      eyebrow="Yasal"
      title="Gizlilik Politikası"
      intro="Gizliliğinize saygı duyuyoruz. Bu sayfa, hayb.com.tr web sitesini kullanırken hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar."
      sections={[
        { title: 'Topladığımız bilgiler', body: <p>Yalnızca sizin İletişim, Proje Başlat veya Web Sitesi Sipariş formlarına ya da WhatsApp&apos;a kendiniz yazdığınız bilgiler (ad soyad, telefon, e-posta, işletme bilgileri, proje ve tasarım tercihleri, proje açıklaması) işlenir. Şifre, hesap veya ödeme bilgisi istenmez. Sitemizde üyelik, hesap oluşturma veya çevrimiçi ödeme yoktur.</p> },
        { title: 'Bilgilerin kullanımı', body: <p>Bilgiler yalnızca talebinizi yanıtlamak, teklif hazırlamak ve sizinle iletişim kurmak için kullanılır; pazarlama listesine eklenmez. Ayrıntılar için <Link href="/kvkk" className="font-semibold underline">KVKK Aydınlatma Metni</Link>&apos;ne bakın.</p> },
        { title: 'Üçüncü taraf hizmetler', body: <p>Site, bir barındırma ve içerik dağıtım altyapısı üzerinde yayınlanır. Formlarla oluşturulan mesajlar WhatsApp üzerinden iletilir. Bu hizmetler kendi gizlilik koşullarına tabidir. Sitede reklam ağı veya davranış takibi yapan bir araç kullanılmaz.</p> },
        { title: 'Çerezler ve yerel depolama', body: <p>Site, çerez tercihinizi hatırlamak için tarayıcınızın yerel depolamasını kullanır. Web Sitesi Sipariş formunda girdiğiniz bilgiler de sayfayı yenilediğinizde kaybolmasın diye yalnızca sizin cihazınızda taslak olarak tutulur; sunucumuza gönderilmez, yedi gün sonra silinir ve formdaki “Taslağı sil” bağlantısıyla hemen silebilirsiniz. Ayrıntılar için <Link href="/cerez-politikasi" className="font-semibold underline">Çerez Politikası</Link>&apos;na bakın.</p> },
        { title: 'Güvenlik', body: <p>Site, HTTPS üzerinden sunulur ve güvenlik başlıklarıyla korunur. Bununla birlikte internet üzerinden yapılan hiçbir iletimin tamamen risksiz olduğu garanti edilemez.</p> },
        { title: 'Çocukların gizliliği', body: <p>Sitemiz on sekiz yaşın altındaki kişilere yönelik değildir ve bilerek onlardan kişisel veri toplamayız.</p> },
        { title: 'Değişiklikler', body: <p>Bu politika güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır ve sayfanın başındaki tarih değişir.</p> },
        { title: 'İletişim', body: <p>Veri sorumlusu: <strong>{site.legalName}</strong>. Gizlilikle ilgili sorularınız için <Link href="/iletisim" className="font-semibold underline">İletişim</Link> sayfasındaki kanalları veya WhatsApp hattımızı kullanabilirsiniz.</p> },
      ]}
      />
    </>
  );
}
