-- HAYB Partner Network — initial schema (MVP)
-- Enums, tables, indexes, RLS. Commission rates/rules are NEVER hardcoded here —
-- commission_rules rows are created later by the admin via the admin panel.

-- ─────────────────────────── EXTENSIONS ───────────────────────────
create extension if not exists pgcrypto;

-- ─────────────────────────── ENUMS ───────────────────────────
create type user_role as enum ('admin', 'reviewer', 'partner', 'user');
create type partner_status as enum ('pending', 'active', 'suspended', 'inactive', 'rejected');
create type application_status as enum ('pending', 'reviewing', 'interview', 'approved', 'rejected', 'cancelled');
create type lead_status as enum ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'cancelled', 'duplicate');
create type sale_status as enum ('pending', 'confirmed', 'cancelled', 'refunded', 'completed');
create type payment_status as enum ('unpaid', 'partial', 'paid', 'refunded');
create type commission_status as enum ('pending', 'calculated', 'approved', 'payable', 'paid', 'cancelled', 'reversed');
create type commission_type as enum ('percentage', 'fixed');

-- ─────────────────────────── PROFILES ───────────────────────────
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text not null,
  phone text,
  role user_role not null default 'user',
  avatar_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_role_idx on profiles (role);
create index profiles_email_idx on profiles (email);

-- ─────────────────────────── PARTNER APPLICATIONS ───────────────────────────
create table partner_applications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  status application_status not null default 'pending',
  application_data jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles (id),
  decision_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index partner_applications_profile_id_idx on partner_applications (profile_id);
create index partner_applications_status_idx on partner_applications (status);
create index partner_applications_created_at_idx on partner_applications (created_at);

create table application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references partner_applications (id) on delete cascade,
  previous_status application_status,
  new_status application_status not null,
  changed_by uuid references profiles (id),
  note text,
  created_at timestamptz not null default now()
);
create index application_status_history_application_id_idx on application_status_history (application_id);

create table partner_notes (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid,
  application_id uuid references partner_applications (id) on delete cascade,
  author_id uuid references profiles (id),
  note text not null,
  created_at timestamptz not null default now()
);

-- ─────────────────────────── PARTNERS ───────────────────────────
create table partners (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles (id) on delete cascade,
  application_id uuid references partner_applications (id),
  partner_code text not null unique,
  status partner_status not null default 'pending',
  approved_at timestamptz,
  approved_by uuid references profiles (id),
  suspended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index partners_status_idx on partners (status);
create index partners_partner_code_idx on partners (partner_code);

alter table partner_notes
  add constraint partner_notes_partner_id_fkey foreign key (partner_id) references partners (id) on delete cascade;
create index partner_notes_partner_id_idx on partner_notes (partner_id);

-- ─────────────────────────── SERVICES & PACKAGES ───────────────────────────
create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category text,
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services (id) on delete cascade,
  name text not null,
  description text,
  price numeric(12, 2),
  currency text not null default 'TRY',
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index packages_service_id_idx on packages (service_id);

-- ─────────────────────────── COMMISSION RULES (configurable, no hardcoded rates) ───────────────────────────
-- percentage rules must be 0–100; fixed rules just need to be >= 0
create or replace function percentage_value_in_range(t commission_type, v numeric)
returns boolean language sql immutable as $$
  select case when t = 'percentage' then v >= 0 and v <= 100 else v >= 0 end;
$$;

create table commission_rules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  service_id uuid references services (id) on delete cascade,
  package_id uuid references packages (id) on delete cascade,
  partner_id uuid references partners (id) on delete cascade,
  commission_type commission_type not null,
  commission_value numeric(12, 4) not null check (commission_value >= 0),
  minimum_sale_amount numeric(12, 2),
  maximum_sale_amount numeric(12, 2),
  start_date date,
  end_date date,
  is_active boolean not null default true,
  created_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    percentage_value_in_range(commission_type, commission_value)
  )
);

create index commission_rules_service_id_idx on commission_rules (service_id);
create index commission_rules_package_id_idx on commission_rules (package_id);
create index commission_rules_partner_id_idx on commission_rules (partner_id);
create index commission_rules_is_active_idx on commission_rules (is_active);

