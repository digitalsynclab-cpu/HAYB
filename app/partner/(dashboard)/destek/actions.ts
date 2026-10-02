'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatTicketSubject, SUPPORT_CATEGORIES } from '@/lib/partner/support-category';

export interface SupportActionResult {
  ok: boolean;
  error?: string;
}

export async function createTicketAction(_prev: SupportActionResult, formData: FormData): Promise<SupportActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { data: partner } = await supabase.from('partners').select('id').eq('profile_id', user.id).single();
  if (!partner) return { ok: false, error: 'Partner kaydı bulunamadı.' };

  const category = String(formData.get('category') || '').trim();
  const title = String(formData.get('subject') || '').trim();
  const message = String(formData.get('message') || '').trim();
  if (!title || !message) return { ok: false, error: 'Konu ve mesaj zorunludur.' };

  const subject = formatTicketSubject((SUPPORT_CATEGORIES as readonly string[]).includes(category) ? category : 'Diğer', title);

  const { data: ticket, error } = await supabase.from('support_tickets').insert({ partner_id: partner.id, subject }).select('id').single();
  if (error || !ticket) return { ok: false, error: 'Talep oluşturulamadı.' };

  await supabase.from('support_messages').insert({ ticket_id: ticket.id, author_id: user.id, author_role: 'partner', message });

  redirect(`/partner/destek/${ticket.id}`);
}

export async function replyTicketAction(_prev: SupportActionResult, formData: FormData): Promise<SupportActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const ticketId = String(formData.get('ticketId') || '');
  const message = String(formData.get('message') || '').trim();
  if (!ticketId || !message) return { ok: false, error: 'Mesaj boş olamaz.' };

  const { data: ticket } = await supabase.from('support_tickets').select('status').eq('id', ticketId).single();
  const { error } = await supabase.from('support_messages').insert({ ticket_id: ticketId, author_id: user.id, author_role: 'partner', message });
  if (error) return { ok: false, error: 'Mesaj gönderilemedi.' };

  // Partner yanıt verince admin'in tekrar ilgilenmesi gerektiğini belirtmek için durumu ilerlet.
  if (ticket?.status === 'waiting_partner') {
    await supabase.from('support_tickets').update({ status: 'in_progress' }).eq('id', ticketId);
  }

  revalidatePath(`/partner/destek/${ticketId}`);
  revalidatePath('/partner/destek');
  return { ok: true };
}
