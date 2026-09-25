import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web20-${k}.webp`;

/** WEB 20: Rezervasyon panelli resort (kurgusal marka: Selene Resort & Living). */
export const web20: TemplateV2Def = {
  slug: 'web20',
  code: 'WEB 20',
  minimumPackage: 'premium',
  brand: 'Selene Resort',
  sector: 'Resort ve tatil köyü',
  category: 'Otel ve Turizm',
  summary: 'Hero içinde yüzen rezervasyon paneli, el yazısı vurgu, etkinlik takvimi ve gurme bölümü olan, premium bir resort sitesi.',
  features: ['Yüzen rezervasyon paneli', 'Etkinlik takvimi', 'El yazısı vurgu'],
  site: {
    theme: {
      bg: '#f4efe7', ink: '#1e1b17', accent: '#b4763f', accentInk: '#ffffff', surface: '#ebe3d6', dark: '#14100d', darkInk: '#f4ece1',
      heading: 'instrument', body: 'manrope', headingWeight: 400, headingTracking: '-0.02em', headingLeading: 0.98, radius: 'pill',
    },
    logo: { text: 'SELENE', sub: 'Resort & Living', mark: 'ring', letter: 'S' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['search', 'lang'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Odalar', to: 'odalar' }, { label: 'Deneyimler', to: 'ruh' }, { label: 'Restoran', to: 'gurme' }, { label: 'Etkinlikler', to: 'etkinlik' }],
      cta: { label: 'Rezervasyon Yap', to: 'ust' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Kemerli teras, havuz ve gün batımı manzarası', focus: '50% 50%',
        kicker: 'Doğanın ritminde, sizin için', lines: ['Kaçış değil,', 'denge.'], italic: [1],
        text: 'Akdeniz’in eşsiz doğasında, modern lüks ve huzuru bir araya getiren benzersiz bir deneyim sizi bekliyor.',
        primary: { label: 'Rezervasyon Yap', to: 'odalar' }, secondary: { label: 'Tanıtım Filmini İzle', play: true }, script: 'Bodrum', coords: 'Türkiye’nin en özel kıyılarından biri',
        panel: {
          type: 'booking', layout: 'card', title: 'Hayalinizdeki tatili planlayın.', tabs: ['Oda', 'Villa', 'Özel deneyim'], submit: 'Uygun Odaları Gör',
          fields: [
            { id: 'giris', label: 'Giriş tarihi', kind: 'date' }, { id: 'cikis', label: 'Çıkış tarihi', kind: 'date' },
            { id: 'misafir', label: 'Misafirler', kind: 'guests', options: ['2 yetişkin', '2 yetişkin, 1 çocuk', '2 yetişkin, 2 çocuk', '4 yetişkin'], value: '2 yetişkin' },
          ],
          note: 'En iyi fiyat garantisi (örnek).', done: 'Örnek şablon: müsaitlik sorgunuz alındı (demo).',
        },
      },
      {
        type: 'strip', layout: 'icons', tone: 'dark',
        items: [
          { icon: 'leaf', title: 'Doğa ile iç içe konum' }, { icon: 'infinity', title: 'Sınırsız rahatlık' }, { icon: 'flower', title: 'Wellness ve spa deneyimi' },
          { icon: 'utensils', title: 'Gurme lezzetler' }, { icon: 'star', title: 'Kişiye özel hizmet' },
        ],
      },
      {
        type: 'cards', layout: 'overlay', id: 'odalar', tone: 'light', cols: 3,
        head: { kicker: 'Selene Resort & Living', title: ['Her an', 'sizin hikâyeniz.'], italic: [1], text: 'Sadece bir tatil değil, size özel bir yaşam tarzı sunuyoruz. Deniz, doğa ve modern tasarımın kusursuz uyumuyla benzersiz bir deneyim yaşayın.', cta: { label: 'Hikâyemizi Keşfedin', to: 'ruh' } },
        items: [
          { image: I('r1'), title: 'Odalar', sub: 'Huzurlu bir konfor alanı.', to: 'ust' },
          { image: I('r2'), title: 'Villalar', sub: 'Size özel, size özgü.', to: 'ust' },
          { image: I('r3'), title: 'Deneyimler', sub: 'Her anı unutulmaz kılın.', to: 'etkinlik' },
        ],
      },
      {
        type: 'split', id: 'ruh', tone: 'dark', flip: true,
        media: { image: I('swim'), alt: 'Akşam ışığında havuzda dinlenen misafir', aspect: 'landscape', play: 'Selene’yi keşfedin' },
        content: {
          kicker: 'Akdeniz’in ruhu', title: ['Doğa. Lezzet.', 'Huzur. Sizinle.'], italic: [1],
          text: 'Eşsiz manzaralar, gurme lezzetler, wellness ritüelleri ve daha fazlasıyla keşfetmeye hazır olun.',
          steps: [{ n: '01', t: 'Deniz' }, { n: '02', t: 'Gastronomi' }, { n: '03', t: 'Wellness' }, { n: '04', t: 'Doğa' }, { n: '05', t: 'Etkinlikler' }],
          cta: { label: 'Tüm Deneyimleri İnceleyin', to: 'gurme' },
        },
      },
      {
        type: 'cards', layout: 'overlay', id: 'gurme', tone: 'light', cols: 3,
        items: [
          { image: I('food'), title: 'Gurme bir yolculuk.', sub: 'Restoranımızı keşfedin', to: 'etkinlik' },
          { image: I('spa'), title: 'Yenilenin. Dengelenin.', sub: 'Spa ve wellness', to: 'etkinlik' },
          { image: I('coast'), title: 'Sıradışı deneyimler.', sub: 'Özel turlar', to: 'etkinlik' },
        ],
      },
      {
        type: 'cards', layout: 'events', id: 'etkinlik', tone: 'light', arrows: true,
        head: { kicker: 'Etkinlikler', title: ['Buluşmalar,', 'daha özel.'], italic: [1], text: 'Özel etkinlikler, sanat buluşmaları ve unutulmaz deneyimlerle tatilinize anlam katın.', cta: { label: 'Etkinlikleri İncele', to: 'etkinlik' } },
        items: [
          { image: I('r2'), title: 'Sunset Music Night', sub: 'DJ performansı', date: { d: '26', m: 'Nisan' }, to: 'ust' },
          { image: I('swim'), title: 'Yoga & Wellness', sub: 'Doğa ile yenilen', date: { d: '03', m: 'Mayıs' }, to: 'ust' },
          { image: I('food'), title: 'Gurme Tadım Gecesi', sub: 'Şef menüsü', date: { d: '17', m: 'Mayıs' }, to: 'ust' },
        ],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Akdeniz’de denge ve huzur. Bu sayfa örnek bir resorta aittir.', quote: 'Daha fazlası, daha azla mümkün.', newsletter: 'Size özel fırsatlardan haberdar olun.',
      links: [{ label: 'Odalar', to: 'odalar' }, { label: 'Deneyimler', to: 'ruh' }, { label: 'Restoran', to: 'gurme' }, { label: 'Etkinlikler', to: 'etkinlik' }],
      social: ['instagram', 'youtube', 'facebook', 'linkedin'], contact: ['Örnek Koyu No:6, Bodrum / Muğla', '+90 252 000 00 00'],
    },
  },
};
