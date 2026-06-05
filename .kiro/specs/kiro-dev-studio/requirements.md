# Requirements Document

## Introduction

Kiro.dev Studio, yazılım geliştirici ve ürün tasarımcısının premium kişisel portföy ve hizmet web sitesidir. Site; ziyaretçiye "Bu kişi web sitesi yapıyor" değil, "Bu kişi uçtan uca dijital ürün geliştiriyor" algısını vermelidir. Tasarım referansları olarak Stripe, Linear, Vercel ve He.com.tr gibi premium, minimal, teknik ve modern siteler esas alınacaktır. Site; Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion ve ShadCN UI teknoloji yığını üzerine inşa edilecektir.

---

## Glossary

- **Site**: Kiro.dev Studio web sitesinin tamamı
- **Sistem**: Next.js 15 App Router tabanlı frontend uygulama
- **Kullanıcı**: Siteyi ziyaret eden her türlü kişi (potansiyel müşteri, iş ortağı, recruiter)
- **Bileşen**: Bağımsız olarak geliştirilen ve test edilebilen React UI birimi
- **Hero_Bolumu**: Sitenin ilk yüklendiğinde görünen ana açılış bölümü
- **Hizmet_Karti**: Sunulan hizmetleri temsil eden tek bir kart bileşeni
- **Portfolio_Karti**: Gerçekleştirilmiş projeleri temsil eden büyük kart bileşeni
- **Mockup**: Gerçek cihaz görünümünde ürün arayüzünü gösteren görsel bileşen
- **Renk_Sistemi**: Projede kullanılan sabit renk değerleri seti
- **Router**: Next.js App Router sayfa yönlendirme sistemi
- **SEO_Metadata**: Sayfanın arama motorlarına sunduğu meta veriler (title, description, og tags)
- **Lighthouse_Skoru**: Google Lighthouse performans, erişilebilirlik, SEO ve en iyi uygulamalar skoru
- **Viewport**: Kullanıcının tarayıcısında görünen ekran alanı
- **Breakpoint**: Tasarımın değiştiği minimum genişlik sınırı (mobil: <768px, tablet: 768–1023px, masaüstü: ≥1024px)

---

## Requirements

### Requirement 1: Renk Sistemi ve Görsel Kimlik

**User Story:** As a ziyaretçi, I want tutarlı bir renk sistemi ve görsel kimlik görmek, so that sitenin profesyonelliğini ve marka kimliğini algılayabileyim.

#### Acceptance Criteria

1. THE Sistem SHALL tüm sayfa bileşenlerinde aşağıdaki renk değerlerini tutarlı biçimde uygulamalıdır: Arka Plan #0B0F14, Kartlar #111827, Ana Vurgu #FF4D6D, İkincil Vurgu #FF7A59, Metin #FFFFFF, İkincil Metin #94A3B8, Border rgba(255,255,255,0.08).
2. THE Sistem SHALL buton bileşenlerinde #FF4D6D'den #FF7A59'a doğru yatay gradient uygulamalıdır.
3. THE Sistem SHALL emoji, aşırı animasyon, kalitesiz stok görsel ve ajans diline ait ifadeler içeren herhangi bir bileşen render etmemelidir.
4. THE Sistem SHALL tüm metin içeriklerinde ciddi, net ve kısa bir dil kullanmalıdır.


---

### Requirement 2: Hero Bölümü

**User Story:** As a ziyaretçi, I want siteye girdiğimde güçlü bir ilk izlenim almak, so that Kiro.dev'in ne yaptığını saniyeler içinde anlayayım ve aksiyona geçeyim.

#### Acceptance Criteria

