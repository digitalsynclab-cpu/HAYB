'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export interface MaterialActionResult {
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

export async function createMaterialAction(_prev: MaterialActionResult, formData: FormData): Promise<MaterialActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();

  const title = String(formData.get('title') || '').trim();
  const materialType = String(formData.get('materialType') || '').trim();
  const description = String(formData.get('description') || '').trim() || null;
  const fileUrl = String(formData.get('fileUrl') || '').trim() || null;
  if (!title || !materialType) return { ok: false, error: 'Başlık ve tür zorunludur.' };

  const { error } = await admin.from('marketing_materials').insert({ title, material_type: materialType, description, file_url: fileUrl });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/secretadmin/materyaller');
  return { ok: true };
}

export async function toggleMaterialActiveAction(id: string, active: boolean): Promise<MaterialActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('marketing_materials').update({ active }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/secretadmin/materyaller');
  return { ok: true };
}

export async function deleteMaterialAction(id: string): Promise<MaterialActionResult> {
  await requireAdmin();
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('marketing_materials').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/secretadmin/materyaller');
  return { ok: true };
}
