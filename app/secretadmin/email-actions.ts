'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/resend';
import { stageUpdateEmail } from '@/lib/email/templates';
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

export interface EmailActionResult {
  ok: boolean;
  error?: string;
}

/** Lead veya satış aşaması için hazır içerikli mail gönderir; her buton sabit bir stageKey taşır. */
export async function sendStageEmailAction(params: {
  toEmail: string;
  customerName: string;
  stageKey: string;
  stageTitle: string;
  message: string;
  relatedEntityType: 'lead' | 'sale';
  relatedEntityId: string;
  revalidate?: string;
}): Promise<EmailActionResult> {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();

  const result = await sendEmail({ to: params.toEmail, subject: params.stageTitle, html: stageUpdateEmail({ customerName: params.customerName, stageTitle: params.stageTitle, message: params.message }) });

  await admin.from('email_log').insert({
    to_email: params.toEmail,
    template: params.stageKey,
    related_entity_type: params.relatedEntityType,
    related_entity_id: params.relatedEntityId,
    status: result.ok ? 'sent' : 'failed',
    resend_id: result.id ?? null,
    sent_by: adminId,
  });

  if (!result.ok) return { ok: false, error: result.error };

  await writeAuditLog(admin, { actorId: adminId, action: `email_sent:${params.stageKey}`, entityType: params.relatedEntityType, entityId: params.relatedEntityId });
  if (params.revalidate) revalidatePath(params.revalidate);
  return { ok: true };
}
