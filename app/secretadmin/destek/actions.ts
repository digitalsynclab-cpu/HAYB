'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';

type SupportStatus = Database['public']['Enums']['support_status'];

export interface SupportActionResult {
  ok: boolean;
  error?: string;
}

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

export async function adminReplyTicketAction(_prev: SupportActionResult, formData: FormData): Promise<SupportActionResult> {
  const adminId = await requireAdmin();
  const admin = createSupabaseAdminClient();

  const ticketId = String(formData.get('ticketId') || '');
  const message = String(formData.get('message') || '').trim();
  if (!ticketId || !message) return { ok: false, error: 'Mesaj boş olamaz.' };

  await admin.from('support_messages').insert({ ticket_id: ticketId, author_id: adminId, author_role: 'admin', message });
  await admin.from('support_tickets').update({ status: 'waiting_partner' }).eq('id', ticketId);

  revalidatePath('/secretadmin/destek');
  return { ok: true };
}

export async function updateTicketStatusAction(ticketId: string, status: SupportStatus): Promise<SupportActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('support_tickets').update({ status }).eq('id', ticketId);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/secretadmin/destek');
  return { ok: true };
}
