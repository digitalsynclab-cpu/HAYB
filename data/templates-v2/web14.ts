import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web14-${k}.webp`;

/** WEB 14: İnşaat ve yapı (kurgusal marka: Kuzey Yapı). */
export const web14: TemplateV2Def = {
  slug: 'web14',
  code: 'WEB 14',
  minimumPackage: 'business',
  brand: 'Kuzey Yapı',
  sector: 'İnşaat ve yapı',
  category: 'İnşaat ve Mimarlık',
  summary: 'Mimari özgüven taşıyan bir inşaat sitesi: proje künyeli seçilebilir vitrin, sayılar bandı ve teklif formu.',
  features: ['Proje künyeli vitrin', 'Sayaçlı rakam bandı', 'Teklif formu'],
  site: {
    theme: {
      bg: '#f0eee9', ink: '#121212', accent: '#c65a2e', accentInk: '#ffffff', surface: '#e6e3dc', dark: '#0f0f0f', darkInk: '#f3f1ec',
      heading: 'manrope', body: 'manrope', headingWeight: 300, headingTracking: '-0.035em', headingCase: 'uppercase', headingLeading: 0.98, radius: 'sharp',
    },
    logo: { text: 'KUZEY', sub: 'Mimarlık · İnşaat', mark: 'square', letter: 'K' },
    header: {
      style: 'overlay', tone: 'dark',
      links: [{ label: 'Anasayfa', to: 'ust' }, { label: 'Projeler', to: 'projeler' }, { label: 'Hizmetler', to: 'hizmet' }, { label: 'Hakkımızda', to: 'neden' }, { label: 'İletişim', to: 'iletisim' }],
      cta: { label: 'Teklif Al', to: 'iletisim' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Deniz manzaralı, taş ve camdan modern villa', focus: '50% 50%',
        kicker: 'Bursa · Mimarlık · Mühendislik · İnşaat', lines: ['Kalıcı olanı', 'inşa ediyoruz.'], accent: [1],
        text: 'Yaşam alanları, iş dünyası ve gelecek nesiller için kalıcı yapılar inşa ediyoruz.',
        primary: { label: 'Projelerimizi Keşfet', to: 'projeler' }, secondary: { label: 'Tanıtım Filmini İzle', play: true },
        note: ['Mimarlık', 'Mühendislik', 'İnşaat', 'Daha fazlası'],
      },
      {
        type: 'strip', layout: 'icons', id: 'tur', tone: 'light',
        items: [
          { icon: 'home', title: 'Konut projeleri' }, { icon: 'briefcase', title: 'Ticari yapılar' },
          { icon: 'factory', title: 'Endüstriyel tesisler' }, { icon: 'route', title: 'Altyapı projeleri' },
        ],
      },
      {
        type: 'showcase', layout: 'projects', id: 'projeler', tone: 'dark',
        head: { kicker: 'Seçili projeler', title: ['Projelerimiz'] },
        items: [
          { title: 'Nova İş Merkezi', image: I('nova'), text: 'İş dünyasının yeni merkezi. Modern mimarisi ve sürdürülebilir yapısıyla geleceğe değer katan bir iş kompleksi.', facts: [['Konum', 'Bursa, Türkiye'], ['Yıl', '2024'], ['Alan', '42.000 m²'], ['Durum', 'Tamamlandı']], cta: { label: 'Projeyi İncele', to: 'iletisim' } },
          { title: 'Lima Konutları', image: I('s2'), text: 'Betonarme taşıyıcı sistemiyle yükselen, geniş balkonlu modern konut projesi.', facts: [['Konum', 'Nilüfer, Bursa'], ['Yıl', '2025'], ['Alan', '18.500 m²'], ['Durum', 'Devam ediyor']], cta: { label: 'Projeyi İncele', to: 'iletisim' } },
          { title: 'Yeşil Vadi Konutları', image: I('s4'), text: 'Teraslı, yeşille iç içe yaşam alanları. Doğaya saygılı, enerji verimli tasarım.', facts: [['Konum', 'Mudanya, Bursa'], ['Yıl', '2023'], ['Alan', '24.000 m²'], ['Durum', 'Tamamlandı']], cta: { label: 'Projeyi İncele', to: 'iletisim' } },
          { title: 'Kıyı Villası', image: I('hero'), text: 'Deniz manzaralı, taş ve camla kurgulanmış özel konut. Mekân ve doğa arasında kesintisiz bağ.', facts: [['Konum', 'Bodrum, Muğla'], ['Yıl', '2024'], ['Alan', '620 m²'], ['Durum', 'Tamamlandı']], cta: { label: 'Projeyi İncele', to: 'iletisim' } },
        ],
      },
      {
        type: 'stats', id: 'neden', tone: 'dark', image: I('concrete'), kicker: 'Neden Kuzey Yapı?', title: ['Kalite,', 'güven ve', 'sürdürülebilirlik.'],
        items: [{ v: '25+', l: 'Yıllık deneyim' }, { v: '100+', l: 'Tamamlanan proje' }, { v: '4', l: 'Uzman disiplin' }, { v: '1', l: 'Çatı altında tüm süreç' }],
      },
      {
        type: 'cards', layout: 'caption', id: 'hizmet', tone: 'light', cols: 4,
        head: { kicker: 'Hizmetlerimiz', title: ['Fikirden', 'gerçeğe.'], italic: [1], text: 'Tüm süreçlerde yanınızdayız; baştan sona entegre çözümler sunuyoruz.', cta: { label: 'Tüm hizmetler', to: 'iletisim' } },
        items: [
          { image: I('s1'), n: '01', title: 'Mimari tasarım', text: 'Estetik ve işlevselliği bir araya getiriyoruz.', to: 'iletisim' },
          { image: I('s2'), n: '02', title: 'İnşaat ve uygulama', text: 'Kaliteli, zamanında ve güvenli yapılar.', to: 'iletisim' },
          { image: I('s3'), n: '03', title: 'İç mekân çözümleri', text: 'Yaşam alanlarınıza değer katıyoruz.', to: 'iletisim' },
          { image: I('s4'), n: '04', title: 'Kentsel dönüşüm', text: 'Daha yaşanabilir yarınlar için.', to: 'iletisim' },
        ],
      },
      {
        type: 'cta', layout: 'contact', id: 'iletisim', tone: 'dark', image: I('concrete'), kicker: 'Birlikte inşa edelim', title: ['Yeni projeler', 'için görüşelim.'],
        text: 'İhtiyacınızı dinleyelim, size özel çözümlerle değer katan yapılar için birlikte çalışalım.',
        typeLabel: 'Proje türü', projectTypes: ['Konut', 'Ticari', 'Endüstriyel', 'Altyapı', 'Kentsel dönüşüm'],
        info: ['Örnek Mah. Örnek Cd. No:12', 'Nilüfer / Bursa', '+90 224 000 00 00', 'info@kuzeyyapi.example'],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Mimarlık, mühendislik ve inşaat. Bu sayfa örnek bir firmaya aittir.',
      links: [{ label: 'Projeler', to: 'projeler' }, { label: 'Hizmetler', to: 'hizmet' }, { label: 'Hakkımızda', to: 'neden' }, { label: 'İletişim', to: 'iletisim' }],
      social: ['instagram', 'linkedin', 'youtube'], contact: ['Nilüfer / Bursa', '+90 224 000 00 00'],
    },
  },
};
