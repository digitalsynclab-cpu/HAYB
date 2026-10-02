'use client';

import { useActionState, useMemo, useState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { createPartnerSaleAction, type CreateSaleResult } from './actions';
import { WebsiteFormHandoff } from './WebsiteFormHandoff';

type Service = { id: string; name: string; slug: string };
type Package = { id: string; name: string; service_id: string; price: number | null };

const initial: CreateSaleResult = { ok: false };

export function NewSaleForm({ services, packages, commissionRates }: { services: Service[]; packages: Package[]; commissionRates: Record<string, number> }) {
  const [state, formAction, pending] = useActionState(createPartnerSaleAction, initial);
  const [serviceId, setServiceId] = useState('');
  const [packageId, setPackageId] = useState('');

  const availablePackages = useMemo(() => packages.filter((p) => p.service_id === serviceId), [packages, serviceId]);
  const selectedService = services.find((s) => s.id === serviceId);
  const selectedPackage = availablePackages.find((p) => p.id === packageId);
  const commissionRate = packageId ? commissionRates[packageId] : undefined;
  const estimatedCommission = selectedPackage?.price && commissionRate ? (Number(selectedPackage.price) * commissionRate) / 100 : null;

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      {state.error && <p className="text-sm font-medium text-red-300">{state.error}</p>}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-lime">1. Ürün ve Paket</p>
        <Field id="serviceId" label="Hizmet">
          {(a) => (
            <select {...inputProps(a)} name="serviceId" required value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={a.className}>
              <option value="">Seçiniz</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
        </Field>
        {selectedService && (
          <Field
            id="packageId"
            label="Paket"
            hint={
              availablePackages.length === 0
                ? 'Bu hizmet için net paket fiyatı yok — özel fiyatlandırma gerekir, HAYB ekibiyle görüşün.'
                : undefined
            }
          >
            {(a) => (
              <select {...inputProps(a)} name="packageId" required={availablePackages.length > 0} value={packageId} onChange={(e) => setPackageId(e.target.value)} className={a.className}>
                <option value="">Seçiniz</option>
                {availablePackages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.price ? `· ${Number(p.price).toLocaleString('tr-TR')} ₺` : ''}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}
        {selectedPackage && (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-lime/25 bg-lime/5 px-4 py-3 text-sm">
            <span className="text-fg-muted">Tahmini Kazancınız</span>
            <span className="font-semibold text-lime">
              {estimatedCommission != null ? `${estimatedCommission.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺ (%${commissionRate})` : 'Komisyon bilgisi henüz tanımlanmadı'}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-lime">2. Müşteri Bilgileri</p>
        <div className="space-y-4">
          <Field id="contactName" label="Müşteri Adı">
            {(a) => <input {...inputProps(a)} name="contactName" required autoFocus className={a.className} />}
          </Field>
          <Field id="phone" label="Telefon">
            {(a) => <input {...inputProps(a)} name="phone" type="tel" required className={a.className} />}
          </Field>
          <Field id="companyName" label="İşletme Adı" hint="Opsiyonel">
            {(a) => <input {...inputProps(a)} name="companyName" className={a.className} />}
          </Field>
          <Field id="email" label="E-posta" hint="Opsiyonel">
            {(a) => <input {...inputProps(a)} name="email" type="email" className={a.className} />}
          </Field>
        </div>
      </div>

      {(selectedService?.slug === 'web-sitesi' || selectedService?.slug === 'e-ticaret') && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-lime">3. Hizmete Özel Bilgiler</p>
          <WebsiteFormHandoff serviceName={selectedService.name} />
        </div>
      )}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
          {selectedService?.slug === 'web-sitesi' || selectedService?.slug === 'e-ticaret' ? '4. Ek Not' : '3. Özel İstekler'}
        </p>
        <Field id="notes" label="Not" hint="Opsiyonel">
          {(a) => <textarea {...inputProps(a)} name="notes" className={`${a.className} min-h-24`} />}
        </Field>
      </div>

      <p className="text-xs text-fg-muted">
        Satışı onaya gönderdikten sonra HAYB ekibi inceler. Onaylanınca komisyonunuz hesaplanır ve panelinizde görünür.
      </p>

      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Gönderiliyor…' : 'Onaya Gönder'}
      </button>
    </form>
  );
}
