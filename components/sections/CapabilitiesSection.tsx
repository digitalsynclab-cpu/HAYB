import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { TerminalBlock } from '@/components/ui/TerminalBlock';
import { capabilities } from '@/data/capabilities';
import {
  Lightbulb, Target, Monitor, Server, Database, Search, Rocket, Settings, PenLine,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb size={18} />,
  Target: <Target size={18} />,
  Figma: <Monitor size={18} />,
  PenLine: <PenLine size={18} />,
  Monitor: <Monitor size={18} />,
  Server: <Server size={18} />,
  Database: <Database size={18} />,
  Search: <Search size={18} />,
  Rocket: <Rocket size={18} />,
  Settings: <Settings size={18} />,
};

export function CapabilitiesSection() {
  return (
    <SectionWrapper id="yetenekler" titleId="yetenekler-baslik" className="border-t border-white/[0.06]">
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Sol: başlık + adım listesi */}
          <div>
            <h2 id="yetenekler-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-4">
              Bir Fikirle Geldiğinizde Uçtan Uca Yönetebilirim
            </h2>
            <p className="text-[#8BA3C7] mb-8">
              Fikir analizinden yayına almaya kadar tüm adımları tek elden yürütüyorum.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.step}
                  className="flex gap-3 p-4 rounded-xl border border-[#2563EB]/10 bg-[#0D1526] hover:border-[#2563EB]/25 hover:bg-[#111E35] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#2563EB]/12 flex items-center justify-center text-[#60A5FA]">
                    {iconMap[cap.icon] ?? <span className="text-xs font-bold text-[#2563EB]">{cap.step}</span>}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-bold text-[#2563EB]/60 font-mono">{String(cap.step).padStart(2, '0')}</span>
                      <h3 className="text-[#F0F6FF] font-medium text-sm">{cap.title}</h3>
                    </div>
                    <p className="text-[#8BA3C7] text-xs leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Terminal animasyonu */}
          <div className="lg:sticky lg:top-24">
            <TerminalBlock />
            <p className="text-[#8BA3C7]/50 text-xs text-center mt-4 font-mono">
              // Her proje bu süreçten geçer
            </p>
          </div>
        </div>
      </FadeInSection>
    </SectionWrapper>
  );
}
