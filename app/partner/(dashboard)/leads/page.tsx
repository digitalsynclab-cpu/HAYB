import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';

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

export default async function PartnerLeadsPage({ searchParams }: { searchParams: Promise<{ created?: string; duplicate?: string }> }) {
  const { created, duplicate } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();
  const { data: leads } = await supabase.from('leads').select('id, contact_name, company_name, phone, status, created_at').eq('partner_id', partner!.id).order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lead&apos;lerim</h1>
        <Link href="/partner/leads/yeni" className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-lime-soft">
          + Yeni Lead
        </Link>
      </div>

      {created && (
        <p className="mt-4 rounded-xl border border-lime/40 bg-lime/10 p-3 text-sm text-lime">
          Lead oluşturuldu.
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
                  Henüz lead&apos;iniz yok.{' '}
                  <Link href="/partner/leads/yeni" className="text-lime underline">
                    İlk lead&apos;ini oluştur
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
}
