'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { projectTypes, wizardStepSchemas } from '@/lib/contact-schema';
import { buildWizardMessage } from '@/lib/messages';
import { whatsappUrl } from '@/data/site';
import { Field, inputProps } from '@/components/forms/Field';
import { Button } from '@/components/ui/Button';
import { Icon3D } from '@/components/ui/Icon3D';
import type { IconName } from '@/data/icons';

type PType = (typeof projectTypes)[number];

const typeInfo: Record<PType, { icon: IconName; text: string }> = {
  'Web Sitesi': { icon: 'websitesi', text: 'Kurumsal, tanıtım veya özel web sitesi.' },
  'E-Ticaret': { icon: 'eticaret', text: 'Online satışa hazır altyapı.' },
  'Mobil Uygulama': { icon: 'mobiluyumlu', text: 'iOS ve Android uygulaması.' },
  'Özel Yazılım': { icon: 'ozelyazilim', text: 'İşinize özel yazılım çözümü.' },
  'UI/UX Tasarım': { icon: 'tasarim', text: 'Kullanıcı odaklı arayüz tasarımı.' },
  'Yapay Zeka': { icon: 'yapayzeka', text: 'Asistan, otomasyon, akıllı özellikler.' },
  'Sosyal Medya': { icon: 'iletisim', text: 'Post ve story tasarımı.' },
  'Marka Tasarımı': { icon: 'hedefodakli', text: 'Logo ve kurumsal kimlik.' },
  Diğer: { icon: 'sinirsiz', text: 'Farklı bir ihtiyacım var.' },
};

const scopeOptions = ['Tasarım', 'Geliştirme', 'SEO', 'Yönetim paneli', 'Ödeme entegrasyonu', 'Yapay zeka', 'Bakım ve destek', 'Henüz emin değilim'];
const timing = ['Hemen başlamak istiyorum', 'Bir ay içinde', 'Sadece bilgi alıyorum'];

const steps = [
  { n: '01', title: 'Proje Türü', sub: 'Ne yapmak istiyorsunuz?' },
  { n: '02', title: 'Detaylar', sub: 'Projenizi anlatın' },
  { n: '03', title: 'Kapsam', sub: 'İhtiyaç ve zaman' },
  { n: '04', title: 'İletişim', sub: 'Size nasıl ulaşalım?' },
  { n: '05', title: 'Gönderildi', sub: 'Mesajınız hazır' },
];

