import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web19-${k}.webp`;

/** WEB 19: Sinematik resort (kurgusal marka: Aurea Resort & Living). */
export const web19: TemplateV2Def = {
  slug: 'web19',
  code: 'WEB 19',
  minimumPackage: 'professional',
  brand: 'Aurea Resort',
  sector: 'Resort ve tatil köyü',
  category: 'Otel ve Turizm',
  summary: 'Gün batımı atmosferinde sinematik bir resort: eğik serif başlıklar, oda kartları, geri sayımlı kampanya ve galeri.',
  features: ['Geri sayımlı kampanya', 'Oda kartları', 'Galeri şeridi'],
  site: {
    theme: {
      bg: '#f3eee6', ink: '#1d1a16', accent: '#d9a05b', accentInk: '#1a1208', surface: '#e8dfd2', dark: '#0f0d0b', darkInk: '#f3ece1',
      heading: 'cormorant', body: 'manrope', headingWeight: 400, headingTracking: '-0.02em', headingLeading: 0.96, radius: 'pill',
    },
    logo: { text: 'AUREA', sub: 'Resort & Living', mark: 'ring', letter: 'A' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['search', 'lang'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Odalar', to: 'odalar' }, { label: 'Deneyimler', to: 'deneyim' }, { label: 'Fırsatlar', to: 'teklif' }, { label: 'Galeri', to: 'galeri' }],
      cta: { label: 'Rezervasyon Yap', to: 'odalar' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Gün batımında deniz manzaralı havuz ve teras', focus: '55% 50%',
        kicker: 'Doğanın içinde, zamansız bir kaçış', lines: ['Sıradan', 'değil,', 'sizin için.'], italic: [2],
        text: 'Akdeniz’in eşsiz doğasında, modern konforla tasarlanmış özel bir deneyim sizi bekliyor.',
        primary: { label: 'Rezervasyon Yap', to: 'odalar' }, secondary: { label: 'Tanıtım Filmini İzle', play: true },
        steps: [{ n: '01', t: 'Keşfet' }, { n: '02', t: 'Dinle' }, { n: '03', t: 'Yaşa' }], coords: 'Bodrum, Türkiye · 37.03° K · 27.43° D',
      },
      {
        type: 'cards', layout: 'overlay', id: 'odalar', tone: 'light', arrows: true, cols: 3,
        head: { kicker: 'Odalarımız', title: ['Her detayda', 'sizin konforunuz.'], italic: [1], text: 'Doğal malzemeler, modern tasarım ve Akdeniz manzarasıyla benzersiz bir konaklama deneyimi sunuyoruz.', cta: { label: 'Tüm Odaları İncele', to: 'odalar' } },
        items: [
          { image: I('r1'), title: 'Deluxe Oda', sub: 'Deniz manzaralı', to: 'teklif' },
          { image: I('r2'), title: 'Suite Oda', sub: 'Özel havuzlu', to: 'teklif' },
          { image: I('r3'), title: 'Villa', sub: 'Bahçeli ve özel havuzlu', to: 'teklif' },
        ],
      },
      {
        type: 'split', id: 'deneyim', tone: 'dark',
        media: { image: I('swim'), alt: 'Havuzda dinlenen bir misafir, gün batımı', aspect: 'landscape', focus: '60% 40%' },
        content: {
          kicker: 'Deneyimler', title: ['Sadece konaklama değil,', 'bir yaşam tarzı.'], italic: [1],
          text: 'Gastronomi, wellness, doğa, deniz ve daha fazlası. Hayatın güzel yanlarını yeniden keşfedin.',
          list: [{ icon: 'utensils', t: 'Gastronomi', x: 'Yöresel lezzetler, modern sunumlar' }, { icon: 'flower', t: 'Wellness', x: 'Zihin ve beden dengesi' }, { icon: 'waves', t: 'Deniz ve doğa', x: 'Eşsiz koylar, özel turlar' }, { icon: 'music', t: 'Etkinlikler', x: 'Sanat, müzik ve daha fazlası' }],
          cta: { label: 'Tüm Deneyimler', to: 'galeri' },
        },
      },
      {
        type: 'countdown', id: 'teklif', tone: 'light', image: I('dinner'), alt: 'Zeytin ağacı altında kurulmuş akşam yemeği masası', kicker: 'Özel teklif',
        title: ['Erken rezervasyon', 'avantajları.'], text: 'Yaz sezonu için özel indirimler ve ayrıcalıklarla tatilinizi şimdiden planlayın.', cta: { label: 'Fırsatları Keşfet', to: 'odalar' }, days: 12,
      },
      {
        type: 'gallery', id: 'galeri', tone: 'light',
        head: { kicker: 'Galeri', title: ['Anlar', 'hikâyelere dönüşür.'], italic: [1], cta: { label: 'Tüm Galeriyi Gör', to: 'galeri' } },
        items: [
          { image: I('g1'), alt: 'Gün batımında havuz' }, { image: I('g2'), alt: 'Şefin tabağı' }, { image: I('g3'), alt: 'Taş yol ve zeytin ağaçları' },
          { image: I('g4'), alt: 'Deniz manzarası, video', play: true }, { image: I('g5'), alt: 'Deniz manzaralı teras' },
        ],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Akdeniz’de doğayla iç içe bir tatil. Bu sayfa örnek bir resorta aittir.', newsletter: 'Bültenimize katılın.',
      links: [{ label: 'Odalar', to: 'odalar' }, { label: 'Deneyimler', to: 'deneyim' }, { label: 'Fırsatlar', to: 'teklif' }, { label: 'Galeri', to: 'galeri' }],
      social: ['instagram', 'youtube', 'pinterest'], contact: ['Örnek Koyu No:4, Bodrum / Muğla', '+90 252 000 00 00'],
    },
  },
};
