'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/partner/audit';

export interface ProductOrderResult {
  ok: boolean;
  error?: string;
}

export async function createPartnerProductOrderAction(_prev: ProductOrderResult, formData: FormData): Promise<ProductOrderResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Oturum bulunamadı.' };

  const { data: partner } = await supabase.from('partners').select('id, status').eq('profile_id', user.id).single();
  if (!partner || partner.status !== 'active') return { ok: false, error: 'Bu alan yalnızca aktif partnerlere açıktır.' };

  const productSlug = String(formData.get('productSlug') || '');
  if (productSlug !== 'partner-start' && productSlug !== 'partner-premium') return { ok: false, error: 'Geçersiz ürün.' };

  const admin = createSupabaseAdminClient();
  // Fiyat ASLA client'tan alınmaz — her zaman DB'den o anki gerçek fiyat okunur (snapshot burada oluşur).
  const { data: product } = await admin.from('partner_products').select('slug, name, price, is_active').eq('slug', productSlug).single();
  if (!product || !product.is_active) return { ok: false, error: 'Bu ürün şu anda satışta değil.' };

  const formEntries: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'productSlug') continue;
    const str = String(value).trim();
    if (str) formEntries[key] = str;
  }

  const { data: order, error } = await admin
    .from('partner_product_orders')
    .insert({
      partner_id: partner.id,
      product_slug: product.slug,
      product_name: product.name,
      price: product.price,
      form_data: formEntries,
      status: 'submitted',
    })
    .select('id')
    .single();

  if (error || !order) return { ok: false, error: 'Talep gönderilemedi. Lütfen tekrar deneyin.' };

  await writeAuditLog(admin, { actorId: user.id, action: 'partner_product_order_created', entityType: 'partner_product_order', entityId: order.id, newData: { productSlug } });

  redirect('/partner/avantajlar/tesekkurler');
}
