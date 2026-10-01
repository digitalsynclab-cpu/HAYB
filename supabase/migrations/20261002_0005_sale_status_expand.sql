-- HAYB Partner Network v2 — sale_status genişletmesi + partner "satış oluştur" yetkisi
--
-- Eski sale_status: pending, confirmed, cancelled, refunded, completed
-- Yeni sale_status: draft, submitted, reviewing, information_required, approved,
--                    payment_pending, paid, project_started, in_progress, completed,
--                    rejected, cancelled, refunded
--
-- Mapping (mevcut kayıtlar): pending->submitted, confirmed->approved,
-- completed->completed, cancelled->cancelled, refunded->refunded.
-- Postgres enum'dan değer silinemediği için tip yeniden oluşturulup veri korunarak taşınıyor.

create type sale_status_v2 as enum (
  'draft', 'submitted', 'reviewing', 'information_required', 'approved',
  'payment_pending', 'paid', 'project_started', 'in_progress', 'completed',
  'rejected', 'cancelled', 'refunded'
);

alter table sales alter column sale_status drop default;
alter table sale_status_history alter column previous_status drop default;
alter table sale_status_history alter column new_status drop default;

alter table sales
  alter column sale_status type sale_status_v2
  using (
    case sale_status::text
      when 'pending' then 'submitted'
      when 'confirmed' then 'approved'
      when 'completed' then 'completed'
      when 'cancelled' then 'cancelled'
      when 'refunded' then 'refunded'
      else 'submitted'
    end
  )::sale_status_v2;

alter table sale_status_history
  alter column previous_status type sale_status_v2
  using (
    case previous_status::text
      when 'pending' then 'submitted'
      when 'confirmed' then 'approved'
      when 'completed' then 'completed'
      when 'cancelled' then 'cancelled'
      when 'refunded' then 'refunded'
      else null
    end
  )::sale_status_v2;

alter table sale_status_history
  alter column new_status type sale_status_v2
  using (
    case new_status::text
      when 'pending' then 'submitted'
      when 'confirmed' then 'approved'
      when 'completed' then 'completed'
      when 'cancelled' then 'cancelled'
      when 'refunded' then 'refunded'
      else 'submitted'
    end
  )::sale_status_v2;

alter table sales alter column sale_status set default 'draft';

drop type sale_status;
alter type sale_status_v2 rename to sale_status;

-- Satışın hangi kanaldan girildiğini ayırt eder: admin (telefon/offline satış) vs partner (öz satış).
-- Mevcut tüm kayıtlar admin tarafından girildiği için varsayılan 'admin'.
alter table sales add column created_by_role text not null default 'admin'
  check (created_by_role in ('admin', 'partner'));

-- ─────────────────────────── PARTNER SATIŞ OLUŞTURMA RLS ───────────────────────────
-- Partner yalnızca kendi satışını draft/submitted durumunda oluşturabilir ve
-- yalnızca draft/information_required durumundayken güncelleyip tekrar submitted'e taşıyabilir.
-- approved/payment_pending/paid/project_started/in_progress/completed/rejected gibi kritik
-- durumlara geçiş yalnızca admin'e açık (mevcut sales_admin_update politikası).
create policy sales_partner_insert on sales for insert
  with check (
    partner_id = current_partner_id()
    and created_by_role = 'partner'
    and sale_status in ('draft', 'submitted')
  );

create policy sales_partner_update on sales for update
  using (
    partner_id = current_partner_id()
    and created_by_role = 'partner'
    and sale_status in ('draft', 'information_required')
  )
  with check (
    partner_id = current_partner_id()
    and created_by_role = 'partner'
    and sale_status in ('draft', 'submitted')
  );
