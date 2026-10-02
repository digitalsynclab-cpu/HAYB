import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { partnerLogoutAction } from '../actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export const metadata: Metadata = { robots: { index: false, follow: false }, manifest: '/partner/manifest.webmanifest' };

export default async function PartnerPanelLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [{ data: partner }, { count: unreadCount }] = user
    ? await Promise.all([
        supabase.from('partners').select('partner_code').eq('profile_id', user.id).single(),
        supabase.from('notifications').select('id', { count: 'exact', head: true }).eq('profile_id', user.id).eq('is_read', false),
      ])
    : [{ data: null }, { count: 0 }];

  const NAV = [
    { href: '/partner/panel', label: 'Genel Bakış' },
    { href: '/partner/musteriler', label: 'Müşteriler' },
    { href: '/partner/satislar', label: 'Satışlar' },
    { href: '/partner/kazanc', label: 'Kazançlar' },
    { href: '/partner/destek', label: 'Destek' },
  ];

  const PROFILE_MENU = [
    { href: '/partner/profil', label: 'Profil / Ödeme Bilgileri' },
    { href: '/partner/satis-rehberi', label: 'Satış Rehberi' },
    { href: '/partner/materyaller', label: 'Materyaller' },
    { href: '/partner/rehber', label: 'Yardım / Başlangıç Rehberi' },
  ];

  return (
    <div className="min-h-screen bg-ink-950 text-fg">
      <DashboardHeader
        brandLabel="HAYB Partner"
        subLabel={partner?.partner_code ?? undefined}
        navItems={NAV}
        logoutAction={partnerLogoutAction}
        notifications={{ href: '/partner/bildirimler', unreadCount: unreadCount ?? 0 }}
        profileMenu={PROFILE_MENU}
        primaryAction={{ href: '/partner/satis-olustur', label: '+ Yeni Satış' }}
      />
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
