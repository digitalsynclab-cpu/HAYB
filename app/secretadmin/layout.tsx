import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAV = [
  { href: '/secretadmin', label: 'Genel Bakış' },
  { href: '/secretadmin/basvurular', label: 'Başvurular' },
  { href: '/secretadmin/partnerler', label: 'Partnerler' },
  { href: '/secretadmin/leads', label: "Lead'ler" },
  { href: '/secretadmin/satislar', label: 'Satışlar' },
  { href: '/secretadmin/komisyonlar', label: 'Komisyonlar' },
  { href: '/secretadmin/komisyon-kurallari', label: 'Komisyon Kuralları' },
  { href: '/secretadmin/audit-logs', label: 'Audit Log' },
];

export default function SecretAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 text-fg">
      <nav className="overflow-x-auto border-b border-white/10">
        <div className="mx-auto flex max-w-6xl gap-1 px-6 py-3 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-fg-muted hover:bg-white/5 hover:text-fg">
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </div>
  );
}
