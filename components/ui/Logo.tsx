import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  /** Koyu zeminde beyaz, açık zeminde koyu yazı */
  tone?: 'dark' | 'light';
  size?: number;
}

/**
 * HAYB logosu: gerçek logo asset'i (HaybLOGO.png → public/brand/hayb-mark-small.png, 6 diamond).
 * Şekil, oran ve renk değiştirilmez; yanına yalnızca "HAYB." yazısı eklenir.
 */
export function Logo({ className = '', tone = 'dark', size = 40 }: LogoProps) {
  return (
    <Link href="/" aria-label="HAYB ana sayfa" className={`inline-flex items-center gap-2.5 rounded-md ${className}`}>
      <Image src="/brand/hayb-mark-small.png" alt="" width={size} height={size} className="shrink-0" style={{ width: size, height: size }} />
      <span
        className={`whitespace-nowrap text-[1.55rem] font-extrabold leading-none tracking-tight ${tone === 'dark' ? 'text-fg' : 'text-on-light'}`}
      >
        HAYB<span className="text-lime">.</span>
      </span>
    </Link>
  );
}
