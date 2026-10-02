'use client';

import { useActionState, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Field, inputProps } from '@/components/forms/Field';
import {
  createDatasetAction,
  toggleDatasetActiveAction,
  deleteDatasetAction,
  grantDatasetAccessAction,
  revokeDatasetAccessAction,
  type DatasetActionResult,
} from './actions';

const initial: DatasetActionResult = { ok: false };

export function NewDatasetForm() {
  const [state, formAction, pending] = useActionState(createDatasetAction, initial);
  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6" encType="multipart/form-data">
      {state.error && <p className="text-sm text-red-300">{state.error}</p>}
      <Field id="name" label="Dataset Adı">
        {(a) => <input {...inputProps(a)} name="name" required className={a.className} />}
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="sector" label="Sektör" hint="Opsiyonel">
          {(a) => <input {...inputProps(a)} name="sector" className={a.className} />}
        </Field>
        <Field id="city" label="Şehir" hint="Opsiyonel">
          {(a) => <input {...inputProps(a)} name="city" className={a.className} />}
        </Field>
        <Field id="district" label="İlçe" hint="Opsiyonel">
          {(a) => <input {...inputProps(a)} name="district" className={a.className} />}
        </Field>
      </div>
      <Field id="recordCount" label="Kayıt Sayısı" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="recordCount" type="number" min="0" className={a.className} />}
      </Field>
      <Field id="description" label="Açıklama" hint="Opsiyonel">
        {(a) => <textarea {...inputProps(a)} name="description" className={`${a.className} min-h-20`} />}
      </Field>
      <Field id="file" label="Excel/CSV Dosyası" hint=".xlsx, .xls veya .csv — opsiyonel, sonradan da yüklenebilir">
        {(a) => <input {...inputProps(a)} name="file" type="file" accept=".xlsx,.xls,.csv" className={a.className} />}
      </Field>
      <button type="submit" disabled={pending} className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Yükleniyor…' : 'Dataset Oluştur'}
      </button>
    </form>
  );
}

export function DatasetActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await toggleDatasetActiveAction(id, !active); router.refresh(); })}
        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs hover:border-white/40"
      >
        {active ? 'Pasif Yap' : 'Aktif Yap'}
      </button>
      {!confirmDelete ? (
        <button type="button" onClick={() => setConfirmDelete(true)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20">
          Sil
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(async () => { await deleteDatasetAction(id); router.refresh(); })}
            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
          >
            Emin misiniz?
          </button>
          <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg border border-white/20 px-2 py-1.5 text-xs text-fg-muted">
            Vazgeç
          </button>
        </div>
      )}
    </div>
  );
}

export function GrantAccessForm({ datasetId, partners }: { datasetId: string; partners: { id: string; partner_code: string }[] }) {
  const [state, formAction, pending] = useActionState(grantDatasetAccessAction, initial);
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="datasetId" value={datasetId} />
      <select name="partnerId" required className="rounded-lg border border-white/15 bg-black/20 px-3 py-1.5 text-xs">
        <option value="">Partner seç…</option>
        <option value="all">Tümü (tüm aktif partnerler)</option>
        {partners.map((p) => (
          <option key={p.id} value={p.id}>
            {p.partner_code}
          </option>
        ))}
      </select>
      <button type="submit" disabled={pending} className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? '…' : 'Erişim Ver'}
      </button>
      {state.error && <p className="text-xs text-red-300">{state.error}</p>}
    </form>
  );
}

export function RevokeAccessButton({ accessId }: { accessId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await revokeDatasetAccessAction(accessId); router.refresh(); })}
      className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-fg-muted hover:border-red-400/50 hover:text-red-300"
    >
      ✕
    </button>
  );
}
