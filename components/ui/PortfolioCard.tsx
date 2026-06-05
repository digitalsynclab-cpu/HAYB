'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImageLightbox } from '@/components/ui/ImageLightbox';
import type { Project } from '@/types';

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const isExternalLink = !!(project.href || (project.externalUrl && project.externalUrl !== '#'));

  const handleMainClick = () => {
    // BebeklerSoruyor → dışarı aç, diğerleri → lightbox
    if (isExternalLink) {
      if (project.href) window.location.href = project.href;
      else if (project.externalUrl) window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (!imgError && project.image) {
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'group rounded-2xl border border-[#2563EB]/15 overflow-hidden bg-[#060B14]',
          'transition-all duration-500 hover:border-[#2563EB]/40 hover:shadow-2xl hover:shadow-[#2563EB]/10 hover:-translate-y-1.5',
          'cursor-pointer'
        )}
        onClick={handleMainClick}
      >
        {/* Görsel */}
        <div className="relative w-full overflow-hidden bg-[#060B14]" style={{ aspectRatio: '4/3' }}>
          {!imgError && project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} — UI/UX tasarım mockup`}
              fill
              className={cn(
                'object-contain object-center',
                'transition-transform duration-700 ease-out',
                'group-hover:scale-[1.06]',
                isInView && 'scale-[1.03]'
              )}
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D1526] to-[#111E35] flex items-center justify-center">
              <p className="text-sm text-[#8BA3C7]/50">{project.name}</p>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#060B14]/0 group-hover:bg-[#060B14]/30 transition-colors duration-300 flex items-center justify-center z-10">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shadow-xl shadow-[#2563EB]/40">
              {isExternalLink
                ? <ArrowUpRight size={20} className="text-white" />
                : <ZoomIn size={20} className="text-white" />
              }
            </div>
          </div>

          {/* Kategori rozeti */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold border border-[#2563EB]/30 bg-[#060B14]/80 backdrop-blur-md text-[#60A5FA]">
              {project.category}
            </span>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-5 pt-4">
          <h3 className="text-[#F0F6FF] font-bold text-base mb-1.5 leading-tight">{project.name}</h3>
          <p className="text-[#8BA3C7] text-sm leading-relaxed">
            {project.description}
          </p>
          {isExternalLink && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#60A5FA] group-hover:text-[#F0F6FF] transition-colors duration-200">
              Projeyi İncele
              <ArrowUpRight size={14} aria-hidden="true" />
            </div>
          )}
        </div>
      </motion.article>

      {/* Lightbox */}
      {lightboxOpen && project.image && (
        <ImageLightbox
          src={project.image}
          alt={project.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
