-- HAYB Partner Network v2 — partner sıralaması (ranking) güvenli RPC
--
-- Partner RLS gereği yalnızca kendi satışını görebilir; sıralama özelliği için
-- partner_code + agregatör (satış sayısı, tutar) döndüren, başka partnerin
-- telefon/email/IBAN gibi hassas bilgisini ASLA sızdırmayan bir fonksiyon.
-- Yalnızca onaylanmış (approved ve sonrası) ve gerçek (is_demo=false) satışlar sayılır.

create or replace function get_partner_ranking(limit_count int default 10)
returns table (partner_code text, sale_count bigint, total_amount numeric)
language sql stable security definer set search_path = public as $$
  select p.partner_code, count(s.id) as sale_count, coalesce(sum(s.amount), 0) as total_amount
  from sales s
  join partners p on p.id = s.partner_id
  where s.is_demo = false
    and s.sale_status in ('approved', 'payment_pending', 'paid', 'project_started', 'in_progress', 'completed')
  group by p.partner_code
  order by sale_count desc, total_amount desc
  limit limit_count;
$$;

-- Supabase, public şemadaki fonksiyonlara varsayılan olarak anon/authenticated'e
-- EXECUTE veriyor (default privileges); "from public" bunu kaldırmaz, anon'dan
-- açıkça geri alınması gerekir.
revoke all on function get_partner_ranking(int) from public;
revoke execute on function get_partner_ranking(int) from anon;
grant execute on function get_partner_ranking(int) to authenticated;
