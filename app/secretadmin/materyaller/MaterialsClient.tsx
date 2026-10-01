'use client';

import { useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Field, inputProps } from '@/components/forms/Field';
import { createMaterialAction, toggleMaterialActiveAction, deleteMaterialAction, type MaterialActionResult } from './actions';

const initial: MaterialActionResult = { ok: false };

export function NewMaterialForm() {
  const [state, formAction, pending] = useActionState(createMaterialAction, initial);
  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm text-red-300">{state.error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="title" label="Başlık">
          {(a) => <input {...inputProps(a)} name="title" required className={a.className} />}
        </Field>
        <Field id="materialType" label="Tür" hint="Örn. Görsel, PDF, WhatsApp Metni">
          {(a) => <input {...inputProps(a)} name="materialType" required className={a.className} />}
        </Field>
      </div>
      <Field id="fileUrl" label="Dosya/Görsel URL" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="fileUrl" type="url" className={a.className} />}
      </Field>
      <Field id="description" label="Açıklama" hint="Opsiyonel">
        {(a) => <textarea {...inputProps(a)} name="description" className={`${a.className} min-h-20`} />}
      </Field>
      <button type="submit" disabled={pending} className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Ekleniyor…' : 'Ekle'}
      </button>
    </form>
  );
}

export function MaterialRow({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await toggleMaterialActiveAction(id, !active); router.refresh(); })}
        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs hover:border-white/40"
      >
        {active ? 'Pasif Yap' : 'Aktif Yap'}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await deleteMaterialAction(id); router.refresh(); })}
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
      >
        Sil
      </button>
    </div>
  );
}