1. THE Hero_Bolumu SHALL "Fikirleri Gerçek Dijital Ürünlere Dönüştürüyorum" başlığını H1 etiketi ile render etmelidir.
2. THE Hero_Bolumu SHALL "Projeleri İncele" ve "İletişime Geç" etiketli iki adet CTA butonu içermelidir.
3. THE Hero_Bolumu SHALL sağ tarafta mobil, laptop ve dashboard arayüzü içeren 3D cihaz Mockup'ı render etmelidir.
4. WHILE sayfa yüklenirken, THE Mockup SHALL hafif floating animasyon (dikey eksen, maksimum 12px ötelenme, 3 saniyelik döngü) ile hareket etmelidir.
5. THE Hero_Bolumu SHALL ≥1024px viewport genişliğinde iki sütunlu layout, <1024px genişliğinde tek sütunlu layout uygulamalıdır.
6. WHEN kullanıcı "Projeleri İncele" butonuna tıklarsa, THE Sistem SHALL sayfayı portfolio bölümüne sorunsuz scroll etmelidir.
7. WHEN kullanıcı "İletişime Geç" butonuna tıklarsa, THE Sistem SHALL sayfayı iletişim bölümüne sorunsuz scroll etmelidir.

---

### Requirement 3: Hizmetler Bölümü

**User Story:** As a potansiyel müşteri, I want sunulan hizmetleri net biçimde görmek, so that ihtiyacıma uygun hizmeti hızla değerlendirebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL aşağıdaki altı Hizmet_Karti'nı render etmelidir: Web Geliştirme, Mobil Uygulama Geliştirme, Yapay Zeka Sistemleri, Özel Yazılım Çözümleri, Yönetim Panelleri, Startup MVP Geliştirme.
2. THE Hizmet_Karti SHALL arka plan rengini #111827 ve border değerini rgba(255,255,255,0.08) olarak uygulamalıdır.
3. WHEN kullanıcı bir Hizmet_Karti üzerine hover yaparsa, THE Hizmet_Karti SHALL border rengini #FF4D6D'ye geçiren ve hafif ölçek büyütme (scale 1.02) uygulayan bir geçiş animasyonu (150ms ease) göstermelidir.
4. THE Sistem SHALL ≥1024px genişlikte altı kartı üç sütunlu grid, 768–1023px arası iki sütunlu grid, <768px genişlikte tek sütunlu liste olarak düzenlemelidir.
5. THE Hizmet_Karti SHALL her hizmet için kısa ve net bir açıklama metni içermelidir; bu metin vague ifadeler ("mükemmel", "en iyi", "eşsiz") içermemelidir.


---

### Requirement 4: UI/UX Tasarım ve Ürün Deneyimi Bölümü

**User Story:** As a potansiyel müşteri, I want UI/UX tasarım kapasitesini görmek, so that teknik geliştirmenin yanı sıra tasarım hizmetini de değerlendirebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL "UI/UX Tasarım ve Ürün Deneyimi" başlığını bu bölümün H2 etiketi olarak render etmelidir.
2. THE Sistem SHALL mobil uygulama arayüzü, web platform arayüzü ve dashboard arayüzü olmak üzere en az üç adet premium Mockup görsel bileşeni render etmelidir.
3. THE Sistem SHALL kullanıcı deneyimi akışları ve prototip geliştirme yetkinliklerini liste veya kart formatında sunmalıdır.
4. THE Mockup SHALL Dribbble/Behance kalitesinde görsel gerçekçilik sağlayan cihaz çerçeveleri içinde render edilmelidir.
5. THE Sistem SHALL bu bölümde kalitesiz stok görsel veya placeholder görsel kullanmayacaktır; yalnızca özel tasarım Mockup bileşenleri kabul edilir.

---

### Requirement 5: Portfolio Bölümü

**User Story:** As a potansiyel müşteri, I want gerçekleştirilmiş projeleri incelemek, so that geliştirici kapasitesini ve çalışma kalitesini somut örneklerle doğrulayayım.

#### Acceptance Criteria

