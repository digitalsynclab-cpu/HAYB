'use client';

import { useMemo, useState } from 'react';
import { DownloadButton } from './DownloadButton';

type Dataset = {
  id: string;
  name: string;
  description: string | null;
  sector: string | null;
  city: string | null;
  district: string | null;
  record_count: number | null;
  file_path: string | null;
  updated_at: string;
};

export function DatasetList({ datasets }: { datasets: Dataset[] }) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('');
  const [city, setCity] = useState('');

  const sectors = useMemo(() => Array.from(new Set(datasets.map((d) => d.sector).filter(Boolean))) as string[], [datasets]);
  const cities = useMemo(() => Array.from(new Set(datasets.map((d) => d.city).filter(Boolean))) as string[], [datasets]);

  const filtered = datasets.filter((d) => {
    if (sector && d.sector !== sector) return false;
    if (city && d.city !== city) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !(d.description ?? '').toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ara…"
          className="min-h-11 flex-1 rounded-xl border border-white/15 bg-black/20 px-4 text-sm"
        />
        {sectors.length > 0 && (
          <select value={sector} onChange={(e) => setSector(e.target.value)} className="min-h-11 rounded-xl border border-white/15 bg-black/20 px-3 text-sm">
            <option value="">Tüm sektörler</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
        {cities.length > 0 && (
          <select value={city} onChange={(e) => setCity(e.target.value)} className="min-h-11 rounded-xl border border-white/15 bg-black/20 px-3 text-sm">
            <option value="">Tüm şehirler</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((d) => (
          <div key={d.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="mt-1 text-sm text-fg-muted">
                  {[d.sector, d.city, d.district].filter(Boolean).join(' · ')}
                  {d.record_count ? ` · ${d.record_count.toLocaleString('tr-TR')} kayıt` : ''}
                </p>
                <p className="mt-1 text-xs text-fg-muted">Güncelleme: {new Date(d.updated_at).toLocaleDateString('tr-TR')}</p>
              </div>
              {d.file_path ? <DownloadButton datasetId={d.id} /> : <span className="text-xs text-fg-muted">Dosya hazırlanıyor</span>}
            </div>
            {d.description && <p className="mt-2 text-sm text-fg-muted">{d.description}</p>}
          </div>
        ))}
        {filtered.length === 0 && <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-fg-muted">Eşleşen dataset bulunamadı.</p>}
      </div>
    </div>
  );
}
