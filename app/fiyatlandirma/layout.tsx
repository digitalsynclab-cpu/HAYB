import { CartProvider } from '@/lib/cart-context';
import { CartPanel } from '@/components/pricing/CartPanel';

// Sepet yalnızca fiyatlandırma sayfasında gerekir; diğer sayfalara JS yüklenmez.
export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartPanel />
    </CartProvider>
  );
}
