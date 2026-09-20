import Image from 'next/image';
import Link from 'next/link';
import { projectById } from '@/data/projects';
import { panelSamples } from '@/data/panels';

/** Kayan şerit kabuğu: sosyal medya şeridiyle aynı kalıp (hover/dokunmada durur, kopya ekran okuyuculardan gizli). */
function Marquee({ label, duration, children, dup }: { label: string; duration: string; children: React.ReactNode; dup: React.ReactNode }) {
  return (
    <div className="marquee rounded-2xl" role="group" aria-label={label}>
      <div className="marquee-track items-start py-2" style={{ animationDuration: duration }}>
        {children}
        <div className="marquee-dup contents" aria-hidden>
          {dup}
        </div>
      </div>
    </div>
  );
}

const APP_IDS = ['bbblock', 'bebeklersoruyor', 'ekotakippro', 'taleb-e'] as const;

function AppCard({ id, dup }: { id: (typeof APP_IDS)[number]; dup?: boolean }) {
  const p = projectById(id)!;
  return (
    <Link
      href={`/projeler/${p.id}`}
      tabIndex={dup ? -1 : undefined}
      className="group block w-[10.5rem] shrink-0 sm:w-[12.5rem]"
    >
      <span className="relative block aspect-[9/19] overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-800 shadow-glass transition group-hover:-translate-y-1.5 group-hover:border-lime/60">
        <Image src={p.gallery![0]} alt={dup ? '' : `${p.name} uygulama kapak görseli`} fill sizes="200px" className="object-cover object-top" />
      </span>
      <span className="mt-2 block text-center text-sm font-bold">{p.name}</span>
      <span className="block text-center text-xs text-fg-muted">İncele</span>
    </Link>
  );
}

/** Mobil uygulama kapakları: kayan şerit; her kart uygulamanın ekran görüntülerine gider. */
export function AppCovers() {
  return (
    <figure>
      <Marquee
        label="Mobil uygulama kapak görselleri"
        duration="50s"
        dup={APP_IDS.map((id) => (
          <AppCard key={`d-${id}`} id={id} dup />
        ))}
      >
        {APP_IDS.map((id) => (
          <AppCard key={id} id={id} />
        ))}
      </Marquee>
      <figcaption className="mt-3 text-sm text-fg-muted">Bir uygulamaya dokunun; ekran görüntülerini tek tek inceleyin. Üzerine gelince veya dokununca şerit durur.</figcaption>
    </figure>
  );
}

function PanelCard({ i, dup }: { i: number; dup?: boolean }) {
  const p = panelSamples[i];
  return (
    <figure className="w-[17.5rem] shrink-0 sm:w-[24rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-glass">
        <Image src={p.src} alt={dup ? '' : p.alt} fill sizes="(min-width:640px) 384px, 280px" className="object-cover object-top" />
      </div>
      <figcaption className="mt-2 text-center text-sm font-semibold">{p.name}</figcaption>
    </figure>
  );
}

/** Örnek yönetim panelleri: hepsi eşit (4:3) boyutlu kayan şerit. */
export function PanelSlider() {
  const idx = panelSamples.map((_, i) => i);
  return (
    <figure>
      <Marquee
        label="Örnek yönetim panelleri"
        duration="60s"
        dup={idx.map((i) => (
          <PanelCard key={`d-${i}`} i={i} dup />
        ))}
      >
        {idx.map((i) => (
          <PanelCard key={i} i={i} />
        ))}
      </Marquee>
      <figcaption className="mt-3 text-sm text-fg-muted">Örnek yönetim paneli tasarımlarıdır; markalar ve rakamlar demo veridir, gerçek müşteri verisi değildir.</figcaption>
    </figure>
  );
}
