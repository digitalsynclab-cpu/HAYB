'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';

export interface DashboardNavItem {
  href: string;
  label: string;
  badge?: number;
}

interface DashboardHeaderProps {
  brandLabel: string;
  subLabel?: string;
  navItems: DashboardNavItem[];
  logoutAction: () => void | Promise<void>;
}

/**
 * Admin ve partner panelinde ortak başlık: masaüstünde yatay menü, mobilde hamburger ile açılan
 * tam genişlikte liste. Yatay kaydırmalı (overflow-x) bir menü KULLANILMAZ.
 */
export function DashboardHeader({ brandLabel, subLabel, navItems, logoutAction }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.3em] text-lime">{brandLabel}</p>
          {subLabel && <p className="truncate text-xs text-fg-muted">{subLabel}</p>}
        </div>

        <nav aria-label="Panel menüsü" className="hidden items-center gap-5 text-sm lg:flex">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? 'page' : undefined} className={`inline-flex items-center gap-1.5 ${pathname === n.href ? 'font-semibold text-lime' : 'text-fg-muted hover:text-fg'}`}>
              {n.label}
              {!!n.badge && <span className="rounded-full bg-lime px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-950">{n.badge}</span>}
            </Link>
          ))}
          <form action={logoutAction}>
            <button type="submit" className="rounded-lg border border-white/20 px-3 py-1.5 hover:border-white/40">
              Çıkış
            </button>
          </form>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="dashboard-mobile-menu"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          className="press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-fg lg:hidden"
        >
          <MenuToggleIcon open={open} className="h-7 w-7" duration={350} aria-hidden />
        </button>
      </div>

      {open && (
        <div id="dashboard-mobile-menu" className="border-t border-white/10 bg-ink-950 px-4 py-4 lg:hidden">
          <nav aria-label="Panel menüsü (mobil)">
            <ul className="flex flex-col divide-y divide-white/10">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === n.href ? 'page' : undefined}
                    className={`flex min-h-12 items-center gap-2 text-[1.05rem] font-semibold ${pathname === n.href ? 'text-lime' : 'text-fg'}`}
                  >
                    {n.label}
                    {!!n.badge && <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-bold leading-none text-ink-950">{n.badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <form action={logoutAction} className="mt-4">
            <button type="submit" className="min-h-12 w-full rounded-xl border border-white/20 text-sm hover:border-white/40">
              Çıkış
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