export function ProjectWizard() {
  const [step, setStep] = useState(0);
  const [types, setTypes] = useState<PType[]>([]);
  const [description, setDescription] = useState('');
  const [scope, setScope] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [contact, setContact] = useState({ fullName: '', phone: '', email: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // Adım değişince başlığa odaklan (ekran okuyucu ve klavye kullanıcıları için)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const toggle = <T extends string>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const validate = (): boolean => {
    let result: { success: boolean; error?: { issues: { path: (string | number)[]; message: string }[] } };
    if (step === 0) result = wizardStepSchemas.type.safeParse({ types });
    else if (step === 1) result = wizardStepSchemas.details.safeParse({ description });
    else if (step === 3) result = wizardStepSchemas.contact.safeParse({ ...contact, consent: consent ? true : false });
    else result = { success: true };
    if (result.success) {
      setErrors({});
      return true;
    }
    const map: Record<string, string> = {};
    for (const i of result.error!.issues) map[String(i.path[0])] = i.message;
    setErrors(map);
    return false;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 3) {
      const url = whatsappUrl(buildWizardMessage({ types, description, scope, budget: budget || undefined, ...contact }));
      setWaUrl(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setStep((s) => s + 1);
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div>
      <ol aria-label="Adımlar" className="mb-8 grid grid-cols-5 gap-2">
        {steps.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'current' : 'todo';
          return (
            <li key={s.n} aria-current={state === 'current' ? 'step' : undefined} className="min-w-0">
              <div className={`h-1 rounded-full transition-colors duration-500 ${state === 'todo' ? 'bg-white/15' : 'bg-lime'}`} />
              <p className={`mt-2 flex items-center gap-1.5 text-sm font-bold ${state === 'todo' ? 'text-fg-muted' : 'text-fg'}`}>
                {state === 'done' ? <Check aria-hidden className="h-4 w-4 text-lime" /> : <span>{s.n}</span>}
                <span className="hidden truncate sm:inline">{s.title}</span>
              </p>
            </li>
          );
        })}
      </ol>

      <div className="border border-white/12 bg-ink-900 shadow-glass rounded-card p-5 sm:p-8" key={step}>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-fg-muted">
          Adım {Math.min(step + 1, 5)} / 5
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-extrabold tracking-tight outline-none sm:text-3xl">
          {step === 0 && 'Hangi projeyi hayata geçirmek istiyorsunuz?'}
          {step === 1 && 'Projenizi kısaca anlatın.'}
          {step === 2 && 'Kapsam ve zaman planı'}
          {step === 3 && 'Size nasıl ulaşalım?'}
          {step === 4 && 'Mesajınız hazır.'}
        </h2>

        {step === 0 && (
          <fieldset className="mt-6">
            <legend className="sr-only">Proje türü (birden fazla seçebilirsiniz)</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projectTypes.map((t) => {
                const on = types.includes(t);
                return (
                  <label key={t} className={`relative flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime ${on ? 'border-lime bg-lime/10' : 'border-white/15 hover:border-white/35'}`}>
                    <input type="checkbox" checked={on} onChange={() => setTypes((l) => toggle(l, t))} className="sr-only" />
                    <Icon3D name={typeInfo[t].icon} size={52} />
                    <span>
                      <span className="block font-bold">{t}</span>
                      <span className="block text-sm text-fg-muted">{typeInfo[t].text}</span>
                    </span>
                    {on && <Check aria-hidden className="absolute right-3 top-3 h-5 w-5 text-lime" />}
                  </label>
                );
              })}
            </div>
            {errors.types && <p role="alert" className="mt-3 text-sm font-medium text-red-300">{errors.types}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <div className="mt-6">
            <Field id="description" label="Proje açıklaması" error={errors.description} hint={`${description.length}/500`}>
              {(a) => (
                <textarea
                  rows={6}
                  maxLength={500}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Örn: Markam için modern, mobil uyumlu bir kurumsal web sitesi istiyorum…"
                  {...inputProps(a)}
                  className={`${a.className} min-h-40 py-3`}
                />
              )}
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-6">
            <fieldset>
              <legend className="mb-3 font-semibold">İhtiyaç duyduğunuz kapsam (isteğe bağlı)</legend>
              <div className="flex flex-wrap gap-2">
                {scopeOptions.map((s) => {
                  const on = scope.includes(s);
                  return (
                    <label key={s} className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 font-medium transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime ${on ? 'border-lime bg-lime text-ink-950' : 'border-white/20 hover:border-white/40'}`}>
                      <input type="checkbox" checked={on} onChange={() => setScope((l) => toggle(l, s))} className="sr-only" />
                      {s}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <Field id="timing" label="Ne zaman başlamak istersiniz? (isteğe bağlı)">
              {(a) => (
                <select value={budget} onChange={(e) => setBudget(e.target.value)} {...inputProps(a)}>
                  <option value="">Seçiniz</option>
                  {timing.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-4">
            <Field id="w-name" label="Ad Soyad" error={errors.fullName}>
              {(a) => <input type="text" autoComplete="name" value={contact.fullName} onChange={(e) => setContact({ ...contact, fullName: e.target.value })} {...inputProps(a)} />}
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="w-email" label="E-posta" error={errors.email}>
                {(a) => <input type="email" autoComplete="email" inputMode="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} {...inputProps(a)} />}
              </Field>
              <Field id="w-phone" label="Telefon" error={errors.phone}>
                {(a) => <input type="tel" autoComplete="tel" inputMode="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} {...inputProps(a)} />}
              </Field>
            </div>
            <div>
              <label className="flex items-start gap-3 text-[0.95rem]">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={errors.consent ? true : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[rgb(var(--hayb-lime))]" />
                <span>
                  <Link href="/kvkk" className="underline underline-offset-2 hover:text-lime">KVKK Aydınlatma Metni</Link>&apos;ni okudum, bilgilerimin proje talebim için kullanılmasını kabul ediyorum.
                </span>
              </label>
              {errors.consent && <p role="alert" className="mt-1.5 text-sm font-medium text-red-300">{errors.consent}</p>}
            </div>
          </div>
        )}

        {step === 4 && waUrl && (
          <div role="status" className="mt-4">
            <p className="max-w-xl text-fg-muted">
              Bilgileriniz WhatsApp&apos;ta hazırlandı; göndermek için WhatsApp&apos;ı onaylayın. Pencere açılmadıysa aşağıdaki düğmeyi kullanın. Mesajınızı aldığımızda size dönüş yapacağız.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={waUrl} external icon={<MessageCircle aria-hidden className="h-5 w-5" />}>
                WhatsApp&apos;ta Mesajı Gönder
              </Button>
              <Button href="/" variant="secondary" arrow={false}>
                Ana Sayfaya Dön
              </Button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" arrow={false} onClick={back} disabled={step === 0} icon={<ArrowLeft aria-hidden className="h-5 w-5" />}>
              Geri Dön
            </Button>
            <Button onClick={next}>{step === 3 ? 'Mesajı Hazırla' : 'Devam Et'}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
