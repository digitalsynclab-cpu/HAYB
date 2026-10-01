import type { ComponentProps } from 'react';
import { Check } from 'lucide-react';

type Props = Omit<ComponentProps<'input'>, 'type'> & { label: React.ReactNode };

/** Tarayıcılar arası tutarlı görünüm için native checkbox appearance kapatılır, kutu/tik özel çizilir. */
export function Checkbox({ label, className = '', ...rest }: Props) {
  return (
    <label className={`inline-flex cursor-pointer items-start gap-3 text-sm text-fg-muted ${className}`}>
      <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/25 bg-ink-950/60 transition has-[:checked]:border-lime has-[:checked]:bg-lime has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-lime">
        <input type="checkbox" className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none" {...rest} />
        <Check aria-hidden className="pointer-events-none hidden h-3.5 w-3.5 text-ink-950 peer-checked:block" />
      </span>
      <span className="leading-5">{label}</span>
    </label>
  );
}
