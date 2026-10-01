'use server';

import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/resend';
import { freeformEmail } from '@/lib/email/templates';
import { writeAuditLog } from '@/lib/partner/audit';

export interface FreeformEmailResult {
  ok: boolean;
  error?: string;
}

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

export async function sendFreeformEmailAction(_prev: FreeformEmailResult, formData: FormData): Promise<FreeformEmailResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const toEmail = String(formData.get('toEmail') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!toEmail || !subject || !message) return { ok: false, error: 'Alıcı, konu ve mesaj zorunludur.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) return { ok: false, error: 'Geçerli bir e-posta adresi girin.' };

  const result = await sendEmail({ to: toEmail, subject, html: freeformEmail({ subject, message }) });

  await admin.from('email_log').insert({
    to_email: toEmail,
    template: 'freeform',
    status: result.ok ? 'sent' : 'failed',
    resend_id: result.id ?? null,
    sent_by: adminId,
  });

  if (!result.ok) return { ok: false, error: result.error };

  await writeAuditLog(admin, { actorId: adminId, action: 'freeform_email_sent', entityType: 'email', newData: { to: toEmail, subject } });
  return { ok: true };
}
