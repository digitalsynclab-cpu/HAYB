'use client';
import { useEffect, useState } from 'react';
import { useMotionConfig } from '@/hooks/useReducedMotion';

const lines = [
  { prefix: '$', text: 'hayb init --project my-app', color: 'text-[#8BA3C7]' },
  { prefix: '✓', text: 'Proje analizi tamamlandı', color: 'text-green-400' },
  { prefix: '✓', text: 'UI/UX tasarımı hazırlanıyor...', color: 'text-green-400' },
  { prefix: '✓', text: 'Frontend geliştirme başladı', color: 'text-green-400' },
  { prefix: '✓', text: 'Backend API kuruldu', color: 'text-green-400' },
  { prefix: '✓', text: 'Veritabanı yapılandırıldı', color: 'text-green-400' },
  { prefix: '✓', text: 'SEO optimizasyonu uygulandı', color: 'text-green-400' },
  { prefix: '$', text: 'hayb deploy --production', color: 'text-[#8BA3C7]' },
  { prefix: '🚀', text: 'Projeniz yayında! hayb.dev/my-app', color: 'text-[#60A5FA]' },
];

export function TerminalBlock() {
  const [visibleCount, setVisibleCount] = useState(1);
  const { shouldReduce } = useMotionConfig();

  useEffect(() => {
    if (shouldReduce) {
      setVisibleCount(lines.length);
      return;
    }
    if (visibleCount >= lines.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 600);
    return () => clearTimeout(timer);
  }, [visibleCount, shouldReduce]);

  return (
    <div className="rounded-2xl overflow-hidden border border-[#2563EB]/15 bg-[#060B14] shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1526] border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[11px] text-[#8BA3C7]/50 ml-2 font-mono">terminal — hayb-studio</span>
      </div>

      {/* Terminal content */}
      <div className="p-5 font-mono text-sm space-y-2 min-h-[220px]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className="flex items-start gap-3"
          >
            <span className={`flex-shrink-0 ${line.color} w-4 text-center`}>{line.prefix}</span>
            <span className={`${line.color} text-xs leading-relaxed`}>{line.text}</span>
          </div>
        ))}
        {/* Cursor */}
        {visibleCount < lines.length && (
          <div className="flex items-center gap-3">
            <span className="text-[#8BA3C7] w-4 text-center">$</span>
            <span className="inline-block w-2 h-4 bg-[#2563EB] animate-pulse rounded-[2px]" />
          </div>
        )}
      </div>
    </div>
  );
}
