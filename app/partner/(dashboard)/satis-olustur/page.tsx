import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewSaleForm } from './NewSaleForm';

export default async function PartnerCreateSalePage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: services }, { data: packages }] = await Promise.all([
    supabase.from('services').select('id, name').eq('active', true).order('display_order'),
    supabase.from('packages').select('id, name, service_id, price').eq('active', true).order('display_order'),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Satış Oluştur</h1>
      <p className="mt-1 text-sm text-fg-muted">Müşteri bilgilerini girin, satışı HAYB onayına gönderin.</p>
      <div className="mt-6 max-w-2xl">
        <NewSaleForm services={services ?? []} packages={packages ?? []} />
      </div>
    </div>
  );
}