1. THE Sistem SHALL aşağıdaki beş projeyi Portfolio_Karti formatında render etmelidir: Dertleş App, BebeklerSoruyor, Başkan Havlu Yönetim Sistemi, EkoTakip, Ultra AI CRM Platformu.
2. THE Portfolio_Karti SHALL mockup görseli, proje adı, kategori etiketi, kısa açıklama (maksimum 2 cümle) ve "İncele" butonunu içermelidir.
3. THE Portfolio_Karti SHALL büyük kart yapısında render edilmelidir; kart genişliği ≥1024px viewport'ta minimum 480px olmalıdır.
4. WHEN kullanıcı "İncele" butonuna tıklarsa, THE Sistem SHALL ilgili projenin detay sayfasına veya harici bağlantısına yönlendirmelidir.
5. WHEN kullanıcı bir Portfolio_Karti üzerine hover yaparsa, THE Sistem SHALL mockup görselini hafif scale (1.03) ve overlay efektiyle vurgulamalıdır.
6. THE Sistem SHALL ≥1024px viewport'ta portfolio kartlarını iki sütunlu grid, <1024px viewport'ta tek sütun olarak düzenlemelidir.


---

### Requirement 6: Referans Siteler Bölümü

**User Story:** As a ziyaretçi, I want hangi dijital ürün standartlarından ilham alındığını görmek, so that geliştirici ve tasarımcının kalite çıtasını anlayayım.

#### Acceptance Criteria

1. THE Sistem SHALL bu bölümü "Referans Aldığım Dijital Ürün Standartları" başlığıyla render etmelidir.
2. THE Sistem SHALL Stripe, Linear, Vercel, Apple ve Notion için birer kart render etmelidir.
3. THE Sistem SHALL her kart için şu dört başlık altında içerik sunmalıdır: tasarım yaklaşımı, renk dili, UI/UX prensibi, kullanıcı deneyimi hissi.
4. THE Sistem SHALL referans kart içeriklerini gerçek ürünlerin tasarım felsefesine dayandırmalı; kurgusal veya hatalı bilgi içermemelidir.
5. THE Sistem SHALL referans kartlarda sitelerin logolarını veya marka renklerini kullanmayacaktır; yalnızca metin ve ikonografik temsillerle sınırlı kalacaktır.

---

### Requirement 7: Neler Yapabilirim Bölümü

**User Story:** As a potansiyel müşteri, I want uçtan uca geliştirme sürecini görmek, so that projemin başından sonuna kadar nasıl yönetileceğini anlayayım.

#### Acceptance Criteria

