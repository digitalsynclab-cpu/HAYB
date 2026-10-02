'use client';

import { useState, type ReactNode } from 'react';

export function MusterilerTabs({ leadsPanel, datasetPanel }: { leadsPanel: ReactNode; datasetPanel: ReactNode }) {
  const [tab, setTab] = useState<'leads' | 'dataset'>('leads');

  return (
    <div>
      <div className="flex gap-2 border-b border-white/10">
        <button
          type="button"
          onClick={() => setTab('leads')}
          className={`border-b-2 px-1 pb-3 text-sm font-semibold ${tab === 'leads' ? 'border-lime text-lime' : 'border-transparent text-fg-muted hover:text-fg'}`}
        >
          Müşterilerim
        </button>
        <button
          type="button"
          onClick={() => setTab('dataset')}
          className={`border-b-2 px-1 pb-3 text-sm font-semibold ${tab === 'dataset' ? 'border-lime text-lime' : 'border-transparent text-fg-muted hover:text-fg'}`}
        >
          Müşteri Datası
        </button>
      </div>
      <div className="mt-6">{tab === 'leads' ? leadsPanel : datasetPanel}</div>
    </div>
  );
}
