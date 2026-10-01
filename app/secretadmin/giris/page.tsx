import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminLoginForm } from './AdminLoginForm';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB</p>
          <h1 className="mt-2 text-2xl font-bold text-fg">Admin Girişi</h1>
        </div>
        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
