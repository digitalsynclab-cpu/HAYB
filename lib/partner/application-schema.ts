import { z } from 'zod';

/**
 * Başvuru formu bilinçli olarak kısa tutulur: yalnızca bir partner adayını ilk
 * değerlendirme için gerekli bilgiler istenir. Detaylı sorular (deneyim, portföy,
 * hedef kitle vb.) admin görüşmesi sırasında toplanır — bkz. partner_notes tablosu.
 */
export const applicationSchema = z.object({
  // Hesap ve kişisel bilgiler — zorunlu
  fullName: z.string().min(3, 'Ad soyad gerekli.'),
  email: z.string().email('Geçerli bir e-posta girin.'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı.'),
  phone: z.string().regex(/^5\d{9}$/, 'Geçerli bir telefon girin (5XX XXX XX XX).'),
  city: z.string().min(2, 'Şehir gerekli.'),
  district: z.string().optional(),

  // Partner profili — opsiyonel, hızlı başvuru için zorunlu değil
  occupation: z.string().optional(),
  hasCompany: z.boolean(),
  companyName: z.string().optional(),
  interestedServices: z.array(z.string()).optional(),
  motivation: z.string().optional(),

  // Onay — zorunlu (yasal)
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: 'KVKK aydınlatma metnini onaylamanız gerekir.' }) }),
  termsConsent: z.literal(true, { errorMap: () => ({ message: 'Başvuru koşullarını kabul etmeniz gerekir.' }) }),
});

export type PartnerApplicationInput = z.infer<typeof applicationSchema>;
