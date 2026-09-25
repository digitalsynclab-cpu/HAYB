import { templates } from '@/data/templates';
import { TemplateCard } from '@/components/templates/TemplateCard';

export { TemplateCard };

/** Kayan şerit (sosyal medya şablon şeridiyle aynı kalıp; üzerine gelince veya dokununca durur). */
export function TemplateMarquee() {
  return (
    <figure>
      <div className="marquee rounded-2xl" role="group" aria-label="Canlı denenebilir web sitesi şablonları">
        <div className="marquee-track items-stretch py-2" style={{ animationDuration: `${Math.max(70, templates.length * 9)}s` }}>
          {templates.map((t) => (
            <TemplateCard key={t.slug} t={t} className="w-[17.5rem] shrink-0 sm:w-[22rem]" />
          ))}
          {templates.map((t) => (
            <div key={`d-${t.slug}`} className="marquee-dup" aria-hidden>
              <TemplateCard t={t} dup className="w-[17.5rem] shrink-0 sm:w-[22rem]" />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-fg-muted">Örnek şablonlardır; markalar kurgusaldır. Birine dokunun, sitenin canlı halini kendi telefonunuzda deneyin.</figcaption>
    </figure>
  );
}
