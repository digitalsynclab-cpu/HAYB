import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function AdminAuditLogsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: logs } = await supabase
    .from('audit_logs')
    .select('id, action, entity_type, entity_id, created_at, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(300);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Audit Log</h1>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Aksiyon</th>
              <th className="px-4 py-3">Varlık</th>
              <th className="px-4 py-3">Yapan</th>
              <th className="px-4 py-3">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {(logs ?? []).map((l) => {
              const actor = Array.isArray(l.profiles) ? l.profiles[0] : l.profiles;
              return (
                <tr key={l.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{l.action}</td>
                  <td className="px-4 py-3 text-fg-muted">
                    {l.entity_type}
                    {l.entity_id ? ` · ${l.entity_id.slice(0, 8)}…` : ''}
                  </td>
                  <td className="px-4 py-3 text-fg-muted">{actor?.full_name ?? actor?.email ?? '—'}</td>
                  <td className="px-4 py-3 text-fg-muted">{new Date(l.created_at).toLocaleString('tr-TR')}</td>
                </tr>
              );
            })}
            {(!logs || logs.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-fg-muted">
                  Henüz kayıt yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
