'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { buildCustomerFormTemplate } from '@/lib/partner/customer-form-template';

/**
 * Web Sitesi / E-Ticaret satışlarında partner formu kendisi doldurmaz: bu metni kopyalayıp
 * müşteriye gönderir (WhatsApp/mail), müşteri yanıtlar, partner yanıtı aşağıya yapıştırır.
 * Admin'e müşterinin kendi cümleleriyle, eksiksiz bilgi ulaşır.
 */
export function WebsiteFormHandoff({ serviceName }: { serviceName: string }) {
  const [copied, setCopied] = useState(false);
  const template = buildCustomerFormTemplate(serviceName);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard izni yoksa sessizce yok say — kullanıcı metni elle seçip kopyalayabilir */
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Müşteri Bilgi Formu</p>
      <p className="text-sm text-fg-muted">
        Aşağıdaki metni kopyalayıp müşterinize gönderin (WhatsApp/mail). Müşteriniz yanıtladıktan sonra, yanıtını aynen alttaki alana yapıştırın.
      </p>

      <div className="rounded-lg border border-white/10 bg-ink-950/60 p-3">
        <pre className="whitespace-pre-wrap text-xs leading-relaxed text-fg-muted">{template}</pre>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-lime/50 hover:text-lime"
        >
          {copied ? <Check aria-hidden className="h-3.5 w-3.5 text-lime" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
          {copied ? 'Kopyalandı' : 'Metni Kopyala'}
        </button>
      </div>

      <div>
        <label htmlFor="customerFormResponse" className="mb-1.5 block text-sm font-medium">
          Müşterinin doldurduğu yanıtı buraya yapıştırın
        </label>
        <textarea
          id="customerFormResponse"
          name="customerFormResponse"
          required
          placeholder="Müşteriden gelen yanıtı buraya yapıştırın…"
          className="min-h-40 w-full rounded-xl border border-white/15 bg-ink-950/60 px-4 py-3 text-sm"
        />
      </div>
    </div>
  );
}
