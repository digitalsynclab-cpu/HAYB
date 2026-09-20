import { priceParts } from '@/data/campaign';

/**
 * E-ticaret tarzı fiyat: üstü çizili liste fiyatı, kampanya fiyatı ve indirim rozeti.
 * tone: fiyatın zemin rengine göre okunurluğu (lime zeminde siyah rozet).
 */
export function Price({
  price,
  tone = 'light',
  className = '',
  size = 'lg',
}: {
  price: string;
  tone?: 'light' | 'lime' | 'dark';
  className?: string;
  size?: 'lg' | 'md';
}) {
  const p = priceParts(price);
  if (!p) return <span className={className}>{price}</span>;
  const badge = tone === 'lime' ? 'bg-ink-950 text-lime' : 'bg-lime text-ink-950';
  const strike = tone === 'dark' ? 'text-white/55' : tone === 'lime' ? 'text-ink-950/60' : 'text-on-light-muted';
  return (
    <span className={`block ${className}`}>
      <span className="sr-only">
        Liste fiyatı {p.list}, %{p.rate} kampanya ile {p.sale} {p.suffix}
      </span>
      <span aria-hidden className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <s className={`text-base font-semibold decoration-2 ${strike}`}>{p.list}</s>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold tracking-wide ${badge}`}>%{p.rate} İNDİRİM</span>
      </span>
      <span aria-hidden className={`mt-0.5 block font-extrabold tracking-tight ${size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>
        {p.sale}
        {p.suffix && <span className="ml-1.5 text-base font-semibold opacity-70">{p.suffix}</span>}
      </span>
    </span>
  );
}
