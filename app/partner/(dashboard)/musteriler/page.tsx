import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DatasetList } from '../musteri-datasi/DatasetList';
import { MusterilerTabs } from './MusterilerTabs';

const STATUS_LABEL: Record<string, string> = {
  new: 'Yeni',
  contacted: 'İletişime Geçildi',
  qualified: 'Nitelikli',
  proposal: 'Teklif',
  negotiation: 'Görüşme',
  won: 'Kazanıldı',
  lost: 'Kaybedildi',
  cancelled: 'İptal',
  duplicate: 'Mükerrer',
};

export default async function PartnerCustomersPage({ searchParams }: { searchParams: Promise<{ created?: string; duplicate?: string }> }) {
  const { created, duplicate } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();

  const [{ data: leads }, { data: datasets }] = await Promise.all([
    supabase.from('leads').select('id, contact_name, company_name, phone, status, created_at').eq('partner_id', partner!.id).order('created_at', { ascending: false }),
    supabase.from('datasets').select('id, name, description, sector, city, district, record_count, file_path, updated_at').eq('is_active', true).order('updated_at', { ascending: false }),
  ]);

  const leadsPanel = (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-fg-muted">Bulduğunuz müşteri adayları ve durumları.</p>
        <Link href="/partner/leads/yeni" className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
          + Yeni Müşteri
        </Link>
      </div>

      {created && (
        <p className="mt-4 rounded-xl border border-lime/40 bg-lime/10 p-3 text-sm text-lime">
          Müşteri eklendi.
          {duplicate && ' Not: Bu müşteri daha önce sistemde mevcut olabilir.'}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Müşteri</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((l) => (
              <tr key={l.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  {l.contact_name}
                  {l.company_name && <span className="text-fg-muted"> · {l.company_name}</span>}
                </td>
                <td className="px-4 py-3 text-fg-muted">{l.phone}</td>
                <td className="px-4 py-3">{STATUS_LABEL[l.status] ?? l.status}</td>
                <td className="px-4 py-3 text-fg-muted">{new Date(l.created_at).toLocaleDateString('tr-TR')}</td>
              </tr>
            ))}
            {(!leads || leads.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-fg-muted">
                  Henüz müşteriniz yok.{' '}
                  <Link href="/partner/leads/yeni" className="text-lime underline">
                    İlk müşterinizi ekleyin
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const datasetPanel =
    datasets && datasets.length > 0 ? (
      <DatasetList datasets={datasets} />
    ) : (
      <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-fg-muted">
        Şu anda erişiminiz olan bir müşteri datası yok. HAYB ekibiyle iletişime geçin.
      </p>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold">Müşteriler</h1>
      <div className="mt-6">
        <MusterilerTabs leadsPanel={leadsPanel} datasetPanel={datasetPanel} />
      </div>
    </div>
  );
}
