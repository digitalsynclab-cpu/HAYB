'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { whatsappUrl } from '@/data/site';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="tone-dark flex min-h-[70vh] items-center pt-[var(--hayb-header-h)]">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Bir şeyler ters gitti.</h1>
        <p className="mt-4 text-lg text-fg-muted">Sayfa yüklenirken beklenmedik bir sorun oluştu. Tekrar deneyebilir ya da bize WhatsApp&apos;tan yazabilirsiniz.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset} arrow={false}>
            Tekrar Dene
          </Button>
          <Button href={whatsappUrl('Merhaba, sitede bir sorunla karşılaştım.')} variant="secondary" arrow={false}>
            WhatsApp ile Yaz
          </Button>
        </div>
      </div>
    </section>
  );
}
