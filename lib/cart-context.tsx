'use client';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { PricingPlan } from '@/types';
import { addToCart, type CartItem } from '@/lib/messages';

interface CartContextType {
  items: CartItem[];
  addItem: (plan: PricingPlan, category: string) => void;
  removeItem: (planId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((plan: PricingPlan, category: string) => {
    setItems((prev) => addToCart(prev, plan, category));
    setIsOpen(true);
  }, []);
  const removeItem = useCallback((id: string) => setItems((p) => p.filter((i) => i.plan.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, isOpen, setIsOpen }),
    [items, addItem, removeItem, clearCart, isOpen],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
