import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web13-${k}.webp`;
const J = (k: string) => `/images/templates/web18-${k}.webp`;

/** WEB 13: Moda e-ticaret (kurgusal marka: Nüans). */
export const web13: TemplateV2Def = {
  slug: 'web13',
  code: 'WEB 13',
  minimumPackage: 'business',
  brand: 'Nüans',
  sector: 'Moda e-ticaret',
  category: 'Moda',
  summary: 'Yüksek moda editoryali: dev tipografi, kategori/beden/fiyat filtreli ürün ızgarası, favoriler ve sepet sayacı.',
  features: ['Filtreli ürün ızgarası', 'Favori ve sepet', 'Editoryal hero'],
  site: {
    theme: {
      bg: '#f4f1ec', ink: '#16130f', accent: '#6b1f2a', accentInk: '#f6f1ea', surface: '#e9e3da', dark: '#14110e', darkInk: '#f2ede6',
      heading: 'playfair', body: 'manrope', headingWeight: 500, headingTracking: '-0.03em', headingCase: 'uppercase', headingLeading: 0.92, radius: 'sharp',
    },
    logo: { text: 'NÜANS', sub: 'Fashion', mark: 'dot' },
    header: {
      style: 'solid', tone: 'light', extras: ['search', 'heart', 'cart', 'lang'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Koleksiyon', to: 'urunler' }, { label: 'Kadın', to: 'koleksiyon' }, { label: 'Erkek', to: 'koleksiyon' }, { label: 'Aksesuar', to: 'koleksiyon' }, { label: 'Journal', to: 'journal' }],
      cta: { label: 'Yeni Sezon', to: 'urunler' },
    },
    blocks: [
      {
        type: 'hero', variant: 'poster', id: 'ust', image: I('hero'), alt: 'Koyu yün ceketli kadın modeli, beton mimari önünde', focus: '50% 25%',
        kicker: 'Yeni koleksiyon · FW 26', lines: ['Biçim', 'duyguyu', 'izler.'], italic: [2],
        text: 'Zamana bağlı kalmayan tasarımlar, modern bir yaşam tarzı için.',
        primary: { label: 'Koleksiyonu Keşfet', to: 'urunler' }, secondary: { label: 'Koleksiyon Filmini İzle', play: true }, note: ['Zamansız.', 'Özgün.', 'Senin tarzın.'],
      },
      {
        type: 'cards', layout: 'wide', id: 'koleksiyon', tone: 'dark',
        items: [
          { image: J('kadin'), title: 'Kadın koleksiyonu', text: 'Zarif kesimler, modern detaylar.', focus: '40% 40%', to: 'urunler' },
          { image: I('erkek'), title: 'Erkek koleksiyonu', text: 'Güçlü ve sade duruş.', focus: '60% 30%', to: 'urunler' },
          { image: I('aksesuar'), title: 'Aksesuarlar', text: 'Hikâyeyi tamamlayan detaylar.', to: 'urunler' },
        ],
      },
      {
        type: 'shop', layout: 'sidebar', id: 'urunler', tone: 'light', head: { title: ['Yeni', 'gelenler.'], italic: [1] },
        categories: ['Tümü', 'Kaban', 'Ceket', 'Triko', 'Gömlek', 'Bluz', 'Aksesuar'], sizes: ['XS', 'S', 'M', 'L', 'XL'], maxPrice: 10000,
        products: [
          { name: 'Oversize yün kaban', price: 4890, image: I('p1'), category: 'Kaban', colors: ['#2b1d16', '#d8c9b6', '#6e4b34'], sizes: ['S', 'M', 'L'], tag: 'Yeni' },
          { name: 'Yün blend ceket', price: 5490, image: I('p2'), category: 'Ceket', colors: ['#211a15', '#7d7468'], sizes: ['M', 'L', 'XL'], tag: 'Yeni' },
          { name: 'Ribana triko kazak', price: 2990, image: I('p3'), category: 'Triko', colors: ['#e6dccb', '#a08a72', '#2a221c'], sizes: ['XS', 'S', 'M'], tag: 'Sınırlı stok' },
          { name: 'Keten gömlek', price: 2490, image: I('p4'), category: 'Gömlek', colors: ['#3a2a20', '#d9cfc0'], sizes: ['M', 'L', 'XL'] },
          { name: 'Drapeli saten bluz', price: 3750, image: J('p2'), category: 'Bluz', colors: ['#ece6da', '#cfc4b1', '#2c221a'], sizes: ['XS', 'S', 'M'] },
          { name: 'Blazer ceket', price: 4950, image: J('p1'), category: 'Ceket', colors: ['#121212', '#57504a'], sizes: ['S', 'M', 'L'], tag: 'Yeni' },
          { name: 'Relaxed fit gömlek', price: 2950, image: J('p3'), category: 'Gömlek', colors: ['#101010', '#e9e4da'], sizes: ['M', 'L', 'XL'] },
          { name: 'Deri el çantası', price: 6950, image: J('acc'), category: 'Aksesuar', colors: ['#111111', '#4a2f22'], sizes: [] },
        ],
      },
      {
        type: 'split', id: 'detay', flip: true, tone: 'dark',
        media: { image: I('detail'), alt: 'Bir kadın modelin yakın çekim portresi', aspect: 'landscape', focus: '40% 50%' },
        content: {
          kicker: 'Detaylar', title: ['Küçük ayrıntılar,', 'büyük farklar.'], italic: [1],
          text: 'Kaliteli kumaşlar, zamansız kesimler ve uzun ömürlü tasarımlar.',
          list: [{ icon: 'gem', t: 'Zamansız tasarım', x: 'Sezonlar ötesi, her zaman senin' }, { icon: 'leaf', t: 'Kaliteli kumaşlar', x: 'Doğal ve sürdürülebilir malzemeler' }, { icon: 'shirt', t: 'Modern kesimler', x: 'Güncel trendlerle uyumlu' }, { icon: 'recycle', t: 'Uzun ömürlü ürünler', x: 'Daha az, daha iyi' }],
          cta: { label: 'Tasarım felsefemiz', to: 'journal' },
        },
      },
      {
        type: 'journal', layout: 'panel', id: 'journal', tone: 'dark', image: I('journal'),
        head: { kicker: 'Nüans Journal', title: ['Tarz bir yaşam', 'tarzıdır.'], italic: [1], text: 'Şehirden, dokulardan ve ilhamdan yazılar.', cta: { label: 'Yazıyı oku', to: 'journal' } },
        items: [
          { title: 'Minimalizmin gücü: az parçayla daha fazlası', date: '01 / 03', image: J('look') },
          { title: 'Kombini tamamlayan aksesuarlar', date: '02 / 03', image: J('acc') },
          { title: 'Şehir ritmi: gün boyu şık kalmanın yolları', date: '03 / 03', image: I('erkek') },
        ],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Zamansız, özgün ve sürdürülebilir moda. Bu sayfa örnek bir markaya aittir.', newsletter: 'Yeni koleksiyonlardan ilk sen haberdar ol.',
      links: [{ label: 'Koleksiyon', to: 'urunler' }, { label: 'Kadın', to: 'koleksiyon' }, { label: 'Erkek', to: 'koleksiyon' }, { label: 'Journal', to: 'journal' }],
      social: ['instagram', 'pinterest', 'youtube'], contact: ['Örnek Cd. No:5, Nişantaşı / İstanbul'],
    },
  },
};
