import type { ComponentProps, ReactNode } from 'react';

const control =
  'min-h-12 w-full rounded-xl border bg-ink-950/60 px-4 text-base text-fg placeholder:text-fg-muted/70 transition focus:border-lime';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: (a: { id: string; describedBy?: string; invalid: boolean; className: string }) => ReactNode;
}

/** Etiket + kontrol + hata/ipucu; aria-invalid ve aria-describedby otomatik bağlanır. */
export function Field({ id, label, error, hint, children }: FieldProps) {
  const errId = error ? `${id}-hata` : undefined;
  const hintId = hint ? `${id}-ipucu` : undefined;
  const describedBy = [errId, hintId].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.95rem] font-semibold">
        {label}
      </label>
      {children({ id, describedBy, invalid: Boolean(error), className: `${control} ${error ? 'border-red-400' : 'border-white/15'}` })}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-fg-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-sm font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputProps = (a: { id: string; describedBy?: string; invalid: boolean; className: string }) => ({
  id: a.id,
  'aria-describedby': a.describedBy,
  'aria-invalid': a.invalid || undefined,
  className: a.className,
});

export type NativeInput = ComponentProps<'input'>;
