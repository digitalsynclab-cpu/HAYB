import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import nextConfig from '@/next.config';
import { GET as llms } from '@/app/llms.txt/route';
import { GET as aiTxt } from '@/app/ai.txt/route';
import { insights, insightBySlug, insightsForService, readingMinutes } from '@/data/insights';
import { getAllRoutes } from '@/data/routes';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { templates } from '@/data/templates';
import { buildMetadata, clipDescription } from '@/lib/metadata';
import { AI_POLICY } from '@/data/ai-policy';

const staticPaths = [
  '/', '/hizmetler', '/projeler', '/hakkimizda', '/surec', '/paketler', '/template', '/iletisim', '/proje-baslat',
  '/web-sitesi-siparis', '/bursa-web-tasarim', '/insights', '/gizlilik-politikasi', '/kvkk', '/cerez-politikasi',
];
const knownPaths = new Set<string>([
  ...staticPaths,
  ...services.map((s) => `/hizmetler/${s.slug}`),
  ...projects.map((p) => `/projeler/${p.id}`),
  ...templates.map((t) => `/template/${t.slug}`),
  ...insights.map((i) => `/insights/${i.slug}`),
]);

describe('insights içeriği', () => {
  it('slug benzersiz, açıklama uzunluğu arama sonucuna uygun', () => {
    expect(new Set(insights.map((i) => i.slug)).size).toBe(insights.length);
    for (const i of insights) {
      expect(i.description.length, i.slug).toBeGreaterThanOrEqual(50);
      expect(i.description.length, i.slug).toBeLessThanOrEqual(175);
      expect(i.date, i.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(readingMinutes(i)).toBeGreaterThanOrEqual(2);
    }
  });
  it('ilgili hizmet, proje ve şablon referansları geçerlidir', () => {
    for (const i of insights) {
      for (const s of i.related.services) expect(services.map((x) => x.slug), `${i.slug}→${s}`).toContain(s);
      for (const p of i.related.projects) expect(projects.map((x) => x.id), `${i.slug}→${p}`).toContain(p);
      for (const t of i.related.templates) expect(templates.map((x) => x.slug), `${i.slug}→${t}`).toContain(t);
    }
  });
  it('makale içindeki her iç bağlantı gerçek bir sayfaya gider', () => {
    const LINK = /\]\((\/[^)\s]*)\)/g;
    for (const i of insights) {
      const text = JSON.stringify([i.intro, i.blocks, i.related.cta]);
      const found = [...text.matchAll(LINK)].map((m) => m[1]).concat(i.related.cta.href);
      for (const href of found) {
        const path = href.split('#')[0].split('?')[0];
        expect(knownPaths.has(path), `${i.slug}: ${href}`).toBe(true);
      }
    }
  });
  it('hizmet sayfalarına ilgili yazılar bağlanır', () => {
    expect(insightsForService('web-sitesi').length).toBeGreaterThan(0);
    expect(insightBySlug('yok')).toBeUndefined();
  });
  it('sahte sonuç, rakam veya müşteri iddiası içermez', () => {
    const blob = JSON.stringify(insights);
    expect(blob).not.toMatch(/%\s?\d{2,}\s*(artış|daha fazla)|müşteri yorumu|garanti(li)?|birinci sıra/i);
  });
});

describe('yeni sayfalar ve yönlendirme', () => {
  const urls = sitemap().map((s) => s.url);
  it('sitemap yeni sayfaları ve makaleleri içerir, eski adresi içermez', () => {
    for (const p of ['/paketler', '/web-sitesi-siparis', '/bursa-web-tasarim', '/insights']) expect(urls).toContain(`https://www.hayb.com.tr${p}`);
    for (const i of insights) expect(urls).toContain(`https://www.hayb.com.tr/insights/${i.slug}`);
    expect(urls.some((u) => u.includes('fiyatlandirma'))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
  it('noindex şablon demo sayfaları sitemap dışındadır', () => {
    expect(urls.some((u) => /\/template\/web\d+$/.test(u))).toBe(false);
  });
  it('lastModified yalnızca gerçek içerik tarihi olan sayfalarda verilir', () => {
    for (const s of sitemap()) {
      if (s.url.includes('/insights/')) expect(s.lastModified).toBeTruthy();
      else expect(s.lastModified).toBeUndefined();
    }
  });
  it('/fiyatlandirma kalıcı (301) olarak /paketler adresine yönlenir', async () => {
    const r = await nextConfig.redirects?.();
    expect(r).toContainEqual({ source: '/fiyatlandirma', destination: '/paketler', statusCode: 301 });
  });
  it('güvenlik başlıkları HSTS ve CSP içerir', async () => {
    const h = await nextConfig.headers?.();
    const keys = (h?.[0]?.headers ?? []).map((x) => x.key);
    expect(keys).toEqual(expect.arrayContaining(['Strict-Transport-Security', 'Content-Security-Policy']));
  });
  it('route kaydı yinelenen yol içermez', () => {
    const paths = getAllRoutes().map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe('metadata', () => {
  it('uzun açıklamayı 175 karakterde sözcük sınırından kısaltır', () => {
    const long = 'kelime '.repeat(60);
    const c = clipDescription(long);
    expect(c.length).toBeLessThanOrEqual(175);
    expect(c.endsWith('…')).toBe(true);
    expect(clipDescription('Kısa açıklama')).toBe('Kısa açıklama');
  });
  it('makale sayfaları OpenGraph article türü alır', () => {
    const m = buildMetadata({ title: 'T', description: 'Açıklama', path: '/insights/x', article: { publishedTime: '2026-09-25', section: 'UI/UX' } });
    expect(m.openGraph).toMatchObject({ type: 'article', publishedTime: '2026-09-25', section: 'UI/UX' });
  });
  it('googleBot için geniş önizleme izni verilir', () => {
    const m = buildMetadata({ title: 'T', description: 'Açıklama', path: '/x' });
    expect(m.robots).toMatchObject({ googleBot: { 'max-image-preview': 'large', 'max-snippet': -1 } });
  });
});

describe('GEO dosyaları', () => {
  it('llms.txt tüm sitemap adreslerini listeler (drift yok)', async () => {
    const body = await llms().text();
    for (const u of sitemap().map((s) => s.url)) expect(body, u).toContain(u);
  });
  it('ai.txt ile robots.txt eğitim politikası çelişmez', async () => {
    const ai = await aiTxt().text();
    const rules = robots().rules as { userAgent: string | string[]; disallow?: string | string[] }[];
    const gpt = rules.find((r) => [r.userAgent].flat().includes('GPTBot'));
    const blocked = gpt ? [gpt.disallow ?? []].flat().includes('/') : false;
    expect(/AI Training:\s*Yes/i.test(ai)).toBe(!blocked);
    expect(AI_POLICY).toBe('allow-all');
  });
});
