'use server';

import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { applicationSchema } from '@/lib/partner/application-schema';
import { writeAuditLog } from '@/lib/partner/audit';
import { sendEmail } from '@/lib/email/resend';
import { partnerApplicationReceivedEmail } from '@/lib/email/templates';

export interface SubmitResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitPartnerApplicationAction(_prev: SubmitResult, formData: FormData): Promise<SubmitResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = applicationSchema.safeParse({
    ...raw,
    hasCompany: raw.hasCompany === 'true',
    hasSalesExperienceBefore: raw.hasSalesExperienceBefore === 'true',
    interestedServices: formData.getAll('interestedServices'),
    kvkkConsent: raw.kvkkConsent === 'true',
    termsConsent: raw.termsConsent === 'true',
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { ok: false, error: 'Lütfen formu kontrol edin.', fieldErrors };
  }

  const data = { ...parsed.data, phone: `+90${parsed.data.phone}` };
  const admin = createSupabaseAdminClient();

  const { data: existing } = await admin.from('profiles').select('id').eq('email', data.email).maybeSingle();
  if (existing) {
    return { ok: false, error: 'Bu e-posta ile daha önce başvuru yapılmış.', fieldErrors: { email: 'Bu e-posta zaten kayıtlı.' } };
  }

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  });
  if (authError || !authUser.user) {
    return { ok: false, error: 'Hesap oluşturulamadı: ' + (authError?.message || 'bilinmeyen hata') };
  }

  const { error: profileError } = await admin.from('profiles').insert({
    id: authUser.user.id,
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    role: 'user',
    status: 'active',
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(authUser.user.id);
    return { ok: false, error: 'Profil oluşturulamadı.' };
  }

  const { password: _password, ...applicationData } = data;
  const { data: application, error: appError } = await admin
    .from('partner_applications')
    .insert({ profile_id: authUser.user.id, status: 'pending', application_data: applicationData })
    .select('id')
    .single();

  if (appError || !application) {
    return { ok: false, error: 'Başvuru kaydedilemedi.' };
  }

  await writeAuditLog(admin, {
    actorId: authUser.user.id,
    action: 'application_submitted',
    entityType: 'partner_application',
    entityId: application.id,
    newData: applicationData,
  });

  await sendEmail({ to: data.email, subject: 'HAYB Partner başvurunuz alındı', html: partnerApplicationReceivedEmail(data.fullName) });

  redirect('/partner/basvuru/tesekkurler');
}
