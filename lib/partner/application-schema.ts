import { z } from 'zod';

export const applicationSchema = z.object({
  // Adım 1 — Hesap ve kişisel bilgiler
  fullName: z.string().min(3, 'Ad soyad gerekli.'),
  email: z.string().email('Geçerli bir e-posta girin.'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı.'),
  phone: z.string().regex(/^5\d{9}$/, 'Geçerli bir telefon girin (5XX XXX XX XX).'),
  city: z.string().min(2, 'Şehir gerekli.'),
  district: z.string().optional(),

  // Adım 2 — Profesyonel bilgiler
  occupation: z.string().min(2, 'Meslek gerekli.'),
  employmentStatus: z.string().min(2, 'Çalışma durumu gerekli.'),
  hasCompany: z.boolean(),
  companyName: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  salesExperience: z.string().optional(),

  // Adım 3 — Motivasyon
  motivation: z.string().min(20, 'Lütfen en az birkaç cümleyle açıklayın.'),
  targetCustomerGroups: z.string().min(10, 'Hangi müşteri gruplarına ulaşabileceğinizi belirtin.'),
  hasSalesExperienceBefore: z.boolean(),
  sectorsConnected: z.string().optional(),
  estimatedReach: z.string().optional(),
  interestedServices: z.array(z.string()).min(1, 'En az bir hizmet seçin.'),

  // Adım 4 — Deneyim
  previousProducts: z.string().optional(),
  digitalExperience: z.string().optional(),
  customerPortfolio: z.string().optional(),
  additionalInfo: z.string().optional(),

  // Adım 5 — Onay
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: 'KVKK aydınlatma metnini onaylamanız gerekir.' }) }),
  termsConsent: z.literal(true, { errorMap: () => ({ message: 'Başvuru koşullarını kabul etmeniz gerekir.' }) }),
});

export type PartnerApplicationInput = z.infer<typeof applicationSchema>;
