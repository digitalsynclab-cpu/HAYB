'use client';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { PricingPlan } from '@/types';

export function AddToCartButton({ plan, category }: { plan: PricingPlan; category: string }) {
  const { items, addItem } = useCart();
  const added = items.some((i) => i.plan.id === plan.id);
  return (
    <button
      type="button"
      onClick={() => addItem(plan, category)}
      aria-label={`${plan.name} paketini sepete ekle`}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-semibold transition ${
        added ? 'border border-on-light/25 bg-white text-on-light' : 'bg-on-light text-white hover:bg-on-light/85'
      }`}
    >
      <ShoppingCart aria-hidden className="h-5 w-5" />
      {added ? 'Sepette' : 'Sepete Ekle'}
    </button>
  );
}
