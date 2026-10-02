-- HAYB Partner Network — gerçek komisyon kataloğu (kullanıcı tarafından verilen oranlar)
-- Veri migration'ı: yeni hizmet (QR Menü) + eksik paketler + paket bazlı komisyon kuralları.
-- Mevcut hiçbir kayıt silinmiyor/değiştirilmiyor, yalnızca ekleme yapılıyor.

-- QR Menü hizmeti henüz yoktu, ekleniyor
insert into services (name, slug, category, active, display_order)
values ('QR Menü', 'qr-menu', 'Dijital', true, 13)
on conflict (slug) do nothing;

-- ─────────────────────────── SOSYAL MEDYA PAKETLERİ ───────────────────────────
insert into packages (service_id, name, price, active, display_order)
select id, 'Başlangıç', 3000, true, 1 from services where slug = 'sosyal-medya'
on conflict (service_id, name) do nothing;
insert into packages (service_id, name, price, active, display_order)
select id, 'Büyüme', 10000, true, 2 from services where slug = 'sosyal-medya'
on conflict (service_id, name) do nothing;
insert into packages (service_id, name, price, active, display_order)
select id, 'Profesyonel', 25000, true, 3 from services where slug = 'sosyal-medya'
on conflict (service_id, name) do nothing;

-- ─────────────────────────── QR MENÜ PAKETLERİ ───────────────────────────
insert into packages (service_id, name, price, active, display_order)
select id, 'Standart', 2500, true, 1 from services where slug = 'qr-menu'
on conflict (service_id, name) do nothing;
insert into packages (service_id, name, price, active, display_order)
select id, 'Gelişmiş', 5000, true, 2 from services where slug = 'qr-menu'
on conflict (service_id, name) do nothing;
insert into packages (service_id, name, price, active, display_order)
select id, 'Premium', 7500, true, 3 from services where slug = 'qr-menu'
on conflict (service_id, name) do nothing;

-- ─────────────────────────── LOGO (Marka Tasarımı altında) ───────────────────────────
insert into packages (service_id, name, price, active, display_order)
select id, 'Logo Tasarımı', 499, true, 1 from services where slug = 'marka-tasarimi'
on conflict (service_id, name) do nothing;

-- ─────────────────────────── REKLAM YÖNETİMİ PAKETLERİ ───────────────────────────
insert into packages (service_id, name, price, active, display_order)
select id, 'Başlangıç', 45000, true, 1 from services where slug = 'reklam-yonetimi'
on conflict (service_id, name) do nothing;
insert into packages (service_id, name, price, active, display_order)
select id, 'Büyüme', 78000, true, 2 from services where slug = 'reklam-yonetimi'
on conflict (service_id, name) do nothing;
insert into packages (service_id, name, price, active, display_order)
select id, 'Profesyonel', 120000, true, 3 from services where slug = 'reklam-yonetimi'
on conflict (service_id, name) do nothing;

-- ─────────────────────────── HAYB DATA SERVICE PAKETİ ───────────────────────────
insert into packages (service_id, name, price, active, display_order)
select id, 'Standart', 10000, true, 1 from services where slug = 'hayb-data-service'
on conflict (service_id, name) do nothing;

-- ─────────────────────────── KOMİSYON KURALLARI (paket bazlı, yüzdelik) ───────────────────────────
-- Web Sitesi
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Web Sitesi - Starter', id, 'percentage', 20.00, true from packages where name = 'Starter' and service_id = (select id from services where slug = 'web-sitesi');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Web Sitesi - Business', id, 'percentage', 25.00, true from packages where name = 'Business' and service_id = (select id from services where slug = 'web-sitesi');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Web Sitesi - Professional', id, 'percentage', 23.33, true from packages where name = 'Professional' and service_id = (select id from services where slug = 'web-sitesi');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Web Sitesi - Premium', id, 'percentage', 20.00, true from packages where name = 'Premium' and service_id = (select id from services where slug = 'web-sitesi');

-- E-Ticaret
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'E-Ticaret - Start', id, 'percentage', 16.50, true from packages where name = 'E-Ticaret Start';
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'E-Ticaret - Growth', id, 'percentage', 14.00, true from packages where name = 'E-Ticaret Growth';
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'E-Ticaret - Elite', id, 'percentage', 13.00, true from packages where name = 'E-Ticaret Elite';

-- Sosyal Medya
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Sosyal Medya - Başlangıç', id, 'percentage', 10.00, true from packages where name = 'Başlangıç' and service_id = (select id from services where slug = 'sosyal-medya');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Sosyal Medya - Büyüme', id, 'percentage', 14.00, true from packages where name = 'Büyüme' and service_id = (select id from services where slug = 'sosyal-medya');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Sosyal Medya - Profesyonel', id, 'percentage', 17.00, true from packages where name = 'Profesyonel' and service_id = (select id from services where slug = 'sosyal-medya');

-- QR Menü (hepsi %10)
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'QR Menü - Standart', id, 'percentage', 10.00, true from packages where name = 'Standart' and service_id = (select id from services where slug = 'qr-menu');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'QR Menü - Gelişmiş', id, 'percentage', 10.00, true from packages where name = 'Gelişmiş' and service_id = (select id from services where slug = 'qr-menu');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'QR Menü - Premium', id, 'percentage', 10.00, true from packages where name = 'Premium' and service_id = (select id from services where slug = 'qr-menu');

-- Logo
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Logo Tasarımı', id, 'percentage', 30.00, true from packages where name = 'Logo Tasarımı';

-- Reklam Yönetimi
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Reklam - Başlangıç', id, 'percentage', 5.00, true from packages where name = 'Başlangıç' and service_id = (select id from services where slug = 'reklam-yonetimi');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Reklam - Büyüme', id, 'percentage', 7.00, true from packages where name = 'Büyüme' and service_id = (select id from services where slug = 'reklam-yonetimi');
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'Reklam - Profesyonel', id, 'percentage', 10.00, true from packages where name = 'Profesyonel' and service_id = (select id from services where slug = 'reklam-yonetimi');

-- HAYB Data Service
insert into commission_rules (name, package_id, commission_type, commission_value, is_active)
select 'HAYB Data Service - Standart', id, 'percentage', 30.00, true from packages where name = 'Standart' and service_id = (select id from services where slug = 'hayb-data-service');
