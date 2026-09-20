'use client';
import { useEffect, useRef } from 'react';
import { Price } from '@/components/ui/Price';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { cartWhatsappUrl } from '@/lib/messages';

/** Sepet paneli (role=dialog, Escape, focus tuzağı, scroll kilidi). Açma düğmesi üst menüdeki CartButton'dadır. */
export function CartPanel() {
  const { items, removeItem, clearCart, isOpen, setIsOpen } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = panelRef.current;
    const els = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    els()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setIsOpen(false);
      if (e.key !== 'Tab') return;
      const list = els();
      if (!list.length) return;
      const [first, last] = [list[0], list[list.length - 1]];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-hidden />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sepet-baslik"
            className="tone-dark-2 fixed right-0 top-0 z-[85] flex h-full w-full flex-col border-l border-white/10 shadow-glass sm:w-[26rem]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 id="sepet-baslik" className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag aria-hidden className="h-5 w-5 text-lime" /> Sepetim
              </h2>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Sepeti kapat" className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <p className="text-fg-muted">Sepetiniz boş. Bir paket seçerek başlayabilirsiniz.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map(({ plan, category }) => (
                    <li key={plan.id} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-bold">{plan.name}</p>
                        <p className="text-sm text-fg-muted">{category}</p>
                        <Price price={plan.price} tone="dark" size="md" className="mt-1 text-lime" />
                      </div>
                      <button type="button" onClick={() => removeItem(plan.id)} aria-label={`${plan.name} paketini sepetten çıkar`} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted hover:bg-white/10 hover:text-fg">
                        <Trash2 aria-hidden className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-white/10 p-5">
                <p className="text-sm text-fg-muted">Sepetiniz WhatsApp üzerinden bize iletilir. Ödeme bu sitede alınmaz.</p>
                {/* Gerçek bağlantı: açılır pencere engelleyicilere takılmaz */}
                <a
                  href={cartWhatsappUrl(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    clearCart();
                    setIsOpen(false);
                  }}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-lime px-6 font-semibold text-ink-950 hover:bg-lime-soft"
                >
                  WhatsApp ile Sipariş Ver
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
