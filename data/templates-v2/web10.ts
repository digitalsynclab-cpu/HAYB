import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web10-${k}.webp`;

/** WEB 10: Hukuk bürosu (kurgusal marka: Kaya Hukuk Bürosu). */
export const web10: TemplateV2Def = {
  slug: 'web10',
  code: 'WEB 10',
  minimumPackage: 'business',
  brand: 'Kaya Hukuk Bürosu',
  sector: 'Hukuk bürosu',
  category: 'Hukuk',
  summary: 'Kurumsal, ağırbaşlı bir hukuk bürosu sitesi: editoryal başlıklar, seçilebilir uzmanlık alanları ve yayın günlüğü.',
  features: ['Uzmanlık alanı gezgini', 'Avukat profili', 'Hukuk günlüğü'],
  site: {
    theme: {
      bg: '#f2efe9', ink: '#15110f', accent: '#7c2a33', accentInk: '#f7f0e6', surface: '#e7e1d6', dark: '#17120f', darkInk: '#efe8dc',
      heading: 'cormorant', body: 'manrope', headingWeight: 500, headingTracking: '-0.015em', headingLeading: 1, radius: 'sharp',
    },
    logo: { text: 'KAYA', sub: 'Hukuk Bürosu', mark: 'bars' },
    header: {
      style: 'solid', tone: 'light',
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Uzmanlık Alanları', to: 'alanlar' }, { label: 'Ekibimiz', to: 'ekip' }, { label: 'Yayınlar', to: 'yayin' }, { label: 'İletişim', to: 'iletisim' }],
      cta: { label: 'Görüşme Planlayın', to: 'iletisim' },
    },
    blocks: [
      {
        type: 'hero', variant: 'split', id: 'ust', image: I('hero'), alt: 'Adliye sütunlarının önündeki basamakları çıkan avukat', focus: '40% 50%',
        kicker: 'Hukuk · Danışmanlık · Strateji', lines: ['Önemli olduğu', 'anda netlik.'], italic: [1],
        text: 'Bireyler ve kurumlar için karmaşık hukuki süreçlerde stratejik, güvenilir ve sonuç odaklı çözümler sunuyoruz.',
        primary: { label: 'Görüşme Planlayın', to: 'iletisim' }, secondary: { label: 'Uzmanlık Alanlarımız', to: 'alanlar' },
        metrics: [{ v: '12+', l: 'Yıllık deneyim' }, { v: '6', l: 'Çalışma alanı' }, { v: '3', l: 'Avukat' }], note: ['Hukukun', 'güvenilir', 'tarafı.'],
      },
      {
        type: 'showcase', layout: 'list', id: 'alanlar', tone: 'dark',
        head: { kicker: 'Uzmanlık alanlarımız', title: ['Deneyimle', 'şekillenen', 'çözümler.'], italic: [2] },
        items: [
          { title: 'Şirketler hukuku', image: I('j1'), text: 'Kuruluş, birleşme, devralma ve şirket yapılanmalarında hukuki destek.', cta: { label: 'Görüşme planlayın', to: 'iletisim' } },
          { title: 'Ceza hukuku', image: I('statue'), text: 'Soruşturma ve kovuşturma süreçlerinde savunma ve danışmanlık.', cta: { label: 'Görüşme planlayın', to: 'iletisim' } },
          { title: 'Aile hukuku', image: I('lawyer'), text: 'Boşanma, velayet ve mal rejimi süreçlerinde hassas ve dengeli temsil.', cta: { label: 'Görüşme planlayın', to: 'iletisim' }, focus: '50% 30%' },
          { title: 'İş ve sosyal güvenlik', image: I('j3'), text: 'İşçi ve işveren tarafı için sözleşme, tazminat ve uyuşmazlık çözümü.', cta: { label: 'Görüşme planlayın', to: 'iletisim' } },
          { title: 'Gayrimenkul hukuku', image: I('office'), text: 'Alım satım, kira ve mülkiyet süreçlerinde güvenli danışmanlık.', cta: { label: 'Görüşme planlayın', to: 'iletisim' } },
          { title: 'Miras hukuku', image: I('j2'), text: 'Miras paylaşımı, vasiyet ve tereke süreçlerinin planlı yönetimi.', cta: { label: 'Görüşme planlayın', to: 'iletisim' } },
        ],
      },
      {
        type: 'split', id: 'ekip', tone: 'light',
        media: { image: I('lawyer'), alt: 'Kurucu ortak avukat', aspect: 'portrait', focus: '50% 25%' },
        content: {
          kicker: 'Ekibimiz', title: ['Uzmanlık,', 'güven ve', 'sorumluluk.'], italic: [2],
          text: 'Alanında uzman avukatlarımız, müvekkillerimize en yüksek standartlarda hukuki hizmet sunar.',
          profiles: [{
            name: 'Av. Elif Kaya', role: 'Kurucu ortak', image: I('lawyer'), kpis: [{ v: '12+', l: 'Yıllık deneyim' }],
            text: 'Kurumsal hukuk, ticaret hukuku ve sözleşmeler alanında yerli ve yabancı müvekkillere stratejik danışmanlık sunar.',
            creds: [{ icon: 'landmark', t: 'Baro kayıtlı avukat' }, { icon: 'scale', t: 'Ticaret ve kurumsal hukuk' }, { icon: 'briefcase', t: 'Yerli ve yabancı müvekkiller' }],
            signature: 'Elif Kaya',
          }],
        },
      },
      {
        type: 'stats', id: 'rakamlar', tone: 'dark', quote: 'Güven, her davanın başlangıç noktasıdır.',
        items: [{ v: '12+', l: 'Yıllık deneyim' }, { v: '6', l: 'Çalışma alanı' }, { v: '3', l: 'Avukat' }, { v: '2', l: 'Dilde hizmet' }],
      },
      {
        type: 'journal', layout: 'cards', id: 'yayin', tone: 'light',
        head: { kicker: 'Hukuk günlüğü', title: ['Legal', 'Journal.'], italic: [1], text: 'Hukuki gelişmeleri, içgörüleri ve uzman bakış açılarını yazıyoruz.' },
        items: [
          { title: 'Sözleşme yazarken sık yapılan beş hata', date: '12 Eylül 2025', tag: 'Sözleşmeler', image: I('j2') },
          { title: 'Şirket kuruluşunda ilk hukuki adımlar', date: '5 Eylül 2025', tag: 'Ticaret hukuku', image: I('j1') },
          { title: 'Gayrimenkul alımında yapılması gereken kontroller', date: '28 Ağustos 2025', tag: 'Gayrimenkul', image: I('j3') },
        ],
      },
      {
        type: 'cta', layout: 'contact', id: 'iletisim', tone: 'dark', image: I('office'), kicker: 'İletişim',
        title: ['Sizin için doğru adımı', 'birlikte atalım.'], text: 'Hukuki sürecinizi değerlendirmek ve size özel çözümleri konuşmak için bizimle iletişime geçin.',
        typeLabel: 'Konu', projectTypes: ['Şirketler hukuku', 'Ceza hukuku', 'Aile hukuku', 'İş ve sosyal güvenlik', 'Gayrimenkul hukuku', 'Miras hukuku'],
        info: ['Örnek Mah. Örnek Sk. No:8', 'Osmangazi / Bursa', '+90 224 000 00 00', 'Pzt – Cum 09:00 – 18:00', 'info@kayahukuk.example'],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Hukuki süreçlerde stratejik ve güvenilir danışmanlık. Bu sayfa örnek bir büroya aittir.',
      links: [{ label: 'Uzmanlık alanları', to: 'alanlar' }, { label: 'Ekibimiz', to: 'ekip' }, { label: 'Yayınlar', to: 'yayin' }, { label: 'İletişim', to: 'iletisim' }],
      social: ['linkedin', 'x'], contact: ['Osmangazi / Bursa', '+90 224 000 00 00'],
    },
  },
};
