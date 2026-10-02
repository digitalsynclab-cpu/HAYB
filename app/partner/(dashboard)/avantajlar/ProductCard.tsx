'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { StartOrderForm, PremiumOrderForm } from './OrderForm';

export function ProductCard({
  slug,
  name,
  tagline,
  price,
  ctaLabel,
  features,
  highlight,
}: {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  ctaLabel: string;
  features: string[];
  highlight?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-3xl border p-6 ${highlight ? 'border-lime/40 bg-gradient-to-br from-lime/10 via-white/5 to-transparent' : 'border-white/10 bg-white/5'}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-lime">{name}</p>
      <h2 className="mt-1 text-xl font-bold">{tagline}</h2>
      <p className="mt-2">
        <span className="text-3xl font-extrabold">{price.toLocaleString('tr-TR')} ₺</span>
        <span className="ml-2 text-xs text-fg-muted">Partner özel fiyatı</span>
      </p>

      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
            {f}
          </li>
        ))}
      </ul>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mt-5 w-full rounded-xl px-6 py-3 text-sm font-semibold ${highlight ? 'bg-lime text-ink-950 hover:bg-lime-soft' : 'border border-white/20 hover:border-white/40'}`}
        >
          {ctaLabel}
        </button>
      ) : (
        <div className="mt-5">{slug === 'partner-premium' ? <PremiumOrderForm productSlug={slug} /> : <StartOrderForm productSlug={slug} />}</div>
      )}
    </div>
  );
}
