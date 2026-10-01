// HAYB Partner Network v2 — demo veri temizleme script'i
//
// SADECE is_demo=true olarak işaretlenmiş kayıtları siler. Genel DELETE yoktur,
// gerçek partner/müşteri verisine kesinlikle dokunmaz.
// Kullanım: node scripts/cleanup-demo-data.mjs --confirm
//
// Gerekli env değişkenleri: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.');
  process.exit(1);
}

if (!process.argv.includes('--confirm')) {
  console.log('Bu script yalnızca is_demo=true kayıtları siler. Onaylamak için --confirm bayrağıyla çalıştırın.');
  console.log('Örnek: node scripts/cleanup-demo-data.mjs --confirm');
  process.exit(0);
}

const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  const { data: demoPartners } = await admin.from('partners').select('id, profile_id').eq('is_demo', true);
  const partnerIds = (demoPartners ?? []).map((p) => p.id);
  const profileIds = (demoPartners ?? []).map((p) => p.profile_id);

  console.log(`${partnerIds.length} demo partner bulundu.`);
  if (partnerIds.length === 0) {
    console.log('Temizlenecek demo veri yok.');
    return;
  }

  // Foreign key bağımlılık sırasına göre siliniyor: commissions -> sales -> leads ->
  // support_messages -> support_tickets -> notifications -> partners -> profiles/auth users.
  // Her adımda hata kontrol edilir; bir adım başarısız olursa script durur, sonraki
  // adıma (özellikle profile/auth user silmeye) geçmez — orphan kayıt bırakmamak için.
  async function deleteBy(table, column, value) {
    const { count, error } = await admin.from(table).delete({ count: 'exact' }).eq(column, value);
    if (error) {
      console.error(`HATA: ${table} silinemedi: ${error.message}`);
      process.exit(1);
    }
    return count ?? 0;
  }

  const { data: demoTickets } = await admin.from('support_tickets').select('id').in('partner_id', partnerIds);
  const ticketIds = (demoTickets ?? []).map((t) => t.id);
  let messagesDeleted = 0;
  if (ticketIds.length > 0) {
    const { count, error } = await admin.from('support_messages').delete({ count: 'exact' }).in('ticket_id', ticketIds);
    if (error) {
      console.error(`HATA: support_messages silinemedi: ${error.message}`);
      process.exit(1);
    }
    messagesDeleted = count ?? 0;
  }

  const commissionsDeleted = await deleteBy('commissions', 'is_demo', true);
  const salesDeleted = await deleteBy('sales', 'is_demo', true);
  const leadsDeleted = await deleteBy('leads', 'is_demo', true);
  const ticketsDeleted = await deleteBy('support_tickets', 'is_demo', true);
  const notificationsDeleted = await deleteBy('notifications', 'is_demo', true);
  const partnersDeleted = await deleteBy('partners', 'is_demo', true);

  let cleanedProfiles = 0;
  for (const profileId of profileIds) {
    const { error: profileErr } = await admin.from('profiles').delete().eq('id', profileId);
    if (profileErr) {
      console.error(`UYARI: profile ${profileId} silinemedi (${profileErr.message}), auth kullanıcı korunuyor.`);
      continue;
    }
    const { error: authErr } = await admin.auth.admin.deleteUser(profileId);
    if (authErr) {
      console.error(`UYARI: auth kullanıcı ${profileId} silinemedi: ${authErr.message}`);
      continue;
    }
    cleanedProfiles++;
  }

  console.log('Temizlendi:');
  console.log(`  support_messages: ${messagesDeleted}`);
  console.log(`  support_tickets: ${ticketsDeleted}`);
  console.log(`  commissions: ${commissionsDeleted}`);
  console.log(`  sales: ${salesDeleted}`);
  console.log(`  leads: ${leadsDeleted}`);
  console.log(`  notifications: ${notificationsDeleted}`);
  console.log(`  partners: ${partnersDeleted}`);
  console.log(`  profiles/auth users: ${cleanedProfiles}/${profileIds.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
