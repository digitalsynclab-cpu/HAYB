'use client';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Menu, MessageCircle, Search, ShoppingBag, X } from 'lucide-react';
import type { TemplateV2Def, V2Block, V2Logo, V2Site } from '@/data/template-types';
import { templateUrl } from '@/data/template-paths';
import { whatsappUrl } from '@/data/site';
import { UseTemplateLink } from '@/components/order/UseTemplateLink';
import { trackEvent } from '@/lib/analytics';
import { Btn, V2Provider } from '@/components/templates/v2/ui';
import { Booking, Cards, Hero, Marquee, Split, Strip } from '@/components/templates/v2/blocks-a';
import { Countdown, Cta, Gallery, Journal, Pricing, Quotes, Schedule, Shop, Showcase, Stats } from '@/components/templates/v2/blocks-b';

const RADIUS = { sharp: '2px', soft: '10px', round: '18px', pill: '9999px' } as const;
/** Kart, görsel ve panel köşesi (düğmeler --v-r kullanır). */
const CARD_RADIUS = { sharp: '2px', soft: '10px', round: '18px', pill: '22px' } as const;

function themeVars(site: V2Site): CSSProperties {
  const t = site.theme;
  return {
    ['--v-bg' as string]: t.bg,
    ['--v-ink' as string]: t.ink,
    ['--v-accent' as string]: t.accent,
    ['--v-accent-ink' as string]: t.accentInk,
    ['--v-surface' as string]: t.surface,
    ['--v-dark' as string]: t.dark,
    ['--v-dark-ink' as string]: t.darkInk,
    ['--v-paper' as string]: t.paper ?? t.ink,
    ['--v-paper-ink' as string]: t.paperInk ?? t.bg,
    ['--v-heading' as string]: `var(--v2-font-${t.heading})`,
    ['--v-body' as string]: `var(--v2-font-${t.body})`,
    ['--v-hw' as string]: t.headingWeight,
    ['--v-ht' as string]: t.headingTracking,
    ['--v-hc' as string]: t.headingCase ?? 'none',
    ['--v-hl' as string]: t.headingLeading ?? 1.04,
    ['--v-r' as string]: RADIUS[t.radius],
    ['--v-cr' as string]: CARD_RADIUS[t.radius],
  } as CSSProperties;
}

function Logo({ l, onDark }: { l: V2Logo; onDark?: boolean }) {
  const mark = l.mark ?? 'square';
  const letter = l.letter ?? l.text.charAt(0);
  return (
    <span className="inline-flex items-center gap-2.5" aria-label={`${l.text} ${l.sub ?? ''}`}>
      {mark === 'ring' && <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-current v2-h text-base">{letter}</span>}
      {mark === 'square' && <span aria-hidden className={`grid h-9 w-9 place-items-center v2-h text-base ${onDark ? 'bg-[var(--v-accent)] text-[var(--v-accent-ink)]' : 'bg-[var(--v-accent)] text-[var(--v-accent-ink)]'}`} style={{ borderRadius: 'min(var(--v-r), 8px)' }}>{letter}</span>}
      {mark === 'dot' && <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--v-accent)]" />}
      {mark === 'slash' && <span aria-hidden className="v2-h text-2xl leading-none text-[var(--v-accent)]">/</span>}
      {mark === 'bars' && (
        <span aria-hidden className="flex items-end gap-[3px]">
          <i className="block h-5 w-[3px] bg-current" />
          <i className="block h-3 w-[3px] bg-[var(--v-accent)]" />
          <i className="block h-4 w-[3px] bg-current" />
        </span>
      )}
      <span className="leading-none">
        <span className="v2-h block text-[1.3rem]">{l.text}</span>
        {l.sub && <span className="mt-1 block text-[0.56rem] font-semibold uppercase tracking-[0.24em] opacity-70">{l.sub}</span>}
      </span>
    </span>
  );
}

function renderBlock(b: V2Block, i: number) {
  switch (b.type) {
    case 'hero': return <Hero key={i} h={b} />;
    case 'booking': return <Booking key={i} b={b} />;
    case 'strip': return <Strip key={i} s={b} />;
    case 'cards': return <Cards key={i} c={b} />;
    case 'split': return <Split key={i} s={b} />;
    case 'showcase': return <Showcase key={i} s={b} />;
    case 'stats': return <Stats key={i} s={b} />;
    case 'schedule': return <Schedule key={i} s={b} />;
    case 'pricing': return <Pricing key={i} p={b} />;
    case 'shop':
      return b.layout === 'carousel' ? <Shop key={i} s={b} /> : <Shop key={i} s={b} />;
    case 'quotes': return <Quotes key={i} q={b} />;
    case 'journal': return <Journal key={i} j={b} />;
    case 'countdown': return <Countdown key={i} c={b} />;
    case 'gallery': return <Gallery key={i} g={b} />;
    case 'cta': return <Cta key={i} c={b} />;
    case 'marquee': return <div key={i} id={b.id} data-v2id={b.id} data-tone={b.tone ?? 'dark'} className="py-1"><Marquee words={b.words} /></div>;
  }
}

