import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewMaterialForm, MaterialRow } from './MaterialsClient';

export default async function AdminMaterialsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: materials } = await supabase.from('marketing_materials').select('id, title, material_type, description, file_url, active').order('display_order');

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Materyaller</h1>
      <p className="mt-1 text-sm text-fg-muted">Partnerlerin panelinde görünen satış görselleri, dokümanları ve hazır metinler.</p>

      <div className="mt-6">
        <NewMaterialForm />
      </div>

      <div className="mt-8 space-y-3">
        {(materials ?? []).map((m) => (
          <div key={m.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lime">{m.material_type}</p>
                <p className="mt-1 font-medium">{m.title}</p>
                {m.description && <p className="mt-1 text-sm text-fg-muted">{m.description}</p>}
                {m.file_url && (
                  <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-lime underline">
                    Dosyayı Görüntüle
                  </a>
                )}
                <p className={`mt-1 text-xs ${m.active ? 'text-lime' : 'text-fg-muted'}`}>{m.active ? 'Aktif' : 'Pasif'}</p>
              </div>
              <MaterialRow id={m.id} active={m.active} />
            </div>
          </div>
        ))}
        {(!materials || materials.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz materyal eklenmedi.</p>}
      </div>
    </main>
  );
}
