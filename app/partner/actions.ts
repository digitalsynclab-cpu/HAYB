'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function partnerLoginAction(_prev: LoginResult, formData: FormData): Promise<LoginResult> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  if (!email || !password) return { ok: false, error: 'E-posta ve şifre gerekli.' };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { ok: false, error: 'E-posta veya şifre hatalı.' };

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();

  if (profile?.role === 'partner') {
    const { data: partner } = await supabase.from('partners').select('status').eq('profile_id', data.user.id).single();
    if (partner?.status === 'active') redirect('/partner/panel');
    redirect('/partner/basvuru/durum');
  }

  redirect('/partner/basvuru/durum');
}

export async function partnerLogoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/partner/giris');
}
