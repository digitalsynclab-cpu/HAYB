'use client';
import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock, MessageCircle, Plus, Trash2 } from 'lucide-react';
import { Field, inputProps } from '@/components/forms/Field';
import { templates } from '@/data/templates';
import type { MinimumPackage } from '@/data/template-types';
import { templateThumb, templateUrl } from '@/data/template-paths';
import { classifyOrigin, previousPath, trackEvent } from '@/lib/analytics';
import {
  FIELD_ID,
  OTHER_PAGE,
  ORDER_STORAGE_KEY,
  PACKAGE_OPTIONS,
  PAGE_OPTIONS,
  REQUEST_PACKAGE_NOTES,
  REVIEW_STEP,
  SECTOR_SUGGESTIONS,
  SPECIAL_REQUEST_OPTIONS,
  STEPS,
  emptyOrder,
  isEcommercePackage,
  lockedMessage,
  minimumPackageLabel,
  packageLabel,
  parseStoredOrder,
  referenceList,
  selectedPages,
  selectedRequests,
  templateAvailability,
  templateBySlugSafe,
  validateAll,
  validateStep,
  websiteOrderWhatsAppUrl,
  type Errors,
  type PackageChoice,
  type Tri,
  type WebsiteOrderForm,
} from '@/lib/web-order';

/* ───────────── Küçük yapı taşları ───────────── */

interface Opt<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

