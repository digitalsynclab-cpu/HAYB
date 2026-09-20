import Link from 'next/link';
import { LegalPage } from '@/components/sections/LegalPage';
import { CookiePrefsButton } from '@/components/layout/CookieConsent';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Çerez Politikası',
  description: 'HAYB web sitesinde çerez ve yerel depolamanın nasıl kullanıldığı ve tercihlerinizi nasıl değiştirebileceğiniz.',
  path: '/cerez-politikasi',
});

export default function CookiePage() {
  return (
    <LegalPage
      eyebrow="Yasal"
      title="Çerez Politikası"
      intro="Bu sayfa, sitemizde çerez ve benzeri teknolojilerin nasıl kullanıldığını ve tercihlerinizi nasıl yönetebileceğinizi açıklar."
      sections={[
        { title: 'Çerez nedir?', body: <p>Çerezler, ziyaret ettiğiniz sitenin tarayıcınıza kaydettiği küçük veri parçalarıdır. Yerel depolama da benzer amaçla kullanılır.</p> },
        { title: 'Zorunlu kayıtlar', body: <p>Sitenin çalışması için yalnızca verdiğiniz çerez tercihi (evet veya hayır) tarayıcınızda saklanır. Bu kayıt sizi tanımlamaz ve başka bir yere gönderilmez.</p> },
        { title: 'İsteğe bağlı çerezler', body: <p>Ziyaret istatistiği gibi isteğe bağlı çerezler yalnızca &quot;Evet&quot; dediğinizde etkinleşir. Şu anda sitemizde reklam veya kişiye özel takip amaçlı çerez kullanılmamaktadır. İleride eklenirse bu sayfa güncellenir.</p> },
        { title: 'Tercihinizi değiştirin', body: <div className="space-y-3"><p>Tercihinizi dilediğiniz zaman değiştirebilirsiniz.</p><CookiePrefsButton className="inline-flex min-h-11 items-center rounded-full bg-ink-950 px-5 font-semibold text-lime" /></div> },
        { title: 'Tarayıcı ayarları', body: <p>Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Engellediğinizde sitenin temel işlevleri çalışmaya devam eder, yalnızca tercihiniz hatırlanmaz.</p> },
        { title: 'İlgili metinler', body: <p><Link href="/gizlilik-politikasi" className="font-semibold underline">Gizlilik Politikası</Link> ve <Link href="/kvkk" className="font-semibold underline">KVKK Aydınlatma Metni</Link> ile birlikte okuyabilirsiniz.</p> },
      ]}
    />
  );
}
