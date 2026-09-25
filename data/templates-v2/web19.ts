import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web19-${k}.webp`;

/** WEB 19: Karanlık, sinematik lüks resort (kurgusal marka: Aurea Resort & Living). */
export const web19: TemplateV2Def = {
  slug: 'web19',
  code: 'WEB 19',
  minimumPackage: 'business',
  brand: 'Aurea Resort',
  sector: 'Lüks resort',
  category: 'Otel ve Turizm',
  summary: 'Tamamen koyu, sinematik bir lüks resort: büyük harfli serif başlıklar, dizin tarzı oda listesi, geri sayımlı kampanya ve galeri.',
  features: ['Koyu sinematik tema', 'Dizin tarzı oda listesi', 'Geri sayımlı kampanya'],
  site: {
    theme: {
      bg: '#0d0b09', ink: '#f1e9dc', accent: '#c9a86a', accentInk: '#15100a', surface: '#181512', dark: '#080706', darkInk: '#f1e9dc',
      paper: '#efe6d6', paperInk: '#1c1812',
      heading: 'playfair', body: 'manrope', headingWeight: 400, headingTracking: '0.01em', headingLeading: 1.08, radius: 'sharp',
    },
    logo: { text: 'AUREA', sub: 'Resort & Living', mark: 'square', letter: 'A' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['search'],
      links: [{ label: 'Odalar', to: 'odalar' }, { label: 'Yaşam', to: 'yasam' }, { label: 'Fırsat', to: 'teklif' }, { label: 'Galeri', to: 'galeri' }],
      cta: { label: 'Rezervasyon', to: 'odalar' },
    },
    blocks: [
      {
        type: 'hero', variant: 'poster', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Gün batımında ışıklı teras, havuz ve deniz manzarası', focus: '68% 50%',
        kicker: 'Bodrum · 37.03° K · 27.43° D', lines: ['Sıradan', 'değil,', 'sizin için.'], italic: [2],
        text: 'Akdeniz’in eşsiz doğasında, modern konforla tasarlanmış özel bir deneyim sizi bekliyor.',
        primary: { label: 'Rezervasyon Yap', to: 'odalar' }, secondary: { label: 'Tanıtım Filmini İzle', play: true },
        note: ['Gün batımı terası', 'Özel havuz'],
      },
      {
        type: 'strip', layout: 'numbered', id: 'yol', tone: 'soft',
        items: [
          { n: '01', title: 'Keşfet', text: 'Koyları, terasları ve sessiz köşeleri.' },
          { n: '02', title: 'Dinle', text: 'Deniz sesi, ateş ve akşam müziği.' },
          { n: '03', title: 'Yaşa', text: 'Size özel bir tempo, eksiksiz bir konfor.' },
        ],
      },
      {
        type: 'showcase', layout: 'list', id: 'odalar', tone: 'dark',
        head: { kicker: 'Konaklama', title: ['Üç farklı', 'huzur biçimi.'], italic: [1] },
        items: [
          { title: 'Deluxe Oda', image: I('r1'), text: 'Deniz manzaralı, doğal malzemelerle tasarlanmış sakin bir oda.', cta: { label: 'Fırsatı görün', to: 'teklif' } },
          { title: 'Suite Oda', image: I('r2'), text: 'Özel havuzlu, geniş oturma alanlı ve gün batımına açılan teras.', cta: { label: 'Fırsatı görün', to: 'teklif' } },
          { title: 'Villa', image: I('r3'), text: 'Bahçeli, özel havuzlu ve tamamen size ayrılmış bir yaşam alanı.', cta: { label: 'Fırsatı görün', to: 'teklif' } },
        ],
      },
      {
        type: 'split', id: 'yasam', tone: 'paper', flip: true,
        media: { image: I('swim'), alt: 'Havuzda dinlenen bir misafir, gün batımı', aspect: 'landscape', focus: '60% 40%', frame: 'plain' },
        content: {
          kicker: 'Yaşam tarzı', title: ['Sadece konaklama değil,', 'bir yaşam tarzı.'], italic: [1],
          text: 'Gastronomi, wellness, doğa ve deniz. Hayatın güzel yanlarını yeniden keşfedin.',
          list: [{ icon: 'utensils', t: 'Gastronomi', x: 'Yöresel lezzetler, modern sunumlar' }, { icon: 'flower', t: 'Wellness', x: 'Zihin ve beden dengesi' }, { icon: 'waves', t: 'Deniz ve doğa', x: 'Koylar ve özel turlar' }, { icon: 'music', t: 'Akşam etkinlikleri', x: 'Sanat ve müzik' }],
          cta: { label: 'Galeriye göz atın', to: 'galeri' },
        },
      },
      {
        type: 'stats', id: 'rakamlar', tone: 'dark', image: I('dinner'), kicker: 'Aurea’da bir gün', quote: 'Lüks, acele etmemektir.',
        items: [{ v: '24/7', l: 'Oda servisi' }, { v: '3', l: 'Konaklama türü' }, { v: '1', l: 'Özel kıyı' }, { v: '365', l: 'Gün açık' }],
      },
      {
        type: 'countdown', id: 'teklif', tone: 'soft', image: I('dinner'), alt: 'Zeytin ağacı altında kurulmuş akşam yemeği masası', kicker: 'Özel teklif',
        title: ['Erken rezervasyon', 'avantajları.'], text: 'Yaz sezonu için özel ayrıcalıklarla tatilinizi şimdiden planlayın.', cta: { label: 'Fırsatları Keşfet', to: 'odalar' }, days: 12,
      },
      {
        type: 'gallery', id: 'galeri', tone: 'dark',
        head: { kicker: 'Galeri', title: ['Anlar', 'hikâyelere dönüşür.'], italic: [1] },
        items: [
          { image: I('g1'), alt: 'Gün batımında havuz' }, { image: I('g2'), alt: 'Şefin tabağı' }, { image: I('g3'), alt: 'Taş yol ve zeytin ağaçları' },
          { image: I('g4'), alt: 'Deniz manzarası, video', play: true }, { image: I('g5'), alt: 'Deniz manzaralı teras' },
        ],
      },
      { type: 'cta', layout: 'newsletter', id: 'bulten', tone: 'soft', kicker: 'Aurea bülteni', title: ['Sezonun ilk', 'davetini alın.'], text: 'E-posta adresinizi bırakın, yeni sezon ve özel geceler için haberdar olun.' },
    ],
    footer: {
      tone: 'dark', blurb: 'Akdeniz’de doğayla iç içe bir tatil. Bu sayfa örnek bir resorta aittir.',
      links: [{ label: 'Konaklama', to: 'odalar' }, { label: 'Yaşam', to: 'yasam' }, { label: 'Fırsat', to: 'teklif' }, { label: 'Galeri', to: 'galeri' }],
      social: ['instagram', 'youtube', 'pinterest'], contact: ['Örnek Koyu No:4, Bodrum / Muğla', '+90 252 000 00 00'],
    },
  },
};
