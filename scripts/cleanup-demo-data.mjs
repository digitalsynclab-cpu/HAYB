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

  // Foreign key bağımlılık sırasına göre siliniyor: commissions -> sales -> leads -> partners -> profiles/auth users
  const { count: commissionsDeleted } = await admin.from('commissions').delete({ count: 'exact' }).eq('is_demo', true);
  const { count: salesDeleted } = await admin.from('sales').delete({ count: 'exact' }).eq('is_demo', true);
  const { count: leadsDeleted } = await admin.from('leads').delete({ count: 'exact' }).eq('is_demo', true);
  const { count: notificationsDeleted } = await admin.from('notifications').delete({ count: 'exact' }).eq('is_demo', true);

  const { count: partnersDeleted } = await admin.from('partners').delete({ count: 'exact' }).eq('is_demo', true);

  for (const profileId of profileIds) {
    await admin.from('profiles').delete().eq('id', profileId);
    await admin.auth.admin.deleteUser(profileId).catch(() => {});
  }

  console.log('Temizlendi:');
  console.log(`  commissions: ${commissionsDeleted ?? 0}`);
  console.log(`  sales: ${salesDeleted ?? 0}`);
  console.log(`  leads: ${leadsDeleted ?? 0}`);
  console.log(`  notifications: ${notificationsDeleted ?? 0}`);
  console.log(`  partners: ${partnersDeleted ?? 0}`);
  console.log(`  profiles/auth users: ${profileIds.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
