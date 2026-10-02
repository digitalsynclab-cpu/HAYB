import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { adminLogoutAction } from './actions';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAV = [
  { href: '/secretadmin', label: 'Genel Bakış' },
  { href: '/secretadmin/destek', label: 'Destek' },
];

const NAV_GROUPS = [
  {
    label: 'Operasyon',
    items: [
      { href: '/secretadmin/basvurular', label: 'Başvurular' },
      { href: '/secretadmin/satislar', label: 'Satışlar' },
      { href: '/secretadmin/leads', label: "Lead'ler / Müşteriler" },
    ],
  },
  {
    label: 'Partnerler',
    items: [
      { href: '/secretadmin/partnerler', label: 'Partnerler' },
      { href: '/secretadmin/satis-performansi', label: 'Performans' },
    ],
  },
  {
    label: 'Finans',
    items: [
      { href: '/secretadmin/komisyonlar', label: 'Komisyonlar' },
      { href: '/secretadmin/komisyon-kurallari', label: 'Komisyon Kuralları' },
    ],
  },
  {
    label: 'İçerik',
    items: [
      { href: '/secretadmin/paketler', label: 'Paketler' },
      { href: '/secretadmin/satis-rehberi', label: 'Satış Rehberi' },
      { href: '/secretadmin/materyaller', label: 'Materyaller' },
      { href: '/secretadmin/musteri-datasi', label: 'Müşteri Datası' },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { href: '/secretadmin/mail-gonder', label: 'Mail Gönder' },
      { href: '/secretadmin/audit-logs', label: 'Audit Log' },
    ],
  },
];

export default function SecretAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 text-fg">
      <DashboardHeader brandLabel="HAYB Admin" navItems={NAV} navGroups={NAV_GROUPS} logoutAction={adminLogoutAction} />
      {children}
    </div>
  );
}
