import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { partnerLogoutAction } from '../actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAV = [
  { href: '/partner/panel', label: 'Panel' },
  { href: '/partner/leads', label: "Lead'lerim" },
  { href: '/partner/satislar', label: 'Satışlarım' },
  { href: '/partner/kazanc', label: 'Kazançlarım' },
  { href: '/partner/profil', label: 'Profil' },
];

export default async function PartnerPanelLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = user ? await supabase.from('partners').select('partner_code').eq('profile_id', user.id).single() : { data: null };

  return (
    <div className="min-h-screen bg-ink-950 text-fg">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Partner</p>
            {partner?.partner_code && <p className="text-xs text-fg-muted">{partner.partner_code}</p>}
          </div>
          <nav className="flex items-center gap-5 text-sm">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-fg-muted hover:text-fg">
                {n.label}
              </Link>
            ))}
            <form action={partnerLogoutAction}>
              <button type="submit" className="rounded-lg border border-white/20 px-3 py-1.5 hover:border-white/40">
                Çıkış
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
