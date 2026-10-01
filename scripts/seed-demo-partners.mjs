// HAYB Partner Network v2 — demo partner seed script
//
// 10 gerçekçi demo partner + bağlı lead/sale/commission kayıtları oluşturur.
// Tüm kayıtlar is_demo=true ile işaretlenir, gerçek verilerle asla karışmaz.
// Kullanım: node scripts/seed-demo-partners.mjs
//
// Gerekli env değişkenleri: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// (varsayılan olarak .env.local okunur; staging'de denemek için
//  `node -r dotenv/config scripts/seed-demo-partners.mjs dotenv_config_path=.env.staging.local` kullanın)

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.');
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

const DEMO_PARTNERS = [
  { name: 'Ahmet Kaya', city: 'İstanbul', sector: 'Dijital Pazarlama', sales: 8 },
  { name: 'Elif Demir', city: 'Ankara', sector: 'Freelance Tasarım', sales: 6 },
  { name: 'Mert Yılmaz', city: 'İzmir', sector: 'Sosyal Medya Yönetimi', sales: 5 },
  { name: 'Zeynep Arslan', city: 'Bursa', sector: 'Satış Danışmanlığı', sales: 4 },
  { name: 'Can Öztürk', city: 'Antalya', sector: 'Ajans', sales: 4 },
  { name: 'Selin Koç', city: 'İstanbul', sector: 'Girişimcilik', sales: 3 },
  { name: 'Burak Şahin', city: 'Kocaeli', sector: 'Yerel İşletme Danışmanlığı', sales: 2 },
  { name: 'Aslı Yıldız', city: 'Eskişehir', sector: 'Grafik Tasarım', sales: 2 },
  { name: 'Kerem Aydın', city: 'Adana', sector: 'Satış', sales: 1 },
  { name: 'Deniz Çelik', city: 'Konya', sector: 'Serbest Danışman', sales: 0 },
];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

async function main() {
  const { data: allServices } = await admin.from('services').select('id, slug').eq('active', true);
  const { data: packages } = await admin.from('packages').select('id, service_id, price').eq('active', true).not('price', 'is', null);
  const services = (allServices ?? []).filter((s) => (packages ?? []).some((p) => p.service_id === s.id));
  if (!services.length || !packages?.length) {
    console.error('Fiyatlı paketi olan hizmet bulunamadı. Önce gerçek hizmet/paket verisi olmalı.');
    process.exit(1);
  }

  let created = 0;
  for (let i = 0; i < DEMO_PARTNERS.length; i++) {
    const p = DEMO_PARTNERS[i];
    const email = `demo.partner${i + 1}@hayb-demo.test`;

    const { data: existingProfile } = await admin.from('profiles').select('id').eq('email', email).maybeSingle();
    let profileId = existingProfile?.id;

    if (!profileId) {
      const { data: authUser, error: authErr } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        password: crypto.randomUUID(),
        user_metadata: { full_name: p.name, is_demo: true },
      });
      if (authErr || !authUser.user) {
        console.error(`Auth kullanıcı oluşturulamadı (${email}):`, authErr?.message);
        continue;
      }
      profileId = authUser.user.id;
      const { error: profileErr } = await admin
        .from('profiles')
        .upsert({ id: profileId, email, full_name: p.name, role: 'partner' }, { onConflict: 'id' });
      if (profileErr) {
        console.error(`Profile oluşturulamadı (${email}):`, profileErr.message);
        continue;
      }
    }

    const { data: existingPartner } = await admin.from('partners').select('id').eq('profile_id', profileId).maybeSingle();
    let partnerId = existingPartner?.id;

    if (!partnerId) {
      const { data: partner, error } = await admin
        .from('partners')
        .insert({
          profile_id: profileId,
          partner_code: `DEMO-${String(i + 1).padStart(3, '0')}`,
          status: 'active',
          approved_at: daysAgo(90 - i * 5),
          is_demo: true,
        })
        .select('id')
        .single();
      if (error || !partner) {
        console.error(`Partner oluşturulamadı (${email}):`, error?.message);
        continue;
      }
      partnerId = partner.id;
    }

    for (let s = 0; s < p.sales; s++) {
      const service = services[(i + s) % services.length];
      const pkgCandidates = packages.filter((pkg) => pkg.service_id === service.id && pkg.price);
      const pkg = pkgCandidates[s % pkgCandidates.length];
      if (!pkg) continue;

      const { data: lead } = await admin
        .from('leads')
        .insert({
          partner_id: partnerId,
          contact_name: `Demo Müşteri ${i + 1}-${s + 1}`,
          phone: `0555${String(1000000 + i * 10 + s).slice(-7)}`,
          city: p.city,
          sector: p.sector,
          service_id: service.id,
          package_id: pkg.id,
          status: 'won',
          source: 'partner',
          is_demo: true,
        })
        .select('id')
        .single();

      const { data: sale } = await admin
        .from('sales')
        .insert({
          lead_id: lead?.id ?? null,
          partner_id: partnerId,
          service_id: service.id,
          package_id: pkg.id,
          amount: pkg.price,
          sale_status: 'completed',
          created_by_role: 'admin',
          sold_at: daysAgo(80 - s * 7 - i),
          completed_at: daysAgo(70 - s * 7 - i),
          is_demo: true,
        })
        .select('id')
        .single();

      if (sale) {
        const commissionRate = 10; // demo amaçlı sabit gösterim oranı, gerçek hesaplama commission_rules üzerinden yapılır
        const commissionAmount = Number(pkg.price) * (commissionRate / 100);
        await admin.from('commissions').insert({
          sale_id: sale.id,
          partner_id: partnerId,
          base_amount: pkg.price,
          commission_type: 'percentage',
          commission_value: commissionRate,
          commission_amount: commissionAmount,
          status: s % 3 === 0 ? 'paid' : 'approved',
          is_demo: true,
        });
      }
    }

    created++;
    console.log(`✓ ${p.name} (${p.sales} satış) oluşturuldu.`);
  }

  console.log(`\n${created}/${DEMO_PARTNERS.length} demo partner hazır.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
