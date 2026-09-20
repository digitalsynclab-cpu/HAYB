import { describe, expect, it } from 'vitest';
import { contactSchema, wizardStepSchemas } from '@/lib/contact-schema';
import { addToCart, buildCartMessage, buildContactMessage, buildWizardMessage, cartWhatsappUrl } from '@/lib/messages';
import { pricingPlans } from '@/data/pricing';

const valid = {
  fullName: 'Ayşe Yılmaz',
  phone: '0532 123 45 67',
  email: 'ayse@example.com',
  projectDescription: 'Kurumsal bir web sitesi yaptırmak istiyorum.',
  consent: true as const,
};

describe('iletişim formu doğrulaması', () => {
  it('geçerli veriyi kabul eder', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it.each([
    ['kısa ad', { fullName: 'A' }],
    ['geçersiz telefon', { phone: 'abc' }],
    ['geçersiz e-posta', { email: 'yanlis' }],
    ['kısa açıklama', { projectDescription: 'kısa' }],
    ['KVKK onayı yok', { consent: false }],
  ])('%s reddedilir', (_n, patch) => {
    expect(contactSchema.safeParse({ ...valid, ...patch }).success).toBe(false);
  });
  it('sihirbaz adımları ayrı ayrı doğrulanır', () => {
    expect(wizardStepSchemas.type.safeParse({ types: [] }).success).toBe(false);
    expect(wizardStepSchemas.type.safeParse({ types: ['Web Sitesi'] }).success).toBe(true);
    expect(wizardStepSchemas.details.safeParse({ description: 'çok kısa' }).success).toBe(false);
  });
});

describe('sepet', () => {
  const [a, b] = pricingPlans;
  it('aynı paket iki kez eklenmez', () => {
    const one = addToCart([], a, 'Web Sitesi');
    expect(addToCart(one, a, 'Web Sitesi')).toHaveLength(1);
    expect(addToCart(one, b, 'Web Sitesi')).toHaveLength(2);
  });
  it('WhatsApp mesajı paket adı, kategori ve fiyatı içerir', () => {
    const msg = buildCartMessage(addToCart([], a, 'Web Sitesi'));
    expect(msg).toContain(a.name);
    expect(msg).toContain('Web Sitesi');
    expect(msg).toContain(a.price);
  });
  it('URL doğru numaraya gider ve mesaj kodlanır', () => {
    const url = cartWhatsappUrl(addToCart([], a, 'Web Sitesi'));
    expect(url.startsWith('https://wa.me/905073420661?text=')).toBe(true);
    expect(url).not.toContain(' ');
  });
});

describe('WhatsApp mesaj üretimi', () => {
  it('iletişim mesajı tüm alanları taşır', () => {
    const m = buildContactMessage({ ...valid, projectType: 'Web Sitesi' });
    for (const v of [valid.fullName, valid.phone, valid.email, valid.projectDescription, 'Web Sitesi']) expect(m).toContain(v);
  });
  it('sihirbaz mesajı türü, kapsamı ve iletişimi taşır', () => {
    const m = buildWizardMessage({ types: ['Web Sitesi', 'SEO'], description: 'Açıklama metni burada.', scope: ['Tasarım'], fullName: 'Ali', phone: '05320000000', email: 'a@b.co' });
    expect(m).toContain('Web Sitesi, SEO');
    expect(m).toContain('Tasarım');
    expect(m).toContain('05320000000');
  });
});
