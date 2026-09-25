import Link from 'next/link';
import { ArrowRight, Check, Gift, Minus } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { AddToCartButton } from '@/components/pricing/AddToCartButton';
import { PlanDetails } from '@/components/pricing/PlanDetails';
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
  adsTotalLabel,
  dataServicePlan,
} from '@/data/pricing';
import type { PricingPlan } from '@/types';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';
import { whatsappUrl } from '@/data/site';

export const metadata = buildMetadata({
  title: 'Paketler: Web Sitesi, E-Ticaret, Sosyal Medya, QR Menü',
  description:
    'Web sitesi paketleri 5.000 ₺’den, e-ticaret paketleri 39.990 ₺’den, QR menü 2.500 ₺’den, sosyal medya paketleri haftalık 3.000 ₺’den başlar. Özel yazılım ve mobil uygulama için teklif alın.',
  path: '/paketler',
});

const anchors = [
  { href: '#web', label: 'Web Sitesi' },
  { href: '#eticaret', label: 'E-Ticaret' },
  { href: '#sosyal-medya', label: 'Sosyal Medya' },
  { href: '#qr-menu', label: 'QR Menü' },
  { href: '#logo', label: 'Logo Tasarımı' },
  { href: '#reklam', label: 'Google & Meta Reklamları' },
  { href: '#data-service', label: 'HAYB Data Service' },
  { href: '#ozel-proje', label: 'Özel Proje ve Mobil' },
];

const cellOf = (row: (typeof webPricingRows)[number], id: string) => (row as unknown as Record<string, string | boolean>)[id];

function Yes() {
  return (
    <>
      <Check aria-hidden className="mx-auto h-5 w-5 text-lime-deep" style={{ color: 'rgb(var(--hayb-lime-deep))' }} />
      <span className="sr-only">Var</span>
    </>
  );
}
function No() {
  return (
    <>
      <Minus aria-hidden className="mx-auto h-5 w-5 text-on-light-muted/50" />
      <span className="sr-only">Yok</span>
    </>
  );
}

