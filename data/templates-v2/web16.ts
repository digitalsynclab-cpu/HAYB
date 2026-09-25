import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web16-${k}.webp`;

/** WEB 16: Güzellik ve estetik kliniği (kurgusal marka: Işıl Estetik). */
export const web16: TemplateV2Def = {
  slug: 'web16',
  code: 'WEB 16',
  minimumPackage: 'business',
  brand: 'Işıl Estetik',
  sector: 'Estetik kliniği',
  category: 'Güzellik ve Bakım',
  summary: 'Lüks cilt bakımı editoryali: kemer çerçeveli hero, sürüklenebilir önce/sonra karşılaştırması ve seçilebilir tedaviler.',
  features: ['Önce / sonra karşılaştırma', 'Seçilebilir tedavi vitrini', 'Kurgusal yorumlar'],
  site: {
    theme: {
      bg: '#f4ede4', ink: '#2a201b', accent: '#8f6a50', accentInk: '#fbf6f0', surface: '#eadfd3', dark: '#1d1611', darkInk: '#f4eadf',
      heading: 'cormorant', body: 'manrope', headingWeight: 400, headingTracking: '-0.02em', headingLeading: 1, radius: 'pill',
    },
    logo: { text: 'Işıl', sub: 'Aesthetic Clinic', mark: 'ring', letter: 'I' },
    header: {
      style: 'solid', tone: 'light', extras: ['search', 'lang'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Tedaviler', to: 'tedavi' }, { label: 'Kliniğimiz', to: 'klinik' }, { label: 'Yaklaşım', to: 'yaklasim' }, { label: 'Yorumlar', to: 'yorumlar' }],
      cta: { label: 'Randevu Al', to: 'yaklasim' },
    },
    blocks: [
      {
        type: 'hero', variant: 'arch', id: 'ust', image: I('hero'), alt: 'Doğal ışıkta bir kadın portresi, pürüzsüz cilt', focus: '50% 40%',
        kicker: 'Cilt · Vücut · Estetik', lines: ['İnce.', 'Rafine.', 'Sizin.'], italic: [1],
        text: 'Doğal güzelliğinizi modern tıp ve kişiye özel yaklaşımla ortaya çıkarıyoruz.',
        primary: { label: 'Ücretsiz Danışmanlık Al', to: 'yaklasim' }, secondary: { label: 'Klinik Filmimizi İzle', play: true },
        note: ['Güzellik', 'Denge', 'Sağlık', 'Özgüven'],
      },
      {
        type: 'strip', layout: 'icons', id: 'tedavi', tone: 'light',
        items: [
          { icon: 'sparkles', title: 'Cilt', text: 'Sağlıklı ve ışıltılı cilt.' }, { icon: 'hand', title: 'Vücut', text: 'Daha fit ve sıkı bir görünüm.' },
          { icon: 'droplets', title: 'Enjektabl', text: 'Doğal ve dengeli sonuçlar.' }, { icon: 'zap', title: 'Lazer', text: 'Gelişmiş teknoloji çözümleri.' },
        ],
      },
      {
        type: 'split', id: 'klinik', tone: 'soft',
        media: { image: I('clinic'), alt: 'Kliniğin sıcak tonlu dinlenme alanı', aspect: 'portrait', frame: 'arch' },
        content: {
          kicker: 'Kliniğimiz', title: ['Güven,', 'uzmanlık ve', 'doğal sonuçlar.'], italic: [2],
          text: 'Bilimsel yöntemler, deneyimli uzman kadromuz ve kişiye özel tedavi planlarımızla doğal güzelliğinizi ön plana çıkarıyoruz.',
          cta: { label: 'Kliniğimizi Keşfedin', to: 'yaklasim' },
        },
      },
      {
        type: 'split', id: 'karsilastirma', flip: true, tone: 'light',
        media: { image: I('face'), alt: 'Bir yüzün önce ve sonra karşılaştırması', aspect: 'landscape', compare: { before: I('face'), after: I('face'), labels: ['Önce', 'Sonra'], note: 'Örnek simülasyon görseli. Gerçek sonuçlar kişiden kişiye değişir.' } },
        content: {
          kicker: 'Karşılaştırma', title: ['Doğal güzellik,', 'doğal sonuçlar.'], italic: [1],
          text: 'Cilt kalitesinde gözle görülür iyileşme, daha aydınlık ve dengeli bir görünüm hedefliyoruz. Kaydırıcıyı sürükleyerek deneyin.',
        },
      },
      {
        type: 'showcase', layout: 'list', id: 'one-cikan', tone: 'dark',
        head: { kicker: 'Öne çıkan tedavi', title: ['Bakımın', 'ötesinde.'], italic: [1] },
        side: { image: I('serum'), alt: 'Cilt üzerinde serum damlası', text: ['Daha sağlıklı.', 'Daha aydınlık.', 'Daha siz.'] },
        items: [
          { title: 'Cilt yenileme', image: I('device'), text: 'Cildinizin doğal ışıltısını geri kazandıran, kolajen üretimini destekleyen gelişmiş teknolojiler.', cta: { label: 'Detayları İncele', to: 'yaklasim' } },
          { title: 'Bölgesel incelme', image: I('neck'), text: 'Hedef bölgelerde sıkılaşma ve daha dengeli bir görünüm için planlı uygulamalar.', cta: { label: 'Detayları İncele', to: 'yaklasim' } },
          { title: 'Leke tedavisi', image: I('face'), text: 'Cilt tonunu eşitlemeye yönelik, kişiye göre planlanan bakım programları.', cta: { label: 'Detayları İncele', to: 'yaklasim' } },
          { title: 'Botoks ve dolgu', image: I('hero'), text: 'Doğal ifadeyi koruyan, ölçülü ve dengeli uygulamalar.', cta: { label: 'Detayları İncele', to: 'yaklasim' } },
          { title: 'Lazer epilasyon', image: I('serum'), text: 'Konforlu seanslarla pürüzsüz bir görünüm için gelişmiş lazer teknolojisi.', cta: { label: 'Detayları İncele', to: 'yaklasim' } },
        ],
      },
      {
        type: 'strip', layout: 'icons', tone: 'light',
        items: [
          { icon: 'users', title: 'Uzman kadro', text: 'Deneyimli ve sertifikalı hekimler.' }, { icon: 'compass', title: 'Kişiye özel plan', text: 'İhtiyacınıza özel tedavi yaklaşımı.' },
          { icon: 'microscope', title: 'Modern teknoloji', text: 'En güncel ve güvenilir cihazlar.' }, { icon: 'leaf', title: 'Doğal sonuçlar', text: 'Abartısız, dengeli ve estetik.' },
        ],
      },
      {
        type: 'split', id: 'yaklasim', flip: true, tone: 'soft',
        media: { image: I('neck'), alt: 'Boyun ve omuz bölgesinde bir cilt bakımı görüntüsü', aspect: 'landscape' },
        content: {
          kicker: 'Size özel bir plan', title: ['Güzelliğinize', 'kişisel bir yaklaşım.'], italic: [1],
          text: 'Ücretsiz ön görüşme ile cilt analizinizi yaptırın, uzmanlarımızla size en uygun tedavi planını birlikte oluşturun.',
          steps: [
            { n: '01', t: 'Analiz', x: 'Cilt ve ihtiyaç değerlendirmesi' }, { n: '02', t: 'Plan', x: 'Kişiye özel tedavi planı' },
            { n: '03', t: 'Uygulama', x: 'Güvenli ve konforlu süreç' }, { n: '04', t: 'Takip', x: 'Uzun vadeli destek' },
          ],
          cta: { label: 'Randevu Al', to: 'yorumlar' },
        },
      },
      {
        type: 'quotes', id: 'yorumlar', tone: 'light',
        head: { kicker: 'Danışan yorumları', title: ['Danışanlarımız', 'ne diyor?'], italic: [1] },
        note: 'Bu yorumlar kurgusal örneklerdir; şablonda yalnızca yerleşimi göstermek için kullanılmıştır.',
        items: [
          { text: 'Kendimi her zaman iyi hissettim, süreç çok rahat ilerledi.', name: 'Elif K.' },
          { text: 'Ekip ilgili ve profesyonel; her adım net anlatıldı.', name: 'Ayşe D.' },
          { text: 'Cildimdeki değişim beklediğimden daha doğal görünüyor.', name: 'Merve S.' },
        ],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Kişiye özel, doğal estetik yaklaşımı. Bu sayfa örnek bir kliniğe aittir.', newsletter: 'Bakım önerilerimizi e-postanıza gönderelim.',
      links: [{ label: 'Tedaviler', to: 'tedavi' }, { label: 'Kliniğimiz', to: 'klinik' }, { label: 'Yaklaşım', to: 'yaklasim' }, { label: 'Yorumlar', to: 'yorumlar' }],
      social: ['instagram', 'youtube', 'pinterest'], contact: ['Örnek Mah. Örnek Sk. No:7, Nilüfer / Bursa', '+90 224 000 00 00'],
    },
  },
};
