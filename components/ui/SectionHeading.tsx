import type { ReactNode } from 'react';
import { SplitHeading } from '@/components/motion/SplitText';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-muted">
      <span aria-hidden className="h-2 w-2 rounded-full bg-lime" />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  /** Vurgu rengiyle çizilen ikinci parça */
  accent?: string;
  text?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
  /** Sağ tarafta (masaüstünde) yer alacak eylem */
  action?: ReactNode;
}

export function SectionHeading({ id, eyebrow, title, accent, text, as: H = 'h2', className = '', action }: SectionHeadingProps) {
  return (
    <div className={`mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <SplitHeading
          as={H}
          id={id}
          title={title}
          accent={accent}
          className={`text-balance font-extrabold leading-[1.08] tracking-tight ${H === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-[1.9rem] sm:text-4xl lg:text-[2.75rem]'}`}
        />
        {text && <p className="mt-4 max-w-xl text-lg text-muted">{text}</p>}
      </div>
      {action}
    </div>
  );
}
