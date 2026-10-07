import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { CTASection } from '@/components/sections/CTASection';
import { PackagesHub, type PackageTab, type PackageCard } from '@/components/pricing/PackagesHub';
import { CampaignPopup } from '@/components/layout/CampaignPopup';
import { HomeFaq } from '@/components/sections/HomeV2';
import {
  webPackages,
  webPricingRows,
  pricingPlans,
  ecommercePackages,
  ecommerceRows,
  ecommercePlans,
  socialMediaPlans,
  qrMenuPlans,
  specialProjectFeatures,
  mobileAppFeatures,
  logoPlan,
  adsTerms,
  adsRows,
  adsPlan,
  dataServicePlans,
  dataServiceAddons,
} from '@/data/pricing';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Paketler: Web Sitesi, E-Ticaret, Sosyal Medya, QR Menü',
  description:
    'Web sitesi paketleri 5.000 ₺’den, e-ticaret paketleri 39.990 ₺’den, QR menü 2.500 ₺’den, sosyal medya paketleri haftalık 3.000 ₺’den başlar. Özel yazılım ve mobil uygulama için teklif alın.',
  path: '/paketler',
});

type Cell = string | boolean;
const cellOf = (row: object, id: string) => (row as Record<string, Cell>)[id];

const webCards: PackageCard[] = webPackages.map((pkg) => {
  const plan = pricingPlans.find((p) => p.id === pkg.id)!;
  return {
    plan,
    title: pkg.name.charAt(0) + pkg.name.slice(1).toLowerCase(),
    rows: webPricingRows.map((r) => ({ label: r.label, value: cellOf(r, pkg.id) })),
    example: { href: '/template', label: 'Örnek siteleri gör' },
  };
});

const ecoCards: PackageCard[] = ecommercePackages.map((pkg) => {
  const plan = ecommercePlans.find((p) => p.id === pkg.id)!;
  return {
    plan,
    blurb: pkg.blurb,
    rows: ecommerceRows.map((r) => ({ label: r.label, value: r[pkg.key] })),
    gift: pkg.key === 'elite' ? 'Hediye: Sektöre Özel Satış Odaklı Yazılım Programı' : undefined,
  };
});

const adsCards: PackageCard[] = adsTerms.map((t, i) => {
  const plan = adsPlan(i);
  return {
    plan,
    title: `${t.months} Ay · ${t.name}`,
    blurb: t.blurb,
    rows: adsRows.map((r) => ({ label: r.label, value: r.values[i] })),
    example: { href: '/hizmetler/reklam-yonetimi', label: 'Reklam hizmetini incele' },
  };
});

