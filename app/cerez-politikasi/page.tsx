import Link from 'next/link';
import { LegalPage } from '@/components/sections/LegalPage';
import { CookiePrefsButton } from '@/components/layout/CookieConsent';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Çerez Politikası',
  description: 'HAYB web sitesinde çerez ve yerel depolamanın nasıl kullanıldığı ve tercihlerinizi nasıl değiştirebileceğiniz.',
  path: '/cerez-politikasi',
});

export default function CookiePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Çerez Politikası', path: '/cerez-politikasi' }]} />
      <LegalPage
      updated="25 Eylül 2026"
      eyebrow="Yasal"
      title="Çerez Politikası"
      intro="Bu sayfa, sitemizde çerez ve benzeri teknolojilerin nasıl kullanıldığını ve tercihlerinizi nasıl yönetebileceğinizi açıklar."
      sections={[
        { title: 'Çerez nedir?', body: <p>Çerezler, ziyaret ettiğiniz sitenin tarayıcınıza kaydettiği küçük veri parçalarıdır. Yerel depolama da benzer amaçla kullanılır.</p> },
        { title: 'Zorunlu kayıtlar', body: <p>Sitenin çalışması için yalnızca verdiğiniz çerez tercihi (evet veya hayır) tarayıcınızda saklanır. Bu kayıt sizi tanımlamaz ve başka bir yere gönderilmez.</p> },
        { title: 'Form taslağı (yerel depolama)', body: <p>Web Sitesi Sipariş formunu doldururken girdiğiniz bilgiler, sayfayı yenilediğinizde veya başka bir sekmede şablonlara göz attığınızda kaybolmasın diye yalnızca cihazınızın yerel depolamasında taslak olarak tutulur. Bu bilgi sunucumuza gönderilmez, yedi gün sonra otomatik silinir; formdaki “Taslağı sil” bağlantısıyla hemen silebilirsiniz.</p> },
        { title: 'İsteğe bağlı çerezler', body: <div className="space-y-3"><p>Ziyaret istatistiği gibi isteğe bağlı çerezler yalnızca &quot;Evet&quot; dediğinizde etkinleşir. Reklam veya kişiye özel takip amaçlı çerez kullanılmamaktadır.</p>{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? <p>Onayınızla Google Analytics 4 ile anonim ve teknik ziyaret istatistikleri ölçülür: görüntülenen sayfalar, hangi şablonların açıldığı, formların hangi aşamaya kadar tamamlandığı ve trafiğin geldiği kaynak. Ad, telefon, e-posta gibi kişisel bilgileriniz analitik araçlarına gönderilmez; reklam kişiselleştirme ve Google sinyalleri kapalıdır. Bu ölçüm sırasında veriler Google&apos;ın sunucularına aktarılır. Tercihinizi aşağıdan dilediğiniz zaman değiştirebilirsiniz.</p> : <p>Şu anda ziyaret istatistiği aracı etkin değildir.</p>}</div> },
        { title: 'Tercihinizi değiştirin', body: <div className="space-y-3"><p>Tercihinizi dilediğiniz zaman değiştirebilirsiniz.</p><CookiePrefsButton className="inline-flex min-h-11 items-center rounded-full bg-ink-950 px-5 font-semibold text-lime" /></div> },
        { title: 'Tarayıcı ayarları', body: <p>Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Engellediğinizde sitenin temel işlevleri çalışmaya devam eder, yalnızca tercihiniz hatırlanmaz.</p> },
        { title: 'İlgili metinler', body: <p><Link href="/gizlilik-politikasi" className="font-semibold underline">Gizlilik Politikası</Link> ve <Link href="/kvkk" className="font-semibold underline">KVKK Aydınlatma Metni</Link> ile birlikte okuyabilirsiniz.</p> },
      ]}
      />
    </>
  );
}
