'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import { GradientButton } from '@/components/ui/GradientButton';
import type { FormStatus } from '@/types';

const WHATSAPP_NUMBER = '905073420661';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    setStatus('submitting');

    const message = `Merhaba! HAYB internet sitesinden iletişim formunu doldurdum.\n\n👤 *Ad Soyad:* ${data.fullName}\n📞 *Telefon:* ${data.phone}\n📧 *E-Posta:* ${data.email}\n\n📋 *Proje Açıklaması:*\n${data.projectDescription}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6 rounded-2xl border border-[#2563EB]/15 bg-[#0D1526]">
        <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[#F0F6FF] font-semibold text-lg mb-2">WhatsApp Açılıyor</h3>
        <p className="text-[#8BA3C7] text-sm">Bilgileriniz WhatsApp'ta hazırlandı. Göndermek için WhatsApp'ı onaylayın.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Ad Soyad */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#8BA3C7] mb-1.5">
          Ad Soyad <span className="text-[#3B82F6]">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          {...register('fullName')}
          className="w-full px-4 py-3 rounded-xl bg-[#111E35] border border-[#2563EB]/10 text-[#F0F6FF] placeholder-[#8BA3C7]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/40 transition-colors duration-200 min-h-[44px]"
          placeholder="Adınız ve soyadınız"
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#8BA3C7] mb-1.5">
          Telefon <span className="text-[#3B82F6]">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
          className="w-full px-4 py-3 rounded-xl bg-[#111E35] border border-[#2563EB]/10 text-[#F0F6FF] placeholder-[#8BA3C7]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/40 transition-colors duration-200 min-h-[44px]"
          placeholder="+90 5XX XXX XX XX"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* E-Posta */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#8BA3C7] mb-1.5">
          E-Posta <span className="text-[#3B82F6]">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full px-4 py-3 rounded-xl bg-[#111E35] border border-[#2563EB]/10 text-[#F0F6FF] placeholder-[#8BA3C7]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/40 transition-colors duration-200 min-h-[44px]"
          placeholder="ornek@sirket.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Proje Açıklaması */}
      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-[#8BA3C7] mb-1.5">
          Proje Açıklaması <span className="text-[#3B82F6]">*</span>
        </label>
        <textarea
          id="projectDescription"
          rows={5}
          {...register('projectDescription')}
          className="w-full px-4 py-3 rounded-xl bg-[#111E35] border border-[#2563EB]/10 text-[#F0F6FF] placeholder-[#8BA3C7]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/40 transition-colors duration-200 resize-none"
          placeholder="Projeniz hakkında kısaca bilgi verin..."
          aria-describedby={errors.projectDescription ? 'project-error' : undefined}
          aria-invalid={!!errors.projectDescription}
        />
        {errors.projectDescription && (
          <p id="project-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.projectDescription.message}
          </p>
        )}
      </div>

      <GradientButton
        type="submit"
        disabled={status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? 'Yönlendiriliyor...' : 'WhatsApp ile Gönder'}
      </GradientButton>

      <p className="text-[#8BA3C7]/40 text-xs text-center">
        Formu gönderdikten sonra WhatsApp açılacak. Mesajı onaylayarak gönderin.
      </p>
    </form>
  );
}
