import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { NewSaleForm } from './NewSaleForm';

export default async function PartnerCreateSalePage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: services }, { data: packages }] = await Promise.all([
    supabase.from('services').select('id, name, slug').eq('active', true).order('display_order'),
    supabase.from('packages').select('id, name, service_id, price').eq('active', true).order('display_order'),
  ]);

  // commission_rules RLS ile yalnızca admin'e açık; partnere tek tek kuralları değil,
  // yalnızca hesaplanmış paket→oran eşlemesini admin client ile server-side çıkarıp gönderiyoruz.
  const admin = createSupabaseAdminClient();
  const { data: rules } = await admin.from('commission_rules').select('package_id, commission_value').eq('is_active', true).not('package_id', 'is', null);
  const commissionRates: Record<string, number> = {};
  for (const r of rules ?? []) {
    if (r.package_id) commissionRates[r.package_id] = Number(r.commission_value);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Satış Oluştur</h1>
      <p className="mt-1 text-sm text-fg-muted">Müşteri bilgilerini girin, satışı HAYB onayına gönderin.</p>
      <div className="mt-6 max-w-2xl">
        <NewSaleForm services={services ?? []} packages={packages ?? []} commissionRates={commissionRates} />
      </div>
    </div>
  );
}
