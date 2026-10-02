// Satış Rehberi içeriği — yalnızca sales_scripts tablosuna INSERT yapar, başka hiçbir tabloya dokunmaz.
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.');
  process.exit(1);
}
const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

const scripts = [
  // Açılış Cümleleri
  {
    category: 'Açılış Cümleleri',
    title: 'İlk temas (soğuk)',
    content:
      'Merhaba [İsim], ben [Adınız], HAYB Dijital Ürün Stüdyosu\'ndan arıyorum/yazıyorum. İşletmenizin dijital tarafında (web sitesi/sosyal medya) fark ettiğim birkaç fırsat var, 2 dakikanızı alabilir miyim?',
  },
  {
    category: 'Açılış Cümleleri',
    title: 'Referansla gelen müşteri',
    content:
      'Merhaba [İsim], [Referans Veren] sizi bana yönlendirdi. Kendisi için yaptığımız [hizmet] çalışmasından memnun kalmış, sizin işletmeniz için de benzer bir çözüm düşünebileceğimizi söyledi. Size de kısaca bahsedebilir miyim?',
  },
  {
    category: 'Açılış Cümleleri',
    title: 'Sosyal medyadan gelen ilgi',
    content:
      'Merhaba [İsim], paylaşımımızla ilgilendiğinizi gördüm, teşekkürler! İşletmeniz için tam olarak neye ihtiyacınız olduğunu anlayabilirsem, size en uygun paketi birlikte netleştirebiliriz. Birkaç soru sorabilir miyim?',
  },
  // İtiraz Yanıtları
  {
    category: 'İtiraz Yanıtları',
    title: '"Pahalı" diyorlar',
    content:
      'Anlıyorum, bütçe önemli bir konu. Şunu belirtmek isterim: bu fiyata sadece tasarım değil, 1 yıl domain+hosting, temel SEO altyapısı ve teslim sonrası destek de dahil. Yani aslında birkaç hizmeti ayrı ayrı almanıza göre daha avantajlı. İsterseniz bütçenize en uygun paketi birlikte bulalım.',
  },
  {
    category: 'İtiraz Yanıtları',
    title: '"Düşüneceğim" diyorlar',
    content:
      'Tabii, böyle bir karar için düşünmek normal. Sadece merak ettiğim, kararsız kaldığınız nokta fiyat mı, kapsam mı, yoksa zamanlama mı? Ona göre size daha net bilgi verebilirim, böylece doğru kararı daha rahat verirsiniz.',
  },
  {
    category: 'İtiraz Yanıtları',
    title: '"Zaten bir sitem/Instagram\'ım var" diyorlar',
    content:
      'Güzel, bu bize sıfırdan başlamadığımızı gösteriyor. Mevcut durumunuzu geliştirmek ya da daha profesyonel bir görünüme taşımak isterseniz, mevcut yapınızı inceleyip somut önerilerle gelebilirim — hiçbir yükümlülük olmadan.',
  },
  {
    category: 'İtiraz Yanıtları',
    title: '"Başka firmalarla da görüşüyorum" diyorlar',
    content:
      'Elbette, karşılaştırma yapmanız çok normal ve doğru bir yaklaşım. Bizi diğerlerinden ayıran nokta süreç boyunca şeffaflık ve teslim sonrası destek. Karşılaştırmanızda size yardımcı olacak bir teklif/bilgi dökümü hazırlayabilirim.',
  },
  // Kapanış ve Takip
  {
    category: 'Kapanış ve Takip',
    title: 'Satışı kapatma',
    content:
      'Konuştuğumuz paket ihtiyaçlarınıza uygun görünüyor. İsterseniz şimdi birkaç bilgi alıp süreci başlatalım, ekibimiz en kısa sürede sizinle iletişime geçsin. Uygun mu?',
  },
  {
    category: 'Kapanış ve Takip',
    title: 'Yanıt vermeyen müşteriyi takip',
    content:
      'Merhaba [İsim], geçen gün görüştüğümüz [hizmet] konusunda size dönüş yapmak istedim. Hâlâ ilgileniyor musunuz, yoksa aklınıza takılan bir konu mu oldu? Yardımcı olmak isterim.',
  },
  {
    category: 'Kapanış ve Takip',
    title: 'Teklif sonrası sessizlik',
    content:
      'Merhaba [İsim], gönderdiğim teklifi inceleme fırsatınız oldu mu? Sorularınız varsa veya pakette küçük bir değişiklik gerekiyorsa memnuniyetle konuşabiliriz.',
  },
  // Fiyat ve Süreç Soruları
  {
    category: 'Fiyat ve Süreç Soruları',
    title: '"Ne kadar sürede teslim edersiniz?" sorusuna yanıt',
    content:
      'Paket ve kapsama göre değişmekle birlikte, standart bir web sitesi genellikle tüm bilgiler bizde olduktan sonra birkaç hafta içinde teslim ediliyor. Net bir tarih için ihtiyaçlarınızı netleştirdikten sonra size kesin bir süre söyleyebilirim.',
  },
  {
    category: 'Fiyat ve Süreç Soruları',
    title: '"Ödeme nasıl yapılıyor?" sorusuna yanıt',
    content:
      'Süreç onaylandıktan sonra ödeme bilgileri ve adımlar tarafınıza iletilir, HAYB ekibi süreci sizinle birebir yürütür. Siparişi oluşturduktan sonra tüm detaylar netleşir, merak ettiğiniz başka bir şey varsa hemen sorabilirsiniz.',
  },
];

if (!process.argv.includes('--confirm')) {
  console.log(`Bu script ${scripts.length} satış rehberi kaydı ekleyecek. Onaylamak için --confirm bayrağıyla çalıştırın.`);
  process.exit(0);
}

async function main() {
  const rows = scripts.map((s, i) => ({ ...s, display_order: i, active: true }));
  const { data, error } = await admin.from('sales_scripts').insert(rows).select('id');
  if (error) {
    console.error('HATA:', error.message);
    process.exit(1);
  }
  console.log(`${data.length} satış rehberi kaydı eklendi.`);
}

main();
