import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { projects } from '@/data/portfolio';
import { ImagePlus } from 'lucide-react';

export function PortfolioSection() {
  return (
    <SectionWrapper id="portfolyo" titleId="portfolyo-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="mb-12">
          <h2 id="portfolyo-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
            Projeler
          </h2>
          <p className="text-[#8BA3C7] max-w-lg">
            Tasarladığım ve geliştirdiğim dijital ürünler.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-dashed border-[#2563EB]/15 bg-[#0D1526] min-h-[260px] flex flex-col items-center justify-center gap-4 p-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/08 border border-[#2563EB]/12 flex items-center justify-center">
                  <ImagePlus size={20} className="text-[#2563EB]/40" aria-hidden="true" />
                </div>
                <p className="text-[#8BA3C7]/40 text-sm font-medium">Yakında</p>
              </div>
            ))}
          </div>
        )}
      </FadeInSection>
    </SectionWrapper>
  );
}
