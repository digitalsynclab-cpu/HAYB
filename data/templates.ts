/**
 * Canlı örnek web sitesi şablonları (/template/web1 … web8).
 * Markalar, ürünler ve fiyatlar KURGUSALDIR; şablonun nasıl görünüp çalıştığını göstermek içindir.
 * Görseller, HAYB tarafından hazırlanan tasarım örneklerinden alınmıştır (public/images/templates).
 */
export type TIcon =
  | 'coffee' | 'cup' | 'leaf' | 'truck' | 'recycle' | 'cart' | 'bag' | 'heart' | 'user' | 'stethoscope' | 'syringe'
  | 'paw' | 'sparkles' | 'droplets' | 'scissors' | 'home' | 'shield' | 'package' | 'headphones' | 'chef' | 'utensils'
  | 'users' | 'calendar' | 'clock' | 'building' | 'sprout' | 'palette' | 'globe' | 'chart' | 'bulb' | 'pen' | 'megaphone'
  | 'bed' | 'sofa' | 'lamp' | 'key' | 'wine' | 'flame' | 'badge' | 'tag' | 'gift' | 'smile' | 'bone' | 'bath' | 'wheat'
  | 'flask' | 'salad' | 'award' | 'refresh' | 'lock' | 'card' | 'map' | 'phone' | 'mail' | 'camera' | 'brush' | 'activity' | 'hospital';

export interface Cta {
  label: string;
  /** Sayfa içi bölüm kimliği */
  to?: string;
  play?: boolean;
}

export interface GridItem {
  img?: string;
  title: string;
  text?: string;
  price?: string;
  tag?: string;
  meta?: string[];
  icon?: TIcon;
  category?: string;
  tint?: string;
}

export type Tone = 'bg' | 'dark' | 'soft' | 'accent' | 'lime';

export type TSection =
  | {
      type: 'hero';
      id: string;
      variant: 'dark' | 'light';
      kicker?: string;
      title: string[];
      accentLine?: number;
      text: string;
      primary: Cta;
      secondary?: Cta;
      image: string;
      note?: string;
      badge?: { icon: TIcon; title: string; text: string };
      points?: { icon: TIcon; text: string }[];
    }
  | { type: 'strip'; id?: string; tone: Tone; items: { icon: TIcon; title: string; text?: string }[]; cards?: boolean }
  | {
      type: 'grid';
      id: string;
      tone?: Tone;
      kicker?: string;
      title: string;
      text?: string;
      variant: 'product' | 'category' | 'dish' | 'property' | 'work' | 'service' | 'pastel' | 'gallery' | 'bags';
      items: GridItem[];
      filters?: string[];
      cols?: 3 | 4 | 5;
    }
  | {
      type: 'banner';
      id: string;
      tone: Tone;
      side: 'left' | 'right';
      kicker?: string;
      title: string;
      text: string;
      cta?: Cta;
      image: string;
      script?: string;
    }
  | {
      type: 'cta';
      id: string;
      tone: Tone;
      kicker?: string;
      title: string;
      text: string;
      form: 'reserve' | 'newsletter' | 'contact' | 'appointment';
      button: string;
      image?: string;
    };

export interface TFooter {
  about: string;
  columns: { title: string; links: { label: string; to?: string }[] }[];
  newsletter?: boolean;
}

export interface TemplateDef {
  slug: string;
  brand: string;
  sector: string;
  /** Galeri kartı ve meta açıklaması */
  summary: string;
  features: string[];
  font: 'serif' | 'rounded' | 'grotesk';
  logoIcon: TIcon;
  theme: { bg: string; ink: string; muted: string; accent: string; accentInk: string; accent2?: string; dark: string; darkInk: string; soft: string; card: string };
  nav: { label: string; to: string }[];
  cta: Cta;
  actions: { search?: boolean; cart?: boolean; account?: boolean };
  sections: TSection[];
  footer: TFooter;
}

const img = (n: number, name: string) => `/images/templates/web${n}-${name}.webp`;
export const templateThumb = (slug: string) => `/images/templates/${slug}-thumb.webp`;

