'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { PricingPlan } from '@/types';

interface CartItem {
  plan: PricingPlan;
  category: string;
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

  const addItem = (plan: PricingPlan, category: string) => {
    setItems(prev => {
      const exists = prev.find(i => i.plan.id === plan.id);
      if (exists) return prev;
      return [...prev, { plan, category }];
    });
    setIsOpen(true);
  };

  const removeItem = (planId: string) => {
    setItems(prev => prev.filter(i => i.plan.id !== planId));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