const tabs: PackageTab[] = [
  {
    id: 'web',
    label: 'Web Sitesi',
    category: 'Web Sitesi',
    intro: 'Tüm paketlerde SSL, mobil ve tablet uyumu, hız optimizasyonu, WhatsApp entegrasyonu ve KVKK bildirimi bulunur.',
    cards: webCards,
    compare: {
      title: 'Web paketlerini karşılaştırın',
      columns: webPackages.map((p) => p.name.charAt(0) + p.name.slice(1).toLowerCase()),
      rows: webPricingRows.map((r) => ({ label: r.label, values: webPackages.map((p) => cellOf(r, p.id)) })),
    },
  },
  {
    id: 'eticaret',
    label: 'E-Ticaret',
    category: 'E-Ticaret',
    intro: 'Ürünlerinizi yükleyin, iyzico veya PayTR ile ödeme alın, siparişi ve stoğu tek panelden yönetin. Alan adı, hosting ve ürün sayısı pakete göre büyür.',
    cards: ecoCards,
    compare: {
      title: 'E-ticaret paketlerini karşılaştırın',
      columns: ecommercePackages.map((p) => p.label),
      rows: ecommerceRows.map((r) => ({ label: r.label, values: ecommercePackages.map((p) => r[p.key]) })),
    },
    notes: ['Sanal POS onayı ödeme kuruluşunun (iyzico, PayTR) değerlendirmesine bağlıdır; entegrasyon ve kurulumu biz yaparız.', 'Kargo, e-fatura ve pazaryeri gibi ek entegrasyonlar paket kapsamında değildir; ihtiyacınız olursa ayrıca teklif hazırlarız.'],
  },
  {
    id: 'sosyal-medya',
    label: 'Sosyal Medya',
    category: 'Sosyal Medya',
    intro: 'Post ve story tasarımları; marka kimliğinize uygun ve düzenli.',
    cards: socialMediaPlans.map((plan) => ({ plan, rows: plan.features.map((f) => ({ label: f, value: true })), example: { href: '/hizmetler/sosyal-medya', label: 'Örnek tasarımları gör' } })),
  },
  {
    id: 'qr-menu',
    label: 'QR Menü',
    category: 'QR Menü',
    intro: 'Restoran ve kafeler için anlık güncellenen, mobil uyumlu dijital menü.',
    cards: qrMenuPlans.map((plan) => ({ plan, rows: plan.features.map((f) => ({ label: f, value: true })), example: { href: '/projeler/qrmenu', label: 'Örnek QR menüyü gör' } })),
  },
  {
    id: 'logo',
    label: 'Logo',
    category: 'Logo Tasarımı',
    intro: 'Uygulama ikonu gibi şeffaf köşeli, her yerde net görünen logolar.',
    cards: [{ plan: logoPlan, rows: logoPlan.features.map((f) => ({ label: f, value: true })), example: { href: '/hizmetler/marka-tasarimi', label: 'Örnek logoları gör' } }],
  },
  {
    id: 'reklam',
    label: 'Reklam',
    aliases: ['reklam-yonetimi'],
    category: 'Reklam Yönetimi',
    intro: 'İşletmenize en uygun platformlarda reklam kurulumu ve yönetimi. Fiyatlar aylıktır; 6 ve 12 aylık paketlerde Google Ads hediyedir.',
    cards: adsCards,
    notes: ['Reklam bütçesi fiyatlara dahil değildir. Reklam bütçenizi doğrudan kendi Google veya Meta hesabınızdan ödersiniz; HAYB yalnızca yönetim hizmetini faturalandırır.'],
  },
  {
    id: 'diger',
    label: 'Diğer',
    aliases: ['data-service', 'ozel-proje'],
    category: 'Veri Ürünü',
    intro: 'HAYB Data Service: müşteri bulma, site analizi ve satış takibi tek programda. 1 aylık lisanstan başlar; tek seferde yüklü ödeme gerekmez. Özel yazılım ve mobil uygulama için kapsamınıza göre teklif hazırlıyoruz.',
    cards: [...dataServicePlans, ...dataServiceAddons].map((plan) => ({ plan, rows: plan.features.map((f) => ({ label: f, value: true })), example: { href: '/hizmetler/hayb-data-service', label: 'Ürünü incele' } })),
    notes: ['Data Service paketleri Windows programı olarak ve tarayıcıdan kullanılabilir. Satın alma sonrası hesabınız aynı gün tanımlanır; giriş bilgileriniz e-postanıza gönderilir.'],
    custom: [
      { title: 'Özel proje kapsamı', text: 'Fiyat, projenin kapsamına göre belirlenir. Ücretsiz keşif görüşmesiyle başlayalım.', features: specialProjectFeatures },
      { title: 'Mobil uygulama kapsamı', text: 'iOS ve Android uygulamaları için tasarım, geliştirme ve yayın.', features: mobileAppFeatures.flatMap((g) => g.items.slice(0, 2)) },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <CampaignPopup />
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Paketler', path: '/paketler' }]} />
      <PageHero
        title="Net paketler,"
        accent="sürpriz yok."
        text="Fiyatlar ve kapsam baştan bellidir. Kategoriyi seçin, size uygun paketi sepete ekleyin ya da özel bir ihtiyaç için teklif isteyin."
      />
      <Section tone="dark" labelledBy="paket-vitrini" className="!pt-6">
        <h2 id="paket-vitrini" className="sr-only">
          Paket kategorileri
        </h2>
        <PackagesHub tabs={tabs} />
      </Section>
      <HomeFaq />
      <CTASection tone="dark-2" title="Size uygun paketi" accent="birlikte seçelim." text="Hangi paketin işinize uygun olduğundan emin değil misiniz? Kısaca anlatın, önerelim." />
    </>
  );
}
