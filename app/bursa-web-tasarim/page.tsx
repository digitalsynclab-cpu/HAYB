import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { ORGANIZATION_ID } from '@/components/schema/OrganizationSchema';
import { webPricingRows } from '@/data/pricing';
import { services } from '@/data/services';
import { templateBySlug } from '@/data/templates';
import { absoluteUrl, site } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

const PATH = '/bursa-web-tasarim';

export const metadata = buildMetadata({
  title: 'Bursa Web Tasarım ve Dijital Ürün Stüdyosu',
  description:
    'Bursa’nın Osmangazi ilçesinde kurulu HAYB; Bursa’daki işletmeler için web sitesi, UI/UX, özel yazılım ve mobil uygulama geliştirir. Net paketler ve canlı denenebilir şablonlar.',
  path: PATH,
});

const row = (label: string) => webPricingRows.find((r) => r.label === label);
const delivery = row('Teslim Süresi');
const domain = row('Alan Adı (Ücretsiz)');

/** Görünür SSS ve FAQPage şeması aynı diziden beslenir. Yanıtlar site verisinden gelir; uydurma rakam yoktur. */
const faqs = [
  {
    question: 'Web sitesi ne kadar sürede teslim edilir?',
    answer: delivery
      ? `Teslim süresi pakete göre değişir: Starter ${delivery.starter}, Business ${delivery.business}, Professional ${delivery.professional}, Premium ${delivery.premium}. Kapsam ve fiyatlar Paketler sayfasında yer alır.`
      : 'Teslim süresi pakete göre değişir; ayrıntılar Paketler sayfasında yer alır.',
  },
  {
    question: 'Alan adı ücretsiz mi?',
    answer: domain
      ? `Paketlere göre ilk yıl veya ilk iki yıl için alan adı ücretsizdir: Starter ${domain.starter}, Business ${domain.business}, Professional ${domain.professional}, Premium ${domain.premium}.`
      : 'Paketlere göre alan adı ücretsizdir; ayrıntılar Paketler sayfasında yer alır.',
  },
  {
    question: 'Hazır bir şablonu kullanabilir miyim?',
    answer:
      'Evet. Hazır tasarım seçenekleri Business paketi ve üzerindeki projelerde kullanılabilir. Örnek şablonların hepsini canlı deneyebilir, beğendiğinizi web sitesi sipariş formunda seçebilirsiniz.',
  },
  {
    question: 'Mobil uygulama ve özel yazılım fiyatları nasıl belirlenir?',
    answer: 'Kapsama göre belirlenir; ücretsiz keşif görüşmesi yapılır. Ne yapmak istediğinizi proje başlatma formundan iletebilirsiniz.',
  },
  {
    question: 'Süreç nasıl başlıyor?',
    answer:
      'Web sitesi için sipariş formunu doldurursunuz; bilgileriniz hazır bir WhatsApp mesajına dönüşür ve HAYB’ye iletilir. Diğer projeler için proje başlatma formunu kullanabilirsiniz.',
  },
];

const sectorTemplates: { sector: string; slug: string }[] = [
  { sector: 'Restoran ve kafeler', slug: 'web4' },
  { sector: 'Kahve ve gıda markaları', slug: 'web1' },
  { sector: 'Mobilya ve ev ürünleri e-ticareti', slug: 'web3' },
  { sector: 'Emlak ve gayrimenkul', slug: 'web5' },
  { sector: 'Klinik ve sağlık hizmetleri', slug: 'web2' },
  { sector: 'Güzellik ve kozmetik', slug: 'web7' },
];

