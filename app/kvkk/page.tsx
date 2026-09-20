import Link from 'next/link';
import { LegalPage } from '@/components/sections/LegalPage';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

export const metadata = buildMetadata({
  title: 'KVKK Aydınlatma Metni',
  description: 'HAYB iletişim ve proje formlarında toplanan kişisel verilerin 6698 sayılı KVKK kapsamında nasıl işlendiği.',
  path: '/kvkk',
});

export default function KvkkPage() {
  return (
    <LegalPage
      eyebrow="Yasal"
      title="KVKK Aydınlatma Metni"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, formlarımız ve WhatsApp hattımız üzerinden paylaştığınız verilerin nasıl işlendiğini açıklar."
      sections={[
        { title: 'Veri sorumlusu', body: <p>Kişisel verileriniz, <strong>{site.legalName}</strong> tarafından veri sorumlusu sıfatıyla işlenir. Bize <Link href="/iletisim" className="font-semibold underline">İletişim</Link> sayfasındaki kanallardan ve WhatsApp hattımızdan ulaşabilirsiniz.</p> },
        { title: 'İşlenen kişisel veriler', body: <p>İletişim ve Proje Başlat formlarına yazdığınız ad soyad, telefon numarası, e-posta adresi, seçtiğiniz proje türü, bütçe ve zamanlama bilgisi ile proje açıklamanız. Bunun dışında sitemiz sizden kimlik, ödeme veya konum bilgisi istemez.</p> },
        { title: 'İşleme amaçları', body: <p>Talebinizi değerlendirmek, sizinle iletişime geçmek, teklif ve sözleşme süreçlerini yürütmek ve talebinizle ilgili sorularınızı yanıtlamak.</p> },
        { title: 'Hukuki sebepler', body: <p>Verileriniz, KVKK madde 5/2 kapsamında bir sözleşmenin kurulması için gerekli olması ve veri sorumlusunun meşru menfaati hukuki sebeplerine dayanılarak, talebinizin sizin isteğinizle iletilmesiyle işlenir.</p> },
        { title: 'Toplama yöntemi ve aktarım', body: <p>Formu doldurduğunuzda bilgiler tarayıcınızda bir WhatsApp mesajı taslağına dönüşür; mesajı göndermek sizin onayınıza bağlıdır. Gönderdiğiniz mesaj WhatsApp altyapısı üzerinden bize ulaşır ve WhatsApp&apos;ın kendi gizlilik koşullarına tabidir. Verileriniz ticari amaçla üçüncü kişilere satılmaz veya devredilmez; yalnızca yasal yükümlülükler gereği yetkili kurumlarla paylaşılabilir.</p> },
        { title: 'Saklama süresi', body: <p>Verileriniz, talebinizin sonuçlanması ve yasal saklama yükümlülükleri için gerekli süre boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hale getirilir.</p> },
        { title: 'Haklarınız', body: <p>KVKK madde 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, bu işlemlerin üçüncü kişilere bildirilmesini isteme, otomatik sistemlerle aleyhinize bir sonuç doğması halinde itiraz etme ve zarara uğramanız halinde zararın giderilmesini talep etme haklarına sahipsiniz.</p> },
        { title: 'Başvuru yöntemi', body: <p>Haklarınıza ilişkin taleplerinizi WhatsApp hattımız veya <Link href="/iletisim" className="font-semibold underline">İletişim</Link> sayfamız üzerinden bize iletebilirsiniz. Talebiniz niteliğine göre en geç otuz gün içinde sonuçlandırılır. Ayrıca Kişisel Verileri Koruma Kurulu&apos;na şikâyet hakkınız saklıdır.</p> },
      ]}
    />
  );
}
