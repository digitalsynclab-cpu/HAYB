'use client';
import { useEffect, useState } from 'react';
import { campaign } from '@/data/campaign';

const parts = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60) };
};

/** Kampanya bilgisi yalnızca Paketler sayfasında: yüzde, kapsam ve kalan süre. */
export function CampaignBar() {
  const end = new Date(campaign.endsAt).getTime();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(end - Date.now());
    tick();
    const t = window.setInterval(tick, 30000);
    return () => window.clearInterval(t);
  }, [end]);

  if (left !== null && left <= 0) return null;
  const p = left === null ? null : parts(left);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-[1.4rem] border border-lime/30 bg-lime/[0.06] px-5 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="text-base font-bold">
          {campaign.title}: tüm paketlerde <span className="rounded bg-lime px-1.5 text-ink-950">%{campaign.rate}</span> indirim
        </p>
        <p className="mt-0.5 text-sm text-fg-muted">Sitedeki fiyatlar kampanyalı fiyatlardır; üstü çizili tutar liste fiyatıdır.</p>
      </div>
      {p && (
        <p className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold tabular-nums" aria-label="Kampanya bitişine kalan süre">
          {p.d} gün {p.h} sa {p.m} dk kaldı
        </p>
      )}
    </div>
  );
}
