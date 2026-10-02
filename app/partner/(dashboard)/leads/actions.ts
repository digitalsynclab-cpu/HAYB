'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface LeadActionResult {
  ok: boolean;
  error?: string;
  duplicateWarning?: boolean;
}

export async function createLeadAction(_prev: LeadActionResult, formData: FormData): Promise<LeadActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { data: partner } = await supabase.from('partners').select('id, status').eq('profile_id', user.id).single();
  if (!partner || partner.status !== 'active') return { ok: false, error: 'Partner hesabınız aktif değil.' };

  const contactName = String(formData.get('contactName') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const companyName = String(formData.get('companyName') || '').trim() || null;
  const email = String(formData.get('email') || '').trim() || null;
  const city = String(formData.get('city') || '').trim() || null;
  const sector = String(formData.get('sector') || '').trim() || null;
  const description = String(formData.get('description') || '').trim() || null;
  const serviceId = String(formData.get('serviceId') || '') || null;

  if (!contactName || !phone) return { ok: false, error: 'Müşteri adı ve telefon gerekli.' };

  // Duplicate kontrolü — diğer partnerlerin bilgisi sızdırılmadan yalnızca uyarı verilir.
  const { data: possibleDuplicate } = await supabase
    .from('leads')
    .select('id')
    .or(`phone.eq.${phone}${email ? `,email.eq.${email}` : ''}`)
    .neq('partner_id', partner.id)
    .limit(1)
    .maybeSingle();

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      partner_id: partner.id,
      contact_name: contactName,
      phone,
      company_name: companyName,
      email,
      city,
      sector,
      description,
      service_id: serviceId,
      status: 'new',
    })
    .select('id')
    .single();

  if (error || !lead) return { ok: false, error: 'Lead oluşturulamadı.' };

  await writeAuditLog(supabase, { actorId: user.id, action: 'lead_created', entityType: 'lead', entityId: lead.id });
  revalidatePath('/partner/musteriler');

  if (possibleDuplicate) {
    redirect(`/partner/musteriler?created=1&duplicate=1`);
  }
  redirect('/partner/musteriler?created=1');
}
