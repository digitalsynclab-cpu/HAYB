import Link from 'next/link';
import { Handshake, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';

/** Ana sayfada HAYB Partner programına dikkat çekici, kısa bir giriş — detay vermez, /partner'a yönlendirir. */
export function PartnerTeaser() {
  return (
    <Section tone="dark">
      <Link
        href="/partner"
        className="group flex flex-col items-start justify-between gap-5 rounded-3xl border border-lime/30 bg-gradient-to-br from-lime/10 via-white/5 to-transparent p-7 transition hover:border-lime/60 sm:flex-row sm:items-center sm:p-9"
      >
        <div className="flex items-start gap-4 sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime/15 text-lime">
            <Handshake aria-hidden className="h-6 w-6" />
          </span>
          <div>
            <p className="text-balance text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-fg sm:text-4xl">
              <span className="text-lime">HAYB Partner</span> olun, getirdiğiniz her satıştan komisyon kazanın.
            </p>
            <p className="mt-3 text-lg text-fg-muted">Müşteriyi siz bulun, projeyi HAYB geliştirsin, satıştan komisyon kazanın.</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-lime px-5 py-3 text-sm font-semibold text-ink-950 transition group-hover:bg-lime-soft">
          Partnerlik Hakkında Bilgi Alın
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Section>
  );
}