const needs = [
  {
    title: 'Aranınca bulunmak',
    text: 'İnsanlar “Bursa” ve yaptığınız işi birlikte aradığında sitenizin konumunuzu, hizmetlerinizi ve iletişim bilgilerinizi net söylemesi gerekir. Business ve üzeri paketlerde XML site haritası ve gelişmiş SEO optimizasyonu, Professional ve üzerinde Schema SEO (yapısal veri), Google Analytics ve Search Console bulunur.',
  },
  {
    title: 'Telefondan kolay ulaşım',
    text: 'Ziyaretçilerin önemli bir kısmı telefondan gelir. Tek dokunuşla arama, WhatsApp ve sade bir iletişim formu, ziyareti müşteri talebine çevirir.',
  },
  {
    title: 'Güven veren, hızlı bir site',
    text: 'Açık iletişim bilgileri, işletme adı, KVKK ve çerez metinleri ile hızlı açılan sayfalar güveni artırır. Tüm paketlerde SSL, mobil ve tablet uyumu ile hız optimizasyonu bulunur.',
  },
  {
    title: 'Büyümeye uygun altyapı',
    text: 'Bugün tanıtım sitesi yeterli olabilir; yarın sipariş, randevu veya müşteri paneli gerekebilir. İhtiyaç büyüdüğünde özel yazılım ve yönetim paneli ile aynı çatı altında devam edebilirsiniz.',
  },
];

const serviceSlugs = ['web-sitesi', 'ui-ux', 'ozel-yazilim', 'mobil-uygulama', 'yonetim-paneli', 'reklam-yonetimi'];

