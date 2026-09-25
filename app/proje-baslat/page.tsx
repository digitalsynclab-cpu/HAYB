import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ProjectWizard } from '@/components/forms/ProjectWizard';
import { IconCard } from '@/components/ui/Cards';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Proje Başlat: Teklif Al',
  description: 'Projenizi dört kısa adımda anlatın, size en uygun çözümü ve teklifi hazırlayalım.',
  path: '/proje-baslat',
});

export default function StartProjectPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ana Sayfa', path: '/' }, { name: 'Proje Başlat', path: '/proje-baslat' }]} />
      <PageHero
        eyebrow="Proje başlat"
        title="Fikrinizi"
        accent="gerçeğe dönüştürelim."
        text="Sadece birkaç adımda projenizi bizimle paylaşın. Size en uygun çözümü sunmak için buradayız."
      />
      <Section tone="dark-2" labelledBy="sihirbaz-baslik">
        <h2 id="sihirbaz-baslik" className="sr-only">
          Proje başlatma formu
        </h2>
        <div className="grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
          <ProjectWizard />
          <aside aria-label="Bilgi" className="space-y-4">
            <IconCard icon="iletisim" title="Kısa ve net" text="Sorular kısa; bilmediğiniz bir yeri boş bırakabilir, birlikte netleştirebiliriz." tone="dark" />
            <IconCard icon="veriguvenligi" title="Bilgileriniz güvende" text="Paylaştığınız bilgiler yalnızca proje talebiniz için kullanılır." tone="dark" />
          </aside>
        </div>
      </Section>
    </>
  );
}
