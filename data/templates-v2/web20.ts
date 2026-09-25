import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web20-${k}.webp`;

/** WEB 20: Aydınlık, modern kıyı resortu (kurgusal marka: Selene Resort & Living). */
export const web20: TemplateV2Def = {
  slug: 'web20',
  code: 'WEB 20',
  minimumPackage: 'business',
  brand: 'Selene Resort',
  sector: 'Kıyı resortu',
  category: 'Otel ve Turizm',
  summary: 'Aydınlık, denizden esinlenen modern bir resort: adım adım rezervasyon, haftalık etkinlik programı, oda kartları ve günlük.',
  features: ['Adım adım rezervasyon', 'Haftalık etkinlik programı', 'Talep formu'],
  site: {
    theme: {
      bg: '#f5fafa', ink: '#0c2a33', accent: '#0f7d8c', accentInk: '#ffffff', surface: '#e2f0f0', dark: '#0a2a33', darkInk: '#e9f6f6',
      heading: 'archivo', body: 'manrope', headingWeight: 700, headingTracking: '-0.035em', headingLeading: 1.02, radius: 'round',
    },
    logo: { text: 'Selene', sub: 'Resort & Living', mark: 'dot', letter: 'S' },
    header: {
      style: 'solid', tone: 'light', extras: ['lang'],
      links: [{ label: 'Odalar', to: 'odalar' }, { label: 'Program', to: 'program' }, { label: 'Lezzet', to: 'lezzet' }, { label: 'Günlük', to: 'gunluk' }],
      cta: { label: 'Rezervasyon', to: 'rezervasyon' }, phone: '+90 252 000 00 00',
    },
    blocks: [
      {
        type: 'hero', variant: 'split', id: 'ust', tone: 'light', image: I('hero'), alt: 'Kemerli teras, havuz ve gün batımı manzarası', focus: '55% 50%',
        kicker: 'Kıyıda, sakin ve aydınlık', lines: ['Denizin ritminde', 'bir tatil.'], accent: [1],
        text: 'Akdeniz’in berrak koyunda, modern tasarım ve huzurun bir araya geldiği bir resort. Gününüzü siz planlayın.',
        primary: { label: 'Tatilini Planla', to: 'rezervasyon' }, secondary: { label: 'Odaları Gör', to: 'odalar' },
        badge: { title: 'Bu hafta', text: 'Sabah yogası ve koy turu programda.' },
        marquee: ['Deniz', 'Güneş', 'Zeytin', 'Sessizlik', 'Lezzet'],
      },
      {
        type: 'booking', layout: 'stepper', id: 'rezervasyon', tone: 'soft', kicker: 'Rezervasyon', title: 'Üç adımda talebinizi iletin.',
        text: 'Örnek formu deneyin: tarih, konaklama ve iletişim bilgilerinizi adım adım girin.', fields: [], submit: 'Talebi Gönder',
        steps: [
          { label: 'Tarih', fields: [{ id: 'giris', label: 'Giriş tarihi', kind: 'date' }, { id: 'cikis', label: 'Çıkış tarihi', kind: 'date' }] },
          { label: 'Konaklama', fields: [
            { id: 'tur', label: 'Konaklama türü', kind: 'select', options: ['Deniz manzaralı oda', 'Özel havuzlu suite', 'Bahçeli villa'], value: 'Deniz manzaralı oda' },
            { id: 'misafir', label: 'Misafirler', kind: 'guests', options: ['1 yetişkin', '2 yetişkin', '2 yetişkin, 1 çocuk', '4 yetişkin'], value: '2 yetişkin' },
          ] },
          { label: 'İletişim', fields: [{ id: 'ad', label: 'Ad soyad', kind: 'text', placeholder: 'Adınız' }, { id: 'tel', label: 'Telefon', kind: 'text', placeholder: '05xx xxx xx xx' }] },
        ],
        done: 'Örnek şablon: rezervasyon talebiniz alındı (demo).',
      },
      {
        type: 'cards', layout: 'poster', id: 'odalar', tone: 'light', cols: 3,
        head: { kicker: 'Konaklama', title: ['Her ihtiyaca', 'bir oda.'], text: 'Deniz, havuz ya da bahçe: size en yakın hissettiren yaşam alanını seçin.', cta: { label: 'Talep Oluştur', to: 'rezervasyon' } },
        items: [
          { image: I('r1'), title: 'Deniz Odası', sub: 'Balkonlu, deniz manzaralı', meta: ['2 misafir', '32 m²'], to: 'rezervasyon' },
          { image: I('r2'), title: 'Havuzlu Suite', sub: 'Özel havuz ve teras', meta: ['3 misafir', '54 m²'], to: 'rezervasyon' },
          { image: I('r3'), title: 'Bahçe Villa', sub: 'Bahçeli, sakin köşe', meta: ['4 misafir', '80 m²'], to: 'rezervasyon' },
        ],
      },
      {
        type: 'schedule', id: 'program', tone: 'dark', image: I('swim'), imageAlt: 'Akşam ışığında havuzda dinlenen misafir', imageLabel: 'Haftalık programı keşfedin',
        head: { kicker: 'Haftalık program', title: ['Bugün ne', 'yapmak istersiniz?'], text: 'Etkinliklere katılın; yerinizi ayırtmak için dokunmanız yeterli (demo).' },
        days: [
          { label: 'Cum', date: '26', classes: [
            { time: '08:00', name: 'Sabah yogası', coach: 'Deniz kenarı', spots: 6 }, { time: '11:00', name: 'Koy turu', coach: 'Özel tekne', spots: 3 },
            { time: '17:30', name: 'Gün batımı seansı', coach: 'Havuz terası', spots: 0 }, { time: '20:30', name: 'Canlı müzik', coach: 'Bahçe', spots: 12 },
          ] },
          { label: 'Cmt', date: '27', classes: [
            { time: '09:00', name: 'Pilates', coach: 'Spa salonu', spots: 5 }, { time: '12:30', name: 'Şef atölyesi', coach: 'Restoran', spots: 4 },
            { time: '19:00', name: 'Şarap tadımı', coach: 'Teras', spots: 8 },
          ] },
          { label: 'Paz', date: '28', classes: [
            { time: '08:30', name: 'Yüzme dersi', coach: 'Ana havuz', spots: 7 }, { time: '11:00', name: 'Doğa yürüyüşü', coach: 'Zeytinlik', spots: 9 },
            { time: '18:00', name: 'Akşam yemeği', coach: 'Restoran', spots: 2 },
          ] },
        ],
      },
      {
        type: 'split', id: 'lezzet', tone: 'light',
        media: { image: I('food'), alt: 'Şefin hazırladığı mevsim tabağı', aspect: 'landscape', frame: 'oval' },
        content: {
          kicker: 'Lezzet', title: ['Yerel malzeme,', 'sade sunum.'],
          text: 'Bahçemizden ve yakın çiftliklerden gelen ürünlerle günlük değişen bir menü hazırlıyoruz.',
          facts: [['Kahvaltı', '07:30 – 11:00'], ['Öğle', '12:30 – 16:00'], ['Akşam', '19:00 – 23:00'], ['Mutfak', 'Ege ve Akdeniz']],
          cta: { label: 'Masa Talebi', to: 'rezervasyon' },
        },
      },
      {
        type: 'journal', layout: 'cards', id: 'gunluk', tone: 'soft',
        head: { kicker: 'Selene günlüğü', title: ['Koydan', 'notlar.'], text: 'Mevsimin tadı, yerel rotalar ve resort yaşamından kısa yazılar.' },
        items: [
          { title: 'Bodrum’da bir hafta sonu rotası', date: '12 Eylül 2025', tag: 'Rota', image: I('coast') },
          { title: 'Zeytinliğin ortasında yoga sabahı', date: '5 Eylül 2025', tag: 'Wellness', image: I('spa') },
          { title: 'Ege mutfağında eylül tatları', date: '28 Ağustos 2025', tag: 'Lezzet', image: I('food') },
        ],
      },
      {
        type: 'cta', layout: 'contact', id: 'iletisim', tone: 'dark', image: I('coast'), kicker: 'İletişim', title: ['Sorularınız', 'için buradayız.'],
        text: 'Özel gün, grup ya da uzun konaklama talepleriniz için bize yazın.',
        typeLabel: 'Talep türü', projectTypes: ['Oda rezervasyonu', 'Grup konaklama', 'Özel etkinlik', 'Diğer'],
        info: ['Örnek Koyu No:6, Bodrum / Muğla', '+90 252 000 00 00', 'rezervasyon@selene.example'],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Kıyıda sakin, aydınlık bir tatil. Bu sayfa örnek bir resorta aittir.', newsletter: 'Bültenimize katılın.',
      links: [{ label: 'Odalar', to: 'odalar' }, { label: 'Program', to: 'program' }, { label: 'Lezzet', to: 'lezzet' }, { label: 'Günlük', to: 'gunluk' }],
      social: ['instagram', 'youtube', 'facebook'], contact: ['Örnek Koyu No:6, Bodrum / Muğla', '+90 252 000 00 00'],
    },
  },
};
