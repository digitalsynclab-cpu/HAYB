'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { markNotificationReadAction, markAllNotificationsReadAction } from './actions';

export function MarkAllReadButton({ disabled }: { disabled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={disabled || pending}
      onClick={() => startTransition(async () => { await markAllNotificationsReadAction(); router.refresh(); })}
      className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 disabled:opacity-40"
    >
      {pending ? '…' : 'Tümünü Okundu İşaretle'}
    </button>
  );
}

export function NotificationItem({ id, title, body, createdAt, isRead, href }: { id: string; title: string; body: string | null; createdAt: string; isRead: boolean; href?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const content = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-medium">{title}</p>
        {body && <p className="mt-1 text-sm text-fg-muted">{body}</p>}
        <p className="mt-1 text-xs text-fg-muted">{new Date(createdAt).toLocaleString('tr-TR')}</p>
      </div>
      {!isRead && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime" />}
    </div>
  );

  return (
    <div
      className={`rounded-2xl border p-5 transition ${isRead ? 'border-white/10 bg-white/5' : 'border-lime/30 bg-lime/5'} ${href ? 'cursor-pointer hover:border-lime/50' : ''}`}
      onClick={() => {
        if (!isRead && !pending) startTransition(async () => { await markNotificationReadAction(id); router.refresh(); });
        if (href) router.push(href);
      }}
    >
      {content}
    </div>
  );
}
