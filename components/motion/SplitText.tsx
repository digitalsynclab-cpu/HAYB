import { Fragment, type ElementType } from 'react';

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Tüm kelimelere eklenen gecikme (ms) */
  delay?: number;
  /** Bu kelimeler vurgu rengiyle çizilir */
  accent?: boolean;
  /** Kelime sırası başlangıcı (birden fazla SplitText birleşiyorsa) */
  offset?: number;
}

/**
 * Kelime kelime blur→net giriş animasyonu (21st.dev "Words Stagger" yaklaşımı, CSS ile).
 * Server component: JS yoksa metin normal görünür; animasyonu RevealObserver `.is-visible` ile başlatır.
 * Ekran okuyucular için tam metin aria-label ile verilir, kelime parçaları gizlenir.
 */
export function SplitWords({ text, accent, delay = 0, offset = 0 }: Pick<SplitTextProps, 'text' | 'accent' | 'delay' | 'offset'>) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden className={`w ${accent ? 'accent-text' : ''}`} style={{ ['--i' as string]: i + offset, ['--d' as string]: `${delay}ms` }}>
            {w}
          </span>
          {/* Boşluk span'ın DIŞINDA: inline-block içindeki sondaki boşluk silinir ve kelimeler yapışırdı */}
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </>
  );
}

/** Başlık + vurgu satırı: tek bir animasyon zinciri olarak çizer. */
export function SplitHeading({
  as: Tag = 'h2',
  id,
  title,
  accent,
  className = '',
  delay = 0,
}: {
  as?: ElementType;
  id?: string;
  title: string;
  accent?: string;
  className?: string;
  delay?: number;
}) {
  const n = title.split(/\s+/).filter(Boolean).length;
  return (
    <Tag id={id} data-split className={`split-words ${className}`} aria-label={accent ? `${title} ${accent}` : title}>
      <SplitWords text={title} delay={delay} />
      {accent && (
        <>
          {' '}
          <SplitWords text={accent} accent delay={delay} offset={n} />
        </>
      )}
    </Tag>
  );
}
