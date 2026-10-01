import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewLeadForm } from './NewLeadForm';

export default async function NewLeadPage() {
  const supabase = await createSupabaseServerClient();
  const { data: services } = await supabase.from('services').select('id, name').eq('active', true).order('display_order');

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Yeni Lead</h1>
      <p className="mt-1 text-sm text-fg-muted">Sadece gerekli bilgiyle hızlıca kaydedin, detayları sonra tamamlayabilirsiniz.</p>
      <div className="mt-6">
        <NewLeadForm services={services ?? []} />
      </div>
    </div>
  );
}
