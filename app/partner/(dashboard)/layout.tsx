import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { partnerLogoutAction } from '../actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAV = [
  { href: '/partner/panel', label: 'Panel' },
  { href: '/partner/satis-olustur', label: 'Satış Oluştur' },
  { href: '/partner/leads', label: "Lead'lerim" },
  { href: '/partner/satislar', label: 'Satışlarım' },
  { href: '/partner/kazanc', label: 'Kazançlarım' },
  { href: '/partner/materyaller', label: 'Materyaller' },
  { href: '/partner/destek', label: 'Destek' },
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
      <DashboardHeader brandLabel="HAYB Partner" subLabel={partner?.partner_code ?? undefined} navItems={NAV} logoutAction={partnerLogoutAction} />
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