export const templates: TemplateDef[] = [
  // ─────────────────────────── web1: Kahvehan (kahve markası, e-ticaret) ───────────────────────────
  {
    slug: 'web1',
    brand: 'Kahvehan',
    sector: 'Kahve markası',
    summary: 'Butik kahve markası için sıcak, editoryal bir e-ticaret vitrini.',
    features: ['Ürün vitrini ve sepet', 'Koyu / açık ritim', 'Bülten formu'],
    font: 'serif',
    logoIcon: 'coffee',
    theme: { bg: '#f8f3ec', ink: '#2b1a10', muted: '#7a6555', accent: '#c79a62', accentInk: '#2b1a10', dark: '#221510', darkInk: '#f5ebde', soft: '#efe4d4', card: '#fffaf3' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Ürünler', to: 'urunler' }, { label: 'Hakkımızda', to: 'hikaye' }, { label: 'Mağazalar', to: 'magaza' }, { label: 'Bülten', to: 'bulten' }],
    cta: { label: 'Giriş Yap', to: 'bulten' },
    actions: { search: true, cart: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'dark', title: ['İyi Kahve', 'Daha Fazla An'], accentLine: 1, text: 'Özenle seçilmiş çekirdekler, ustalıkla hazırlanan lezzetler ve kendinize ayıracağınız sıcacık bir mola.', primary: { label: 'Kahveleri Keşfet', to: 'urunler' }, secondary: { label: 'Mağazalarımız', to: 'magaza' }, image: img(1, 'hero'), note: 'Küçük molalar, büyük iyi hissettirir' },
      { type: 'strip', tone: 'bg', items: [{ icon: 'cup', title: 'Filtre Kahve' }, { icon: 'coffee', title: 'Espresso' }, { icon: 'cup', title: 'Soğuk Kahveler' }, { icon: 'award', title: 'Özel Seriler' }, { icon: 'gift', title: 'Atıştırmalıklar' }] },
      { type: 'grid', id: 'urunler', tone: 'soft', kicker: 'Yeni seri', title: 'Anadolu Lezzetleri', text: 'Yöresel tatlardan ilham alan özel kahve serimiz. Her yudumda bu toprakların hikâyesi var.', variant: 'bags', cols: 3,
        items: [
          { img: img(1, 'bag1'), title: 'Ege Harmanı', text: 'Dengeli ve aromatik', price: '289 ₺', tag: 'Yeni' },
          { img: img(1, 'bag2'), title: 'Karadeniz Harmanı', text: 'Yoğun ve kalıcı', price: '289 ₺' },
          { img: img(1, 'bag3'), title: 'Güneydoğu Harmanı', text: 'Baharatlı ve güçlü', price: '299 ₺' },
        ] },
      { type: 'banner', id: 'hikaye', tone: 'dark', side: 'left', kicker: 'Kahvehan deneyimi', title: 'Sadece Kahve Değil, Bir Yaşam Tarzı', text: 'Mağazalarımızda sıcak bir atmosfer, samimi sohbetler ve her zaman taze kahve sizi bekliyor.', cta: { label: 'En Yakın Mağazayı Bul', to: 'magaza' }, image: img(1, 'cafe') },
      { type: 'strip', tone: 'bg', items: [{ icon: 'leaf', title: '%100 Arabica', text: 'Çekirdek' }, { icon: 'truck', title: 'Hızlı ve Güvenli', text: 'Teslimat' }, { icon: 'sprout', title: 'Taze Kavrulmuş', text: 'Kahve' }, { icon: 'recycle', title: 'Sürdürülebilir', text: 'Üretim' }] },
      { type: 'cta', id: 'magaza', tone: 'soft', kicker: 'Mağazalarımız', title: 'Sizi bekleyen bir köşe var', text: 'Yakındaki şubemizi bulun, kahvenizi ısmarlayın ve sıranızı beklemeden alın.', form: 'contact', button: 'Şubeyi Göster' },
      { type: 'cta', id: 'bulten', tone: 'bg', title: 'Kahve dünyasından haberdar olun', text: 'Yeni harmanlar ve kampanyalar e-postanıza gelsin.', form: 'newsletter', button: 'Abone Ol' },
    ],
    footer: { about: 'Daha fazla an, daha güzel yarınlar.', newsletter: false, columns: [{ title: 'Kurumsal', links: [{ label: 'Hakkımızda', to: 'hikaye' }, { label: 'Mağazalar', to: 'magaza' }, { label: 'Kariyer' }, { label: 'İletişim', to: 'magaza' }] }, { title: 'Yardım', links: [{ label: 'Sıkça Sorulan Sorular' }, { label: 'Kargo ve Teslimat' }, { label: 'İade ve Değişim' }, { label: 'Gizlilik Politikası' }] }] },
  },

  // ─────────────────────────── web2: Patio Veteriner Kliniği ───────────────────────────
  {
    slug: 'web2',
    brand: 'Patio',
    sector: 'Veteriner kliniği',
    summary: 'Veteriner klinikleri için güven veren, randevu odaklı sıcak bir site.',
    features: ['Randevu formu', 'Hizmet kartları', 'Blog önerileri'],
    font: 'rounded',
    logoIcon: 'paw',
    theme: { bg: '#fbf7ef', ink: '#16332b', muted: '#5f7169', accent: '#1f5a48', accentInk: '#ffffff', dark: '#1c4a3b', darkInk: '#ffffff', soft: '#dcebdd', card: '#ffffff' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hakkımızda', to: 'hakkimizda' }, { label: 'Hizmetlerimiz', to: 'hizmetler' }, { label: 'Blog', to: 'blog' }, { label: 'İletişim', to: 'randevu' }],
    cta: { label: 'Randevu Al', to: 'randevu' },
    actions: { search: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'light', title: ['Onlar da', 'Ailemizin Bir Parçası'], text: 'Patio’da minik dostlarınızın sağlığı, mutluluğu ve uzun bir yaşam süresi için buradayız.', primary: { label: 'Randevu Al', to: 'randevu' }, secondary: { label: 'Hizmetlerimizi Keşfet', to: 'hizmetler' }, image: img(2, 'hero'), note: 'Daha sağlıklı, daha mutlu patiler' },
      { type: 'grid', id: 'hizmetler', tone: 'bg', title: 'Hizmetlerimiz', variant: 'service', cols: 3, items: [
        { icon: 'stethoscope', title: 'Genel Muayene', text: 'Düzenli kontrollerle sağlıklı yaşam' },
        { icon: 'syringe', title: 'Aşılama', text: 'Güçlü bağışıklık, mutlu patiler' },
        { icon: 'activity', title: 'Cerrahi İşlemler', text: 'Güvenli ve modern müdahaleler' },
        { icon: 'smile', title: 'Diş Sağlığı', text: 'Daha sağlıklı gülüşler' },
        { icon: 'flask', title: 'Laboratuvar', text: 'Hızlı ve doğru tanı' },
        { icon: 'scissors', title: 'Kuaför & Bakım', text: 'Temiz, bakımlı ve mutlu dostlar' },
      ] },
      { type: 'banner', id: 'hakkimizda', tone: 'soft', side: 'right', kicker: 'Daima yanlarında', title: 'Sevgi, Tecrübe ve Güven', text: 'Patio Veteriner Kliniği olarak patili dostlarınızın sağlığını en iyi şekilde korumak için modern tıbbi imkânlar ve uzman kadromuzla hizmet veriyoruz.', cta: { label: 'Hakkımızda', to: 'randevu' }, image: img(2, 'vet'), script: 'Çünkü onlar bize emanet' },
      { type: 'grid', id: 'blog', tone: 'bg', kicker: 'Pati rehberi', title: 'Blog önerileri', variant: 'gallery', cols: 3, items: [
        { img: img(2, 'cat'), title: 'Evcil Hayvan Sahiplenmeden Önce Bilmeniz Gerekenler', text: 'Doğru bilgi, daha mutlu bir yaşam demektir.' },
        { img: img(2, 'bowl'), title: 'Sağlıklı Beslenme, Uzun Yaşam', text: 'Dostlarınızın en uygun beslenme önerileri.' },
      ] },
      { type: 'cta', id: 'randevu', tone: 'dark', kicker: 'Randevu', title: 'Patili dostunuz için ilk adım', text: 'Formu doldurun, en uygun saati birlikte belirleyelim.', form: 'appointment', button: 'Randevu Talep Et' },
    ],
    footer: { about: 'Sağlıklı patiler, mutlu yarınlar.', newsletter: true, columns: [{ title: 'Hızlı Erişim', links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hakkımızda', to: 'hakkimizda' }, { label: 'Hizmetlerimiz', to: 'hizmetler' }, { label: 'Blog', to: 'blog' }] }, { title: 'İletişim', links: [{ label: 'Randevu Al', to: 'randevu' }] }] },
  },

  // ─────────────────────────── web3: Evimoda (mobilya e-ticareti) ───────────────────────────
  {
    slug: 'web3',
    brand: 'Evimoda',
    sector: 'Mobilya e-ticareti',
    summary: 'Mobilya ve dekorasyon mağazası için kategori, ürün ve sepet akışı.',
    features: ['Kategori filtreleri', 'Sepet ve favoriler', 'Kampanya alanları'],
    font: 'serif',
    logoIcon: 'home',
    theme: { bg: '#f8f4ed', ink: '#2a2118', muted: '#7b6d5f', accent: '#b4532b', accentInk: '#ffffff', dark: '#234739', darkInk: '#ffffff', soft: '#efe6d8', card: '#ffffff' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Ürünler', to: 'urunler' }, { label: 'Koleksiyonlar', to: 'koleksiyon' }, { label: 'Kampanyalar', to: 'kampanya' }, { label: 'Hakkımızda', to: 'bulten' }],
    cta: { label: 'Hesabım', to: 'bulten' },
    actions: { search: true, cart: true, account: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'light', kicker: 'Daha güzel bir ev, daha mutlu bir son', title: ['Evinize', 'Değer Katan', 'Tasarımlar'], accentLine: 2, text: 'Modern, şık ve fonksiyonel mobilyalarla yaşam alanlarınızı yeniden keşfedin.', primary: { label: 'Koleksiyonu Keşfet', to: 'urunler' }, image: img(3, 'hero'), badge: { icon: 'leaf', title: 'Doğal Malzemeler', text: 'Sürdürülebilir yaşam' } },
      { type: 'strip', tone: 'bg', items: [{ icon: 'truck', title: 'Ücretsiz Kargo', text: 'Tüm siparişlerde' }, { icon: 'shield', title: 'Güvenli Ödeme', text: '%100 güvenli alışveriş' }, { icon: 'package', title: 'Kolay İade', text: '14 gün içinde' }, { icon: 'headphones', title: '7/24 Destek', text: 'Her zaman yanınızda' }, { icon: 'leaf', title: 'Doğa Dostu', text: 'Sürdürülebilir ürünler' }] },
      { type: 'grid', id: 'kategoriler', tone: 'bg', title: 'Kategoriler', variant: 'category', cols: 5, items: [
        { img: img(3, 'cat1'), title: 'Oturma Odası' }, { img: img(3, 'cat2'), title: 'Yatak Odası' }, { img: img(3, 'cat3'), title: 'Yemek Odası' }, { img: img(3, 'cat4'), title: 'Çalışma Odası' }, { img: img(3, 'cat5'), title: 'Ev Aksesuarları' },
      ] },
      { type: 'banner', id: 'koleksiyon', tone: 'dark', side: 'right', kicker: 'Yeni koleksiyon', title: 'Doğadan İlham Alan Tasarım', text: 'Sade, doğal ve zamansız parçalarla evinizde huzurlu bir atmosfer yaratın.', cta: { label: 'Şimdi Keşfet', to: 'urunler' }, image: img(3, 'banner'), script: 'Ev, insanın kendine döndüğü yerdir' },
      { type: 'grid', id: 'urunler', tone: 'bg', title: 'Öne Çıkan Ürünler', variant: 'product', cols: 5, filters: ['Tümü', 'Oturma', 'Yemek', 'Yatak', 'Aksesuar'], items: [
        { img: img(3, 'p1'), title: 'Luna Köşe Koltuk', price: '24.990 ₺', category: 'Oturma' },
        { img: img(3, 'p2'), title: 'Nova Yemek Masası', price: '16.750 ₺', category: 'Yemek' },
        { img: img(3, 'p3'), title: 'Verde Yatak Odası Takımı', price: '28.900 ₺', category: 'Yatak' },
        { img: img(3, 'p4'), title: 'Mila Berjer', price: '8.450 ₺', category: 'Oturma' },
        { img: img(3, 'p5'), title: 'Riva Orta Sehpa', price: '4.990 ₺', category: 'Aksesuar' },
      ] },
      { type: 'banner', id: 'kampanya', tone: 'accent', side: 'left', kicker: 'Kampanya', title: 'Eviniz Sizin Tarzınız', text: 'Kendinizi en iyi hissettiğiniz alanları birlikte tasarlayalım.', cta: { label: 'Keşfet', to: 'urunler' }, image: img(3, 'living') },
      { type: 'cta', id: 'bulten', tone: 'bg', title: 'E-bülten', text: 'Kampanya ve yeniliklerden haberdar olun.', form: 'newsletter', button: 'Abone Ol' },
    ],
    footer: { about: 'Yaşam alanlarınız için.', columns: [{ title: 'Kurumsal', links: [{ label: 'Hakkımızda' }, { label: 'Kariyer' }, { label: 'Blog' }, { label: 'İletişim', to: 'bulten' }] }, { title: 'Müşteri Hizmetleri', links: [{ label: 'Sipariş Takibi' }, { label: 'İade ve Değişim' }, { label: 'Sıkça Sorulan Sorular' }, { label: 'KVKK' }] }] },
  },

  // ─────────────────────────── web4: LezzetDurağı (restoran) ───────────────────────────
  {
    slug: 'web4',
    brand: 'LezzetDurağı',
    sector: 'Restoran',
    summary: 'Restoranlar için iştah açan koyu tema, menü vitrini ve rezervasyon formu.',
    features: ['Rezervasyon formu', 'Şef önerileri menüsü', 'Koyu / açık kontrast'],
    font: 'serif',
    logoIcon: 'utensils',
    theme: { bg: '#f6efe6', ink: '#2a1d14', muted: '#7a6a5a', accent: '#e26b3c', accentInk: '#ffffff', dark: '#14100d', darkInk: '#f3e9dc', soft: '#efe3d3', card: '#231a14' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Menümüz', to: 'menu' }, { label: 'Hakkımızda', to: 'sef' }, { label: 'Rezervasyon', to: 'rezervasyon' }, { label: 'İletişim', to: 'rezervasyon' }],
    cta: { label: 'Rezervasyon Yap', to: 'rezervasyon' },
    actions: { search: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'dark', kicker: 'Tatlı bir buluşma', title: ['Lezzetin', 'Yeni Durağı'], accentLine: 1, text: 'Geleneksel tatları modern dokunuşlarla buluşturuyor, her öğünü özel kılıyoruz.', primary: { label: 'Menüyü Keşfet', to: 'menu' }, secondary: { label: 'Tanıtım Videosu İzle', play: true }, image: img(4, 'hero'), note: 'İyi yemek, güzel insanlar, bir araya getirir' },
      { type: 'strip', tone: 'dark', items: [{ icon: 'leaf', title: 'Taze ve Doğal', text: 'Malzemeler' }, { icon: 'chef', title: 'Usta Şeflerin', text: 'Özel Tarifleri' }, { icon: 'heart', title: 'Unutulmaz', text: 'Lezzet Deneyimi' }, { icon: 'users', title: 'Sıcak ve Samimi', text: 'Bir Atmosfer' }] },
      { type: 'grid', id: 'menu', tone: 'bg', kicker: 'Özel lezzetlerimiz', title: 'Şefin Önerileri', variant: 'dish', cols: 4, items: [
        { img: img(4, 'd1'), title: 'Trüflü Tagliatelle', text: 'Özel trüf sosu, parmesan ve inci mantarı ile.', price: '320 ₺' },
        { img: img(4, 'd2'), title: 'Dana Lokum', text: 'Özel sosu ve mevsim sebzeleri ile.', price: '420 ₺' },
        { img: img(4, 'd3'), title: 'Akdeniz Salatası', text: 'Taze yeşillikler, burrata peyniri ve nar taneleri.', price: '280 ₺' },
        { img: img(4, 'd4'), title: 'San Sebastian Cheesecake', text: 'Ev yapımı özel tarif.', price: '190 ₺' },
      ] },
      { type: 'banner', id: 'sef', tone: 'dark', side: 'left', kicker: 'Lezzetin arkasındaki imza', title: 'Şefimiz Murat Demir', text: 'Yılların tecrübesi ve tutkusuyla, her tabakta bir hikâye anlatıyor.', cta: { label: 'Hikâyemiz', to: 'rezervasyon' }, image: img(4, 'chef') },
      { type: 'cta', id: 'rezervasyon', tone: 'soft', kicker: 'Masanız sizi bekliyor', title: 'Rezervasyon Yapın', text: 'Özel anlarınızı bizimle paylaşın, unutulmaz bir deneyim yaşayın.', form: 'reserve', button: 'Rezervasyon Yap' },
    ],
    footer: { about: 'Lezzet, hayatın en güzel bahanesi.', newsletter: true, columns: [{ title: 'Hızlı Erişim', links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Menümüz', to: 'menu' }, { label: 'Hakkımızda', to: 'sef' }, { label: 'Rezervasyon', to: 'rezervasyon' }] }] },
  },

  // ─────────────────────────── web5: NovaEstate (emlak) ───────────────────────────
  {
    slug: 'web5',
    brand: 'NovaEstate',
    sector: 'Emlak ve gayrimenkul',
    summary: 'Emlak ofisleri ve inşaat firmaları için ilan kartları ve iletişim formu.',
    features: ['Öne çıkan ilan kartları', 'Favorilere ekleme', 'İletişim formu'],
    font: 'serif',
    logoIcon: 'home',
    theme: { bg: '#f8f6f0', ink: '#1f2a22', muted: '#6b7468', accent: '#2f4a37', accentInk: '#ffffff', dark: '#2d4032', darkInk: '#f4f1e8', soft: '#eef0e6', card: '#ffffff' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Satılık', to: 'projeler' }, { label: 'Kiralık', to: 'projeler' }, { label: 'Projeler', to: 'projeler' }, { label: 'Hakkımızda', to: 'hikaye' }, { label: 'İletişim', to: 'iletisim' }],
    cta: { label: 'Ücretsiz Danışmanlık', to: 'iletisim' },
    actions: { search: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'light', kicker: 'Hayalindeki ev', title: ['Daha Güzel', 'Bir Yarın,', 'Daha Güzel', 'Bir Evde Başla'], accentLine: 3, text: 'Modern yaşam alanları, güvenilir yatırımlar ve mutlu aileler için buradayız.', primary: { label: 'Projeleri Keşfet', to: 'projeler' }, secondary: { label: 'Tanıtım Filmini İzle', play: true }, image: img(5, 'hero') },
      { type: 'strip', tone: 'bg', items: [{ icon: 'leaf', title: 'Doğru Yatırım', text: 'Güvenli ve kazançlı fırsatlar' }, { icon: 'home', title: 'Modern Projeler', text: 'Estetik ve fonksiyonel yaşam alanları' }, { icon: 'shield', title: 'Güvenilir Hizmet', text: 'Her adımda yanınızda' }, { icon: 'users', title: 'Uzman Kadro', text: 'Profesyonel danışmanlık' }] },
      { type: 'grid', id: 'projeler', tone: 'bg', kicker: 'Size özel seçimler', title: 'Öne Çıkan Projeler', text: 'Modern mimari, konforlu yaşam ve yüksek yatırım potansiyeli bir arada.', variant: 'property', cols: 3, items: [
        { img: img(5, 'h1'), title: 'Nova Panorama', tag: 'Satılık', meta: ['Bodrum, Muğla', '4+1', '250 m²', 'Havuz'], price: '24.500.000 ₺' },
        { img: img(5, 'h2'), title: 'Nova City', tag: 'Proje', meta: ['Çekmeköy, İstanbul', '3+1', '180 m²', 'Güvenlik'], price: '12.750.000 ₺' },
        { img: img(5, 'h3'), title: 'Nova Sea View', tag: 'Kiralık', meta: ['Kaş, Antalya', '3+1', '200 m²', 'Deniz Manzaralı'], price: '8.500 ₺ / ay' },
      ] },
      { type: 'banner', id: 'hikaye', tone: 'dark', side: 'left', kicker: 'NovaEstate', title: 'İnsanlar, Mekânlar, Daha Güzel Hikâyeler', text: 'Biz, sadece gayrimenkul yönetmiyoruz. İnsanların hayatına değer katan, mutlu anılar biriktirdiği mekânlar yaratıyoruz.', cta: { label: 'Hakkımızda', to: 'iletisim' }, image: img(5, 'interior') },
      { type: 'cta', id: 'iletisim', tone: 'bg', kicker: 'Size ulaşalım', title: 'Hayalinizdeki Ev Sizi Bekliyor', text: 'Size en uygun seçenekler için hemen iletişime geçin, uzman ekibimiz sizinle ilgilensin.', form: 'contact', button: 'Benimle İletişime Geçin' },
    ],
    footer: { about: 'Daha fazla yaşam.', columns: [{ title: 'Kurumsal', links: [{ label: 'Hakkımızda', to: 'hikaye' }, { label: 'Kariyer' }, { label: 'Blog' }, { label: 'İletişim', to: 'iletisim' }] }, { title: 'Projelerimiz', links: [{ label: 'Satılık', to: 'projeler' }, { label: 'Kiralık', to: 'projeler' }, { label: 'Devam Eden Projeler', to: 'projeler' }] }] },
  },

  // ─────────────────────────── web6: Rift (yaratıcı ajans) ───────────────────────────
  {
    slug: 'web6',
    brand: 'rift.',
    sector: 'Yaratıcı ajans',
    summary: 'Ajanslar için cesur, tipografi odaklı; proje vitrini ve iletişim çağrısı.',
    features: ['Proje vitrini', 'Kayan proje şeridi', 'Cesur tipografi'],
    font: 'grotesk',
    logoIcon: 'pen',
    theme: { bg: '#f5f2ea', ink: '#111111', muted: '#5d5a52', accent: '#ff5a36', accentInk: '#111111', accent2: '#dff23c', dark: '#111111', darkInk: '#ffffff', soft: '#ebe6da', card: '#ffffff' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hizmetlerimiz', to: 'hizmetler' }, { label: 'Projeler', to: 'projeler' }, { label: 'Hakkımızda', to: 'hizmetler' }, { label: 'İletişim', to: 'iletisim' }],
    cta: { label: 'Proje Başlat', to: 'iletisim' },
    actions: {},
    sections: [
      { type: 'hero', id: 'ust', variant: 'light', kicker: 'Markanız için', title: ['Sıradan Değil,', 'Akılda Kalan', 'Tasarımlar.'], accentLine: 1, text: 'Yaratıcı fikirler, stratejik çözümler ve etkileyici tasarımlarla markanızı bir adım öteye taşıyoruz.', primary: { label: 'Hizmetlerimizi Keşfet', to: 'hizmetler' }, secondary: { label: 'Tanıtım Videomuzu İzle', play: true }, image: img(6, 'hero'), note: 'Fikir. Tasarım. Etki.' },
      { type: 'grid', id: 'hizmetler', tone: 'bg', kicker: 'Neler yapıyoruz?', title: 'Markanızı Geleceğe Hazırlıyoruz.', variant: 'service', cols: 4, items: [
        { icon: 'sparkles', title: 'Marka Kimliği', text: 'Markanın hikâyesini güçlü bir kimliğe dönüştürüyoruz.' },
        { icon: 'globe', title: 'Web Tasarım', text: 'Modern, kullanıcı dostu ve dönüşüm odaklı web siteleri.' },
        { icon: 'chart', title: 'Dijital Pazarlama', text: 'Doğru stratejilerle markanızı geniş kitlelere ulaştırıyoruz.' },
        { icon: 'smile', title: 'İçerik Üretimi', text: 'Etkileyici içeriklerle markanızı daha görünür kılıyoruz.' },
      ] },
      { type: 'grid', id: 'projeler', tone: 'dark', kicker: 'Öne çıkan projeler', title: 'Farklı Sektörler, Farklı Hikâyeler.', variant: 'work', cols: 5, items: [
        { img: img(6, 't1'), title: 'Urban Brew', tag: 'Gıda & İçecek' }, { img: img(6, 't2'), title: 'Lumina', tag: 'Moda' }, { img: img(6, 't3'), title: 'Kai Villas', tag: 'Turizm & Konaklama' }, { img: img(6, 't4'), title: 'MoveUp', tag: 'Sağlık & Spor' }, { img: img(6, 't5'), title: 'Natura Home', tag: 'Mobilya & Dekorasyon' },
      ] },
      { type: 'cta', id: 'iletisim', tone: 'lime', kicker: 'Haydi, birlikte başaralım', title: 'Sıradaki Başarı Hikâyesi Sizin Olsun!', text: 'Projeni anlat, seni dinleyelim. Markanı birlikte büyütelim.', form: 'contact', button: 'Hemen İletişime Geç' },
    ],
    footer: { about: 'Yaratıcı düşünen markalar için.', columns: [{ title: 'Sayfalar', links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hizmetlerimiz', to: 'hizmetler' }, { label: 'Projeler', to: 'projeler' }, { label: 'İletişim', to: 'iletisim' }] }] },
  },

  // ─────────────────────────── web7: Purela (doğal kozmetik) ───────────────────────────
  {
    slug: 'web7',
    brand: 'purela',
    sector: 'Doğal kozmetik',
    summary: 'Doğal bakım markaları için sakin, ürün odaklı e-ticaret vitrini.',
    features: ['Kategori sekmeleri', 'Sepet', 'Bülten aboneliği'],
    font: 'serif',
    logoIcon: 'leaf',
    theme: { bg: '#f6f0e4', ink: '#22301f', muted: '#6d7462', accent: '#2f3f26', accentInk: '#ffffff', dark: '#263323', darkInk: '#f3eedf', soft: '#ece4d2', card: '#ffffff' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Ürünler', to: 'urunler' }, { label: 'Hikâyemiz', to: 'hikaye' }, { label: 'Sürdürülebilirlik', to: 'deger' }, { label: 'Bülten', to: 'bulten' }],
    cta: { label: 'Sepetim', to: 'urunler' },
    actions: { search: true, cart: true, account: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'light', title: ['Cildin', 'Doğadan', 'Daha Fazlasını', 'Hak Ediyor.'], text: '%100 doğal içerikler, sağlıklı bir cilt, daha iyi bir gelecek.', primary: { label: 'Ürünleri Keşfet', to: 'urunler' }, secondary: { label: 'Hikâyemizi İzle', play: true }, image: img(7, 'hero'), note: 'Doğadan ilham alan bir güzellik hikâyesi', points: [{ icon: 'leaf', text: 'Doğal İçerik' }, { icon: 'heart', text: 'Hayvanlar Üzerinde Test Edilmez' }, { icon: 'globe', text: 'Sürdürülebilir Dünya İçin' }] },
      { type: 'grid', id: 'urunler', tone: 'bg', title: 'Senin İçin En Doğal Seçimler', variant: 'product', cols: 4, filters: ['Tümü', 'Cilt Bakım', 'Saç Bakım', 'Vücut Bakım'], items: [
        { img: img(7, 'p1'), title: 'Canlandırıcı Serum', text: 'Cildine doğal bir ışıltı kazandırır.', price: '749 ₺', tag: 'Yeni', category: 'Cilt Bakım' },
        { img: img(7, 'p2'), title: 'Nemlendirici Krem', text: 'Gün boyu nem, doğal koruma.', price: '599 ₺', tag: 'En Çok Satan', category: 'Cilt Bakım' },
        { img: img(7, 'p3'), title: 'Arındırıcı Tonik', text: 'Cildini nazikçe temizler, ferahlık sağlar.', price: '449 ₺', category: 'Cilt Bakım' },
        { img: img(7, 'p4'), title: 'Doğal Sabun', text: 'Bitkisel özlerle derinlemesine temizlik.', price: '299 ₺', category: 'Vücut Bakım' },
      ] },
      { type: 'banner', id: 'hikaye', tone: 'bg', side: 'right', title: 'Doğallık Sadece Bir Tercih Değil, Bir Yaşam Biçimi.', text: 'Purela olarak, doğanın bize sunduğu en saf içeriklerle, modern bilimle birleştiriyor ve cildinize hak ettiği özeni gösteriyoruz.', cta: { label: 'Hikâyemizi Keşfet', to: 'deger' }, image: img(7, 'face'), script: 'Doğal Güzel Sen' },
      { type: 'strip', id: 'deger', tone: 'soft', items: [{ icon: 'leaf', title: 'Temiz İçerik', text: 'Zararlı kimyasallara hayır' }, { icon: 'recycle', title: 'Geri Dönüştürülebilir Ambalaj', text: 'Doğa için sorumluluk' }, { icon: 'sprout', title: 'Sürdürülebilir Üretim', text: 'Gelecek nesiller için' }, { icon: 'heart', title: 'Mutlu Müşteriler', text: 'Doğal güzelliğin keyfi' }] },
      { type: 'cta', id: 'bulten', tone: 'soft', title: 'Doğal Güzellikten Haberin Olsun', text: 'Yeni ürünler, özel kampanyalar ve doğal yaşam tüyoları için e-posta listemize katıl.', form: 'newsletter', button: 'Abone Ol' },
    ],
    footer: { about: 'Doğallığın en saf hali.', columns: [{ title: 'Hızlı Erişim', links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Ürünler', to: 'urunler' }, { label: 'Hikâyemiz', to: 'hikaye' }, { label: 'Sürdürülebilirlik', to: 'deger' }] }, { title: 'Yardım', links: [{ label: 'Sıkça Sorulan Sorular' }, { label: 'Kargo ve Teslimat' }, { label: 'İade ve Değişim' }, { label: 'Gizlilik Politikası' }] }] },
  },

  // ─────────────────────────── web8: PatiDost (pet shop) ───────────────────────────
  {
    slug: 'web8',
    brand: 'PatiDost',
    sector: 'Evcil hayvan mağazası',
    summary: 'Pet shop ve bakım hizmetleri için neşeli, pastel renkli bir e-ticaret sitesi.',
    features: ['Pastel hizmet kartları', 'Ürün vitrini ve sepet', 'Randevu çağrısı'],
    font: 'rounded',
    logoIcon: 'paw',
    theme: { bg: '#fbf4e9', ink: '#1b1b1b', muted: '#6a6258', accent: '#1b1b1b', accentInk: '#ffffff', accent2: '#f2705a', dark: '#1b1b1b', darkInk: '#ffffff', soft: '#f8dcd2', card: '#ffffff' },
    nav: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hizmetlerimiz', to: 'hizmetler' }, { label: 'Ürünler', to: 'urunler' }, { label: 'Blog', to: 'galeri' }, { label: 'İletişim', to: 'randevu' }],
    cta: { label: 'Randevu Al', to: 'randevu' },
    actions: { search: true, cart: true, account: true },
    sections: [
      { type: 'hero', id: 'ust', variant: 'light', kicker: 'Onlar sadece bir hayvan değil', title: ['Ailenizin', 'Bir Parçası'], accentLine: 1, text: 'Sevimli dostlarınızın sağlığı, mutluluğu ve konforu için buradayız.', primary: { label: 'Hizmetlerimizi Keşfet', to: 'hizmetler' }, secondary: { label: 'Tanıtım Videomuzu İzle', play: true }, image: img(8, 'hero'), note: 'Daha mutlu patiler, daha güzel yarınlar', points: [{ icon: 'stethoscope', text: 'Uzman Kadro' }, { icon: 'paw', text: 'Güvenli Ortam' }, { icon: 'home', text: 'Kapsamlı Hizmet' }, { icon: 'heart', text: 'Mutlu Dostlar' }] },
      { type: 'grid', id: 'hizmetler', tone: 'bg', title: 'Hizmetlerimiz', variant: 'pastel', cols: 4, items: [
        { icon: 'stethoscope', title: 'Veteriner Hizmetleri', text: 'Düzenli kontrollerle sağlıklı yaşam.', tint: '#f8d9d2' },
        { icon: 'brush', title: 'Bakım & Güzellik', text: 'Tüy bakımı, banyo ve daha fazlası.', tint: '#dbe9d3' },
        { icon: 'bone', title: 'Mama & Aksesuar', text: 'En kaliteli ürünler, en mutlu patiler.', tint: '#d9e2f7' },
        { icon: 'home', title: 'Konaklama', text: 'Güvenli ve konforlu konaklama hizmeti.', tint: '#e3dcf6' },
      ] },
      { type: 'grid', id: 'galeri', tone: 'bg', title: 'Onların Mutluluğu Bizim İşimiz', text: 'Her patinin farklı bir hikâyesi, her hikâyenin özel bir bakıma ihtiyacı var.', variant: 'gallery', cols: 4, items: [
        { img: img(8, 'g1'), title: 'Keşfet' }, { img: img(8, 'g2'), title: 'Yaşa' }, { img: img(8, 'g3'), title: 'Gülümse' }, { img: img(8, 'g4'), title: 'Güvende Hisset' },
      ] },
      { type: 'grid', id: 'urunler', tone: 'bg', title: 'En Çok Tercih Edilen Ürünler', variant: 'product', cols: 4, items: [
        { img: img(8, 'q1'), title: 'PatiDost Premium Mama', price: '349 ₺' },
        { img: img(8, 'q2'), title: 'Konforlu Yatak', price: '499 ₺' },
        { img: img(8, 'q3'), title: 'Oyun Seti', price: '199 ₺' },
        { img: img(8, 'q4'), title: 'Mama Kabı', price: '149 ₺' },
      ] },
      { type: 'cta', id: 'randevu', tone: 'soft', title: 'Patili dostunuz için ilk adımı bugün atın!', text: 'Randevunuzu oluşturun, gerisini bize bırakın.', form: 'appointment', button: 'Randevu Oluştur' },
    ],
    footer: { about: 'Sağlıklı, mutlu patiler için.', newsletter: true, columns: [{ title: 'Hızlı Erişim', links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hizmetlerimiz', to: 'hizmetler' }, { label: 'Ürünler', to: 'urunler' }, { label: 'Blog', to: 'galeri' }] }, { title: 'Kurumsal', links: [{ label: 'Hakkımızda' }, { label: 'Kariyer' }, { label: 'Sıkça Sorulan Sorular' }] }] },
  },
];

export const templateBySlug = (slug: string) => templates.find((t) => t.slug === slug);