/** Büyük dokunma alanlı tekli seçim (radio tabanlı: klavye ve ekran okuyucu uyumlu). */
function ChoiceGroup<T extends string>({
  id,
  legend,
  value,
  options,
  onChange,
  error,
  cols = 'grid-cols-2',
}: {
  id: string;
  legend: string;
  value: T | '';
  options: Opt<T>[];
  onChange: (v: T) => void;
  error?: string;
  cols?: string;
}) {
  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={error ? `${id}-hata` : undefined} className="min-w-0 outline-none">
      <legend className="mb-1.5 block text-[0.95rem] font-semibold">{legend}</legend>
      <div className={`grid gap-2.5 ${cols}`}>
        {options.map((o) => (
          <label key={o.value} className="relative block">
            <input type="radio" name={id} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span
              className={`flex min-h-12 items-center justify-center rounded-xl border px-3 py-2 text-center text-[0.95rem] font-semibold leading-tight transition duration-200 peer-checked:border-lime peer-checked:bg-lime/15 peer-checked:text-lime peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime hover:border-white/40 ${
                error ? 'border-red-400' : 'border-white/15'
              } bg-ink-950/60`}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-hata`} role="alert" className="mt-1.5 text-sm font-medium text-red-300">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Çoklu seçim çipi. */
function CheckChip({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="group relative block">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/60 px-4 text-[0.95rem] font-semibold transition duration-200 peer-checked:border-lime peer-checked:bg-lime/15 peer-checked:text-lime peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime hover:border-white/40">
        <Check aria-hidden className="hidden h-4 w-4 group-has-[:checked]:block" />
        {children}
      </span>
    </label>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-fg-muted">{children}</p>;
}

const triOptions: Opt<Tri>[] = [
  { value: 'yes', label: 'Evet' },
  { value: 'no', label: 'Hayır' },
  { value: 'unknown', label: 'Emin değilim' },
];

/** Hazır tasarım ızgarası: yalnızca paket veya seçim değişince yeniden çizilir (form yazarken donma yapmaz). */
const TemplatePicker = memo(function TemplatePicker({
  packageChoice,
  selectedSlug,
  onPick,
}: {
  packageChoice: PackageChoice;
  selectedSlug: string;
  onPick: (slug: string, min: MinimumPackage, locked: boolean, pkg: PackageChoice) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Hazır tasarımlar" className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      {templates.map((t) => {
        const locked = templateAvailability(t.minimumPackage, packageChoice) === 'locked';
        const selected = selectedSlug === t.slug;
        return (
          <div key={t.slug}>
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={locked || undefined}
              onClick={() => onPick(t.slug, t.minimumPackage, locked, packageChoice)}
              className={`press group block w-full overflow-hidden rounded-xl border text-left transition ${selected ? 'border-lime ring-2 ring-lime/60' : 'border-white/15 hover:border-white/40'} ${locked ? 'opacity-55' : ''}`}
            >
              <span className="relative block aspect-[900/560] overflow-hidden bg-ink-900">
                <Image src={templateThumb(t.slug)} alt={`${t.code} ${t.brand} şablonu önizlemesi`} fill sizes="(min-width:1024px) 220px, 44vw" loading="lazy" className="object-cover object-top" />
                {selected && <span aria-hidden className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-lime text-ink-950"><Check className="h-4 w-4" /></span>}
                {locked && <span aria-hidden className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white"><Lock className="h-3.5 w-3.5" /></span>}
              </span>
              <span className="block px-3 py-2.5">
                <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-lime">{t.code}</span>
                <span className="block truncate text-sm font-bold">{t.brand}</span>
                <span className="block truncate text-xs text-fg-muted">{t.sector}</span>
                {t.minimumPackage !== 'business' && <span className="mt-1 block text-[0.7rem] font-semibold text-fg-muted">{minimumPackageLabel(t.minimumPackage)} ve üzeri</span>}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
});

/* ───────────── Ana bileşen ───────────── */

export function WebsiteOrderFormView() {
  const [f, setF] = useState<WebsiteOrderForm>(emptyOrder);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<'form' | 'done'>('form');
  const [lockedNotice, setLockedNotice] = useState('');
  const [maxStep, setMaxStep] = useState(0);
  const [fromTemplate, setFromTemplate] = useState(false);

  const cardRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const completeRef = useRef(false);
  const skipWriteRef = useRef(false);
  const focusKeyRef = useRef<string | null>(null);

  /* Kayıtlı taslağı yükle + ?template= ile gelen seçimi uygula */
  useEffect(() => {
    let stored: WebsiteOrderForm | null = null;
    try {
      stored = parseStoredOrder(window.localStorage.getItem(ORDER_STORAGE_KEY));
    } catch {
      stored = null;
    }
    let next = stored ?? emptyOrder();
    const q = new URLSearchParams(window.location.search).get('template');
    if (q && templateBySlugSafe(q)) {
      next = { ...next, designMode: 'ready', templateSlug: q };
      setFromTemplate(true);
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        /* adres çubuğu güncellenemezse zararsız */
      }
    }
    skipWriteRef.current = false;
    setF(next);
    setMaxStep(next.step);
    setLoaded(true);
  }, []);

  /* Taslağı bu cihazda sakla (yalnızca form durumu; sunucuya gitmez) */
  useEffect(() => {
    if (!loaded) return;
    if (skipWriteRef.current) {
      skipWriteRef.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ ...f, updatedAt: Date.now() }));
      } catch {
        /* depolama kapalıysa form yine çalışır */
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [f, loaded]);

  /* Başka sekmede (ör. şablon galerisinde "Bu Tasarımı Kullan") yapılan değişiklik bu sekmeye yansır */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ORDER_STORAGE_KEY || !e.newValue) return;
      const p = parseStoredOrder(e.newValue);
      if (!p) return;
      skipWriteRef.current = true;
      setF((prev) => ({ ...p, step: prev.step }));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  /* Hata sonrası ilgili alana odaklan */
  useEffect(() => {
    if (!focusKeyRef.current) return;
    const id = FIELD_ID[focusKeyRef.current];
    focusKeyRef.current = null;
    const el = id ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (el as HTMLElement).focus({ preventScroll: true });
    }
  }, [errors, f.step]);

  const patch = useCallback((p: Partial<WebsiteOrderForm>) => {
    setF((prev) => ({ ...prev, ...p }));
    setErrors((prev) => {
      const n = { ...prev };
      for (const k of Object.keys(p)) delete n[k as keyof Errors];
      return n;
    });
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('order_form_start', { from: classifyOrigin(previousPath()) });
    }
  }, []);

  const pickTemplate = useCallback((slug: string, min: MinimumPackage, locked: boolean, pkg: PackageChoice) => {
    if (locked) {
      setLockedNotice(lockedMessage(min, pkg));
      return;
    }
    setLockedNotice('');
    patch({ templateSlug: slug });
    trackEvent('template_selected', { templateId: slug, package: pkg || undefined });
  }, [patch]);

  const scrollToCard = () => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 350);
  };

  const goTo = (n: number) => {
    setF((p) => ({ ...p, step: n }));
    setMaxStep((m) => Math.max(m, n));
    setLockedNotice('');
    scrollToCard();
  };

  const firstErrorKey = (e: Errors) => Object.keys(e)[0] ?? null;

  const next = () => {
    const e = validateStep(f, f.step);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      focusKeyRef.current = firstErrorKey(e);
      // Odak efektini yeniden tetiklemek için hata nesnesi yeni referans olarak atanır.
      return;
    }
    const target = f.step + 1;
    if (target === REVIEW_STEP && !completeRef.current) {
      completeRef.current = true;
      trackEvent('order_form_complete', { templateId: f.designMode === 'ready' ? f.templateSlug : undefined, package: f.packageChoice || undefined, designMode: f.designMode || undefined });
    }
    goTo(target);
  };

  const send = () => {
    const { errors: all, firstStep } = validateAll(f);
    if (firstStep !== null) {
      setErrors(all);
      focusKeyRef.current = firstErrorKey(all);
      if (firstStep !== f.step) goTo(firstStep);
      return;
    }
    const url = websiteOrderWhatsAppUrl(f);
    trackEvent('whatsapp_click', { location: 'web_order', templateId: f.designMode === 'ready' ? f.templateSlug : undefined, package: f.packageChoice || undefined, designMode: f.designMode || undefined });
    setPhase('done');
    // Kullanıcı dokunuşuyla açılır; engellenirse sonuç ekranındaki gerçek bağlantı kullanılır.
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (phase !== 'done') return;
    window.scrollTo({ top: Math.max(0, (headingRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 140), behavior: 'smooth' });
    headingRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const clearDraft = () => {
    try {
      window.localStorage.removeItem(ORDER_STORAGE_KEY);
    } catch {
      /* yok say */
    }
    skipWriteRef.current = true;
    setF(emptyOrder());
    setErrors({});
    setMaxStep(0);
    setPhase('form');
    setFromTemplate(false);
    startedRef.current = false;
    completeRef.current = false;
    scrollToCard();
  };

  const notes = f.specialRequests.filter((r) => REQUEST_PACKAGE_NOTES[r] && !(r === 'Online Ödeme' && isEcommercePackage(f.packageChoice))).map((r) => REQUEST_PACKAGE_NOTES[r]);
  const tpl = f.designMode === 'ready' ? templateBySlugSafe(f.templateSlug) : undefined;
  const step = STEPS[f.step];
  const isLast = f.step === REVIEW_STEP;

  /* ───────────── Sonuç ekranı ───────────── */
  if (phase === 'done') {
    const url = websiteOrderWhatsAppUrl(f);
    return (
      <div role="status" className="mx-auto max-w-2xl rounded-card border border-white/12 bg-ink-900 p-6 text-center shadow-glass sm:p-9">
        <span aria-hidden className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-ink-950">
          <Check className="h-7 w-7" />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-extrabold outline-none">
          Bilgiler hazır.
        </h2>
        <p className="mt-2 text-fg-muted">
          Proje bilgileriniz hazırlandı. Şimdi WhatsApp üzerinden HAYB’ye iletebilirsiniz. Mesajı WhatsApp içinde <strong className="text-fg">Gönder</strong>’e basarak tamamlarsınız.
        </p>
        <div className="mt-6 grid gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-track-skip
            onClick={() => trackEvent('whatsapp_click', { location: 'web_order_retry' })}
            className="press inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 hover:bg-lime-soft"
          >
            <MessageCircle aria-hidden className="h-5 w-5" /> WhatsApp ile Gönder <ArrowRight aria-hidden className="h-5 w-5" />
          </a>
          <button type="button" onClick={() => { setPhase('form'); goTo(REVIEW_STEP); }} className="press min-h-11 rounded-xl px-5 text-sm font-semibold text-fg-muted hover:text-fg">
            Bilgileri düzenle
          </button>
        </div>
        <p className="mt-4 text-sm text-fg-muted">WhatsApp açılmadıysa yukarıdaki düğmeye dokunun.</p>
      </div>
    );
  }

  /* ───────────── Form ───────────── */
  return (
    <div className="mx-auto max-w-3xl">
      {/* Gerçek ilerleme göstergesi: yalnızca adım sayısı */}
      <nav aria-label="Form adımları" className="mb-5">
        <ol className="flex items-center gap-1.5 sm:gap-2">
          {STEPS.map((s, i) => {
            const reachable = i <= maxStep && i !== f.step;
            const state = i === f.step ? 'current' : i < f.step ? 'done' : 'todo';
            return (
              <li key={s.id} className="flex flex-1 items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  disabled={!reachable}
                  onClick={() => goTo(i)}
                  aria-current={state === 'current' ? 'step' : undefined}
                  aria-label={`${i + 1}. adım: ${s.label}`}
                  className={`press grid h-9 min-w-9 place-items-center rounded-full border text-xs font-extrabold tabular-nums transition sm:h-10 sm:min-w-10 ${
                    state === 'current'
                      ? 'border-lime bg-lime text-ink-950'
                      : state === 'done'
                        ? 'border-lime/60 bg-lime/15 text-lime hover:bg-lime/25'
                        : 'border-white/15 text-fg-muted'
                  } ${reachable ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {state === 'done' ? <Check aria-hidden className="h-4 w-4" /> : String(i + 1).padStart(2, '0')}
                </button>
                {i < STEPS.length - 1 && <span aria-hidden className={`h-px flex-1 ${i < f.step ? 'bg-lime/60' : 'bg-white/15'}`} />}
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-sm text-fg-muted" aria-live="polite">
          <span className="font-semibold text-fg tabular-nums">{String(f.step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span> · {step.label}
        </p>
      </nav>

      {fromTemplate && tpl && (
        <p className="mb-4 rounded-xl border border-lime/40 bg-lime/10 px-4 py-3 text-sm">
          Seçtiğiniz tasarım: <strong>{tpl.code} · {tpl.brand}</strong>. Değiştirmek için “Tasarım” adımına gidebilirsiniz.
        </p>
      )}

      <form
        ref={cardRef}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (isLast) send();
          else next();
        }}
        className="rounded-card border border-white/12 bg-ink-900 p-5 shadow-glass sm:p-8"
      >
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-extrabold tracking-tight outline-none sm:text-2xl">
          {step.title}
        </h2>

        <div className="mt-5 space-y-5">
          {f.step === 0 && (
            <>
              <Field id="wo-businessName" label="İşletme / Marka Adı *" error={errors.businessName}>
                {(a) => <input type="text" autoComplete="organization" maxLength={120} placeholder="Örn. HAYB Dijital Sistemler" value={f.businessName} onChange={(e) => patch({ businessName: e.target.value })} {...inputProps(a)} />}
              </Field>
              <Field id="wo-sector" label="Sektör *" error={errors.sector} hint="Listeden seçebilir ya da kendiniz yazabilirsiniz.">
                {(a) => (
                  <>
                    <input type="text" list="wo-sector-list" maxLength={80} placeholder="Örn. Restoran, Hukuk, E-ticaret" value={f.sector} onChange={(e) => patch({ sector: e.target.value })} {...inputProps(a)} />
                    <datalist id="wo-sector-list">
                      {SECTOR_SUGGESTIONS.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </>
                )}
              </Field>
              <Field id="wo-businessDescription" label="Kısaca ne iş yapıyorsunuz? *" error={errors.businessDescription}>
                {(a) => <textarea rows={3} maxLength={500} placeholder="Örn. Bursa'da özel üretim mobilya ve iç dekorasyon hizmetleri sunuyoruz." value={f.businessDescription} onChange={(e) => patch({ businessDescription: e.target.value })} {...inputProps(a)} className={`${a.className} min-h-28 py-3`} />}
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="wo-phone" label="İletişim Telefonu *" error={errors.phone}>
                  {(a) => <input type="tel" autoComplete="tel" inputMode="tel" maxLength={25} placeholder="05xx xxx xx xx" value={f.phone} onChange={(e) => patch({ phone: e.target.value })} {...inputProps(a)} />}
                </Field>
                <Field id="wo-email" label="E-posta *" error={errors.email}>
                  {(a) => <input type="email" autoComplete="email" inputMode="email" maxLength={120} placeholder="ornek@mail.com" value={f.email} onChange={(e) => patch({ email: e.target.value })} {...inputProps(a)} />}
                </Field>
              </div>
              <details className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" open={Boolean(f.whatsapp || f.address || errors.whatsapp)}>
                <summary className="cursor-pointer select-none text-[0.95rem] font-semibold">İsteğe bağlı: WhatsApp numarası ve adres</summary>
                <div className="mt-4 space-y-5">
                  <Field id="wo-whatsapp" label="WhatsApp Numaranız" error={errors.whatsapp}>
                    {(a) => <input type="tel" autoComplete="tel" inputMode="tel" maxLength={25} placeholder="05xx xxx xx xx" value={f.whatsapp} onChange={(e) => patch({ whatsapp: e.target.value })} {...inputProps(a)} />}
                  </Field>
                  <Field id="wo-address" label="İşletme Adresi">
                    {(a) => <input type="text" autoComplete="street-address" maxLength={160} placeholder="Örn. Nilüfer / Bursa" value={f.address} onChange={(e) => patch({ address: e.target.value })} {...inputProps(a)} />}
                  </Field>
                </div>
              </details>
            </>
          )}

          {f.step === 1 && (
            <>
              <ChoiceGroup
                id="wo-hasWebsite"
                legend="Mevcut web siteniz var mı? *"
                value={f.hasWebsite}
                options={[{ value: 'yes', label: 'Var' }, { value: 'no', label: 'Yok' }]}
                onChange={(v) => patch({ hasWebsite: v })}
                error={errors.hasWebsite}
              />
              {f.hasWebsite === 'yes' && (
                <Field id="wo-websiteUrl" label="Mevcut web sitesi adresiniz">
                  {(a) => <input type="text" inputMode="url" autoComplete="url" maxLength={160} placeholder="https://..." value={f.websiteUrl} onChange={(e) => patch({ websiteUrl: e.target.value })} {...inputProps(a)} />}
                </Field>
              )}
              <ChoiceGroup id="wo-hasDomain" legend="Alan adınız (domain) var mı? *" value={f.hasDomain} options={triOptions} onChange={(v) => patch({ hasDomain: v })} error={errors.hasDomain} cols="grid-cols-3" />
              {f.hasDomain === 'yes' && (
                <Field id="wo-domain" label="Domain adresiniz">
                  {(a) => <input type="text" inputMode="url" maxLength={120} placeholder="example.com" value={f.domain} onChange={(e) => patch({ domain: e.target.value })} {...inputProps(a)} />}
                </Field>
              )}
              {f.hasDomain === 'no' && <Hint>Domaininiz yoksa sorun değil. Proje sürecinde uygun alan adını birlikte belirleyebiliriz.</Hint>}
              <ChoiceGroup id="wo-hasHosting" legend="Hostinginiz var mı?" value={f.hasHosting} options={triOptions} onChange={(v) => patch({ hasHosting: v })} cols="grid-cols-3" />
              {f.hasHosting === 'yes' && (
                <Field id="wo-hostingProvider" label="Hosting sağlayıcınız">
                  {(a) => <input type="text" maxLength={80} placeholder="Vercel / Hostinger / Turhost / vb." value={f.hostingProvider} onChange={(e) => patch({ hostingProvider: e.target.value })} {...inputProps(a)} />}
                </Field>
              )}
              <Hint>Şifre, cPanel veya hesap bilgisi istemiyoruz ve bu formda toplamıyoruz. Gerekirse proje sürecinde güvenli yöntemle alınır.</Hint>
            </>
          )}

          {f.step === 2 && (
            <>
              <fieldset>
                <legend className="mb-2 block text-[0.95rem] font-semibold">Hangi sayfalar olsun? (istediğinizi işaretleyin)</legend>
                <div className="flex flex-wrap gap-2.5">
                  {[...PAGE_OPTIONS, OTHER_PAGE].map((p) => (
                    <CheckChip key={p} checked={f.pages.includes(p)} onChange={() => patch({ pages: f.pages.includes(p) ? f.pages.filter((x) => x !== p) : [...f.pages, p] })}>
                      {p}
                    </CheckChip>
                  ))}
                </div>
              </fieldset>
              {f.pages.includes(OTHER_PAGE) && (
                <Field id="wo-pagesOther" label="Diğer sayfalar">
                  {(a) => <input type="text" maxLength={120} placeholder="Örn. Kariyer, Basın" value={f.pagesOther} onChange={(e) => patch({ pagesOther: e.target.value })} {...inputProps(a)} />}
                </Field>
              )}
              <Field id="wo-services" label="Hizmetleriniz / ürünleriniz" hint="Web sitenizde yer almasını istediğiniz hizmet veya ürünleri kısaca yazabilirsiniz. Her satıra bir tane.">
                {(a) => <textarea rows={4} maxLength={600} placeholder={'Web tasarım\nSEO\nSosyal medya\nKurumsal danışmanlık'} value={f.services} onChange={(e) => patch({ services: e.target.value })} {...inputProps(a)} className={`${a.className} min-h-32 py-3`} />}
              </Field>
            </>
          )}

          {f.step === 3 && (
            <>
              <ChoiceGroup id="wo-hasLogo" legend="Logonuz var mı?" value={f.hasLogo} options={[{ value: 'yes', label: 'Var' }, { value: 'no', label: 'Yok' }]} onChange={(v) => patch({ hasLogo: v })} />
              <Hint>Logo, fotoğraf ve ürün görselleriniz gibi dosyalarınız ayrıca proje sürecinde tarafımıza iletilebilir.</Hint>

                <ChoiceGroup
                  id="wo-package"
                  legend="Hangi paketi düşünüyorsunuz?"
                  value={f.packageChoice}
                  options={[...PACKAGE_OPTIONS.map((p) => ({ value: p.id as PackageChoice, label: p.label })), { value: 'unknown' as PackageChoice, label: 'Henüz karar vermedim' }]}
                  onChange={(v) => { patch({ packageChoice: v }); setLockedNotice(''); }}
                  cols="grid-cols-2 sm:grid-cols-3"
                />
                <Hint>Hazır tasarımlar Business ve üzeri paketlerde kullanılabilir; Starter pakette seçilemez. Online ödeme için e-ticaret paketi gerekir. Paketleri ve kapsamı <Link href="/paketler#web" target="_blank" rel="noopener" className="font-semibold text-lime underline underline-offset-2">Paketler sayfasında</Link> inceleyebilirsiniz.</Hint>


              <ChoiceGroup
                id="wo-designMode"
                legend="Hazır tasarım kullanmak ister misiniz?"
                value={f.designMode}
                options={[{ value: 'custom', label: 'Hayır, özel tasarım istiyorum' }, { value: 'ready', label: 'Evet, hazır tasarım seçmek istiyorum' }]}
                onChange={(v) => patch({ designMode: v, ...(v === 'custom' ? { templateSlug: '' } : {}) })}
              />

              {f.designMode === 'ready' && (
                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  {tpl && (
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-lime/40 bg-lime/10 px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">Seçili tasarım</p>
                        <p className="font-bold">{tpl.code} · {tpl.brand}</p>
                      </div>
                      <button type="button" onClick={() => patch({ templateSlug: '' })} className="press min-h-10 rounded-lg border border-white/25 px-4 text-sm font-semibold hover:border-lime hover:text-lime">
                        Değiştir
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p id="wo-templates" tabIndex={-1} className="text-[0.95rem] font-semibold outline-none">Hazır tasarım seçin</p>
                    <a href="/template" target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm font-semibold hover:border-lime hover:text-lime">
                      Tasarımları Gör <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </a>
                  </div>
                  {errors.templateSlug && <p role="alert" className="text-sm font-medium text-red-300">{errors.templateSlug}</p>}

                  <TemplatePicker packageChoice={f.packageChoice} selectedSlug={f.templateSlug} onPick={pickTemplate} />
                  <p role="status" className="min-h-5 text-sm font-medium text-fg-muted">
                    {lockedNotice && (
                      <>
                        {lockedNotice}{' '}
                        <Link href="/paketler#web" target="_blank" rel="noopener" className="font-semibold text-lime underline underline-offset-2">Paketi İncele →</Link>
                      </>
                    )}
                  </p>
                </div>
              )}

              <fieldset>
                <legend className="mb-1.5 block text-[0.95rem] font-semibold">Beğendiğiniz web siteleri var mı?</legend>
                <div className="space-y-2.5">
                  {f.referenceWebsites.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="url"
                        aria-label={`Örnek web sitesi ${i + 1}`}
                        maxLength={160}
                        placeholder="Örnek web sitesi linki"
                        value={r}
                        onChange={(e) => patch({ referenceWebsites: f.referenceWebsites.map((x, j) => (j === i ? e.target.value : x)) })}
                        className="min-h-12 w-full rounded-xl border border-white/15 bg-ink-950/60 px-4 text-base text-fg placeholder:text-fg-muted/70 transition focus:border-lime"
                      />
                      {f.referenceWebsites.length > 1 && (
                        <button type="button" aria-label={`Örnek ${i + 1} sil`} onClick={() => patch({ referenceWebsites: f.referenceWebsites.filter((_, j) => j !== i) })} className="press grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/15 text-fg-muted hover:border-red-300 hover:text-red-300">
                          <Trash2 aria-hidden className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {f.referenceWebsites.length < 5 && (
                  <button type="button" onClick={() => patch({ referenceWebsites: [...f.referenceWebsites, ''] })} className="press mt-2.5 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm font-semibold hover:border-lime hover:text-lime">
                    <Plus aria-hidden className="h-4 w-4" /> Başka bir örnek ekle
                  </button>
                )}
              </fieldset>
            </>
          )}

          {f.step === 4 && (
            <>
              <Field id="wo-specialOther" label="Web sitenizde özellikle istediğiniz bir şey var mı?" hint="Aşağıdaki hızlı seçimleri işaretleyebilir, kendi isteğinizi de yazabilirsiniz.">
                {(a) => <textarea rows={3} maxLength={500} placeholder="Örn. WhatsApp butonu, online randevu, teklif formu, ürün kataloğu, ödeme sistemi, çoklu dil vb." value={f.specialOther} onChange={(e) => patch({ specialOther: e.target.value, specialRequests: e.target.value.trim() && !f.specialRequests.includes('Özel Bir İstek') ? [...f.specialRequests, 'Özel Bir İstek'] : f.specialRequests })} {...inputProps(a)} className={`${a.className} min-h-28 py-3`} />}
              </Field>
              <fieldset>
                <legend className="sr-only">Hızlı seçimler</legend>
                <div className="flex flex-wrap gap-2.5">
                  {SPECIAL_REQUEST_OPTIONS.map((o) => (
                    <CheckChip key={o} checked={f.specialRequests.includes(o)} onChange={() => patch({ specialRequests: f.specialRequests.includes(o) ? f.specialRequests.filter((x) => x !== o) : [...f.specialRequests, o] })}>
                      {o}
                    </CheckChip>
                  ))}
                </div>
              </fieldset>
              {notes.length > 0 && (
                <Hint>
                  {notes.join(' ')} Ayrıntılar için{' '}
                  <Link href="/paketler#web" target="_blank" rel="noopener" className="font-semibold text-lime underline underline-offset-2">Paketler sayfasına</Link> bakabilirsiniz.
                </Hint>
              )}
              <Field id="wo-additionalNotes" label="Bize eklemek istediğiniz başka bir şey var mı? (isteğe bağlı)">
                {(a) => <textarea rows={3} maxLength={800} placeholder="Aklınıza gelen her şeyi yazabilirsiniz." value={f.additionalNotes} onChange={(e) => patch({ additionalNotes: e.target.value })} {...inputProps(a)} className={`${a.className} min-h-28 py-3`} />}
              </Field>
            </>
          )}

          {isLast && <ReviewCards f={f} onEdit={goTo} tplLabel={tpl ? `${tpl.code} — ${tpl.brand}` : ''} tplUrl={tpl ? templateUrl(tpl.slug) : ''} />}

          {isLast && (
            <div id="wo-consent" tabIndex={-1} className="outline-none">
              <label className="flex items-start gap-3 text-[0.95rem]">
                <input type="checkbox" checked={f.consent} onChange={(e) => patch({ consent: e.target.checked })} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? 'wo-consent-hata' : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[rgb(var(--hayb-lime))]" />
                <span>
                  <Link href="/kvkk" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-lime">KVKK Aydınlatma Metni</Link>
                  ’ni okudum, bilgilerimin web sitesi proje talebim için kullanılmasını kabul ediyorum.
                </span>
              </label>
              {errors.consent && <p id="wo-consent-hata" role="alert" className="mt-1.5 text-sm font-medium text-red-300">{errors.consent}</p>}
            </div>
          )}
        </div>

        {/* Gezinme: ekranı kaplamayan, kartın altında satır içi */}
        <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          {f.step > 0 ? (
            <button type="button" onClick={() => goTo(f.step - 1)} className="press inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 px-5 font-semibold hover:border-lime hover:text-lime">
              <ArrowLeft aria-hidden className="h-4 w-4" /> Geri
            </button>
          ) : (
            <span />
          )}
          {isLast ? (
            <button type="submit" className="press group inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-lime px-5 text-base font-semibold text-ink-950 transition hover:bg-lime-soft sm:flex-none sm:px-7">
              <MessageCircle aria-hidden className="h-5 w-5" /> WhatsApp ile Siparişi Gönder <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button type="submit" className="press group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-lime px-6 text-base font-semibold text-ink-950 transition hover:bg-lime-soft">
              Devam Et <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
        {isLast && <p className="mt-3 text-sm text-fg-muted">Bilgilerinizi WhatsApp üzerinden HAYB’ye ileteceksiniz. Mesaj hazır gelir; WhatsApp içinde <strong className="text-fg">Gönder</strong>’e basmanız gerekir.</p>}
      </form>

      <p className="mt-4 text-center text-xs text-fg-muted">
        Girdiğiniz bilgiler yalnızca bu cihazda taslak olarak saklanır ve sunucumuza gönderilmez.{' '}
        <button type="button" onClick={clearDraft} className="font-semibold underline underline-offset-2 hover:text-lime">
          Taslağı sil
        </button>
      </p>
    </div>
  );
}

/* ───────────── Özet kartları ───────────── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd className="min-w-0 break-words text-[0.95rem] font-semibold">{value || <span className="font-normal text-fg-muted">Belirtilmedi</span>}</dd>
    </div>
  );
}

function ReviewCard({ title, step, onEdit, children }: { title: string; step: number; onEdit: (n: number) => void; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-lime">{title}</h3>
        <button type="button" onClick={() => onEdit(step)} className="press min-h-9 rounded-lg border border-white/20 px-3 text-sm font-semibold hover:border-lime hover:text-lime">
          Düzenle
        </button>
      </div>
      <dl className="space-y-2">{children}</dl>
    </section>
  );
}

const triLabel = (v: Tri | '') => (v === 'yes' ? 'Var' : v === 'no' ? 'Yok' : v === 'unknown' ? 'Emin değilim' : '');

function ReviewCards({ f, onEdit, tplLabel, tplUrl }: { f: WebsiteOrderForm; onEdit: (n: number) => void; tplLabel: string; tplUrl: string }) {
  const pages = useMemo(() => selectedPages(f), [f]);
  const reqs = useMemo(() => selectedRequests(f), [f]);
  const refs = useMemo(() => referenceList(f), [f]);
  const tpl = f.designMode === 'ready' ? templateBySlugSafe(f.templateSlug) : undefined;
  const needsPackageNote = tpl && templateAvailability(tpl.minimumPackage, f.packageChoice) === 'unknown';
  return (
    <div className="space-y-3">
      <ReviewCard title="İşletme" step={0} onEdit={onEdit}>
        <Row label="Ad" value={f.businessName} />
        <Row label="Sektör" value={f.sector} />
        <Row label="Tanım" value={f.businessDescription} />
      </ReviewCard>
      <ReviewCard title="İletişim" step={0} onEdit={onEdit}>
        <Row label="Telefon" value={f.phone} />
        <Row label="E-posta" value={f.email} />
        {f.whatsapp && <Row label="WhatsApp" value={f.whatsapp} />}
        {f.address && <Row label="Adres" value={f.address} />}
      </ReviewCard>
      <ReviewCard title="Web Sitesi ve Domain" step={1} onEdit={onEdit}>
        <Row label="Mevcut site" value={f.hasWebsite === 'yes' ? f.websiteUrl || 'Var' : f.hasWebsite === 'no' ? 'Yok' : ''} />
        <Row label="Domain" value={f.hasDomain === 'yes' && f.domain ? `Var — ${f.domain}` : triLabel(f.hasDomain)} />
        <Row label="Hosting" value={f.hasHosting === 'yes' && f.hostingProvider ? `Var — ${f.hostingProvider}` : triLabel(f.hasHosting)} />
      </ReviewCard>
      <ReviewCard title="Sayfalar ve İçerik" step={2} onEdit={onEdit}>
        <Row label="Sayfalar" value={pages.join(', ')} />
        <Row label="Hizmet / ürün" value={f.services.split(/\n|,/).map((s) => s.trim()).filter(Boolean).join(', ')} />
      </ReviewCard>
      <ReviewCard title="Tasarım" step={3} onEdit={onEdit}>
        <Row label="Logo" value={f.hasLogo === 'yes' ? 'Var' : f.hasLogo === 'no' ? 'Yok' : ''} />
        <Row label="Tercih" value={f.designMode === 'ready' ? 'Hazır tasarım' : f.designMode === 'custom' ? 'Özel tasarım' : ''} />
        {f.designMode === 'ready' && <Row label="Paket" value={f.packageChoice === 'unknown' ? 'Henüz karar verilmedi' : f.packageChoice ? packageLabel(f.packageChoice) : ''} />}
        {f.designMode === 'ready' && <Row label="Seçilen tasarım" value={tplLabel} />}
        {tplUrl && <Row label="Adres" value={tplUrl} />}
        {needsPackageNote && tpl && <p className="text-sm text-fg-muted">Bu tasarım {minimumPackageLabel(tpl.minimumPackage)} paket ve üzeri projelerde kullanılabilir.</p>}
        {refs.length > 0 && <Row label="Referans siteler" value={refs.join(', ')} />}
      </ReviewCard>
      <ReviewCard title="Özel İstekler" step={4} onEdit={onEdit}>
        <Row label="İstekler" value={reqs.join(', ')} />
        {f.additionalNotes && <Row label="Ek not" value={f.additionalNotes} />}
      </ReviewCard>
    </div>
  );
}
