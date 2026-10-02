'use client';

import { useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateProductOrderStatusAction, updateProductPriceAction, type AdminProductResult } from './actions';
import type { Database } from '@/types/supabase';

type SaleStatus = Database['public']['Enums']['sale_status'];

const STATUS_OPTIONS: SaleStatus[] = ['submitted', 'reviewing', 'information_required', 'approved', 'payment_pending', 'paid', 'project_started', 'in_progress', 'completed', 'rejected', 'cancelled'];

const initial: AdminProductResult = { ok: false };

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(async () => { await updateProductOrderStatusAction(orderId, e.target.value as SaleStatus); router.refresh(); })}
      className="rounded-lg border border-white/20 bg-black/30 px-3 py-1.5 text-xs"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

export function PriceEditForm({ slug, price }: { slug: string; price: number }) {
  const [state, formAction, pending] = useActionState(updateProductPriceAction, initial);
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="slug" value={slug} />
      <input name="price" type="number" step="0.01" min="0" defaultValue={price} className="w-28 rounded-lg border border-white/20 bg-black/30 px-3 py-1.5 text-sm" />
      <button type="submit" disabled={pending} className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? '…' : 'Kaydet'}
      </button>
      {state.error && <p className="text-xs text-red-300">{state.error}</p>}
    </form>
  );
}
