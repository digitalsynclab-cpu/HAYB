'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

async function requireAdminId() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Yetkisiz.');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') throw new Error('Yetkisiz.');
  return user.id;
}

export interface AnnouncementResult {
  ok: boolean;
  error?: string;
  sentCount?: number;
}

export async function sendAnnouncementAction(_prev: AnnouncementResult, formData: FormData): Promise<AnnouncementResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const title = String(formData.get('title') || '').trim();
  const body = String(formData.get('body') || '').trim();
  if (!title || !body) return { ok: false, error: 'Başlık ve mesaj zorunludur.' };

  const { data: partners, error: partnersErr } = await admin.from('partners').select('profile_id').eq('status', 'active');
  if (partnersErr) return { ok: false, error: partnersErr.message };
  if (!partners || partners.length === 0) return { ok: false, error: 'Aktif partner bulunamadı.' };

  const rows = partners.map((p) => ({ profile_id: p.profile_id, title, body, type: 'announcement' }));
  const { error } = await admin.from('notifications').insert(rows);
  if (error) return { ok: false, error: error.message };

  await writeAuditLog(admin, { actorId: adminId, action: 'announcement_sent', entityType: 'notification', newData: { title, recipientCount: rows.length } });
  revalidatePath('/secretadmin/duyuru-gonder');
  return { ok: true, sentCount: rows.length };
}
