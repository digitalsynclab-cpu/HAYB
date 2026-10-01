import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PackageRow, NewPackageForm } from './PackagesClient';

export default async function AdminPackagesPage() {
  const supabase = await createSupabaseServerClient();
  const [{ data: services }, { data: packages }] = await Promise.all([
    supabase.from('services').select('id, name, category, active').order('display_order'),
    supabase.from('packages').select('id, name, price, active, service_id').order('display_order'),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">HAYB Admin</p>
      <h1 className="mt-2 text-2xl font-bold">Ürünler &amp; Paketler</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Partner panelinde ve satış formlarında kullanılan hizmet/paket fiyatları buradan yönetilir. Fiyat değişikliği yalnızca yeni satışları etkiler; onaylanmış satışların komisyonu snapshot olarak korunur.
      </p>

      <div className="mt-8 space-y-8">
        {(services ?? []).map((service) => {
          const servicePackages = (packages ?? []).filter((p) => p.service_id === service.id);
          return (
            <section key={service.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{service.name}</h2>
                  <p className="text-xs text-fg-muted">{service.category}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${service.active ? 'bg-lime/15 text-lime' : 'bg-white/10 text-fg-muted'}`}>
                  {service.active ? 'Yayında' : 'Pasif'}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {servicePackages.map((pkg) => (
                  <PackageRow key={pkg.id} pkg={pkg} />
                ))}
                {servicePackages.length === 0 && <p className="text-sm text-fg-muted">Bu hizmet için henüz paket tanımlanmadı.</p>}
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <NewPackageForm serviceId={service.id} />
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
