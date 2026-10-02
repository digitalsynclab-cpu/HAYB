'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saleStatusLabel } from '@/lib/partner/sale-status';

type Sale = { id: string; amount: number; currency: string; sale_status: string; sold_at: string; serviceName: string | null; customerName: string | null };

const FILTERS = [
  { key: 'all', label: 'Tümü', statuses: null },
  { key: 'reviewing', label: 'İnceleniyor', statuses: ['submitted', 'reviewing', 'information_required'] },
  { key: 'approved', label: 'Onaylandı', statuses: ['approved', 'payment_pending', 'paid'] },
  { key: 'progress', label: 'Devam Ediyor', statuses: ['project_started', 'in_progress'] },
  { key: 'completed', label: 'Tamamlandı', statuses: ['completed'] },
] as const;

export function SalesList({ sales }: { sales: Sale[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>('all');
  const active = FILTERS.find((f) => f.key === filter)!;
  const filtered = active.statuses ? sales.filter((s) => (active.statuses as readonly string[]).includes(s.sale_status)) : sales;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${filter === f.key ? 'border-lime bg-lime/15 text-lime' : 'border-white/15 text-fg-muted hover:border-white/30'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {filtered.map((s) => (
          <Link key={s.id} href={`/partner/satislar/${s.id}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-lime/30">
            <div>
              <p className="font-medium">{s.serviceName ?? 'Hizmet'}</p>
              <p className="text-xs text-fg-muted">
                {s.customerName ?? '—'} · {new Date(s.sold_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {Number(s.amount).toLocaleString('tr-TR')} {s.currency}
              </p>
              <p className="text-xs text-fg-muted">{saleStatusLabel(s.sale_status)}</p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-fg-muted">
              {sales.length === 0 ? 'Henüz satış oluşturmadınız. İlk müşteriniz için bir satış oluşturun.' : 'Bu filtrede satış yok.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
