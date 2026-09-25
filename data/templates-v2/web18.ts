import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web18-${k}.webp`;

/** WEB 18: Moda / atölye markası (kurgusal marka: Sera Atelier). */
export const web18: TemplateV2Def = {
  slug: 'web18',
  code: 'WEB 18',
  minimumPackage: 'business',
  brand: 'Sera Atelier',
  sector: 'Moda atölyesi',
  category: 'Moda',
  summary: 'Sürdürülebilir bir moda markası için sıcak, sinematik bir vitrin: tam kadraj hero, kayan ürün şeridi ve büyük koleksiyon panelleri.',
  features: ['Kayan ürün şeridi', 'Büyük koleksiyon panelleri', 'Lookbook ve bülten'],
  site: {
    theme: {
      bg: '#efe9df', ink: '#1a1612', accent: '#1a1612', accentInk: '#efe9df', surface: '#e4dccf', dark: '#14100d', darkInk: '#efe7db',
      heading: 'cormorant', body: 'manrope', headingWeight: 400, headingTracking: '-0.02em', headingLeading: 0.98, radius: 'sharp',
    },
    logo: { text: 'SERA', sub: 'Atelier', mark: 'square', letter: 'S' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['search', 'heart', 'cart', 'lang'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Koleksiyon', to: 'koleksiyon' }, { label: 'Kadın', to: 'kadin' }, { label: 'Erkek', to: 'kadin' }, { label: 'Lookbook', to: 'lookbook' }, { label: 'Hikâyemiz', to: 'hikaye' }],
      cta: { label: 'Koleksiyon', to: 'koleksiyon' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Bej keten ceketli kadın modeli, sıcak ışıkta', focus: '50% 30%',
        kicker: 'Yeni sezon', lines: ['Zamansız', 'şıklık.'], italic: [1],
        text: 'Klasik çizgiler, modern detaylar ve sürdürülebilir kumaşlarla tasarlanan yeni koleksiyonumuzla tarzın zamana meydan okuyor.',
        primary: { label: 'Koleksiyonu Keşfet', to: 'koleksiyon' }, secondary: { label: 'Tanıtım Filmini İzle', play: true },
        steps: [{ n: '01', t: 'Zamansız tasarım' }, { n: '02', t: 'Sürdürülebilir kumaş' }, { n: '03', t: 'Sınırlı üretim' }],
      },
      {
        type: 'strip', layout: 'thumbs', id: 'koleksiyon', tone: 'light',
        items: [
          { image: I('tk'), title: 'Kadın', text: 'Koleksiyonu', to: 'kadin' }, { image: I('te'), title: 'Erkek', text: 'Koleksiyonu', to: 'kadin' },
          { image: I('ta'), title: 'Aksesuar', text: 'Koleksiyonu', to: 'lookbook' }, { image: I('ty'), title: 'Yeni sezon', text: 'Ürünleri', to: 'hikaye' },
        ],
      },
      {
        type: 'split', id: 'hikaye', tone: 'soft',
        media: { image: I('fabric'), alt: 'Doğal keten kumaşın yakın çekimi', aspect: 'portrait' },
        content: {
          kicker: 'Doğa ile uyum içinde', title: ['Sürdürülebilir', 'bir moda', 'anlayışı.'], italic: [1],
          text: 'Daha iyi bir gelecek için, doğaya saygılı materyaller ve etik üretim süreçleriyle tasarlıyoruz.',
          list: [{ icon: 'leaf', t: 'Doğal kumaşlar' }, { icon: 'recycle', t: 'Geri dönüştürülebilir materyaller' }, { icon: 'heart', t: 'Etik üretim' }],
          cta: { label: 'Hikâyemizi Keşfedin', to: 'lookbook' },
        },
      },
      {
        type: 'shop', layout: 'carousel', id: 'urunler', tone: 'light', head: { kicker: 'Öne çıkan ürünler', title: ['Seçkimiz'], cta: { label: 'Tümünü gör', to: 'urunler' } },
        categories: [], sizes: [], maxPrice: 8000,
        products: [
          { name: 'Oversize blazer ceket', price: 4950, image: I('p1'), category: 'Ceket', colors: ['#121212', '#57504a', '#c9b7a3'], sizes: ['S', 'M', 'L'], tag: 'Yeni' },
          { name: 'Drapeli saten bluz', price: 3750, image: I('p2'), category: 'Bluz', colors: ['#d8d2c6', '#f3ede2', '#3a2a20'], sizes: ['XS', 'S', 'M'], tag: 'Sınırlı üretim' },
          { name: 'Relaxed fit gömlek', price: 2950, image: I('p3'), category: 'Gömlek', colors: ['#141414', '#e8e2d6'], sizes: ['M', 'L', 'XL'], tag: 'Yeni' },
          { name: 'Deri çanta', price: 6950, image: I('acc'), category: 'Aksesuar', colors: ['#111111'], sizes: [] },
        ],
      },
      {
        type: 'cards', layout: 'wide', id: 'kadin', tone: 'dark',
        items: [
          { image: I('erkek'), title: 'Erkek koleksiyonu', text: 'Modern erkeğin güçlü ve sade stilini yansıtan parçalar.', focus: '65% 35%', to: 'urunler' },
          { image: I('kadin'), title: 'Kadın koleksiyonu', text: 'Zamansız tasarımlar, modern kadınlar için yeniden yorumlandı.', focus: '35% 40%', to: 'urunler' },
        ],
      },
      {
        type: 'cards', layout: 'overlay', id: 'lookbook', tone: 'light', cols: 3,
        head: { kicker: 'Lookbook', title: ['Şehrin', 'ritmi.'], italic: [1], text: '2025 ilkbahar / yaz koleksiyonu.' },
        items: [
          { image: I('look'), title: 'Şehrin ritmi', text: '2025 ilkbahar / yaz koleksiyonu', to: 'urunler', focus: '60% 40%' },
          { image: I('acc'), title: 'Kombini tamamla', text: 'Aksesuar seçenekleriyle stilini bütünleştir.', to: 'urunler' },
          { image: I('p2'), title: 'Yeni sezon', text: 'Sınırlı üretim parçalar.', to: 'urunler' },
        ],
      },
      { type: 'cta', layout: 'newsletter', tone: 'dark', kicker: 'Sera Atelier', title: ['Özel fırsatlar ve yeni', 'koleksiyonlardan haberdar ol.'], text: 'İlk sen bil; kampanya ve yeniliklerden e-posta ile haberdar ol.' },
    ],
    footer: {
      tone: 'dark', blurb: 'Sürdürülebilir ve zamansız moda. Bu sayfa örnek bir markaya aittir.',
      links: [{ label: 'Koleksiyon', to: 'koleksiyon' }, { label: 'Hikâyemiz', to: 'hikaye' }, { label: 'Lookbook', to: 'lookbook' }, { label: 'Mağazalar' }],
      social: ['instagram', 'pinterest', 'youtube', 'linkedin'], contact: ['Örnek Cd. No:9, Bebek / İstanbul'],
    },
  },
};
