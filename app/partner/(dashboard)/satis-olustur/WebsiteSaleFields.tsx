'use client';

import { useState } from 'react';
import { Field, inputProps } from '@/components/forms/Field';
import { PAGE_OPTIONS, OTHER_PAGE, SPECIAL_REQUEST_OPTIONS, SECTOR_SUGGESTIONS } from '@/lib/web-order';

/**
 * HAYB web sitesi hizmetinin gerçek sipariş formuyla (lib/web-order.ts, /web-sitesi-siparis)
 * aynı alan setini kullanır — partner'ın müşteriden topladığı bilgiler HAYB'nin kendi
 * sipariş formuyla birebir aynı olur, admin'e eksiksiz ulaşır. Checkbox'lar bu bileşen
 * içinde state olarak tutulur, submit anında tek bir gizli "websiteDetails" alanına
 * okunabilir metin olarak serileştirilip leads.description'a yazılır (şema değişikliği yok).
 */
export function WebsiteSaleFields() {
  const [pages, setPages] = useState<string[]>([]);
  const [pagesOther, setPagesOther] = useState('');
  const [requests, setRequests] = useState<string[]>([]);
  const [requestsOther, setRequestsOther] = useState('');

  const togglePage = (p: string) => setPages((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  const toggleRequest = (r: string) => setRequests((cur) => (cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r]));

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Web Sitesi Detayları</p>

      <Field id="sector" label="Sektör" hint="HAYB'nin sipariş formuyla aynı liste">
        {(a) => (
          <input {...inputProps(a)} name="sector" list="sector-suggestions" className={a.className} />
        )}
      </Field>
      <datalist id="sector-suggestions">
        {SECTOR_SUGGESTIONS.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <Field id="businessDescription" label="Müşteri kısaca ne iş yapıyor?">
        {(a) => <textarea {...inputProps(a)} name="businessDescription" className={`${a.className} min-h-20`} />}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="hasDomain" label="Domain durumu">
          {(a) => (
            <select {...inputProps(a)} name="hasDomain" className={a.className}>
              <option value="unknown">Bilinmiyor</option>
              <option value="yes">Var</option>
              <option value="no">Yok</option>
            </select>
          )}
        </Field>
        <Field id="hasHosting" label="Hosting durumu">
          {(a) => (
            <select {...inputProps(a)} name="hasHosting" className={a.className}>
              <option value="unknown">Bilinmiyor</option>
              <option value="yes">Var</option>
              <option value="no">Yok</option>
            </select>
          )}
        </Field>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">İstenen Sayfalar</p>
        <div className="flex flex-wrap gap-2">
          {PAGE_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePage(p)}
              className={`rounded-full border px-3 py-1.5 text-xs ${pages.includes(p) ? 'border-lime bg-lime/15 text-lime' : 'border-white/15 text-fg-muted'}`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => togglePage(OTHER_PAGE)}
            className={`rounded-full border px-3 py-1.5 text-xs ${pages.includes(OTHER_PAGE) ? 'border-lime bg-lime/15 text-lime' : 'border-white/15 text-fg-muted'}`}
          >
            Diğer
          </button>
        </div>
        {pages.includes(OTHER_PAGE) && (
          <input value={pagesOther} onChange={(e) => setPagesOther(e.target.value)} placeholder="Diğer sayfalar" className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-black/20 px-4 text-sm" />
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Özel İstekler</p>
        <div className="flex flex-wrap gap-2">
          {SPECIAL_REQUEST_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => toggleRequest(r)}
              className={`rounded-full border px-3 py-1.5 text-xs ${requests.includes(r) ? 'border-lime bg-lime/15 text-lime' : 'border-white/15 text-fg-muted'}`}
            >
              {r}
            </button>
          ))}
        </div>
        {requests.includes('Özel Bir İstek') && (
          <input
            value={requestsOther}
            onChange={(e) => setRequestsOther(e.target.value)}
            placeholder="Özel isteği yazın"
            className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-black/20 px-4 text-sm"
          />
        )}
      </div>

      <Field id="referenceWebsite" label="Referans web sitesi" hint="Opsiyonel">
        {(a) => <input {...inputProps(a)} name="referenceWebsite" type="url" placeholder="https://..." className={a.className} />}
      </Field>

      {/* Checkbox state'leri submit anında okunabilir tek bir metne serileştirilir (şema değişikliği gerektirmeden leads.description'a yazılır). */}
      <input type="hidden" name="websitePages" value={[...pages.filter((p) => p !== OTHER_PAGE), ...(pagesOther ? [pagesOther] : [])].join(', ')} />
      <input type="hidden" name="websiteRequests" value={[...requests.filter((r) => r !== 'Özel Bir İstek'), ...(requestsOther ? [requestsOther] : [])].join(', ')} />
    </div>
  );
}
