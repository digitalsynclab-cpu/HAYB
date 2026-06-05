import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { ProcessStep } from '@/components/ui/ProcessStep';
import { processSteps } from '@/data/process';

export function ProcessSection() {
  return (
    <SectionWrapper id="surec" titleId="surec-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="text-center mb-12">
          <h2 id="surec-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
            Çalışma Sürecim
          </h2>
          <p className="text-[#8BA3C7] max-w-xl mx-auto">
            Her projede izlediğim 4 adımlı süreç.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.step}
              step={step}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}

