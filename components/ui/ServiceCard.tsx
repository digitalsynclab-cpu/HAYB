import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        'group p-6 rounded-2xl border border-white/[0.08] bg-[#111E35]',
        'transition-all duration-300',
        'hover:bg-[#172240] hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/30',
        'hover:-translate-y-0.5',
        className
      )}
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/20 border border-white/[0.08] flex items-center justify-center mb-4 text-[#2563EB] group-hover:from-[#2563EB]/30 group-hover:to-[#3B82F6]/30 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-[#F0F6FF] font-semibold text-base mb-2">{title}</h3>
      <p className="text-[#8BA3C7] text-sm leading-relaxed">{description}</p>
    </article>
  );
}