export default function BursaPage() {
  const list = serviceSlugs.map((s) => services.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Bursa Web Tasarım', path: PATH },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Web tasarım ve dijital ürün geliştirme',
          description: 'Web sitesi, UI/UX tasarım, özel yazılım ve mobil uygulama geliştirme hizmetleri.',
          url: absoluteUrl(PATH),
          serviceType: 'Web tasarım ve yazılım geliştirme',
          provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: site.name, url: site.url },
          areaServed: { '@type': 'City', name: 'Bursa', containedInPlace: { '@type': 'Country', name: 'Türkiye' } },
        }}
      />
      <FAQSchema items={faqs} />

      <PageHero
        eyebrow="Bursa"
        title="Bursa’da dijital ürünlerinizi"
        accent="birlikte geliştirelim."
        text="HAYB, Bursa’nın Osmangazi ilçesinde 2025’te kurulmuş bir dijital ürün stüdyosudur. Web sitesi, UI/UX tasarım, özel yazılım ve mobil uygulama çalışmalarını Bursa’dan yürütürüz."
        breadcrumb={[{ label: 'Hizmetler', href: '/hizmetler' }, { label: 'Bursa Web Tasarım' }]}
        actions={
          <>
            <Button href="/web-sitesi-siparis">Web Sitesi Siparişini Başlat</Button>
            <Button href="/proje-baslat" variant="secondary">
              Proje Başlat
            </Button>
          </>
        }
      />

      <Section tone="light" labelledBy="ihtiyac">
        <SectionHeading id="ihtiyac" eyebrow="Yerel bir işletme için" title="Dijitalde ilk" accent="ihtiyaçlar neler?" text="Bursa’daki bir işletmenin web sitesinden beklemesi gereken dört şey." />
        <ul className="grid gap-5 sm:grid-cols-2">
          {needs.map((n, i) => (
            <li key={n.title}>
              <Reveal delay={(i % 2) * 70} className="surface-light h-full rounded-card p-6">
                <h3 className="text-xl font-bold">{n.title}</h3>
                <p className="mt-2 text-on-light-muted">{n.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" labelledBy="sektor">
        <SectionHeading
          id="sektor"
          eyebrow="Sektörünüze göre"
          title="Bursa ekonomisinin"
          accent="farklı ihtiyaçları."
          text="Bursa; otomotiv ve yan sanayi, tekstil, gıda, mobilya ve turizm gibi alanlarda güçlü bir yerel ekonomiye sahiptir. Sektöre göre web sitesinin görevi de değişir."
        />
        <ul className="grid gap-4 md:grid-cols-3">
          <li className="glass rounded-card p-5">
            <h3 className="text-lg font-bold">Üretici ve tedarikçiler</h3>
            <p className="mt-2 text-fg-muted">Ürün kataloğu, teknik bilgi ve teklif formu öne çıkar; karar verici sizi telefondan ve masaüstünden hızla bulabilmelidir.</p>
          </li>
          <li className="glass rounded-card p-5">
            <h3 className="text-lg font-bold">Hizmet işletmeleri</h3>
            <p className="mt-2 text-fg-muted">Klinik, restoran, güzellik gibi işletmelerde randevu veya rezervasyon akışı ile konum ve çalışma saatleri en önemli bilgidir.</p>
          </li>
          <li className="glass rounded-card p-5">
            <h3 className="text-lg font-bold">Perakende ve e-ticaret</h3>
            <p className="mt-2 text-fg-muted">Kategori yapısı, ürün sayfaları ve sepet deneyimi belirleyicidir; mobilde hızlı ve sade bir akış dönüşümü artırır.</p>
          </li>
        </ul>

        <h3 className="mt-10 text-xl font-bold">Sektörünüze yakın şablonu canlı deneyin</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectorTemplates.map(({ sector, slug }) => {
            const t = templateBySlug(slug);
            if (!t) return null;
            return (
              <li key={slug}>
                <Link href={`/template/${t.slug}`} className="press glass group flex min-h-14 items-center justify-between gap-3 rounded-xl px-4 py-3 hover:border-lime/60">
                  <span>
                    <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-lime">{t.code}</span>
                    <span className="block font-semibold">{sector}</span>
                    <span className="block text-sm text-fg-muted">{t.brand} · örnek şablon</span>
                  </span>
                  <ArrowRight aria-hidden className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-fg-muted">
          Şablonlardaki markalar kurgusaldır. Tüm örnekler için <Link href="/template" className="font-semibold text-lime underline underline-offset-4">şablon galerisine</Link> bakabilirsiniz.
        </p>
      </Section>

      <Section tone="white" labelledBy="hizmetler-bursa">
        <SectionHeading id="hizmetler-bursa" eyebrow="Hizmetlerimiz" title="Tek çatı altında" accent="tasarım ve teknoloji." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <li key={s.slug}>
              <Link href={`/hizmetler/${s.slug}`} className="surface-light press group flex h-full items-start justify-between gap-3 rounded-card p-5 hover:-translate-y-0.5">
                <span>
                  <span className="block text-lg font-bold">{s.title}</span>
                  <span className="mt-1 block text-on-light-muted">{s.summary}</span>
                </span>
                <ArrowRight aria-hidden className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-on-light-muted">
          Yapılan işleri <Link href="/projeler" className="font-semibold text-on-light underline decoration-lime underline-offset-4">Projeler sayfasında</Link>, fikirden yayına süreci <Link href="/surec" className="font-semibold text-on-light underline decoration-lime underline-offset-4">Süreç sayfasında</Link> ve sık sorulan yazıları <Link href="/insights" className="font-semibold text-on-light underline decoration-lime underline-offset-4">Insights</Link> bölümünde bulabilirsiniz.
        </p>
      </Section>

      <Section tone="dark-2" labelledBy="sss">
        <SectionHeading id="sss" eyebrow="Sık sorulanlar" title="Başlamadan önce" accent="merak edilenler." />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="glass group rounded-2xl px-5 py-4 open:border-lime/50">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {f.question}
                <span aria-hidden className="text-lime transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-fg-muted">{f.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-fg-muted">
          Paket kapsamları için <Link href="/paketler" className="font-semibold text-lime underline underline-offset-4">Paketler</Link> sayfasına, iletişim için <Link href="/iletisim" className="font-semibold text-lime underline underline-offset-4">İletişim</Link> sayfasına bakabilirsiniz.
        </p>
      </Section>

      <CTASection tone="dark" title="Bursa’dan dijitale" accent="birlikte başlayalım." extra={{ href: '/web-sitesi-siparis', label: 'Web Sitesi Siparişini Başlat' }} />
    </>
  );
}
