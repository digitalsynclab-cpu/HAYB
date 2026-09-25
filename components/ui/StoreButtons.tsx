import Image from 'next/image';
import Link from 'next/link';
import { projects, type StoreLinks } from '@/data/projects';

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

/**
 * Mağazada yayında olan mobil uygulamalar (oyun dışı; oyun kendi bölümünde gösterilir).
 * Yalnızca gerçekten yayında olan ve mağaza bağlantısı bulunan projeler listelenir.
 */
export function LiveAppsShelf({ className = '' }: { className?: string }) {
  const apps = projects.filter((p) => p.stores && p.type !== 'Mobil Oyun');
  if (apps.length === 0) return null;
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${className}`} aria-label="Mağazada yayındaki uygulamalarımız">
      {apps.map((p) => (
        <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lime">Yayında</p>
            <Link href={`/projeler/${p.id}`} className="mt-0.5 block text-lg font-bold hover:text-lime">
              {p.name}
            </Link>
            <p className="text-sm text-fg-muted">{p.type}</p>
          </div>
          <StoreButtons stores={p.stores!} />
        </li>
      ))}
    </ul>
  );
}
