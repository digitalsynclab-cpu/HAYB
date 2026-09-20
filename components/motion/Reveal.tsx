import type { CSSProperties, ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** ms cinsinden gecikme (kademeli giriş için) */
  delay?: number;
  /** Görünürken blur → net geçişi */
  blur?: boolean;
}

/** Server component: yalnızca data-reveal işaretler; animasyonu RevealObserver yürütür. */
export function Reveal({ children, as: Tag = 'div', className, delay = 0, blur = false }: RevealProps) {
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag data-reveal className={`${blur ? 'reveal-blur ' : ''}${className ?? ''}`} style={style}>
      {children}
    </Tag>
  );
}
