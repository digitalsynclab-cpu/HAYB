'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';

export interface DashboardNavItem {
  href: string;
  label: string;
  badge?: number;
}

export interface ProfileMenuItem {
  href: string;
  label: string;
}

export interface DashboardNavGroup {
  label: string;
  items: DashboardNavItem[];
}

interface DashboardHeaderProps {
  brandLabel: string;
  subLabel?: string;
  navItems: DashboardNavItem[];
  /** Ek olarak, dropdown şeklinde gruplanmış nav öğeleri (örn. admin: Operasyon, Finans, İçerik). */
  navGroups?: DashboardNavGroup[];
  logoutAction: () => void | Promise<void>;
  /** Verilirse header'da zil ikonu + okunmamış sayısı gösterilir (partner bildirimleri). */
  notifications?: { href: string; unreadCount: number };
  /** Verilirse sağ üstte düz "Çıkış" butonu yerine profil dropdown'ı gösterilir. */
  profileMenu?: ProfileMenuItem[];
  /** Partner'ın ana aksiyonu — örn. "+ Yeni Satış". Nav öğesi gibi değil, belirgin CTA olarak gösterilir. */
  primaryAction?: { href: string; label: string };
}

/**
 * Admin ve partner panelinde ortak başlık: masaüstünde yatay menü, mobilde hamburger ile açılan
 * tam genişlikte liste. Yatay kaydırmalı (overflow-x) bir menü KULLANILMAZ.
 */
export function DashboardHeader({ brandLabel, subLabel, navItems, navGroups, logoutAction, notifications, profileMenu, primaryAction }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroups, setOpenMobileGroups] = useState<Set<string>>(new Set());

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

          {(navGroups ?? []).map((g) => {
            const groupActive = g.items.some((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));
            return (
              <div key={g.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenGroup((cur) => (cur === g.label ? null : g.label))}
                  className={`inline-flex items-center gap-1 ${groupActive ? 'font-semibold text-lime' : 'text-fg-muted hover:text-fg'}`}
                >
                  {g.label}
                  <span aria-hidden className="text-xs">▾</span>
                </button>
                {openGroup === g.label && (
                  <>
                    <button type="button" aria-hidden tabIndex={-1} className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenGroup(null)} />
                    <div className="absolute left-0 top-full z-20 mt-2 w-52 rounded-xl border border-white/10 bg-ink-900 p-1.5 shadow-xl">
                      {g.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenGroup(null)}
                          className={`block rounded-lg px-3 py-2 text-sm ${pathname === item.href ? 'text-lime' : 'text-fg-muted hover:bg-white/5 hover:text-fg'}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {primaryAction && (
            <Link href={primaryAction.href} className="rounded-lg bg-lime px-3 py-1.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
              {primaryAction.label}
            </Link>
          )}

          {notifications && (
            <Link href={notifications.href} aria-label="Bildirimler" className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 hover:border-white/30">
              <Bell aria-hidden className="h-4 w-4" />
              {notifications.unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-lime px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-950">{notifications.unreadCount}</span>
              )}
            </Link>
          )}

          {profileMenu ? (
            <div className="relative">
              <button type="button" onClick={() => setProfileOpen((v) => !v)} className="rounded-lg border border-white/20 px-3 py-1.5 hover:border-white/40">
                Profil
              </button>
              {profileOpen && (
                <>
                  <button type="button" aria-hidden tabIndex={-1} className="fixed inset-0 z-10 cursor-default" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-white/10 bg-ink-900 p-1.5 shadow-xl">
                    {profileMenu.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-white/5 hover:text-fg">
                        {item.label}
                      </Link>
                    ))}
                    <form action={logoutAction}>
                      <button type="submit" className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-white/5 hover:text-fg">
                        Çıkış Yap
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form action={logoutAction}>
              <button type="submit" className="rounded-lg border border-white/20 px-3 py-1.5 hover:border-white/40">
                Çıkış
              </button>
            </form>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {notifications && (
            <Link href={notifications.href} aria-label="Bildirimler" className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5">
              <Bell aria-hidden className="h-5 w-5" />
              {notifications.unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-lime px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink-950">{notifications.unreadCount}</span>
              )}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="dashboard-mobile-menu"
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            className="press inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-fg"
          >
            <MenuToggleIcon open={open} className="h-7 w-7" duration={350} aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div id="dashboard-mobile-menu" className="border-t border-white/10 bg-ink-950 px-4 py-4 lg:hidden">
          {primaryAction && (
            <Link href={primaryAction.href} onClick={() => setOpen(false)} className="mb-4 block rounded-xl bg-lime px-5 py-3 text-center text-sm font-semibold text-ink-950 hover:bg-lime-soft">
              {primaryAction.label}
            </Link>
          )}
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
              {(profileMenu ?? []).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-[1.05rem] font-semibold text-fg-muted">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {(navGroups ?? []).map((g) => {
            const isOpen = openMobileGroups.has(g.label);
            return (
              <div key={g.label} className="border-t border-white/10 py-2">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileGroups((cur) => {
                      const next = new Set(cur);
                      if (next.has(g.label)) next.delete(g.label);
                      else next.add(g.label);
                      return next;
                    })
                  }
                  className="flex min-h-11 w-full items-center justify-between text-left text-sm font-semibold uppercase tracking-wide text-fg-muted"
                >
                  {g.label}
                  <span aria-hidden>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <ul className="mt-1 space-y-1 pl-2">
                    {g.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-11 items-center text-[1rem] ${pathname === item.href ? 'font-semibold text-lime' : 'text-fg'}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
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
