import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'secondary-light' | 'glass';

const base =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-base font-semibold leading-none transition duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-lime text-ink-950 hover:bg-lime-soft',
  secondary:
    'border border-white/20 bg-white/5 text-fg hover:border-white/40 hover:bg-white/10',
  'secondary-light':
    'border border-on-light/20 bg-white text-on-light hover:border-on-light/50 hover:bg-paper-100',
  /** Apple tarzı buzlu cam: yarı saydam beyaz + blur, koyu zeminlerde kullanılır. */
  glass:
    'border border-white/40 bg-white/70 text-ink-950 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/85',
};

interface Common {
  variant?: Variant;
  /** Sağdaki ok. Varsayılan: primary'de açık */
  arrow?: boolean;
  icon?: ReactNode;
  /** Sağ kenarda, ok yerine gösterilecek ikon (arrow ile birlikte kullanılmaz). */
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type LinkProps = Common & { href: string; external?: boolean } & Omit<ComponentProps<'a'>, keyof Common | 'href'>;
type ButtonProps = Common & { href?: undefined } & Omit<ComponentProps<'button'>, keyof Common>;

export function Button(props: LinkProps | ButtonProps) {
  const { variant = 'primary', arrow, icon, trailingIcon, className = '', children } = props;
  const showArrow = arrow ?? variant === 'primary';
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {trailingIcon}
      {showArrow && (
        <ArrowRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, ...rest } = stripCommon(props as LinkProps);
    if (external || /^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  const { type = 'button', ...rest } = stripCommon(props as ButtonProps);
  return (
    <button type={type} className={cls} {...rest}>
      {inner}
    </button>
  );
}

/** Ortak (Button'a özgü) prop'ları ayıklar; kalanı DOM'a aktarılır. */
function stripCommon<T extends Common>(props: T): Omit<T, keyof Common> {
  const rest: Partial<T> = { ...props };
  delete rest.variant;
  delete rest.arrow;
  delete rest.icon;
  delete rest.trailingIcon;
  delete rest.className;
  delete rest.children;
  return rest as Omit<T, keyof Common>;
}
