# Requirements Document

## Introduction

HAYB, birinci tekil şahıs perspektifinden sunulan premium bir dijital ürün stüdyosu web sitesidir. Site; web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım geliştirme hizmetlerini potansiyel müşterilere sergilemek amacıyla kullanılır. Tasarım dili Stripe, Linear ve Vercel seviyesinde minimal, teknik ve premium bir estetik benimser. Site Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion ve ShadCN UI teknolojileriyle geliştirilir.

## Glossary

- **Site**: HAYB dijital ürün stüdyosu web sitesinin tamamı.
- **Ziyaretçi**: Siteyi görüntüleyen potansiyel müşteri veya ziyaretçi.
- **Hero_Bolumu**: Sayfanın ilk görünen, ana mesajı ve eylem çağrısı düğmelerini barındıran bölümü.
- **Hizmetler_Bolumu**: Sunulan hizmet kategorilerinin kart düzeninde listelendiği bölüm.
- **UI_UX_Bolumu**: UI/UX tasarım yaklaşımını ve örnek mockupları sergileyen bölüm.
- **Portfolyo_Bolumu**: Tamamlanan projelerin büyük kart yapısıyla listelendiği bölüm.
- **Referans_Bolumu**: Tasarım standardı olarak benimsenen dijital ürünlerin statik analiz kartlarıyla sunulduğu bölüm.
- **Yetenekler_Bolumu**: Uçtan uca geliştirme sürecinin 10 adımda açıklandığı bölüm.
- **Fiyatlandirma_Bolumu**: Üç fiyatlandırma paketinin listelendiği bölüm.
- **Calisma_Sureci_Bolumu**: Dört aşamalı çalışma sürecinin açıklandığı bölüm.
- **Hakkimda_Bolumu**: Geliştirici kimliğinin ve vizyonunun aktarıldığı bölüm.
- **Iletisim_Bolumu**: Proje başvuru formunun yer aldığı bölüm.
- **Footer**: Sosyal medya ve iletişim bağlantılarını barındıran alt bilgi bölümü.
- **Renk_Sistemi**: `#0B0F14` arka plan, `#111827` kart rengi, `#FF4D6D` birincil vurgu, `#FF7A59` ikincil vurgu, `#FFFFFF` metin, `#94A3B8` ikincil metin, `rgba(255,255,255,0.08)` kenarlık.
- **Grid_Kurali**: 1025px ve üstü ekranlarda 3 kolonlu grid; 641–1024px arası 2 kolon; 640px ve altında tek kolon.
- **Iletisim_Formu**: Ad Soyad, Telefon, E-Posta ve Proje Açıklaması alanlarından oluşan başvuru formu.
- **Lighthouse_Skoru**: Google Lighthouse aracı tarafından ölçülen performans, erişilebilirlik, en iyi uygulamalar ve SEO puanı.

## Requirements

### Gereksinim 1: Genel Tasarım Sistemi ve Renk Paleti

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, premium ve tutarlı bir görsel deneyim yaşamak istiyorum; böylece sitenin ciddi ve güvenilir bir stüdyoya ait olduğunu anında algılayabilirim.

#### Kabul Kriterleri

1. THE Site SHALL tüm sayfa boyunca `#0B0F14` arka plan rengini kullanır.
2. THE Site SHALL kart bileşenlerinde `#111827` arka plan rengini uygular.
3. THE Site SHALL birincil eylem düğmeleri ve vurgu öğelerinde `#FF4D6D` ile `#FF7A59` arasında linear gradient kullanır.
4. THE Site SHALL gövde metinlerinde `#FFFFFF`, ikincil ve yardımcı metinlerde `#94A3B8` rengini kullanır.
5. THE Site SHALL kenarlıklarda `rgba(255,255,255,0.08)` değerini uygular.
6. THE Site SHALL emoji, CSS blur/glow/shadow dışındaki filtre efektleri, otomatik döngüye giren animasyonlar ve stok fotoğraf içermez.
7. THE Site SHALL yalnızca Türkçe metin içerir.
8. WHEN bir birincil düğme veya vurgu öğesi hover/focus durumuna girdiğinde, THE Site SHALL 200 ms veya daha kısa sürede görsel geri bildirim (opaklık veya parlaklık değişimi) uygular.
9. THE Site SHALL h1–h3 başlıklarında font-weight 600, gövde metinlerinde font-weight 400 kullanır ve gövde font boyutu en az 16px olur.

