'use client';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { ContactForm } from '@/components/ui/ContactForm';

export function ContactSection() {
  return (
    <SectionWrapper id="iletisim" titleId="iletisim-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="iletisim-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
              Projeni Gerçeğe Dönüştürelim
            </h2>
            <p className="text-[#8BA3C7]">
              Projenizi anlatın. Size en kısa sürede dönüş yapacağım.
            </p>
          </div>
          <ContactForm />
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}

