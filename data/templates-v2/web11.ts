import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web11-${k}.webp`;

/** WEB 11: Butik otel (kurgusal marka: Zeytin Burnu Hotel). */
export const web11: TemplateV2Def = {
  slug: 'web11',
  code: 'WEB 11',
  minimumPackage: 'business',
  brand: 'Zeytin Burnu Hotel',
  sector: 'Butik otel',
  category: 'Otel ve Turizm',
  summary: 'Editoryal bir butik otel deneyimi: tam ekran manzara, hero üstüne binen rezervasyon çubuğu ve seçilebilir oda hikâyeleri.',
  features: ['Hero üstü rezervasyon çubuğu', 'Seçilebilir oda vitrini', 'Restoran ve deneyim bölümleri'],
  site: {
    theme: {
      bg: '#f4f1ea', ink: '#1c1a17', accent: '#8a6a3f', accentInk: '#ffffff', surface: '#e9e2d3', dark: '#1b1a17', darkInk: '#f2ede4',
      heading: 'cormorant', body: 'manrope', headingWeight: 400, headingTracking: '-0.015em', headingLeading: 0.98, radius: 'pill',
    },
    logo: { text: 'Zeytin Burnu', sub: 'Hotel · Bodrum', mark: 'ring', letter: 'Z' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['lang'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Odalar', to: 'odalar' }, { label: 'Deneyimler', to: 'deneyim' }, { label: 'Restoran', to: 'restoran' }, { label: 'İletişim', to: 'iletisim' }],
      cta: { label: 'Rezervasyon Yap', to: 'rezervasyon' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', image: I('hero'), alt: 'Deniz manzaralı sonsuzluk havuzu ve zeytin ağaçları', focus: '55% 50%',
        kicker: 'Bodrum · Türkiye', lines: ['Hatırlanmaya', 'değer bir', 'konaklama.'], italic: [1],
        text: 'Ege’nin eşsiz doğasında, modern konforla zamanın yavaşladığı bir deneyim.',
        primary: { label: 'Müsaitlik Sorgula', to: 'rezervasyon' }, secondary: { label: 'Otelimizi Keşfedin', to: 'odalar' }, coords: 'Bodrum · 37.03° K · 27.43° D',
      },
      {
        type: 'booking', layout: 'bar', id: 'rezervasyon', tone: 'light', submit: 'Müsaitliği Kontrol Et',
        fields: [
          { id: 'giris', label: 'Giriş tarihi', kind: 'date' }, { id: 'cikis', label: 'Çıkış tarihi', kind: 'date' },
          { id: 'misafir', label: 'Misafir', kind: 'guests', options: ['1 yetişkin', '2 yetişkin', '2 yetişkin, 1 çocuk', '4 yetişkin'], value: '2 yetişkin' },
        ],
        done: 'Örnek şablon: müsaitlik sorgunuz alındı (demo).',
      },
      {
        type: 'showcase', layout: 'rooms', id: 'odalar', tone: 'dark',
        head: { kicker: 'Odalarımız', title: ['Doğanın içinde,', 'sizin ritminizde.'], italic: [1] },
        items: [
          { title: 'The Aegean Suite', image: I('room'), text: 'Her oda, Ege’nin huzurunu modern tasarımla bir araya getirir. Sakinlik, konfor ve rafine detaylar.', facts: [['Alan', '48 m²'], ['Kapasite', '2 misafir'], ['Yatak', 'King'], ['Manzara', 'Deniz']], cta: { label: 'Odayı Keşfet', to: 'rezervasyon' } },
          { title: 'Havuz Terası Suite', image: I('hero'), focus: '20% 60%', text: 'Sonsuzluk havuzuna açılan geniş teras ve gün batımına bakan dinlenme alanı.', facts: [['Alan', '64 m²'], ['Kapasite', '3 misafir'], ['Yatak', 'King'], ['Manzara', 'Havuz ve deniz']], cta: { label: 'Odayı Keşfet', to: 'rezervasyon' } },
          { title: 'Plaj Kabanası', image: I('beach'), text: 'Denize sıfır, gölgeli ve konforlu; sabahtan akşama kendi köşeniz.', facts: [['Alan', '20 m²'], ['Kapasite', '4 misafir'], ['Servis', 'Plaj servisi'], ['Manzara', 'Deniz']], cta: { label: 'Kabanayı Keşfet', to: 'rezervasyon' } },
        ],
      },
      {
        type: 'cards', layout: 'caption', id: 'deneyim', tone: 'dark', bgImage: I('hero'), cols: 4,
        head: { kicker: 'Deneyimler', title: ['Sadece konaklama değil,', 'yaşam tarzı.'], italic: [1] },
        items: [
          { image: I('spa'), title: 'Spa', text: 'Zihin ve beden için yenilenme.', to: 'rezervasyon' },
          { image: I('food'), title: 'Gastronomi', text: 'Ege’nin taze lezzetleri.', to: 'restoran' },
          { image: I('boat'), title: 'Özel turlar', text: 'Koyları keşfedin, denizle buluşun.', to: 'rezervasyon' },
          { image: I('beach'), title: 'Plaj', text: 'Kristal berraklığında deniz.', to: 'rezervasyon' },
        ],
      },
      {
        type: 'split', id: 'restoran', tone: 'light',
        media: { image: I('dish'), alt: 'Izgara levrek, otlar ve mevsim sebzeleri', aspect: 'landscape' },
        content: {
          kicker: 'Restoran', title: ['Ege’nin lezzetleri,', 'modern bir yorumla.'], italic: [1],
          text: 'Yerel malzemeler, mevsimsel tatlar ve yaratıcı sunumlarla unutulmaz bir gastronomi deneyimi.',
          list: [{ icon: 'utensils', t: 'Mevsimlik menü', x: 'Günün taze malzemeleriyle' }, { icon: 'wine', t: 'Yerel şarap seçkisi', x: 'Ege bağlarından' }],
          cta: { label: 'Restoranı Keşfedin', to: 'rezervasyon' },
        },
      },
      {
        type: 'cta', layout: 'banner', id: 'iletisim', tone: 'dark', image: I('hero'), kicker: 'Zeytin Burnu Hotel',
        title: ['Ege’de sizi bekleyen', 'daha fazlası var.'], italic: [1], text: 'Doğayla iç içe, kişiselleştirilmiş hizmetler ve unutulmaz anılarla dolu bir tatil için yerinizi ayırtın.',
        primary: { label: 'Rezervasyon Yap', to: 'rezervasyon' },
        metrics: [{ v: '50+', l: 'Özel oda' }, { v: '3', l: 'Restoran ve bar' }, { v: '12', l: 'Yıllık deneyim' }],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Bodrum’da butik bir konaklama deneyimi. Bu sayfa örnek bir otele aittir.', newsletter: 'Size özel fırsatlardan haberdar olun.',
      links: [{ label: 'Odalar', to: 'odalar' }, { label: 'Deneyimler', to: 'deneyim' }, { label: 'Restoran', to: 'restoran' }, { label: 'Rezervasyon', to: 'rezervasyon' }],
      social: ['instagram', 'youtube', 'pinterest'], contact: ['Örnek Koyu No:1, Bodrum / Muğla', '+90 252 000 00 00'],
    },
  },
};
