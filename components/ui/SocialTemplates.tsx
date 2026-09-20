import Image from 'next/image';
import { socialTemplates } from '@/data/social';

function Card({ t, dup }: { t: (typeof socialTemplates)[number]; dup?: boolean }) {
  const story = t.kind === 'story';
  return (
    <figure
      aria-hidden={dup || undefined}
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-glass ${story ? 'w-[9.5rem] sm:w-[11rem]' : 'w-[16.5rem] sm:w-[19rem]'}`}
    >
      <div className={`relative ${story ? 'aspect-[9/16]' : 'aspect-square'}`}>
        <Image src={t.src} alt={dup ? '' : t.alt} fill sizes={story ? '176px' : '304px'} className="object-cover" />
      </div>
      <figcaption className="absolute left-2.5 top-2.5 rounded-full bg-ink-950/75 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-lime backdrop-blur">
        {story ? 'Story' : 'Post'}
      </figcaption>
    </figure>
  );
}

/**
 * Sosyal medya örnek şablonları: yatay, sonsuz kayan şerit (hover/dokunmada durur).
 * Hareket azaltma tercihinde animasyon kapanır, şerit elle kaydırılır.
 */
export function SocialTemplates({ className = '' }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="marquee rounded-2xl" role="group" aria-label="Sosyal medya örnek şablonları">
        <div className="marquee-track items-center py-2">
          {socialTemplates.map((t) => (
            <Card key={t.src} t={t} />
          ))}
          {/* Kesintisiz döngü için ikinci kopya (ekran okuyuculardan gizli) */}
          {socialTemplates.map((t) => (
            <div key={`d-${t.src}`} className="marquee-dup" aria-hidden>
              <Card t={t} dup />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-fg-muted">Örnek şablon tasarımlarıdır; gerçek müşteri paylaşımı değildir. Üzerine gelince veya dokununca durur.</figcaption>
    </figure>
  );
}
