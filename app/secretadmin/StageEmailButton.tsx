'use client';

import { useState, useTransition } from 'react';
import { sendStageEmailAction } from './email-actions';

interface Props {
  toEmail: string;
  customerName: string;
  stageKey: string;
  stageTitle: string;
  message: string;
  relatedEntityType: 'lead' | 'sale';
  relatedEntityId: string;
  revalidate?: string;
  label: string;
}

export function StageEmailButton(props: Props) {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState<'ok' | 'error' | null>(null);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const res = await sendStageEmailAction(props);
          setSent(res.ok ? 'ok' : 'error');
        })
      }
      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-fg-muted hover:border-lime hover:text-lime disabled:opacity-50"
      title={props.stageTitle}
    >
      {pending ? 'Gönderiliyor…' : sent === 'ok' ? '✓ Gönderildi' : sent === 'error' ? 'Hata, tekrar dene' : props.label}
    </button>
  );
}
