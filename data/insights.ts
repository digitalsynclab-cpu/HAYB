/**
 * HAYB Insights: bilgi ve tasarım günlüğü.
 * Makaleler genel meslek bilgisidir; HAYB'a ait sonuç, rakam, müşteri yorumu veya ölçüm iddiası içermez.
 * Yeni makale = bu diziye bir kayıt (sitemap, llms.txt ve iç bağlantılar otomatik güncellenir).
 * Metin biçimi: **kalın** ve [bağlantı](/iç-yol) desteklenir.
 */
export type InsightCategory = 'UI/UX' | 'Web' | 'Software' | 'AI' | 'Product' | 'Business' | 'Digital Growth' | 'Design';

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string };

export interface Insight {
  slug: string;
  title: string;
  description: string;
  category: InsightCategory;
  /** Yayın tarihi (ISO). Gerçek yayın tarihidir; sitemap lastModified bunu kullanır. */
  date: string;
  /** Yalnızca içerik gerçekten güncellendiyse. */
  updated?: string;
  intro: string;
  blocks: Block[];
  /** İç bağlantılar: ilgili hizmet, proje ve şablon; sayfa sonu çağrısı. */
  related: { services: string[]; projects: string[]; templates: string[]; cta: { label: string; href: string } };
}

export const insights: Insight[] = [
  {
    slug: 'restoran-web-sitesinde-rezervasyon-ux',
    title: 'Restoran web sitesinde rezervasyon UX’i nasıl tasarlanır?',
    description:
      'Restoran sitelerinde rezervasyon formu neden yarıda bırakılır? Alan sayısı, tarih ve saat seçimi, onay ekranı ve WhatsApp yedeği için pratik tasarım kararları.',
    category: 'UI/UX',
    date: '2026-09-25',
    intro:
      'Bir restoran sitesini ziyaret edenlerin çoğu tek bir şey arar: bu akşam masa var mı ve nasıl ayırtırım? Rezervasyon formu, ziyaretin gelire dönüştüğü yerdir ve çoğu sitede en zayıf halka da odur. Aşağıda, formu tasarlarken verilmesi gereken kararları sırasıyla ele alıyoruz.',
    blocks: [
      { type: 'h2', text: 'Önce modeli seçin: anlık rezervasyon mu, rezervasyon talebi mi?' },
      {
        type: 'p',
        text: 'İki farklı ürün vardır ve arayüzleri farklı kurgulanır. **Anlık rezervasyon**, masa yönetimi yazılımıyla entegredir: kullanıcı gerçek doluluğu görür ve onayı hemen alır. **Rezervasyon talebi** ise restoranın telefonla veya WhatsApp’tan onayladığı bir formdur. Küçük ve orta ölçekli işletmelerin çoğu ikinci modeldedir. Bu durumda en önemli kural, arayüzün yanlış söz vermemesidir: form gönderildikten sonra “Rezervasyonunuz onaylandı” yerine “Talebiniz alındı, onay için sizinle iletişime geçeceğiz” yazın.',
      },
      { type: 'h2', text: 'Alan sayısını en aza indirin' },
      { type: 'p', text: 'Her ek alan, formun yarıda bırakılma ihtimalini artırır. Rezervasyon için gerçekten gerekli olanlar şunlardır:' },
      { type: 'ul', items: ['Tarih', 'Saat', 'Kişi sayısı', 'Ad soyad', 'Telefon'] },
      {
        type: 'p',
        text: 'E-posta, özel not (alerji, doğum günü, çocuk sandalyesi gibi) ve masa tercihi isteğe bağlı olmalıdır. Restoranın gerçekten kullanmayacağı bir bilgiyi zorunlu tutmayın. Telefon alanında telefon klavyesini açın ve yazım biçimini katı kurallara bağlamayın: kullanıcı 0532 ile de +90 ile de yazsa kabul edin.',
      },
      { type: 'h2', text: 'Tarih, saat ve kişi sayısı seçicileri' },
      { type: 'p', text: 'Bu üç alan formun kalbidir; küçük ayrıntılar sonucu belirler.' },
      {
        type: 'ul',
        items: [
          '**Kişi sayısı:** Serbest metin yerine artı/eksi düğmeleri veya 1–8 arası seçim çipleri kullanın. Belirli bir sayının üstü için “Büyük gruplar için bizi arayın” bağlantısı ekleyin.',
          '**Tarih:** “Bugün” ve “Yarın” kısayolları ekleyin; çoğu talep yakın tarihlidir. Kapalı olduğunuz günleri seçilemez yapın ve nedenini gösterin.',
          '**Saat:** Serbest saat girişi yerine, çalışma saatlerinizden üretilmiş saat çipleri sunun. Dolu saatleri gizlemek yerine pasif gösterip yakın alternatifleri önerin.',
          '**Tarih seçici:** Tarayıcıların yerleşik tarih alanları cihazdan cihaza farklı görünür. Özel bir takvim kullanacaksanız klavye ve ekran okuyucu erişimini de test edin.',
        ],
      },
      { type: 'h2', text: 'Mobilde başparmakla kullanılabilirlik' },
      {
        type: 'p',
        text: 'Restoran sitesine gelen trafiğin önemli bir kısmı telefondan gelir. Birincil düğmeyi başparmağın rahat ulaştığı alt bölgede tutun, dokunma alanlarını en az 44 piksel yapın ve sayfa boyunca görünür bir “Rezervasyon” çağrısı bırakın. Formu doldurmak istemeyenler için yanına tek dokunuşla aranabilen bir telefon bağlantısı ve WhatsApp seçeneği ekleyin; alternatifin varlığı formu zayıflatmaz, dönüşümü kaybetmemenizi sağlar.',
      },
      { type: 'h2', text: 'Onay ekranı: ne oldu, sırada ne var?' },
      {
        type: 'p',
        text: 'Gönderim sonrası ekran üç soruyu yanıtlamalıdır: **Ne gönderdim?** (tarih, saat ve kişi sayısı özeti), **Şimdi ne olacak?** (onay hangi kanaldan gelecek) ve **Değiştirmek istersem?** (telefon veya WhatsApp bağlantısı). İşletmenin adı, adresi ve telefonu bu ekranda da görünsün. Kullanıcı büyük ihtimalle ekran görüntüsü alacaktır; ekranı buna göre tasarlayın.',
      },
      { type: 'h2', text: 'Hatırlatma mesajları ve izinler' },
      {
        type: 'p',
        text: 'Rezervasyonla ilgili bilgilendirme mesajı ile pazarlama mesajı aynı şey değildir. Telefon numarasını rezervasyon için alıyorsanız, aynı numarayı kampanya göndermek için kullanmak ayrı bir izin gerektirir. Kişisel verilerin işlenmesine ilişkin aydınlatma metnini (KVKK) formun yanında açıkça gösterin; ticari ileti izni gerekiyorsa bunu ayrı ve önceden işaretlenmemiş bir onay kutusuyla isteyin. Kapsamı işletmenizin durumuna göre bir hukuk danışmanıyla netleştirin.',
      },
      { type: 'h2', text: 'Hata durumlarını tasarlayın' },
      {
        type: 'ul',
        items: [
          'Doğrulama hatalarını alanın yanında, ne düzeltileceğini söyleyerek gösterin: “Telefon numarası eksik görünüyor” gibi.',
          'Hata sonrasında kullanıcının girdiği hiçbir değeri silmeyin.',
          'Seçilen saat dolduysa yalnızca hata vermeyin, yakın saatleri önerin: “20:00 dolu; 19:30 veya 20:30 uygun görünüyor.”',
          'Gönderim başarısız olursa bilgileri koruyun ve telefon ya da WhatsApp yolunu görünür kılın.',
        ],
      },
      { type: 'h2', text: 'Ölçün ve iyileştirin' },
      {
        type: 'p',
        text: 'Formun nerede terk edildiğini bilmeden iyileştirme yapılamaz. Formu başlatan, saat seçen ve gönderen kullanıcı sayılarını ayrı ayrı izleyin; mobil ve masaüstünü karşılaştırın. Bu ölçümler için ad ve telefon gibi kişisel verileri analitik araçlarına göndermeye gerek yoktur; adım bilgisi yeterlidir.',
      },
      { type: 'h2', text: 'Kontrol listesi' },
      {
        type: 'ul',
        items: [
          'Zorunlu alanlar en fazla beş mi?',
          'Tarih ve saat seçicisi mobilde tek elle kullanılabiliyor mu?',
          'Kapalı gün ve dolu saat davranışı açıklanıyor mu?',
          'Onay metni yanlış söz vermiyor mu (talep mi, onay mı)?',
          'Telefon ve WhatsApp alternatifi görünür mü?',
          'Hata sonrasında girilen bilgiler korunuyor mu?',
          'Kişisel veri ve ileti izinleri ayrı ve açık mı?',
        ],
      },
      {
        type: 'callout',
        title: 'Canlı örnek',
        text: 'HAYB’ın restoran şablonu LezzetDurağı’nda örnek bir rezervasyon formu vardır. Şablon kurgusal bir markadır ve form demodur; bilgileriniz hiçbir yere gönderilmez. [Telefonunuzda deneyin](/template/web4).',
      },
    ],
    related: { services: ['ui-ux', 'web-sitesi'], projects: [], templates: ['web4'], cta: { label: 'Restoran şablonunu kullanarak başlayın', href: '/web-sitesi-siparis?template=web4' } },
  },
  {
    slug: 'dashboard-tasariminda-sik-gorulen-7-hata',
    title: 'Dashboard tasarımında sık görülen 7 hata',
    description:
      'İyi bir yönetim paneli birkaç saniyede “neye dikkat etmeliyim?” sorusunu yanıtlar. Hiyerarşi, grafik seçimi, filtreler, tablolar ve erişilebilirlikte yedi hata ve çözümü.',
    category: 'UI/UX',
    date: '2026-09-25',
    intro:
      'İyi bir dashboard, kullanıcının “şu an neye dikkat etmeliyim?” sorusuna birkaç saniyede cevap verir. Kötüsü her veriyi gösterir ama hiçbirini anlatmaz. Yönetim paneli ve dashboard projelerinde sık görülen yedi hatayı, düzeltme yollarıyla birlikte özetliyoruz.',
    blocks: [
      { type: 'h2', text: '1. Hiyerarşisiz, her şeyi gösteren ekran' },
      {
        type: 'p',
        text: 'Ekranda otuz kutu varsa hiçbiri öne çıkmaz. Başlamadan önce kullanıcının bu ekranda cevaplaması gereken üç ila beş soruyu yazın; her bileşen bu sorulardan birine hizmet etmelidir. En önemli göstergeler sol üstte ve en büyük boyutta durur; ikincil analizler detay sayfalarına veya açılır alanlara taşınır.',
      },
      { type: 'h2', text: '2. Soruya değil, görünüşe göre seçilen grafik' },
      {
        type: 'ul',
        items: [
          '**Zaman içindeki değişim** için çizgi grafik.',
          '**Kategorileri karşılaştırmak** için çubuk grafik; eksen sıfırdan başlamalıdır.',
          '**Bütün içindeki pay** için, yalnızca az sayıda (genellikle 2–5) kategori varsa pasta veya halka grafik.',
          '**Kesin değerler** gerekiyorsa grafik yerine tablo.',
        ],
      },
      { type: 'p', text: 'Üç boyutlu grafikler, çift eksenler ve çok dilimli pasta grafikleri okumayı zorlaştırır. Süsleme veriyi anlamayı hızlandırmıyorsa kaldırılmalıdır.' },
      { type: 'h2', text: '3. Bağlamsız sayılar' },
      {
        type: 'p',
        text: '“1.240” tek başına bir şey söylemez. Önceki dönemle karşılaştırma, hedef veya normal aralık gösterin. Seçili tarih aralığı her zaman görünür olsun; saat dilimi ve verinin en son ne zaman güncellendiği de belirtilsin.',
      },
      { type: 'h2', text: '4. Kaybolan ve gizlenen filtreler' },
      {
        type: 'p',
        text: 'Sayfa değiştirince sıfırlanan filtre, kullanıcının çalışmasını siler. Etkin filtreleri liste üstünde çip olarak gösterin, tek dokunuşla temizlenebilir yapın ve filtre durumunu adres çubuğuna yansıtın; böylece görünüm paylaşılabilir ve geri düğmesi beklendiği gibi çalışır.',
      },
      { type: 'h2', text: '5. İhmal edilen tablo' },
      { type: 'p', text: 'Yönetim panellerinde işin büyük kısmı tabloda yapılır. Bir tablonun olmazsa olmazları:' },
      {
        type: 'ul',
        items: [
          'Sıralama ve arama',
          'Sayfalama veya büyük veri için sanal liste',
          'Sayısal sütunların sağa hizalanması ve sabit genişlikli rakamlar',
          'Yükleniyor, boş ve hata durumları',
          'Gerektiğinde toplu işlem ve dışa aktarma',
          'Satır başına net bir birincil eylem',
        ],
      },
      { type: 'h2', text: '6. Yetki ve veri tazeliğinin görmezden gelinmesi' },
      {
        type: 'p',
        text: 'Her kullanıcı her şeyi görmemeli ve yapamamalıdır. Yetkisi olmayan eylemleri gizlemek mi, pasif gösterip nedenini açıklamak mı daha doğru olduğuna bağlama göre karar verin; ama bunu bilinçli yapın. Ayrıca verinin ne kadar güncel olduğu (“Son güncelleme: 14:05”) görünmezse kullanıcı eski veriyle karar verebilir.',
      },
      { type: 'h2', text: '7. Mobil ve erişilebilirlik' },
      {
        type: 'p',
        text: 'Panelin yalnızca masaüstünde kullanılacağı varsayımı çoğu zaman yanlıştır. Tabloları küçük ekranda kart görünümüne çevirmeyi, grafikleri dokunmayla okunur hale getirmeyi planlayın. Durumları yalnızca renkle (kırmızı/yeşil) anlatmayın; ikon veya metin ekleyin ve kontrast oranlarını doğrulayın. Klavyeyle gezinme ve odak göstergesi de kontrol listesinde olmalıdır.',
      },
      { type: 'h2', text: 'Başlamak için beş soru' },
      {
        type: 'ol',
        items: [
          'Bu ekranı kim, hangi anda açıyor?',
          'Açtığında hangi kararı vermeye çalışıyor?',
          'Bu karar için hangi üç sayı gerekli?',
          'Bir şey ters gittiğinde ilk hangi sinyal uyarı vermeli?',
          'Bu ekrandan hangi eylem tek dokunuşla yapılabilmeli?',
        ],
      },
      {
        type: 'callout',
        title: 'Örnekler',
        text: 'HAYB’ın yönetim paneli ve dashboard örneklerini [Yönetim Paneli hizmet sayfasında](/hizmetler/yonetim-paneli) inceleyebilirsiniz.',
      },
    ],
    related: { services: ['yonetim-paneli', 'ui-ux', 'ozel-yazilim'], projects: ['ekotakippro'], templates: [], cta: { label: 'Yönetim paneliniz için teklif alın', href: '/proje-baslat' } },
  },
  {
    slug: 'hazir-web-sitesi-ile-ozel-tasarim-arasindaki-fark',
    title: 'Hazır web sitesi ile özel tasarım arasındaki fark',
    description:
      'Hazır tasarımla mı başlamalı, özel tasarım mı yaptırmalı? Süre, maliyet, özgünlük, esneklik ve bakım açısından iki yolun karşılaştırması ve karar ölçütleri.',
    category: 'Web',
    date: '2026-09-25',
    intro:
      'Web sitesi yaptırmayı düşünen çoğu işletme aynı soruyla karşılaşır: hazır bir tasarımla mı gitmeli, yoksa sıfırdan özel tasarım mı yaptırmalı? İkisi de doğru olabilir; hangisinin doğru olduğu bütçeye, zamana ve sitenin işinizdeki rolüne bağlıdır.',
    blocks: [
      { type: 'h2', text: 'İkisi aynı şey değildir' },
      {
        type: 'p',
        text: '**Hazır tasarım (şablon)**, daha önce kurgulanmış bir sayfa düzeni, bileşen seti ve görsel dille başlamak demektir. Markanız için renk, yazı tipi, içerik ve görseller uyarlanır; yapı büyük ölçüde hazırdır. **Özel tasarım** ise işletmenizin hedeflerinden yola çıkarak sayfa yapısının, akışın ve görsel dilin sıfırdan oluşturulmasıdır.',
      },
      { type: 'h2', text: 'Altı ölçütte karşılaştırma' },
      {
        type: 'ul',
        items: [
          '**Süre:** Hazır tasarımda yapı hazır olduğu için teslim kısalır. Özel tasarımda keşif, akış ve arayüz aşamaları ek süre gerektirir.',
          '**Maliyet:** Tasarım emeği paylaşıldığı için hazır tasarım genellikle daha uygun fiyatlıdır.',
          '**Özgünlük:** Özel tasarım, rakiplerinizden ayrışmayı kolaylaştırır. Hazır tasarımda ayrışmayı içerik, fotoğraf ve marka dili sağlar.',
          '**Esneklik:** Standart dışı bir akış (özel randevu mantığı, karmaşık filtreleme, kullanıcı paneli) gerekiyorsa özel çalışma daha uygundur.',
          '**Risk:** Hazır tasarımı canlı denediğiniz için ne alacağınızı önceden görürsünüz. Özel tasarımda sonuç, tasarım onaylarıyla adım adım netleşir.',
          '**Bakım:** İkisinde de önemli olan, içeriği kendiniz güncelleyebilmeniz ve teknik altyapının temiz olmasıdır.',
        ],
      },
      { type: 'h2', text: 'Hazır tasarım şu durumlarda mantıklıdır' },
      {
        type: 'ul',
        items: [
          'Sınırlı bütçeyle hızlı yayına çıkmak istiyorsanız.',
          'İşinizin sayfa ihtiyacı standartsa: tanıtım, hizmetler, iletişim, birkaç ürün gibi.',
          'Önce siteyi yayına alıp sonra geliştirmek istiyorsanız.',
          'Ne alacağınızı görerek karar vermek istiyorsanız.',
        ],
      },
      { type: 'h2', text: 'Özel tasarım şu durumlarda mantıklıdır' },
      {
        type: 'ul',
        items: [
          'Marka kimliğiniz, sitenizle birlikte belirleyici bir rekabet unsuruysa.',
          'Standart şablonların karşılamadığı bir kullanıcı akışı gerekiyorsa.',
          'Site satışın ve müşteri kazanımının ana kanalıysa ve dönüşüm akışlarını ayrıntılı kurgulamak istiyorsanız.',
          'Zaman içinde büyüyecek, özel özellikler eklenecek bir ürün kuruyorsanız.',
        ],
      },
      { type: 'h2', text: 'Sık yapılan hata: şablonu yalnızca “görünüş” olarak seçmek' },
      {
        type: 'p',
        text: 'Bir şablonun size uyup uymadığını renklerine değil akışına bakarak değerlendirin: menü yapısı işinizin sayfalarını taşıyor mu, ana çağrı (arama, randevu, sipariş, teklif) doğru yerde mi, mobilde rahat kullanılıyor mu? Tasarımı telefonunuzda canlı deneyin. HAYB’ın örnek şablonlarının tamamı [canlı olarak denenebilir](/template).',
      },
      { type: 'h2', text: 'Ara yol: hazırla başlayıp özelleştirmek' },
      {
        type: 'p',
        text: 'Bu ikisi birbirinin alternatifi olmak zorunda değildir. Hazır bir tasarımla yayına çıkıp trafiği ve kullanıcı davranışını gözlemledikten sonra, gerçekten ihtiyaç duyulan yerleri özelleştirmek ya da ileride özel bir tasarıma geçmek mantıklı bir yoldur. Bu yolda içeriğinizi, alan adınızı ve ölçüm verilerinizi taşınabilir tutmak önemlidir.',
      },
      { type: 'h2', text: 'HAYB’da nasıl işliyor?' },
      {
        type: 'p',
        text: 'HAYB’da hazır tasarım seçenekleri Business paketi ve üzerindeki projelerde kullanılabilir. Paket kapsamlarını [Paketler sayfasında](/paketler#web) görebilir, beğendiğiniz şablonu seçerek [web sitesi sipariş formunu](/web-sitesi-siparis) doldurabilirsiniz; form, hazır tasarım seçme adımını da içerir.',
      },
    ],
    related: { services: ['web-sitesi', 'ui-ux'], projects: ['webevtekstil'], templates: ['web1', 'web3'], cta: { label: 'Web sitesi siparişini başlatın', href: '/web-sitesi-siparis' } },
  },
  {
    slug: 'web-sitesi-yenilerken-ilk-bakilmasi-gereken-10-sey',
    title: 'Bir web sitesini yenilerken ilk bakılması gereken 10 şey',
    description:
      'Site yenilemek yalnızca yeni görünüm değildir. Hedef, yönlendirme, içerik envanteri, hız, dönüşüm yolları ve teknik altyapı için yayından önce kontrol edilecek on başlık.',
    category: 'Digital Growth',
    date: '2026-09-25',
    intro:
      'Web sitesi yenilemek yalnızca yeni bir görünüm demek değildir; yanlış yapıldığında mevcut arama görünürlüğünü ve müşteri kanallarını kaybetmek anlamına da gelir. Aşağıdaki on başlık, tasarıma başlamadan önce ele alınması gereken konuları sırasıyla özetler.',
    blocks: [
      { type: 'h2', text: '1. Hedef ve başlangıç ölçümü' },
      {
        type: 'p',
        text: 'Yenilemenin amacı net değilse başarıyı ölçemezsiniz: daha fazla teklif talebi mi, daha hızlı sayfalar mı, yeni bir hedef kitle mi? Değişiklikten önce mevcut ziyaretçi, sayfa görüntüleme ve dönüşüm verilerini kaydedin; Search Console’da en çok gösterim ve tıklama alan sayfaları not edin.',
      },
      { type: 'h2', text: '2. Arama sonuçlarında yer alan ve bağlantı alan adresler' },
      {
        type: 'p',
        text: 'Adresi değişecek her sayfa için eski adresten yenisine kalıcı (301) yönlendirme planlayın. Bu liste olmadan yapılan yenilemelerde bağlantı ve sıralama değeri kaybolabilir. Mümkünse önemli adresleri değiştirmeyin.',
      },
      { type: 'h2', text: '3. İçerik envanteri' },
      {
        type: 'p',
        text: 'Mevcut sayfaları listeleyin ve her biri için karar verin: korunacak, iyileştirilecek, birleştirilecek veya kaldırılacak. Hiç ziyaret almayan ve birbirini tekrar eden sayfaları yeni siteye taşımak zorunda değilsiniz.',
      },
      { type: 'h2', text: '4. Başlıklar, açıklamalar ve başlık hiyerarşisi' },
      {
        type: 'p',
        text: 'Her sayfanın benzersiz bir başlığı (title), açıklaması ve tek bir ana başlığı (H1) olmalı. İyi performans gösteren sayfaların başlıklarını gerekçesiz değiştirmeyin; yeni tasarımda mevcut değerleri karşılaştırma için saklayın.',
      },
      { type: 'h2', text: '5. Mobil deneyim ve hız' },
      {
        type: 'p',
        text: 'Trafiğin büyük bölümü telefondan gelir. Google’ın “iyi” eşikleri şöyledir: en büyük içerik öğesinin yüklenmesi (LCP) 2,5 saniye veya altı, etkileşim yanıtı (INP) 200 milisaniye veya altı, düzen kayması (CLS) 0,1 veya altı. Yeni tasarımın bu değerleri bozmadığını yayından önce ve sonra ölçün.',
      },
      { type: 'h2', text: '6. Bilgi mimarisi ve menü' },
      {
        type: 'p',
        text: 'Menüyü kurumsal organizasyonunuza göre değil, ziyaretçinin yapmak istediği işlere göre kurun. Hizmetler, paketler ya da fiyatlar, örnek işler ve iletişim gibi ana yolları en fazla iki dokunuşla ulaşılabilir tutun.',
      },
      { type: 'h2', text: '7. Dönüşüm yolları' },
      {
        type: 'p',
        text: 'Ziyaretçinin atacağı bir sonraki adım her sayfada nettir: arama, WhatsApp, form, randevu ya da sipariş. Bu yolları yayından önce gerçek cihazlarda deneyin ve hangi eylemlerin ölçüleceğini belirleyin.',
      },
      { type: 'h2', text: '8. Teknik altyapı' },
      {
        type: 'ul',
        items: [
          'HTTPS ve www / www’suz adresler arasında tek yönlü yönlendirme',
          'XML site haritası ve robots.txt',
          'Her sayfada doğru canonical adresi',
          'Gerçek bir 404 sayfası',
          'Yayına çıkarken hazırlık ortamındaki “noindex” ayarının kaldırıldığından emin olmak',
        ],
      },
      { type: 'h2', text: '9. Erişilebilirlik ve güven unsurları' },
      {
        type: 'p',
        text: 'Yeterli renk kontrastı, görsellerde anlamlı alternatif metin, klavyeyle gezinme ve okunabilir yazı boyutu hem kullanıcıyı hem aramayı destekler. İletişim bilgileri, işletme adı ve yasal metinler (gizlilik, KVKK, çerez) güncel ve kolay bulunur olmalıdır.',
      },
      { type: 'h2', text: '10. Sahiplik ve erişimler' },
      {
        type: 'p',
        text: 'Alan adı, barındırma, DNS ve analitik hesapları sizin adınıza kayıtlı olmalı ve erişim bilgileri sizde bulunmalı. Yenileme sırasında yedek alın ve geri dönüş planı hazırlayın. Şifreleri mesajla paylaşmak yerine güvenli yöntemler kullanın.',
      },
      { type: 'h2', text: 'Yayından sonra' },
      {
        type: 'p',
        text: 'Yayına çıktıktan sonraki iki–dört hafta boyunca Search Console’da dizin kapsamını, tarama hatalarını ve gösterim/tıklama değişimini izleyin. Küçük dalgalanmalar beklenebilir; süren düşüş ve “bulunamadı” hataları eksik yönlendirmeye işaret eder.',
      },
      {
        type: 'callout',
        title: 'Yenileme mi düşünüyorsunuz?',
        text: 'Mevcut sitenizi birlikte değerlendirmek için [web sitesi sipariş formunu](/web-sitesi-siparis) doldurabilir veya [bize yazabilirsiniz](/iletisim).',
      },
    ],
    related: { services: ['web-sitesi', 'ui-ux'], projects: ['webinsaat'], templates: [], cta: { label: 'Web sitesi siparişini başlatın', href: '/web-sitesi-siparis' } },
  },
  {
    slug: 'dijital-urunun-fikirden-canli-urune-yolculugu',
    title: 'Bir dijital ürünün fikirden canlı ürüne yolculuğu',
    description:
      'Problemden kapsama, akıştan arayüze, geliştirmeden mağaza yayınına: bir uygulama veya dijital ürünün sekiz aşaması ve her aşamada verilmesi gereken kararlar.',
    category: 'Product',
    date: '2026-09-25',
    intro:
      'Bir uygulama ya da dijital ürün fikri, ilk çizimden mağazadaki yayına kadar birbirine bağlı aşamalardan geçer. Bu yazıda aşamaları ve her aşamada verilmesi gereken kararları sırasıyla anlatıyoruz. Süreler ürünün kapsamına göre değiştiği için takvim vermiyoruz.',
    blocks: [
      { type: 'h2', text: '1. Problem ve kullanıcı' },
      {
        type: 'p',
        text: 'Ürün, bir kişinin belirli bir durumda yaşadığı probleme cevap verir. Önce bu kişiyi ve durumu tek cümleyle yazın. Cümle yazılamıyorsa ekran çizmek için erkendir.',
      },
      { type: 'h2', text: '2. Kapsam: ilk sürümde ne var, ne yok?' },
      {
        type: 'p',
        text: 'İlk sürüm (MVP), ürünün değerini gösterecek en küçük tam deneyimdir. Özellik listesinin yanına “ilk sürümde olmayacaklar” listesi de yazın; bu liste kapsamın sessizce büyümesini engeller.',
      },
      { type: 'h2', text: '3. Akışlar, wireframe ve prototip' },
      {
        type: 'p',
        text: 'Kullanıcının hedefe ulaşma yolunu ekran ekran çizin: ilk açılış (onboarding), ana ekran, arama ve detay, profil, bildirim. Tıklanabilir bir prototip, kodlamaya başlamadan akıştaki tıkanıklıkları ucuza yakalatır.',
      },
      { type: 'h2', text: '4. Arayüz ve tasarım sistemi' },
      {
        type: 'p',
        text: 'Renk, yazı tipi, boşluk ve bileşenler bir sistem olarak tanımlanırsa yeni ekranlar hızlı ve tutarlı üretilir. Koyu/açık mod, erişilebilir kontrast ve farklı ekran boyutları bu aşamada düşünülür.',
      },
      { type: 'h2', text: '5. Geliştirme' },
      {
        type: 'ul',
        items: [
          'Arayüz ve uygulama mantığı',
          'API ve veritabanı',
          'Kimlik doğrulama ve yetkilendirme',
          'Bildirim, ödeme, harita gibi entegrasyonlar',
          'İçeriği ve kullanıcıları yönetmek için yönetim paneli',
        ],
      },
      { type: 'h2', text: '6. Test' },
      {
        type: 'p',
        text: 'Gerçek cihazlarda ve farklı ağ koşullarında deneyin. Ödeme ve kimlik doğrulama gibi kritik akışlar için hata senaryolarını (bağlantı kopması, yanlış giriş, iptal) ayrıca test edin.',
      },
      { type: 'h2', text: '7. Mağaza yayını (mobil uygulamalar için)' },
      { type: 'p', text: 'Yayın, teknik bitişten farklı bir iştir ve kendi hazırlıklarını gerektirir:' },
      {
        type: 'ul',
        items: [
          'Uygulama ikonu, ekran görüntüleri ve mağaza açıklaması',
          'Gizlilik politikası ve mağazaların istediği veri kullanımı beyanları',
          'Uygulama içinde hesap oluşturulabiliyorsa hesabın silinebilmesi için bir yol (Apple ve Google bunu ister)',
          'İnceleme sürecine ve olası düzeltme turlarına pay bırakmak',
        ],
      },
      { type: 'p', text: 'Apple ve Google’ın kuralları zamanla değişir; yayından önce güncel yönergeleri kontrol edin.' },
      { type: 'h2', text: '8. Yayından sonra' },
      {
        type: 'p',
        text: 'İlk sürüm bir başlangıçtır. Kişisel veri toplamadan ölçülebilen kullanım adımlarını, mağaza yorumlarını ve destek taleplerini izleyin; güncellemeleri bu geri bildirimle önceliklendirin.',
      },
      { type: 'h2', text: 'Örnekler' },
      {
        type: 'p',
        text: 'HAYB’ın yayındaki ürünlerinden [BB Block: Wood Puzzle](/projeler/bbblock) oyun olarak hem App Store’da hem Google Play’de, [BebeklerSoruyor](/projeler/bebeklersoruyor) ise ebeveynler için bir topluluk platformu olarak web ve mobilde yer alıyor.',
      },
      {
        type: 'callout',
        title: 'Fikriniz mi var?',
        text: 'Kapsamı birlikte netleştirmek için [proje başlatabilirsiniz](/proje-baslat). Süreç adımlarımızı [Süreç sayfasında](/surec) görebilirsiniz.',
      },
    ],
    related: { services: ['mobil-uygulama', 'ozel-yazilim', 'ui-ux'], projects: ['bbblock', 'bebeklersoruyor'], templates: [], cta: { label: 'Projenizi başlatın', href: '/proje-baslat' } },
  },
];

export const insightBySlug = (slug: string) => insights.find((i) => i.slug === slug);

/** Yalnızca yazısı bulunan kategoriler listelenir (boş kategori bağlantısı bırakılmaz). */
export const insightCategories = (): InsightCategory[] => Array.from(new Set(insights.map((i) => i.category)));

export const insightsForService = (serviceSlug: string) => insights.filter((i) => i.related.services.includes(serviceSlug));

function words(blocks: Block[], intro: string): number {
  const text = [
    intro,
    ...blocks.flatMap((b) => (b.type === 'ul' || b.type === 'ol' ? b.items : b.type === 'callout' ? [b.title, b.text] : [b.text])),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Ortalama 200 kelime/dakika. */
export const readingMinutes = (i: Insight) => Math.max(1, Math.round(words(i.blocks, i.intro) / 200));
