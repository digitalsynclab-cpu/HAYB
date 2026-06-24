'use client';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'Next.js', abbr: 'N' },
  { name: 'React', abbr: 'R' },
  { name: 'TypeScript', abbr: 'TS' },
  { name: 'Tailwind CSS', abbr: 'TW' },
  { name: 'Node.js', abbr: 'NO' },
  { name: 'PostgreSQL', abbr: 'PG' },
  { name: 'Framer Motion', abbr: 'FM' },
  { name: 'Figma', abbr: 'FG' },
  { name: 'Vercel', abbr: 'VC' },
  { name: 'Supabase', abbr: 'SB' },
  { name: 'OpenAI', abbr: 'AI' },
  { name: 'Git', abbr: 'GIT' },
];

// Sonsuz kayan şerit için listeyi iki kez tekrarla
const doubled = [...technologies, ...technologies];

export function TechStack() {
  return (
    <div className="relative overflow-hidden py-6">
      {/* Sol fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#060B14] to-transparent z-10 pointer-events-none" />
      {/* Sağ fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#060B14] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#2563EB]/12 bg-[#0D1526]/80 flex-shrink-0 select-none"
          >
            {/* Logo placeholder — monogram */}
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2563EB]/30 to-[#1D4ED8]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[7px] font-bold text-[#60A5FA]">{tech.abbr}</span>
            </div>
            <span className="text-xs font-medium text-[#8BA3C7] whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
