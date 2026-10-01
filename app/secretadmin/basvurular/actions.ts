'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { generatePartnerCode } from '@/lib/partner/partner-code';
import { writeAuditLog, notify } from '@/lib/partner/audit';
import { sendEmail } from '@/lib/email/resend';
import { partnerApplicationApprovedEmail, partnerApplicationRejectedEmail } from '@/lib/email/templates';
import { site } from '@/data/site';

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Yetkisiz.');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') throw new Error('Yetkisiz.');
  return user.id;
}

export interface ApplicationActionResult {
  ok: boolean;
  error?: string;
}

export async function approveApplicationAction(applicationId: string): Promise<ApplicationActionResult> {
  const adminId = await requireAdmin();
  const admin = createSupabaseAdminClient();

  const { data: application, error: appError } = await admin
    .from('partner_applications')
    .select('id, profile_id, status, profiles!partner_applications_profile_id_fkey(email, full_name)')
    .eq('id', applicationId)
    .single();
  if (appError || !application) return { ok: false, error: 'Başvuru bulunamadı.' };
  if (application.status === 'approved') return { ok: false, error: 'Başvuru zaten onaylı.' };

  let code = generatePartnerCode();
  for (let i = 0; i < 5; i++) {
    const { data: clash } = await admin.from('partners').select('id').eq('partner_code', code).maybeSingle();
    if (!clash) break;
    code = generatePartnerCode();
  }

  const { error: partnerError } = await admin.from('partners').insert({
    profile_id: application.profile_id,
    application_id: application.id,
    partner_code: code,
    status: 'active',
    approved_at: new Date().toISOString(),
    approved_by: adminId,
  });
  if (partnerError) return { ok: false, error: 'Partner kaydı oluşturulamadı: ' + partnerError.message };

  await admin.from('profiles').update({ role: 'partner' }).eq('id', application.profile_id);

  const previousStatus = application.status;
  await admin.from('partner_applications').update({ status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: adminId }).eq('id', application.id);
  await admin.from('application_status_history').insert({ application_id: application.id, previous_status: previousStatus, new_status: 'approved', changed_by: adminId });

  await writeAuditLog(admin, { actorId: adminId, action: 'partner_approved', entityType: 'partner_application', entityId: application.id });
  await notify(admin, { profileId: application.profile_id, title: 'Başvurunuz onaylandı', body: 'HAYB Partner panelinize giriş yapabilirsiniz.', type: 'application_approved' });

  const profileRow = Array.isArray(application.profiles) ? application.profiles[0] : application.profiles;
  await sendEmail({
    to: profileRow.email,
    subject: 'HAYB Partner başvurunuz onaylandı 🎉',
    html: partnerApplicationApprovedEmail(profileRow.full_name || '', `${site.url}/partner/giris`),
  });

  revalidatePath('/secretadmin/basvurular');
  revalidatePath(`/secretadmin/basvurular/${applicationId}`);
  return { ok: true };
}

export async function rejectApplicationAction(applicationId: string, reason: string): Promise<ApplicationActionResult> {
  const adminId = await requireAdmin();
  const admin = createSupabaseAdminClient();

  const { data: application, error: appError } = await admin
    .from('partner_applications')
    .select('id, profile_id, status, profiles!partner_applications_profile_id_fkey(email, full_name)')
    .eq('id', applicationId)
    .single();
  if (appError || !application) return { ok: false, error: 'Başvuru bulunamadı.' };

  const previousStatus = application.status;
  await admin
    .from('partner_applications')
    .update({ status: 'rejected', reviewed_at: new Date().toISOString(), reviewed_by: adminId, decision_reason: reason || null })
    .eq('id', application.id);
  await admin.from('application_status_history').insert({ application_id: application.id, previous_status: previousStatus, new_status: 'rejected', changed_by: adminId, note: reason });

  await writeAuditLog(admin, { actorId: adminId, action: 'partner_rejected', entityType: 'partner_application', entityId: application.id, newData: { reason } });

  const profileRow = Array.isArray(application.profiles) ? application.profiles[0] : application.profiles;
  await sendEmail({
    to: profileRow.email,
    subject: 'HAYB Partner başvurunuz hakkında',
    html: partnerApplicationRejectedEmail(profileRow.full_name || '', reason),
  });

  revalidatePath('/secretadmin/basvurular');
  revalidatePath(`/secretadmin/basvurular/${applicationId}`);
  return { ok: true };
}

export async function setApplicationStatusAction(applicationId: string, status: 'reviewing' | 'interview'): Promise<ApplicationActionResult> {
  const adminId = await requireAdmin();
  const admin = createSupabaseAdminClient();
  const { data: application } = await admin.from('partner_applications').select('status').eq('id', applicationId).single();
  if (!application) return { ok: false, error: 'Başvuru bulunamadı.' };

  await admin.from('partner_applications').update({ status }).eq('id', applicationId);
  await admin.from('application_status_history').insert({ application_id: applicationId, previous_status: application.status, new_status: status, changed_by: adminId });

  revalidatePath('/secretadmin/basvurular');
  revalidatePath(`/secretadmin/basvurular/${applicationId}`);
  return { ok: true };
}
