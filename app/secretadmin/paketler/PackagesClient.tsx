'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Field, inputProps } from '@/components/forms/Field';
import { updatePackageAction, createPackageAction, type PackageActionResult } from './actions';

type Package = { id: string; name: string; price: number | null; active: boolean; service_id: string };

const initial: PackageActionResult = { ok: false };

export function PackageRow({ pkg }: { pkg: Package }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updatePackageAction, initial);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left hover:border-white/25"
      >
        <span className="font-medium">{pkg.name}</span>
        <span className="flex items-center gap-3 text-sm text-fg-muted">
          {pkg.price ? `${Number(pkg.price).toLocaleString('tr-TR')} ₺` : 'Fiyat tanımlanmadı'}
          <span className={`rounded-full px-2 py-0.5 text-xs ${pkg.active ? 'bg-lime/15 text-lime' : 'bg-white/10'}`}>{pkg.active ? 'Aktif' : 'Pasif'}</span>
        </span>
      </button>
    );
  }

  return (
    <form
      action={(fd) => {
        formAction(fd);
        router.refresh();
      }}
      className="space-y-3 rounded-xl border border-lime/30 bg-black/30 p-4"
    >
      <input type="hidden" name="id" value={pkg.id} />
      {state.error && <p className="text-xs text-red-300">{state.error}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field id={`name-${pkg.id}`} label="Paket adı">
          {(a) => <input {...inputProps(a)} name="name" defaultValue={pkg.name} required className={a.className} />}
        </Field>
        <Field id={`price-${pkg.id}`} label="Fiyat (₺)">
          {(a) => <input {...inputProps(a)} name="price" type="number" min="0" step="1" defaultValue={pkg.price ?? ''} required className={a.className} />}
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm text-fg-muted">
        <input type="checkbox" name="active" defaultChecked={pkg.active} className="h-4 w-4 rounded border-white/30 bg-black/30" />
        Partner panelinde ve sitede görünür
      </label>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="rounded-lg bg-lime px-4 py-2 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
          {pending ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-white/20 px-4 py-2 text-xs text-fg-muted">
          Vazgeç
        </button>
      </div>
    </form>
  );
}

export function NewPackageForm({ serviceId }: { serviceId: string }) {
  const [state, formAction, pending] = useActionState(createPackageAction, initial);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm font-semibold text-lime hover:underline">
        + Yeni paket ekle
      </button>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="serviceId" value={serviceId} />
      {state.error && <p className="text-xs text-red-300">{state.error}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field id={`new-name-${serviceId}`} label="Paket adı">
          {(a) => <input {...inputProps(a)} name="name" required className={a.className} />}
        </Field>
        <Field id={`new-price-${serviceId}`} label="Fiyat (₺)">
          {(a) => <input {...inputProps(a)} name="price" type="number" min="0" step="1" required className={a.className} />}
        </Field>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="rounded-lg bg-lime px-4 py-2 text-xs font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
          {pending ? 'Ekleniyor…' : 'Ekle'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-white/20 px-4 py-2 text-xs text-fg-muted">
          Vazgeç
        </button>
      </div>
    </form>
  );
}
