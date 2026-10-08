import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { brandLogos } from '@/data/brands';
import { TemplateMarquee } from '@/components/templates/TemplateShowcase';
import { AppCovers, PanelSlider } from '@/components/ui/Sliders';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { AiChatDemo } from '@/components/ui/AiChatDemo';
import { SocialTemplates } from '@/components/ui/SocialTemplates';
import { ProjectImage } from '@/components/ui/Cards';
import { StoreButtons, LiveAppsShelf } from '@/components/ui/StoreButtons';
import { LineIcon } from '@/components/ui/LineIcon';
import { projectById, type Project } from '@/data/projects';
import { ecommercePackages, dataServicePlans, dataServiceAddons } from '@/data/pricing';
import { dsScreens, dsBuyUrl } from '@/data/data-service';
import { Price } from '@/components/ui/Price';
import Link from 'next/link';
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
            <LineIcon name={n.icon} size={48} />
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
    case 'commerce':
      return (
        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-xl font-bold">Bir siparişin yolculuğu</h3>
            <FlowChain items={['Ürün', 'Sepet', 'Ödeme (iyzico / PayTR)', 'Sipariş', 'Kargo takip no']} />
          </div>
          <div>
            <h3 className="mb-1 text-xl font-bold">Canlı deneyebileceğiniz örnek siteler</h3>
            <p className="mb-4 text-fg-muted">Sepeti, filtreleri ve formları kendi telefonunuzda deneyin.</p>
            <TemplateMarquee />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">E-ticaret paketleri</h3>
            <ul className="grid gap-4 md:grid-cols-3">
              {ecommercePackages.map((p) => (
                <li key={p.id}>
                  <Link href="/paketler#eticaret" data-spot className={`press flex h-full flex-col rounded-card border p-5 transition hover:border-lime ${p.recommended ? 'border-lime bg-lime/[0.06]' : 'border-white/12 bg-ink-800'}`}>
                    <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-lime">{p.name}</span>
                    <Price price={p.price} tone="dark" size="md" className="mt-3 text-fg" />
                    <span className="mt-3 flex-1 text-sm text-fg-muted">{p.blurb}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-lime">
                      Paketi incele <ArrowRight aria-hidden className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
        <div>
          <AppCovers />
          <LiveAppsShelf className="mt-6" />
        </div>
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
        <div className="space-y-12">
          <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
            {[
              { t: 'Bilgisayarda', d: 'Windows programı olarak kurun; kendi penceresinde, masaüstü simgesiyle açılır.' },
              { t: 'Tarayıcıda', d: 'Kurulum gerekmeden app.hayb.com.tr adresinden giriş yapın.' },
              { t: 'Telefonda', d: 'Ekranlar telefona uyumludur; arama, işletme kartı ve takip yanınızda.' },
            ].map((c) => (
              <li key={c.t} data-spot className="glass rounded-card p-5 sm:p-6">
                <p className="text-lg font-bold text-lime">{c.t}</p>
                <p className="mt-2 text-[0.97rem] text-fg-muted">{c.d}</p>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="mb-5 text-xl font-bold sm:text-2xl">Tanıtım videoları</h3>
            <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
              {[
                { src: '/videos/data-service/reklam-filmi', title: 'Reklam filmi' },
                { src: '/videos/data-service/hareketli', title: 'Kısa tanıtım' },
                { src: '/videos/data-service/5-sebep', title: 'Neden kullanmalısınız? 5 sebep' },
              ].map((v) => (
                <li key={v.src} className="w-[16rem] shrink-0 snap-start sm:w-auto">
                  <div className="overflow-hidden rounded-card border border-white/10 bg-ink-800">
                    <video src={`${v.src}.mp4`} poster={`${v.src}.jpg`} controls playsInline preload="none" className="aspect-[9/16] h-auto w-full bg-black object-cover" aria-label={`HAYB Data Service ${v.title}`} />
                  </div>
                  <p className="mt-2 font-semibold">{v.title}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold sm:text-2xl">Programın ekranları</h3>
            <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
              {dsScreens.map((sc, i) => (
                <li key={sc.src} data-spot className="glass overflow-hidden rounded-card">
                  <div className="overflow-hidden border-b border-white/10 bg-ink-800">
                    <Image src={sc.src} alt={`HAYB Data Service: ${sc.title} ekranı`} width={1600} height={1118} sizes="(min-width: 768px) 560px, 92vw" className="h-auto w-full" priority={i < 2} />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-bold">{sc.title}</p>
                    <p className="mt-2 text-[0.95rem] text-fg-muted">{sc.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-fg-muted">Ekranlardaki firmalar ve sayılar örnek veridir.</p>
          </div>

          <div id="ds-paketler" className="scroll-mt-28">
            <h3 className="text-xl font-bold sm:text-2xl">Paketler ve fiyatlar</h3>
            <p className="mt-2 text-[0.97rem] text-fg-muted">1 aylık lisanstan başlar; tek seferde yüklü ödeme yapmadan, cüzi rakamlarla hemen kullanmaya başlayın. Satın aldıktan sonra hesabınız aynı gün tanımlanır, giriş bilgileriniz e-postanıza gelir.</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dataServicePlans.map((plan) => (
                <li key={plan.id} data-spot className={`flex flex-col rounded-card border p-5 sm:p-6 ${plan.recommended ? 'border-lime bg-lime/[0.06]' : 'border-white/12 bg-ink-800'}`}>
                  <p className="font-bold">{plan.name}</p>
                  <Price price={plan.price} tone="dark" size="md" className="mt-2" />
                  <ul className="mt-4 flex-1 space-y-2 text-[0.93rem] text-fg-muted">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />{f}</li>
                    ))}
                  </ul>
                  <a href={dsBuyUrl(plan)} target="_blank" rel="noopener noreferrer" className="press mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-lime px-5 font-semibold text-ink-950 transition hover:bg-lime-soft">Satın Al</a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {dataServiceAddons.map((plan) => (
                <div key={plan.id} data-spot className="glass flex flex-col rounded-card p-5 sm:p-6">
                  <p className="font-bold">{plan.name}</p>
                  <Price price={plan.price} tone="dark" size="md" className="mt-2" />
                  <p className="mt-3 flex-1 text-[0.93rem] text-fg-muted">{plan.features.join(' · ')}</p>
                  <a href={dsBuyUrl(plan)} target="_blank" rel="noopener noreferrer" className="press mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 font-semibold transition hover:border-white/40 hover:bg-white/10">Satın Al</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Kimler için?</h3>
            <ul className="grid gap-4 sm:grid-cols-3">
              {[
                { t: 'Üretim yapan ve toptan satanlar', d: 'Şehir şehir bayi, toptancı ve kurumsal müşteri adaylarını iletişim bilgileriyle bulun.' },
                { t: 'Dijital pazarlamacılar', d: 'Hizmete ihtiyacı olan işletmeleri bulun; kanıtlı rapor ve teklifle satışa çevirin.' },
                { t: 'Bütün işletmeler', d: 'Sitenizin ve Google görünürlüğünüzün eksiklerini görün, rakiplerinizin önüne geçin.' },
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