---

### Gereksinim 2: Teknik Altyapı

**Kullanıcı Hikayesi:** Bir geliştirici olarak, modern ve sürdürülebilir bir teknoloji yığını üzerine inşa edilmiş bir site sunmak istiyorum; böylece site uzun vadede kolayca bakımını yapabilir ve genişletebilirim.

#### Kabul Kriterleri

1. THE Site SHALL Next.js 15 App Router mimarisiyle geliştirilir.
2. THE Site SHALL TypeScript ile geliştirilir; kaynak dosyalarında örtük `any` tipi kullanılmaz.
3. THE Site SHALL Tailwind CSS ile stillendirilir.
4. THE Site SHALL animasyonlar için Framer Motion kütüphanesini kullanır.
5. THE Site SHALL ShadCN UI bileşen kütüphanesini temel alır.
6. THE Site SHALL her UI bileşeni, işlevsel ve görsel olarak bağımsız, tek bir dosyada tanımlı olacak şekilde yapılandırılır.
7. WHILE ekran genişliği 640px veya altındayken, THE Site SHALL tüm etkileşimli öğeleri (düğmeler, bağlantılar, form alanları) en az 44×44px dokunma hedefi boyutunda gösterir.
8. WHEN Google Lighthouse testi mobil modda çalıştırıldığında, THE Site SHALL performans, erişilebilirlik, en iyi uygulamalar ve SEO kategorilerinin her birinde en az 95 puan alır.
9. THE Site SHALL SEO uyumlu meta etiketleri ve Open Graph etiketlerini (og:title, og:description, og:image) eksiksiz biçimde içerir.
10. THE Site SHALL sayfa içi başlık hiyerarşisini doğru kullanır: bir adet H1, bölüm başlıkları için H2, alt başlıklar için H3.

---

### Gereksinim 3: Duyarlı Izgara Sistemi (Responsive Grid)

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, hangi cihazdan girersem gireyim düzgün ve okunabilir bir sayfa görüntülemek istiyorum; böylece içeriklere rahatça ulaşabilirim.

#### Kabul Kriterleri

1. WHILE ekran genişliği 1025px veya daha fazlayken, THE Site SHALL çok kolonlu içerik alanlarında 3 kolonlu grid düzenini uygular.
2. WHILE ekran genişliği 641px ile 1024px arasındayken (1024px dahil), THE Site SHALL çok kolonlu içerik alanlarında 2 kolonlu grid düzenini uygular.
3. WHILE ekran genişliği 640px veya daha azken, THE Site SHALL tüm içerik alanlarında tek kolonlu düzeni uygular.
4. WHILE ekran genişliği 640px veya daha azken, THE Site SHALL yatay scroll (overflow-x) oluşturmaz ve öğeler birbiriyle çakışmaz.

---

### Gereksinim 4: Hero Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sayfaya girdiğimde anında ne yapıldığını anlayan ve harekete geçmek isteyen bir ilk izlenim yaşamak istiyorum; böylece doğru adreste olduğumu hissedebilirim.

#### Kabul Kriterleri

1. THE Hero_Bolumu SHALL "Fikirleri Gerçek Dijital Ürünlere Dönüştürüyorum" başlığını H1 etiketi olarak gösterir.
2. THE Hero_Bolumu SHALL "Web sistemleri, mobil uygulamalar, yapay zeka çözümleri ve özel yazılım ürünleri geliştiriyorum." alt başlığını gösterir.
3. THE Hero_Bolumu SHALL "Projeleri İncele" ve "İletişime Geç" etiketli iki eylem düğmesi içerir.
4. WHEN "Projeleri İncele" düğmesine tıklandığında, THE Site SHALL Portfolyo_Bolumu'nun üst kenarına 400–600 ms animasyon süresiyle yumuşak kaydırma ile gider.
5. WHEN "İletişime Geç" düğmesine tıklandığında, THE Site SHALL Iletisim_Bolumu'nun üst kenarına 400–600 ms animasyon süresiyle yumuşak kaydırma ile gider.
6. THE Hero_Bolumu SHALL sağ tarafta mobil, laptop ve dashboard ekranlarını birleştiren bir 3D cihaz mockup görseli içerir.
7. WHILE Hero_Bolumu ekranda görünür durumdayken, THE Hero_Bolumu SHALL 3D cihaz mockupuna Framer Motion ile 0–12px dikey öteleme ve 3 saniyelik döngü süresinde sürekli yüzen (floating) animasyon uygular.
8. IF kullanıcı işletim sistemi `prefers-reduced-motion` tercihini etkinleştirmişse, THEN THE Hero_Bolumu SHALL floating animasyonu devre dışı bırakır ve mockup sabit konumda gösterilir.

