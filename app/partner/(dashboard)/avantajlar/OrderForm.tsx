'use client';

import { useActionState, useState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { WebsiteSaleFields } from '../satis-olustur/WebsiteSaleFields';
import { createPartnerProductOrderAction, type ProductOrderResult } from './actions';

const initial: ProductOrderResult = { ok: false };

export function StartOrderForm({ productSlug }: { productSlug: string }) {
  const [state, formAction, pending] = useActionState(createPartnerProductOrderAction, initial);
  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      <input type="hidden" name="productSlug" value={productSlug} />
      {state.error && <p className="text-sm text-red-300">{state.error}</p>}
      <Field id="brandName" label="Marka / İşletme Adı">
        {(a) => <input {...inputProps(a)} name="brandName" required autoFocus className={a.className} />}
      </Field>
      <Field id="contactPhone" label="Telefon">
        {(a) => <input {...inputProps(a)} name="contactPhone" type="tel" required className={a.className} />}
      </Field>
      <Field id="contactEmail" label="E-posta" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="contactEmail" type="email" className={a.className} />}
      </Field>
      <WebsiteSaleFields />
      <p className="text-xs text-fg-muted">Talebi gönderdikten sonra HAYB ekibi sizinle iletişime geçer.</p>
      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Gönderiliyor…' : 'Talebi Gönder'}
      </button>
    </form>
  );
}

const BRAND_STYLES = ['Minimal', 'Modern', 'Klasik', 'Eğlenceli', 'Lüks', 'Kurumsal'];

export function PremiumOrderForm({ productSlug }: { productSlug: string }) {
  const [state, formAction, pending] = useActionState(createPartnerProductOrderAction, initial);
  const [style, setStyle] = useState<string[]>([]);
  const toggleStyle = (s: string) => setStyle((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      <input type="hidden" name="productSlug" value={productSlug} />
      <input type="hidden" name="brandStyle" value={style.join(', ')} />
      {state.error && <p className="text-sm text-red-300">{state.error}</p>}

      <Field id="brandName" label="Marka Adı" hint="Henüz kesin değilse fikrinizi yazabilirsiniz">
        {(a) => <input {...inputProps(a)} name="brandName" required autoFocus className={a.className} />}
      </Field>
      <Field id="brandIdea" label="Markanız ne iş yapıyor / ne yapmak istiyorsunuz?">
        {(a) => <textarea {...inputProps(a)} name="brandIdea" required className={`${a.className} min-h-24`} />}
      </Field>
      <Field id="sector" label="Sektör" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="sector" className={a.className} />}
      </Field>
      <Field id="targetAudience" label="Hedef kitleniz kim?" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="targetAudience" className={a.className} />}
      </Field>

      <div>
        <p className="mb-2 text-sm font-medium">Marka Tarzı <span className="font-normal text-fg-muted">(Opsiyonel)</span></p>
        <div className="flex flex-wrap gap-2">
          {BRAND_STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleStyle(s)}
              className={`rounded-full border px-3 py-1.5 text-xs ${style.includes(s) ? 'border-lime bg-lime/15 text-lime' : 'border-white/15 text-fg-muted'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Field id="referenceBrands" label="Beğendiğiniz referans markalar" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="referenceBrands" className={a.className} />}
      </Field>
      <Field id="contactPhone" label="Telefon">
        {(a) => <input {...inputProps(a)} name="contactPhone" type="tel" required className={a.className} />}
      </Field>
      <Field id="contactEmail" label="E-posta" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="contactEmail" type="email" className={a.className} />}
      </Field>
      <Field id="specialNotes" label="Özel notlar" hint="Opsiyonel">
        {(a) => <textarea {...inputProps(a)} name="specialNotes" className={`${a.className} min-h-20`} />}
      </Field>

      <p className="text-xs text-fg-muted">Talebi gönderdikten sonra HAYB ekibi marka ve web sitesi detaylarını konuşmak üzere sizinle iletişime geçer.</p>
      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft disabled:opacity-50">
        {pending ? 'Gönderiliyor…' : 'Talebi Gönder'}
      </button>
    </form>
  );
}
