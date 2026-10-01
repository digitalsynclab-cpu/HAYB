import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { PartnerLoginForm } from './PartnerLoginForm';

export const metadata: Metadata = buildMetadata({ title: 'Partner Girişi', description: 'HAYB Partner paneline giriş yapın.', path: '/partner/giris', noindex: true });

export default function PartnerLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-4 py-24">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Partner</p>
          <h1 className="mt-2 text-2xl font-bold text-fg">Partner Girişi</h1>
        </div>
        <PartnerLoginForm />
        <p className="mt-6 text-center text-sm text-fg-muted">
          Henüz partner değil misiniz?{' '}
          <Link href="/partner/basvuru" className="text-lime underline">
            Başvuru yapın
          </Link>
        </p>
      </div>
    </main>
  );
}
