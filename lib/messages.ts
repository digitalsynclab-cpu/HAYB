import { whatsappUrl } from '@/data/site';
import { priceWithList } from '@/data/campaign';
import type { PricingPlan } from '@/types';

export interface CartItem {
  plan: PricingPlan;
  category: string;
}

/** Sepetteki paketlerden WhatsApp mesajı üretir (mevcut mesaj biçimi korunmuştur). */
export function buildCartMessage(items: CartItem[]): string {
  const lines = items
    .map(({ plan, category }) => {
      const featuresText = plan.features.map((f) => `  • ${f}`).join('\n');
      return `📦 *${plan.name}* (${category})\n💰 Fiyat: ${priceWithList(plan.price)}\n\nİçerik:\n${featuresText}`;
    })
    .join('\n\n---\n\n');
  return `Merhaba! Aşağıdaki ürünü/ürünleri satın almak istiyorum:\n\n${lines}\n\nLütfen bilgi verir misiniz?`;
}

export const cartWhatsappUrl = (items: CartItem[]) => whatsappUrl(buildCartMessage(items));

/** Sepete ekleme: aynı paket ikinci kez eklenmez. */
export function addToCart(items: CartItem[], plan: PricingPlan, category: string): CartItem[] {
  return items.some((i) => i.plan.id === plan.id) ? items : [...items, { plan, category }];
}

export interface ContactPayload {
  fullName: string;
  phone: string;
  email: string;
  projectType?: string;
  projectDescription: string;
}

export function buildContactMessage(d: ContactPayload): string {
  const type = d.projectType ? `\n🗂️ *Proje Türü:* ${d.projectType}` : '';
  return `Merhaba! HAYB internet sitesinden iletişim formunu doldurdum.\n\n👤 *Ad Soyad:* ${d.fullName}\n📞 *Telefon:* ${d.phone}\n📧 *E-Posta:* ${d.email}${type}\n\n📋 *Proje Açıklaması:*\n${d.projectDescription}`;
}

export interface WizardPayload {
  types: string[];
  description: string;
  scope: string[];
  budget?: string;
  fullName: string;
  phone: string;
  email: string;
}

export function buildWizardMessage(d: WizardPayload): string {
  return [
    'Merhaba! HAYB internet sitesinden proje başlatmak istiyorum.',
    '',
    `🗂️ *Proje Türü:* ${d.types.join(', ')}`,
    d.scope.length ? `🧩 *Kapsam:* ${d.scope.join(', ')}` : '',
    d.budget ? `💰 *Bütçe / Zaman:* ${d.budget}` : '',
    '',
    `📋 *Proje Açıklaması:*\n${d.description}`,
    '',
    `👤 *Ad Soyad:* ${d.fullName}`,
    `📞 *Telefon:* ${d.phone}`,
    `📧 *E-Posta:* ${d.email}`,
  ]
    .filter((l, i, a) => l !== '' || a[i - 1] !== '')
    .join('\n');
}
