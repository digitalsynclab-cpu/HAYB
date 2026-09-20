export interface PricingPlan {
  id: string;
  name: string;
  price: string; // "5.000 ₺" | "3.000 ₺ / hafta"
  features: string[];
  recommended: boolean;
  ctaLabel: string;
}
