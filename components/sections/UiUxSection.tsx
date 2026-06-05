import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { MockupGallery } from '@/components/ui/MockupGallery';

export function UiUxSection() {
  return (
    <SectionWrapper id="uiux" titleId="uiux-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="mb-12">
          <h2 id="uiux-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
            Tasarım Örnekleri
          </h2>
          <p className="text-[#8BA3C7] max-w-lg">
            Kullanıcı deneyimini ön planda tutan, gerçek ürün hissi veren arayüz tasarımları.
          </p>
        </div>
        <MockupGallery />
      </FadeInSection>
    </SectionWrapper>
  );
}
