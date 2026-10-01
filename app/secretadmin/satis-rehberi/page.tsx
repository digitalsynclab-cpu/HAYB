import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewScriptForm, ScriptRow } from './ScriptsClient';

export default async function AdminSalesScriptsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: scripts } = await supabase.from('sales_scripts').select('id, category, title, content, active').order('category').order('display_order');

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Satış Rehberi</h1>
      <p className="mt-1 text-sm text-fg-muted">Partnerlerin panelinde görünen hazır satış cümleleri ve itiraz yanıtları.</p>

      <div className="mt-6">
        <NewScriptForm />
      </div>

      <div className="mt-8 space-y-3">
        {(scripts ?? []).map((s) => (
          <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lime">{s.category}</p>
                <p className="mt-1 font-medium">{s.title}</p>
                <p className={`mt-1 text-xs ${s.active ? 'text-lime' : 'text-fg-muted'}`}>{s.active ? 'Aktif' : 'Pasif'}</p>
              </div>
              <ScriptRow id={s.id} active={s.active} />
            </div>
            <p className="mt-2 whitespace-pre-line text-sm text-fg-muted">{s.content}</p>
          </div>
        ))}
        {(!scripts || scripts.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz içerik eklenmedi.</p>}
      </div>
    </main>
  );
}
