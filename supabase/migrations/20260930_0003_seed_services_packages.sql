-- Mevcut data/services.ts ve data/pricing.ts içeriğinden gerçek hizmet/paket verisi (fake data değil).
insert into services (name, slug, description, category, display_order) values
  ('Web Sitesi', 'web-sitesi', 'Markanıza özel, modern ve kullanıcı dostu web siteleri.', 'Web', 1),
  ('E-Ticaret', 'e-ticaret', 'Uçtan uca online mağaza kurulumu.', 'Web', 2),
  ('Özel Yazılım', 'ozel-yazilim', 'Şablona sığmayan iş süreçleri için özel çözüm.', 'Yazılım', 3),
  ('Yönetim Paneli', 'yonetim-paneli', 'Verilerinizi tek yerden yönetin ve raporlayın.', 'Yazılım', 4),
  ('UI/UX Tasarım', 'ui-ux', 'Kullanıcı odaklı arayüz ve deneyim tasarımı.', 'Tasarım', 5),
  ('Mobil Uygulama', 'mobil-uygulama', 'iOS ve Android için mobil uygulama geliştirme.', 'Mobil', 6),
  ('Mobil Oyun', 'mobil-oyun', 'iOS ve Android için mobil oyun geliştirme.', 'Mobil', 7),
  ('Yapay Zeka', 'yapay-zeka', 'Sohbet asistanı, otomasyon ve veri işleme çözümleri.', 'Yazılım', 8),
  ('Sosyal Medya', 'sosyal-medya', 'Marka diline uygun sosyal medya içerik tasarımı.', 'Tasarım', 9),
  ('Marka Tasarımı', 'marka-tasarimi', 'Logo, renk sistemi ve marka rehberi.', 'Tasarım', 10),
  ('Google & Meta Reklamları', 'reklam-yonetimi', 'Reklam hesabı kurulumu, yönetimi ve optimizasyonu.', 'Diğer', 11),
  ('HAYB Data Service', 'hayb-data-service', 'Sektöre göre işletme verisi toplama ve Excel çıktısı.', 'Diğer', 12)
on conflict (slug) do nothing;

alter table packages add constraint packages_service_id_name_key unique (service_id, name);

insert into packages (service_id, name, description, price, currency, display_order)
select s.id, p.name, null, p.price, 'TRY', p.display_order
from services s
join (values
  ('web-sitesi', 'Starter', 5000, 1),
  ('web-sitesi', 'Business', 10000, 2),
  ('web-sitesi', 'Professional', 15000, 3),
  ('web-sitesi', 'Premium', 20000, 4),
  ('e-ticaret', 'E-Ticaret Start', 39990, 1),
  ('e-ticaret', 'E-Ticaret Growth', 59990, 2),
  ('e-ticaret', 'E-Ticaret Elite', 89990, 3)
) as p(slug, name, price, display_order) on p.slug = s.slug
on conflict (service_id, name) do nothing;
