import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NotificationItem, MarkAllReadButton } from './NotificationsClient';

function hrefForType(type: string): string | undefined {
  if (type.startsWith('sale_')) return '/partner/satislar';
  if (type.startsWith('commission_')) return '/partner/kazanc';
  if (type.startsWith('support_')) return '/partner/destek';
  if (type.startsWith('application_')) return '/partner/basvuru/durum';
  return undefined;
}

export default async function PartnerNotificationsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, title, body, type, is_read, created_at')
    .eq('profile_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(100);

  const unreadCount = (notifications ?? []).filter((n) => !n.is_read).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Bildirimler</h1>
        <MarkAllReadButton disabled={unreadCount === 0} />
      </div>

      <div className="mt-6 space-y-3">
        {(notifications ?? []).map((n) => (
          <NotificationItem key={n.id} id={n.id} title={n.title} body={n.body} createdAt={n.created_at} isRead={n.is_read} href={hrefForType(n.type)} />
        ))}
        {(!notifications || notifications.length === 0) && <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-fg-muted">Henüz bildiriminiz yok.</p>}
      </div>
    </div>
  );
}