---

### Gereksinim 5: Hizmetler Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sunulan hizmetleri net ve çekici bir biçimde görmek istiyorum; böylece ihtiyacıma uygun hizmetin burada verilip verilmediğini hızlıca anlayabilirim.

#### Kabul Kriterleri

1. THE Hizmetler_Bolumu SHALL aşağıdaki altı hizmet kategorisini kart düzeninde listeler: Web Geliştirme, Mobil Uygulama, Yapay Zeka Sistemleri, Özel Yazılım Çözümleri, Yönetim Panelleri, Startup MVP Geliştirme.
2. THE Hizmetler_Bolumu SHALL her hizmet kartında bir ikon, başlık ve en fazla 160 karakter kısa açıklama içerir.
3. WHEN bir hizmet kartının üzerine gelindiğinde (hover), THE Hizmetler_Bolumu SHALL 200–300 ms geçiş süresiyle kart arka plan tonunu veya gölgesini değiştirir.
4. THE Hizmetler_Bolumu SHALL Grid_Kurali'na uygun kolon düzenini kullanır.

---

### Gereksinim 6: UI/UX Tasarım ve Mockup Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, tasarım kalitesini gösteren gerçek mockuplar görmek istiyorum; böylece görsel ve kullanıcı deneyimi standartlarını değerlendirebilirim.

#### Kabul Kriterleri

1. THE UI_UX_Bolumu SHALL "UI/UX Tasarım ve Ürün Deneyimi" başlığını gösterir.
2. THE UI_UX_Bolumu SHALL mobil uygulama, web platform ve dashboard kategorilerinde her kategoride en az 2, toplamda en az 6 mockup görseli içerir; görseller en az 800×600 piksel boyutunda PNG veya SVG formatında olur.
3. THE UI_UX_Bolumu SHALL en az 2 prototip veya interaktif tasarım örneği listeler; her örnek bir başlık, en az 20 karakter açıklama ve tıklanabilir bağlantı içerir.
4. THE UI_UX_Bolumu SHALL mockup görsellerini görsel olarak ayrılmış bölümler veya etiketler (mobil ekran, web ekran, dashboard ekran) altında sunar.

---

### Gereksinim 7: Portfolyo Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, daha önce yapılan projeleri detaylı biçimde görmek istiyorum; böylece çalışma kalitesini ve çeşitliliğini değerlendirebilirim.

#### Kabul Kriterleri

1. THE Portfolyo_Bolumu SHALL her proje için en az 300px genişliğinde bir kart bileşeni gösterir.
2. THE Portfolyo_Bolumu SHALL her proje kartında mockup görseli, proje adı, kategori, en fazla 200 karakter kısa açıklama ve "İncele" düğmesi içerir.
3. THE Portfolyo_Bolumu SHALL en az şu beş projeyi listeler: Dertleş App, BebeklerSoruyor, Başkan Havlu Yönetim Sistemi, EkoTakip, Ultra AI CRM Platformu.
4. IF proje bir iç sayfaya sahipse, THEN WHEN "İncele" düğmesine tıklandığında, THE Portfolyo_Bolumu SHALL ilgili projenin iç detay sayfasına gider.
5. IF proje yalnızca harici bağlantıya sahipse, THEN WHEN "İncele" düğmesine tıklandığında, THE Portfolyo_Bolumu SHALL harici bağlantıyı yeni sekmede açar.
6. IF proje mockup görseli yüklenemezse, THEN THE Portfolyo_Bolumu SHALL görsel yerine gri renk placeholder gösterir.
7. THE Portfolyo_Bolumu SHALL Grid_Kurali'na uygun kolon düzenini kullanır.

