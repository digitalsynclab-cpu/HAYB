import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PartnerStatusControls } from './PartnerStatusControls';

const STATUS_LABEL: Record<string, string> = { active: 'Aktif', pending: 'Bekliyor', suspended: 'Askıda', inactive: 'Pasif', rejected: 'Reddedildi' };

export default async function AdminPartnersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: partners } = await supabase
    .from('partners')
    .select('id, partner_code, status, created_at, iban, account_holder_name, profiles!partners_profile_id_fkey(full_name, email)')
    .order('created_at', { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Partnerler</h1>

      <div className="mt-8 space-y-3">
        {(partners ?? []).map((p) => {
          const profile = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;
          return (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="font-semibold">
                  {profile?.full_name} <span className="text-fg-muted">· {p.partner_code}</span>
                </p>
                <p className="text-sm text-fg-muted">
                  {profile?.email} · {STATUS_LABEL[p.status]} · {new Date(p.created_at).toLocaleDateString('tr-TR')}
                </p>
                {p.iban && (
                  <p className="mt-1 font-mono text-xs text-lime">
                    {p.account_holder_name} · {p.iban}
                  </p>
                )}
              </div>
              <PartnerStatusControls partnerId={p.id} status={p.status} />
            </div>
          );
        })}
        {(!partners || partners.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-fg-muted">Henüz partner yok.</p>}
      </div>
    </main>
  );
}
