import Image from 'next/image';
import type { StoreLinks } from '@/data/projects';

/**
 * App Store / Google Play bağlantıları: resmî rozetler (Apple ve Google'ın markalama yönergelerine uygun,
 * değiştirilmeden kullanılır). Harici, güvenli bağlantı.
 */
export function StoreButtons({ stores, className = '' }: { stores: StoreLinks; className?: string }) {
  const base = 'press inline-block shrink-0 rounded-lg transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-offset-4';
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {stores.appStore && (
        <a href={stores.appStore} target="_blank" rel="noopener noreferrer" className={base} aria-label="App Store'dan indir">
          <Image src="/brand/stores/appstore-tr.svg" alt="App Store'dan indirin" width={151} height={40} unoptimized className="h-12 w-auto" />
        </a>
      )}
      {stores.googlePlay && (
        <a href={stores.googlePlay} target="_blank" rel="noopener noreferrer" className={base} aria-label="Google Play'den edinin">
          <Image src="/brand/stores/googleplay-tr.png" alt="Google Play'den edinin" width={646} height={192} className="h-12 w-auto" />
        </a>
      )}
    </div>
  );
}
