import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { WebsiteOrderFormView } from '@/components/order/WebsiteOrderForm';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Web Sitesi Siparişi: Projenizi Başlatın',
  description:
    'Web sitesi projenizi başlatmak için bilgilerinizi iletin. Birkaç adımda işletmenizi ve tasarım tercihinizi anlatın; bilgileriniz düzenli bir WhatsApp mesajına dönüşür.',
  path: '/web-sitesi-siparis',
});

export default function WebsiteOrderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Hizmetler', path: '/hizmetler' },
          { name: 'Web Sitesi', path: '/hizmetler/web-sitesi' },
          { name: 'Web Sitesi Siparişi', path: '/web-sitesi-siparis' },
        ]}
      />
      {/* Kompakt üst alan: form ilk ekranda görünsün (mobil öncelikli) */}
      <section aria-labelledby="siparis-baslik" className="tone-dark relative overflow-hidden pb-[calc(var(--hayb-curve)+1.25rem)] pt-[calc(var(--hayb-header-h)+1.25rem)] sm:pt-[calc(var(--hayb-header-h)+2rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full opacity-60"
          style={{ background: 'radial-gradient(closest-side, rgb(var(--hayb-lime) / 0.12), transparent)' }}
        />
        <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <nav aria-label="Konum" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
              <li className="flex items-center gap-1.5">
                <Link href="/hizmetler" className="inline-flex min-h-8 items-center hover:text-lime">Hizmetler</Link>
                <ChevronRight aria-hidden className="h-4 w-4" />
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/hizmetler/web-sitesi" className="inline-flex min-h-8 items-center hover:text-lime">Web Sitesi</Link>
                <ChevronRight aria-hidden className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-fg">Sipariş</li>
            </ol>
          </nav>
          <div className="mx-auto max-w-3xl">
            <h1 id="siparis-baslik" className="text-balance text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
              Web Sitenizi Birlikte <span className="accent-text">Başlatalım.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[0.95rem] text-fg-muted sm:text-lg">
              Projenizi doğru şekilde planlayabilmemiz için birkaç temel bilgi yeterli. Elinizde olmayan veya henüz karar vermediğiniz alanları boş bırakabilirsiniz. Geri kalanını birlikte netleştiririz.
            </p>
          </div>
        </div>
      </section>

      <Section tone="dark-2" labelledBy="siparis-form">
        <h2 id="siparis-form" className="sr-only">
          Web sitesi sipariş formu
        </h2>
        <WebsiteOrderFormView />
      </Section>
    </>
  );
}
