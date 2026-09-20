import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { buildMetadata } from '@/lib/metadata';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { iconNames } from '@/data/icons';
import { nav, legalLinks } from '@/data/site';
import { socialTemplates } from '@/data/social';
import { socialMediaPlans } from '@/data/pricing';

describe('metadata', () => {
  const m = buildMetadata({ title: 'Test', description: 'Açıklama', path: '/test' });
  it('canonical www ve mutlak', () => {
    expect(m.alternates?.canonical).toBe('https://www.hayb.com.tr/test');
  });
  it('OG ve Twitter alanları dolu', () => {
    expect(m.openGraph?.title).toBe('Test | HAYB');
    expect(m.twitter).toMatchObject({ card: 'summary_large_image' });
  });
  it('noindex bayrağı robots üretir', () => {
    expect(buildMetadata({ title: 'x', description: 'y', path: '/x', noindex: true }).robots).toMatchObject({ index: false });
  });
});

describe('sitemap ve robots', () => {
  const urls = sitemap().map((s) => s.url);
  it('yinelenen URL yok', () => expect(new Set(urls).size).toBe(urls.length));
  it('tüm hizmet ve proje sayfaları listelenir', () => {
    for (const s of services) expect(urls).toContain(`https://www.hayb.com.tr/hizmetler/${s.slug}`);
    for (const p of projects) expect(urls).toContain(`https://www.hayb.com.tr/projeler/${p.id}`);
  });
  it('yasal sayfalar listelenir', () => {
    for (const l of legalLinks) expect(urls).toContain(`https://www.hayb.com.tr${l.href}`);
  });
  it('robots doğru sitemap adresini verir', () => {
    expect(robots().sitemap).toBe('https://www.hayb.com.tr/sitemap.xml');
  });
});

describe('route ve asset bütünlüğü', () => {
  it('menüdeki her sayfanın bir route dosyası vardır', () => {
    for (const n of nav) {
      const dir = n.href === '/' ? 'app' : `app${n.href}`;
      expect(existsSync(join(process.cwd(), dir, 'page.tsx')), n.href).toBe(true);
    }
  });
  it('hizmet slug ve proje id değerleri benzersiz', () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
  });
  it('hizmet ve proje çapraz referansları geçerli', () => {
    const ids = projects.map((p) => p.id);
    for (const s of services) for (const id of s.projectIds) expect(ids, `${s.slug}→${id}`).toContain(id);
    const slugs = services.map((s) => s.slug);
    for (const p of projects) for (const sl of p.serviceSlugs) expect(slugs, `${p.id}→${sl}`).toContain(sl);
  });
  it('her icon, proje görseli ve marka asset i diskte mevcut', () => {
    for (const i of iconNames) expect(existsSync(join(process.cwd(), 'public/icon', `${i}.webp`)), i).toBe(true);
    for (const p of projects) expect(existsSync(join(process.cwd(), 'public', p.image)), p.image).toBe(true);
    for (const f of ['brand/hayb-3d.webp', 'brand/hayb-3d-small.webp', 'brand/hayb-logo.png', 'og-image.png', 'icon-192.png', 'icon-512.png']) expect(existsSync(join(process.cwd(), 'public', f)), f).toBe(true);
  });
});

describe('sosyal medya içeriği', () => {
  it('"reels" hiçbir hizmet, paket veya süreç metninde geçmez (yapılmıyor)', () => {
    const blob = JSON.stringify({ services, socialMediaPlans });
    expect(/reels/i.test(blob)).toBe(false);
  });
  it('tüm sosyal şablon görselleri diskte mevcut', () => {
    for (const t of socialTemplates) expect(existsSync(join(process.cwd(), 'public', t.src)), t.src).toBe(true);
    expect(socialTemplates.some((t) => t.kind === 'post') && socialTemplates.some((t) => t.kind === 'story')).toBe(true);
  });
  it('site logosu düz 6 diamond asset ve favicon üretilmiş', () => {
    for (const f of ['brand/hayb-mark.png', 'brand/hayb-mark-small.png']) expect(existsSync(join(process.cwd(), 'public', f)), f).toBe(true);
    expect(existsSync(join(process.cwd(), 'app/icon.png'))).toBe(true);
    expect(existsSync(join(process.cwd(), 'app/apple-icon.png'))).toBe(true);
  });
});
