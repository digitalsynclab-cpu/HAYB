import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitText';

/** Ana sayfada HAYB Partner programına kısa giriş; sayfa sonu çağrısı (CTASection) ile aynı boyut ve düzen. */
export function PartnerTeaser() {
  return (
    <Section tone="dark" labelledBy="partner-ozet">
      <Reveal className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SplitHeading
            id="partner-ozet"
            title="HAYB Partner olun,"
            accent="her satıştan komisyon kazanın."
            className="text-balance text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          />
          <p className="mt-5 max-w-xl text-lg text-fg-muted">Müşteriyi siz bulun, projeyi HAYB geliştirsin; getirdiğiniz her satıştan komisyon kazanın.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/partner">Partnerlik Hakkında Bilgi Alın</Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
