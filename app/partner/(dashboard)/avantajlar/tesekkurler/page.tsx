import Link from 'next/link';

export default function OrderThankYouPage() {
  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="text-2xl font-bold">Talebin başarıyla alındı.</h1>
      <p className="mt-2 text-fg-muted">HAYB ekibi talebinizi inceleyip en kısa sürede sizinle iletişime geçecek.</p>
      <Link href="/partner/panel" className="mt-6 inline-block rounded-xl bg-lime px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
        Panele Dön
      </Link>
    </div>
  );
}
