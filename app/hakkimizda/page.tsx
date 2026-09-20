import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconCard } from '@/components/ui/Cards';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { buildMetadata } from '@/lib/metadata';
import type { IconName } from '@/data/icons';

export const metadata = buildMetadata({
  title: 'Hakkımızda',
  description:
    'HAYB, tasarım, teknoloji ve stratejiyi bir araya getiren bir dijital ürün stüdyosudur. Çalışma biçimimizi, değerlerimizi ve yaklaşımımızı tanıyın.',
  path: '/hakkimizda',
});

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: 'kolaykullanim', title: 'Sadelik', text: 'Karmaşıklığı değil, netliği severiz.' },
  { icon: 'hizliperformans', title: 'Hız', text: 'Zamanınızın değerini biliriz; hızlı sayfalar ve hızlı dönüş.' },
  { icon: 'musteriodakli', title: 'Kullanıcı Odaklılık', text: 'Her kararda önce kullanıcıyı düşünürüz.' },
  { icon: 'sinirsiz', title: 'Ölçeklenebilirlik', text: 'Bugünü değil, yarını da taşıyacak yapılar kurarız.' },
  { icon: 'guvenlik', title: 'Güven', text: 'Söz verdiğimiz kapsamı, konuştuğumuz gibi teslim ederiz.' },
];

const approach = [
  { title: 'Fikir', text: 'Önce dinleriz. Hedefinizi, kullanıcınızı ve işinizin gerçek ihtiyacını anlamadan tasarıma geçmeyiz.' },
  { title: 'Tasarım', text: 'Ekranları kodlamadan önce akışı ve arayüzü netleştiririz. Az ama anlamlı, okunaklı ve erişilebilir tasarlarız.' },
  { title: 'Teknoloji', text: 'Modern, hızlı ve bakımı kolay araçlarla geliştiririz; yayına aldığımız ürünün yayından sonra da yönetilebilir olmasını isteriz.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Fikirleri çalışan"
        accent="dijital ürünlere dönüştürüyoruz."
        text="HAYB; tasarımı, teknolojiyi ve stratejiyi bir araya getiren bir dijital ürün stüdyosudur. Web sitesi yapmakla kalmaz, ürünün kendisini tasarlar, geliştirir ve yayına alırız."
        actions={
          <>
            <Button href="/proje-baslat">Bizimle Tanışın</Button>
            <Button href="/projeler" variant="secondary">
              Projelerimiz
            </Button>
          </>
        }
      />

      <Section tone="light" labelledBy="yaklasim">
        <SectionHeading id="yaklasim" eyebrow="Yaklaşımımız" title="Sadece hizmet değil," accent="gerçek bir ortaklık." text="İşe bir teslim tarihiyle değil, sizin hedefinizle başlarız." />
        <ol className="grid gap-5 md:grid-cols-3">
          {approach.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={i * 70} className="surface-light h-full rounded-card p-6">
                <span className="inline-flex rounded-full bg-lime px-2.5 py-0.5 text-xs font-extrabold tracking-widest text-ink-950">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-2xl font-bold">{a.title}</h3>
                <p className="mt-2 text-on-light-muted">{a.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark" labelledBy="degerler">
        <SectionHeading id="degerler" eyebrow="Değerlerimiz" title="Bizi biz yapan" accent="değerler." text="Her projede aynı ilkelere bağlı kalırız." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {values.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={i * 60} className="h-full">
                <IconCard icon={v.icon} title={v.title} text={v.text} tone="dark" size={64} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="calisma">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <SectionHeading id="calisma" eyebrow="Çalışma biçimimiz" title="Uzun vadeli" accent="düşünürüz." className="lg:mb-0" />
          <ul className="space-y-4 text-lg">
            {[
              'Süreç boyunca her adımı sizinle paylaşırız; sürpriz yaşamazsınız.',
              'Kapsamı ve fiyatı baştan netleştiririz.',
              'Yayından sonra güncelleme, bakım ve destek için yanınızda kalırız.',
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-lime" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
