import { createSupabaseServerClient } from '@/lib/supabase/server';
import { BankInfoForm } from './BankInfoForm';

export default async function PartnerProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('full_name, email, phone').eq('id', user!.id).single();
  const { data: partner } = await supabase
    .from('partners')
    .select('partner_code, status, created_at, iban, account_holder_name')
    .eq('profile_id', user!.id)
    .single();

  const rows = [
    { label: 'Ad Soyad', value: profile?.full_name },
    { label: 'E-posta', value: profile?.email },
    { label: 'Telefon', value: profile?.phone },
    { label: 'Partner Kodu', value: partner?.partner_code },
    { label: 'Durum', value: partner?.status },
    { label: 'Katılım Tarihi', value: partner?.created_at ? new Date(partner.created_at).toLocaleDateString('tr-TR') : undefined },
  ];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Profil</h1>
      <dl className="mt-6 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <dt className="text-sm text-fg-muted">{r.label}</dt>
            <dd className="text-sm font-medium">{r.value ?? '—'}</dd>
          </div>
        ))}
      </dl>

      {partner?.status === 'active' && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">Ödeme Bilgileri</h2>
          <p className="mt-1 text-sm text-fg-muted">Komisyon ödemeleriniz bu IBAN&apos;a yapılacaktır.</p>
          <div className="mt-4">
            <BankInfoForm accountHolderName={partner.account_holder_name ?? ''} iban={partner.iban ?? ''} />
          </div>
        </div>
      )}
    </div>
  );
}
