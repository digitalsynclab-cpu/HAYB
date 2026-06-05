import type { ProcessStep as ProcessStepType } from '@/types';

interface ProcessStepProps {
  step: ProcessStepType;
  isLast?: boolean;
}

export function ProcessStep({ step, isLast }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Numara */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/20 border border-[#2563EB]/30 flex items-center justify-center mb-4 flex-shrink-0">
        <span className="text-sm font-bold text-[#2563EB]">{String(step.step).padStart(2, '0')}</span>
      </div>
      <h3 className="text-[#F0F6FF] font-semibold text-base mb-2">{step.title}</h3>
      <p className="text-[#8BA3C7] text-sm leading-relaxed">{step.description}</p>

      {/* Ok — masaüstünde sağa, mobilde aşağı */}
      {!isLast && (
        <>
          {/* Masaüstü: sağa ok */}
          <div className="hidden lg:block absolute top-6 -right-1/2 w-full" aria-hidden="true">
            <svg className="w-full h-4 text-[#2563EB]/25" viewBox="0 0 100 16" fill="none">
              <path d="M0 8 H88 M88 3 L96 8 L88 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Mobil: aşağı ok */}
          <div className="lg:hidden mt-4 mb-2" aria-hidden="true">
            <svg className="w-4 h-8 text-[#2563EB]/25 mx-auto" viewBox="0 0 16 32" fill="none">
              <path d="M8 0 V26 M3 21 L8 29 L13 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}


