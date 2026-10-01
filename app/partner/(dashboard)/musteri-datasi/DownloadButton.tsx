'use client';

import { useState, useTransition } from 'react';
import { requestDatasetDownloadAction } from './actions';

export function DownloadButton({ datasetId }: { datasetId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const res = await requestDatasetDownloadAction(datasetId);
            if (!res.ok || !res.url) {
              setError(res.error || 'İndirilemedi.');
              return;
            }
            window.location.href = res.url;
          })
        }
        className="rounded-lg bg-lime px-4 py-2 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50"
      >
        {pending ? 'Hazırlanıyor…' : "Excel'i İndir"}
      </button>
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
