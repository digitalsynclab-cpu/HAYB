import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewDatasetForm, DatasetActions, GrantAccessForm, RevokeAccessButton } from './DatasetsClient';

export default async function AdminCustomerDataPage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: datasets }, { data: partners }, { data: accessRows }] = await Promise.all([
    supabase.from('datasets').select('id, name, description, sector, city, district, record_count, file_name, file_size, is_active, is_demo, updated_at').order('created_at', { ascending: false }),
    supabase.from('partners').select('id, partner_code').eq('status', 'active').order('partner_code'),
    supabase.from('dataset_access').select('id, dataset_id, partners(partner_code)'),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Müşteri Datası</h1>
      <p className="mt-1 text-sm text-fg-muted">Dosyalar private storage&apos;da tutulur, yalnızca erişim verilen partnerler imzalı bağlantıyla indirebilir.</p>

      <div className="mt-6">
        <NewDatasetForm />
      </div>

      <div className="mt-8 space-y-4">
        {(datasets ?? []).map((d) => {
          const accessList = (accessRows ?? []).filter((a) => a.dataset_id === d.id);
          return (
            <div key={d.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{d.name}</p>
                    {d.is_demo && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase text-fg-muted">Demo</span>}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${d.is_active ? 'bg-lime/15 text-lime' : 'bg-white/10 text-fg-muted'}`}>{d.is_active ? 'Aktif' : 'Pasif'}</span>
                  </div>
                  <p className="mt-1 text-xs text-fg-muted">
                    {[d.sector, d.city, d.district].filter(Boolean).join(' · ') || 'Konum/sektör belirtilmedi'}
                    {d.record_count ? ` · ${d.record_count.toLocaleString('tr-TR')} kayıt` : ''}
                  </p>
                  {d.description && <p className="mt-1 text-sm text-fg-muted">{d.description}</p>}
                  <p className="mt-1 text-xs text-fg-muted">{d.file_name ? `Dosya: ${d.file_name}` : 'Dosya yok'}</p>
                </div>
                <DatasetActions id={d.id} active={d.is_active} />
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-fg-muted">Erişimi olan partnerler</p>
                <div className="flex flex-wrap gap-2">
                  {accessList.length === 0 && <p className="text-xs text-fg-muted">Henüz erişim verilmedi.</p>}
                  {accessList.map((a) => {
                    const p = Array.isArray(a.partners) ? a.partners[0] : a.partners;
                    return (
                      <span key={a.id} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/20 px-2 py-1 text-xs">
                        {p?.partner_code}
                        <RevokeAccessButton accessId={a.id} />
                      </span>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <GrantAccessForm datasetId={d.id} partners={partners ?? []} />
                </div>
              </div>
            </div>
          );
        })}
        {(!datasets || datasets.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-fg-muted">Henüz dataset eklenmedi.</p>}
      </div>
    </main>
  );
}