---

### Gereksinim 8: Referans Siteler Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, hangi tasarım standartlarının benimsendiğini görmek istiyorum; böylece çalışmalar için beklenen kalite seviyesini anlayabilirim.

#### Kabul Kriterleri

1. THE Referans_Bolumu SHALL "Referans Aldığım Dijital Ürün Standartları" başlığını gösterir.
2. THE Referans_Bolumu SHALL Stripe, Linear, Vercel, Apple ve Notion markalarına ait statik analiz kartları içerir.
3. THE Referans_Bolumu SHALL her kartta ilgili markanın tasarım yaklaşımını, renk dilini, UI/UX prensibini ve kullanıcı deneyimi notunu ayrı ayrı etiketlenmiş bölümler halinde sunar; her bölüm en az 30 karakter içerir.
4. THE Referans_Bolumu SHALL yalnızca statik içerik gösterir; gerçek zamanlı veri çekme (scraping) yapmaz.

---

### Gereksinim 9: Neler Yapabilirim? (Yetenekler) Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, uçtan uca geliştirme kapasitesini görmek istiyorum; böylece tek bir paydaşla tüm ürün sürecini yönetebileceğimi anlayabilirim.

#### Kabul Kriterleri

1. THE Yetenekler_Bolumu SHALL "Bir Fikirle Geldiğinizde Uçtan Uca Ürün Geliştirme Sürecini Yönetebilirim" başlığını gösterir.
2. THE Yetenekler_Bolumu SHALL aşağıdaki 10 adımı bu sırayla listeler: (1) Fikir Analizi, (2) Ürün Stratejisi, (3) UI/UX Tasarım, (4) Frontend Geliştirme, (5) Backend Geliştirme, (6) Veritabanı Tasarımı, (7) Yapay Zeka Entegrasyonu, (8) SEO Optimizasyonu, (9) Yayınlama, (10) Bakım ve Destek.
3. THE Yetenekler_Bolumu SHALL her adımı sıra numarası (1–10) veya adımı temsil eden bir ikon ile birlikte gösterir.
4. THE Yetenekler_Bolumu SHALL tüm 10 adımı herhangi bir kullanıcı etkileşimi olmaksızın aynı anda görünür biçimde gösterir.

---

### Gereksinim 10: Fiyatlandırma Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, hizmet fiyatlarını şeffaf biçimde görmek istiyorum; böylece bütçeme uygun paketi hızlıca değerlendirebilirim.

#### Kabul Kriterleri

1. WHILE sayfa görüntülenirken, THE Fiyatlandirma_Bolumu SHALL üç fiyatlandırma paketi gösterir: Başlangıç (15.000 TL+), Kurumsal (35.000 TL+) ve Özel Yazılım (Teklif Al).
2. WHILE sayfa görüntülenirken, THE Fiyatlandirma_Bolumu SHALL Kurumsal paket kartında diğer kartlardan farklı bir kenarlık rengi ve "Önerilen" veya benzeri bir rozet gösterir.
3. WHILE sayfa görüntülenirken, THE Fiyatlandirma_Bolumu SHALL her paket kartında o pakete dahil hizmetlerin madde listesini gösterir.
4. WHILE sayfa görüntülenirken, THE Fiyatlandirma_Bolumu SHALL tüm kart stillerini Renk_Sistemi'ne uygun (`#111827` arka plan, `rgba(255,255,255,0.08)` kenarlık) biçimde uygular.
5. WHEN "Teklif Al" düğmesine tıklandığında, THE Fiyatlandirma_Bolumu SHALL Iletisim_Bolumu'nun üst kenarına animasyonlu kaydırma ile gider.

---

### Gereksinim 11: Çalışma Süreci Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, proje sürecinin nasıl işlediğini net adımlarla görmek istiyorum; böylece iş birliğinde neler bekleyeceğimi önceden bilebilirim.

#### Kabul Kriterleri

