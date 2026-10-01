import { FreeformEmailForm } from './FreeformEmailForm';

export default function AdminFreeformEmailPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Mail Gönder</h1>
      <p className="mt-1 text-sm text-fg-muted">İstediğiniz adrese, istediğiniz metinle, HAYB marka tasarımında e-posta gönderin.</p>

      <div className="mt-6">
        <FreeformEmailForm />
      </div>
    </main>
  );
}
