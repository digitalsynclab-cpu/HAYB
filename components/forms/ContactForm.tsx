'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageCircle } from 'lucide-react';
import { contactSchema, projectTypes, type ContactFormData } from '@/lib/contact-schema';
import { buildContactMessage } from '@/lib/messages';
import { whatsappUrl } from '@/data/site';
import { Field, inputProps } from '@/components/forms/Field';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactFormData) => {
    const url = whatsappUrl(buildContactMessage(data));
    setWaUrl(url);
    // Tarayıcı engellerse kullanıcı aşağıdaki gerçek bağlantıyı kullanır.
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (waUrl) {
    return (
      <div role="status" className="border border-white/12 bg-ink-900 shadow-glass rounded-card p-6 text-center sm:p-8">
        <h2 className="text-2xl font-bold">Mesajınız hazır</h2>
        <p className="mt-3 text-fg-muted">
          Bilgileriniz WhatsApp&apos;ta hazırlandı. Göndermek için WhatsApp&apos;ı onaylayın. Açılmadıysa aşağıdaki düğmeye basın.
        </p>
        <Button href={waUrl} external className="mt-6 w-full" icon={<MessageCircle aria-hidden className="h-5 w-5" />}>
          WhatsApp&apos;ta Mesajı Gönder
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-white/12 bg-ink-900 shadow-glass space-y-4 rounded-card p-5 sm:p-7" aria-labelledby="form-baslik">
      <div>
        <h2 id="form-baslik" className="text-2xl font-bold">
          Bize yazın
        </h2>
        <p className="mt-1 text-fg-muted">Mesajınız WhatsApp üzerinden bize iletilir.</p>
      </div>

      <Field id="fullName" label="Ad Soyad" error={errors.fullName?.message}>
        {(a) => <input type="text" autoComplete="name" placeholder="Adınız ve soyadınız" {...inputProps(a)} {...register('fullName')} />}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" label="E-posta" error={errors.email?.message}>
          {(a) => <input type="email" autoComplete="email" inputMode="email" placeholder="ornek@mail.com" {...inputProps(a)} {...register('email')} />}
        </Field>
        <Field id="phone" label="Telefon" error={errors.phone?.message}>
          {(a) => <input type="tel" autoComplete="tel" inputMode="tel" placeholder="05xx xxx xx xx" {...inputProps(a)} {...register('phone')} />}
        </Field>
      </div>
      <Field id="projectType" label="Ne yapmak istiyorsunuz? (isteğe bağlı)" error={errors.projectType?.message}>
        {(a) => (
          <select defaultValue="" {...inputProps(a)} {...register('projectType', { setValueAs: (v) => v || undefined })}>
            <option value="">Seçiniz</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="projectDescription" label="Projeniz hakkında" hint="En az 20 karakter" error={errors.projectDescription?.message}>
        {(a) => <textarea rows={4} placeholder="Projeniz hakkında biraz detay verin…" {...inputProps(a)} className={`${a.className} min-h-32 py-3`} {...register('projectDescription')} />}
      </Field>

      <div>
        <label className="flex items-start gap-3 text-[0.95rem]">
          <input type="checkbox" {...register('consent')} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? 'consent-hata' : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[rgb(var(--hayb-lime))]" />
          <span>
            <Link href="/kvkk" className="underline underline-offset-2 hover:text-lime">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum, bilgilerimin proje talebim için kullanılmasını kabul ediyorum.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-hata" role="alert" className="mt-1.5 text-sm font-medium text-red-300">
            {errors.consent.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Mesajı Hazırla
      </Button>
    </form>
  );
}
