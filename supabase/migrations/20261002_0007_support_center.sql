-- HAYB Partner Network v2 — destek merkezi (support_tickets + support_messages)
-- Partner yalnızca kendi ticket'larını görür/oluşturur; admin tümünü görür/yönetir.

create type support_status as enum ('open', 'in_progress', 'waiting_partner', 'resolved', 'closed');

create table support_tickets (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners (id) on delete cascade,
  subject text not null,
  status support_status not null default 'open',
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index support_tickets_partner_id_idx on support_tickets (partner_id);
create index support_tickets_status_idx on support_tickets (status);

create table support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references support_tickets (id) on delete cascade,
  author_id uuid not null references profiles (id),
  author_role text not null check (author_role in ('admin', 'partner')),
  message text not null,
  created_at timestamptz not null default now()
);
create index support_messages_ticket_id_idx on support_messages (ticket_id);

create trigger set_updated_at before update on support_tickets for each row execute function set_updated_at();

alter table support_tickets enable row level security;
alter table support_messages enable row level security;

create policy support_tickets_select on support_tickets for select
  using (partner_id = current_partner_id() or is_admin());
create policy support_tickets_partner_insert on support_tickets for insert
  with check (partner_id = current_partner_id());
create policy support_tickets_admin_update on support_tickets for update using (is_admin());

create policy support_messages_select on support_messages for select
  using (is_admin() or exists (select 1 from support_tickets t where t.id = ticket_id and t.partner_id = current_partner_id()));
create policy support_messages_insert on support_messages for insert
  with check (
    is_admin()
    or exists (select 1 from support_tickets t where t.id = ticket_id and t.partner_id = current_partner_id())
  );
