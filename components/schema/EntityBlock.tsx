import { site as S } from '@/data/site';

/**
 * Görünür entity sinyali: footer üstünde, her sayfada. display:none / sr-only yok.
 * Sayı iddiası içermez (liste uzunluğundan sayı türetilmez).
 */
export function EntityBlock() {
  return (
    <section aria-label="Firma Bilgileri" className="tone-dark border-t border-white/10 py-8">
      <dl className="mx-auto grid max-w-page grid-cols-2 gap-4 px-4 text-xs text-fg-muted sm:grid-cols-3 sm:px-6 lg:px-8">
        <div>
          <dt className="font-semibold uppercase tracking-wider text-fg">Firma</dt>
          <dd className="mt-1">{S.officialName}</dd>
          <dd>Kuruluş: {S.founded}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-fg">Konum</dt>
          <dd className="mt-1">{S.address.addressLocality}</dd>
          <dd>{S.address.addressRegion}, Türkiye</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-fg">İletişim</dt>
          <dd className="mt-1">{S.contact.email}</dd>
          <dd>WhatsApp: 0507 342 06 61</dd>
        </div>
      </dl>
    </section>
  );
}
