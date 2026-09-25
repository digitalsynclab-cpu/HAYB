import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { isV2, templateCategories, templates, type TemplateDef } from '@/data/templates';
import { templateThumb } from '@/data/template-paths';
import { brandLogos } from '@/data/brands';
import { campaign, priceParts, priceWithList } from '@/data/campaign';
import { pricingPlans } from '@/data/pricing';
import sitemap from '@/app/sitemap';

const pub = (p: string) => existsSync(join(process.cwd(), 'public', p));

/** Nesnenin her düzeyinde koşula uyan (anahtar, değer) çiftlerinin değerlerini toplar. */
function collect(node: unknown, test: (key: string, value: unknown) => boolean, key = ''): unknown[] {
  if (Array.isArray(node)) return node.flatMap((n) => collect(n, test, key));
  if (node && typeof node === 'object') return Object.entries(node).flatMap(([k, v]) => collect(v, test, k));
  return test(key, node) ? [node] : [];
}

describe('şablonlar', () => {
  const legacy = templates.filter((t): t is TemplateDef => !isV2(t));
  const v2 = templates.filter(isV2);

  it('yirmi benzersiz şablon vardır (web1 … web20) ve kodları slug ile eşleşir', () => {
    expect(templates.map((t) => t.slug)).toEqual(Array.from({ length: 20 }, (_, i) => `web${i + 1}`));
    for (const t of templates) expect(t.code).toBe(`WEB ${String(Number(t.slug.replace('web', ''))).padStart(2, '0')}`);
  });
  it('her şablonun sektör kategorisi, özeti ve özellikleri vardır', () => {
    for (const t of templates) {
      expect(t.category, t.slug).toBeTruthy();
      expect(t.summary.length, t.slug).toBeGreaterThan(30);
      expect(t.features.length, t.slug).toBeGreaterThanOrEqual(2);
    }
    expect(templateCategories().length).toBeGreaterThanOrEqual(8);
  });
  it('tüm önizleme görselleri mevcut', () => {
    for (const t of templates) expect(pub(templateThumb(t.slug)), t.slug).toBe(true);
  });
  it('eski şablonların görselleri mevcut', () => {
    for (const t of legacy) {
      for (const s of t.sections) {
        const imgs: (string | undefined)[] = [];
        if (s.type === 'hero' || s.type === 'banner') imgs.push(s.image);
        if (s.type === 'cta') imgs.push(s.image);
        if (s.type === 'grid') imgs.push(...s.items.map((i) => i.img));
        for (const i of imgs) if (i) expect(pub(i), `${t.slug} ${i}`).toBe(true);
      }
    }
  });
  it('eski şablonlarda menü ve düğmeler var olan bölümlere gider', () => {
    for (const t of legacy) {
      const ids = new Set(t.sections.map((s) => ('id' in s ? s.id : undefined)).filter(Boolean));
      const targets = [...t.nav.map((n) => n.to), t.cta.to, ...t.footer.columns.flatMap((c) => c.links.map((l) => l.to))].filter(Boolean) as string[];
      for (const to of targets) expect(ids.has(to), `${t.slug} → ${to}`).toBe(true);
      for (const s of t.sections) {
        if (s.type === 'hero') for (const c of [s.primary, s.secondary]) if (c?.to) expect(ids.has(c.to), `${t.slug} hero → ${c.to}`).toBe(true);
        if (s.type === 'banner' && s.cta?.to) expect(ids.has(s.cta.to), `${t.slug} banner → ${s.cta.to}`).toBe(true);
      }
    }
  });
  it('yeni nesil şablonlarda her görsel diskte vardır', () => {
    expect(v2.length).toBe(12);
    for (const t of v2) {
      const imgs = collect(t.site, (k, v) => typeof v === 'string' && v.startsWith('/images/'));
      expect(imgs.length, t.slug).toBeGreaterThan(5);
      for (const i of imgs) expect(pub(String(i)), `${t.slug} ${i}`).toBe(true);
    }
  });
  it('yeni nesil şablonlarda her bağlantı var olan bir bölüme gider ve bölüm kimlikleri benzersizdir', () => {
    for (const t of v2) {
      const ids = t.site.blocks.map((b) => b.id).filter(Boolean) as string[];
      expect(new Set(ids).size, `${t.slug} yinelenen id`).toBe(ids.length);
      const targets = collect(t.site, (k, v) => k === 'to' && typeof v === 'string' && v !== '');
      expect(targets.length, t.slug).toBeGreaterThan(3);
      for (const to of targets) expect(ids, `${t.slug} → ${to}`).toContain(String(to));
    }
  });
  it('yeni nesil şablonlarda yasak içerik yoktur (sahte puan, ödül, gerçek kişi/kurum adı)', () => {
    const blob = JSON.stringify(v2.map((t) => t.site)).toLocaleLowerCase('tr-TR');
    expect(blob).not.toMatch(/google puanı|4\.9\/5|ödül|aggregaterating|mutlu (hasta|müşteri)/);
  });
  it('galeri sitemap’te listelenir, demo sayfaları listelenmez', () => {
    const urls = sitemap().map((s) => s.url);
    expect(urls).toContain('https://www.hayb.com.tr/template');
    expect(urls.some((u) => /\/template\/web\d/.test(u))).toBe(false);
  });
});