1. THE Calisma_Sureci_Bolumu SHALL dört aşamalı süreci bu sırayla sunar: (1) Analiz, (2) Planlama, (3) Geliştirme, (4) Yayına Alma; her aşama sıra numarasıyla gösterilir.
2. THE Calisma_Sureci_Bolumu SHALL her aşama için bir başlık ve en fazla 30 kelimelik kısa açıklama içerir.
3. WHILE sayfa görüntülenirken, THE Calisma_Sureci_Bolumu SHALL aşamalar arasında oklar veya bağlantı çizgileri sıralı yönde (soldan sağa veya yukarıdan aşağıya) gösterir.

---

### Gereksinim 12: Hakkımda Bölümü

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, kim olduğunu ve nasıl bir perspektifle çalıştığını anlamak istiyorum; böylece doğru kişiyle çalışıp çalışmadığımı değerlendirebilirim.

#### Kabul Kriterleri

1. WHEN Hakkimda_Bolumu sayfada görüntülendiğinde, THE Hakkimda_Bolumu SHALL "Problem Çözmeye Odaklı Yazılım Geliştirici" başlığını H2 etiketi olarak gösterir.
2. WHEN Hakkimda_Bolumu sayfada görüntülendiğinde, THE Hakkimda_Bolumu SHALL şu metni eksiksiz biçimde içerir: "Sadece web sitesi geliştirmiyorum. İşletmeler ve girişimler için dijital ürünler tasarlıyor ve geliştiriyorum. Her projeyi bir büyüme sistemi olarak ele alıyorum."
3. THE Hakkimda_Bolumu SHALL birinci tekil şahıs zamiri ("ben", "benim", "-iyorum" fiil çekimleri) kullanır ve "biz", "ekibimiz" gibi çoğul kurumsal ifadeler içermez.

---

### Gereksinim 13: İletişim Bölümü ve Formu

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, proje fikrimi kolayca iletmek istiyorum; böylece hızlıca iletişime geçip süreci başlatabilirim.

#### Kabul Kriterleri

1. THE Iletisim_Bolumu SHALL "Projeni Gerçeğe Dönüştürelim" başlığını gösterir.
2. THE Iletisim_Bolumu SHALL Ad Soyad, Telefon, E-Posta ve Proje Açıklaması alanlarını içeren bir Iletisim_Formu barındırır.
3. WHEN Iletisim_Formu herhangi bir zorunlu alan boşken gönderilmeye çalışıldığında, THE Iletisim_Formu SHALL formu göndermez ve her boş zorunlu alanın altında Türkçe hata mesajı gösterir.
4. WHEN E-Posta alanına RFC 5321 standardına uymayan bir değer girildiğinde ve form gönderilmeye çalışıldığında, THE Iletisim_Formu SHALL e-posta alanının altında "Geçersiz e-posta adresi" hata mesajını gösterir.
5. WHEN tüm alanlar geçerli biçimde doldurulduğunda ve form gönderildiğinde, THE Iletisim_Formu SHALL form alanlarının yerini alan bir başarı mesajı gösterir.
6. IF form gönderimi sırasında sunucu veya ağ hatası oluşursa, THEN THE Iletisim_Formu SHALL form alanlarını korur, kullanıcıya hata mesajı gösterir ve "Tekrar Dene" etkileşimi sunar.
7. WHEN form başarıyla gönderildiğinde, THE Iletisim_Formu SHALL gönder düğmesini 400 ms süreyle devre dışı bırakır; çift gönderimi engeller.

---

### Gereksinim 14: Footer (Alt Bilgi)

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sosyal medya ve iletişim bağlantılarına sayfanın altından kolayca ulaşmak istiyorum; böylece farklı kanallardan iletişime geçebilirim.

#### Kabul Kriterleri

1. THE Footer SHALL Instagram, LinkedIn, GitHub ve E-Posta bağlantı ikonlarını içerir; her ikon açıklayıcı `aria-label` niteliğine sahip olur.
2. THE Footer SHALL yalnızca dört bağlantı ikonu ve telif hakkı bilgisini içerir; başka içerik veya bölüm barındırmaz.
3. WHEN Instagram, LinkedIn veya GitHub ikonuna tıklandığında, THE Footer SHALL ilgili profili yeni sekmede (`target="_blank"`) açar.
4. WHEN E-Posta ikonuna tıklandığında, THE Footer SHALL `mailto:` bağlantısıyla varsayılan e-posta istemcisini aynı sekmede açar.
5. THE Footer SHALL telif hakkı bilgisini şu formatta içerir: "© [Mevcut Yıl] HAYB. Tüm hakları saklıdır."

