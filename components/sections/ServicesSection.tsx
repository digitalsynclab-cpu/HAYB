import {
  Globe, Code2, LayoutDashboard, Share2, Layers, PenLine,
} from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { services } from '@/data/services';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={22} />,
  Share2: <Share2 size={22} />,
  Pen: <PenLine size={22} />,
  Code2: <Code2 size={22} />,
  LayoutDashboard: <LayoutDashboard size={22} />,
  Layers: <Layers size={22} />,
};

// Bento layout — düz eşit grid, highlighted efekti yok
const bentoClasses = [
  'sm:col-span-2',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-2',
];

export function ServicesSection() {
  return (
    <SectionWrapper id="hizmetler" titleId="hizmetler-baslik">
      <FadeInSection>
        <div className="mb-12">
          <h2 id="hizmetler-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
            Hizmetlerim
          </h2>
          <p className="text-[#8BA3C7] max-w-lg">
            Fikrinizi ürüne dönüştürmek için ihtiyacınız olan her şey.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`
                group p-6 rounded-2xl border border-[#2563EB]/10 bg-[#0D1526] flex flex-col gap-4
                transition-all duration-300 hover:bg-[#111E35] hover:border-[#2563EB]/30
                hover:-translate-y-0.5
                ${bentoClasses[idx] ?? ''}
              `}
            >
              <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 text-[#60A5FA] flex items-center justify-center group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                {iconMap[service.icon]}
              </div>
              <div>
                <h3 className="text-[#F0F6FF] font-semibold text-base mb-1.5">{service.title}</h3>
                <p className="text-[#8BA3C7] text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}
