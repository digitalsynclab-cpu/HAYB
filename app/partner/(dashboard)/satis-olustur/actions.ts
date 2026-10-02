'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface CreateSaleResult {
  ok: boolean;
  error?: string;
}

export async function createPartnerSaleAction(_prev: CreateSaleResult, formData: FormData): Promise<CreateSaleResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { data: partner } = await supabase.from('partners').select('id, status').eq('profile_id', user.id).single();
  if (!partner || partner.status !== 'active') return { ok: false, error: 'Partner hesabınız aktif değil.' };

  const serviceId = String(formData.get('serviceId') || '');
  const packageId = String(formData.get('packageId') || '') || null;
  const contactName = String(formData.get('contactName') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const email = String(formData.get('email') || '').trim() || null;
  const companyName = String(formData.get('companyName') || '').trim() || null;
  const notes = String(formData.get('notes') || '').trim() || null;

  // Web Sitesi / E-Ticaret: partner form doldurmaz, müşteriye gönderilen metne verilen
  // yanıt olduğu gibi yapıştırılır — admin'e müşterinin kendi cümleleriyle ulaşır.
  const customerFormResponse = String(formData.get('customerFormResponse') || '').trim();
  const fullDescription = [notes, customerFormResponse && `Müşteri yanıtı:\n${customerFormResponse}`].filter(Boolean).join('\n\n') || null;

  if (!serviceId || !contactName || !phone) {
    return { ok: false, error: 'Hizmet, müşteri adı ve telefon zorunludur.' };
  }

  const admin = createSupabaseAdminClient();

  const { data: svc } = await admin.from('services').select('id').eq('id', serviceId).eq('active', true).single();
  if (!svc) return { ok: false, error: 'Seçilen hizmet bulunamadı.' };

  let amount = 0;
  if (packageId) {
    const { data: pkg } = await admin.from('packages').select('id, price, service_id').eq('id', packageId).eq('active', true).single();
    if (!pkg || pkg.service_id !== serviceId) return { ok: false, error: 'Seçilen paket bu hizmete ait değil.' };
    amount = Number(pkg.price ?? 0);
  }

  if (amount <= 0) {
    return { ok: false, error: 'Bu paket için fiyat tanımlanmamış. Lütfen admin ile iletişime geçin.' };
  }

  const { data: lead } = await admin
    .from('leads')
    .insert({
      partner_id: partner.id,
      company_name: companyName,
      contact_name: contactName,
      phone,
      email,
      service_id: serviceId,
      package_id: packageId,
      description: fullDescription,
      status: 'proposal',
      source: 'partner',
    })
    .select('id')
    .single();

  const { data: sale, error } = await admin
    .from('sales')
    .insert({
      lead_id: lead?.id ?? null,
      partner_id: partner.id,
      service_id: serviceId,
      package_id: packageId,
      amount,
      sale_status: 'submitted',
      created_by_role: 'partner',
      created_by: user.id,
    })
    .select('id')
    .single();

  if (error || !sale) return { ok: false, error: 'Satış oluşturulamadı. Lütfen tekrar deneyin.' };

  await admin.from('sale_status_history').insert({ sale_id: sale.id, new_status: 'submitted', changed_by: user.id });
  await writeAuditLog(admin, { actorId: user.id, action: 'partner_sale_submitted', entityType: 'sale', entityId: sale.id });

  revalidatePath('/partner/satislar');
  redirect('/partner/satislar');
}
