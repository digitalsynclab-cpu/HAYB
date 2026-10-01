-- HAYB Partner Network v2 — Satış Rehberi (hazır satış cümleleri/itiraz yanıtları)
-- Admin yazar/düzenler, tüm aktif partnerler görüntüleyip kopyalayabilir.

create table sales_scripts (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  content text not null,
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index sales_scripts_category_idx on sales_scripts (category);

create trigger set_updated_at before update on sales_scripts for each row execute function set_updated_at();

alter table sales_scripts enable row level security;

create policy sales_scripts_partner_select on sales_scripts for select using (active = true or is_admin());
create policy sales_scripts_admin_write on sales_scripts for insert with check (is_admin());
create policy sales_scripts_admin_update on sales_scripts for update using (is_admin());
create policy sales_scripts_admin_delete on sales_scripts for delete using (is_admin());
