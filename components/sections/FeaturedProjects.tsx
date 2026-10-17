'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface FeaturedItem {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  imageAlt: string;
  imageTone: 'transparent' | 'cover';
  badge: string;
}

/**
 * Öne çıkan projeler: sade liste + imleci takip eden önizleme görseli
 * (21st.dev "Project Showcase" / jatin-yadav05 temel alınarak uyarlandı).
 * Masaüstünde satırın üzerine gelince görsel imleci yumuşakça izler; dokunmatik ekranda
 * hover olmadığı için her satırda küçük görsel gösterilir.
 * Konum her karede state yerine doğrudan stile yazılır (gereksiz yeniden çizim yok).
 */
export function FeaturedProjects({ items }: { items: FeaturedItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (previewRef.current) previewRef.current.style.transform = `translate3d(${pos.current.x + 24}px, ${pos.current.y - 110}px, 0)`;
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active]);

  const onMove = (e: MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onEnter = (i: number, e: MouseEvent) => {
    // İlk girişte önizleme imlecin olduğu yerden başlasın (köşeden kaymasın).
    if (active === null) {
      onMove(e);
      pos.current = { ...target.current };
    }
    setActive(i);
  };

  return (
    <div ref={wrapRef} onMouseMove={onMove} className="relative">
      {/* Masaüstü önizleme */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl transition-[opacity,scale] duration-300 ease-out lg:block"
        style={{ opacity: active === null ? 0 : 1, scale: active === null ? '0.85' : '1' }}
      >
        <div className="relative h-[190px] w-[290px]">
          {items.map((p, i) => (
            <Image
              key={p.id}
              src={p.image}
              alt=""
              fill
              sizes="290px"
              className={`transition-[opacity,scale,filter] duration-500 ease-out ${p.imageTone === 'cover' ? 'object-cover' : 'object-contain p-3'}`}
              style={{ opacity: active === i ? 1 : 0, scale: active === i ? '1' : '1.1', filter: active === i ? 'none' : 'blur(10px)' }}
            />
          ))}
        </div>
      </div>

      <ul className="border-b border-white/10">
        {items.map((p, i) => (
          <li key={p.id} onMouseEnter={(e) => onEnter(i, e)} onMouseLeave={() => setActive(null)}>
            <Link href={`/projeler/${p.id}`} className="group relative flex items-center gap-4 border-t border-white/10 py-4 sm:gap-5 sm:py-5">
              <span
                aria-hidden
                className={`absolute inset-y-1 -inset-x-3 rounded-xl bg-white/[0.04] transition duration-300 ease-out ${active === i ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              />
              {/* Dokunmatik / küçük ekran küçük görseli */}
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-ink-900 lg:hidden">
                <Image src={p.image} alt={p.imageAlt} fill sizes="56px" className={p.imageTone === 'cover' ? 'object-cover' : 'object-contain p-1'} />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="relative truncate text-lg font-bold tracking-tight sm:text-xl">
                    {p.name}
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-lime transition-all duration-300 ease-out ${active === i ? 'w-full' : 'w-0'}`} />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className={`h-4 w-4 shrink-0 text-lime transition duration-300 ease-out ${active === i ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-2 translate-y-2 opacity-0'}`}
                  />
                </span>
                <span className={`mt-0.5 line-clamp-1 text-sm transition-colors duration-300 sm:text-[0.95rem] ${active === i ? 'text-fg/80' : 'text-fg-muted'}`}>{p.description}</span>
              </span>
              <span className="relative hidden shrink-0 text-right sm:block">
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-lime">{p.type}</span>
                <span className="mt-1 block text-xs text-fg-muted">{p.badge}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
