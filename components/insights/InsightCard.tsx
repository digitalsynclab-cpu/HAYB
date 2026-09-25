import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { readingMinutes, type Insight } from '@/data/insights';

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Insights makale kartı: tüm kart tek bağlantıdır. */
export function InsightCard({ post }: { post: Insight }) {
  return (
    <article data-spot className="surface-light press group relative flex h-full flex-col rounded-card p-5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(20_24_16/0.12)] sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-on-light-muted">{post.category}</p>
      <h3 className="mt-2 text-balance text-xl font-bold leading-snug">
        <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-on-light">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-on-light-muted">{post.description}</p>
      <p className="mt-4 flex items-center justify-between gap-3 text-sm text-on-light-muted">
        <span>
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} dk okuma
        </span>
        <ArrowRight aria-hidden className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  );
}