-- ─────────────────────────── LEADS ───────────────────────────
create table leads (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  company_name text,
  contact_name text not null,
  phone text not null,
  email text,
  city text,
  district text,
  sector text,
  service_id uuid references services (id),
  package_id uuid references packages (id),
  estimated_budget numeric(12, 2),
  description text,
  notes text,
  status lead_status not null default 'new',
  source text not null default 'partner',
  ref_partner_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_partner_id_idx on leads (partner_id);
create index leads_status_idx on leads (status);
create index leads_created_at_idx on leads (created_at);
create index leads_email_idx on leads (email);
create index leads_phone_idx on leads (phone);
create index leads_service_id_idx on leads (service_id);
create index leads_package_id_idx on leads (package_id);

create table lead_status_history (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads (id) on delete cascade,
  previous_status lead_status,
  new_status lead_status not null,
  changed_by uuid references profiles (id),
  created_at timestamptz not null default now()
);
create index lead_status_history_lead_id_idx on lead_status_history (lead_id);

-- ─────────────────────────── SALES ───────────────────────────
create table sales (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads (id),
  partner_id uuid not null references partners (id),
  service_id uuid not null references services (id),
  package_id uuid references packages (id),
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'TRY',
  sale_status sale_status not null default 'pending',
  payment_status payment_status not null default 'unpaid',
  sold_at timestamptz not null default now(),
  confirmed_at timestamptz,
  completed_at timestamptz,
  created_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index sales_partner_id_idx on sales (partner_id);
create index sales_lead_id_idx on sales (lead_id);
create index sales_status_idx on sales (sale_status);
create index sales_service_id_idx on sales (service_id);
create index sales_package_id_idx on sales (package_id);

create table sale_status_history (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references sales (id) on delete cascade,
  previous_status sale_status,
  new_status sale_status not null,
  changed_by uuid references profiles (id),
  created_at timestamptz not null default now()
);
create index sale_status_history_sale_id_idx on sale_status_history (sale_id);

-- ─────────────────────────── COMMISSIONS (snapshot of rule at calc time) ───────────────────────────
create table commissions (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null unique references sales (id) on delete cascade,
  partner_id uuid not null references partners (id),
  rule_id uuid references commission_rules (id),
  base_amount numeric(12, 2) not null,
  commission_type commission_type not null,
  commission_value numeric(12, 4) not null,
  commission_amount numeric(12, 2) not null check (commission_amount >= 0),
  status commission_status not null default 'pending',
  calculated_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by uuid references profiles (id),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index commissions_partner_id_idx on commissions (partner_id);
create index commissions_sale_id_idx on commissions (sale_id);
create index commissions_status_idx on commissions (status);

create table commission_status_history (
  id uuid primary key default gen_random_uuid(),
  commission_id uuid not null references commissions (id) on delete cascade,
  previous_status commission_status,
  new_status commission_status not null,
  changed_by uuid references profiles (id),
  created_at timestamptz not null default now()
);

create table commission_payments (
  id uuid primary key default gen_random_uuid(),
  commission_id uuid not null references commissions (id) on delete cascade,
  paid_at timestamptz not null default now(),
  payment_method text,
  payment_reference text,
  note text,
  created_by uuid references profiles (id),
  created_at timestamptz not null default now()
);
create index commission_payments_commission_id_idx on commission_payments (commission_id);

-- ─────────────────────────── MARKETING MATERIALS ───────────────────────────
create table marketing_materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  material_type text not null,
  content text,
  file_url text,
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────── NOTIFICATIONS ───────────────────────────
create table notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  title text not null,
  body text,
  type text not null,
  is_read boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index notifications_profile_id_idx on notifications (profile_id);
create index notifications_is_read_idx on notifications (is_read);

-- ─────────────────────────── EMAIL LOG (Resend gönderim geçmişi) ───────────────────────────
create table email_log (
  id uuid primary key default gen_random_uuid(),
  to_email text not null,
  template text not null,
  related_entity_type text,
  related_entity_id uuid,
  status text not null default 'sent',
  resend_id text,
  sent_by uuid references profiles (id),
  created_at timestamptz not null default now()
);
create index email_log_related_entity_idx on email_log (related_entity_type, related_entity_id);

-- ─────────────────────────── AUDIT LOGS ───────────────────────────
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles (id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_entity_idx on audit_logs (entity_type, entity_id);
create index audit_logs_actor_id_idx on audit_logs (actor_id);
create index audit_logs_created_at_idx on audit_logs (created_at);

-- ─────────────────────────── HELPER FUNCTIONS (used by RLS policies) ───────────────────────────
create or replace function is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function is_reviewer_or_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role in ('admin', 'reviewer')
  );
$$;

create or replace function current_partner_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from partners where profile_id = auth.uid();
$$;

-- updated_at auto-touch trigger
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  for t in
    select unnest(array[
      'profiles','partner_applications','partners','services','packages',
      'commission_rules','leads','sales','commissions','marketing_materials'
    ])
  loop
    execute format('create trigger set_updated_at before update on %I for each row execute function set_updated_at();', t);
  end loop;
end $$;

-- ─────────────────────────── RLS ───────────────────────────
alter table profiles enable row level security;
alter table partner_applications enable row level security;
alter table application_status_history enable row level security;
alter table partner_notes enable row level security;
alter table partners enable row level security;
alter table services enable row level security;
alter table packages enable row level security;
alter table commission_rules enable row level security;
alter table leads enable row level security;
alter table lead_status_history enable row level security;
alter table sales enable row level security;
alter table sale_status_history enable row level security;
alter table commissions enable row level security;
alter table commission_status_history enable row level security;
alter table commission_payments enable row level security;
alter table marketing_materials enable row level security;
alter table notifications enable row level security;
alter table email_log enable row level security;
alter table audit_logs enable row level security;

-- profiles: kendi profilini görür/günceller; admin hepsini görür
create policy profiles_select_own on profiles for select using (id = auth.uid() or is_admin());
create policy profiles_update_own on profiles for update using (id = auth.uid() or is_admin());
create policy profiles_insert_own on profiles for insert with check (id = auth.uid());

-- partner_applications: sahibi + reviewer/admin
create policy partner_applications_select on partner_applications for select
  using (profile_id = auth.uid() or is_reviewer_or_admin());
create policy partner_applications_insert on partner_applications for insert
  with check (profile_id = auth.uid());
create policy partner_applications_update on partner_applications for update
  using (is_reviewer_or_admin());

create policy application_status_history_select on application_status_history for select
  using (is_reviewer_or_admin() or exists (
    select 1 from partner_applications a where a.id = application_id and a.profile_id = auth.uid()
  ));
create policy application_status_history_insert on application_status_history for insert
  with check (is_reviewer_or_admin());

create policy partner_notes_all on partner_notes for all
  using (is_reviewer_or_admin()) with check (is_reviewer_or_admin());

-- partners: sahibi kendi kaydını görür; admin hepsini görür/yönetir
create policy partners_select on partners for select
  using (profile_id = auth.uid() or is_admin());
create policy partners_admin_write on partners for all
  using (is_admin()) with check (is_admin());

-- services/packages: herkes aktif olanları görebilir (public site + partner panel), admin yazar
create policy services_public_select on services for select using (active = true or is_admin());
create policy services_admin_write on services for insert with check (is_admin());
create policy services_admin_update on services for update using (is_admin());
create policy services_admin_delete on services for delete using (is_admin());

create policy packages_public_select on packages for select using (active = true or is_admin());
create policy packages_admin_write on packages for insert with check (is_admin());
create policy packages_admin_update on packages for update using (is_admin());
create policy packages_admin_delete on packages for delete using (is_admin());

-- commission_rules: sadece admin görür/yönetir (partner kendi görünür kazancını commissions tablosundan görür)
create policy commission_rules_admin_all on commission_rules for all
  using (is_admin()) with check (is_admin());

-- leads: partner sadece kendi lead'lerini görür/oluşturur/günceller; admin hepsini görür
create policy leads_select on leads for select
  using (partner_id = current_partner_id() or is_admin());
create policy leads_insert on leads for insert
  with check (partner_id = current_partner_id());
create policy leads_update on leads for update
  using (partner_id = current_partner_id() or is_admin());

create policy lead_status_history_select on lead_status_history for select
  using (is_admin() or exists (select 1 from leads l where l.id = lead_id and l.partner_id = current_partner_id()));
create policy lead_status_history_insert on lead_status_history for insert
  with check (is_admin() or exists (select 1 from leads l where l.id = lead_id and l.partner_id = current_partner_id()));

-- sales: partner sadece kendi satışlarını görür (yazamaz); admin/server yönetir
create policy sales_select on sales for select
  using (partner_id = current_partner_id() or is_admin());
create policy sales_admin_write on sales for insert with check (is_admin());
create policy sales_admin_update on sales for update using (is_admin());

create policy sale_status_history_select on sale_status_history for select
  using (is_admin() or exists (select 1 from sales s where s.id = sale_id and s.partner_id = current_partner_id()));
create policy sale_status_history_admin_insert on sale_status_history for insert with check (is_admin());

-- commissions: partner sadece kendi komisyonunu görür (yazamaz); admin yönetir
create policy commissions_select on commissions for select
  using (partner_id = current_partner_id() or is_admin());
create policy commissions_admin_write on commissions for insert with check (is_admin());
create policy commissions_admin_update on commissions for update using (is_admin());

create policy commission_status_history_select on commission_status_history for select
  using (is_admin() or exists (select 1 from commissions c where c.id = commission_id and c.partner_id = current_partner_id()));
create policy commission_status_history_admin_insert on commission_status_history for insert with check (is_admin());

create policy commission_payments_select on commission_payments for select
  using (is_admin() or exists (select 1 from commissions c where c.id = commission_id and c.partner_id = current_partner_id()));
create policy commission_payments_admin_write on commission_payments for insert with check (is_admin());

-- marketing_materials: aktif olanları her partner görebilir; admin yönetir
create policy marketing_materials_partner_select on marketing_materials for select
  using (active = true or is_admin());
create policy marketing_materials_admin_write on marketing_materials for insert with check (is_admin());
create policy marketing_materials_admin_update on marketing_materials for update using (is_admin());
create policy marketing_materials_admin_delete on marketing_materials for delete using (is_admin());

-- notifications: sahibi görür/okundu işaretler; admin/server oluşturur
create policy notifications_select on notifications for select
  using (profile_id = auth.uid() or is_admin());
create policy notifications_update_own on notifications for update
  using (profile_id = auth.uid() or is_admin());
create policy notifications_admin_insert on notifications for insert with check (is_admin());

-- email_log: yalnızca admin
create policy email_log_admin_all on email_log for all
  using (is_admin()) with check (is_admin());

-- audit_logs: yalnızca admin okur; sistem (service role RLS bypass) yazar
create policy audit_logs_admin_select on audit_logs for select using (is_admin());
