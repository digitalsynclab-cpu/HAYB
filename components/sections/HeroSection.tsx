'use client';
import { GradientButton } from '@/components/ui/GradientButton';
import { FloatingMockup } from '@/components/motion/FloatingMockup';

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-screen flex items-center pt-16 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#2563EB]/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#818CF8]/[0.05] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#0EA5E9]/[0.04] blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        {/* Sol: Metin */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-xs text-[#8BA3C7] font-medium tracking-wide">Dijital Ürün Stüdyosu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#F0F6FF] leading-[1.15] tracking-tight">
            Fikirleri Gerçek{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
              Dijital Ürünlere
            </span>
            <br className="hidden sm:block" />
            {' '}Dönüştürüyorum
          </h1>

          <p className="text-base text-[#8BA3C7] leading-relaxed max-w-md">
            Web sistemleri, sosyal medya yönetimi, yapay zeka çözümleri
            ve özel yazılım ürünleri geliştiriyorum.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <GradientButton onClick={() => scrollTo('#portfolyo')}>
              Projeleri İncele
            </GradientButton>
            <button
              onClick={() => scrollTo('#iletisim')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-[#8BA3C7] border border-white/[0.10] hover:border-[#2563EB]/40 hover:text-[#F0F6FF] transition-all duration-200 min-h-[44px] text-sm"
            >
              İletişime Geç
            </button>
          </div>
        </div>

        {/* Sağ: Mockup */}
        <div className="relative lg:flex justify-end items-center">
          <FloatingMockup />
        </div>
      </div>
    </section>
  );
}
