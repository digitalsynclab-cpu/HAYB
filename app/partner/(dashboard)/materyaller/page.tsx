import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function PartnerMaterialsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: materials } = await supabase.from('marketing_materials').select('id, title, description, material_type, file_url').eq('active', true).order('display_order');

  return (
    <div>
      <h1 className="text-2xl font-bold">Satış Materyalleri</h1>
      {(!materials || materials.length === 0) ? (
        <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz materyal eklenmedi.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {materials.map((m) => (
            <div key={m.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-lime">{m.material_type}</p>
              <p className="mt-2 font-semibold">{m.title}</p>
              {m.description && <p className="mt-1 text-sm text-fg-muted">{m.description}</p>}
              {m.file_url && (
                <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-lime underline">
                  Görüntüle / İndir
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
