-- HAYB Partner Network v2.1 — Müşteri Datası (customer datasets) modülü
--
-- Dosyalar private bir Supabase Storage bucket'ında tutulur (public değil).
-- Partner erişimi: dataset_access tablosu ile açıkça yetkilendirilmiş olmalı.
-- İndirme signed URL üzerinden yapılır, erişim audit_logs'a yazılır.

create table datasets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  sector text,
  city text,
  district text,
  record_count int,
  file_path text,
  file_name text,
  file_size bigint,
  mime_type text,
  is_active boolean not null default true,
  is_demo boolean not null default false,
  created_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index datasets_sector_idx on datasets (sector);
create index datasets_city_idx on datasets (city);
create index datasets_is_active_idx on datasets (is_active);

create trigger set_updated_at before update on datasets for each row execute function set_updated_at();

-- Hangi partnerin hangi dataset'e erişimi var. Admin açıkça yetkilendirir.
create table dataset_access (
  id uuid primary key default gen_random_uuid(),
  dataset_id uuid not null references datasets (id) on delete cascade,
  partner_id uuid not null references partners (id) on delete cascade,
  granted_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  unique (dataset_id, partner_id)
);
create index dataset_access_partner_id_idx on dataset_access (partner_id);

alter table datasets enable row level security;
alter table dataset_access enable row level security;

-- Partner yalnızca kendisine açıkça yetki verilmiş, aktif dataset'leri görür. Admin tümünü görür/yönetir.
create policy datasets_select on datasets for select
  using (
    is_admin()
    or (is_active = true and exists (select 1 from dataset_access da where da.dataset_id = datasets.id and da.partner_id = current_partner_id()))
  );
create policy datasets_admin_write on datasets for insert with check (is_admin());
create policy datasets_admin_update on datasets for update using (is_admin());
create policy datasets_admin_delete on datasets for delete using (is_admin());

create policy dataset_access_select on dataset_access for select
  using (is_admin() or partner_id = current_partner_id());
create policy dataset_access_admin_write on dataset_access for insert with check (is_admin());
create policy dataset_access_admin_delete on dataset_access for delete using (is_admin());

-- ─────────────────────────── PRIVATE STORAGE BUCKET ───────────────────────────
insert into storage.buckets (id, name, public)
values ('customer-datasets', 'customer-datasets', false)
on conflict (id) do nothing;

-- Yalnızca admin (service role zaten RLS'yi bypass eder) storage.objects üzerinden
-- bu bucket'a yazabilir/okuyabilir; partnerler yalnızca server-side signed URL ile indirir.
create policy customer_datasets_admin_all on storage.objects for all
  using (bucket_id = 'customer-datasets' and is_admin())
  with check (bucket_id = 'customer-datasets' and is_admin());
