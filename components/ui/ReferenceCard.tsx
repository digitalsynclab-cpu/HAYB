import type { Reference } from '@/types';
import { cn } from '@/lib/utils';

const brandColors: Record<string, string> = {
  Stripe: 'from-violet-500/10 to-blue-500/10 border-violet-500/20',
  Linear: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20',
  Vercel: 'from-white/5 to-white/10 border-white/15',
  Apple: 'from-gray-500/10 to-gray-400/10 border-gray-500/20',
  Notion: 'from-amber-500/10 to-orange-400/10 border-amber-500/20',
};

interface ReferenceCardProps {
  reference: Reference;
}

export function ReferenceCard({ reference }: ReferenceCardProps) {
  const colorClass = brandColors[reference.brand] ?? 'from-white/5 to-white/5 border-white/10';

  return (
    <article
      className={cn(
        'rounded-2xl border bg-gradient-to-br p-6',
        colorClass,
        'transition-all duration-300 hover:-translate-y-0.5'
      )}
    >
      <h3 className="text-[#F0F6FF] font-bold text-lg mb-5">{reference.brand}</h3>
      <div className="space-y-4">
        {[
          { label: 'Tasarım Yaklaşımı', value: reference.approach },
          { label: 'Renk Dili', value: reference.colorLanguage },
          { label: 'UI/UX Prensibi', value: reference.uiPrinciple },
          { label: 'Kullanıcı Deneyimi', value: reference.uxNote },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8BA3C7]/70 mb-1">
              {item.label}
            </p>
            <p className="text-[#8BA3C7] text-xs leading-relaxed">{item.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