function ExampleLink({ href, label, tone = 'light' }: { href: string; label: string; tone?: 'light' | 'lime' }) {
  return (
    <Link
      href={href}
      className={`press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-semibold underline-offset-4 hover:underline ${tone === 'lime' ? 'text-ink-950' : 'text-on-light'}`}
    >
      {label} <ArrowRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}

function PlanCard({ plan, category, variant = 'light', example }: { plan: PricingPlan; category: string; variant?: 'light' | 'lime'; example?: { href: string; label: string } }) {
  const lime = variant === 'lime';
  return (
    <article data-spot className={`flex h-full flex-col rounded-card p-6 ${lime ? 'bg-lime text-ink-950 shadow-[0_10px_40px_rgb(0_0_0/0.35)]' : 'surface-light'} ${plan.recommended ? (lime ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-ink-950' : 'ring-2 ring-lime') : ''}`}>
      {plan.recommended && <p className={`mb-3 inline-flex self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${lime ? 'bg-ink-950 text-lime' : 'bg-lime text-ink-950'}`}>Önerilen</p>}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <Price price={plan.price} tone={lime ? 'lime' : 'light'} className="mt-1" />
      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[0.98rem]">
            <Check aria-hidden className={`mt-1 h-4 w-4 shrink-0 ${lime ? 'text-ink-950' : ''}`} style={lime ? undefined : { color: 'rgb(var(--hayb-lime-deep))' }} />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2">
        <AddToCartButton plan={plan} category={category} tone={lime ? 'dark' : 'lime'} />
          <a
            href={whatsappUrl(`Merhaba, ${category} - ${plan.name} paketi hakkında bilgi almak istiyorum.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl border px-5 font-semibold ${lime ? 'border-ink-950/40 hover:bg-ink-950/10' : 'border-on-light/20 hover:bg-paper-100'}`}
          >
            WhatsApp&apos;tan Sor
          </a>
        {example && <ExampleLink href={example.href} label={example.label} tone={lime ? 'lime' : 'light'} />}
      </div>
    </article>
  );
}

export default function PricingPage() {
  const rowsShown = ['Teslim Süresi', 'Alan Adı (Ücretsiz)', 'Sayfa Sayısı'];
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Paketler', path: '/paketler' }]} />
      <PageHero
        eyebrow="Paketler"
        title="Net paketler,"
        accent="sürpriz yok."
        text="Fiyatlar ve kapsam baştan bellidir. Size uygun paketi seçin ya da özel bir ihtiyaç için teklif isteyin."
        actions={<Button href="/proje-baslat">Özel Teklif Al</Button>}
      />

      <Section tone="light" labelledBy="web">
        <nav aria-label="Fiyat bölümleri" className="mb-10 flex flex-wrap gap-2">
          {anchors.map((a) => (
            <a key={a.href} href={a.href} className="inline-flex min-h-11 items-center rounded-full border border-on-light/20 bg-white px-5 font-semibold hover:border-on-light">
              {a.label}
            </a>
          ))}
        </nav>

        <SectionHeading id="web" eyebrow="Web Sitesi" title="Web sitesi" accent="paketleri." text="Tüm paketlerde SSL, mobil ve tablet uyumu, hız optimizasyonu, WhatsApp entegrasyonu ve KVKK bildirimi bulunur." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {webPackages.map((pkg, i) => {
            const plan = pricingPlans.find((p) => p.id === pkg.id)!;
            return (
              <li key={pkg.id}>
                <Reveal delay={i * 60} className="h-full">
                  <article className={`surface-light flex h-full flex-col rounded-card p-6 ${pkg.recommended ? 'ring-2 ring-lime' : ''}`}>
                    {pkg.recommended && <p className="mb-3 inline-flex self-start rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">Önerilen</p>}
                    <h3 className="text-lg font-bold tracking-wide">{pkg.name}</h3>
                    <Price price={pkg.price} className="mt-1" />
                    <dl className="mt-5 flex-1 space-y-3 text-[0.98rem]">
                      {rowsShown.map((label) => {
                        const r = webPricingRows.find((x) => x.label === label)!;
                        return (
                          <div key={label}>
                            <dt className="text-on-light-muted">{label.replace(' (Ücretsiz)', '')}</dt>
                            <dd className="font-semibold">{String(cellOf(r, pkg.id))}</dd>
                          </div>
                        );
                      })}
                    </dl>
                    <div className="mt-6 space-y-2">
                      <PlanDetails plan={plan} rows={webPricingRows.map((r) => ({ label: r.label, value: cellOf(r, pkg.id) }))} />
                      <AddToCartButton plan={plan} category="Web Sitesi" />
                      <ExampleLink href="/template" label="Örnek Web Sitelerini Gör" />
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 hidden md:block">
          <h3 className="mb-4 text-xl font-bold">Paketleri karşılaştırın</h3>
          <div className="relative overflow-x-auto rounded-card border border-on-light/10 bg-white" tabIndex={0} role="region" aria-label="Paket karşılaştırma tablosu (kaydırılabilir)">
            <table className="w-full min-w-[42rem] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Web sitesi paketlerinin özellik karşılaştırması</caption>
              <thead>
                <tr className="border-b border-on-light/10 bg-paper-100">
                  <th scope="col" className="px-4 py-3 font-semibold">Özellik</th>
                  {webPackages.map((p) => (
                    <th key={p.id} scope="col" className="px-4 py-3 text-center font-bold">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {webPricingRows.map((r) => (
                  <tr key={r.label} className="border-b border-on-light/5 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium">{r.label}</th>
                    {webPackages.map((p) => {
                      const v = cellOf(r, p.id);
                      return (
                        <td key={p.id} className="px-4 py-3 text-center">
                          {typeof v === 'string' ? <span className="font-medium">{v}</span> : v ? <Yes /> : <No />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="eticaret">
        <SectionHeading id="eticaret" eyebrow="E-Ticaret" title="E-ticaret sitesi" accent="paketleri." text="Ürünlerinizi yükleyin, iyzico veya PayTR ile ödeme alın, siparişi, stoğu ve kargoyu tek panelden yönetin. Ürün sayısı, entegrasyon ve tasarım kapsamı pakete göre büyür." />
        <ul className="grid gap-5 lg:grid-cols-3">
          {ecommercePackages.map((pkg, i) => {
            const plan = ecommercePlans.find((p) => p.id === pkg.id)!;
            const shown = ['Ürün Sayısı', 'Sanal POS (iyzico / PayTR)', 'Tasarım', 'Teslim Süresi'];
            return (
              <li key={pkg.id}>
                <Reveal delay={i * 60} className="h-full">
                  <article data-spot className={`surface-light flex h-full flex-col rounded-card p-6 text-on-light ${pkg.recommended ? 'ring-2 ring-lime' : ''}`}>
                    {pkg.recommended && <p className="mb-3 inline-flex self-start rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">Önerilen</p>}
                    <h3 className="text-lg font-bold tracking-wide">{pkg.name}</h3>
                    <Price price={pkg.price} className="mt-1" />
                    <p className="mt-3 text-on-light-muted">{pkg.blurb}</p>
                    <dl className="mt-5 flex-1 space-y-3 text-[0.98rem]">
                      {shown.map((label) => {
                        const r = ecommerceRows.find((x) => x.label === label)!;
                        const v = r[pkg.key];
                        return (
                          <div key={label}>
                            <dt className="text-on-light-muted">{label}</dt>
                            <dd className="font-semibold">{typeof v === 'string' ? v : v ? 'Var' : 'Yok'}</dd>
                          </div>
                        );
                      })}
                    </dl>
                    <div className="mt-6 space-y-2">
                      <PlanDetails plan={plan} category="E-Ticaret" rows={ecommerceRows.map((r) => ({ label: r.label, value: r[pkg.key] }))} />
                      <AddToCartButton plan={plan} category="E-Ticaret" />
                      <a
                        href={whatsappUrl(`Merhaba, ${pkg.name} e-ticaret paketi hakkında bilgi almak istiyorum.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-on-light/20 px-5 font-semibold hover:bg-paper-100"
                      >
                        WhatsApp&apos;tan Sor
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 hidden md:block">
          <h3 className="mb-4 text-xl font-bold">E-ticaret paketlerini karşılaştırın</h3>
          <div className="relative overflow-x-auto rounded-card border border-white/10 bg-white text-on-light" tabIndex={0} role="region" aria-label="E-ticaret paket karşılaştırma tablosu (kaydırılabilir)">
            <table className="w-full min-w-[42rem] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">E-ticaret paketlerinin özellik karşılaştırması</caption>
              <thead>
                <tr className="border-b border-on-light/10 bg-paper-100">
                  <th scope="col" className="px-4 py-3 font-semibold">Özellik</th>
                  {ecommercePackages.map((p) => (
                    <th key={p.id} scope="col" className="px-4 py-3 text-center font-bold">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ecommerceRows.map((r) => (
                  <tr key={r.label} className="border-b border-on-light/5 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium">{r.label}</th>
                    {ecommercePackages.map((p) => {
                      const v = r[p.key];
                      return (
                        <td key={p.id} className="px-4 py-3 text-center">
                          {typeof v === 'string' ? <span className="font-medium">{v}</span> : v ? <Yes /> : <No />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 rounded-card border border-white/15 p-4 text-[0.97rem] text-fg-muted">
          Sanal POS onayı ödeme kuruluşunun (iyzico, PayTR) değerlendirmesine bağlıdır; entegrasyon ve kurulumu biz yaparız. Kargo, e-fatura ve pazaryeri gibi ek entegrasyonlar paket kapsamında değildir; ihtiyacınız olursa ayrıca teklif hazırlarız.
        </p>
      </Section>

      <Section tone="dark-2" labelledBy="sosyal-medya">
        <SectionHeading id="sosyal-medya" eyebrow="Sosyal Medya" title="Sosyal medya" accent="paketleri." text="Post ve story tasarımları; marka kimliğinize uygun ve düzenli." />
        <ul className="grid gap-5 lg:grid-cols-3">
          {socialMediaPlans.map((p) => (
            <li key={p.id}>
              <PlanCard plan={p} category="Sosyal Medya" variant="lime" example={{ href: "/hizmetler/sosyal-medya", label: "Örnek Tasarımları Gör" }} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light" labelledBy="qr-menu">
        <SectionHeading id="qr-menu" eyebrow="QR Menü" title="Restoran ve kafeler için" accent="QR menü." text="Anlık güncellenen, mobil uyumlu dijital menü." />
        <ul className="grid gap-5 lg:grid-cols-3">
          {qrMenuPlans.map((p) => (
            <li key={p.id}>
              <PlanCard plan={p} category="QR Menü" example={{ href: "/projeler/qrmenu", label: "Örnek QR Menüyü Gör" }} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" labelledBy="logo">
        <SectionHeading id="logo" eyebrow="Logo Tasarımı" title="Markanıza özel" accent="logo tasarımı." text="Uygulama ikonu gibi şeffaf köşeli, her yerde net görünen logolar. Örnek çalışmaları aşağıdaki bağlantıdan görebilirsiniz." />
        <div className="max-w-md">
          <PlanCard plan={logoPlan} category="Logo Tasarımı" variant="lime" example={{ href: "/hizmetler/marka-tasarimi", label: "Örnek Logoları Gör" }} />
        </div>
      </Section>

      <Section tone="light" labelledBy="reklam">
        <SectionHeading id="reklam" eyebrow="Google & Meta Reklamları" title="Reklamlarınızı" accent="biz yönetelim." text="İşletmenize en uygun platformlarda reklam kurulumu ve yönetimi. Fiyatlar aylıktır; 6 ve 12 aylık paketlerde Google Ads hediyedir." />
        <ul className="grid gap-5 lg:grid-cols-3">
          {adsTerms.map((t, i) => {
            const plan = adsPlan(i);
            const shown = adsRows.filter((r) => r.values[i] !== false).slice(0, 6);
            return (
              <li key={t.months}>
                <Reveal delay={i * 70} className="h-full">
                  <article data-spot className={`surface-light flex h-full flex-col rounded-card p-6 ${t.recommended ? 'ring-2 ring-lime' : ''}`}>
                    {t.recommended && <p className="mb-3 inline-flex self-start rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">Önerilen</p>}
                    <h3 className="text-xl font-bold">
                      {t.months} Ay · {t.name}
                    </h3>
                    <Price price={plan.price} className="mt-1" />
                    <p className="mt-1 text-sm font-semibold text-on-light-muted">Toplam {adsTotalLabel(i)} ({t.months} ay)</p>
                    <p className={`mt-3 inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-sm font-bold ${t.googleGift ? 'bg-ink-950 text-lime' : 'bg-paper-100 text-on-light-muted'}`}>
                      {t.googleGift ? <Gift aria-hidden className="h-4 w-4" /> : null}
                      {t.googleGift ? 'Meta + Google Ads (Google hediye)' : 'Meta Ads yönetimi'}
                    </p>
                    <p className="mt-3 text-on-light-muted">{t.blurb}</p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {shown.map((r) => (
                        <li key={r.label} className="flex gap-2.5 text-[0.97rem]">
                          <Check aria-hidden className="mt-1 h-4 w-4 shrink-0" style={{ color: 'rgb(var(--hayb-lime-deep))' }} />
                          {r.label}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 space-y-2">
                      <PlanDetails plan={plan} category="Reklam Yönetimi" rows={adsRows.map((r) => ({ label: r.label, value: r.values[i] }))} />
                      <AddToCartButton plan={plan} category="Reklam Yönetimi" />
                      <ExampleLink href="/hizmetler/reklam-yonetimi" label="Reklam Hizmetini İncele" />
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 rounded-card border border-on-light/15 bg-white p-4 text-[0.97rem]">
          <strong>Reklam bütçesi fiyatlara dahil değildir.</strong> Reklam bütçenizi doğrudan kendi Google veya Meta hesabınızdan ödersiniz; HAYB yalnızca yönetim hizmetini faturalandırır.
        </p>
      </Section>

      <Section tone="dark" labelledBy="data-service">
        <SectionHeading id="data-service" eyebrow="İşletme Verisi" title="HAYB" accent="Data Service." text="Sektörünü seç, işletmeleri keşfet, verilerini dışa aktar. Potansiyel müşteri ve pazar araştırmasını hızlandırın." />
        <div className="max-w-md">
          <PlanCard plan={dataServicePlan} category="Veri Ürünü" variant="lime" example={{ href: '/hizmetler/hayb-data-service', label: 'Ürünü İncele' }} />
        </div>
      </Section>

      <Section tone="dark-2" labelledBy="ozel-proje">
        <SectionHeading id="ozel-proje" eyebrow="Özel Proje ve Mobil" title="Kapsamına göre" accent="teklif hazırlıyoruz." text="Özel yazılım, platform ve mobil uygulama fiyatı projenin kapsamına göre belirlenir. Ücretsiz keşif görüşmesiyle başlayalım." />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass rounded-card p-6">
            <h3 className="text-xl font-bold">Özel proje kapsamı</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {specialProjectFeatures.map((f) => (
                <li key={f} className="flex gap-2 text-[0.95rem] text-fg-muted">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-lime" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-card p-6">
            <h3 className="text-xl font-bold">Mobil uygulama kapsamı</h3>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {mobileAppFeatures.map((g) => (
                <div key={g.category}>
                  <h4 className="font-semibold">{g.category}</h4>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fg-muted">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/proje-baslat">Teklif Al</Button>
          <Link href="/hizmetler" className="inline-flex min-h-12 items-center px-2 font-semibold underline underline-offset-4 hover:text-lime">
            Hizmetleri incele
          </Link>
        </div>
      </Section>

      <CTASection tone="dark-2" />
    </>
  );
}
