'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export interface ScriptActionResult {
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
}

export async function createScriptAction(_prev: ScriptActionResult, formData: FormData): Promise<ScriptActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();

  const category = String(formData.get('category') || '').trim();
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  if (!category || !title || !content) return { ok: false, error: 'Kategori, başlık ve içerik zorunludur.' };

  const { error } = await admin.from('sales_scripts').insert({ category, title, content });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/secretadmin/satis-rehberi');
  return { ok: true };
}

export async function toggleScriptActiveAction(id: string, active: boolean): Promise<ScriptActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('sales_scripts').update({ active }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/secretadmin/satis-rehberi');
  return { ok: true };
}

export async function deleteScriptAction(id: string): Promise<ScriptActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('sales_scripts').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/secretadmin/satis-rehberi');
  return { ok: true };
}
