'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { PricingPlan } from '@/types';
import { addToCart, type CartItem } from '@/lib/messages';

const CART_STORAGE_KEY = 'hayb-cart-v1';

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem => i && typeof i === 'object' && typeof i.category === 'string' && i.plan && typeof i.plan.id === 'string',
    );
  } catch {
    return [];
  }
}

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
  const hydrated = useRef(false);

  // İlk render'da localStorage'a dokunmuyoruz (SSR/hydration uyumsuzluğunu önlemek için),
  // taslak sepet mount sonrası useEffect'te yükleniyor.
  useEffect(() => {
    setItems(readStoredCart());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage kullanılamıyor (gizli sekme vb.) — sepet yalnızca bellekte kalır.
    }
  }, [items]);

  const addItem = useCallback((plan: PricingPlan, category: string) => {
    // Panel kendiliğinden açılmaz; üst menüdeki sepet simgesi ve kırmızı rozet güncellenir.
    setItems((prev) => addToCart(prev, plan, category));
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
