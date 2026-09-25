import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconCard } from '@/components/ui/Cards';
import { Icon3D } from '@/components/ui/Icon3D';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { processSteps, processPromises } from '@/data/process';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Süreç: Fikirden Yayına 10 Adım',
  description:
    'Fikir analizinden bakım ve desteğe kadar 10 adımlı çalışma sürecimiz: strateji, UI/UX, geliştirme, SEO, yayın ve destek.',
  path: '/surec',
});

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Süreç', path: '/surec' }]} />
      <PageHero
        eyebrow="Nasıl çalışıyoruz?"
        title="Fikirlerinizi adım adım"
        accent="gerçeğe dönüştürüyoruz."
        text="Sizi dinliyor, analiz ediyor, en doğru çözümü tasarlıyor ve projenizi hayata geçiriyoruz. Her adım net; ne zaman ne olacağını bilirsiniz."
        actions={<Button href="/proje-baslat">Projenizi Anlatın</Button>}
      />

      <Section tone="light" labelledBy="adimlar">
        <SectionHeading id="adimlar" eyebrow="10 adım" title="Başarılı projelerin arkasında" accent="planlı bir süreç var." />
        <ol className="relative">
          {/* Dikey çizgi: yalnızca dekoratif */}
          <span aria-hidden className="absolute bottom-6 left-[2.15rem] top-6 hidden w-px bg-on-light/15 sm:block" />
          {processSteps.map((s, i) => (
            <li key={s.n} className="relative pb-6 last:pb-0">
              <Reveal delay={(i % 3) * 50} className="surface-light relative flex gap-5 rounded-card p-5 sm:ml-0 sm:gap-6 sm:p-6">
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-ink-950">{s.n}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-1.5 max-w-xl text-on-light-muted">{s.text}</p>
                </div>
                <Icon3D name={s.icon} size={72} className="hidden shrink-0 sm:block" />
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark" labelledBy="uzun-vade">
        <SectionHeading id="uzun-vade" eyebrow="Daha fazlası" title="Sadece proje teslim etmiyoruz," accent="uzun vadeli iş birliği kuruyoruz." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processPromises.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 60} className="h-full">
                <IconCard icon={p.icon} title={p.title} text={p.text} tone="dark" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection tone="dark-2" />
    </>
  );
}