describe('marka logoları', () => {
  it('sekiz logo dosyası vardır', () => {
    expect(brandLogos).toHaveLength(8);
    for (const b of brandLogos) expect(pub(b.src), b.name).toBe(true);
  });
});

describe('kampanya fiyatı', () => {
  it('liste fiyatı kampanya oranıyla tutarlıdır', () => {
    const p = priceParts('5.000 ₺')!;
    expect(p.sale).toBe('5.000 ₺');
    const list = Number(p.list.replace(/\D/g, ''));
    expect(Math.abs(1 - 5000 / list - campaign.rate / 100)).toBeLessThan(0.01);
  });
  it('sonek korunur, sayı yoksa null', () => {
    expect(priceParts('3.000 ₺ / hafta')!.suffix).toBe('/ hafta');
    expect(priceParts('Teklif alın')).toBeNull();
  });
  it('tüm sabit fiyatlı paketlerde indirim gösterilir', () => {
    for (const p of pricingPlans) expect(priceParts(p.price), p.id).not.toBeNull();
    expect(priceWithList('5.000 ₺')).toContain('%35 kampanya');
  });
});

import { projects } from '@/data/projects';
import { panelSamples } from '@/data/panels';

describe('uygulama ekranları ve paneller', () => {
  it('dört mobil uygulamanın ekran görüntüleri mevcut', () => {
    for (const id of ['bbblock', 'bebeklersoruyor', 'ekotakippro', 'taleb-e']) {
      const p = projects.find((x) => x.id === id)!;
      expect(p.gallery && p.gallery.length >= 5, id).toBe(true);
      for (const g of p.gallery!) expect(pub(g), g).toBe(true);
    }
  });
  it('yönetim paneli örnekleri mevcut', () => {
    expect(panelSamples.length).toBeGreaterThanOrEqual(5);
    for (const s of panelSamples) expect(pub(s.src), s.src).toBe(true);
  });
});

import { dataServicePlan } from '@/data/pricing';
import { services } from '@/data/services';
import { getAnswer } from '@/components/assistant/engine';

describe('HAYB Data Service', () => {
  it('tek seferlik 9.999 ₺; liste fiyatı %35 indirimle tutarlı', () => {
    expect(dataServicePlan.price).toBe('9.999 ₺');
    const p = priceParts(dataServicePlan.price)!;
    const list = Number(p.list.replace(/\D/g, ''));
    expect(Math.abs(1 - 9999 / list - campaign.rate / 100)).toBeLessThan(0.01);
  });
  it('hizmet sayfası, görsel ve asistan cevabı var; mutlak kapsam iddiası yok', () => {
    expect(services.some((s) => s.slug === 'hayb-data-service')).toBe(true);
    expect(pub('/images/products/hayb-data-service.webp')).toBe(true);
    const a = getAnswer('HAYB Data Service nedir');
    expect(a).toContain('Excel');
    expect(a).toContain('9.999');
    expect(a).toContain('KVKK');
    expect(a).not.toMatch(/bütün işletmeleri|tüm işletmelerin güncel/i);
  });
});
