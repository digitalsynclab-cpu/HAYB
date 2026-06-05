import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Ad Soyad en az 2 karakter olmalıdır')
    .max(100, 'Ad Soyad en fazla 100 karakter olabilir'),
  phone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası giriniz')
    .regex(/^[\d\s\-+()]+$/, 'Geçersiz telefon numarası'),
  email: z.string().email('Geçersiz e-posta adresi'),
  projectDescription: z
    .string()
    .min(20, 'Proje açıklaması en az 20 karakter olmalıdır')
    .max(2000, 'Proje açıklaması en fazla 2000 karakter olabilir'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
