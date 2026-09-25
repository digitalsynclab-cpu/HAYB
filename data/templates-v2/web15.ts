import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web15-${k}.webp`;

/** WEB 15: Mimarlık stüdyosu (kurgusal marka: Mekân Stüdyo). */
export const web15: TemplateV2Def = {
  slug: 'web15',
  code: 'WEB 15',
  minimumPackage: 'business',
  brand: 'Mekân Stüdyo',
  sector: 'Mimarlık stüdyosu',
  category: 'İnşaat ve Mimarlık',
  summary: 'Müze ve yayın estetiğinde bir mimarlık stüdyosu: dev serif başlık, seçilebilir proje vitrini ve günlük bölümü.',
  features: ['Seçilebilir proje vitrini', 'Editoryal tipografi', 'Journal bölümü'],
  site: {
    theme: {
      bg: '#f3f0ea', ink: '#14120f', accent: '#14120f', accentInk: '#f3f0ea', surface: '#e8e3da', dark: '#100f0d', darkInk: '#efeae1',
      heading: 'cormorant', body: 'inter', headingWeight: 400, headingTracking: '-0.02em', headingLeading: 0.96, radius: 'sharp',
    },
    logo: { text: 'Mekân', sub: 'Mimarlık Stüdyosu', mark: 'square', letter: 'M' },
    header: {
      style: 'solid', tone: 'light', extras: ['search', 'lang'],
      links: [{ label: 'Anasayfa', to: 'ust' }, { label: 'Projeler', to: 'projeler' }, { label: 'Stüdyo', to: 'studyo' }, { label: 'Hizmetler', to: 'hizmet' }, { label: 'Journal', to: 'journal' }],
      cta: { label: 'Proje Görüşmesi', to: 'journal' },
    },
    blocks: [
      {
        type: 'hero', variant: 'poster', id: 'ust', tone: 'light', image: I('hero'), alt: 'Zeytin ağacı ve beton konut, gün batımı ışığı', focus: '45% 50%',
        kicker: 'Mimarlık · Doğa · İnsan', lines: ['Mekân, inşa', 'edilmeden', 'önce başlar.'], italic: [2],
        text: 'Mekân, sadece bir yapı değil, yaşanacak bir hikâyedir.',
        primary: { label: 'Seçili Projeleri Keşfet', to: 'projeler' }, note: ['Zamansız mekânlar.', 'Daha iyi yaşamlar.'],
      },
      {
        type: 'showcase', layout: 'projects', id: 'projeler', tone: 'light',
        head: { kicker: 'Seçili projeler', title: ['Seçili', 'işlerimiz.'], italic: [1] },
        items: [
          { title: 'Casa Lumière', image: I('casa'), text: 'Ege’nin ışığından ilham alan, doğayla bütünleşik bir yaşam alanı.', facts: [['Konum', 'Bodrum, Türkiye'], ['Yıl', '2024'], ['Alan', '420 m²'], ['Kategori', 'Konut'], ['Durum', 'Tamamlandı']], cta: { label: 'Projeyi İncele', to: 'journal' } },
          { title: 'Zeytin Evi', image: I('casa2'), text: 'Taş duvar ve zeytin ağacı arasında kurgulanan sakin bir avlu evi.', facts: [['Konum', 'Datça, Türkiye'], ['Yıl', '2023'], ['Alan', '180 m²'], ['Kategori', 'Konut'], ['Durum', 'Tamamlandı']], cta: { label: 'Projeyi İncele', to: 'journal' } },
          { title: 'Merdiven Evi', image: I('casa3'), text: 'Işığın basamaklarla dans ettiği, malzemenin öne çıktığı bir iç mekân çalışması.', facts: [['Konum', 'Bursa, Türkiye'], ['Yıl', '2025'], ['Alan', '260 m²'], ['Kategori', 'İç mekân'], ['Durum', 'Devam ediyor']], cta: { label: 'Projeyi İncele', to: 'journal' } },
        ],
      },
      {
        type: 'split', id: 'studyo', tone: 'dark',
        media: { image: I('studio'), alt: 'Stüdyoda maket ve çizimler üzerinde çalışan ekip', aspect: 'landscape', stack: [I('concrete')] },
        content: {
          kicker: 'Stüdyo', title: ['Mekânı anlamlı', 'kılan', 'detaylardır.'], italic: [2],
          text: 'Mimarlık, bizim için estetik, işlev ve doğa arasındaki dengeyi yeniden tanımlama sürecidir. Her projede, bulunduğu yere, insana ve zamana değer katan mekânlar üretiriz.',
          kpis: [{ v: '12+', l: 'Yıllık deneyim' }, { v: '50+', l: 'Tamamlanan proje' }, { v: '4', l: 'Uzman ekip' }],
          cta: { label: 'Stüdyomuz', to: 'journal' },
        },
      },
      {
        type: 'cards', layout: 'caption', id: 'hizmet', tone: 'light', cols: 4,
        head: { kicker: '01 — 04', title: ['Hizmetlerimiz'], text: 'Fikrin anahtara, tüm süreci bütüncül bir yaklaşımla ele alıyoruz.', cta: { label: 'Tüm hizmetler', to: 'journal' } },
        items: [
          { image: I('h1'), n: '01', title: 'Mimari tasarım', to: 'journal' },
          { image: I('h2'), n: '02', title: 'İç mekân tasarımı', to: 'journal' },
          { image: I('h3'), n: '03', title: 'Uygulama ve proje yönetimi', to: 'journal' },
          { image: I('h4'), n: '04', title: 'Danışmanlık', to: 'journal' },
        ],
      },
      {
        type: 'journal', layout: 'panel', id: 'journal', tone: 'dark', image: I('journal'),
        head: { kicker: 'Journal', title: ['Mimarlık,', 'yaşamın içinde.'], italic: [1], text: 'İlham veren yazılar, projeler ve fikirler.', cta: { label: 'Tüm yazılar', to: 'journal' } },
        items: [
          { title: 'Doğayla uyumlu mimarlık: geleceğin yaşam alanları', date: '12 Eylül 2025', image: I('casa2') },
          { title: 'Minimalizmin gücü: sade mekânlar, zengin yaşamlar', date: '5 Eylül 2025', image: I('h2') },
          { title: 'Malzemenin hikâyesi: taş, ahşap, ışık', date: '28 Ağustos 2025', image: I('h3') },
        ],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Doğa, insan ve zaman için mekânlar. Bu sayfa örnek bir stüdyoya aittir.',
      quote: 'Daha iyi mekânlar, daha iyi insanlar.',
      links: [{ label: 'Projeler', to: 'projeler' }, { label: 'Stüdyo', to: 'studyo' }, { label: 'Hizmetler', to: 'hizmet' }, { label: 'Journal', to: 'journal' }],
      social: ['instagram', 'linkedin'], contact: ['Örnek Sk. No:3, Bodrum / Muğla', 'studyo@mekan.example'],
    },
  },
};
