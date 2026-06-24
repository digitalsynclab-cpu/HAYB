'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  titleId?: string;
}

export function SectionWrapper({ id, children, className, titleId }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion — skip animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      className={cn(
        'reveal-section py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </section>
  );
}
