'use client';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const WHATSAPP_NUMBER = '905073420661';

export function CartPanel() {
  const { items, removeItem, clearCart, isOpen, setIsOpen } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const lines = items.map(({ plan, category }) => {
      const featuresText = plan.features.map(f => `  • ${f}`).join('\n');
      return `📦 *${plan.name}* (${category})\n💰 Fiyat: ${plan.price}\n\nİçerik:\n${featuresText}`;
    }).join('\n\n---\n\n');

    const message = `Merhaba! Aşağıdaki ürünü/ürünleri satın almak istiyorum:\n\n${lines}\n\nLütfen bilgi verir misiniz?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0A1220] border-l border-[#2563EB]/15 z-[85] flex flex-col shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2563EB]/12 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-[#60A5FA]" />
            <h2 className="text-[#F0F6FF] font-semibold text-base">Sepetim</h2>
            {items.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Sepeti kapat"
          >
            <X size={18} className="text-[#8BA3C7]" />
          </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
              <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/15 flex items-center justify-center">
                <ShoppingBag size={28} className="text-[#2563EB]/40" />
              </div>
              <p className="text-[#8BA3C7] text-sm text-center">Sepetiniz boş.</p>
            </div>
          ) : (
            items.map(({ plan, category }) => (
              <div key={plan.id} className="p-4 rounded-2xl border border-[#2563EB]/10 bg-[#111E35]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[#F0F6FF] font-semibold text-sm">{plan.name}</p>
                    <p className="text-[#8BA3C7]/60 text-xs">{category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-bold text-sm">{plan.price}</span>
                    <button
                      onClick={() => removeItem(plan.id)}
                      className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                      aria-label={`${plan.name} kaldır`}
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <ul className="space-y-1 mt-2">
                  {plan.features.slice(0, 4).map(f => (
                    <li key={f} className="text-[#8BA3C7]/70 text-[11px] flex items-start gap-1.5">
                      <span className="text-[#2563EB]/60 mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-[#8BA3C7]/40 text-[11px]">+{plan.features.length - 4} özellik daha</li>
                  )}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[#2563EB]/12 flex-shrink-0 space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold text-sm flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity min-h-[48px]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ile Sipariş Ver
            </button>
            <button
              onClick={() => { clearCart(); setIsOpen(false); }}
              className="w-full py-2.5 rounded-xl border border-white/[0.08] text-[#8BA3C7] text-xs hover:text-[#F0F6FF] hover:border-white/15 transition-colors"
            >
              Sepeti Temizle
            </button>
          </div>
        )}
      </div>
    </>
  );
}
