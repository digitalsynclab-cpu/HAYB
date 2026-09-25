import type { TemplateV2Def } from '@/data/template-types';

const I = (k: string) => `/images/templates/web12-${k}.webp`;

/** WEB 12: Otomotiv servisi (kurgusal marka: Torque Otomotiv Servisi). */
export const web12: TemplateV2Def = {
  slug: 'web12',
  code: 'WEB 12',
  minimumPackage: 'professional',
  brand: 'Torque Otomotiv',
  sector: 'Otomotiv servisi',
  category: 'Otomotiv',
  summary: 'Performans mühendisliği havasında bir servis sitesi: araç seçerek servis öneren akıllı randevu ve etkileşimli hizmet kartları.',
  features: ['Marka-model-servis seçici', 'Etkileşimli hizmet kartları', 'Kayan yazı bandı'],
  site: {
    theme: {
      bg: '#0f0f0f', ink: '#efefef', accent: '#c8ff2e', accentInk: '#0c0c0c', surface: '#171717', dark: '#0a0a0a', darkInk: '#f4f4f4',
      heading: 'archivo', body: 'archivo', headingWeight: 800, headingTracking: '-0.035em', headingCase: 'uppercase', headingLeading: 0.94, radius: 'soft',
    },
    logo: { text: 'TORQUE', sub: 'Otomotiv Servisi', mark: 'slash' },
    header: {
      style: 'overlay', tone: 'dark', extras: ['search'],
      links: [{ label: 'Ana Sayfa', to: 'ust' }, { label: 'Hizmetler', to: 'hizmet' }, { label: 'Neden Torque', to: 'neden' }, { label: 'Teknoloji', to: 'teknoloji' }, { label: 'İletişim', to: 'iletisim' }],
      cta: { label: 'Servis Randevusu', to: 'randevu' },
    },
    blocks: [
      {
        type: 'hero', variant: 'full', id: 'ust', tone: 'dark', image: I('hero'), alt: 'Servis liftinde yükseltilmiş koyu renk spor sedan', focus: '62% 55%',
        kicker: 'Performans · Güven · Uzmanlık', lines: ['Aracınız', 'daima', 'hazır.'], accent: [2],
        text: 'Uzman ekibimiz ve ileri tanı teknolojilerimizle aracınız için en doğru servis deneyimi.',
        primary: { label: 'Servis Randevusu Al', to: 'randevu' }, secondary: { label: 'Hizmetleri Keşfet', to: 'hizmet' },
        metrics: [{ v: '10+', l: 'Yıllık deneyim' }, { v: '5', l: 'Servis alanı' }, { v: '6', l: 'Teşhis istasyonu' }],
      },
      { type: 'marquee', id: 'bant', tone: 'dark', words: ['Tanı', 'Mekanik', 'Elektrik', 'Performans', 'Klima', 'Lastik'] },
      {
        type: 'booking', layout: 'car', id: 'randevu', tone: 'dark', kicker: 'Aracınız için servis', title: 'Hızlı servis randevusu',
        text: 'Aracınızı seçin, ihtiyaç duyduğunuz servisleri görüntüleyin.', submit: 'Uygun Servisleri Göster',
        fields: [
          { id: 'brand', label: 'Marka', kind: 'select', options: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Renault'] },
          { id: 'model', label: 'Model', kind: 'select', options: [] },
          { id: 'year', label: 'Yıl', kind: 'select', options: ['2024', '2023', '2022', '2021', '2020', '2019 ve öncesi'], value: '2022' },
          { id: 'service', label: 'Servis türü', kind: 'select', options: ['Periyodik bakım', 'Yağ değişimi', 'Fren servisi', 'Arıza tespit', 'Klima bakımı', 'Lastik servisi'], value: 'Periyodik bakım' },
        ],
        car: {
          image: I('car'),
          models: {
            BMW: ['1 Serisi', '3 Serisi', '5 Serisi', 'X3'], 'Mercedes-Benz': ['A Serisi', 'C Serisi', 'E Serisi', 'GLC'],
            Audi: ['A3', 'A4', 'A6', 'Q5'], Volkswagen: ['Golf', 'Passat', 'Tiguan'], Renault: ['Clio', 'Megane', 'Austral'],
          },
          results: {
            'Periyodik bakım': ['Yağ ve filtre değişimi', 'Genel kontrol', 'Sıvı seviyeleri', 'Bakım raporu'],
            'Yağ değişimi': ['Motor yağı', 'Yağ filtresi', 'Sızıntı kontrolü'],
            'Fren servisi': ['Balata kontrolü', 'Disk ölçümü', 'Fren hidroliği'],
            'Arıza tespit': ['Bilgisayarlı tanı', 'Hata kodu okuma', 'Test sürüşü'],
            'Klima bakımı': ['Gaz kontrolü', 'Polen filtresi', 'Dezenfeksiyon'],
            'Lastik servisi': ['Rot balans', 'Lastik değişimi', 'Basınç ayarı'],
          },
        },
      },
      {
        type: 'cards', layout: 'feature', id: 'hizmet', tone: 'dark',
        items: [
          { image: '', icon: 'activity', n: '01', title: 'Tanı ve diagnostik', text: 'İleri teknoloji cihazlarla aracınızdaki sorunları hızlı ve doğru şekilde tespit ederiz.', to: 'randevu' },
          { image: '', icon: 'wrench', n: '02', title: 'Mekanik servis', text: 'Motor, şanzıman, fren ve süspansiyon sistemlerinde güvenilir çözümler.', to: 'randevu' },
          { image: '', icon: 'zap', n: '03', title: 'Elektrik ve elektronik', text: 'Elektronik sistemlerde uzman ekip ve orijinal ekipman desteği.', to: 'randevu' },
          { image: '', icon: 'gauge', n: '04', title: 'Performans yükseltme', text: 'Daha güçlü, daha verimli ve daha keyifli bir sürüş deneyimi.', to: 'randevu' },
          { image: '', icon: 'snowflake', n: '05', title: 'Klima ve iklimlendirme', text: 'Dört mevsim konfor için klima bakım ve onarım hizmetleri.', to: 'randevu' },
        ],
      },
      {
        type: 'split', id: 'neden', tone: 'dark',
        media: { image: I('mechanic'), alt: 'Kaputu açık araçta çalışan teknisyen', aspect: 'landscape', stack: [I('brake'), I('oil'), I('balance')] },
        content: {
          kicker: 'Neden Torque?', title: ['Her detayda', 'uzmanlık.'],
          text: 'Modern ekipmanlarımız, sertifikalı teknisyenlerimiz ve müşteri odaklı hizmet anlayışımızla aracınızı güvenle bize emanet edin.',
          list: [{ icon: 'shield', t: 'Orijinal ekipman', x: 'Üretici onaylı parçalar' }, { icon: 'zap', t: 'Modern tanı cihazları', x: 'Hızlı ve doğru teşhis' }, { icon: 'award', t: 'Sertifikalı teknisyenler', x: 'Sürekli eğitim' }],
          cta: { label: 'Hakkımızda', to: 'iletisim' },
        },
      },
      {
        type: 'stats', id: 'teknoloji', tone: 'dark', image: I('wheel'), kicker: 'Rakamlarla Torque', title: ['Performans', 'detaylarda.'],
        items: [{ v: '10+', l: 'Yıllık deneyim' }, { v: '5', l: 'Servis alanı' }, { v: '6', l: 'Teşhis istasyonu' }, { v: '1', l: 'Çatı altında tüm servis' }],
      },
      {
        type: 'cta', layout: 'features', id: 'iletisim', tone: 'dark', image: I('wheel'), kicker: 'Randevu', title: ['Aracınız', 'emin ellerde.'],
        text: 'Kolay ve hızlı randevu sistemi ile servis planınızı oluşturun. Sürüş keyfiniz bizde güvende.', primary: { label: 'Servis Randevusu Al', to: 'randevu' },
        features: [
          { icon: 'calendar', t: 'Online randevu', x: 'Hızlı ve kolay işlem' }, { icon: 'users', t: 'Uzman ekip', x: 'Sertifikalı teknisyenler' },
          { icon: 'shield', t: 'Orijinal parça', x: 'Güvenilir ve kaliteli' }, { icon: 'file', t: 'Şeffaf fiyatlandırma', x: 'Sürpriz ücret yok' },
        ],
      },
    ],
    footer: {
      tone: 'dark', blurb: 'Performans ve güven odaklı servis. Bu sayfa örnek bir servise aittir.',
      links: [{ label: 'Hizmetler', to: 'hizmet' }, { label: 'Neden Torque', to: 'neden' }, { label: 'Randevu', to: 'randevu' }],
      social: ['instagram', 'youtube'], contact: ['Örnek Sanayi Sitesi No:12, Nilüfer / Bursa', '+90 224 000 00 00', 'Pzt – Cmt 08:30 – 18:30'],
    },
  },
};
