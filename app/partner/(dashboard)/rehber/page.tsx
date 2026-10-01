import { PaymentInfoCard } from './PaymentInfoCard';

const steps = [
  { title: 'Müşteri bulun', text: 'HAYB hizmetlerine ihtiyacı olabilecek bir işletme veya kişi belirleyin: web sitesi, mobil uygulama, e-ticaret, özel yazılım vb.' },
  { title: 'Lead oluşturun', text: "Müşteri bilgilerini panelinizden 'Lead'lerim' üzerinden kaydedin. Bu, müşteriyi sisteme kaydeder ama henüz satış oluşturmaz." },
  { title: 'Satış oluşturun', text: "Müşteri ilgileniyorsa 'Satış Oluştur' ile hizmeti, paketi ve müşteri bilgilerini girip HAYB onayına gönderin." },
  { title: 'HAYB inceler ve onaylar', text: 'Satış HAYB ekibi tarafından incelenir. Gerekirse sizden ek bilgi istenebilir, aksi halde onaylanır.' },
  { title: 'Müşteri ödemeyi yapar', text: 'Satış onaylandıktan sonra müşteri, ödemeyi aşağıdaki HAYB hesabına havale/EFT ile yapar.' },
  { title: 'Proje teslim edilir', text: 'HAYB projeyi geliştirip teslim eder. Satış tamamlandığında komisyonunuz hesaplanır ve panelinizde görünür.' },
];

const tips = [
  'İlk mesajda uzun teknik açıklamalar yapmayın; müşterinin ihtiyacını anlamaya odaklanın.',
  'Fiyat sorulduğunda önce ihtiyacı netleştirin, ardından Satış Rehberi’ndeki hazır cevapları kullanın.',
  'Müşteriye "kesin satış garantisi" veya "kesin kazanç" gibi ifadeler kullanmayın; gerçekçi ve şeffaf olun.',
  'Sosyal medyada veya WhatsApp’ta paylaşım yaparken Materyaller bölümündeki hazır görselleri kullanın.',
  'Takibi bırakmayın: teklif gönderdiğiniz müşteriyi birkaç gün sonra tekrar arayın/mesajlayın.',
  'Lead’i oluşturduktan sonra durumunu güncel tutun, bu hem sizin hem HAYB’nin takibini kolaylaştırır.',
];

export default function PartnerGuidePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Başlangıç Rehberi</h1>
      <p className="mt-2 text-fg-muted">HAYB Partner olarak nasıl çalışacağınızı, panelinizi nasıl kullanacağınızı ve ödemelerin nasıl işlediğini burada bulabilirsiniz.</p>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Partner nedir?</h2>
        <p className="mt-2 text-sm text-fg-muted">
          HAYB Partner, HAYB&apos;nin dijital hizmetlerine (web sitesi, mobil uygulama, e-ticaret, özel yazılım vb.) ihtiyacı olan müşterileri bulup HAYB&apos;ye yönlendiren kişi ya da işletmedir.
          Projeyi siz geliştirmezsiniz; müşteriyi bulur, HAYB&apos;ye aktarırsınız. Satış gerçekleşip tamamlandığında komisyon kazanırsınız.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Süreç nasıl işler?</h2>
        <div className="mt-3 space-y-3">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/15 text-sm font-bold text-lime">{i + 1}</span>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Ödeme Bilgileri</h2>
        <div className="mt-3">
          <PaymentInfoCard />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Pazarlama İpuçları</h2>
        <ul className="mt-3 space-y-2">
          {tips.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-fg-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Panelde nerede ne var?</h2>
        <ul className="mt-3 space-y-2 text-sm text-fg-muted">
          <li>
            <strong className="text-fg">Satış Oluştur:</strong> yeni bir müşteri satışını HAYB onayına göndermek için.
          </li>
          <li>
            <strong className="text-fg">Lead&apos;lerim:</strong> henüz satışa dönüşmemiş müşteri adaylarınız.
          </li>
          <li>
            <strong className="text-fg">Satışlarım:</strong> oluşturduğunuz satışların durumu (onay bekliyor, onaylandı, tamamlandı vb.).
          </li>
          <li>
            <strong className="text-fg">Kazançlarım:</strong> bekleyen, onaylanmış ve ödenmiş komisyonlarınız.
          </li>
          <li>
            <strong className="text-fg">Müşteri Datası:</strong> size açılmış, sektör/şehre göre filtrelenebilir hazır müşteri listeleri.
          </li>
          <li>
            <strong className="text-fg">Satış Rehberi:</strong> müşteriye göndereceğiniz hazır cümleler ve itiraz yanıtları.
          </li>
          <li>
            <strong className="text-fg">Materyaller:</strong> paylaşabileceğiniz görsel ve metinler.
          </li>
          <li>
            <strong className="text-fg">Destek:</strong> HAYB ekibine soru sormak için.
          </li>
        </ul>
      </section>
    </div>
  );
}
