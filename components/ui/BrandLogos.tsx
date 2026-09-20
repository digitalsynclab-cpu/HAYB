import Image from 'next/image';
import { brandLogos } from '@/data/brands';

function Logo({ b, dup }: { b: (typeof brandLogos)[number]; dup?: boolean }) {
  return (
    <figure aria-hidden={dup || undefined} className="w-[8.5rem] shrink-0 text-center sm:w-[11rem]">
      <Image src={b.src} alt={dup ? '' : `${b.name} logosu (örnek marka tasarımı)`} width={640} height={640} sizes="176px" className="h-auto w-full transition duration-500 hover:-translate-y-1.5 hover:scale-[1.05]" />
      <figcaption className="mt-2 text-sm font-semibold">{b.name}</figcaption>
    </figure>
  );
}

/** Marka tasarımı örnek logoları: sonsuz kayan şerit (hover/dokunmada durur), sosyal medya şeridiyle aynı kalıp. */
export function BrandLogos() {
  return (
    <figure>
      <div className="marquee rounded-2xl" role="group" aria-label="Örnek marka logoları">
        <div className="marquee-track items-start py-2" style={{ animationDuration: '45s' }}>
          {brandLogos.map((b) => (
            <Logo key={b.name} b={b} />
          ))}
          {brandLogos.map((b) => (
            <div key={`d-${b.name}`} className="marquee-dup" aria-hidden>
              <Logo b={b} dup />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-fg-muted">Örnek marka tasarımlarıdır; kurgusal markalar üzerinde hazırlanmış logo ve uygulama ikonu çalışmalarıdır. Logo tasarımı 499 ₺.</figcaption>
    </figure>
  );
}
