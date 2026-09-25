import { describe, expect, it } from 'vitest';
import { templates, templateUrl } from '@/data/templates';
import {
  ORDER_TTL_MS,
  REQUEST_PACKAGE_NOTES,
  buildWebsiteOrderWhatsAppMessage,
  emptyOrder,
  parseStoredOrder,
  selectedPages,
  templateAvailability,
  validateAll,
  validateStep,
  websiteOrderWhatsAppUrl,
  type WebsiteOrderForm,
} from '@/lib/web-order';

const filled = (over: Partial<WebsiteOrderForm> = {}): WebsiteOrderForm => ({
  ...emptyOrder(),
  businessName: 'ABC Mobilya',
  sector: 'Mobilya',
  businessDescription: "Bursa'da özel üretim mobilya hizmetleri sunuyoruz.",
  phone: '0532 111 22 33',
  email: 'info@abcmobilya.com',
  hasWebsite: 'no',
  hasDomain: 'no',
  hasHosting: 'no',
  consent: true,
  ...over,
});

describe('şablon kimlikleri', () => {
  it('her şablonun kalıcı kodu slug ile eşleşir ve benzersizdir', () => {
    const codes = templates.map((t) => t.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const t of templates) {
      const n = Number(t.slug.replace('web', ''));
      expect(t.slug).toMatch(/^web\d+$/);
      expect(t.code).toBe(`WEB ${String(n).padStart(2, '0')}`);
      expect(['business', 'professional', 'premium']).toContain(t.minimumPackage);
    }
  });
  it('şablon adresi tam URL olarak üretilir', () => {
    expect(templateUrl('web4')).toBe('https://www.hayb.com.tr/template/web4');
  });
});

describe('paket uyumu', () => {
  it('Starter pakette hiçbir hazır tasarım kullanılamaz', () => {
    for (const t of templates) expect(templateAvailability(t.minimumPackage, 'starter')).toBe('locked');
  });
  it('Business, Professional ve Premium sırasıyla açar', () => {
    expect(templateAvailability('business', 'business')).toBe('available');
    expect(templateAvailability('professional', 'business')).toBe('locked');
    expect(templateAvailability('professional', 'professional')).toBe('available');
    expect(templateAvailability('premium', 'professional')).toBe('locked');
    expect(templateAvailability('premium', 'premium')).toBe('available');
  });
  it('paket seçilmediyse ya da bilinmiyorsa seçim serbesttir', () => {
    expect(templateAvailability('professional', '')).toBe('unknown');
    expect(templateAvailability('professional', 'unknown')).toBe('unknown');
  });
});

describe('doğrulama', () => {
  it('yalnızca belirlenen alanlar zorunludur', () => {
    const e0 = validateStep(emptyOrder(), 0);
    expect(Object.keys(e0).sort()).toEqual(['businessDescription', 'businessName', 'email', 'phone', 'sector']);
    const e1 = validateStep(emptyOrder(), 1);
    expect(Object.keys(e1).sort()).toEqual(['hasDomain', 'hasWebsite']);
    for (const s of [2, 3, 4]) expect(validateStep(emptyOrder(), s)).toEqual({});
  });
  it('geçerli form hatasız geçer', () => {
    const r = validateAll(filled());
    expect(r.errors).toEqual({});
    expect(r.firstStep).toBeNull();
  });
  it('ilk hatalı adımı bulur', () => {
    const r = validateAll(filled({ hasDomain: '' }));
    expect(r.firstStep).toBe(1);
    expect(r.errors.hasDomain).toBeTruthy();
  });
  it('geçersiz e-posta ve kısa telefon reddedilir', () => {
    const e = validateStep(filled({ email: 'yanlis', phone: '123' }), 0);
    expect(e.email).toBeTruthy();
    expect(e.phone).toBeTruthy();
  });
  it('kilitli şablon seçimi gönderimi engeller', () => {
    const pro = templates.find((t) => t.minimumPackage !== 'business');
    // Şu an tüm şablonlar Business; kilit senaryosu Starter paketiyle sınanır.
    const f = filled({ designMode: 'ready', packageChoice: 'starter', templateSlug: (pro ?? templates[0]).slug });
    expect(validateAll(f).errors.templateSlug).toContain('Business paketi');
  });
  it('KVKK onayı olmadan gönderilemez', () => {
    expect(validateAll(filled({ consent: false })).errors.consent).toBeTruthy();
  });
});

