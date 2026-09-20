import type { ReactNode } from 'react';

export type Tone = 'dark' | 'dark-2' | 'light' | 'white';

interface SectionProps {
  tone?: Tone;
  /** Bir önceki bölümün üzerine yuvarlak köşeyle biner (sayfanın ilk bölümünde kapalı) */
  curve?: boolean;
  id?: string;
  labelledBy?: string;
  className?: string;
  /** Üst padding'i eğri payı kadar artırır */
  children: ReactNode;
}

export function Section({ tone = 'dark', curve = true, id, labelledBy, className = '', children }: SectionProps) {
  const toneCls = { dark: 'tone-dark', 'dark-2': 'tone-dark-2', light: 'tone-light', white: 'tone-white' }[tone];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneCls} ${curve ? 'section-curve' : ''} section-pad ${className}`}
    >
      {/* Eğri, önceki bölümün altına biner; içerik bu payı telafi etmek için aşağı itilir */}
      <div className={`mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8 ${curve ? 'pt-[calc(var(--hayb-curve)*0.5)]' : ''}`}>
        {children}
      </div>
    </section>
  );
}
