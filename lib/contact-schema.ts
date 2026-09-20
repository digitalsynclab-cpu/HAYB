import { z } from 'zod';

export const projectTypes = [
  'Web Sitesi',
  'E-Ticaret',
  'Mobil Uygulama',
  'Özel Yazılım',
  'UI/UX Tasarım',
  'Yapay Zeka',
  'Sosyal Medya',
  'Marka Tasarımı',
  'Diğer',
] as const;

const fullName = z
  .string()
  .trim()
  .min(2, 'Ad Soyad en az 2 karakter olmalıdır')
  .max(100, 'Ad Soyad en fazla 100 karakter olabilir');
const phone = z
  .string()
  .trim()
  .min(10, 'Geçerli bir telefon numarası giriniz')
  .regex(/^[\d\s\-+()]+$/, 'Geçersiz telefon numarası');
const email = z.string().trim().email('Geçersiz e-posta adresi');
const consent = z.literal(true, { errorMap: () => ({ message: 'Devam etmek için aydınlatma metnini onaylamalısınız' }) });

export const contactSchema = z.object({
  fullName,
  phone,
  email,
  projectType: z.enum(projectTypes).optional(),
  projectDescription: z
    .string()
    .trim()
    .min(20, 'Proje açıklaması en az 20 karakter olmalıdır')
    .max(2000, 'Proje açıklaması en fazla 2000 karakter olabilir'),
  consent,
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** Proje Başlat sihirbazı: adım adım doğrulanan alanlar */
export const wizardStepSchemas = {
  type: z.object({ types: z.array(z.enum(projectTypes)).min(1, 'En az bir proje türü seçin') }),
  details: z.object({
    description: z
      .string()
      .trim()
      .min(20, 'Lütfen projenizi en az 20 karakterle anlatın')
      .max(500, 'En fazla 500 karakter'),
  }),
  contact: z.object({ fullName, phone, email, consent }),
} as const;
