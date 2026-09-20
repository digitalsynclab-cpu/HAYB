'use client';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

/**
 * Üst menüde sepet simgesi: sepette ürün varsa görünür, sosyal medya bildirimi gibi kırmızı yuvarlak
 * içinde ürün sayısını gösterir. Sayı değişince rozet zıplar.
 */
export function CartButton() {
  const { items, setIsOpen } = useCart();
  const n = items.length;
  if (n === 0) return null;
  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      aria-label={`Sepetim, ${n} ürün`}
      className="press cart-in relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-fg transition hover:border-lime/60"
    >
      <ShoppingBag aria-hidden className="h-5 w-5 text-lime" />
      <span key={n} aria-hidden className="cart-badge">
        {n}
      </span>
    </button>
  );
}
