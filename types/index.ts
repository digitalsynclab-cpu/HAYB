export interface Service {
  id: string;
  icon: string; // Lucide ikon adı
  title: string;
  description: string; // max 160 karakter
}

export interface Project {
  id: string;
  image: string; // /images/portfolio/*.png
  name: string;
  category: string;
  description: string; // max 200 karakter
  href?: string; // iç sayfa yolu
  externalUrl?: string; // dış bağlantı
}

export interface Reference {
  brand: string;
  approach: string; // min 30 karakter
  colorLanguage: string; // min 30 karakter
  uiPrinciple: string; // min 30 karakter
  uxNote: string; // min 30 karakter
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string; // "15.000 TL+" | "35.000 TL+" | "Teklif Al"
  features: string[];
  recommended: boolean;
  ctaLabel: string;
}

export interface ProcessStep {
  step: number; // 1-4
  title: string;
  description: string; // max 30 kelime
}

export interface Capability {
  step: number; // 1-10
  icon: string; // Lucide ikon adı
  title: string;
  description: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FormState {
  status: FormStatus;
  errorMessage?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
