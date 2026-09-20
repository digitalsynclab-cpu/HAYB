import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Icon3D } from '@/components/ui/Icon3D';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitText';
import { whatsappUrl } from '@/data/site';
import { MessageCircle } from 'lucide-react';

/** Sayfa sonu çağrısı: tek hedef, tek net eylem. */
export function CTASection({
  title = 'Hayalinizdeki projeyi',
  accent = 'birlikte hayata geçirelim.',
  text = 'Fikriniz ne olursa olsun, birlikte en doğru çözümü bulalım. Önce dinliyoruz, sonra size en uygun yolu öneriyoruz.',
  tone = 'dark',
}: {
  title?: string;
  accent?: string;
  text?: string;
  tone?: 'dark' | 'dark-2';
}) {
  return (
    <Section tone={tone} labelledBy="cta-baslik">
      <Reveal className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SplitHeading
            id="cta-baslik"
            title={title}
            accent={accent}
            className="text-balance text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          />
          <p className="mt-5 max-w-xl text-lg text-fg-muted">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/proje-baslat">Teklif Al</Button>
            <Button
              href={whatsappUrl('Merhaba, HAYB internet sitesinden yazıyorum.')}
              variant="secondary"
              icon={<MessageCircle aria-hidden className="h-5 w-5" />}
            >
              WhatsApp ile Yaz
            </Button>
          </div>
        </div>
        <div aria-hidden className="hidden justify-center lg:flex">
          <Icon3D name="yenimusteri" size={220} />
        </div>
      </Reveal>
    </Section>
  );
}
