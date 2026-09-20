import { MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon3D } from '@/components/ui/Icon3D';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { CTASection } from '@/components/sections/CTASection';
import { whatsappUrl } from '@/data/site';
import { webPackages, webPricingRows } from '@/data/pricing';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'İletişim',
  description: 'Bir fikriniz mi var? HAYB ile iletişime geçin: WhatsApp veya iletişim formu ile projenizi anlatın, ücretsiz keşif görüşmesi yapalım.',
  path: '/iletisim',
});

const deliveryRow = webPricingRows.find((r) => r.label === 'Teslim Süresi')!;
const days = webPackages.map((p) => (deliveryRow as unknown as Record<string, string>)[p.id]);

const faq = [
  {
    q: 'Web sitesi ne kadar sürede teslim edilir?',
    a: `Pakete göre değişir: ${webPackages.map((p, i) => `${p.name} ${days[i]}`).join(', ')}.`,
  },
  {
    q: 'Alan adı (domain) fiyata dahil mi?',
    a: 'Evet. Web sitesi paketlerinde ilk 1 veya 2 yıl alan adı ücretsizdir; süre ve uzantı pakete göre değişir.',
  },
  {
    q: 'Mobil uygulama ve özel yazılım fiyatı nasıl belirlenir?',
    a: 'Projenin kapsamına göre belirlenir. Önce ücretsiz bir keşif görüşmesi yapar, ardından net bir teklif hazırlarız.',
  },
  {
    q: 'Yayından sonra destek alabilir miyim?',
    a: 'Evet. Premium web paketinde 7/24 canlı destek dahildir; diğer paketlerde yayın sonrası destek için birlikte anlaşabiliriz.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bir fikriniz mi var?"
        accent="Konuşalım."
        text="İster küçük bir fikir, ister büyük bir proje olsun. Sizi dinlemek ve birlikte en doğru çözümü üretmek için buradayız."
        actions={
          <Button href={whatsappUrl('Merhaba, HAYB internet sitesinden yazıyorum.')} icon={<MessageCircle aria-hidden className="h-5 w-5" />} arrow={false}>
            WhatsApp ile Yaz
          </Button>
        }
        visual={<ContactForm />}
      />

      <Section tone="light" labelledBy="kanallar">
        <SectionHeading id="kanallar" eyebrow="Ulaşım" title="Bize nasıl" accent="ulaşırsınız?" />
        <ul className="grid gap-5 md:grid-cols-2">
          <li className="surface-light flex items-center gap-5 rounded-card p-6">
            <Icon3D name="iletisim" size={72} />
            <div>
              <h3 className="text-xl font-bold">WhatsApp</h3>
              <p className="text-on-light-muted">En hızlı yol: mesaj yazın, size dönelim.</p>
              <a href={whatsappUrl('Merhaba, HAYB internet sitesinden yazıyorum.')} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
                WhatsApp&apos;ı aç
              </a>
            </div>
          </li>
          <li className="surface-light flex items-center gap-5 rounded-card p-6">
            <Icon3D name="yenimusteri" size={72} />
            <div>
              <h3 className="text-xl font-bold">Proje başlatın</h3>
              <p className="text-on-light-muted">Projenizi adım adım anlatın, teklif hazırlayalım.</p>
              <a href="/proje-baslat" className="mt-1 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
                Sihirbazı başlat
              </a>
            </div>
          </li>
        </ul>
      </Section>

      <Section tone="dark" labelledBy="sss">
        <SectionHeading id="sss" eyebrow="Sık sorulan sorular" title="Merak" accent="ettikleriniz." />
        <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-card border border-white/10 bg-ink-800">
          {faq.map((f) => (
            <details key={f.q} className="group px-5 py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span aria-hidden className="text-2xl leading-none text-lime transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-4 text-fg-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CTASection tone="dark-2" />
    </>
  );
}
