import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ProductCard } from './ProductCard';

export default async function PartnerAdvantagesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: products } = await supabase.from('partner_products').select('slug, name, tagline, price').eq('is_active', true).order('price');

  const start = products?.find((p) => p.slug === 'partner-start');
  const premium = products?.find((p) => p.slug === 'partner-premium');

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime">Partnerine Özel</p>
      <h1 className="mt-2 text-2xl font-bold">Partner Avantajları</h1>
      <p className="mt-2 text-fg-muted">HAYB Partneri olarak kendi dijital markanızı veya web sitenizi partner özel fiyatlarıyla oluşturabilirsiniz.</p>

      <div className="mt-8 space-y-5">
        {start && (
          <ProductCard
            slug={start.slug}
            name={start.name}
            tagline={start.tagline}
            price={Number(start.price)}
            ctaLabel="Web Sitemi Oluştur"
            features={['Profesyonel, mobil uyumlu web sitesi', '1 yıl domain + 1 yıl hosting', 'Temel SEO altyapısı (metadata, sitemap, robots, temel teknik SEO)']}
          />
        )}
        {premium && (
          <ProductCard
            slug={premium.slug}
            name={premium.name}
            tagline={premium.tagline}
            price={Number(premium.price)}
            ctaLabel="Markamı Oluştur"
            highlight
            features={[
              'Marka adı ve konumlandırma çalışması',
              'Logo, favicon, renk paleti ve marka kimliği',
              'Sosyal medya görsel altyapısı',
              'Profesyonel web sitesi + 1 yıl domain + 1 yıl hosting',
              'Güçlü SEO altyapısı ve profesyonel sosyal medya/link paylaşım görünümü',
              'HAYB Data Service dahil',
            ]}
          />
        )}
      </div>

      <p className="mt-6 text-xs text-fg-muted">
        Fiyatlar partner özel fiyatlarıdır. Süreç ve sonuçlar her zaman şeffaf şekilde ilerler; kesin sonuç (ör. arama motoru sıralaması) garantisi verilmez.
      </p>
    </div>
  );
}
