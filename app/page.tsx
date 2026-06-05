import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TechStack } from '@/components/ui/TechStack';
import { HAYBAssistant } from '@/components/ui/HAYBAssistant';
import { CartPanel } from '@/components/ui/CartPanel';
import { FloatingUIBackground } from '@/components/ui/FloatingUIBackground';

const ServicesSection = dynamic(() =>
  import('@/components/sections/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const UiUxSection = dynamic(() =>
  import('@/components/sections/UiUxSection').then((m) => ({ default: m.UiUxSection }))
);
const PortfolioSection = dynamic(() =>
  import('@/components/sections/PortfolioSection').then((m) => ({ default: m.PortfolioSection }))
);
const ReferencesSection = dynamic(() =>
  import('@/components/sections/ReferencesSection').then((m) => ({ default: m.ReferencesSection }))
);
const CapabilitiesSection = dynamic(() =>
  import('@/components/sections/CapabilitiesSection').then((m) => ({ default: m.CapabilitiesSection }))
);
const PricingSection = dynamic(() =>
  import('@/components/sections/PricingSection').then((m) => ({ default: m.PricingSection }))
);
const ProcessSection = dynamic(() =>
  import('@/components/sections/ProcessSection').then((m) => ({ default: m.ProcessSection }))
);
const AboutSection = dynamic(() =>
  import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ContactSection = dynamic(() =>
  import('@/components/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060B14] text-[#F0F6FF]">
      <FloatingUIBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="border-y border-[#2563EB]/08">
          <TechStack />
        </div>
        <ServicesSection />
        <UiUxSection />
        <PortfolioSection />
        <ReferencesSection />
        <CapabilitiesSection />
        <PricingSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <CartPanel />
      <HAYBAssistant />
    </div>
  );
}
