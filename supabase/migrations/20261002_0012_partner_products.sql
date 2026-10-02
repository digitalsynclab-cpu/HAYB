-- HAYB Partner Network v2.3 — Partner'a özel ürünler (Partner Start / Partner Premium)
--
-- Bilinçli olarak services/packages tablosundan AYRI tutulur: oradaki kayıtlar partner'ın
-- müşteriye sattığı katalog ve commission_rules'a bağlı. Buradaki ürünler partner'ın kendisi
-- için satın aldığı ürünler — komisyon motoruna hiç girmemeli, bu yüzden sales tablosu da
-- kullanılmıyor. Durum için mevcut sale_status enum'u (yeni enum yaratmadan) yeniden kullanılıyor.

create table partner_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('partner-start', 'partner-premium')),
  name text not null,
  tagline text not null,
  price numeric(12, 2) not null check (price >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on partner_products for each row execute function set_updated_at();

create table partner_product_orders (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  product_slug text not null references partner_products (slug),
  product_name text not null,
  price numeric(12, 2) not null,
  form_data jsonb not null default '{}'::jsonb,
  status sale_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index partner_product_orders_partner_id_idx on partner_product_orders (partner_id);
create trigger set_updated_at before update on partner_product_orders for each row execute function set_updated_at();

alter table partner_products enable row level security;
alter table partner_product_orders enable row level security;

-- Yalnızca aktif partnerler (ve admin) görebilir — public/anon'a kapalı.
create policy partner_products_select on partner_products for select
  using (
    is_admin()
    or (is_active = true and exists (select 1 from partners p where p.profile_id = auth.uid() and p.status = 'active'))
  );
create policy partner_products_admin_write on partner_products for insert with check (is_admin());
create policy partner_products_admin_update on partner_products for update using (is_admin());

create policy partner_product_orders_select on partner_product_orders for select
  using (is_admin() or partner_id = current_partner_id());
create policy partner_product_orders_partner_insert on partner_product_orders for insert
  with check (
    partner_id = current_partner_id()
    and exists (select 1 from partners p where p.id = partner_id and p.status = 'active')
  );
create policy partner_product_orders_admin_update on partner_product_orders for update using (is_admin());

insert into partner_products (slug, name, tagline, price) values
  ('partner-start', 'Partner Start', 'Kendi web siteni oluştur.', 4999),
  ('partner-premium', 'Partner Premium', 'Kendi dijital markanı oluştur.', 14999);