export function TemplateSiteV2({ t }: { t: TemplateV2Def }) {
  const { site } = t;
  const h = site.header;
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);
  const [cart, setCart] = useState(0);
  const timer = useRef(0);

  useEffect(() => {
    trackEvent('template_demo_view', { templateId: t.slug });
  }, [t.slug]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', esc);
    };
  }, [menu]);

  const toast = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setMsg({ id: Date.now(), text });
    timer.current = window.setTimeout(() => setMsg(null), 2800);
  }, []);
  const go = useCallback(
    (id: string) => {
      setMenu(false);
      const el = id ? document.querySelector<HTMLElement>(`[data-v2id="${id}"]`) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else toast('Örnek şablon: bu bağlantı demoda bir sayfaya gitmez.');
    },
    [toast],
  );
  const addCart = useCallback(() => setCart((c) => c + 1), []);

  const overlay = h.style === 'overlay';
  const solidTone = h.tone === 'dark' ? 'dark' : 'light';
  const headStyle: CSSProperties = {
    height: '4.5rem',
    color: h.tone === 'dark' ? 'var(--v-dark-ink)' : 'var(--v-ink)',
    background: scrolled || !overlay ? `color-mix(in srgb, ${h.tone === 'dark' ? 'var(--v-dark)' : 'var(--v-bg)'} 92%, transparent)` : 'transparent',
    backdropFilter: scrolled || !overlay ? 'blur(14px)' : undefined,
    borderBottom: scrolled || !overlay ? '1px solid color-mix(in srgb, currentColor 12%, transparent)' : '1px solid transparent',
    transition: 'background 0.35s, border-color 0.35s',
  };

  const f = site.footer;
  const social = { instagram: 'Ig', youtube: 'Yt', pinterest: 'Pi', linkedin: 'In', x: 'X', facebook: 'Fb' } as const;

  return (
    <V2Provider value={{ toast, go, addCart }}>
      <div className="v2" style={themeVars(site)}>
        <div className="flex items-center justify-between gap-3 bg-black px-4 py-2 text-xs font-semibold text-white">
          <Link href="/template" className="inline-flex shrink-0 items-center gap-1.5 text-white/80 hover:text-white">
            <ArrowRight aria-hidden className="h-3.5 w-3.5 rotate-180" /> Şablonlar
          </Link>
          <p className="hidden min-w-0 truncate text-center text-[#a6ff41] md:block">
            {t.code} · HAYB örnek şablonu · Marka, içerik ve formlar kurgusaldır.
          </p>
          <UseTemplateLink slug={t.slug} from="demo" code={t.code} minimumPackage={t.minimumPackage} className="group inline-flex shrink-0 items-center gap-1.5 text-[#a6ff41]">
            Bu tasarımı kullan
          </UseTemplateLink>
        </div>

        <header className="sticky top-0 z-40" style={headStyle} data-tone={overlay ? undefined : solidTone}>
          <div className="v2-wrap flex h-full items-center justify-between gap-6">
            <button type="button" onClick={() => go(site.blocks[0]?.id ?? '')} aria-label={`${site.logo.text} ana sayfa`} className="flex-none">
              <Logo l={site.logo} />
            </button>
            <nav aria-label="Ana menü" className="hidden items-center gap-7 text-[0.86rem] font-medium lg:flex">
              {h.links.map((l) => (
                <button key={l.label} type="button" onClick={() => go(l.to)} className="v2-nl">
                  {l.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              {h.phone && (
                <span className="hidden items-center gap-2 text-sm font-medium xl:flex">{h.phone}</span>
              )}
              {h.extras?.includes('search') && (
                <button type="button" aria-label="Ara" onClick={() => toast('Örnek şablon: arama demoda çalışmaz.')} className="hidden h-10 w-10 place-items-center sm:grid">
                  <Search className="h-[1.1rem] w-[1.1rem]" />
                </button>
              )}
              {h.extras?.includes('heart') && (
                <button type="button" aria-label="Favoriler" onClick={() => toast('Örnek şablon: favoriler demoda tutulmaz.')} className="hidden h-10 w-10 place-items-center sm:grid">
                  <Heart className="h-[1.1rem] w-[1.1rem]" />
                </button>
              )}
              {h.extras?.includes('cart') && (
                <button type="button" aria-label={`Sepet, ${cart} ürün`} onClick={() => toast(cart ? `Sepetinizde ${cart} ürün var (örnek).` : 'Sepetiniz boş (örnek).')} className="relative grid h-10 w-10 place-items-center">
                  <ShoppingBag className="h-[1.1rem] w-[1.1rem]" />
                  {cart > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--v-accent)] px-1 text-[0.6rem] font-bold text-[var(--v-accent-ink)]">{cart}</span>}
                </button>
              )}
              {h.extras?.includes('lang') && <span className="hidden text-xs font-semibold tracking-widest lg:inline">TR ▾</span>}
              <span className="hidden sm:block">
                <Btn cta={h.cta} className="!min-h-10 !px-4 !text-[0.82rem]" />
              </span>
              <button type="button" aria-label="Menüyü aç" aria-expanded={menu} onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {menu && (
          <div role="dialog" aria-modal="true" aria-label="Menü" className="fixed inset-0 z-[70] flex flex-col overflow-y-auto p-6 v2-pop" data-tone="dark">
            <div className="flex items-center justify-between">
              <Logo l={site.logo} />
              <button type="button" aria-label="Menüyü kapat" onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full border border-current/30">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobil menü" className="mt-10 flex flex-1 flex-col gap-1">
              {h.links.map((l, i) => (
                <button key={l.label} type="button" onClick={() => go(l.to)} className="v2-h v2-slide flex items-center justify-between border-b border-current/15 py-4 text-left text-[clamp(1.7rem,7vw,2.4rem)]" style={{ animationDelay: `${i * 45}ms` }}>
                  {l.label}
                  <ArrowRight className="h-5 w-5 opacity-50" />
                </button>
              ))}
            </nav>
            <div className="mt-8 space-y-3">
              <Btn cta={h.cta} className="w-full" />
              {h.phone && <p className="text-center text-sm opacity-70">{h.phone}</p>}
            </div>
          </div>
        )}

        <main>
          {site.blocks.map((b, i) => (
            <div key={i} className={i === 0 && overlay ? '-mt-[4.5rem]' : ''}>
              {renderBlock(b, i)}
            </div>
          ))}
        </main>

        <footer data-tone={f.tone} className="border-t border-current/15">
          <div className="v2-wrap py-12 md:py-16">
            {f.quote && <p className="v2-h mb-10 max-w-xl text-[clamp(1.6rem,3.4vw,2.6rem)] italic opacity-90">“{f.quote}”</p>}
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
              <div>
                <Logo l={site.logo} onDark />
                <p className="v2-mute mt-4 max-w-xs text-sm leading-relaxed">{f.blurb}</p>
                {f.social && (
                  <ul className="mt-5 flex gap-2">
                    {f.social.map((s) => (
                      <li key={s}>
                        <button type="button" onClick={() => toast('Örnek şablon: sosyal medya bağlantısı demoda yoktur.')} aria-label={s} className="grid h-9 w-9 place-items-center rounded-full border border-current/25 text-xs font-bold transition hover:bg-current/10">
                          {social[s]}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 self-start text-sm md:grid-cols-1">
                {f.links.map((l) => (
                  <li key={l.label}>
                    <button type="button" onClick={() => (l.to ? go(l.to) : toast('Örnek şablon: bu sayfa demoda yoktur.'))} className="v2-nl py-1 text-left">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-sm">
                {f.newsletter && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast('Örnek şablon: kaydınız alındı (demo).');
                    }}
                    className="mb-5"
                  >
                    <p className="mb-2 font-semibold">{f.newsletter}</p>
                    <div className="flex gap-2">
                      <label className="v2-field flex-1">
                        <span className="sr-only">E-posta adresi</span>
                        <input className="v2-input" type="email" required placeholder="E-posta adresiniz" />
                      </label>
                      <button type="submit" aria-label="Kaydol" className="v2-btn v2-btn-solid !px-4">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
                {f.contact && (
                  <ul className="v2-mute space-y-1">
                    {f.contact.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <p className="v2-mute mt-10 border-t border-current/15 pt-5 text-xs leading-relaxed">
              © {site.logo.text}. Bu sayfa HAYB tarafından hazırlanmış bir örnek şablondur; marka, içerik, görsel ve rakamlar kurgusaldır.
            </p>
          </div>
        </footer>

        {msg && (
          <p key={msg.id} role="status" className="v2-toast fixed left-1/2 top-24 z-[80] max-w-[90vw] -translate-x-1/2 rounded-full bg-black px-5 py-3 text-center text-sm font-semibold text-white shadow-2xl">
            {msg.text}
          </p>
        )}

        {/* HAYB kapanış şeridi */}
        <div className="bg-black px-4 py-10 text-center text-white">
          <p className="text-sm text-white/70">{t.code} · {t.brand} örnek şablonu</p>
          <p className="mt-1 text-lg font-bold">Bu tasarımı kendi markanıza uyarlayalım.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <UseTemplateLink slug={t.slug} from="demo" code={t.code} minimumPackage={t.minimumPackage} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a6ff41] px-6 text-sm font-extrabold text-black">
              Bu tasarımı kullan
            </UseTemplateLink>
            <a
              href={whatsappUrl(`Merhaba, HAYB sitesindeki ${templateUrl(t.slug)} örnek şablonunu beğendim. Kendi işletmem için benzer bir site istiyorum.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold"
            >
              <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp’tan sor
            </a>
            <Link href="/template" className="inline-flex min-h-12 items-center px-3 text-sm font-semibold text-white/70">Tüm şablonlar</Link>
          </div>
        </div>
      </div>
    </V2Provider>
  );
}
