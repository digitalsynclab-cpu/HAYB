'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface BankInfoResult {
  ok: boolean;
  error?: string;
}

function normalizeIban(raw: string): string {
  return raw.replace(/\s+/g, '').toUpperCase();
}

function isValidTrIban(iban: string): boolean {
  // TR + 2 kontrol hanesi + 22 haneli banka/hesap bilgisi = toplam 26 karakter.
  return /^TR\d{24}$/.test(iban);
}

export async function updateBankInfoAction(_prev: BankInfoResult, formData: FormData): Promise<BankInfoResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { data: partner } = await supabase.from('partners').select('id, status').eq('profile_id', user.id).single();
  if (!partner) return { ok: false, error: 'Partner kaydı bulunamadı.' };
  if (partner.status !== 'active') return { ok: false, error: 'Banka bilgisi yalnızca aktif partnerler tarafından eklenebilir.' };

  const accountHolderName = String(formData.get('accountHolderName') || '').trim();
  const iban = normalizeIban(String(formData.get('iban') || ''));

  if (!accountHolderName || accountHolderName.length < 3) return { ok: false, error: 'IBAN sahibinin ad soyadını girin.' };
  if (!isValidTrIban(iban)) return { ok: false, error: 'Geçerli bir TR IBAN girin (TR ile başlayan 26 karakter).' };

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('partners').update({ iban, account_holder_name: accountHolderName }).eq('id', partner.id);
  if (error) return { ok: false, error: 'Kaydedilemedi, lütfen tekrar deneyin.' };

  await writeAuditLog(admin, { actorId: user.id, action: 'partner_bank_info_updated', entityType: 'partner', entityId: partner.id });
  revalidatePath('/partner/profil');
  return { ok: true };
}
