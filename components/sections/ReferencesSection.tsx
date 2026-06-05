import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { ReferenceCard } from '@/components/ui/ReferenceCard';
import { references } from '@/data/references';

export function ReferencesSection() {
  return (
    <SectionWrapper id="referanslar" titleId="referanslar-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="text-center mb-12">
          <h2 id="referanslar-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
            Referans Aldığım Dijital Ürün Standartları
          </h2>
          <p className="text-[#8BA3C7] max-w-xl mx-auto">
            Tasarım kalitemi bu ürünlerin standardına göre ölçüyorum.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {references.map((ref) => (
            <ReferenceCard key={ref.brand} reference={ref} />
          ))}
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}

