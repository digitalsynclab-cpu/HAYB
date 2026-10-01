'use server';

import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { issueAdminOtp, verifyAdminOtp } from '@/lib/partner/admin-otp';

export interface ActionResult {
  ok: boolean;
  error?: string;
  step?: 'otp';
}

export async function adminPasswordLoginAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  if (!email || !password) return { ok: false, error: 'E-posta ve şifre gerekli.' };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { ok: false, error: 'E-posta veya şifre hatalı.' };

  const { data: profile } = await supabase.from('profiles').select('role, email').eq('id', data.user.id).single();
  if (profile?.role !== 'admin') {
    await supabase.auth.signOut();
    return { ok: false, error: 'Bu hesabın admin yetkisi yok.' };
  }

  const otpResult = await issueAdminOtp(data.user.id, profile.email);
  if (!otpResult.ok) return { ok: false, error: otpResult.error || 'Kod gönderilemedi.' };

  return { ok: true, step: 'otp' };
}

export async function adminVerifyOtpAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const code = String(formData.get('code') || '').trim();
  if (!/^\d{6}$/.test(code)) return { ok: false, error: 'Kod 6 haneli olmalı.' };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı, lütfen tekrar giriş yapın.' };

  const result = await verifyAdminOtp(user.id, code);
  if (!result.ok) return { ok: false, error: result.error };

  const cookieStore = await cookies();
  cookieStore.set('hayb_admin_otp_ok', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 saat
  });

  return { ok: true };
}

export async function adminLogoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete('hayb_admin_otp_ok');
}
