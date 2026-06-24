'use client';
import { useState } from 'react';
import {
  Check, Minus, ShoppingCart, Share2, QrCode, Globe,
  Smartphone, Sparkles, ChevronDown, ChevronUp,
} from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { PricingCard } from '@/components/ui/PricingCard';
import {
  webPricingRows, webPackages,
  socialMediaPlans, qrMenuPlans,
  specialProjectFeatures, mobileAppFeatures,
  type WebPricingRow,
} from '@/data/pricing';
import { useCart } from '@/lib/cart-context';
import type { PricingPlan } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const PKG_COLORS: Record<string, string> = {
  starter:      '#60A5FA',
  business:     '#A78BFA',
  professional: '#FBBF24',
  premium:      '#F87171',
};

const WHATSAPP = '905073420661';

function waLink(msg: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function buildCartPlan(pkg: typeof webPackages[number]): PricingPlan {
  return {
    id: pkg.id,
    name: pkg.name.charAt(0) + pkg.name.slice(1).toLowerCase(),
    price: pkg.price,
    recommended: pkg.recommended,
    ctaLabel: 'Sepete Ekle',
    features: webPricingRows
      .filter((r) => r[pkg.id as keyof WebPricingRow] !== false)
      .map((r) => {
        const v = r[pkg.id as keyof WebPricingRow];
        return typeof v === 'string' ? `${r.label}: ${v}` : r.label;
      }),
  };
}

// ─── Desktop karşılaştırma tablosu ────────────────────────────────────────────
function WebTableDesktop() {
  const { addItem } = useCart();

  const getVal = (row: WebPricingRow, id: string): string | boolean =>
    row[id as keyof WebPricingRow] as string | boolean;

  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: '820px' }}>
        <thead>
          {/* Package headers */}
          <tr>
            <th className="text-left pb-3 pr-4 w-[30%]">
              <span className="text-[#8BA3C7] text-xs font-semibold uppercase tracking-wider">
                HAYB Web Site Paketleri
              </span>
            </th>
            {webPackages.map((pkg) => (
              <th key={pkg.id} className="pb-3 px-3 text-center w-[17.5%]">
                <div className="flex flex-col items-center gap-1.5">
                  {pkg.recommended && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(251,191,36,0.15)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.3)' }}>
                      ÖNERİLEN
                    </span>
                  )}
                  <span className="text-[12px] font-black tracking-[0.12em]"
                    style={{ color: PKG_COLORS[pkg.id] }}>
                    {pkg.name}
                  </span>
                  <span className="text-[22px] font-black text-[#F0F6FF] leading-none">
                    {pkg.price}
                  </span>
                </div>
              </th>
            ))}
          </tr>

          {/* CTA buttons */}
          <tr>
            <td className="pb-5" />
            {webPackages.map((pkg) => (
              <td key={pkg.id} className="pb-5 px-3 text-center">
                <button
                  onClick={() => addItem(buildCartPlan(pkg), 'Web Site Paketi')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 min-h-[38px] hover:opacity-90 active:scale-95"
                  style={{
                    background: pkg.recommended
                      ? 'linear-gradient(135deg, #1D4ED8, #2563EB, #3B82F6)'
                      : `rgba(${PKG_COLORS[pkg.id].replace('#','').match(/../g)!.map(h=>parseInt(h,16)).join(',')}, 0.08)`,
                    border: pkg.recommended ? 'none' : `1px solid ${PKG_COLORS[pkg.id]}40`,
                    color: '#F0F6FF',
                    boxShadow: pkg.recommended ? '0 4px 20px rgba(37,99,235,0.3)' : 'none',
                  }}
                >
                  <ShoppingCart size={11} aria-hidden="true" />
                  Sepete Ekle
                </button>
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {webPricingRows.map((row, i) => (
            <tr key={row.label}
              style={{ background: i % 2 === 0 ? 'rgba(6,11,20,0.9)' : 'rgba(13,21,38,0.6)' }}>
              <td className="py-2.5 pr-4 pl-3 rounded-l-lg">
                <span className="text-[#8BA3C7] text-[12px]">{row.label}</span>
              </td>
              {webPackages.map((pkg, pi) => {
                const val = getVal(row, pkg.id);
                return (
                  <td key={pkg.id}
                    className={`py-2.5 px-3 text-center ${pi === webPackages.length - 1 ? 'rounded-r-lg' : ''}`}>
                    {typeof val === 'boolean' ? (
                      val
                        ? <Check size={14} className="mx-auto" style={{ color: PKG_COLORS[pkg.id] }} aria-label="Var" />
                        : <Minus size={14} className="mx-auto text-[#1E2D45]" aria-label="Yok" />
                    ) : (
                      <span className="text-[#F0F6FF] text-[11px] leading-snug block">{val}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Mobile: her paket ayrı açılır kart ───────────────────────────────────────
function WebCardsMobile() {
  const { addItem } = useCart();
  const [open, setOpen] = useState<string>('starter');

  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {webPackages.map((pkg) => {
        const isOpen = open === pkg.id;
        const rows = webPricingRows.filter(
          (r) => r[pkg.id as keyof WebPricingRow] !== false
        );

        return (
          <div key={pkg.id}
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              border: `1px solid ${isOpen ? PKG_COLORS[pkg.id] + '50' : 'rgba(37,99,235,0.12)'}`,
              background: isOpen ? 'rgba(13,21,38,0.95)' : 'rgba(13,21,38,0.5)',
            }}>
            {/* Header */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
              onClick={() => setOpen(isOpen ? '' : pkg.id)}
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-0.5">
                {pkg.recommended && (
                  <span className="text-[9px] font-bold tracking-widest text-[#FBBF24] mb-0.5">
                    ÖNERİLEN
                  </span>
                )}
                <span className="text-[13px] font-black tracking-[0.15em]"
                  style={{ color: PKG_COLORS[pkg.id] }}>
                  {pkg.name}
                </span>
                <span className="text-[22px] font-black text-[#F0F6FF] leading-tight">
                  {pkg.price}
                </span>
              </div>
              <div className="text-[#8BA3C7]">
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {/* Features */}
            {isOpen && (
              <div className="px-5 pb-5"
                style={{ borderTop: `1px solid ${PKG_COLORS[pkg.id]}20` }}>
                <ul className="mt-4 space-y-2.5 mb-5">
                  {rows.map((row) => {
                    const v = row[pkg.id as keyof WebPricingRow];
                    return (
                      <li key={row.label} className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                          style={{ background: `${PKG_COLORS[pkg.id]}20` }}>
                          <Check size={9} style={{ color: PKG_COLORS[pkg.id] }} aria-hidden="true" />
                        </div>
                        <span className="text-[12px] leading-snug">
                          {typeof v === 'string' ? (
                            <>
                              <span className="text-[#F0F6FF] font-medium">{row.label}:</span>
                              {' '}<span className="text-[#8BA3C7]">{v}</span>
                            </>
                          ) : (
                            <span className="text-[#8BA3C7]">{row.label}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => addItem(buildCartPlan(pkg), 'Web Site Paketi')}
                  className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 min-h-[44px] hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: pkg.recommended
                      ? 'linear-gradient(135deg,#1D4ED8,#2563EB,#3B82F6)'
                      : `${PKG_COLORS[pkg.id]}15`,
                    border: pkg.recommended ? 'none' : `1px solid ${PKG_COLORS[pkg.id]}40`,
                    color: '#F0F6FF',
                    boxShadow: pkg.recommended ? '0 4px 20px rgba(37,99,235,0.3)' : 'none',
                  }}>
                  <ShoppingCart size={14} aria-hidden="true" />
                  Sepete Ekle
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Özel Proje bölümü ────────────────────────────────────────────────────────
function SpecialProjectSection() {
  const msg = `Merhaba! Özel proje hakkında bilgi almak istiyorum. Detayları konuşabilir miyiz?`;
  return (
    <div className="mt-10 rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.08) 100%)',
        border: '1px solid rgba(99,102,241,0.25)',
      }}>
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-[#A78BFA]" aria-hidden="true" />
              <span className="text-[10px] font-black tracking-[0.2em] text-[#A78BFA] uppercase">
                Özel Proje
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F0F6FF] mb-2 leading-tight">
              Hayaliniz var, biz inşa edelim.
            </h3>
            <p className="text-[#8BA3C7] text-sm mb-5 max-w-lg leading-relaxed">
              Sosyal ağ platformu, girişim ürünü, startup projesi veya büyük ölçekli sistemler için
              tamamen özel çözümler. Fiyat: proje kapsamına göre belirlenir.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {specialProjectFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(168,85,247,0.15)' }}>
                    <Check size={9} className="text-[#A78BFA]" aria-hidden="true" />
                  </div>
                  <span className="text-[#8BA3C7] text-[12px]">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg,#7C3AED,#6D28D9)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
                }}>
                <Sparkles size={14} aria-hidden="true" />
                Projenizi Konuşalım
              </a>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
                <span className="text-[#A78BFA] text-xs font-semibold">30.000 ₺ — 150.000 ₺+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobil Uygulama bölümü ────────────────────────────────────────────────────
function MobileAppSection() {
  const msg = `Merhaba! Mobil uygulama geliştirme hakkında bilgi almak istiyorum.`;
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl"
        style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(37,99,235,0.15)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}>
          <Smartphone size={18} className="text-[#60A5FA]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#F0F6FF] mb-1">Mobil Uygulama Geliştirme</h3>
          <p className="text-[#8BA3C7] text-sm leading-relaxed">
            iOS ve Android için native veya cross-platform mobil uygulamalar.
            Fiyat, projenin kapsamına göre belirlenir — ücretsiz keşif görüşmesi yapılır.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mobileAppFeatures.map((cat) => (
          <div key={cat.category} className="p-5 rounded-2xl"
            style={{ background: 'rgba(13,21,38,0.6)', border: '1px solid rgba(37,99,235,0.10)' }}>
            <h4 className="text-[#F0F6FF] text-sm font-bold mb-3">{cat.category}</h4>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.15)' }}>
                    <Check size={8} className="text-[#60A5FA]" aria-hidden="true" />
                  </div>
                  <span className="text-[#8BA3C7] text-[12px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{
          background: 'linear-gradient(135deg,#1D4ED8,#2563EB,#3B82F6)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
        }}>
        <Smartphone size={14} aria-hidden="true" />
        Ücretsiz Keşif Görüşmesi
      </a>
    </div>
  );
}

// ─── Sosyal medya & QR kartları ───────────────────────────────────────────────
function CardGrid({ plans, category }: { plans: PricingPlan[]; category: string }) {
  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} category={category}
          isInquiry={plan.ctaLabel === 'Teklif Al'} />
      ))}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'web',    label: 'Web Siteleri',          short: 'Web',     Icon: Globe        },
  { id: 'sosyal', label: 'Sosyal Medya',           short: 'Sosyal',  Icon: Share2       },
  { id: 'qr',     label: 'QR Menü',               short: 'QR Menü', Icon: QrCode       },
  { id: 'mobil',  label: 'Mobil Uygulama',         short: 'Mobil',   Icon: Smartphone   },
  { id: 'ozel',   label: 'Özel Proje',             short: 'Özel',    Icon: Sparkles     },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ─── Main ─────────────────────────────────────────────────────────────────────
export function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabId>('web');

  return (
    <SectionWrapper id="fiyatlandirma" titleId="fiyatlandirma-baslik"
      className="border-t border-[#2563EB]/08">
      <div className="mb-10">
        <h2 id="fiyatlandirma-baslik"
          className="text-3xl sm:text-4xl font-bold text-[#F0F6FF] mb-3">
          Fiyatlandırma
        </h2>
        <p className="text-[#8BA3C7] text-sm max-w-lg">
          İhtiyacınıza uygun paketi seçin. Tüm paketlere ücretsiz danışmanlık dahildir.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl w-fit"
        role="tablist" aria-label="Hizmet kategorileri"
        style={{ background: 'rgba(6,11,20,0.9)', border: '1px solid rgba(37,99,235,0.12)' }}>
        {TABS.map(({ id, label, short, Icon }) => {
          const isActive = activeTab === id;
          const isSpecial = id === 'ozel';
          return (
            <button key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[40px]"
              style={{
                background: isActive
                  ? isSpecial
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.15))'
                    : 'rgba(37,99,235,0.15)'
                  : 'transparent',
                border: isActive
                  ? isSpecial
                    ? '1px solid rgba(168,85,247,0.40)'
                    : '1px solid rgba(37,99,235,0.35)'
                  : '1px solid transparent',
                color: isActive
                  ? isSpecial ? '#C4B5FD' : '#F0F6FF'
                  : '#8BA3C7',
                boxShadow: isActive && !isSpecial ? '0 2px 12px rgba(37,99,235,0.15)' : 'none',
              }}>
              <Icon size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div role="tabpanel">
        {activeTab === 'web' && (
          <>
            <WebTableDesktop />
            <WebCardsMobile />
            <SpecialProjectSection />
          </>
        )}
        {activeTab === 'sosyal' && (
          <div>
            <p className="text-[#8BA3C7] text-sm mb-6">
              Haftalık, aylık ve 3 aylık içerik üretim paketleri. Tasarımlar sektöre özel hazırlanır.
            </p>
            <CardGrid plans={socialMediaPlans} category="Sosyal Medya Yönetimi" />
          </div>
        )}
        {activeTab === 'qr' && (
          <div>
            <p className="text-[#8BA3C7] text-sm mb-6">
              Restoran ve kafeler için dijital menü çözümleri.
            </p>
            <CardGrid plans={qrMenuPlans} category="QR Menü Sistemi" />
          </div>
        )}
        {activeTab === 'mobil' && <MobileAppSection />}
        {activeTab === 'ozel'  && <SpecialProjectSection />}
      </div>
    </SectionWrapper>
  );
}
