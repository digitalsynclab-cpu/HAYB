import { createSupabaseServerClient } from '@/lib/supabase/server';

const STATUS_LABEL: Record<string, string> = {
  pending: 'Bekliyor',
  calculated: 'Hesaplandı',
  approved: 'Onaylandı',
  payable: 'Ödemeye Hazır',
  paid: 'Ödendi',
  cancelled: 'İptal',
  reversed: 'Geri Alındı',
};

export default async function PartnerEarningsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user!.id).single();
  const { data: commissions } = await supabase
    .from('commissions')
    .select('id, commission_amount, status, calculated_at, paid_at')
    .eq('partner_id', partner!.id)
    .order('calculated_at', { ascending: false });

  const totalPending = (commissions ?? []).filter((c) => ['pending', 'calculated', 'approved', 'payable'].includes(c.status)).reduce((s, c) => s + Number(c.commission_amount), 0);
  const totalPaid = (commissions ?? []).filter((c) => c.status === 'paid').reduce((s, c) => s + Number(c.commission_amount), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold">Kazançlarım</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl font-bold text-lime">{totalPending.toLocaleString('tr-TR')} ₺</p>
          <p className="mt-1 text-sm text-fg-muted">Bekleyen</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-2xl font-bold text-lime">{totalPaid.toLocaleString('tr-TR')} ₺</p>
          <p className="mt-1 text-sm text-fg-muted">Ödenen</p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-fg-muted">
            <tr>
              <th className="px-4 py-3">Tutar</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Hesaplandığı Tarih</th>
              <th className="px-4 py-3">Ödeme Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {(commissions ?? []).map((c) => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="px-4 py-3">{Number(c.commission_amount).toLocaleString('tr-TR')} ₺</td>
                <td className="px-4 py-3">{STATUS_LABEL[c.status]}</td>
                <td className="px-4 py-3 text-fg-muted">{new Date(c.calculated_at).toLocaleDateString('tr-TR')}</td>
                <td className="px-4 py-3 text-fg-muted">{c.paid_at ? new Date(c.paid_at).toLocaleDateString('tr-TR') : '—'}</td>
              </tr>
            ))}
            {(!commissions || commissions.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-fg-muted">
                  Henüz komisyon oluşmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
