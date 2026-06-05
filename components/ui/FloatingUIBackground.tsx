/* FloatingUIBackground — CSS animasyonu ile GPU'ya bırakıldı, kasma yok */
import styles from './FloatingUIBackground.module.css';

function UICard({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`absolute rounded-xl border border-white/[0.04] bg-white/[0.015] ${className}`}>
      {children}
    </div>
  );
}

export function FloatingUIBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">

      {/* Sol üst — dashboard */}
      <div className={`absolute top-[15%] -left-8 opacity-[0.06] ${styles.float1}`}>
        <UICard className="w-52 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-white/20" />
            <div className="h-2 w-20 rounded bg-white/20" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[1,2,3].map(i => (
              <div key={i} className="h-8 rounded-lg bg-white/10 flex flex-col items-center justify-center gap-1">
                <div className="h-2 w-6 rounded bg-white/20" />
                <div className="h-1.5 w-4 rounded bg-white/10" />
              </div>
            ))}
          </div>
          <div className="h-12 rounded-lg bg-white/10 flex items-end gap-1 px-2 pb-1">
            {[40,65,50,80,60,90,75].map((h,i) => (
              <div key={i} className="flex-1 rounded-sm bg-white/25" style={{height:`${h}%`}} />
            ))}
          </div>
        </UICard>
      </div>

      {/* Sağ üst — mobil */}
      <div className={`absolute top-[8%] -right-6 opacity-[0.05] ${styles.float2}`}>
        <UICard className="w-28 overflow-hidden">
          <div className="h-3 bg-white/10 flex items-center justify-center">
            <div className="w-8 h-1 rounded bg-white/20" />
          </div>
          <div className="p-2 space-y-1.5">
            <div className="h-10 rounded-lg bg-white/10" />
            <div className="h-2 rounded bg-white/15 w-3/4" />
            <div className="h-2 rounded bg-white/10 w-1/2" />
            <div className="grid grid-cols-3 gap-1">
              {[1,2,3].map(i => <div key={i} className="h-5 rounded-md bg-white/10" />)}
            </div>
            <div className="h-5 rounded-lg bg-white/15" />
          </div>
        </UICard>
      </div>

      {/* Sol orta — form */}
      <div className={`absolute top-[45%] -left-12 opacity-[0.04] ${styles.float3}`}>
        <UICard className="w-44 p-3 space-y-2">
          <div className="h-2 w-24 rounded bg-white/20" />
          {[1,2,3].map(i => (
            <div key={i} className="h-6 rounded-lg border border-white/10 bg-white/[0.03]" />
          ))}
          <div className="h-7 rounded-lg bg-white/15" />
        </UICard>
      </div>

      {/* Sağ orta — stat */}
      <div className={`absolute top-[40%] -right-8 opacity-[0.05] ${styles.float4}`}>
        <UICard className="w-40 p-3 space-y-2">
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/15" />
            <div className="space-y-1 flex-1">
              <div className="h-2 rounded bg-white/20 w-3/4" />
              <div className="h-1.5 rounded bg-white/10 w-1/2" />
            </div>
          </div>
          <div className="space-y-1">
            {[80,60,90].map((w,i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-1.5 rounded bg-white/20" style={{width:`${w}%`}} />
                <div className="h-1.5 rounded bg-white/10 flex-1" />
              </div>
            ))}
          </div>
        </UICard>
      </div>

      {/* Alt sol — web */}
      <div className={`absolute bottom-[20%] -left-16 opacity-[0.04] ${styles.float5}`}>
        <UICard className="w-56 overflow-hidden">
          <div className="h-4 bg-white/[0.06] flex items-center gap-1 px-2">
            {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
          </div>
          <div className="p-3 space-y-2">
            <div className="h-3 rounded bg-white/15 w-1/2" />
            <div className="h-2 rounded bg-white/10 w-full" />
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="h-12 rounded-lg bg-white/[0.06]" />
              <div className="h-12 rounded-lg bg-white/[0.06]" />
            </div>
          </div>
        </UICard>
      </div>

      {/* Alt sağ — pricing */}
      <div className={`absolute bottom-[15%] -right-10 opacity-[0.04] ${styles.float2}`}>
        <UICard className="w-36 p-3 space-y-2">
          <div className="h-2 w-16 rounded bg-white/20" />
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="h-1.5 flex-1 rounded bg-white/10" />
            </div>
          ))}
          <div className="h-6 rounded-lg bg-white/15" />
        </UICard>
      </div>

    </div>
  );
}
