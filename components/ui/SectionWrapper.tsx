import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  titleId?: string;
}

export function SectionWrapper({ id, children, className, titleId }: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto', className)}
    >
      {children}
    </section>
  );
}
