'use client';

import { useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Field, inputProps } from '@/components/forms/Field';
import { createScriptAction, toggleScriptActiveAction, deleteScriptAction, type ScriptActionResult } from './actions';

const initial: ScriptActionResult = { ok: false };

export function NewScriptForm() {
  const [state, formAction, pending] = useActionState(createScriptAction, initial);
  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm text-red-300">{state.error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="category" label="Kategori" hint="Örn. Fiyat İtirazı, Follow-up">
          {(a) => <input {...inputProps(a)} name="category" required className={a.className} />}
        </Field>
        <Field id="title" label="Başlık">
          {(a) => <input {...inputProps(a)} name="title" required className={a.className} />}
        </Field>
      </div>
      <Field id="content" label="İçerik">
        {(a) => <textarea {...inputProps(a)} name="content" required className={`${a.className} min-h-28`} />}
      </Field>
      <button type="submit" disabled={pending} className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Ekleniyor…' : 'Ekle'}
      </button>
    </form>
  );
}

export function ScriptRow({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await toggleScriptActiveAction(id, !active); router.refresh(); })}
        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs hover:border-white/40"
      >
        {active ? 'Pasif Yap' : 'Aktif Yap'}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await deleteScriptAction(id); router.refresh(); })}
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
      >
        Sil
      </button>
    </div>
  );
}
