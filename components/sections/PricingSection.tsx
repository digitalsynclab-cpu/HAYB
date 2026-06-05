'use client';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { PricingCard } from '@/components/ui/PricingCard';
import { pricingPlans, socialMediaPlans, qrMenuPlans } from '@/data/pricing';
import { Globe, Share2, QrCode } from 'lucide-react';

const categories = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Geliştirme',
    description: 'Kurumsal web sitesi ve özel yazılım projeleri için.',
    plans: pricingPlans,
    note: 'Tüm web paketlerinde mobil ve masaüstü uyumlu çalışma garantisi verilmektedir.',
    // Son paket (Özel Yazılım - Teklif Al) inquiry
    inquiryLastPlan: true,
  },
  {
    id: 'sosyal',
    icon: Share2,
    title: 'Sosyal Medya Yönetimi',
    description: 'Haftalık, aylık ve 3 aylık içerik üretim paketleri.',
    plans: socialMediaPlans,
    note: 'Tasarımlar sektöre özel hazırlanır. Logo ve marka kimlik çalışmaları dahildir.',
    inquiryLastPlan: false,
  },
  {
    id: 'qr',
    icon: QrCode,
    title: 'QR Menü Sistemi',
    description: 'Restoran ve kafeler için dijital menü çözümleri.',
    plans: qrMenuPlans,
    note: null,
    inquiryLastPlan: false,
  },
];

export function PricingSection() {
  return (
    <SectionWrapper id="fiyatlandirma" titleId="fiyatlandirma-baslik" className="border-t border-white/[0.06]">
      <div className="mb-12">
        <h2 id="fiyatlandirma-baslik" className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-3">
          Fiyatlandırma
        </h2>
        <p className="text-[#8BA3C7] text-sm max-w-lg">
          İhtiyacınıza uygun paketi seçin.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const lastIdx = cat.plans.length - 1;
          return (
            <div key={cat.id}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB]/12 border border-[#2563EB]/20 flex items-center justify-center text-[#60A5FA] flex-shrink-0">
                  <Icon size={16} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#F0F6FF]">{cat.title}</h3>
              </div>
              <p className="text-[#8BA3C7] text-sm mb-5 pl-11">{cat.description}</p>

              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
                {cat.plans.map((plan, idx) => (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    category={cat.title}
                    isInquiry={cat.inquiryLastPlan && idx === lastIdx}
                  />
                ))}
              </div>

              {cat.note && (
                <div className="mt-4 flex items-start gap-2 px-4 py-3 rounded-xl bg-[#2563EB]/[0.05] border border-[#2563EB]/12">
                  <div className="w-1 h-1 rounded-full bg-[#60A5FA] mt-1.5 flex-shrink-0" />
                  <p className="text-[#8BA3C7] text-xs leading-relaxed">{cat.note}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
