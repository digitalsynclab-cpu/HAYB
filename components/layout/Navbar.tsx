'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { nav, whatsappUrl } from '@/data/site';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';
import { CartButton } from '@/components/layout/CartButton';

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  // Rota değişince menüyü kapat
  useEffect(() => setOpen(false), [pathname]);

  // Masaüstü genişliğine geçilirse menüyü kapat (döndürme / yeniden boyutlandırma)
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
          scrolled || open
            ? 'border-b border-white/10 bg-ink-950/85 shadow-glass backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ height: 'var(--hayb-header-h)' }}
      >
        <div className="mx-auto flex h-full max-w-page items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors duration-200 hover:text-lime ${
                        active ? 'text-lime' : 'text-fg/90'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 -bottom-0.5 mx-auto h-0.5 w-1.5 rounded-full bg-lime transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CartButton />
            <Button href="/proje-baslat" className="hidden min-h-11 px-5 text-[0.9375rem] sm:inline-flex">
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
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="menu-item border-b border-white/10" style={{ ['--i' as string]: i }}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-[3.75rem] items-center justify-between text-[1.3rem] font-bold tracking-tight ${active ? 'text-lime' : 'text-fg'}`}
                    >
                      {item.label}
                      <span aria-hidden className={`h-2 w-2 rounded-full ${active ? 'bg-lime' : 'bg-white/15'}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="menu-item mt-8 grid gap-3" style={{ ['--i' as string]: nav.length }}>
            <Button href="/proje-baslat" className="w-full">
              Proje Başlat
            </Button>
            <Button
              href={whatsappUrl('Merhaba, HAYB internet sitesinden yazıyorum.')}
              variant="secondary"
              className="w-full"
              icon={<MessageCircle aria-hidden className="h-5 w-5" />}
            >
              WhatsApp ile Yaz
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
