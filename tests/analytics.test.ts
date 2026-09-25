import { describe, expect, it } from 'vitest';
import { ALLOWED_PARAMS, classifyOrigin, classifySource, sanitizeParams, trackEvent } from '@/lib/analytics';

describe('analitik: kişisel veri korunumu', () => {
  it('izin verilmeyen anahtarları düşürür', () => {
    const out = sanitizeParams({ templateId: 'web4', email: 'a@b.com', phone: '05321112233', businessName: 'ABC', customerName: 'Ali' });
    expect(out).toEqual({ templateId: 'web4' });
  });
  it('izinli anahtarda bile e-posta ve telefon gibi değerleri düşürür', () => {
    expect(sanitizeParams({ campaign: 'ali@site.com', source: '0532 111 22 33', page: '/paketler' })).toEqual({ page: '/paketler' });
  });
  it('uzun değerleri kısaltır, boşları atar', () => {
    const out = sanitizeParams({ campaign: 'x'.repeat(300), from: '   ' });
    expect(String(out.campaign).length).toBe(100);
    expect(out.from).toBeUndefined();
  });
  it('izin listesi kişisel alan içermez', () => {
    const banned = ['email', 'phone', 'name', 'businessName', 'address', 'whatsapp'];
    for (const k of ALLOWED_PARAMS) expect(banned).not.toContain(k);
  });
});

describe('analitik: kaynak sınıflandırma', () => {
  it('UTM her zaman önceliklidir', () => {
    expect(classifySource('Instagram', 'www.google.com')).toBe('instagram');
  });
  it('yönlendiren siteyi tanır', () => {
    expect(classifySource(null, 'l.instagram.com')).toBe('instagram');
    expect(classifySource(null, 'www.google.com.tr')).toBe('google');
    expect(classifySource(null, 'wa.me')).toBe('whatsapp');
    expect(classifySource(null, 'ornek.com')).toBe('referral');
    expect(classifySource(null, null)).toBe('direct');
  });
  it('iç sayfa bağlamını ayırır', () => {
    expect(classifyOrigin('/template/web3')).toBe('template');
    expect(classifyOrigin('/projeler/bbblock')).toBe('project');
    expect(classifyOrigin('/hizmetler/web-sitesi')).toBe('service');
    expect(classifyOrigin('/paketler')).toBe('pricing');
    expect(classifyOrigin('/')).toBe('home');
    expect(classifyOrigin(null)).toBe('page');
  });
});

describe('analitik: ölçüm kimliği ve onay yokken', () => {
  it('hiçbir şey yüklemez ve hata vermez', () => {
    expect(() => trackEvent('page_view', { page: '/' })).not.toThrow();
    expect(window.gtag).toBeUndefined();
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });
});
