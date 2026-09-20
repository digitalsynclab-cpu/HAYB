import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { brandLogos } from '@/data/brands';
import { TemplateMarquee } from '@/components/templates/TemplateShowcase';
import { AppCovers, PanelSlider } from '@/components/ui/Sliders';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { AiChatDemo } from '@/components/ui/AiChatDemo';
import { SocialTemplates } from '@/components/ui/SocialTemplates';
import { ProjectImage } from '@/components/ui/Cards';
import { StoreButtons } from '@/components/ui/StoreButtons';
import { Icon3D } from '@/components/ui/Icon3D';
import { projectById, type Project } from '@/data/projects';
import type { ShowcaseKind } from '@/data/services';
import type { IconName } from '@/data/icons';

/** Koyu kart içinde ürün görseli (şeffaf ürün ekranları için). */
function Shot({ project, ratio = 'aspect-[3/2]', sizes = '(min-width: 1024px) 560px, 92vw', priority = false }: { project: Project; ratio?: string; sizes?: string; priority?: boolean }) {
  return (
    <div data-spot className={`group relative overflow-hidden rounded-card border border-white/10 bg-ink-800 ${ratio}`}>
      <ProjectImage project={project} sizes={sizes} priority={priority} className="absolute inset-0" />
    </div>
  );
}

function ArchitectureFlow() {
  const nodes: { icon: IconName; title: string; text: string }[] = [
    { icon: 'musteriodakli', title: 'Kullanıcı', text: 'Tarayıcı veya mobil' },
    { icon: 'websitesi', title: 'Web Uygulaması', text: 'Arayüz' },
    { icon: 'entegrasyon', title: 'API', text: 'İş mantığı' },
    { icon: 'veriyonetimi', title: 'Veritabanı', text: 'Kayıtlar' },
    { icon: 'yonetimpaneli', title: 'Yönetim Paneli', text: 'Sizin kontrolünüz' },
    { icon: 'yapayzeka', title: 'Otomasyon / AI', text: 'İsteğe bağlı' },
  ];
  return (
    <figure>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((n, i) => (
          <li key={n.title} data-spot className="glass relative flex items-center gap-4 rounded-card p-4">
            <span aria-hidden className="absolute right-3 top-2 text-xs font-bold tracking-widest text-lime">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Icon3D name={n.icon} size={56} />
            <div>
              <p className="font-bold">{n.title}</p>
              <p className="text-sm text-fg-muted">{n.text}</p>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden className="absolute -bottom-3.5 left-1/2 z-10 hidden h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-lime text-ink-950 max-sm:flex">
                <ArrowDown className="h-4 w-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-fg-muted">Örnek mimari şeması. Gerçek bir müşteri sistemi değildir; tipik bir özel yazılımın parçalarını gösterir.</figcaption>
    </figure>
  );
}

function FlowChain({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold sm:px-4">{s}</span>
          {i < items.length - 1 && <ArrowRight aria-hidden className="h-4 w-4 text-lime" />}
        </li>
      ))}
    </ol>
  );
}

