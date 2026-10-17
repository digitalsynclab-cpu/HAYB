import { webPackages, webPricingRows, ecommercePackages, ecommerceRows, qrMenuPlans, logoPlan, socialMediaPlans } from '@/data/pricing';

// Arama niyetine göre açılan konu sayfaları (ör. "web sitesi yaptırmak", "mobil uygulama yaptırmak").
// İnsanlar marka adını değil ihtiyacını arar; her sayfa tek bir aramaya cevap verir.
// Fiyat ve süreler data/pricing.ts'ten okunur: paket değişince bu sayfalar da kendiliğinden güncellenir.
// İçerik kuralı: uydurma müşteri, yorum, rakam yok; yalnızca sitedeki doğrulanmış bilgi.

export interface KeywordPrice {
  name: string;
  price: string;
  note?: string;
}

export interface KeywordSection {
  title: string;
  text: string;
  bullets?: string[];
}

export interface KeywordPage {
  slug: string;
  /** <title> (marka şablonu "| HAYB" otomatik eklenir) */
  metaTitle: string;
  metaDescription: string;
  /** H1: aranan ifadenin kendisi */
  heading: string;
  title: string;
  accent: string;
  intro: string;
  /** Schema.org Service türü */
  serviceType: string;
  prices?: { title: string; rows: KeywordPrice[]; note?: string };
  sections: KeywordSection[];
  faq: { q: string; a: string }[];
  projectIds: string[];
  related: { label: string; href: string }[];
  cta: { label: string; href: string };
}

const webDays = (id: string) => String((webPricingRows.find((r) => r.label === 'Teslim Süresi') as unknown as Record<string, string>)[id]);
const webDomain = (id: string) => String((webPricingRows.find((r) => r.label.startsWith('Alan Adı')) as unknown as Record<string, string>)[id]);
const webPages = (id: string) => String((webPricingRows.find((r) => r.label === 'Sayfa Sayısı') as unknown as Record<string, string>)[id]);
const ecoRow = (label: string, key: string) => String((ecommerceRows.find((r) => r.label === label) as unknown as Record<string, string | boolean>)[key]);
const title = (name: string) => name.charAt(0) + name.slice(1).toLowerCase();

const WEB_START = webPackages[0].price;
const ECO_START = ecommercePackages[0].price;

const webPriceRows: KeywordPrice[] = webPackages.map((p) => ({
  name: title(p.name),
  price: p.price,
  note: `${webPages(p.id)} · ${webDays(p.id)} teslim · ${webDomain(p.id)} alan adı`,
}));

const ecoPriceRows: KeywordPrice[] = ecommercePackages.map((p) => ({
  name: p.label,
  price: p.price,
  note: `${ecoRow('Ürün Sayısı', p.key)} · ${ecoRow('Teslim Süresi', p.key)} teslim`,
}));

const WEB_INCLUDED = ['SSL sertifikası', 'Mobil ve tablet uyumlu tasarım', 'Hız optimizasyonu ve CDN', 'WhatsApp entegrasyonu ve iletişim formu', 'Google Harita entegrasyonu', 'KVKK ve çerez bildirimi'];

