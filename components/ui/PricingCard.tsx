'use client';
import { Check, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import type { PricingPlan } from '@/types';

interface PricingCardProps {
  plan: PricingPlan;
  category: string;
  isInquiry?: boolean; // Teklif Al → WhatsApp'a yönlendir
}

const WHATSAPP_NUMBER = '905073420661';

function FeatureText({ text }: { text: string }) {
  const parts = text.split(/(\([^)]+\))/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('(') && part.endsWith(')') ? (
          <span key={i} className="text-[#8BA3C7]/50 text-[11px] ml-0.5">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export function PricingCard({ plan, category, isInquiry = false }: PricingCardProps) {
  const { addItem } = useCart();

  const handleInquiry = () => {
    const featuresText = plan.features.map(f => `  • ${f}`).join('\n');
    const msg = `Merhaba! "${plan.name}" paketi hakkında bilgi almak istiyorum.\n\nPaket içeriği:\n${featuresText}\n\nDetaylı bilgi verir misiniz?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      className={cn(
        'relative flex flex-col p-5 rounded-2xl border bg-[#0D1526] transition-all duration-300',
        plan.recommended
          ? 'border-[#2563EB]/40 shadow-lg shadow-[#2563EB]/10'
          : 'border-[#2563EB]/10'
      )}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white whitespace-nowrap">
            Önerilen
          </span>
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-[#F0F6FF] font-bold text-base mb-1">{plan.name}</h3>
        <span className="text-xl font-bold text-[#F0F6FF]">{plan.price}</span>
      </div>

      <ul className="space-y-2.5 flex-1 mb-5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#2563EB]/20 flex items-center justify-center mt-0.5">
              <Check size={9} className="text-[#3B82F6]" aria-hidden="true" />
            </div>
            <span className="text-[#8BA3C7] text-[13px] leading-snug">
              <FeatureText text={feature} />
            </span>
          </li>
        ))}
      </ul>

      {isInquiry ? (
        <button
          onClick={handleInquiry}
          className="w-full py-3 rounded-xl font-semibold text-sm border border-[#2563EB]/20 text-[#F0F6FF] hover:border-[#2563EB]/40 hover:bg-[#2563EB]/08 active:scale-[0.98] transition-all duration-200 min-h-[44px]"
        >
          Bilgi Al
        </button>
      ) : (
        <button
          onClick={() => addItem(plan, category)}
          className={cn(
            'w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2',
            plan.recommended
              ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white hover:opacity-90 active:scale-[0.98]'
              : 'border border-[#2563EB]/20 text-[#F0F6FF] hover:border-[#2563EB]/40 hover:bg-[#2563EB]/08 active:scale-[0.98]'
          )}
        >
          <ShoppingCart size={15} aria-hidden="true" />
          Sepete Ekle
        </button>
      )}
    </article>
  );
}
