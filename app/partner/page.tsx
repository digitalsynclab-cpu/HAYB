import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Handshake, Users, Rocket, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'HAYB Partner: Dijital Hizmetleri Müşterilerinize Sunun',
  description: 'Müşteri bulun, HAYB dijital ürünü tasarlasın ve teslim etsin. Gerçekleşen satıştan komisyon kazanın. HAYB Partner ağına başvurun.',
  path: '/partner',
});

const steps = [
  { no: '01', title: 'Başvur', text: 'Kısa bir formla HAYB Partner ağına başvurun.' },
  { no: '02', title: 'Onaylan', text: 'Başvurunuz değerlendirilir, onaylanırsa hesabınız açılır.' },
  { no: '03', title: 'Müşterini Bul', text: 'HAYB hizmetlerine ihtiyacı olan işletmelere ulaşın.' },
  { no: '04', title: "Lead'i Oluştur", text: 'Müşteri bilgilerini partner panelinden HAYB’e iletin.' },
  { no: '05', title: 'Satıştan Komisyon Kazan', text: 'Satış gerçekleştiğinde komisyonunuz hesaplanır.' },
];

const partnerDoes = [
  'Potansiyel müşterileri bulun',
  'HAYB hizmetlerini tanıtın',
  "Lead oluşturun",
  'Müşteri ihtiyacını HAYB’e aktarın',
  'HAYB ile süreci birlikte takip edin',
];

const haybDoes = ['İhtiyaç analizi', 'UI/UX', 'Web geliştirme', 'Mobil uygulama', 'Özel yazılım', 'Yönetim paneli', 'Yapay zeka çözümleri', 'Yayına alma ve teknik destek'];

const whoCanApply = [
  'Dijital pazarlamacılar',
  'Freelancerlar',
  'Sosyal medya yöneticileri',
  'Grafik tasarımcılar',
  'Satış profesyonelleri',
  'Yerel işletmelerle bağlantısı olanlar',
  'Ajanslar',
  'Girişimciler',
];

const advantages = [
  { icon: Rocket, title: 'Hazır hizmet altyapısı', text: 'Sunacağınız tüm dijital ürünler HAYB tarafından geliştirilir ve teslim edilir.' },
  { icon: FileSpreadsheet, title: 'Satış materyalleri', text: 'Hazır tanıtım metinleri ve görselleriyle müşteriye sunum yapmanız kolaylaşır.' },
  { icon: Users, title: "Lead takip sistemi", text: 'Oluşturduğunuz her müşteri adayının durumunu panelinizden izlersiniz.' },
  { icon: ShieldCheck, title: 'Şeffaf komisyon takibi', text: 'Satış gerçekleştiğinde komisyonunuz hesaplanır ve panelinizde görünür.' },
];

export default function PartnerLandingPage() {
  return (
    <>
      <PageHero
        eyebrow="HAYB Partner"
        title="Dijital çözümleri"
        accent="müşterilerinize sunun."
        text="Siz müşteriyi bulun. HAYB dijital ürünü tasarlasın, geliştirsin ve teslim etsin. Gerçekleşen satıştan komisyon kazanın."
        actions={
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/partner/basvuru">Partner Başvurusu Yap</Button>
              <Button href="#nasil-calisir" variant="secondary" arrow={false}>
                Nasıl Çalışır?
              </Button>
            </div>
            <p className="text-sm text-fg-muted">
              Zaten partner misiniz?{' '}
              <Link href="/partner/giris" className="font-semibold text-lime underline underline-offset-4">
                Giriş yapın
              </Link>
            </p>
          </div>
        }
      />

      <Section id="nasil-calisir" labelledBy="nasil-calisir-baslik">
        <SectionHeading id="nasil-calisir-baslik" title="Nasıl" accent="çalışır?" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <div key={s.no} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-3xl font-extrabold text-lime">{s.no}</p>
              <p className="mt-3 font-semibold text-fg">{s.title}</p>
              <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark-2">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Partner olarak" accent="ne yaparsın?" />
            <ul className="space-y-3">
              {partnerDoes.map((t) => (
                <li key={t} className="flex items-start gap-3 text-fg-muted">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="HAYB" accent="ne yapar?" />
            <ul className="grid grid-cols-2 gap-3">
              {haybDoes.map((t) => (
                <li key={t} className="flex items-start gap-3 text-fg-muted">
                  <Handshake aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Kimler partner" accent="olabilir?" text="Belirli bir meslek şartı yoktur. HAYB hizmetlerini müşterilerine sunmak isteyen herkes başvurabilir." />
        <div className="flex flex-wrap gap-3">
          {whoCanApply.map((t) => (
            <span key={t} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-fg-muted">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="dark-2">
        <SectionHeading title="Partner" accent="avantajları" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div key={a.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <a.icon aria-hidden className="h-6 w-6 text-lime" />
              <p className="mt-4 font-semibold text-fg">{a.title}</p>
              <p className="mt-1 text-sm text-fg-muted">{a.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-fg-muted">
          Komisyon oranları hizmete, pakete ve döneme göre değişebilir; garanti gelir veya kazanç taahhüdü verilmez.
        </p>
      </Section>

      <Section>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Partner olarak başla</h2>
          <div className="mt-6 flex justify-center">
            <Button href="/partner/basvuru">Partner Başvurusu Yap</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
