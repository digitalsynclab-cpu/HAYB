import Link from 'next/link';
import type { Block } from '@/data/insights';

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)]+\))/g;

/** Metin içi **kalın** ve [bağlantı](/iç-yol) biçimini işler. Yalnızca iç bağlantılara izin verir. */
export function Inline({ text, linkClass = 'font-semibold underline decoration-lime underline-offset-4 hover:text-on-light-muted' }: { text: string; linkClass?: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        const b = part.match(/^\*\*([^*]+)\*\*$/);
        if (b) return <strong key={i} className="font-semibold">{b[1]}</strong>;
        const l = part.match(/^\[([^\]]+)\]\((\/[^)]+)\)$/);
        if (l) return <Link key={i} href={l[2]} className={linkClass}>{l[1]}</Link>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/** Makale gövdesi: başlıklar, paragraflar, listeler ve bilgi kutusu. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-[1.75] text-on-light sm:text-lg sm:leading-[1.8]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="!mt-10 text-balance text-[1.4rem] font-extrabold leading-tight tracking-tight sm:text-[1.65rem]">
                {b.text}
              </h2>
            );
          case 'p':
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="ml-1 space-y-2.5">
                {b.items.map((it) => (
                  <li key={it} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-2 before:w-2 before:rounded-full before:bg-lime">
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="ml-1 list-decimal space-y-2.5 pl-6 marker:font-bold">
                {b.items.map((it) => (
                  <li key={it} className="pl-1">
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case 'callout':
            return (
              <aside key={i} className="!mt-8 rounded-2xl border border-on-light/15 bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold uppercase tracking-[0.14em]">{b.title}</p>
                <p className="mt-1.5 text-[1rem] leading-relaxed sm:text-[1.05rem]">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
