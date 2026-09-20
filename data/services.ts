import type { IconName } from '@/data/icons';

export type ShowcaseKind = 'web' | 'architecture' | 'dashboard' | 'flow' | 'mobile' | 'game' | 'ai' | 'social' | 'brand' | 'ads';

export interface ServiceDetail {
  slug: string;
  title: string;
  /** Kartlarda ve navigasyonda kullanılan kısa ad */
  short: string;
  icon: IconName;
  filter: 'Web' | 'Yazılım' | 'Tasarım' | 'Mobil' | 'Diğer';
  /** Kısa açıklama (kart) */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  showcase: ShowcaseKind;
  /** "Ne kazanırsınız" kartları */
  benefits: { icon: IconName; title: string; text: string }[];
  /** Bu hizmetin adımları */
  steps: { title: string; text: string }[];
  stepsTitle: string;
  /** İlgili proje id'leri (data/projects.ts) */
  projectIds: string[];
  /** Fiyatlandırma sayfasında karşılığı varsa bağlantı */
  pricingNote?: string;
}

export const services: ServiceDetail[] = [
  {
    slug: 'web-sitesi',
    title: 'Web Sitesi',
    short: 'Web Sitesi',
    icon: 'websitesi',
    filter: 'Web',
    summary: 'Markanıza özel, modern ve kullanıcı dostu web siteleri.',
    metaTitle: 'Web Sitesi Tasarımı ve Geliştirme',
    metaDescription:
      'Markanız için hızlı, mobil uyumlu ve SEO altyapılı web sitesi. Tasarımdan yayına kadar tek elden, sabit fiyatlı paketlerle.',
    heroTitle: 'Markanız için güçlü',
    heroAccent: 'bir dijital başlangıç.',
    heroText:
      'Sadece güzel görünen değil, işinize değer katan, kullanıcı dostu ve yönetilebilir web siteleri tasarlıyor ve geliştiriyoruz.',
    showcase: 'web',
    benefits: [
      { icon: 'mobiluyumlu', title: 'Mobil uyum', text: 'Telefonda, tablette ve masaüstünde sorunsuz görünür.' },
      { icon: 'hizliperformans', title: 'Hız', text: 'Hızlı açılan sayfalar, ziyaretçiyi kaybetmemenizi sağlar.' },
      { icon: 'dijitalbuyume', title: 'SEO', text: 'Arama motorlarının sizi bulabilmesi için teknik altyapı hazırlanır.' },
      { icon: 'guvenlik', title: 'Güven', text: 'SSL sertifikası ve temel güvenlik önlemleri pakete dahildir.' },
      { icon: 'kolaykullanim', title: 'Kolay yönetim', text: 'Üst paketlerde içeriğinizi kendiniz güncelleyebileceğiniz panel bulunur.' },
      { icon: 'tasarim', title: 'Modern UX', text: 'Ziyaretçinin aradığını hızla bulduğu, sade bir arayüz.' },
    ],
    stepsTitle: 'Web sitenizin yolculuğu',
    steps: [
      { title: 'Analiz', text: 'İşinizi, hedef kitlenizi ve sitenizden beklentinizi dinleriz.' },
      { title: 'UX', text: 'Sayfa yapısını ve kullanıcı akışını planlarız.' },
      { title: 'UI', text: 'Markanıza özel görsel tasarımı hazırlarız.' },
      { title: 'Geliştirme', text: 'Tasarımı hızlı ve mobil uyumlu şekilde koda dökeriz.' },
      { title: 'SEO', text: 'Başlık, açıklama ve site haritası gibi teknik ayarları yaparız.' },
      { title: 'Yayın', text: 'Alan adı ve barındırma ayarlarıyla siteyi yayına alırız.' },
    ],
    projectIds: ['webevtekstil', 'webinsaat', 'websosyal'],
    pricingNote: 'Web sitesi paketleri 5.000 ₺ ile başlar.',
  },
  {
    slug: 'ozel-yazilim',
    title: 'Özel Yazılım',
    short: 'Özel Yazılım',
    icon: 'ozelyazilim',
    filter: 'Yazılım',
    summary: 'İhtiyacınıza özel yazılım çözümleriyle iş süreçlerinizi kolaylaştırıyoruz.',
    metaTitle: 'Özel Yazılım Geliştirme',
    metaDescription:
      'İşletmenizin ihtiyacına göre sıfırdan yazılım geliştiriyoruz. Web uygulaması, API, veritabanı ve yönetim paneli tek çatı altında.',
    heroTitle: 'Süreçlerinize uyan',
    heroAccent: 'yazılımı sıfırdan kuruyoruz.',
    heroText:
      'Hazır programların yetmediği yerde, işinizin çalışma biçimine göre tasarlanmış web uygulamaları ve entegrasyonlar geliştiriyoruz.',
    showcase: 'architecture',
    benefits: [
      { icon: 'strateji', title: 'İşinize göre', text: 'Şablona sığmayan iş süreçleri için özel çözüm.' },
      { icon: 'entegrasyon', title: 'Entegrasyon', text: 'Kullandığınız diğer sistemlerle bağlanacak şekilde kurulur.' },
      { icon: 'veriyonetimi', title: 'Veri kontrolü', text: 'Verileriniz tek yerde, düzenli ve sizin kontrolünüzde durur.' },
      { icon: 'sunucualtyapisi', title: 'Altyapı', text: 'Uygulamanın çalışacağı sunucu ve yayın ortamı hazırlanır.' },
    ],
    stepsTitle: 'Bir yazılım nasıl ortaya çıkar?',
    steps: [
      { title: 'İhtiyaç analizi', text: 'Çözmek istediğiniz problemi ve kullanıcıları netleştiririz.' },
      { title: 'Mimari', text: 'Sistemin parçalarını ve veri akışını planlarız.' },
      { title: 'Geliştirme', text: 'Arayüz, API ve veritabanını birlikte geliştiririz.' },
      { title: 'Test ve yayın', text: 'Denemeleri tamamlar, sistemi canlıya alırız.' },
    ],
    projectIds: ['ekotakippro', 'qrmenu'],
  },
  {
    slug: 'yonetim-paneli',
    title: 'Yönetim Paneli',
    short: 'Yönetim Paneli',
    icon: 'yonetimpaneli',
    filter: 'Yazılım',
    summary: 'Satış, müşteri ve operasyonlarınızı tek yerden yönetmenizi sağlıyoruz.',
    metaTitle: 'Yönetim Paneli ve Dashboard Geliştirme',
    metaDescription:
      'İşinizi tek ekrandan yönetmenizi sağlayan özel yönetim paneli ve dashboard sistemleri. Raporlama, tablolar ve filtreler.',
    heroTitle: 'İşinizi tek ekrandan',
    heroAccent: 'yönetin.',
    heroText:
      'Dağınık tablolar ve mesajlar yerine; verilerinizi, raporlarınızı ve günlük işlerinizi bir arada gösteren özel paneller yapıyoruz.',
    showcase: 'dashboard',
    benefits: [
      { icon: 'raporlama', title: 'Raporlama', text: 'Önemli rakamları grafik ve tablolarla tek bakışta görürsünüz.' },
      { icon: 'veriyonetimi', title: 'Veri yönetimi', text: 'Kayıtları ekler, arar, filtreler ve düzenlersiniz.' },
      { icon: 'projeyonetimi', title: 'Takip', text: 'İşlerin ve süreçlerin durumunu anlık izlersiniz.' },
      { icon: 'guvenlik', title: 'Yetki', text: 'Kim neyi görebilir ve değiştirebilir, siz belirlersiniz.' },
    ],
    stepsTitle: 'Panelinizi birlikte kuruyoruz',
    steps: [
      { title: 'Neyi takip ediyorsunuz?', text: 'Panelde görmek istediğiniz veriyi belirleriz.' },
      { title: 'Ekran tasarımı', text: 'Tablo, grafik ve filtre yerleşimini tasarlarız.' },
      { title: 'Geliştirme', text: 'Paneli verilerinize bağlı çalışacak şekilde kodlarız.' },
      { title: 'Eğitim ve destek', text: 'Kullanımı anlatır, yayın sonrası destek veririz.' },
    ],
    projectIds: ['ekotakippro'],
  },
  {
    slug: 'ui-ux',
    title: 'UI/UX Tasarım',
    short: 'UI/UX Tasarım',
    icon: 'tasarim',
    filter: 'Tasarım',
    summary: 'Kullanıcı odaklı arayüz tasarımları, prototipler ve ürün deneyimi akışları.',
    metaTitle: 'UI/UX Tasarım',
    metaDescription:
      'Kullanıcı akışı, wireframe, arayüz tasarımı ve prototip. Ürününüz koda dökülmeden önce doğru deneyimi birlikte kurgulayalım.',
    heroTitle: 'Kullanıcının kolayca',
    heroAccent: 'anladığı arayüzler.',
    heroText:
      'İyi bir ürün önce iyi bir akışla başlar. Ekranları kodlamadan önce kullanıcı yolculuğunu ve arayüzü birlikte netleştiriyoruz.',
    showcase: 'flow',
    benefits: [
      { icon: 'musteriodakli', title: 'Kullanıcı odaklı', text: 'Kararlar kullanıcının ihtiyacına göre verilir.' },
      { icon: 'kolaykullanim', title: 'Sade akış', text: 'Az adımda, karışıklık olmadan hedefe ulaşılır.' },
      { icon: 'tasarim', title: 'Tutarlı arayüz', text: 'Renk, yazı ve bileşenler tek bir sistemde toplanır.' },
      { icon: 'projeyonetimi', title: 'Koda hazır', text: 'Tasarım, geliştirmeye doğrudan aktarılabilecek düzende teslim edilir.' },
    ],
    stepsTitle: 'Tasarım akışımız',
    steps: [
      { title: 'Problem', text: 'Çözülecek sorunu ve hedefi netleştiririz.' },
      { title: 'Araştırma', text: 'Kullanıcıyı ve benzer çözümleri inceleriz.' },
      { title: 'Kullanıcı akışı', text: 'Ekranlar arası yolculuğu çiziriz.' },
      { title: 'Wireframe', text: 'Sayfaların iskeletini oluştururuz.' },
      { title: 'Arayüz', text: 'Renk, yazı ve bileşenlerle görsel tasarımı hazırlarız.' },
      { title: 'Prototip', text: 'Tıklanabilir prototiple akışı denemenizi sağlarız.' },
      { title: 'Geliştirme', text: 'Onaylanan tasarımı kodlarız.' },
    ],
    projectIds: ['bebeklersoruyor', 'webevtekstil'],
  },
  {
    slug: 'mobil-uygulama',
    title: 'Mobil Uygulama',
    short: 'Mobil Uygulama',
    icon: 'mobiluyumlu',
    filter: 'Mobil',
    summary: 'iOS ve Android için modern, kullanıcı odaklı mobil uygulamalar.',
    metaTitle: 'Mobil Uygulama Geliştirme (iOS & Android)',
    metaDescription:
      'iOS ve Android için mobil uygulama tasarımı ve geliştirmesi. Bildirimler, ödeme, konum ve mağaza yayını dahil.',
    heroTitle: 'Fikrinizi cebe',
    heroAccent: 'sığdırıyoruz.',
    heroText:
      'iOS ve Android için hızlı, anlaşılır ve bakımı kolay mobil uygulamalar geliştiriyoruz. Mağaza yayınına kadar yanınızdayız.',
    showcase: 'mobile',
    benefits: [
      { icon: 'mobiluyumlu', title: 'iOS ve Android', text: 'Tek ekiple iki platform için planlama yapılır.' },
      { icon: 'iletisim', title: 'Bildirimler', text: 'Kullanıcıya anlık bildirim gönderme altyapısı.' },
      { icon: 'odemesistemleri', title: 'Ödeme', text: 'iyzico ve Stripe gibi ödeme sistemleriyle entegrasyon.' },
      { icon: 'konumveyerelisletmeler', title: 'Konum', text: 'Harita ve konum servisleri uygulamaya eklenebilir.' },
    ],
    stepsTitle: 'Uygulamanın yol haritası',
    steps: [
      { title: 'Onboarding', text: 'Kullanıcının uygulamayla ilk karşılaşmasını kurgularız.' },
      { title: 'Ana ekran', text: 'En sık kullanılan işlemleri öne çıkarırız.' },
      { title: 'Arama ve detay', text: 'İçeriğe hızlı ulaşımı ve detay ekranlarını tasarlarız.' },
      { title: 'Profil ve bildirim', text: 'Hesap ve bildirim deneyimini tamamlarız.' },
      { title: 'Test ve yayın', text: 'App Store ve Google Play yayınını yönetiriz.' },
    ],
    projectIds: ['bbblock', 'bebeklersoruyor', 'ekotakippro'],
    pricingNote: 'Mobil uygulama fiyatı kapsama göre belirlenir; ücretsiz keşif görüşmesi yapılır.',
  },
  {
    slug: 'mobil-oyun',
    title: 'Mobil Oyun',
    short: 'Mobil Oyun',
    icon: 'basari',
    filter: 'Mobil',
    summary: 'iOS ve Android için oyun fikrinizi tasarlıyor, geliştiriyor ve mağazalara yayınlıyoruz.',
    metaTitle: 'Mobil Oyun Geliştirme (iOS & Android)',
    metaDescription:
      'Mobil oyun fikrinizi tasarımdan App Store ve Google Play yayınına kadar geliştiriyoruz. BB Block: Wood Puzzle gibi yayında olan oyunlarımızı inceleyin.',
    heroTitle: 'Oyun fikrinizi',
    heroAccent: 'mağazalara taşıyoruz.',
    heroText:
      'Oyun tasarımından geliştirmeye, mağaza sayfasından yayına kadar mobil oyunları uçtan uca yapıyoruz. Kendi oyunumuz BB Block: Wood Puzzle App Store ve Google Play’de yayında.',
    showcase: 'game',
    benefits: [
      { icon: 'mobiluyumlu', title: 'iOS ve Android', text: 'Aynı oyunu iki platformda yayına hazırlarız.' },
      { icon: 'tasarim', title: 'Oyun tasarımı', text: 'Görsel dil, arayüz ve oyun akışı birlikte kurgulanır.' },
      { icon: 'hizliperformans', title: 'Akıcı performans', text: 'Düşük donanımlı telefonlarda da rahat çalışacak şekilde optimize edilir.' },
      { icon: 'basari', title: 'Mağaza yayını', text: 'App Store ve Google Play sürecini sizin için yönetiriz.' },
    ],
    stepsTitle: 'Oyunun yol haritası',
    steps: [
      { title: 'Fikir ve kurgu', text: 'Oyunun mekaniğini ve hedef oyuncuyu netleştiririz.' },
      { title: 'Tasarım', text: 'Görsel dili, arayüzü ve oyun içi ekranları tasarlarız.' },
      { title: 'Geliştirme', text: 'Oyunu iOS ve Android için geliştirir, test ederiz.' },
      { title: 'Mağaza hazırlığı', text: 'Mağaza görselleri ve açıklamalarını hazırlarız.' },
      { title: 'Yayın ve güncelleme', text: 'Yayına alır, sonrasında güncellemelerle devam ederiz.' },
    ],
    projectIds: ['bbblock'],
    pricingNote: 'Mobil oyun fiyatı kapsama göre belirlenir; ücretsiz keşif görüşmesi yapılır.',
  },
  {
    slug: 'yapay-zeka',
    title: 'Yapay Zeka',
    short: 'Yapay Zeka',
    icon: 'yapayzeka',
    filter: 'Yazılım',
    summary: 'İş süreçlerinizi otomatikleştiren yapay zeka çözümleri.',
    metaTitle: 'Yapay Zeka ve Otomasyon Çözümleri',
    metaDescription:
      'Sitenize sohbet asistanı, ürün görseli üretimi ve süreç otomasyonu gibi yapay zeka çözümleri ekliyoruz.',
    heroTitle: 'Yapay zekayı işinize',
    heroAccent: 'gerçekten yarayacak şekilde ekliyoruz.',
    heroText:
      'Herkesin konuştuğu şey değil, işinizde zaman kazandıran somut kullanım senaryoları: asistan, otomasyon ve içerik üretimi.',
    showcase: 'ai',
    benefits: [
      { icon: 'yapayzeka', title: 'Sohbet asistanı', text: 'Ziyaretçilerin sık sorduğu soruları sitenizde anında yanıtlar.' },
      { icon: 'projeyonetimi', title: 'Otomasyon', text: 'Tekrarlayan işleri otomatik akışlara bağlar.' },
      { icon: 'icerikyonetimi', title: 'İçerik üretimi', text: 'QR menü gibi ürünlerde ürün görseli üretiminde kullanılır.' },
      { icon: 'veriyonetimi', title: 'Veri işleme', text: 'Elinizdeki veriyi düzenler ve anlamlı hale getirir.' },
    ],
    stepsTitle: 'Nereden başlarız?',
    steps: [
      { title: 'Kullanım senaryosu', text: 'Yapay zekanın işinizde nerede işe yarayacağını belirleriz.' },
      { title: 'Prototip', text: 'Küçük bir denemeyle sonucu birlikte değerlendiririz.' },
      { title: 'Entegrasyon', text: 'Çalışan çözümü sitenize veya sisteminize bağlarız.' },
      { title: 'İyileştirme', text: 'Gerçek kullanıma göre çözümü geliştiririz.' },
    ],
    projectIds: ['qrmenu'],
    pricingNote: 'Yapay Zeka Asistan, Premium web paketine dahildir.',
  },
  {
    slug: 'sosyal-medya',
    title: 'Sosyal Medya',
    short: 'Sosyal Medya',
    icon: 'iletisim',
    filter: 'Tasarım',
    summary: 'Post ve story tasarımlarıyla markanızı sosyal medyada tutarlı gösteriyoruz.',
    metaTitle: 'Sosyal Medya Tasarımı ve İçerik Paketleri',
    metaDescription:
      'Haftalık, aylık ve 3 aylık paketlerle post ve story tasarımı. Marka kimliğinize uygun içerik takvimi.',
    heroTitle: 'Markanız her gönderide',
    heroAccent: 'aynı sesle konuşsun.',
    heroText:
      'Post ve story tasarımlarını marka kimliğinize uygun şekilde hazırlıyor, içerik takvimini birlikte planlıyoruz.',
    showcase: 'social',
    benefits: [
      { icon: 'icerikyonetimi', title: 'Post tasarımı', text: 'Marka renk ve fontlarına uygun kare gönderi tasarımları.' },
      { icon: 'dijitalbuyume', title: 'Story tasarımı', text: 'Dikey formatta dikkat çeken story tasarımları.' },
      { icon: 'projeyonetimi', title: 'İçerik takvimi', text: 'Ne zaman ne paylaşılacağı önceden planlanır.' },
      { icon: 'tasarim', title: 'Marka tutarlılığı', text: 'Tüm paylaşımlar aynı görsel dilde durur.' },
    ],
    stepsTitle: 'Çalışma şeklimiz',
    steps: [
      { title: 'Marka incelemesi', text: 'Mevcut kimliğinizi ve hedefinizi anlarız.' },
      { title: 'İçerik planı', text: 'Paylaşım takvimini birlikte hazırlarız.' },
      { title: 'Tasarım', text: 'Post ve story tasarımlarını üretiriz.' },
      { title: 'Teslim ve revizyon', text: 'PNG ve kaynak dosyalarla teslim eder, revizyon yaparız.' },
    ],
    projectIds: ['websosyal'],
    pricingNote: 'Sosyal medya paketleri haftalık 3.000 ₺ ile başlar.',
  },
  {
    slug: 'marka-tasarimi',
    title: 'Marka Tasarımı',
    short: 'Marka Tasarımı',
    icon: 'hedefodakli',
    filter: 'Tasarım',
    summary: 'Markanıza özel logo, kurumsal kimlik ve görsel tasarım çalışmaları.',
    metaTitle: 'Logo ve Marka Kimliği Tasarımı',
    metaDescription:
      'Markanıza özel logo, renk ve yazı sistemi, marka rehberi ve sosyal medya kimliği tasarımı.',
    heroTitle: 'Markanıza ait',
    heroAccent: 'bir görsel dil kuruyoruz.',
    heroText:
      'Logo, renk ve yazı sistemi, marka rehberi ve sosyal medya kimliği: markanız her yerde aynı güvenle görünsün.',
    showcase: 'brand',
    benefits: [
      { icon: 'hedefodakli', title: 'Logo', text: 'Markanıza özel, akılda kalıcı logo tasarımı.' },
      { icon: 'tasarim', title: 'Renk ve yazı', text: 'Tutarlı bir renk paleti ve yazı sistemi.' },
      { icon: 'icerikyonetimi', title: 'Marka rehberi', text: 'Logonun ve renklerin nasıl kullanılacağını anlatan rehber.' },
      { icon: 'iletisim', title: 'Sosyal kimlik', text: 'Profil ve paylaşım görselleri marka diliyle uyumlu olur.' },
    ],
    stepsTitle: 'Kimlik çalışması',
    steps: [
      { title: 'Marka konuşması', text: 'Markanın kim olduğunu ve kime seslendiğini konuşuruz.' },
      { title: 'Logo', text: 'Logo alternatiflerini hazırlar, birlikte seçeriz.' },
      { title: 'Sistem', text: 'Renk ve yazı sistemini kurarız.' },
      { title: 'Rehber', text: 'Kullanım kurallarını içeren marka rehberini teslim ederiz.' },
    ],
    pricingNote: 'Logo tasarımı 499 ₺’dir (kampanyalı fiyat). Sepete ekleyip WhatsApp’tan siparişinizi iletebilirsiniz.',
    projectIds: ['websosyal'],
  },
  {
    slug: 'reklam-yonetimi',
    title: 'Google & Meta Reklamları',
    short: 'Google & Meta Reklamları',
    icon: 'dijitalbuyume',
    filter: 'Diğer',
    summary: 'İşletmenize en uygun platformlarda Meta ve Google reklamlarını kurar, yönetir ve geliştiririz.',
    metaTitle: 'Google Ads ve Meta Reklam Yönetimi',
    metaDescription:
      'Meta (Facebook, Instagram) ve Google reklamlarının kurulumu, yönetimi ve optimizasyonu. 3, 6 ve 12 aylık paketler; 6 ve 12 aylıkta Google Ads hediye.',
    heroTitle: 'Reklam bütçeniz',
    heroAccent: 'doğru kişilere ulaşsın.',
    heroText:
      'İşletmenize en uygun platformları seçiyor, Meta ve Google reklamlarını kuruyor, ölçümlüyor ve her ay daha iyi sonuç için geliştiriyoruz.',
    showcase: 'ads',
    benefits: [
      { icon: 'hedefodakli', title: 'Doğru platform', text: 'İşletmenize en uygun mecrada, doğru hedef kitleye reklam veririz.' },
      { icon: 'dijitalbuyume', title: 'Kurulum ve yönetim', text: 'Hesap, kampanya, pixel ve dönüşüm ölçümü baştan sona bizde.' },
      { icon: 'raporlama', title: 'Ölçüm ve rapor', text: 'Performansı takip eder, aylık raporla ne olduğunu net gösteririz.' },
      { icon: 'surekligelisim', title: 'Sürekli geliştirme', text: 'A/B testleri, remarketing ve optimizasyonla sonuçları iyileştiririz.' },
    ],
    stepsTitle: 'Reklam sürecimiz',
    steps: [
      { title: 'Strateji', text: 'Hedefinizi, bütçenizi ve müşterinizi konuşur, platformları seçeriz.' },
      { title: 'Kurulum', text: 'Reklam hesabı, pixel ve dönüşüm ölçümünü kurarız.' },
      { title: 'Kampanya ve test', text: 'Hedef kitle ve kreatif testleriyle kampanyaları yayına alırız.' },
      { title: 'Optimizasyon', text: 'Bütçe ve teklifleri performansa göre düzenli olarak iyileştiririz.' },
      { title: 'Raporlama', text: 'Aylık raporla sonuçları paylaşır, bir sonraki adımı birlikte planlarız.' },
    ],
    projectIds: [],
    pricingNote: 'Meta reklam yönetimi aylık 10.000 ₺’den başlar; 6 ve 12 aylık paketlerde Google Ads hediyedir. Reklam bütçesi dahil değildir.',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceFilters = ['Tümü', 'Web', 'Yazılım', 'Tasarım', 'Mobil'] as const;
