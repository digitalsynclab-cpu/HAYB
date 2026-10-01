import { createSupabaseServerClient } from '@/lib/supabase/server';
import { CopyButton } from './CopyButton';

export default async function SalesGuidePage() {
  const supabase = await createSupabaseServerClient();
  const { data: scripts } = await supabase.from('sales_scripts').select('id, category, title, content').eq('active', true).order('display_order');

  const categories = Array.from(new Set((scripts ?? []).map((s) => s.category)));

  return (
    <div>
      <h1 className="text-2xl font-bold">Satış Rehberi</h1>
      <p className="mt-1 text-sm text-fg-muted">Hazır satış cümleleri ve itiraz yanıtları. Kopyala'ya basıp doğrudan müşteriye gönderin.</p>

      {categories.length === 0 && <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz içerik eklenmedi.</p>}

      <div className="mt-8 space-y-8">
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-lime">{cat}</h2>
            <div className="mt-3 space-y-3">
              {(scripts ?? [])
                .filter((s) => s.category === cat)
                .map((s) => (
                  <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium">{s.title}</p>
                      <CopyButton text={s.content} />
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm text-fg-muted">{s.content}</p>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