export const keywordPages: KeywordPage[] = [
  {
    slug: 'web-sitesi-yaptirmak',
    metaTitle: 'Web Sitesi Yaptırmak: Fiyat, Süre ve Süreç',
    metaDescription: `Web sitesi yaptırmak isteyenler için net rehber: paketler ${WEB_START}’den başlar, ${webDays('starter').toLowerCase()}de teslim. Alan adı, SSL ve mobil uyum dahil. Ücretsiz teklif alın.`,
    heading: 'Web Sitesi Yaptırmak',
    title: 'Web sitenizi',
    accent: 'net fiyatla yaptırın.',
    intro: `İşletmeniz için web sitesi yaptırmak istiyorsanız fiyatı, süreyi ve kapsamı baştan bilmeniz gerekir. HAYB’de web sitesi paketleri ${WEB_START}’den başlar; alan adı, SSL ve mobil uyum her pakette dahildir. Siteyi sizin için tasarlar, geliştirir ve yayına alırız.`,
    serviceType: 'Web sitesi tasarımı ve geliştirme',
    prices: { title: 'Web sitesi paketleri ve fiyatları', rows: webPriceRows },
    sections: [
      {
        title: 'Web sitesi yaptırırken neye dikkat edilmeli?',
        text: 'Bir web sitesinden beklenen; müşterinin sizi bulması, güvenmesi ve size kolayca ulaşmasıdır. Bunun için sitenin telefonda hızlı açılması, Google’ın okuyabileceği bir yapıda olması ve tek dokunuşla arama ya da WhatsApp’a yönlendirmesi gerekir.',
        bullets: ['Telefonda hızlı ve düzgün görünüyor mu?', 'Alan adı ve SSL kimin adına kayıtlı?', 'Fiyata neler dahil, sonradan ek ücret çıkar mı?', 'Teslimden sonra içerik değişikliği nasıl yapılır?'],
      },
      {
        title: 'Her pakette neler var?',
        text: 'Hangi paketi seçerseniz seçin, aşağıdakiler standart olarak gelir. Üst paketlerde sayfa sayısı, yönetim paneli, blog, gelişmiş SEO ve çoklu dil eklenir.',
        bullets: WEB_INCLUDED,
      },
      {
        title: 'Web sitesi kaç günde hazır olur?',
        text: `Starter paket ${webDays('starter').toLowerCase()}, Business ${webDays('business').toLowerCase()}, Professional ${webDays('professional').toLowerCase()}, Premium ${webDays('premium').toLowerCase()} içinde teslim edilir. Süre, içeriklerinizin (logo, metin, görsel) bize ulaştığı günden itibaren başlar.`,
      },
      {
        title: 'Satın almadan önce örnekleri deneyin',
        text: 'Kafe, restoran, klinik, otel, inşaat ve daha birçok sektör için hazırladığımız örnek siteleri kendi telefonunuzda canlı deneyebilirsiniz. Beğendiğiniz tasarımı markanıza uyarlarız.',
      },
    ],
    faq: [
      { q: 'Web sitesi yaptırmak ne kadar?', a: `HAYB’de web sitesi paketleri ${WEB_START}’den başlar. Fiyata alan adı, SSL ve mobil uyumlu tasarım dahildir.` },
      { q: 'Alan adı ve hosting fiyata dahil mi?', a: 'Alan adı web sitesi paketlerinde 1 veya 2 yıl ücretsizdir. Hosting ihtiyacınızı teklifte netleştiririz.' },
      { q: 'Siteyi sonra kendim güncelleyebilir miyim?', a: 'Business ve üstü paketlerde yönetim paneli vardır; ürün, hizmet ve içerikleri kendiniz güncelleyebilirsiniz.' },
      { q: 'Bursa dışındayım, çalışabilir miyiz?', a: 'Evet. Bursa merkezliyiz, Türkiye genelinde uzaktan çalışıyoruz; tüm süreç WhatsApp ve görüntülü görüşmeyle ilerler.' },
    ],
    projectIds: ['tigerwood', 'baskanhavlu', 'bebeklersoruyor'],
    related: [
      { label: 'Web sitesi fiyatları', href: '/web-sitesi-fiyatlari' },
      { label: 'Kurumsal web sitesi', href: '/kurumsal-web-sitesi' },
      { label: 'Hazır web sitesi', href: '/hazir-web-sitesi' },
      { label: 'Örnek web siteleri', href: '/template' },
    ],
    cta: { label: 'Web Sitesi Siparişini Başlat', href: '/web-sitesi-siparis' },
  },
  {
    slug: 'web-sitesi-fiyatlari',
    metaTitle: 'Web Sitesi Fiyatları 2026: Paket Paket Karşılaştırma',
    metaDescription: `2026 web sitesi fiyatları: ${webPackages.map((p) => `${title(p.name)} ${p.price}`).join(', ')}. E-ticaret ${ECO_START}’den. Neyin dahil olduğunu tek tabloda görün.`,
    heading: 'Web Sitesi Fiyatları 2026',
    title: 'Web sitesi fiyatları,',
    accent: 'sürprizsiz ve açık.',
    intro: `Web sitesi fiyatları; sayfa sayısına, yönetim paneline, e-ticaret ihtiyacına ve teslim süresine göre değişir. Aşağıda HAYB’nin güncel paket fiyatlarını, her pakete neyin dahil olduğunu ve teslim sürelerini bulabilirsiniz.`,
    serviceType: 'Web sitesi tasarımı ve geliştirme',
    prices: { title: 'Kurumsal web sitesi fiyatları', rows: webPriceRows },
    sections: [
      {
        title: 'E-ticaret sitesi fiyatları',
        text: `Online satış yapmak istiyorsanız e-ticaret paketleri ${ECO_START}’den başlar. Sanal POS (iyzico, PayTR), sipariş ve stok yönetimi, kargo takibi ve SEO altyapısı dahildir.`,
        bullets: ecoPriceRows.map((r) => `${r.name}: ${r.price} (${r.note})`),
      },
      {
        title: 'Web sitesi fiyatını ne belirler?',
        text: 'Fiyatı belirleyen başlıca etkenler sayfa sayısı, yönetim paneli ihtiyacı, çoklu dil, özel animasyonlar ve entegrasyonlardır. Paketlerimiz bu farkları baştan gösterir; ek bir ihtiyaç olursa önce size fiyatını söyleriz.',
        bullets: ['Sayfa sayısı', 'Yönetim paneli ve blog', 'SEO ve yapısal veri (Schema)', 'Çoklu dil ve yapay zeka asistan', 'Teslim süresi'],
      },
      {
        title: 'Ucuz web sitesi ile doğru web sitesi arasındaki fark',
        text: 'En düşük fiyat çoğu zaman yavaş açılan, telefonda bozulan ya da Google’da görünmeyen bir site demektir. Bizim paketlerimizin hepsinde hız optimizasyonu, mobil uyum ve güvenlik standarttır.',
      },
    ],
    faq: [
      { q: 'En ucuz web sitesi paketi ne kadar?', a: `Starter paket ${WEB_START}’dir: ${webPages('starter')}, ${webDays('starter').toLowerCase()} teslim, ücretsiz alan adı ve SSL dahil.` },
      { q: 'Fiyatlara KDV dahil mi?', a: 'Fatura ve ödeme detaylarını teklif aşamasında netleştiriyoruz; sonradan sürpriz bir kalem çıkmaz.' },
      { q: 'Yıllık ücret ödüyor muyum?', a: 'Paket fiyatı site tasarımı ve geliştirmesi içindir. Alan adı ilk 1–2 yıl ücretsizdir; sonrasındaki yenileme ücretini baştan paylaşırız.' },
      { q: 'Fiyatlar neden indirimli görünüyor?', a: 'Sitede gösterilen fiyatlar açılış kampanyası fiyatlarıdır; kampanya bitiş tarihi Paketler sayfasında yazar.' },
    ],
    projectIds: ['baskanhavlu', 'tigerwood', 'msgko'],
    related: [
      { label: 'Tüm paketler', href: '/paketler' },
      { label: 'Web sitesi yaptırmak', href: '/web-sitesi-yaptirmak' },
      { label: 'E-ticaret sitesi kurmak', href: '/e-ticaret-sitesi-kurmak' },
    ],
    cta: { label: 'Paketleri Karşılaştır', href: '/paketler' },
  },
  {
    slug: 'mobil-uygulama-yaptirmak',
    metaTitle: 'Mobil Uygulama Yaptırmak: iOS ve Android Uygulama Geliştirme',
    metaDescription: 'Mobil uygulama yaptırmak mı istiyorsunuz? iOS ve Android uygulamalarınızı tasarlıyor, geliştiriyor ve App Store ile Google Play’e yayınlıyoruz. Yayındaki uygulamalarımızı inceleyin.',
    heading: 'Mobil Uygulama Yaptırmak',
    title: 'Uygulamanızı tasarlayıp',
    accent: 'mağazalara yayınlıyoruz.',
    intro: 'Mobil uygulama yaptırmak; fikri netleştirmek, ekranları tasarlamak, uygulamayı geliştirmek ve App Store ile Google Play’e yayınlamak demektir. HAYB bu sürecin tamamını üstlenir. App Store ve Google Play’de yayında olan uygulama ve oyunlarımızı inceleyebilirsiniz.',
    serviceType: 'Mobil uygulama geliştirme',
    sections: [
      {
        title: 'Mobil uygulama fiyatı nasıl belirlenir?',
        text: 'Uygulama fiyatı ekran sayısına, kullanıcı girişi, ödeme, harita, bildirim gibi özelliklere ve yönetim paneli ihtiyacına göre değişir. Önce ücretsiz bir keşif görüşmesi yapar, ardından kapsamı ve fiyatı yazılı olarak netleştiririz.',
        bullets: ['Ekran sayısı ve tasarım', 'Kullanıcı girişi ve profil', 'Ödeme (iyzico, Stripe), harita, kamera', 'Push bildirim ve offline çalışma', 'Yönetim paneli ve API'],
      },
      {
        title: 'iOS mu, Android mi?',
        text: 'Çoğu proje için React Native ile tek kod tabanından hem iOS hem Android uygulaması geliştiririz; bu, maliyeti ve süreyi düşürür. Gerektiğinde Swift (iOS) ve Kotlin (Android) ile native geliştirme de yapıyoruz.',
      },
      {
        title: 'Yayın ve sonrası',
        text: 'Uygulamanızı App Store ve Google Play’e biz yayınlarız; mağaza incelemesi, ekran görüntüleri ve açıklamalar dahil. Yayından sonra güncelleme ve bakım için yanınızda kalırız.',
        bullets: ['App Store ve Google Play yayını', 'Test ve kalite kontrol', 'Güncellemeler ve bakım'],
      },
    ],
    faq: [
      { q: 'Mobil uygulama yaptırmak ne kadar?', a: 'Kapsama göre değişir. Ücretsiz keşif görüşmesinden sonra ekran ve özellik listesine göre net bir teklif hazırlıyoruz.' },
      { q: 'Uygulama kaç ayda biter?', a: 'Süre kapsama bağlıdır; teklifle birlikte adım adım bir takvim paylaşırız.' },
      { q: 'Uygulamayı mağazaya siz mi yüklüyorsunuz?', a: 'Evet. App Store ve Google Play yayınını, mağaza açıklamaları ve görselleriyle birlikte biz yapıyoruz.' },
      { q: 'Daha önce yaptığınız uygulamalar var mı?', a: 'Evet. BB Block: Wood Puzzle App Store ve Google Play’de, BebeklerSoruyor App Store’da yayında; Taleb-e ve EkoTakip Pro da geliştirdiğimiz uygulamalardandır.' },
    ],
    projectIds: ['bbblock', 'bebeklersoruyor', 'taleb-e'],
    related: [
      { label: 'Mobil oyun yaptırmak', href: '/mobil-oyun-yaptirmak' },
      { label: 'Yazılım firması', href: '/yazilim-firmasi' },
      { label: 'Mobil uygulama hizmeti', href: '/hizmetler/mobil-uygulama' },
    ],
    cta: { label: 'Uygulama Fikrimi Anlatmak İstiyorum', href: '/proje-baslat' },
  },
  {
    slug: 'e-ticaret-sitesi-kurmak',
    metaTitle: 'E-Ticaret Sitesi Kurmak: Fiyatlar ve Sanal POS Kurulumu',
    metaDescription: `E-ticaret sitesi kurmak veya yaptırmak için paketler ${ECO_START}’den başlar. iyzico ve PayTR sanal POS, sipariş, stok ve kargo takibi dahil. Online mağazanızı biz kuralım.`,
    heading: 'E-Ticaret Sitesi Kurmak',
    title: 'Online mağazanızı',
    accent: 'satışa hazır teslim ediyoruz.',
    intro: `E-ticaret sitesi kurmak; ürünleri yüklemek, ödeme almak, siparişi ve stoğu yönetmek için tek bir sisteme sahip olmak demektir. HAYB’de e-ticaret paketleri ${ECO_START}’den başlar ve iyzico veya PayTR sanal POS kurulumu dahildir.`,
    serviceType: 'E-ticaret sitesi kurulumu',
    prices: { title: 'E-ticaret paketleri ve fiyatları', rows: ecoPriceRows },
    sections: [
      {
        title: 'E-ticaret sitesinde neler var?',
        text: 'Tüm paketlerde özgün tasarım, kredi kartı ile taksitli ve 3D Secure ödeme, havale/EFT ve kapıda ödeme, sipariş ve stok yönetimi bulunur.',
        bullets: ['iyzico / PayTR sanal POS', 'Kredi kartı, taksit ve 3D Secure', 'Havale/EFT ve kapıda ödeme', 'Sipariş, stok ve müşteri yönetimi', 'SEO altyapısı ve mobil uyum'],
      },
      {
        title: 'Hazır altyapı mı, size özel site mi?',
        text: 'Aylık kira ödediğiniz hazır altyapılarda tasarım ve özellikler sınırlıdır. Bizim kurduğumuz e-ticaret sitesi size özel tasarlanır; alan adı sizin adınıza kayıtlı olur.',
      },
      {
        title: 'Sanal POS başvurusu nasıl olur?',
        text: 'Sanal POS onayı ödeme kuruluşunun (iyzico, PayTR) değerlendirmesine bağlıdır. Başvuru sürecinde size yol gösterir, onaydan sonra entegrasyonu ve kurulumu biz yaparız.',
      },
    ],
    faq: [
      { q: 'E-ticaret sitesi kurmak ne kadar?', a: `E-ticaret paketleri ${ECO_START}’den başlar; ürün sayısı, hosting ve sanal POS sayısı pakete göre artar.` },
      { q: 'E-ticaret sitesi kaç günde hazır olur?', a: `Pakete göre ${ecoRow('Teslim Süresi', 'start').toLowerCase()} ile ${ecoRow('Teslim Süresi', 'elite').toLowerCase()} arasında teslim edilir.` },
      { q: 'Kargo ve e-fatura entegrasyonu var mı?', a: 'Kargo, e-fatura ve pazaryeri entegrasyonları paket kapsamında değildir; ihtiyacınız olursa ayrıca teklif hazırlarız.' },
      { q: 'Ürünleri kim yükleyecek?', a: 'Yönetim panelinden ürünleri kendiniz kolayca ekleyebilirsiniz; ilk kurulumda yardımcı oluyoruz.' },
    ],
    projectIds: ['baskanhavlu', 'tigerwood', 'qrmenu'],
    related: [
      { label: 'E-ticaret hizmeti', href: '/hizmetler/e-ticaret' },
      { label: 'Web sitesi fiyatları', href: '/web-sitesi-fiyatlari' },
      { label: 'Tüm paketler', href: '/paketler#eticaret' },
    ],
    cta: { label: 'E-Ticaret Paketlerini Gör', href: '/paketler#eticaret' },
  },
  {
    slug: 'hazir-web-sitesi',
    metaTitle: 'Hazır Web Sitesi Satın Al: Canlı Deneyebileceğiniz Örnek Siteler',
    metaDescription: `Hazır web sitesi satın almak isteyenler için sektöre özel örnek siteler. Önce canlı deneyin, sonra markanıza uyarlayalım. ${WEB_START}’den başlayan fiyatlar, ${webDays('starter').toLowerCase()}de teslim.`,
    heading: 'Hazır Web Sitesi Satın Al',
    title: 'Beğendiğiniz siteyi seçin,',
    accent: 'markanıza uyarlayalım.',
    intro: `Hazır web sitesi, kısa sürede ve uygun fiyatla yayına çıkmanın en hızlı yoludur. Kafe, restoran, klinik, otel, inşaat, moda ve daha birçok sektör için hazırladığımız örnek siteleri canlı deneyin; seçtiğiniz tasarımı renkleri, yazıları ve görselleriyle sizin markanıza uyarlayalım. Fiyatlar ${WEB_START}’den başlar.`,
    serviceType: 'Hazır web sitesi uyarlama',
    prices: { title: 'Hazır web sitesi paketleri', rows: webPriceRows },
    sections: [
      {
        title: 'Hazır web sitesi nasıl çalışır?',
        text: 'Örnek siteler arasından sektörünüze uygun olanı seçersiniz. Logonuzu, metinlerinizi ve görsellerinizi gönderirsiniz; biz siteyi markanıza göre düzenleyip alan adınızla yayına alırız.',
        bullets: ['Örnek siteyi canlı deneyin', 'Paketinizi seçin', 'İçeriklerinizi gönderin', 'Siteniz alan adınızla yayına çıksın'],
      },
      {
        title: 'Hazır site ile özel tasarım arasındaki fark',
        text: 'Hazır site daha hızlı ve ekonomiktir; özel tasarım ise tamamen sıfırdan, yalnızca sizin için çizilir. İkisinde de mobil uyum, hız ve güvenlik standarttır. Hangisinin size uygun olduğunu birlikte seçebiliriz.',
      },
    ],
    faq: [
      { q: 'Hazır web sitesi ne kadar?', a: `Hazır site uyarlamaları web sitesi paketlerimizle yapılır ve ${WEB_START}’den başlar.` },
      { q: 'Örnek sitelerdeki içerikler bana mı ait olacak?', a: 'Örnek sitelerdeki markalar ve içerikler kurgusaldır. Sizin sitenizde sizin logonuz, metinleriniz ve görselleriniz yer alır.' },
      { q: 'Tasarımda değişiklik yapabilir miyiz?', a: 'Evet. Renk, yazı tipi, bölüm sırası ve içerikleri markanıza göre düzenliyoruz.' },
    ],
    projectIds: ['webevtekstil', 'webinsaat', 'websosyal'],
    related: [
      { label: 'Örnek web siteleri', href: '/template' },
      { label: 'Web sitesi yaptırmak', href: '/web-sitesi-yaptirmak' },
      { label: 'Web sitesi siparişi', href: '/web-sitesi-siparis' },
    ],
    cta: { label: 'Örnek Siteleri Canlı Dene', href: '/template' },
  },
  {
    slug: 'kurumsal-web-sitesi',
    metaTitle: 'Kurumsal Web Sitesi Yaptırma: Firmanız İçin Profesyonel Site',
    metaDescription: `Firmanız için kurumsal web sitesi: hizmetler, referanslar, teklif formu ve yönetim paneli. Paketler ${WEB_START}’den başlar, alan adı ve SSL dahil. Örnek kurumsal sitelerimizi inceleyin.`,
    heading: 'Kurumsal Web Sitesi',
    title: 'Firmanızı en iyi anlatan',
    accent: 'kurumsal web sitesi.',
    intro: 'Kurumsal web sitesi; firmanızın kim olduğunu, ne yaptığını ve neden tercih edilmesi gerektiğini anlatan dijital vitrininizdir. Hizmet sayfaları, referanslar, teklif formu ve yönetim paneliyle firmanıza özel kurumsal siteler tasarlıyoruz.',
    serviceType: 'Kurumsal web sitesi tasarımı',
    prices: { title: 'Kurumsal web sitesi paketleri', rows: webPriceRows },
    sections: [
      {
        title: 'Kurumsal web sitesinde olması gerekenler',
        text: 'Ziyaretçinin güven duyması ve size ulaşması için kurumsal sitede şu bölümleri öneriyoruz:',
        bullets: ['Hakkımızda ve hizmetler sayfaları', 'Referanslar ve proje vitrini', 'Teklif ve iletişim formu', 'Google Harita ve WhatsApp butonu', 'Yönetim paneli ve blog (Business ve üstü)'],
      },
      {
        title: 'Örnek bir kurumsal site: TIGERWOOD',
        text: 'Tetra Pak atıklarından kompozit panel üreten TIGERWOOD için hazırladığımız kurumsal sitede ziyaretçi, üretim sürecini 3B animasyonla izliyor. SEO, yapay zeka arama görünürlüğü ve güvenlik altyapısı dahil.',
      },
    ],
    faq: [
      { q: 'Kurumsal web sitesi ne kadar?', a: `Kurumsal web sitesi paketleri ${WEB_START}’den başlar; referans sayfası, blog ve yönetim paneli Business paketinde (${webPackages[1].price}) gelir.` },
      { q: 'Çok dilli kurumsal site yapıyor musunuz?', a: 'Evet. Çoklu dil desteği Premium pakette dahildir.' },
      { q: 'Site Google’da çıkacak mı?', a: 'Business ve üstü paketlerde SEO, site haritası; Professional ve üstünde Google Analytics, Search Console ve yapısal veri kurulumu dahildir.' },
    ],
    projectIds: ['tigerwood', 'baskanhavlu', 'eyegames'],
    related: [
      { label: 'Web sitesi fiyatları', href: '/web-sitesi-fiyatlari' },
      { label: 'Bursa web tasarım', href: '/bursa-web-tasarim' },
      { label: 'Web sitesi hizmeti', href: '/hizmetler/web-sitesi' },
    ],
    cta: { label: 'Teklif Al', href: '/proje-baslat' },
  },
  {
    slug: 'yazilim-firmasi',
    metaTitle: 'Yazılım Firması: Özel Yazılım ve Yönetim Paneli Geliştirme',
    metaDescription: 'Bursa merkezli yazılım firması HAYB: işletmenize özel yazılım, yönetim paneli, web ve mobil uygulama geliştirme. Ücretsiz keşif görüşmesiyle başlayın.',
    heading: 'Yazılım Firması',
    title: 'İşinize özel',
    accent: 'yazılım geliştiriyoruz.',
    intro: 'Hazır programlar işinize tam uymuyorsa, size özel bir yazılım gerekir. HAYB; işletmelere özel yazılım, yönetim paneli, web ve mobil uygulama geliştiren Bursa merkezli bir yazılım firmasıdır. Önce işinizin akışını anlar, sonra o akışı kolaylaştıran yazılımı tasarlarız.',
    serviceType: 'Özel yazılım geliştirme',
    sections: [
      {
        title: 'Hangi yazılımları geliştiriyoruz?',
        text: 'İşletmenizdeki tekrar eden el işlerini azaltan, veriyi tek yerde toplayan ve karar vermeyi kolaylaştıran yazılımlar:',
        bullets: ['Yönetim paneli ve dashboard', 'Stok, sipariş ve müşteri takip sistemleri', 'Web ve mobil uygulamalar', 'Yapay zeka destekli otomasyonlar', 'Girişim fikirleri için ürün geliştirme'],
      },
      {
        title: 'İşletme tecrübesiyle yazılım',
        text: 'Kurucumuz yazılıma gelmeden önce yaklaşık 10 yıl tekstil üretimi ve perakendede çalıştı. Bu yüzden stok, satış ve müşteri tarafındaki gerçek dertleri bilerek yazılım kuruyoruz.',
      },
      {
        title: 'Nasıl çalışıyoruz?',
        text: 'Ücretsiz keşif görüşmesiyle ihtiyacı netleştirir, kapsamı ve fiyatı yazılı olarak sunarız. Geliştirme boyunca her adımı sizinle paylaşır, yayından sonra bakım ve destekle yanınızda kalırız.',
      },
    ],
    faq: [
      { q: 'Özel yazılım yaptırmak ne kadar?', a: 'Fiyat kapsama göre belirlenir. Ücretsiz keşif görüşmesinden sonra net bir teklif hazırlıyoruz.' },
      { q: 'Yazılımın kaynak kodu kime ait olur?', a: 'Sahiplik ve teslim koşullarını teklif ve sözleşmede açıkça yazıyoruz.' },
      { q: 'Sadece Bursa’da mı hizmet veriyorsunuz?', a: 'Hayır. Bursa merkezliyiz; Türkiye genelinde uzaktan çalışıyoruz.' },
    ],
    projectIds: ['ekotakippro', 'taleb-e', 'qrmenu'],
    related: [
      { label: 'Özel yazılım hizmeti', href: '/hizmetler/ozel-yazilim' },
      { label: 'Yönetim paneli', href: '/hizmetler/yonetim-paneli' },
      { label: 'Mobil uygulama yaptırmak', href: '/mobil-uygulama-yaptirmak' },
    ],
    cta: { label: 'Ücretsiz Keşif Görüşmesi', href: '/proje-baslat' },
  },
  {
    slug: 'mobil-oyun-yaptirmak',
    metaTitle: 'Mobil Oyun Yaptırmak: iOS ve Android Oyun Geliştirme',
    metaDescription: 'Mobil oyun yaptırmak isteyenler için: oyun tasarımı, geliştirme ve App Store ile Google Play yayını. Yayındaki oyunumuz BB Block: Wood Puzzle’ı deneyin.',
    heading: 'Mobil Oyun Yaptırmak',
    title: 'Oyun fikrinizi',
    accent: 'mağazaya taşıyalım.',
    intro: 'Mobil oyun yaptırmak; oynanışı tasarlamak, görselleri hazırlamak, oyunu geliştirmek ve mağazalara yayınlamak demektir. Kendi oyunumuz BB Block: Wood Puzzle’ı baştan sona geliştirip App Store ve Google Play’de yayınladık; aynı süreci sizin oyununuz için yürütüyoruz.',
    serviceType: 'Mobil oyun geliştirme',
    sections: [
      {
        title: 'Oyun geliştirme süreci',
        text: 'Fikirden yayına kadar her adımı birlikte planlıyoruz:',
        bullets: ['Oynanış ve seviye tasarımı', 'Görsel tasarım ve animasyon', 'iOS ve Android geliştirme', 'Test ve performans optimizasyonu', 'App Store ve Google Play yayını'],
      },
      {
        title: 'Yayında olan oyunumuz',
        text: 'BB Block: Wood Puzzle, ahşap blok bulmaca temalı mobil oyunumuzdur. App Store ve Google Play’den indirip deneyebilirsiniz.',
      },
    ],
    faq: [
      { q: 'Mobil oyun yaptırmak ne kadar?', a: 'Oyunun türüne, seviye sayısına ve görsel kapsamına göre değişir. Görüşmeden sonra net teklif hazırlıyoruz.' },
      { q: 'Oyunu mağazaya siz mi yüklüyorsunuz?', a: 'Evet. App Store ve Google Play yayınını biz yapıyoruz.' },
    ],
    projectIds: ['bbblock', 'eyegames'],
    related: [
      { label: 'Mobil oyun hizmeti', href: '/hizmetler/mobil-oyun' },
      { label: 'Mobil uygulama yaptırmak', href: '/mobil-uygulama-yaptirmak' },
    ],
    cta: { label: 'Oyun Fikrimi Anlatmak İstiyorum', href: '/proje-baslat' },
  },
  {
    slug: 'qr-menu-fiyatlari',
    metaTitle: 'QR Menü Fiyatları: Restoran ve Kafe İçin Dijital Menü',
    metaDescription: `QR menü fiyatları ${qrMenuPlans[0].price}’den başlar. Restoran ve kafeler için anlık güncellenen, mobil uyumlu dijital menü. Paketleri karşılaştırın.`,
    heading: 'QR Menü Fiyatları',
    title: 'Menünüzü telefona',
    accent: 'taşıyın.',
    intro: `QR menü; müşterinin masadaki kodu okutarak menünüzü telefonunda açmasını sağlar. Fiyat ve ürün değişikliklerini anında yaparsınız, menü bastırma masrafı biter. HAYB QR menü paketleri ${qrMenuPlans[0].price}’den başlar.`,
    serviceType: 'QR menü sistemi',
    prices: { title: 'QR menü paketleri', rows: qrMenuPlans.map((p) => ({ name: p.name, price: p.price, note: p.features.slice(0, 3).join(' · ') })) },
    sections: [
      {
        title: 'QR menünün faydaları',
        text: 'Dijital menü hem işletmeye hem müşteriye zaman kazandırır:',
        bullets: ['Fiyatları anında güncelleme', 'Baskı masrafı yok', 'Mobil uyumlu, hızlı açılan menü', 'Kategori ve ürün görselleri'],
      },
    ],
    faq: [
      { q: 'QR menü ne kadar?', a: `QR menü paketleri ${qrMenuPlans.map((p) => `${p.name} ${p.price}`).join(', ')} şeklindedir.` },
      { q: 'Menüyü kendim güncelleyebilir miyim?', a: 'Evet, ürün ve fiyatları anlık olarak güncelleyebilirsiniz.' },
    ],
    projectIds: ['qrmenu'],
    related: [
      { label: 'Örnek QR menü', href: '/projeler/qrmenu' },
      { label: 'Tüm paketler', href: '/paketler#qr-menu' },
    ],
    cta: { label: 'QR Menü Paketlerini Gör', href: '/paketler#qr-menu' },
  },
  {
    slug: 'logo-tasarim-fiyatlari',
    metaTitle: 'Logo Tasarım Fiyatları: Markanıza Özel Logo',
    metaDescription: `Logo tasarım fiyatı ${logoPlan.price}. Markanıza özel logo, uygulama ikonu sürümü, şeffaf PNG teslim ve revizyon hakkı. Örnek logolarımızı inceleyin.`,
    heading: 'Logo Tasarım Fiyatları',
    title: 'Markanıza özel',
    accent: 'net fiyatlı logo.',
    intro: `İyi bir logo; web sitesinde, sosyal medyada, tabelada ve uygulama ikonunda aynı netlikte görünmelidir. HAYB’de logo tasarımı ${logoPlan.price}’dir; uygulama ikonu sürümü ve şeffaf arka planlı teslim dahildir.`,
    serviceType: 'Logo ve marka kimliği tasarımı',
    prices: { title: 'Logo tasarım paketi', rows: [{ name: logoPlan.name, price: logoPlan.price, note: logoPlan.features.join(' · ') }] },
    sections: [
      {
        title: 'Logo ile birlikte neler alırsınız?',
        text: 'Logonuzu her yerde kullanabilmeniz için gerekli dosyaları teslim ediyoruz:',
        bullets: logoPlan.features,
      },
      {
        title: 'Sosyal medya tasarımıyla birlikte',
        text: `Logonuzla uyumlu sosyal medya post ve story tasarımları için paketler haftalık ${socialMediaPlans[0].price.split(' /')[0]}’den başlar.`,
      },
    ],
    faq: [
      { q: 'Logo tasarımı ne kadar?', a: `Logo tasarımı ${logoPlan.price}’dir; revizyon hakkı dahildir.` },
      { q: 'Logo hangi formatlarda teslim edilir?', a: 'Şeffaf arka planlı PNG ve uygulama ikonu sürümüyle, açık ve koyu zeminde kullanılabilir şekilde teslim edilir.' },
    ],
    projectIds: [],
    related: [
      { label: 'Marka tasarımı hizmeti', href: '/hizmetler/marka-tasarimi' },
      { label: 'Sosyal medya tasarımı', href: '/hizmetler/sosyal-medya' },
    ],
    cta: { label: 'Logo Paketini Gör', href: '/paketler#logo' },
  },
];

export const keywordPageBySlug = (slug: string) => keywordPages.find((p) => p.slug === slug);
