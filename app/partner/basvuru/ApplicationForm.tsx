'use client';

import { startTransition, useActionState, useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Field, inputProps } from '@/components/forms/Field';
import { Checkbox } from '@/components/forms/Checkbox';
import { WizardSteps, type WizardStepDef } from '@/components/ui/WizardSteps';
import { turkeyCities } from '@/data/turkey-locations';
import { submitPartnerApplicationAction, type SubmitResult } from './actions';

const SERVICE_OPTIONS = [
  'Web Sitesi',
  'E-Ticaret',
  'Özel Yazılım',
  'Yönetim Paneli',
  'UI/UX Tasarım',
  'Mobil Uygulama',
  'Yapay Zeka',
  'Sosyal Medya',
  'Marka Tasarımı',
  'Google & Meta Reklamları',
];

const initial: SubmitResult = { ok: false };

const textareaCls = 'min-h-24 w-full rounded-xl border border-white/15 bg-ink-950/60 px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 transition focus:border-lime';
const selectCls = 'min-h-12 w-full rounded-xl border border-white/15 bg-ink-950/60 px-4 text-base text-fg transition focus:border-lime';

/** Hangi step, hangi form alanlarını içeriyor — hata dönünce kullanıcıyı ilgili adıma götürmek için. */
const STEP_FIELDS = [
  ['fullName', 'phone', 'email', 'password', 'city', 'district'],
  ['occupation', 'employmentStatus'],
  ['motivation', 'targetCustomerGroups', 'interestedServices'],
  [],
  ['kvkkConsent', 'termsConsent'],
];

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [state, formAction, pending] = useActionState(submitPartnerApplicationAction, initial);
  const errors = useMemo(() => state.fieldErrors || {}, [state.fieldErrors]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const districts = turkeyCities.find((c) => c.name === selectedCity)?.districts ?? [];

  const goToStep = (i: number) => {
    setStep(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sunucudan hata dönünce, hatanın olduğu ilk adıma otomatik geç (aksi halde hata görünmeyen bir adımda "donmuş" gibi görünür).
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 0) return;
    const firstStepWithError = STEP_FIELDS.findIndex((fields) => fields.some((f) => errorKeys.includes(f)));
    if (firstStepWithError >= 0 && firstStepWithError !== step) goToStep(firstStepWithError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const steps: WizardStepDef[] = [
    {
      id: 'kisisel',
      label: 'Kişisel Bilgiler',
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="fullName" label="Ad Soyad" error={errors.fullName}>
            {(a) => <input {...inputProps(a)} name="fullName" required className={a.className} />}
          </Field>
          <Field id="phone" label="Telefon" error={errors.phone}>
            {(a) => (
              <div className="flex overflow-hidden rounded-xl border border-white/15 bg-ink-950/60 transition focus-within:border-lime">
                <span className="flex items-center border-r border-white/15 px-3 text-base text-fg-muted">+90</span>
                <input
                  {...inputProps(a)}
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="5XX XXX XX XX"
                  onInput={(e) => {
                    // "05XX..." yazan kullanıcılar için baştaki 0 otomatik atılır (+90 zaten sabit prefix).
                    // NOT: native `maxLength` attribute'u kasten kullanılmıyor — tarayıcı onu onInput'tan
                    // ÖNCE ham değere uygular ve baştaki 0 henüz silinmeden son haneyi keser.
                    const digits = e.currentTarget.value.replace(/\D/g, '').replace(/^0+/, '');
                    e.currentTarget.value = digits.slice(0, 10);
                  }}
                  className={`${a.className} border-0 bg-transparent`}
                />
              </div>
            )}
          </Field>
          <Field id="email" label="E-posta" error={errors.email}>
            {(a) => <input {...inputProps(a)} name="email" type="email" required className={a.className} />}
          </Field>
          <Field id="password" label="Şifre" hint="Partner panelinize giriş için." error={errors.password}>
            {(a) => (
              <div className="relative">
                <input
                  {...inputProps(a)}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  minLength={8}
                  required
                  className={`${a.className} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-fg-muted hover:text-fg"
                >
                  {showPassword ? <EyeOff aria-hidden className="h-5 w-5" /> : <Eye aria-hidden className="h-5 w-5" />}
                </button>
              </div>
            )}
          </Field>
          <Field id="city" label="Şehir" error={errors.city}>
            {(a) => (
              <select
                {...inputProps(a)}
                name="city"
                required
                className={selectCls}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {turkeyCities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field id="district" label="İlçe">
            {(a) => (
              <select {...inputProps(a)} name="district" disabled={!districts.length} className={selectCls}>
                <option value="">Seçiniz</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      ),
    },
    {
      id: 'profesyonel',
      label: 'Profesyonel Bilgiler',
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="occupation" label="Meslek" error={errors.occupation}>
            {(a) => <input {...inputProps(a)} name="occupation" required className={a.className} />}
          </Field>
          <Field id="employmentStatus" label="Çalışma Durumu" error={errors.employmentStatus}>
            {(a) => <input {...inputProps(a)} name="employmentStatus" placeholder="Ör. Serbest, Tam zamanlı, Öğrenci" required className={a.className} />}
          </Field>
          <div className="sm:col-span-2">
            <Checkbox name="hasCompany" value="true" label="Bir şirketim var" />
          </div>
          <Field id="companyName" label="Şirket Adı (varsa)">
            {(a) => <input {...inputProps(a)} name="companyName" className={a.className} />}
          </Field>
          <Field id="website" label="Web Sitesi (varsa)">
            {(a) => <input {...inputProps(a)} name="website" className={a.className} />}
          </Field>
          <Field id="instagram" label="Instagram (varsa)">
            {(a) => <input {...inputProps(a)} name="instagram" className={a.className} />}
          </Field>
          <Field id="linkedin" label="LinkedIn (varsa)">
            {(a) => <input {...inputProps(a)} name="linkedin" className={a.className} />}
          </Field>
          <Field id="salesExperience" label="Satış / Pazarlama Deneyimi">
            {(a) => <input {...inputProps(a)} name="salesExperience" className={a.className} />}
          </Field>
        </div>
      ),
    },
    {
      id: 'motivasyon',
      label: 'Motivasyon',
      content: (
        <div className="space-y-4">
          <Field id="motivation" label="Neden HAYB Partner olmak istiyorsunuz?" error={errors.motivation}>
            {(a) => <textarea {...inputProps(a)} name="motivation" required className={textareaCls} />}
          </Field>
          <Field id="targetCustomerGroups" label="HAYB hizmetlerini hangi müşteri gruplarına sunabilirsiniz?" error={errors.targetCustomerGroups}>
            {(a) => <textarea {...inputProps(a)} name="targetCustomerGroups" required className={textareaCls} />}
          </Field>
          <Checkbox name="hasSalesExperienceBefore" value="true" label="Daha önce satış/pazarlama yaptım" />
          <Field id="sectorsConnected" label="Hangi sektörlerde bağlantılarınız var?">
            {(a) => <input {...inputProps(a)} name="sectorsConnected" className={a.className} />}
          </Field>
          <Field id="estimatedReach" label="Ortalama kaç potansiyel müşteriye ulaşabilirsiniz?">
            {(a) => <input {...inputProps(a)} name="estimatedReach" className={a.className} />}
          </Field>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">HAYB’den hangi hizmetleri sunmakla ilgileniyorsunuz?</legend>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <label key={s} className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-fg-muted has-[:checked]:border-lime has-[:checked]:text-lime">
                  <input type="checkbox" name="interestedServices" value={s} className="h-3.5 w-3.5 accent-lime" />
                  {s}
                </label>
              ))}
            </div>
            {errors.interestedServices && <p className="mt-2 text-sm font-medium text-red-300">{errors.interestedServices}</p>}
          </fieldset>
        </div>
      ),
    },
    {
      id: 'deneyim',
      label: 'Deneyim',
      content: (
        <div className="space-y-4">
          <Field id="previousProducts" label="Daha önce sattığınız ürün/hizmetler">
            {(a) => <textarea {...inputProps(a)} name="previousProducts" className={textareaCls} />}
          </Field>
          <Field id="digitalExperience" label="Dijital hizmet deneyiminiz">
            {(a) => <textarea {...inputProps(a)} name="digitalExperience" className={textareaCls} />}
          </Field>
          <Field id="customerPortfolio" label="Müşteri portföyünüz">
            {(a) => <textarea {...inputProps(a)} name="customerPortfolio" className={textareaCls} />}
          </Field>
          <Field id="additionalInfo" label="Eklemek istediğiniz bilgi">
            {(a) => <textarea {...inputProps(a)} name="additionalInfo" className={textareaCls} />}
          </Field>
        </div>
      ),
    },
    {
      id: 'onay',
      label: 'Onay',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-fg-muted">Başvurunuzu göndermeden önce lütfen aşağıdakileri onaylayın.</p>
          <Checkbox
            name="kvkkConsent"
            value="true"
            required
            label={
              <>
                <a href="/kvkk" target="_blank" className="text-lime underline">
                  KVKK Aydınlatma Metni
                </a>
                ’ni okudum.
              </>
            }
          />
          {errors.kvkkConsent && <p className="text-sm font-medium text-red-300">{errors.kvkkConsent}</p>}
          <Checkbox
            name="termsConsent"
            value="true"
            required
            label="Başvuru koşullarını ve komisyonun yalnızca gerçekleşen satıştan doğacağını kabul ediyorum."
          />
          {errors.termsConsent && <p className="text-sm font-medium text-red-300">{errors.termsConsent}</p>}
        </div>
      ),
    },
  ];

  return (
    <form
      noValidate
      onSubmit={(e) => {
        // ÖNEMLİ: <form action={formAction}> native progressive-enhancement submit'i bazı tarayıcı/
        // ortamlarda aynı tıklama için formAction'ı İKİ KEZ tetikliyordu (ikinci çağrı boş FormData ile
        // geliyor ve asıl sonucu eziyordu). Bunun yerine submit'i burada manuel, TEK SEFER tetikliyoruz.
        e.preventDefault();
        // useActionState'in dispatch fonksiyonu yalnızca <form action> üzerinden veya startTransition
        // içinde çağrılabilir; doğrudan çağırmak "rendered more hooks" çökmesine yol açar.
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
    >
      {/*
        noValidate: Tüm adımlar her zaman DOM'da (bkz. WizardSteps), yalnızca CSS ile gizleniyor.
        Tarayıcının native form doğrulaması (required/pattern) gizli (display:none) bir adımdaki alanı
        geçersiz bulursa ona odaklanmaya çalışır, "not focusable" hatası verir ve gönderim sessizce
        iptal olur. Doğrulama tamamen server-side zod (submitPartnerApplicationAction) + yukarıdaki
        "hatalı adıma otomatik git" mekanizmasına bırakılmıştır.
      */}
      {state.error && (
        <p className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm font-medium text-red-300">{state.error}</p>
      )}
      <WizardSteps
        steps={steps}
        index={step}
        onIndexChange={goToStep}
        nextLabel="Devam Et"
        finishLabel={pending ? 'Gönderiliyor…' : 'Başvuruyu Gönder'}
        canAdvance={!pending}
      />
    </form>
  );
}
