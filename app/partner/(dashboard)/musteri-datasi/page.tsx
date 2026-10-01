import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DatasetList } from './DatasetList';

export default async function PartnerCustomerDataPage() {
  const supabase = await createSupabaseServerClient();
  const { data: datasets } = await supabase
    .from('datasets')
    .select('id, name, description, sector, city, district, record_count, file_path, updated_at')
    .eq('is_active', true)
    .order('updated_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">Müşteri Datası</h1>
      <p className="mt-1 text-sm text-fg-muted">Yalnızca size açılmış dataset&apos;ler görünür.</p>

      <div className="mt-6">
        {datasets && datasets.length > 0 ? (
          <DatasetList datasets={datasets} />
        ) : (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-fg-muted">
            Şu anda erişiminiz olan bir müşteri datası yok. HAYB ekibiyle iletişime geçin.
          </p>
        )}
      </div>
    </div>
  );
}
