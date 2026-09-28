/**
 * Yönetim paneli örneği. Tüm rakamlar DEMO veridir; gerçek müşteri verisi değildir.
 * Dekoratif olduğu için ekran okuyuculardan gizlenir, altında metin etiketi vardır.
 */
export function DashboardMockup({ className = '' }: { className?: string }) {
  const bars = [38, 52, 44, 66, 58, 78, 72, 90];
  const rows = [
    ['Yeni sipariş oluşturuldu', '2 sa önce'],
    ['Rapor dışa aktarıldı', '5 sa önce'],
    ['Kullanıcı yetkisi güncellendi', 'Dün'],
  ];
  return (
    <figure className={className}>
      <div aria-hidden className="overflow-hidden rounded-2xl border border-on-light/10 bg-white text-on-light shadow-soft">
        <div className="flex items-center justify-between border-b border-on-light/10 px-4 py-3 sm:px-5">
          <span className="text-sm font-bold">Panel</span>
          <span className="rounded-full bg-lime/60 px-2.5 py-0.5 text-[0.7rem] font-semibold text-on-light">Demo veri</span>
        </div>
        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                ['Gelir', '₺128K'],
                ['Kullanıcı', '1.240'],
                ['Proje', '36'],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0 rounded-xl bg-paper-100 p-2.5">
                  <p className="text-[0.7rem] text-on-light-muted">{k}</p>
                  <p className="text-sm font-bold">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-32 items-end gap-2 rounded-xl bg-paper-100 p-3 sm:h-36 sm:p-4">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-lime" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-paper-100 p-4">
            <p className="mb-3 text-sm font-bold">Son hareketler</p>
            <ul className="space-y-3">
              {rows.map(([a, t]) => (
                <li key={a} className="flex items-start gap-2 text-xs">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime" />
                  <span>
                    {a}
                    <span className="block text-on-light-muted">{t}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-fg-muted">Örnek yönetim paneli arayüzü. Gösterilen tüm rakamlar demo veridir.</figcaption>
    </figure>
  );
}
