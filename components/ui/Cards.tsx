import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Icon3D } from '@/components/ui/Icon3D';
import type { IconName } from '@/data/icons';
import type { ServiceDetail } from '@/data/services';
import type { Project } from '@/data/projects';

/**
 * Açık zeminde hizmet kartı: 3D icon, başlık, açıklama, CTA. Tüm kart tek bir bağlantıdır.
 * Mobilde 2'li ızgaraya uygun dikey kompakt kart; wide: büyük ekranda tüm satırı kaplayan yatay kart.
 */
export function ServiceCard({ service, priority = false, wide = false }: { service: ServiceDetail; priority?: boolean; wide?: boolean }) {
  return (
    <article
      data-spot
      className={`surface-light press group relative flex h-full flex-col items-start gap-2.5 rounded-card p-3.5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(20_24_16/0.12)] sm:items-stretch sm:gap-0 sm:p-6 ${
        wide ? 'lg:flex-row lg:items-center lg:gap-6' : ''
      }`}
    >
      <Icon3D name={service.icon} size={84} priority={priority} fluid className="h-[3.25rem] w-[3.25rem] shrink-0 sm:-ml-1 sm:h-[var(--sz)] sm:w-[var(--sz)]" />
      <div className="flex min-w-0 flex-1 flex-col self-stretch">
        <h3 className={`text-[0.95rem] font-bold leading-tight sm:mt-5 sm:text-xl ${wide ? 'lg:mt-0' : ''}`}>
          <Link href={`/hizmetler/${service.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-on-light">
            {service.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-3 text-[0.8rem] leading-snug text-on-light-muted sm:mt-2 sm:line-clamp-none sm:flex-1 sm:text-base">{service.summary}</p>
        <ArrowRight aria-hidden className="mt-auto h-4 w-4 shrink-0 self-end pt-0 text-on-light-muted sm:hidden" />
        <span aria-hidden className={`mt-5 hidden h-11 w-11 items-center justify-center rounded-full border border-on-light/15 bg-white transition group-hover:border-on-light group-hover:bg-lime sm:inline-flex ${wide ? 'lg:hidden' : ''}`}>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      {wide && (
        <span aria-hidden className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-on-light/15 bg-white transition group-hover:border-on-light group-hover:bg-lime lg:inline-flex">
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </article>
  );
}

/** Kısa fayda kartı (3D icon + başlık + metin). */
export function IconCard({
  icon,
  title,
  text,
  tone = 'light',
  size = 68,
}: {
  icon: IconName;
  title: string;
  text: string;
  tone?: 'light' | 'dark';
  size?: number;
}) {
  return (
    <div data-spot className={`flex h-full items-start gap-4 rounded-card p-4 sm:block sm:p-6 ${tone === 'light' ? 'surface-light' : 'glass'}`}>
      <Icon3D name={icon} size={size} fluid className="h-14 w-14 shrink-0 sm:-ml-1 sm:h-[var(--sz)] sm:w-[var(--sz)]" />
      <div>
      <h3 className="text-lg font-bold sm:mt-4">{title}</h3>
      <p className="mt-1 text-muted sm:mt-1.5">{text}</p>
      </div>
    </div>
  );
}

/**
 * Ürün görseli. transparent: arka planı şeffaf ürün ekranı (koyu yüzeyde sığdırılır);
 * cover: kadrajı dolduran kapak görseli.
 */
export function ProjectImage({
  project,
  priority = false,
  sizes,
  className = '',
}: {
  project: Project;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const cover = project.imageTone === 'cover';
  return (
    // Çağıran `absolute inset-0` verdiyse `relative` eklenmez (aynı anda ikisi çakışıp yüksekliği 0 yapıyordu).
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative'} overflow-hidden ${cover ? 'bg-ink-800' : ''} ${className}`}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={`transition duration-500 ease-out group-hover:scale-[1.03] ${cover ? 'object-cover' : 'object-contain p-2 sm:p-3'}`}
      />
    </div>
  );
}

/** Proje kartı (koyu zemin). Görsel + tür + açıklama + kapsam etiketleri + tek bağlantı. */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article data-spot className="group relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-ink-800 transition duration-300 ease-out hover:-translate-y-1 hover:border-lime/50">
      <ProjectImage project={project} priority={priority} sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw" className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-lime">{project.type}</p>
        <h3 className="mt-2 text-xl font-bold">
          <Link href={`/projeler/${project.id}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-fg-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Kapsam">
          {project.scope.map((s) => (
            <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-sm text-fg-muted">
              {s}
            </li>
          ))}
        </ul>
        <span aria-hidden className="mt-5 inline-flex items-center gap-2 font-semibold text-fg group-hover:text-lime">
          Projeyi İncele <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}
