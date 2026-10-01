-- Partner komisyon ödemeleri için banka bilgisi: yalnızca onaylanmış partnerler kendi IBAN/hesap
-- sahibi bilgisini partner panelinden girebilir (RLS'siz, server action + admin client ile kontrollü).
alter table partners add column iban text;
alter table partners add column account_holder_name text;
