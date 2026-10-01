'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Handshake } from 'lucide-react';
import { menu, type MenuItem } from '@/data/menu';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { LineIcon } from '@/components/ui/LineIcon';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';
import { CartButton } from '@/components/layout/CartButton';
import { LanguageButton } from '@/components/i18n/LanguageSwitcher';
import { openContact } from '@/lib/contact-events';

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

const itemActive = (pathname: string, item: MenuItem) =>
  isActive(pathname, item.href) || (item.groups?.some((g) => g.links.some((l) => isActive(pathname, l.href))) ?? false);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [mSub, setMSub] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Rota değişince menüleri kapat
  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [pathname]);

  useEffect(() => {
    if (!sub) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSub(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sub]);

  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setSub(label);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setSub(null), 140);
  };

  // Masaüstü genişliğine geçilirse mobil menüyü kapat
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Açıkken: scroll kilidi, Escape, focus tuzağı
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab') return;
      const els = [toggleRef.current!, ...focusables()];
      const first = els[0];
      const last = els[els.length - 1];
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
    };
  }, [open, close]);

  return (
    <>
      <div aria-hidden className="scroll-progress" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled || open || sub
            ? 'border-b border-white/10 bg-ink-950/90 shadow-glass backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ height: 'var(--hayb-header-h)' }}
      >
        <div className="mx-auto flex h-full max-w-page items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Ana menü" className="hidden lg:block" onMouseLeave={hoverClose}>
            <ul className="flex items-center gap-1 xl:gap-2">
              {menu.map((item) => {
                const active = itemActive(pathname, item);
                const has = Boolean(item.groups);
                return (
                  <li key={item.label} onMouseEnter={() => (has ? hoverOpen(item.label) : setSub(null))}>
                    {has ? (
                      <button
                        type="button"
                        aria-expanded={sub === item.label}
                        aria-haspopup="true"
                        onClick={() => setSub(sub === item.label ? null : item.label)}
                        className={`relative inline-flex min-h-11 items-center gap-1 px-3 text-[0.9375rem] font-medium transition-colors duration-200 hover:text-lime ${active || sub === item.label ? 'text-lime' : 'text-fg/90'}`}
                      >
                        {item.label}
                        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${sub === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors duration-200 hover:text-lime ${active ? 'text-lime' : 'text-fg/90'}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageButton />
            <CartButton />
            <Button onClick={openContact} className="hidden min-h-11 px-5 text-[0.9375rem] sm:inline-flex">
              Teklif Al
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              className="press inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-fg lg:hidden"
            >
              <MenuToggleIcon open={open} className="h-8 w-8" duration={400} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {sub && (
          <motion.div
            key={sub}
            className="fixed inset-x-0 z-40 hidden lg:block"
            style={{ top: 'var(--hayb-header-h)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseEnter={() => hoverOpen(sub)}
            onMouseLeave={hoverClose}
          >
            <MegaPanel item={menu.find((m) => m.label === sub)!} onNavigate={() => setSub(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Panel header'ın DIŞINDA: header'daki backdrop-filter, içindeki fixed öğeler için
        yeni bir containing block oluşturup paneli header yüksekliğine hapsediyordu.
      */}
      {open && (
        <div
          id="mobil-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menüsü"
          className="menu-panel fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ink-950 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-2xl sm:px-6 lg:hidden"
          style={{ top: 'var(--hayb-header-h)' }}
        >
          <nav aria-label="Mobil menü">
            <ul className="flex flex-col">
              {menu.map((item, i) => {
                const active = itemActive(pathname, item);
                const has = Boolean(item.groups);
                const expanded = mSub === item.label;
                return (
                  <li key={item.label} className="menu-item border-b border-white/10" style={{ ['--i' as string]: i }}>
                    {has ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => setMSub(expanded ? null : item.label)}
                          className={`flex min-h-[3.75rem] w-full items-center justify-between text-[1.3rem] font-bold tracking-tight ${active || expanded ? 'text-lime' : 'text-fg'}`}
                        >
                          {item.label}
                          <ChevronDown aria-hidden className={`h-5 w-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="overflow-hidden">
                              <div className="pb-4">
                                {item.groups!.map((g, gi) => (
                                  <div key={gi} className="mb-3">
                                    {g.title && <p className="px-1 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">{g.title}</p>}
                                    <ul>
                                      {g.links.map((l) => (
                                        <li key={l.href}>
                                          <Link href={l.href} className="flex min-h-12 items-center gap-3 rounded-xl px-1 text-[1.02rem] font-medium text-fg/90 hover:text-lime">
                                            {l.icon && <LineIcon name={l.icon} size={36} className="text-white" />}
                                            {l.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-[3.75rem] items-center justify-between text-[1.3rem] font-bold tracking-tight ${active ? 'text-lime' : 'text-fg'}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="menu-item mt-8 grid gap-3" style={{ ['--i' as string]: menu.length }}>
            <Button
              className="w-full"
              onClick={() => {
                setOpen(false);
                window.setTimeout(openContact, 200);
              }}
            >
              Teklif Al
            </Button>
            <Button href="/partner" variant="secondary-light" arrow={false} icon={<Handshake aria-hidden className="h-5 w-5 text-lime" />} className="w-full">
              Partner Ol
            </Button>
            <Button href="/partner/giris" variant="glass" arrow={false} className="w-full">
              Partner Giriş
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function MegaPanel({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  const groups = item.groups ?? [];
  const cols = groups.length >= 4 ? 'grid-cols-4' : groups.length === 3 ? 'grid-cols-3' : groups.length === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-md';
  return (
    <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
      <div className="rounded-[1.5rem] border border-white/10 bg-ink-950/95 p-6 shadow-[0_30px_80px_rgb(0_0_0/0.6)] backdrop-blur-xl">
        <div className={`grid gap-x-8 gap-y-6 ${cols}`}>
          {groups.map((g, gi) => (
            <div key={gi}>
              {g.title && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">{g.title}</p>}
              <ul className="space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[0.06]">
                      {l.icon && <LineIcon name={l.icon} size={40} className="text-white" />}
                      <span className="min-w-0">
                        <span className="block text-[0.95rem] font-semibold text-white group-hover:text-lime">{l.label}</span>
                        {l.text && <span className="block truncate text-xs text-fg-muted">{l.text}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
          <span className="text-fg-muted">Aradığınızı bulamadınız mı?</span>
          <Link href={item.href} onClick={onNavigate} className="font-semibold text-lime hover:underline">
            Tümünü gör
          </Link>
        </div>
      </div>
    </div>
  );
}
