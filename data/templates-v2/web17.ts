import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web17-${k}.webp`;

/** WEB 17: Fitness stüdyosu (kurgusal marka: Pulse Fitness Studio). */
export const web17: TemplateV2Def = {
  slug: 'web17',
  code: 'WEB 17',
  minimumPackage: 'professional',
  brand: 'Pulse Fitness Studio',
  sector: 'Fitness stüdyosu',
  category: 'Spor ve Yaşam',
  summary: 'Performans kültürü: sayaçlı hero, gün seçilebilen ders programı (katıl / iptal), eğitmen seçici ve seçilebilir üyelik paketleri.',
  features: ['Etkileşimli ders programı', 'Eğitmen seçici', 'Seçilebilir üyelik paketleri'],
  site: {
    theme: {
      bg: '#0e0e0e', ink: '#f4f4f4', accent: '#ff4b12', accentInk: '#0e0e0e', surface: '#171717', dark: '#0a0a0a', darkInk: '#f4f4f4', paper: '#efece6', paperInk: '#111111',
      heading: 'barlow', body: 'inter', headingWeight: 800, headingTracking: '-0.01em', headingCase: 'uppercase', headingLeading: 0.92, radius: 'sharp',
    },
    logo: { text: 'PULSE', sub: 'Fitness Studio', mark: 'slash' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['search'],
      links: [{ label: 'Anasayfa', to: 'ust' }, { label: 'Dersler', to: 'dersler' }, { label: 'Eğitmenler', to: 'egitmen' }, { label: 'Tesis', to: 'tesis' }, { label: 'Üyelik', to: 'uyelik' }],
      cta: { label: 'Üyelik Başlat', to: 'uyelik' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Kettlebell ile şınav pozisyonunda çalışan sporcu', focus: '55% 40%',
        kicker: 'Train / Move / Repeat', lines: ['Farklı', 'hareket et.'], accent: [1],
        text: 'Daha güçlü bir sen için doğru antrenman, doğru ortam, doğru ekip.',
        primary: { label: 'Üyelik Başlat', to: 'uyelik' }, secondary: { label: 'Tanıtım Videosu', play: true },
        metrics: [{ v: '12+', l: 'Farklı ders' }, { v: '5', l: 'Uzman eğitmen' }, { v: '1', l: 'Hedef: sen' }], note: ['Daha güçlü', 'Daha sağlıklı', 'Daha mutlu'],
      },
      { type: 'marquee', tone: 'dark', words: ['Strength', 'Mobility', 'HIIT', 'Yoga', 'Conditioning'] },
      {
        type: 'schedule', id: 'dersler', tone: 'dark', image: I('rope'), imageAlt: 'İpli antrenman yapan sporcu', imageLabel: 'Dersleri keşfet',
        head: { kicker: 'Ders programı', title: ['Bugün hangi ders', 'senin için?'], text: 'Kendine en uygun dersi seç, şimdi harekete geç.' },
        days: [
          { label: 'Pzt', date: '24', classes: [
            { time: '07:00', name: 'Strength', coach: 'Deniz A.', spots: 3 }, { time: '09:30', name: 'Mobility', coach: 'Ece Y.', spots: 0 },
            { time: '18:30', name: 'HIIT', coach: 'Burak T.', spots: 3 }, { time: '20:00', name: 'Yoga', coach: 'Selin K.', spots: 5 },
          ] },
          { label: 'Sal', date: '25', classes: [
            { time: '07:30', name: 'Conditioning', coach: 'Deniz A.', spots: 6 }, { time: '12:30', name: 'Mobility', coach: 'Ece Y.', spots: 4 },
            { time: '19:00', name: 'Strength', coach: 'Burak T.', spots: 2 }, { time: '20:30', name: 'Yoga', coach: 'Selin K.', spots: 0 },
          ] },
          { label: 'Çar', date: '26', classes: [
            { time: '07:00', name: 'HIIT', coach: 'Burak T.', spots: 5 }, { time: '10:00', name: 'Yoga', coach: 'Selin K.', spots: 7 },
            { time: '18:00', name: 'Conditioning', coach: 'Deniz A.', spots: 3 }, { time: '19:30', name: 'Mobility', coach: 'Ece Y.', spots: 6 },
          ] },
        ],
      },
      {
        type: 'split', id: 'egitmen', tone: 'soft',
        media: { image: I('trainer'), alt: 'Siyah tişörtlü kondisyon eğitmeni', aspect: 'portrait', focus: '50% 30%' },
        content: {
          kicker: 'Eğitmenler', title: ['Uzman', 'kadro.'],
          text: 'Alanında deneyimli eğitmenlerimizle hedeflerine daha hızlı ulaşırsın.',
          profiles: [
            { name: 'Deniz A.', role: 'Strength / Conditioning', image: I('trainer'), text: 'Fonksiyonel antrenman, kuvvet ve kondisyon alanlarında uzman. Daha güçlü ve dayanıklı bir sen mümkün.', kpis: [{ v: '8+', l: 'Yıl deneyim' }] },
            { name: 'Ece Y.', role: 'Mobility / Functional', image: I('hero'), text: 'Hareket kalitesi, esneklik ve fonksiyonel güç üzerine çalışır. Vücudunu doğru kullanmayı öğretir.', kpis: [{ v: '6+', l: 'Yıl deneyim' }] },
            { name: 'Burak T.', role: 'HIIT / Conditioning', image: I('rope'), text: 'Yüksek tempolu, ölçülebilir ilerleme odaklı antrenmanlar tasarlar.', kpis: [{ v: '7+', l: 'Yıl deneyim' }] },
          ],
          cta: { label: 'Ders programı', to: 'dersler' },
        },
      },
      {
        type: 'cta', layout: 'features', id: 'tesis', tone: 'dark', image: I('gym'), kicker: 'Tesis', title: ['Modern ve', 'donanımlı', 'alanlar.'],
        text: 'En iyi antrenman deneyimi için tasarlandı.', primary: { label: 'Tesisi Keşfet', to: 'uyelik' },
        features: [
          { icon: 'activity', t: 'Kardiyo alanı', x: 'Koşu ve bisiklet' }, { icon: 'dumbbell', t: 'Ağırlık alanı', x: 'Serbest ağırlık' },
          { icon: 'flame', t: 'Fonksiyonel alan', x: 'Halat, kettlebell, sled' }, { icon: 'key', t: 'Soyunma odaları', x: 'Dolaplı ve ferah' },
        ],
      },
      {
        type: 'pricing', id: 'uyelik', tone: 'paper',
        head: { kicker: 'Üyelik paketleri', title: ['Sana en uygun', 'paketi seç.'], text: 'Esnek üyelik seçenekleriyle hedeflerine bir adım daha yaklaş.' },
        plans: [
          { name: 'Starter', price: '₺1.990', per: '/ay', note: 'Başlamak için ideal.', features: ['8 ders / ay', 'Tesis kullanımı', 'Online destek'] },
          { name: 'Premium', tag: 'En popüler', featured: true, price: '₺2.990', per: '/ay', note: 'Daha fazlasını isteyenler için.', features: ['Sınırsız ders', 'Tesis kullanımı', 'Kişisel antrenman planı', 'Sauna ve duş'] },
          { name: 'Elite', price: '₺4.990', per: '/ay', note: 'Maksimum performans.', features: ['Sınırsız ders', 'Tesis kullanımı', 'Kişisel antrenman planı', 'Sauna ve duş', 'Diyetisyen desteği'] },
        ],
      },
      { type: 'cta', layout: 'newsletter', id: 'iletisim', tone: 'dark', kicker: 'Hemen başla', title: ['Daha iyi bir sen', 'seni bekliyor.'], text: 'E-posta adresini bırak, yeniliklerden haberdar ol.' },
    ],
    footer: {
      tone: 'dark', blurb: 'Performans kültürü. Bu sayfa örnek bir stüdyoya aittir.',
      links: [{ label: 'Dersler', to: 'dersler' }, { label: 'Eğitmenler', to: 'egitmen' }, { label: 'Tesis', to: 'tesis' }, { label: 'Üyelik', to: 'uyelik' }],
      social: ['instagram', 'youtube', 'x'], contact: ['Örnek Mah. Örnek Cd. No:12, Bursa'],
    },
  },
};
