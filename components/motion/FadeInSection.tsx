'use client';
import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMotionConfig } from '@/hooks/useReducedMotion';

interface FadeInSectionProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

export function FadeInSection({ children, threshold = 0.05, className }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const { shouldReduce } = useMotionConfig();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduce ? 0 : 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
