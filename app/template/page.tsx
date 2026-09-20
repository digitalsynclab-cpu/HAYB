import Link from 'next/link';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/CTASection';
import { ReferenceSites } from '@/components/sections/HomeSections';
import { TemplateCard } from '@/components/templates/TemplateShowcase';
import { templates } from '@/data/templates';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Web Sitesi Şablonları: Canlı Deneyin',
  description: 'Kahve, restoran, emlak, e-ticaret, veteriner ve ajans gibi sektörler için hazırladığımız 8 örnek web sitesi şablonu. Mobilde ve masaüstünde canlı deneyin.',
  path: '/template',
});

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Şablonlar"
        title="Web sitenizi satın almadan"
        accent="önce canlı deneyin."
        text="Sekiz farklı sektör için tasarladığımız örnek siteleri açın; menüyü, sepeti, filtreleri ve formları kendi telefonunuzda kullanın. Markalar ve ürünler kurgusaldır, tasarım ve kalite gerçektir."
        actions={<Button href="/proje-baslat">Kendi Sitemi İstiyorum</Button>}
      />
      <Section tone="dark-2" labelledBy="sablon-listesi">
        <h2 id="sablon-listesi" className="sr-only">
          Örnek web sitesi şablonları
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <li key={t.slug} className="flex">
              <Reveal delay={(i % 3) * 70} blur className="flex w-full flex-col">
                <TemplateCard t={t} className="w-full" />
                <div className="px-1 pt-3">
                  <p className="text-[0.95rem] text-fg-muted">{t.summary}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg">
                    {t.features.map((f) => (
                      <li key={f} className="inline-flex items-center gap-1.5">
                        <Check aria-hidden className="h-3.5 w-3.5 text-lime" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-fg-muted">
          Beğendiğiniz şablonu kendi markanıza uyarlıyoruz: renk, yazı tipi, içerik ve görseller sizin olur.{' '}
          <Link href="/fiyatlandirma" className="font-semibold text-lime underline underline-offset-4">
            Fiyatları görün
          </Link>
        </p>
      </Section>
      <ReferenceSites tone="light" />
      <CTASection tone="dark" />
    </>
  );
}
