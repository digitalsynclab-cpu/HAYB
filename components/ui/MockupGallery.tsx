'use client';

/* ─── Tek Telefon Ekranı ─────────────────────────────── */
function PhoneScreen({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[24px] bg-[#0A1628] border border-[#2563EB]/20 shadow-2xl shadow-black/60 overflow-hidden w-[130px] flex-shrink-0 ${className}`}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#060B14] rounded-b-2xl z-20" />
      {/* Status */}
      <div className="flex justify-between items-center px-3 pt-1.5 pb-0 mt-5">
        <span className="text-[7px] text-white/30 font-semibold">9:41</span>
        <div className="flex gap-[3px] items-end h-2.5">
          {[2,3,4.5,6].map((h,i) => <div key={i} className="w-[2px] bg-white/25 rounded-[1px]" style={{height:h}} />)}
        </div>
      </div>
      {/* Content */}
      <div className="px-2.5 pb-3">{children}</div>
      {/* Home bar */}
      <div className="flex justify-center pb-2">
        <div className="w-10 h-[4px] rounded-full bg-white/15" />
      </div>
    </div>
  );
}

/* ─── Ekran 1: Dashboard / Finans ───────────────────── */
function Screen1() {
  return (
    <PhoneScreen>
      <div className="space-y-2 mt-1">
        <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl p-2.5">
          <p className="text-[7px] text-blue-200">Toplam Bakiye</p>
          <p className="text-base font-bold text-white leading-tight">₺48.920</p>
          <p className="text-[7px] text-green-300 mt-0.5">+2.4% bu ay</p>
        </div>
        <div className="bg-[#060B14] rounded-xl p-2 border border-[#2563EB]/10">
          <p className="text-[7px] text-[#8BA3C7] mb-1.5">Harcama Analizi</p>
          <div className="flex items-end gap-1 h-8">
            {[40,65,50,80,60,90,72].map((h,i) => (
              <div key={i} className="flex-1 rounded-[2px]" style={{height:`${h}%`, background: i===5 ? '#2563EB' : 'rgba(37,99,235,0.25)'}} />
            ))}
          </div>
        </div>
        {[{n:'Market',a:'-₺218',c:'bg-orange-500'},{n:'Maaş',a:'+₺12K',c:'bg-green-500'},{n:'Spotify',a:'-₺49',c:'bg-purple-500'}].map(t=>(
          <div key={t.n} className="flex items-center gap-1.5 bg-[#060B14] rounded-lg px-2 py-1.5 border border-white/[0.04]">
            <div className={`w-4 h-4 rounded-md ${t.c}/20 flex-shrink-0`} />
            <span className="flex-1 text-[7px] text-white/70">{t.n}</span>
            <span className={`text-[7px] font-medium ${t.a.startsWith('+') ? 'text-green-400' : 'text-white/50'}`}>{t.a}</span>
          </div>
        ))}
      </div>
    </PhoneScreen>
  );
}

/* ─── Ekran 2: Sosyal Medya Yönetim ─────────────────── */
function Screen2() {
  return (
    <PhoneScreen>
      <div className="space-y-2 mt-1">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-bold text-[#F0F6FF]">HAYB Studio</p>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center">
            <span className="text-[6px] font-bold text-white">H</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{l:'Takipçi',v:'24.8K'},{l:'Erişim',v:'184K'},{l:'Etk.',v:'%4.7'}].map(s=>(
            <div key={s.l} className="bg-[#060B14] rounded-lg p-1.5 border border-[#2563EB]/10 text-center">
              <p className="text-[8px] font-bold text-[#F0F6FF]">{s.v}</p>
              <p className="text-[6px] text-[#8BA3C7]">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#060B14] rounded-lg p-2 border border-[#2563EB]/10">
          <p className="text-[7px] text-[#8BA3C7] mb-1.5">Haftalık Etkileşim</p>
          <div className="flex items-end gap-1 h-8">
            {[45,70,55,85,65,90,78].map((h,i)=>(
              <div key={i} className="flex-1 rounded-[2px]" style={{height:`${h}%`, background: i===5 ? '#2563EB' : 'rgba(37,99,235,0.25)'}} />
            ))}
          </div>
        </div>
        <p className="text-[7px] text-[#8BA3C7] font-medium">Planlanan İçerikler</p>
        {[{t:'Bugün 14:00',s:'Planlandı'},{t:'Yarın 11:00',s:'Taslak'}].map(p=>(
          <div key={p.t} className="flex items-center gap-1.5 bg-[#060B14] rounded-lg px-2 py-1.5 border border-white/[0.04]">
            <div className={`w-5 h-5 rounded-md flex-shrink-0 ${p.s==='Planlandı' ? 'bg-[#2563EB]/30' : 'bg-white/[0.06]'}`} />
            <span className="flex-1 text-[7px] text-white/70">{p.t}</span>
            <span className={`text-[6px] px-1 py-0.5 rounded-full ${p.s==='Planlandı' ? 'bg-[#2563EB]/20 text-[#60A5FA]' : 'bg-white/[0.06] text-[#8BA3C7]'}`}>{p.s}</span>
          </div>
        ))}
      </div>
    </PhoneScreen>
  );
}

/* ─── Ekran 3: E-ticaret / Ürün Listesi ─────────────── */
function Screen3() {
  return (
    <PhoneScreen>
      <div className="space-y-2 mt-1">
        <div className="h-5 bg-[#060B14] rounded-lg border border-white/[0.06] flex items-center px-2 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#8BA3C7]/30" />
          <span className="text-[6px] text-[#8BA3C7]/50">Ürün ara...</span>
        </div>
        <div className="flex gap-1 overflow-hidden">
          {['Tümü','Yeni','İndirim','Popüler'].map((c,i)=>(
            <div key={c} className={`flex-shrink-0 px-1.5 py-0.5 rounded-full text-[6px] font-medium ${i===0 ? 'bg-[#2563EB] text-white' : 'bg-[#111E35] text-[#8BA3C7] border border-white/[0.06]'}`}>{c}</div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            {clr:'from-[#2563EB]/20 to-[#1D4ED8]/10',p:'₺299',n:'Ürün A'},
            {clr:'from-[#8B5CF6]/20 to-[#7C3AED]/10',p:'₺199',n:'Ürün B'},
            {clr:'from-[#0891B2]/20 to-[#0E7490]/10',p:'₺449',n:'Ürün C'},
            {clr:'from-[#059669]/20 to-[#047857]/10',p:'₺149',n:'Ürün D'},
          ].map(item=>(
            <div key={item.n} className="bg-[#060B14] rounded-xl border border-white/[0.05] overflow-hidden">
              <div className={`h-12 bg-gradient-to-br ${item.clr}`} />
              <div className="p-1.5">
                <p className="text-[7px] text-[#F0F6FF] font-medium">{item.n}</p>
                <p className="text-[7px] text-[#2563EB] font-bold">{item.p}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-lg py-2 text-center">
          <span className="text-[7px] font-semibold text-white">Sepete Ekle</span>
        </div>
      </div>
    </PhoneScreen>
  );
}

/* ─── Web Mockup — Profesyonel SaaS Dashboard ─────────── */
function WebMockup() {
  return (
    <div className="relative w-full">
      {/* Glow */}
      <div className="absolute -inset-8 bg-[#2563EB]/06 rounded-3xl blur-3xl pointer-events-none" />

      <div className="relative rounded-2xl overflow-hidden border border-[#2563EB]/20 bg-[#060B14] shadow-2xl shadow-black/70">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1222] border-b border-white/[0.05]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 mx-3 h-6 rounded-lg bg-white/[0.04] border border-white/[0.04] flex items-center px-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400/50 flex-shrink-0" />
            <span className="text-[10px] text-[#8BA3C7]/50 font-mono">dashboard.hayb.dev</span>
          </div>
          <div className="flex gap-1.5">
            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.04]" />)}
          </div>
        </div>

        {/* App layout */}
        <div className="flex h-[420px] sm:h-[480px]">

          {/* Sidebar */}
          <div className="w-14 sm:w-52 bg-[#0A1222] border-r border-white/[0.04] flex flex-col py-4 flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-3 sm:px-4 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-white">H</span>
              </div>
              <span className="hidden sm:block text-xs font-semibold text-[#F0F6FF]">HAYB Dashboard</span>
            </div>

            {/* Nav items */}
            <div className="space-y-0.5 flex-1 px-2">
              {[
                { label: 'Genel Bakış', active: true },
                { label: 'Projeler', active: false },
                { label: 'Müşteriler', active: false },
                { label: 'Raporlar', active: false },
                { label: 'Ayarlar', active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-default ${
                    item.active
                      ? 'bg-[#2563EB]/20 border border-[#2563EB]/20'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center ${item.active ? 'bg-[#2563EB]' : 'bg-white/[0.06]'}`}>
                    <div className={`w-2 h-2 rounded-sm ${item.active ? 'bg-white/80' : 'bg-white/20'}`} />
                  </div>
                  <span className={`hidden sm:block text-[11px] font-medium ${item.active ? 'text-[#F0F6FF]' : 'text-[#8BA3C7]'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* User */}
            <div className="px-2 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[7px] font-bold text-white">H</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-medium text-[#F0F6FF]">HAYB Studio</p>
                  <p className="text-[8px] text-[#8BA3C7]">Pro Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-hidden p-4 sm:p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#F0F6FF]">Genel Bakış</h3>
                <p className="text-[10px] text-[#8BA3C7]">Haziran 2026</p>
              </div>
              <div className="flex gap-2">
                <div className="h-7 px-3 rounded-lg bg-[#2563EB] flex items-center">
                  <span className="text-[10px] font-medium text-white">+ Yeni Proje</span>
                </div>
                <div className="h-7 px-3 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center">
                  <span className="text-[10px] text-[#8BA3C7]">Filtrele</span>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Toplam Gelir', value: '₺124K', change: '+18%', up: true },
                { label: 'Aktif Proje', value: '8', change: '+3', up: true },
                { label: 'Müşteri', value: '24', change: '+5', up: true },
                { label: 'Teslim', value: '16', change: 'bu yıl', up: null },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-[#0D1526] rounded-xl p-3 border border-[#2563EB]/08">
                  <p className="text-[9px] text-[#8BA3C7] mb-1">{kpi.label}</p>
                  <p className="text-base font-bold text-[#F0F6FF] leading-none">{kpi.value}</p>
                  <p className={`text-[9px] mt-1 ${kpi.up === true ? 'text-green-400' : kpi.up === false ? 'text-red-400' : 'text-[#8BA3C7]'}`}>
                    {kpi.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart + Table row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {/* Revenue chart */}
              <div className="sm:col-span-3 bg-[#0D1526] rounded-xl p-3.5 border border-[#2563EB]/08">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-medium text-[#F0F6FF]">Aylık Gelir</p>
                  <div className="flex gap-1">
                    {['6A','1Y','3A'].map((t,i) => (
                      <span key={t} className={`text-[8px] px-1.5 py-0.5 rounded ${i===1 ? 'bg-[#2563EB] text-white' : 'text-[#8BA3C7]'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[30,48,38,65,52,78,62,85,70,92,80,100].map((h,i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11
                          ? '#2563EB'
                          : i >= 8
                            ? `rgba(37,99,235,${0.3 + i * 0.05})`
                            : 'rgba(37,99,235,0.15)'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'].map(m => (
                    <span key={m} className="text-[6px] text-[#8BA3C7]/40 flex-1 text-center">{m}</span>
                  ))}
                </div>
              </div>

              {/* Traffic sources */}
              <div className="sm:col-span-2 bg-[#0D1526] rounded-xl p-3.5 border border-[#2563EB]/08">
                <p className="text-[10px] font-medium text-[#F0F6FF] mb-3">Trafik Kaynakları</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Organik', pct: 68, color: '#2563EB' },
                    { label: 'Referans', pct: 22, color: '#8B5CF6' },
                    { label: 'Direkt', pct: 10, color: '#0891B2' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[9px] text-[#8BA3C7]">{s.label}</span>
                        <span className="text-[9px] font-medium text-[#F0F6FF]">{s.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.04] space-y-1.5">
                  <p className="text-[9px] text-[#8BA3C7]">Son Aktivite</p>
                  {['Yeni müşteri kaydı', 'Proje teslim edildi', 'Fatura gönderildi'].map(a => (
                    <div key={a} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-[#2563EB] flex-shrink-0" />
                      <span className="text-[8px] text-[#8BA3C7]">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects table */}
            <div className="bg-[#0D1526] rounded-xl border border-[#2563EB]/08 overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.04]">
                <p className="text-[10px] font-medium text-[#F0F6FF]">Aktif Projeler</p>
                <span className="text-[9px] text-[#60A5FA]">Tümünü gör</span>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {[
                  { name: 'NexFlow SaaS', client: 'Teknova A.Ş.', status: 'Geliştirme', pct: 72, color: '#2563EB' },
                  { name: 'MedNote Mobil', client: 'MedPro Ltd.', status: 'Tasarım', pct: 45, color: '#8B5CF6' },
                  { name: 'StockPilot ERP', client: 'RetailX', status: 'Test', pct: 90, color: '#059669' },
                ].map(p => (
                  <div key={p.name} className="flex items-center gap-3 px-3.5 py-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#2563EB]/12 flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] font-bold text-[#60A5FA]">{p.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-medium text-[#F0F6FF] truncate">{p.name}</p>
                      <p className="text-[8px] text-[#8BA3C7]">{p.client}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                      </div>
                      <span className="text-[8px] text-[#8BA3C7] w-6 text-right">{p.pct}%</span>
                    </div>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                      p.status === 'Test' ? 'bg-green-500/15 text-green-400' :
                      p.status === 'Geliştirme' ? 'bg-[#2563EB]/15 text-[#60A5FA]' :
                      'bg-purple-500/15 text-purple-400'
                    }`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */
export function MockupGallery() {
  return (
    <div className="space-y-16">
      {/* Mobil telefon mockupları — yan yana açılı */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-[#2563EB]/25 bg-[#2563EB]/[0.08] text-[#60A5FA]">Mobil Uygulama</span>
        </div>
        <p className="text-[#8BA3C7] text-sm mb-8 max-w-lg">
          Kullanıcı deneyimi ön planda, gerçek ürün hissi veren mobil uygulama arayüzleri.
        </p>
        {/* Mobil: tek telefon ortada | Masaüstü: 3 yan yana eğik */}
        <div className="py-10 bg-[#0D1526] rounded-2xl border border-[#2563EB]/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/[0.03] to-transparent pointer-events-none" />

          {/* Mobil görünüm — sadece ortadaki telefon, düz */}
          <div className="flex justify-center sm:hidden">
            <Screen2 />
          </div>

          {/* Tablet ve üstü — 3 telefon yan yana eğik */}
          <div className="hidden sm:flex items-end justify-center gap-4">
            <div className="transform -rotate-6 -translate-y-2 opacity-80 scale-90 origin-bottom">
              <Screen1 />
            </div>
            <div className="transform scale-110 z-10 drop-shadow-2xl">
              <Screen2 />
            </div>
            <div className="transform rotate-6 -translate-y-2 opacity-80 scale-90 origin-bottom">
              <Screen3 />
            </div>
          </div>
        </div>
      </div>

      {/* Web / Dashboard mockup */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-[#2563EB]/25 bg-[#2563EB]/[0.08] text-[#60A5FA]">Web & Dashboard</span>
        </div>
        <p className="text-[#8BA3C7] text-sm mb-8 max-w-lg">
          Kurumsal web siteleri ve yönetim panelleri için profesyonel tasarım çalışmaları.
        </p>
        <WebMockup />
      </div>
    </div>
  );
}
