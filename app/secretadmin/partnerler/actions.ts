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

export async function setPartnerStatusAction(partnerId: string, status: 'active' | 'suspended' | 'inactive') {
  const adminId = await requireAdminId();
  const admin = createSupabaseAdminClient();
  await admin.from('partners').update({ status, suspended_at: status === 'suspended' ? new Date().toISOString() : null }).eq('id', partnerId);
  await writeAuditLog(admin, { actorId: adminId, action: `partner_status_${status}`, entityType: 'partner', entityId: partnerId });
  revalidatePath('/secretadmin/partnerler');
}
