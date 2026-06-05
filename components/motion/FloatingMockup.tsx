'use client';
import { motion } from 'framer-motion';
import { useMotionConfig } from '@/hooks/useReducedMotion';

export function FloatingMockup() {
  const { shouldReduce } = useMotionConfig();

  return (
    <motion.div
      animate={shouldReduce ? {} : { y: [0, -14, 0] }}
      transition={shouldReduce ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-lg mx-auto"
      aria-hidden="true"
    >
      {/* Glow effect */}
      <div className="absolute -inset-8 bg-[#2563EB]/[0.07] rounded-full blur-3xl" />

      {/* Browser window — Dashboard */}
      <div className="relative rounded-2xl overflow-hidden border border-[#2563EB]/20 bg-[#0D1526] shadow-2xl shadow-black/60">
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06] bg-[#060B14]">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <div className="flex-1 mx-4 h-5 rounded-md bg-white/[0.05] flex items-center px-3">
            <div className="w-2 h-2 rounded-full bg-green-400/60 mr-2" />
            <span className="text-[10px] text-[#8BA3C7]">app.hayb.dev/dashboard</span>
          </div>
        </div>

        {/* Dashboard layout */}
        <div className="flex h-52">
          {/* Sidebar */}
          <div className="w-14 bg-[#060B14] border-r border-white/[0.05] flex flex-col items-center py-3 gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-white/80" />
            </div>
            {[0.4, 0.25, 0.25, 0.25].map((op, i) => (
              <div key={i} className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                <div className="w-3.5 h-0.5 rounded bg-white/40" style={{ opacity: op }} />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 space-y-3">
            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Gelir', value: '₺124K', trend: '+12%' },
                { label: 'Kullanıcı', value: '8.4K', trend: '+8%' },
                { label: 'Dönüşüm', value: '%3.2', trend: '+0.4' },
              ].map((m) => (
                <div key={m.label} className="bg-[#060B14] rounded-xl p-2.5 border border-[#2563EB]/10">
                  <p className="text-[9px] text-[#8BA3C7] mb-0.5">{m.label}</p>
                  <p className="text-sm font-bold text-[#F0F6FF] leading-none">{m.value}</p>
                  <p className="text-[9px] text-green-400 mt-0.5">{m.trend}</p>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="bg-[#060B14] rounded-xl p-3 border border-[#2563EB]/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] text-[#8BA3C7]">Aylık Büyüme</p>
                <div className="flex gap-1">
                  {['7G', '1A', '3A'].map((t, i) => (
                    <span key={t} className={`text-[8px] px-1.5 py-0.5 rounded ${i === 1 ? 'bg-[#2563EB] text-[#F0F6FF]' : 'text-[#8BA3C7]'}`}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-1 h-10">
                {[30, 55, 42, 70, 58, 85, 68, 90, 75, 95, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${i === 11 ? 'bg-[#2563EB]' : 'bg-[#2563EB]/30'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Table rows */}
            <div className="space-y-1.5">
              {[
                { name: 'Proje Alpha', status: 'Aktif', pct: 78 },
                { name: 'Proje Beta', status: 'İnceleme', pct: 45 },
              ].map((row) => (
                <div key={row.name} className="flex items-center gap-2 bg-[#060B14] rounded-lg px-2.5 py-1.5 border border-white/[0.04]">
                  <div className="w-5 h-5 rounded-md bg-[#2563EB]/20 flex-shrink-0" />
                  <span className="text-[9px] text-[#F0F6FF] flex-1 truncate">{row.name}</span>
                  <span className="text-[8px] text-[#8BA3C7] bg-white/[0.06] px-1.5 py-0.5 rounded">{row.status}</span>
                  <div className="w-14 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone mockup — sağ alt */}
      <motion.div
        animate={shouldReduce ? {} : { y: [0, -8, 0] }}
        transition={shouldReduce ? {} : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-6 -right-6 w-24 z-10"
      >
        {/* Phone frame */}
        <div className="relative rounded-[18px] bg-[#0D1526] border-2 border-[#2563EB]/30 shadow-xl shadow-[#2563EB]/10 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-[#060B14] rounded-b-xl z-10" />
          {/* Screen */}
          <div className="bg-[#060B14] pt-4 pb-2 px-2 min-h-[120px]">
            {/* App header */}
            <div className="flex items-center justify-between mb-2 mt-1">
              <div className="w-12 h-1.5 rounded bg-white/20" />
              <div className="w-4 h-4 rounded-full bg-[#2563EB]/40" />
            </div>
            {/* Card */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl p-2 mb-2">
              <div className="w-10 h-1 rounded bg-white/30 mb-1" />
              <div className="w-16 h-2.5 rounded bg-white/80" />
              <div className="flex gap-1 mt-2">
                {[1,2,3].map(i => <div key={i} className="flex-1 h-1 rounded bg-white/20" />)}
              </div>
            </div>
            {/* List items */}
            {[0.7, 0.5].map((op, i) => (
              <div key={i} className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-lg bg-[#2563EB]/20 flex-shrink-0" />
                <div className="flex-1 space-y-0.5">
                  <div className="h-1 rounded bg-white/20 w-3/4" />
                  <div className="h-1 rounded bg-white/10 w-1/2" />
                </div>
              </div>
            ))}
          </div>
          {/* Home bar */}
          <div className="flex justify-center py-1 bg-[#060B14]">
            <div className="w-8 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

