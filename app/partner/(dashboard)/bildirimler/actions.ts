'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface NotificationActionResult {
  ok: boolean;
  error?: string;
}

export async function markNotificationReadAction(id: string): Promise<NotificationActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  // RLS: notifications_update_own politikası yalnızca sahibinin (profile_id = auth.uid()) güncellemesine izin verir.
  const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id).eq('profile_id', user.id);
  if (error) return { ok: false, error: error.message };

  revalidatePath('/partner/bildirimler');
  return { ok: true };
}

export async function markAllNotificationsReadAction(): Promise<NotificationActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { error } = await supabase.from('notifications').update({ is_read: true }).eq('profile_id', user.id).eq('is_read', false);
  if (error) return { ok: false, error: error.message };

  revalidatePath('/partner/bildirimler');
  return { ok: true };
}
