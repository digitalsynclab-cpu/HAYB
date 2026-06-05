'use client';
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

export function useMotionConfig() {
  const shouldReduce = useFramerReducedMotion();
  return {
    shouldReduce: shouldReduce ?? false,
    transition: (base: number) => ({ duration: shouldReduce ? 0 : base }),
  };
}
