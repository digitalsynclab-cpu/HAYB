-- Admin girişi için 2. faktör: e-postaya gönderilen süreli tek kullanımlık kod.
create table admin_login_otp (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  code_hash text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  attempt_count int not null default 0,
  created_at timestamptz not null default now()
);
create index admin_login_otp_profile_id_idx on admin_login_otp (profile_id);
create index admin_login_otp_expires_at_idx on admin_login_otp (expires_at);

alter table admin_login_otp enable row level security;
-- Bu tabloya yalnızca server-side (service role) erişilir; hiçbir client rolüne policy verilmez.
