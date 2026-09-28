import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LineIcon } from '@/components/ui/LineIcon';
import { Price } from '@/components/ui/Price';
import { Reveal } from '@/components/motion/Reveal';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { ContactButton } from '@/components/contact/ContactButton';
import { menu } from '@/data/menu';
import { templates } from '@/data/templates';
import { webPackages, ecommercePackages, socialMediaPlans, webPricingRows } from '@/data/pricing';
import { campaign } from '@/data/campaign';

/** Ana sayfa (yeni düzen): tek vaat, tek ana çağrı; ayrıntılar menülerde ve kendi sayfalarında. */
export function HomeHeroV2() {
  return (
    <PageHero
      id="ana-baslik"
      visualFirst
      backgroundSrc="/brand/hero-bg.webp"
      title="Fikirleri"
      accent="Dijital Gerçeğe Dönüştürüyoruz."
      text="Web siteleri, e-ticaret, mobil uygulamalar ve özel yazılımlarla işinizi dijitale taşıyoruz. Tasarımdan yayına kadar yanınızdayız."
      actions={
        <>
          <ContactButton>Teklif Al</ContactButton>
          <Button href="/paketler" variant="secondary">
            Paketleri Gör
          </Button>
        </>
      }
      visual={
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/brand/hayb-3d.webp"
            alt="HAYB logosu"
            width={1000}
            height={1000}
            priority
            sizes="(min-width: 1024px) 460px, 50vw"
            className="hero-float h-auto w-[min(46vw,11.5rem)] sm:w-[min(50vw,16rem)] lg:w-[28rem]"
          />
        </div>
      }
    />
  );
}


/** 12 hizmet, 4 grupta. */
export function HomeGroups() {
  const groups = menu.find((m) => m.label === 'Hizmetler')!.groups!;
  return (
    <Section tone="light" labelledBy="hizmet-gruplari">
      <SectionHeading id="hizmet-gruplari" title="Ne yapmak" accent="istiyorsunuz?" />
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {groups.map((g, i) => (
          <li key={g.title}>
            <Reveal delay={i * 70} className="h-full">
              <article className="surface-light flex h-full flex-col rounded-[1.6rem] p-6 sm:p-7">
                <h3 className="text-xl font-bold sm:text-2xl">{g.title}</h3>
                <ul className="mt-5 flex-1 divide-y divide-on-light/10 border-t border-on-light/10">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group flex min-h-14 items-center gap-3 py-2">
                        {l.icon && <LineIcon name={l.icon} size={38} />}
                        <span className="flex-1 text-[1.02rem] font-semibold">{l.label}</span>
                        <ArrowRight aria-hidden className="h-4 w-4 text-on-light-muted transition group-hover:translate-x-1 group-hover:text-on-light" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Tam genişlik, siyah zeminli vitrin görseli: web, uygulama, panel ve oyun. */
export function HomeShowcase() {
  return (
    <section aria-label="Web sitesi, yönetim paneli, mobil uygulama ve oyun tasarımlarımız" className="bg-black">
      <Image src="/brand/showcase.webp" alt="Dizüstü, tablet ve telefonlarda HAYB web sitesi, yönetim paneli, mobil uygulama ve oyun tasarımları" width={1983} height={793} sizes="100vw" className="mx-auto h-auto w-full max-w-[2000px]" />
    </section>
  );
}

const WORK_SLUGS = ['web1', 'web9', 'web11', 'web12', 'web13', 'web19'];

/** Çalışmalar: yalnızca canlı denenebilir altı şablon; gerisi Çalışmalar menüsünde. */
export function HomeWork() {
  const list = WORK_SLUGS.map((s) => templates.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const meta = list.map(({ slug, code, minimumPackage, brand, sector, category, summary, features }) => ({ slug, code, minimumPackage, brand, sector, category, summary, features }));
  return (
    <Section tone="dark" labelledBy="calismalar">
      <SectionHeading
        id="calismalar"
        title="Canlı deneyebileceğiniz"
        accent="örnek siteler."
        action={
          <Button href="/template" variant="secondary" arrow>
            Tüm şablonlar
          </Button>
        }
      />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {meta.map((t, i) => (
          <li key={t.slug} className="w-[17rem] shrink-0 snap-start sm:w-auto">
            <Reveal delay={(i % 3) * 70}>
              <TemplateCard t={t} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const STEPS = [
  { n: '01', title: 'Anlatın', text: 'İhtiyacınızı ve fikrinizi bize anlatın; net bir kapsam ve fiyat çıkaralım.' },
  { n: '02', title: 'Tasarlayıp geliştirelim', text: 'Markanıza özel tasarımı hazırlar, hızlı ve sağlam şekilde koda döker, her adımı sizinle paylaşırız.' },
  { n: '03', title: 'Yayına alalım', text: 'Testleri tamamlayıp canlıya alırız; yayından sonra da güncelleme ve destekle yanınızdayız.' },
];

export function HomeSteps() {
  return (
    <Section tone="light" labelledBy="surec-ozet">
      <SectionHeading
        id="surec-ozet"
        title="Üç adımda"
        accent="fikirden yayına."
        action={
          <Button href="/surec" variant="secondary-light" arrow>
            Sürecin tamamı
          </Button>
        }
      />
      <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
        {STEPS.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 80} className="surface-light h-full rounded-[1.6rem] p-6 sm:p-7">
              <span className="text-5xl font-extrabold leading-none tracking-tight text-on-light/15">{s.n}</span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-on-light-muted">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** Paketler yönlendirmesi: fiyatlar ve kampanya yalnızca Paketler sayfasında. */
export function HomePackages() {
  return (
    <Section tone="dark" labelledBy="paket-ozet">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeading id="paket-ozet" className="!mb-0" title="Size uygun paketi" accent="bulun." />
        <Button href="/paketler" arrow>
          Paketlere Göz Atın
        </Button>
      </div>
    </Section>
  );
}

const FAQ = [
  { q: 'Web sitesi ne kadar sürede teslim edilir?', a: 'Pakete göre değişir: Starter 3, Business 4, Professional 5, Premium 7 gündür. E-ticaret paketlerinde 10 ile 25 gün arasıdır.' },
  { q: 'Alan adı (domain) fiyata dahil mi?', a: 'Evet. Web sitesi paketlerinde ilk 1 veya 2 yıl alan adı ücretsizdir; e-ticaret paketlerinde 1 ile 3 yıl, üst paketlerde hosting de dahildir.' },
  { q: 'Mobil uygulama ve özel yazılım fiyatı nasıl belirlenir?', a: 'Projenin kapsamına göre belirlenir. Önce ücretsiz bir keşif görüşmesi yapar, ardından net bir teklif hazırlarız.' },
  { q: 'Yayından sonra destek alabilir miyim?', a: 'Evet. Premium web paketinde ve üst e-ticaret paketlerinde 7/24 canlı destek dahildir; diğer paketlerde yayın sonrası destek için birlikte anlaşabiliriz.' },
  { q: 'Fiyatlar kampanyalı mı?', a: `Evet, açılış kampanyasında paketlerde %${campaign.rate} indirim vardır. Güncel fiyatlar ve bitiş tarihi Paketler sayfasında yer alır.` },
];

export function HomeFaq() {
  return (
    <Section tone="light" labelledBy="sss">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading id="sss" className="!mb-0" title="Merak" accent="ettikleriniz." />
        <div className="divide-y divide-on-light/10 border-y border-on-light/10">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-left text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-on-light/20 text-lg leading-none transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 pr-10 text-on-light-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