---

### Gereksinim 15: Sayfa Navigasyonu

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sayfada gezinirken her zaman konumumu ve ana menüyü görmek istiyorum; böylece istediğim bölüme hızlıca atlamak istiyorum.

#### Kabul Kriterleri

1. WHILE sayfa herhangi bir scroll pozisyonundayken, THE Site SHALL üst navigasyon çubuğunu ekranın en üstünde sabit (sticky/fixed) olarak gösterir.
2. THE Site SHALL navigasyon çubuğunda HAYB marka logosunu veya logotype'ını içerir.
3. THE Site SHALL navigasyon çubuğunda Hizmetler, Portfolyo, Fiyatlandırma, Hakkımda ve İletişim bağlantılarını barındırır.
4. WHEN bir navigasyon bağlantısına tıklandığında, THE Site SHALL ilgili bölümün üst kenarına 400–600 ms animasyon süresiyle yumuşak kaydırma ile gider.
5. WHILE ekran genişliği 768px veya daha azken, THE Site SHALL navigasyon bağlantılarını hamburger menü ikonu arkasında gizler.
6. WHEN hamburger menü ikonuna tıklandığında, THE Site SHALL navigasyon bağlantı listesini görünür hale getirir.
7. WHEN hamburger menüde bir bağlantıya tıklandığında, THE Site SHALL menüyü kapatır ve ilgili bölüme yumuşak kaydırma yapar.
8. WHILE sayfa yukarıdan aşağıya kaydırılırken, THE Site SHALL navigasyon çubuğunun arka plan opaklığını 0'dan 1'e artıran blur/frost efekti uygular.

---

### Gereksinim 16: Animasyon ve Etkileşim Standartları

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sayfayı aşağı kaydırırken içeriklerin akıcı biçimde belirmesini ve bileşenlerle etkileşimde anlamlı geri bildirimler almak istiyorum; böylece premium bir kullanıcı deneyimi yaşayabilirim.

#### Kabul Kriterleri

1. WHEN bir sayfa bölümü görünür alana %20 oranında girdiğinde, THE Site SHALL Framer Motion ile o bölüme 300–600 ms sürede fade-in animasyonu uygular.
2. THE Site SHALL her bölüm animasyonunu yalnızca bir kez tetikler; kullanıcı ileri-geri scroll yapsa dahi animasyon tekrar çalışmaz.
3. WHEN bir düğmenin üzerine gelindiğinde (hover), THE Site SHALL düğmeye 150–200 ms geçiş süresiyle scale(1.0)→scale(1.05) ölçeklendirme efekti uygular.
4. WHEN bir kart bileşeninin üzerine gelindiğinde (hover), THE Site SHALL kart kenarlık veya arka plan opaklığını 150–200 ms sürede en az %10 değiştirir.
5. IF kullanıcı işletim sistemi `prefers-reduced-motion` tercihini etkinleştirmişse, THEN THE Site SHALL tüm Framer Motion transform/opacity animasyonlarını devre dışı bırakır ve geçişleri 0 ms olarak ayarlar.

---

### Gereksinim 17: SEO ve Meta Veri

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, arama motorlarında HAYB sitesini kolayca bulabilmek istiyorum; böylece hizmetlere organik arama yoluyla da ulaşabileyim.

#### Kabul Kriterleri

1. THE Site SHALL sayfa başlığı (title) etiketini "HAYB | Dijital Ürün Stüdyosu" olarak tanımlar.
2. THE Site SHALL açıklama meta etiketini (meta description) 155 karakter sınırını aşmayan, hizmeti özetleyen bir metin olarak tanımlar.
3. THE Site SHALL Open Graph etiketlerini (og:title, og:description, og:image) eksiksiz biçimde içerir.
4. THE Site SHALL sayfa içi başlık hiyerarşisini doğru kullanır: bir adet H1, bölüm başlıkları için H2, alt başlıklar için H3.
5. THE Site SHALL tüm görsellere açıklayıcı `alt` metin nitelikleri ekler.
6. THE Site SHALL robots.txt ve sitemap.xml dosyalarını içerir.
