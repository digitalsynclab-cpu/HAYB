import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { adminLogoutAction } from './actions';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAV = [
  { href: '/secretadmin', label: 'Genel Bakış' },
  { href: '/secretadmin/basvurular', label: 'Başvurular' },
  { href: '/secretadmin/partnerler', label: 'Partnerler' },
  { href: '/secretadmin/paketler', label: 'Paketler' },
  { href: '/secretadmin/leads', label: "Lead'ler" },
  { href: '/secretadmin/satislar', label: 'Satışlar' },
  { href: '/secretadmin/komisyonlar', label: 'Komisyonlar' },
  { href: '/secretadmin/komisyon-kurallari', label: 'Komisyon Kuralları' },
  { href: '/secretadmin/destek', label: 'Destek' },
  { href: '/secretadmin/audit-logs', label: 'Audit Log' },
];

export default function SecretAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 text-fg">
      <DashboardHeader brandLabel="HAYB Admin" navItems={NAV} logoutAction={adminLogoutAction} />
      {children}
    </div>
  );
}