1. THE Sistem SHALL bu bölümü "Bir Fikirle Geldiğinizde Uçtan Uca Ürün Geliştirme Sürecini Yönetebilirim" başlığıyla render etmelidir.
2. THE Sistem SHALL aşağıdaki on adımı sıralı liste formatında render etmelidir: Fikir analizi, Ürün stratejisi, UI/UX tasarım, Frontend geliştirme, Backend geliştirme, Veritabanı tasarımı, Yapay zeka entegrasyonu, SEO optimizasyonu, Yayınlama, Bakım ve destek.
3. THE Sistem SHALL her adım için kısa ve net bir açıklama metni sunmalıdır.
4. THE Sistem SHALL adımları görsel olarak birbirine bağlayan bir süreç akışı (yatay veya dikey timeline) render etmelidir.
5. THE Sistem SHALL bu bölümde aşama numaralarını görsel olarak vurgulamalıdır; her numara Ana Vurgu rengi (#FF4D6D) ile ön plana çıkarılmalıdır.


---

### Requirement 8: Fiyatlandırma Bölümü

**User Story:** As a potansiyel müşteri, I want hizmet fiyatlarını açık biçimde görmek, so that bütçemi planlayıp doğru paketi seçebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL üç fiyatlandırma kartı render etmelidir: Başlangıç (15.000 TL+), Kurumsal (35.000 TL+, öne çıkarılan), Özel Yazılım (teklif al).
2. THE Sistem SHALL Kurumsal kartını diğer kartlardan görsel olarak ayırt eden bir "öne çıkarma" efekti uygulamalıdır; bu efekt Ana Vurgu (#FF4D6D) border veya rozet ile sağlanmalıdır.
3. THE Sistem SHALL her fiyatlandırma kartında paketin dahil ettiği özelliklerin listesini render etmelidir.
4. THE Sistem SHALL "Özel Yazılım" kartında fiyat yerine "Teklif Al" CTA butonu render etmelidir.
5. WHEN kullanıcı "Teklif Al" butonuna tıklarsa, THE Sistem SHALL iletişim bölümüne scroll etmelidir.
6. THE Sistem SHALL ≥1024px viewport'ta üç kartı yan yana, <1024px viewport'ta tek sütun olarak render etmelidir.

---

### Requirement 9: Çalışma Süreci Bölümü

**User Story:** As a potansiyel müşteri, I want proje geliştirme sürecinin nasıl işlediğini anlamak, so that hangi aşamalardan geçeceğimi önceden bilebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL dört aşamayı sırasıyla render etmelidir: Analiz, Planlama, Geliştirme, Yayına Alma.
2. THE Sistem SHALL her aşama için başlık, kısa açıklama ve temsili ikon içeren bir kart render etmelidir.
3. THE Sistem SHALL dört aşamayı görsel olarak birbirine bağlayan bir akış göstergesi (ok veya numaralı bağlantı çizgisi) sunmalıdır.
4. THE Sistem SHALL ≥1024px viewport'ta dört kartı yatay tek satırda, <768px viewport'ta iki sütunlu grid olarak render etmelidir.


---

### Requirement 10: Hakkımda Bölümü

**User Story:** As a ziyaretçi, I want geliştiricinin kim olduğunu ve yaklaşımını anlamak, so that çalışmak isteyip istemediğime karar verebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL bu bölümü "Problem Çözmeye Odaklı Yazılım Geliştirici" başlığıyla render etmelidir.
2. THE Sistem SHALL kısa, net ve birinci tekil şahıs olarak yazılmış bir biyografi metni render etmelidir; bu metin maksimum 4 cümle içermelidir.
3. THE Sistem SHALL biyografi metninde vague terimler ("tutkulu", "mükemmeliyetçi", "hayallerini gerçeğe taşıyan") kullanmayacaktır.
4. THE Sistem SHALL geliştiricinin temel teknoloji yetkinliklerini (minimum 6, maksimum 12 teknoloji) etiket formatında listeleyecektir.
5. THE Sistem SHALL bu bölümde profesyonel bir profil fotoğrafı veya soyut geometrik avatar render etmelidir; kalitesiz stok görsel kullanılmayacaktır.

---

### Requirement 11: İletişim Formu

**User Story:** As a potansiyel müşteri, I want projem hakkında kolayca iletişime geçmek, so that teklif almaya başlayabileyim.

#### Acceptance Criteria

1. THE Sistem SHALL bu bölümü "Projeni Gerçeğe Dönüştürelim" başlığıyla render etmelidir.
2. THE Sistem SHALL şu dört alanı içeren bir form render etmelidir: Ad Soyad (text), Telefon (tel), E-Posta (email), Proje Açıklaması (textarea).
3. WHEN kullanıcı formu eksik alanlarla göndermek isterse, THE Sistem SHALL eksik alanları vurgulayarak kullanıcıya hata mesajı göstermelidir ve formu göndermemelidir.
4. WHEN kullanıcı geçersiz e-posta formatı girerse, THE Sistem SHALL e-posta alanında "Geçerli bir e-posta adresi girin" mesajını render etmelidir.
5. WHEN kullanıcı formu eksiksiz ve geçerli verilerle gönderirse, THE Sistem SHALL form alanlarını temizlemeli ve "Mesajınız iletildi. En kısa sürede dönüş yapılacak." başarı mesajını göstermelidir.
6. THE Sistem SHALL form gönderiminde kullanıcıyı farklı bir sayfaya yönlendirmeyecektir; başarı mesajı aynı sayfada inline olarak gösterilmelidir.
7. THE Sistem SHALL telefon alanının yalnızca rakam, boşluk, +, -, (, ) karakterlerini kabul etmesini sağlayacaktır.


---

### Requirement 12: Footer

**User Story:** As a ziyaretçi, I want sitenin altında sosyal medya ve iletişim bağlantılarına kolayca erişmek, so that tercih ettiğim kanaldan iletişime geçebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL footer'da şu dört bağlantıyı ikonla birlikte render etmelidir: Instagram, LinkedIn, GitHub, E-Mail.
2. WHEN kullanıcı bir sosyal medya ikonuna tıklarsa, THE Sistem SHALL bağlantıyı yeni sekmede açmalıdır.
3. WHEN kullanıcı E-Mail ikonuna tıklarsa, THE Sistem SHALL kullanıcının varsayılan e-posta istemcisini `mailto:` protokolüyle açmalıdır.
4. THE Sistem SHALL footer'da telif hakkı bildirimi ve Kiro.dev markasını render etmelidir.
5. THE Sistem SHALL footer'ı minimal tutacaktır; içerik hiyerarşik menü, karmaşık alt sütun yapısı veya ek reklam alanı içermeyecektir.

---

### Requirement 13: Navigasyon

**User Story:** As a ziyaretçi, I want sitenin herhangi bir noktasından tüm bölümlere hızla ulaşmak, so that sayfa içinde kaybolmadan istediğim bölüme geçebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL sayfanın üstünde sticky (scroll ile sabit kalan) bir navigasyon çubuğu render etmelidir.
2. THE Sistem SHALL navigasyon çubuğunda logo ve şu bölüm linkleri olmalıdır: Hizmetler, Portfolio, Hakkımda, İletişim.
3. WHEN kullanıcı bir navigasyon bağlantısına tıklarsa, THE Sistem SHALL ilgili bölüme smooth scroll ile gidecektir.
4. THE Sistem SHALL navigasyon arka planını sayfa scroll'u sıfır olmadığında `rgba(11,15,20,0.85)` backdrop-blur efektiyle render etmelidir.
5. THE Sistem SHALL <768px viewport'ta navigasyon bağlantılarını hamburger menü içinde render etmelidir.
6. WHEN kullanıcı hamburger menüyü açarsa, THE Sistem SHALL menüyü tam genişlikte overlay panel olarak göstermelidir.
7. WHEN kullanıcı hamburger menüde bir bağlantıya tıklarsa, THE Sistem SHALL menüyü kapatıp ilgili bölüme scroll etmelidir.


---

### Requirement 14: Performans ve Lighthouse Skoru

**User Story:** As a ziyaretçi, I want sitenin hızlı yüklenmesini ve akıcı çalışmasını, so that kötü bir deneyim yaşamadan içeriğe ulaşabileyim.

#### Acceptance Criteria

1. THE Sistem SHALL Google Lighthouse Performance skorunu 95 veya üzerinde tutmalıdır.
2. THE Sistem SHALL Google Lighthouse Accessibility skorunu 95 veya üzerinde tutmalıdır.
3. THE Sistem SHALL Google Lighthouse SEO skorunu 95 veya üzerinde tutmalıdır.
4. THE Sistem SHALL Google Lighthouse Best Practices skorunu 95 veya üzerinde tutmalıdır.
5. THE Sistem SHALL tüm görselleri Next.js Image bileşeni üzerinden lazy loading ve WebP formatıyla render etmelidir.
6. THE Sistem SHALL First Contentful Paint (FCP) değerini üretim ortamında 1.8 saniyenin altında tutmalıdır.
7. THE Sistem SHALL kullanılmayan JavaScript ve CSS paketlerini üretim build'inde tree-shaking ile elemeli, toplam JS bundle boyutu 200KB gzipped'ın altında kalmalıdır.
8. THE Sistem SHALL Framer Motion animasyon kütüphanesini dynamic import ile yükleyerek ilk yükleme bundle'ına dahil etmemelidir.

---

### Requirement 15: SEO ve Metadata

**User Story:** As a potansiyel müşteri, I want siteyi arama motorlarında bulabilmek, so that doğrudan arama ile platforma ulaşabileyim.

#### Acceptance Criteria

1. THE Sistem SHALL her sayfada Next.js Metadata API aracılığıyla benzersiz `<title>` ve `<meta name="description">` etiketleri render etmelidir.
2. THE Sistem SHALL Open Graph etiketlerini (`og:title`, `og:description`, `og:image`, `og:url`) doğru biçimde render etmelidir.
3. THE Sistem SHALL `robots.txt` ve `sitemap.xml` dosyalarını Next.js App Router'ın yerleşik route handler'ları aracılığıyla sunmalıdır.
4. THE Sistem SHALL tüm görsel `<img>` elementlerinde anlamlı `alt` metin sunmalıdır; boş veya "image" gibi anlamsız alt metin kabul edilmeyecektir.
5. THE Sistem SHALL sayfada yalnızca bir adet `<h1>` etiketi bulundurmalıdır; Hero bölümünün başlığı bu etiketi kullanacaktır.
6. THE Sistem SHALL canonical URL etiketini render etmelidir.


---

### Requirement 16: Erişilebilirlik

**User Story:** As a engelli ziyaretçi, I want siteyi yardımcı teknolojilerle kullanabilmek, so that içeriğe ekrandan bağımsız biçimde erişebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL tüm interaktif bileşenlerde (buton, link, form alanı) klavye navigasyonu desteği sağlamalıdır.
2. THE Sistem SHALL tüm renk çiftleri için WCAG 2.1 AA kontrast oranı gereksinimini karşılamalıdır; metin-arka plan kontrast oranı minimum 4.5:1 olmalıdır.
3. THE Sistem SHALL form alanlarının her birinde ekran okuyucunun okuyabileceği `<label>` veya `aria-label` etiketini render etmelidir.
4. THE Sistem SHALL animasyonlar için `prefers-reduced-motion` medya sorgusunu uygulayarak bu tercihe sahip kullanıcılarda animasyonları devre dışı bırakmalıdır.
5. THE Sistem SHALL modal, overlay ve hamburger menüde odak hapsetme (focus trap) mekanizması uygulamalıdır.
6. THE Sistem SHALL ikonografik butonlarda (sosyal medya ikonları gibi) `aria-label` özelliğini render etmelidir.

---

### Requirement 17: Bileşen Mimarisi ve Kod Kalitesi

**User Story:** As a geliştirici, I want kodun bakımının kolay olmasını ve bileşenlerin bağımsız çalışmasını, so that özellikleri hızla ekleyip değiştirebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL her sayfa bölümünü bağımsız React bileşeni olarak geliştirmelidir; bir bileşen birden fazla bölümü içermeyecektir.
2. THE Sistem SHALL tüm TypeScript bileşen prop'larını açık interface veya type tanımlamasıyla belgelemelidir; `any` tipi kullanılmayacaktır.
3. THE Sistem SHALL renk, boşluk ve tipografi değerlerini Tailwind CSS yapılandırma dosyasında (`tailwind.config.ts`) merkezi olarak tanımlamalıdır; inline style ile sabit renk değeri kullanılmayacaktır.
4. THE Sistem SHALL sunucu bileşeni (Server Component) ile istemci bileşeni (Client Component) ayrımını doğru biçimde uygulamalıdır; `"use client"` direktifi yalnızca etkileşim veya tarayıcı API'si gerektiren bileşenlerde kullanılacaktır.
5. THE Sistem SHALL ShadCN UI bileşenlerini özelleştirmek için bileşen kaynak dosyalarını doğrudan düzenlemek yerine Tailwind class geçersiz kılma yöntemini kullanmalıdır.
6. THE Sistem SHALL Framer Motion geçiş sürelerini 150ms ile 400ms arasında tutmalıdır; bu aralık dışında animasyon kullanılmayacaktır.


---

### Requirement 18: Mobil Öncelikli Duyarlı Tasarım

**User Story:** As a mobil cihaz kullanan ziyaretçi, I want sitenin her ekran boyutunda düzgün görünmesini, so that masaüstü gerektirmeden tüm içeriğe erişebileyim.

#### Acceptance Criteria

1. THE Sistem SHALL tüm layout kararlarını mobil-önce (mobile-first) yaklaşımla Tailwind CSS breakpoint'leri kullanarak uygulamalıdır.
2. THE Sistem SHALL üç sütunlu grid layout'ları yalnızca ≥1024px viewport'ta render etmelidir.
3. THE Sistem SHALL tüm dokunmatik hedef alanlarının (buton, link, form alanı) minimum 44x44 piksel boyutunda olmasını sağlamalıdır.
4. THE Sistem SHALL yatay scroll oluşturan sabit genişlikteki bileşenlere izin vermeyecektir; tüm bileşenler yüzde veya fluid birim kullanacaktır.
5. THE Sistem SHALL mobil viewport'ta font boyutlarını minimum 16px olarak uygulayacaktır; bu değerin altındaki font boyutu kullanıcı içerik metninde kabul edilmeyecektir.

---

### Requirement 19: Teknoloji Yığını Uyumluluğu

**User Story:** As a geliştirici, I want belirlenen teknoloji yığınının doğru biçimde kullanılmasını, so that projenin uzun vadeli sürdürülebilirliğini sağlayayım.

#### Acceptance Criteria

1. THE Sistem SHALL Next.js 15 App Router mimarisini kullanmalıdır; Pages Router kullanılmayacaktır.
2. THE Sistem SHALL TypeScript strict modunu (`"strict": true`) tsconfig.json'da etkinleştirmelidir.
3. THE Sistem SHALL stillemede Tailwind CSS v3 veya v4 kullanmalıdır; ayrı CSS dosyaları veya CSS-in-JS kütüphanesi kullanılmayacaktır (ShadCN'in kendi stillemesi hariç).
4. THE Sistem SHALL ShadCN UI bileşenlerini `npx shadcn@latest add` komutuyla projeye dahil etmelidir.
5. THE Sistem SHALL Framer Motion v11 veya üzeri kullanmalıdır.
6. THE Sistem SHALL package.json'da tüm bağımlılıklar için sabit (pinned) sürüm numarası kullanmalıdır; open range (`^`, `~`) kullanılmayacaktır.


---

### Requirement 20: Veri Bütünlüğü ve İçerik Yönetimi

**User Story:** As a geliştirici, I want tüm içerik verilerinin merkezi ve tip-güvenli biçimde yönetilmesini, so that içerik güncellemelerini tek yerden yapabileyim.

#### Acceptance Criteria

1. THE Sistem SHALL hizmet kartları, portfolio projeleri ve fiyatlandırma paketleri için içerik verilerini TypeScript sabit (const) obje dizisi olarak ayrı bir veri dosyasında (`/data` klasörü) tanımlamalıdır.
2. THE Sistem SHALL veri nesnelerinin tip tanımlamalarını ayrı bir types dosyasında (`/types` klasörü) tutmalıdır.
3. THE Sistem SHALL içerik verisi dosyalarında hardcoded HTML string kullanmayacaktır; tüm render kararları bileşen katmanında alınacaktır.
4. WHEN içerik verisi eksik veya undefined değer içerirse, THE Sistem SHALL bileşenin görsel olarak bozulmasını önleyen fallback değerleri render etmelidir.
5. THE Sistem SHALL portfolio proje verisi için mockup görsel URL'lerini Next.js public klasöründe organize edilmiş yerel dosyalara referans vermelidir; harici CDN bağımlılığı olmayacaktır.
