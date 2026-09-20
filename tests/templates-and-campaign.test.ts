import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { templates, templateThumb } from '@/data/templates';
import { brandLogos } from '@/data/brands';
import { campaign, priceParts, priceWithList } from '@/data/campaign';
import { pricingPlans } from '@/data/pricing';
import sitemap from '@/app/sitemap';

const pub = (p: string) => existsSync(join(process.cwd(), 'public', p));

describe('şablonlar', () => {
  it('sekiz benzersiz şablon vardır (web1 … web8)', () => {
    expect(templates.map((t) => t.slug)).toEqual(['web1', 'web2', 'web3', 'web4', 'web5', 'web6', 'web7', 'web8']);
  });
  it('tüm görseller mevcut', () => {
    for (const t of templates) {
      expect(pub(templateThumb(t.slug)), t.slug).toBe(true);
      for (const s of t.sections) {
        const imgs: (string | undefined)[] = [];
        if (s.type === 'hero' || s.type === 'banner') imgs.push(s.image);
        if (s.type === 'cta') imgs.push(s.image);
        if (s.type === 'grid') imgs.push(...s.items.map((i) => i.img));
        for (const i of imgs) if (i) expect(pub(i), `${t.slug} ${i}`).toBe(true);
      }
    }
  });
  it('menü ve düğmeler var olan bölümlere gider', () => {
    for (const t of templates) {
      const ids = new Set(t.sections.map((s) => ('id' in s ? s.id : undefined)).filter(Boolean));
      const targets = [...t.nav.map((n) => n.to), t.cta.to, ...t.footer.columns.flatMap((c) => c.links.map((l) => l.to))].filter(Boolean) as string[];
      for (const to of targets) expect(ids.has(to), `${t.slug} → ${to}`).toBe(true);
      for (const s of t.sections) {
        if (s.type === 'hero') for (const c of [s.primary, s.secondary]) if (c?.to) expect(ids.has(c.to), `${t.slug} hero → ${c.to}`).toBe(true);
        if (s.type === 'banner' && s.cta?.to) expect(ids.has(s.cta.to), `${t.slug} banner → ${s.cta.to}`).toBe(true);
      }
    }
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
