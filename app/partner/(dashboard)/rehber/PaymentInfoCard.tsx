'use client';

import { useState } from 'react';
import { HAYB_BANK_INFO } from '@/lib/partner/hayb-bank-info';

export function PaymentInfoCard() {
  const [copied, setCopied] = useState(false);
  const ibanDigitsOnly = HAYB_BANK_INFO.iban.replace(/\s/g, '');

  return (
    <div className="rounded-2xl border border-lime/30 bg-lime/5 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-lime">Müşteri Ödemesi HAYB&apos;ye Buradan Yapılır</p>
      <p className="mt-2 text-sm text-fg-muted">
        Satış onaylandıktan sonra müşteri ödemesini bu hesaba <strong className="text-fg">havale/EFT</strong> ile yapar. Kart ile ödeme veya taksit imkanı yoktur. Ödeme HAYB&apos;ye ulaştıktan sonra proje süreci başlar ve satış tamamlandığında komisyonunuz hesaplanır.
      </p>
      <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-black/30 p-4">
        <p className="text-sm">
          <span className="text-fg-muted">Banka:</span> <span className="font-semibold">{HAYB_BANK_INFO.bankName}</span>
        </p>
        <p className="text-sm">
          <span className="text-fg-muted">Hesap Sahibi:</span> <span className="font-semibold">{HAYB_BANK_INFO.accountHolder}</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-sm font-semibold tracking-wide">{HAYB_BANK_INFO.iban}</p>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(ibanDigitsOnly);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              } catch {
                /* clipboard erişimi yoksa sessizce yok say */
              }
            }}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-lime/50 hover:text-lime"
          >
            {copied ? 'Kopyalandı' : "IBAN'ı Kopyala"}
          </button>
        </div>
      </div>
    </div>
  );
}
