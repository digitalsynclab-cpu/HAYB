-- HAYB Partner Network v2 — demo/test veri izolasyonu
--
-- Demo partnerler ve onlara bağlı kayıtlar is_demo=true ile işaretlenir.
-- Production KPI/ranking sorguları bu kayıtları hariç tutmalıdır (uygulama katmanında filtrelenir).
-- Gerçek kayıtlar her zaman is_demo=false (default) kalır; bu migration mevcut hiçbir satırı değiştirmez.

alter table partners add column is_demo boolean not null default false;
alter table leads add column is_demo boolean not null default false;
alter table sales add column is_demo boolean not null default false;
alter table commissions add column is_demo boolean not null default false;
alter table notifications add column is_demo boolean not null default false;

create index partners_is_demo_idx on partners (is_demo);
create index leads_is_demo_idx on leads (is_demo);
create index sales_is_demo_idx on sales (is_demo);
create index commissions_is_demo_idx on commissions (is_demo);
