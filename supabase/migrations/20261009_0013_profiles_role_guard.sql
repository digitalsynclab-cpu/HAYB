-- Güvenlik: kullanıcıların kendi profillerinde rol yükseltmesini engeller.
-- profiles_update_own / profiles_insert_own politikaları satır bazlıdır; kolon kısıtı yoktur.
-- Bu trigger, admin olmayan oturum açmış kullanıcının rol atamasını/değiştirmesini engeller.
-- Service role ve DB içi işlemler (auth.uid() null) etkilenmez.

create or replace function guard_profile_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or is_admin() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.role := 'user';
  elsif new.role is distinct from old.role then
    raise exception 'Rol değiştirme yetkiniz yok.' using errcode = '42501';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_role_guard on profiles;
create trigger profiles_role_guard
  before insert or update on profiles
  for each row execute function guard_profile_role();
