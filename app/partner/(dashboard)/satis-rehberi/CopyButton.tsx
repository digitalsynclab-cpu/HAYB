'use client';

import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard erişimi yoksa sessizce yok say */
        }
      }}
      className="shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-lime/50 hover:text-lime"
    >
      {copied ? 'Kopyalandı' : 'Kopyala'}
    </button>
  );
}