export function ServiceShowcase({ kind }: { kind: ShowcaseKind }) {
  switch (kind) {
    case 'web':
      return (
        <div className="space-y-10">
          <div>
            <h3 className="mb-1 text-xl font-bold">Canlı deneyebileceğiniz örnek siteler</h3>
            <p className="mb-4 text-fg-muted">Bir şablona dokunun; sitenin menüsünü, sepetini ve formlarını gerçekten kullanın.</p>
            <TemplateMarquee />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Yayındaki çalışmalarımızdan</h3>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Shot project={projectById('webevtekstil')!} />
              <Shot project={projectById('webinsaat')!} />
              <div className="md:col-span-2">
                <Shot project={projectById('websosyal')!} ratio="aspect-[16/9] md:aspect-[21/9]" sizes="(min-width: 1024px) 1100px, 92vw" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'architecture':
      return <ArchitectureFlow />;
    case 'dashboard':
      return <PanelSlider />;
    case 'flow':
      return (
        <div className="space-y-6">
          <FlowChain items={['Problem', 'Araştırma', 'Kullanıcı akışı', 'Wireframe', 'Arayüz', 'Prototip', 'Geliştirme']} />
          <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-5">
            <div aria-hidden className="glass flex flex-col gap-3 rounded-card p-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-fg-muted">Wireframe</span>
              <div className="h-8 rounded bg-white/10" />
              <div className="h-24 rounded bg-white/10" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 rounded bg-white/10" />
                <div className="h-16 rounded bg-white/10" />
                <div className="h-16 rounded bg-white/10" />
              </div>
            </div>
            <Shot project={projectById('webevtekstil')!} />
          </div>
          <p className="text-sm text-fg-muted">Sol: iskelet (wireframe). Sağ: aynı yapının tamamlanmış hali, gerçek bir projeden.</p>
        </div>
      );
    case 'mobile':
      return (
        <AppCovers />
      );
    case 'game': {
      const g = projectById('bbblock')!;
      return (
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <div className="group relative aspect-[3/2] overflow-hidden rounded-card border border-white/10">
            <ProjectImage project={g} sizes="(min-width: 1024px) 700px, 92vw" className="absolute inset-0" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Image src="/images/projects/bbblock-icon.webp" alt="BB Block uygulama ikonu" width={72} height={72} className="h-[4.5rem] w-[4.5rem] rounded-2xl border border-white/15" />
              <div>
                <p className="text-lg font-bold">{g.name}</p>
                <p className="text-sm text-fg-muted">Mobil oyun · iOS ve Android</p>
              </div>
            </div>
            <p className="text-fg-muted">{g.description}</p>
            <StoreButtons stores={g.stores!} />
          </div>
        </div>
      );
    }
    case 'ai':
      return <AiChatDemo className="mx-auto max-w-3xl" />;
    case 'social':
      return <SocialTemplates />;
    case 'data':
      return (
        <div className="space-y-8">
          <figure>
            <div className="overflow-hidden rounded-card border border-white/10 bg-ink-800 shadow-glass">
              <Image src="/images/products/hayb-data-service.webp" alt="HAYB Data Service arayüzü: sektör arama, sonuç tablosu ve Excel olarak indirme" width={1200} height={1096} sizes="(min-width: 1024px) 1100px, 92vw" className="h-auto w-full" />
            </div>
            <figcaption className="mt-3 text-sm text-fg-muted">Örnek arayüz ve tanıtım görseli. Gösterilen firmalar ve sayılar demo veridir.</figcaption>
          </figure>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <div className="glass rounded-card p-5 sm:p-6">
              <p className="text-lg font-bold">Elle araştırma</p>
              <ul className="mt-3 space-y-2 text-[0.97rem] text-fg-muted">
                {['İşletmeleri tek tek arama', 'Google’da sektör sektör araştırma', 'Bilgileri Excel’e aktarma', 'Telefon ve web sitelerini düzenleme', 'Tekrar eden kayıtları temizleme', 'Satış ekibine liste hazırlama'].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold">Saatler, hatta günler sürebilir.</p>
            </div>
            <div data-spot className="glass rounded-card border-lime/40 p-5 sm:p-6">
              <p className="text-lg font-bold text-lime">HAYB Data Service ile</p>
              <p className="mt-3 text-[0.97rem]">Bu süreç tek bir arama ve dışa aktarma akışına iner: sektörü yazın, sonuçları görün, Excel olarak indirin.</p>
              <p className="mt-3 text-sm font-semibold">Saatlerce işletme aramayın. Veriyi tek yerden bulun.</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Kimler kullanabilir?</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: 'Dijital pazarlama ajansları', d: '“Bursa’daki restoranlar” aramasıyla potansiyel müşteri listesi oluşturur; web sitesi, SEO, Google ve Meta reklamları, sosyal medya ve marka tasarımı hizmetleri için değerlendirir.' },
                { t: 'Satış ekipleri', d: '“Türkiye → Otel” gibi seçimlerle işletmeleri listeler ve satış araştırmasını bu liste üzerinden yürütür.' },
                { t: 'Yeni müşteri arayan ajanslar', d: 'Yalnızca “Güzellik Merkezi” ile çalışmak isteyen bir ajans, ilgili işletmeleri bulup liste çıkarır.' },
                { t: 'Pazar araştırması', d: '“Bursa → Mobilya Mağazası” veya “Antalya → Otel” gibi aramalarla işletmelerin bölgelere dağılımını inceler.' },
              ].map((c) => (
                <li key={c.t} data-spot className="glass rounded-card p-5">
                  <p className="font-bold">{c.t}</p>
                  <p className="mt-2 text-[0.95rem] text-fg-muted">{c.d}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-card border border-lime/40 bg-lime/[0.07] p-4 text-[0.95rem]">
            <strong>Kapsam ve kullanım hakkında:</strong> Verinin kapsamı, kaynağı, güncelliği ve hangi alanların bulunduğu sektöre ve bölgeye göre değişebilir; her işletme için her alan yer almayabilir. Verileri pazarlama amacıyla kullanırken KVKK ve ticari elektronik ileti mevzuatına uymak kullanıcının sorumluluğundadır.
          </p>
        </div>
      );
    case 'ads':
      return (
        <div className="space-y-6">
          <FlowChain items={['Strateji', 'Kurulum', 'Hedef kitle', 'Kampanya', 'A/B test', 'Optimizasyon', 'Rapor']} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {[
              { name: 'Meta Ads', hint: 'Facebook ve Instagram', items: ['Görsel ve video reklamlar', 'Ayrıntılı hedef kitle seçimi', 'Remarketing ve benzer kitleler', 'Pixel ve dönüşüm ölçümü'] },
              { name: 'Google Ads', hint: 'Arama, Display ve YouTube', items: ['Anahtar kelime çalışması', 'Arama ve Display kampanyaları', 'Yeniden pazarlama', 'Dönüşüm takibi'] },
            ].map((p) => (
              <div key={p.name} data-spot className="glass rounded-card p-5 sm:p-6">
                <p className="text-xl font-bold">{p.name}</p>
                <p className="text-sm text-fg-muted">{p.hint}</p>
                <ul className="mt-4 space-y-2">
                  {p.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.97rem]">
                      <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="rounded-card border border-lime/40 bg-lime/[0.07] p-4 text-[0.97rem]">
            <strong>Önemli:</strong> Reklam bütçesi paket fiyatlarına dahil değildir. Reklam bütçenizi doğrudan kendi Google veya Meta hesabınızdan ödersiniz; biz yalnızca yönetim hizmetini faturalandırırız.
          </p>
        </div>
      );
    case 'brand':
      return (
        <figure>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {brandLogos.map((b, i) => (
              <li key={b.name}>
                <Reveal delay={(i % 4) * 70} blur className="h-full">
                  <div className="brand-tile group text-center" style={{ animationDelay: `${i * 0.35}s` }}>
                    <Image src={b.src} alt={`${b.name} logosu (örnek marka tasarımı)`} width={640} height={640} sizes="(min-width:1024px) 260px, 45vw" className="mx-auto h-auto w-full max-w-[16rem] transition duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.04]" />
                    <p className="mt-3 text-base font-bold">{b.name}</p>
                    <p className="text-sm text-fg-muted">{b.sector}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <figcaption className="mt-5 text-sm text-fg-muted">Örnek marka tasarımlarıdır; kurgusal markalar üzerinde hazırlanmış logo ve uygulama ikonu çalışmalarıdır.</figcaption>
        </figure>
      );
  }
}
