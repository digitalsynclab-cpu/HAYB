import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web9-${k}.webp`;

/** WEB 09: Diş kliniği (kurgusal marka: Ada Diş Kliniği). */
export const web09: TemplateV2Def = {
  slug: 'web9',
  code: 'WEB 09',
  minimumPackage: 'business',
  brand: 'Ada Diş Kliniği',
  sector: 'Diş kliniği',
  category: 'Sağlık',
  summary: 'Sakin, ferah ve güven veren bir diş kliniği sitesi: kemer çerçeveli hero, tedavi kartları ve adım adım randevu formu.',
  features: ['Adım adım randevu formu', 'Hekim profili', 'Kemer çerçeveli görsel'],
  site: {
    theme: {
      bg: '#f6f4ee', ink: '#1d2a25', accent: '#2f4d43', accentInk: '#f6f4ee', surface: '#e6ebe1', dark: '#21352d', darkInk: '#f1f0e8',
      heading: 'instrument', body: 'manrope', headingWeight: 400, headingTracking: '-0.02em', headingLeading: 1.02, radius: 'pill',
    },
    logo: { text: 'Ada', sub: 'Diş Kliniği', mark: 'ring', letter: 'A' },
    header: {
      style: 'solid', tone: 'light', phone: '+90 224 000 00 00',
      links: [{ label: 'Anasayfa', to: 'ust' }, { label: 'Tedaviler', to: 'tedavi' }, { label: 'Ekibimiz', to: 'ekip' }, { label: 'Klinik', to: 'klinik' }, { label: 'İletişim', to: 'randevu' }],
      cta: { label: 'Randevu Al', to: 'randevu' },
    },
    blocks: [
      {
        type: 'hero', variant: 'arch', id: 'ust', image: I('hero'), alt: 'Gülümseyen bir hastanın dişleri ve muayene aynası', focus: '45% 45%',
        kicker: 'Diş hekimliği, yeniden düşünüldü', lines: ['Sizin etrafınızda', 'kurulan modern', 'diş hekimliği.'], italic: [1],
        text: 'Daha sağlıklı gülüşler ve daha özgüvenli yarınlar için dijital planlama, rahat bir yaklaşım ve net bir tedavi planı.',
        primary: { label: 'Randevu Al', to: 'randevu' }, secondary: { label: 'Tedavileri Keşfet', to: 'tedavi' },
        badge: { title: 'Bugün', text: 'Öğleden sonra 3 boş randevu saati var (örnek).' }, note: ['Estetik', 'Sağlık', 'Özgüven'],
      },
      {
        type: 'strip', layout: 'numbered', id: 'yol', tone: 'light',
        items: [
          { icon: 'calendar', n: '01', title: 'Muayene ve tanı', text: 'İhtiyaçlarınız için ayrıntılı muayene ve dijital analiz.' },
          { icon: 'stethoscope', n: '02', title: 'Tedavi planı', text: 'Size özel, net ve şeffaf bir tedavi planı.' },
          { icon: 'sparkles', n: '03', title: 'Daha sağlıklı gülüş', text: 'Modern tekniklerle kalıcı sonuçlar.' },
        ],
      },
      {
        type: 'cards', layout: 'overlay', id: 'tedavi', tone: 'light', cols: 3,
        head: { kicker: 'Tedavilerimiz', title: ['Gülüşünüz için', 'kapsamlı çözümler.'], italic: [1], text: 'Estetik ve fonksiyonelliği bir araya getiren modern tedavi yöntemleriyle her zaman yanınızdayız.', cta: { label: 'Tüm tedavileri gör', to: 'randevu' } },
        items: [
          { image: I('implant'), title: 'İmplant tedavisi', text: 'Doğal ve kalıcı çözümlerle kayıp dişlerinizi geri kazanın.', n: '01', to: 'randevu', focus: '50% 40%' },
          { image: I('hero'), title: 'Estetik diş hekimliği', text: 'Daha beyaz, daha estetik gülüşler için.', n: '02', to: 'randevu', focus: '30% 60%' },
          { image: I('aligner'), title: 'Ortodonti', text: 'Daha düzgün dişler, daha sağlıklı bir gelecek.', n: '03', to: 'randevu' },
        ],
      },
      {
        type: 'split', id: 'ekip', tone: 'soft',
        media: { image: I('doctor'), alt: 'Estetik diş hekimi', aspect: 'portrait', focus: '60% 30%', badge: { v: '12+', l: 'yıllık deneyim' } },
        content: {
          kicker: 'Uzman kadromuz', title: ['Deneyim,', 'teknoloji ve', 'insan odaklı bakım.'], italic: [2],
          text: 'Alanında uzman hekimlerimiz, modern teknolojilerle size en iyi tedavi deneyimini sunar.',
          profiles: [{
            name: 'Dt. Ayşe Demir', role: 'Estetik diş hekimliği uzmanı', image: I('doctor'),
            text: 'Estetik ve fonksiyonel çözümlerle hastalarımızın yaşam kalitesini artırmayı hedefliyoruz.',
            creds: [{ icon: 'landmark', t: 'Diş hekimliği fakültesi mezunu' }, { icon: 'shield', t: 'Meslek odası üyesi' }, { icon: 'sparkles', t: 'Şeffaf plak sertifikalı' }],
            signature: 'Ayşe Demir',
          }],
          cta: { label: 'Ekibimizi tanıyın', to: 'randevu' },
        },
      },
      {
        type: 'split', id: 'klinik', flip: true, tone: 'light',
        media: { image: I('clinic'), alt: 'Kliniğin resepsiyon alanı', aspect: 'landscape', play: 'Kliniğimizi keşfedin · 1:24' },
        content: {
          kicker: 'Neden Ada?', title: ['Kendinizi', 'güvende hissedin.'], italic: [1],
          text: 'Modern altyapımız, hijyenik ortamımız ve hasta odaklı yaklaşımımızla her zaman yanınızdayız.',
          kpis: [{ v: '12+', l: 'Yıllık deneyim' }, { v: '6', l: 'Tedavi alanı' }, { v: '3', l: 'Uzman hekim' }],
        },
      },
      {
        type: 'booking', layout: 'stepper', id: 'randevu', tone: 'soft', kicker: 'Randevu', title: 'Ziyaretinizi planlayın.',
        text: 'Kısa bir form ile randevu talebinizi oluşturun, sizi kısa sürede arayalım.',
        fields: [],
        steps: [
          { label: 'Randevu', fields: [
            { id: 'tedavi', label: 'Tedavi türü', kind: 'select', options: ['İmplant', 'Estetik diş hekimliği', 'Ortodonti', 'Zirkonyum', 'Diş beyazlatma', 'Çocuk diş hekimliği', 'Muayene'] },
            { id: 'hekim', label: 'Hekim', kind: 'select', options: ['Dt. Ayşe Demir', 'Fark etmez'] },
          ] },
          { label: 'Tarih ve saat', fields: [
            { id: 'tarih', label: 'Tercih edilen tarih', kind: 'date' },
            { id: 'saat', label: 'Tercih edilen saat', kind: 'select', options: ['09:30', '11:00', '13:30', '15:00', '16:30'] },
          ] },
          { label: 'Bilgileriniz', fields: [
            { id: 'ad', label: 'Ad soyad', kind: 'text', placeholder: 'Adınız' },
            { id: 'tel', label: 'Telefon', kind: 'text', placeholder: '05xx xxx xx xx' },
          ] },
        ],
        submit: 'Randevu talebini gönder',
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Rahat, şeffaf ve modern diş hekimliği. Bu sayfa örnek bir kliniğe aittir.',
      links: [{ label: 'Tedaviler', to: 'tedavi' }, { label: 'Ekibimiz', to: 'ekip' }, { label: 'Klinik', to: 'klinik' }, { label: 'Randevu', to: 'randevu' }],
      social: ['instagram', 'facebook'], contact: ['Örnek Mah. Örnek Sk. No:1, Nilüfer / Bursa', '+90 224 000 00 00', 'Hafta içi 09:00 – 19:00'],
    },
  },
};
