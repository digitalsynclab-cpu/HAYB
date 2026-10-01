import { site } from '@/data/site';

export default function PartnerSupportPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-2xl font-bold">Destek</h1>
      <p className="mt-3 text-fg-muted">Bir sorunuz mu var? Doğrudan bize ulaşabilirsiniz.</p>
      <a href={`mailto:${site.contact.email}`} className="mt-6 inline-block rounded-xl bg-lime px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
        {site.contact.email}
      </a>
    </div>
  );
}