describe('WhatsApp mesajı', () => {
  const msg = buildWebsiteOrderWhatsAppMessage(
    filled({
      pages: ['Ana Sayfa', 'Hakkımızda', 'Diğer'],
      pagesOther: 'Kariyer',
      services: 'Mutfak\nYatak Odası',
      hasLogo: 'yes',
      designMode: 'ready',
      packageChoice: 'business',
      templateSlug: 'web4',
      referenceWebsites: ['ornek.com', ''],
      specialRequests: ['WhatsApp', 'Özel Bir İstek'],
      specialOther: 'Ürün kataloğu',
      additionalNotes: 'Modern ve sade.',
    }),
  );
  it('bölümlü başlık ve imza içerir', () => {
    for (const s of ['HAYB WEB SİTESİ PROJE TALEBİ', 'İŞLETME BİLGİLERİ', 'WEB SİTESİ', 'SİTE İÇERİĞİ', 'TASARIM', 'ÖZEL İSTEKLER', 'EK NOT', 'Fikirleri Gerçek Dijital Ürünlere Dönüştürüyoruz.']) expect(msg).toContain(s);
  });
  it('seçilen tasarım için yalnızca tam adres gönderir, kodu değil', () => {
    expect(msg).toContain('SEÇİLEN TASARIM');
    expect(msg).toContain('https://www.hayb.com.tr/template/web4');
    expect(msg).not.toMatch(/WEB\s?0?4/);
  });
  it('sayfaları, hizmetleri ve referans adreslerini biçimlendirir', () => {
    expect(msg).toContain('• Hakkımızda');
    expect(msg).toContain('• Diğer: Kariyer');
    expect(msg).toContain('• Yatak Odası');
    expect(msg).toContain('https://ornek.com');
    expect(msg).toContain('• Özel istek: Ürün kataloğu');
  });
  it('paket bilinmiyorsa gereken paket notu eklenir', () => {
    const m = buildWebsiteOrderWhatsAppMessage(filled({ designMode: 'ready', packageChoice: 'unknown', templateSlug: 'web1' }));
    expect(m).toContain('paket ve üzeri projelerde kullanılabilir');
  });
  it('özel tasarımda "SEÇİLEN TASARIM" bölümü yoktur', () => {
    expect(buildWebsiteOrderWhatsAppMessage(filled({ designMode: 'custom' }))).not.toContain('SEÇİLEN TASARIM');
  });
  it('şifre ve hesap bilgisi istemez', () => {
    expect(msg.toLowerCase()).not.toMatch(/şifre|parola|password|cpanel/);
  });
  it('wa.me adresi HAYB numarasına gider ve metin kodlanır', () => {
    const url = websiteOrderWhatsAppUrl(filled());
    expect(url.startsWith('https://wa.me/905073420661?text=')).toBe(true);
    expect(decodeURIComponent(url.split('?text=')[1])).toContain('HAYB WEB SİTESİ PROJE TALEBİ');
  });
  it('boş isteğe bağlı alanlar mesajda satır bırakmaz', () => {
    const m = buildWebsiteOrderWhatsAppMessage(filled());
    expect(m).not.toContain('WhatsApp:\n\n');
    expect(m).not.toContain('Adres:');
    expect(m).not.toContain('EK NOT');
  });
});

describe('taslak saklama', () => {
  it('geçerli taslağı geri okur', () => {
    const f = filled({ step: 3, templateSlug: 'web2' });
    expect(parseStoredOrder(JSON.stringify(f))?.businessName).toBe('ABC Mobilya');
  });
  it('süresi dolmuş, bozuk veya boş kaydı yok sayar', () => {
    expect(parseStoredOrder(JSON.stringify({ ...filled(), updatedAt: Date.now() - ORDER_TTL_MS - 1000 }))).toBeNull();
    expect(parseStoredOrder('{bozuk')).toBeNull();
    expect(parseStoredOrder(null)).toBeNull();
  });
  it('var olmayan şablonu ve geçersiz adımı temizler', () => {
    const p = parseStoredOrder(JSON.stringify({ ...filled(), templateSlug: 'yok', step: 99 }));
    expect(p?.templateSlug).toBe('');
    expect(p?.step).toBe(5);
  });
  it('sayfa seçimi "Diğer" için metni ekler', () => {
    expect(selectedPages(filled({ pages: ['Blog', 'Diğer'], pagesOther: 'Basın' }))).toEqual(['Blog', 'Diğer: Basın']);
  });
});

describe('paket kuralları (şablon ve özel istek)', () => {
  it('yalnızca WEB 09, 12 ve 17 Professional ister; diğerleri Business', () => {
    const pro = templates.filter((t) => t.minimumPackage === 'professional').map((t) => t.code);
    expect(pro.sort()).toEqual(['WEB 09', 'WEB 12', 'WEB 17']);
    expect(templates.every((t) => t.minimumPackage === 'business' || t.minimumPackage === 'professional')).toBe(true);
  });
  it('Starter pakette hiçbir hazır tasarım seçilemez; Business Professional şablonları kilitler', () => {
    for (const t of templates) expect(templateAvailability(t.minimumPackage, 'starter')).toBe('locked');
    const w9 = templates.find((t) => t.code === 'WEB 09')!;
    const w10 = templates.find((t) => t.code === 'WEB 10')!;
    expect(templateAvailability(w9.minimumPackage, 'business')).toBe('locked');
    expect(templateAvailability(w9.minimumPackage, 'professional')).toBe('available');
    expect(templateAvailability(w10.minimumPackage, 'business')).toBe('available');
  });
  it('Online Ödeme seçimi e-ticaret paketi uyarısı verir', () => {
    expect(REQUEST_PACKAGE_NOTES['Online Ödeme']).toBe('Online ödeme için e-ticaret paketi seçmelisiniz.');
  });
});

describe('e-ticaret paketleri (sipariş formu)', () => {
  it('sipariş formunda üç e-ticaret paketi seçilebilir ve online ödeme uyarısı kalkar', async () => {
    const { PACKAGE_OPTIONS, isEcommercePackage } = await import('@/lib/web-order');
    const ids = PACKAGE_OPTIONS.map((p) => p.id);
    expect(ids).toEqual(expect.arrayContaining(['eticaret-start', 'eticaret-growth', 'eticaret-elite']));
    expect(isEcommercePackage('eticaret-growth')).toBe(true);
    expect(isEcommercePackage('business')).toBe(false);
  });
  it('e-ticaret paketleri kampanya fiyatıyla eklenmiştir', async () => {
    const { ecommercePackages } = await import('@/data/pricing');
    expect(ecommercePackages.map((p) => p.price)).toEqual(['29.990 ₺', '49.990 ₺', '79.990 ₺']);
  });
});
