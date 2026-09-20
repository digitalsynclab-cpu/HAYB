import Image from 'next/image';
import { iconSrc, type IconName } from '@/data/icons';

interface Icon3DProps {
  name: IconName;
  /** Görüntülenen kenar uzunluğu (px). fluid ise yalnızca --sz değişkeni olarak verilir. */
  size?: number;
  className?: string;
  priority?: boolean;
  /** Dekoratif ise boş bırakın; anlam taşıyorsa metin verin */
  alt?: string;
  /**
   * fluid: boyut sınıflarla (responsive) yönetilir; ör. "h-14 w-14 sm:h-[var(--sz)] sm:w-[var(--sz)]".
   * Aksi halde sabit px boyutu kullanılır.
   */
  fluid?: boolean;
}

/**
 * HAYB 3D icon seti. Asset olduğu gibi gösterilir: glow, gölge, filtre veya
 * gradient eklenmez. CSS yalnızca boyut ve konum içindir.
 */
export function Icon3D({ name, size = 72, className = '', priority = false, alt = '', fluid = false }: Icon3DProps) {
  return (
    <Image
      src={iconSrc(name)}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={`object-contain ${className}`}
      style={fluid ? ({ ['--sz' as string]: `${size}px` } as React.CSSProperties) : { width: size, height: size }}
    />
  );
}
