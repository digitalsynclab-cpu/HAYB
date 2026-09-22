// Kullanım: node scripts/seo-check.mjs http://localhost:3000   (veya canlı alan adı)
const origin = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const errors = [];
const warns = [];
const err = (where, msg) => errors.push(`${where} — ${msg}`);
const warn = (where, msg) => warns.push(`${where} — ${msg}`);

const get = (path) => fetch(origin + path, { headers: { 'user-agent': UA }, redirect: 'manual' });
const trimSlash = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);
const attrs = (tag) =>
  Object.fromEntries([...tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2]]));
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

// ── robots.txt ────────────────────────────────────────────────
const robotsRes = await get('/robots.txt');
if (robotsRes.status !== 200) err('/robots.txt', `HTTP ${robotsRes.status}`);
const robots = robotsRes.status === 200 ? await robotsRes.text() : '';
if (!/^sitemap:\s*https?:\/\//im.test(robots)) err('/robots.txt', 'mutlak "Sitemap:" satırı yok');

const groups = [];
let cur = null;
for (const raw of robots.split(/\r?\n/)) {
  const m = raw.match(/^\s*([a-z-]+)\s*:\s*(.*)$/i);
  if (!m) continue;
  const key = m[1].toLowerCase();
  const val = m[2].trim();
  if (key === 'user-agent') {
    if (!cur || cur.rules.length > 0) groups.push((cur = { agents: [], rules: [] }));
    cur.agents.push(val);
  } else if (cur && (key === 'allow' || key === 'disallow')) {
    cur.rules.push([key, val]);
  }
}
const star = groups.find((g) => g.agents.includes('*'));
const starDisallow = (star?.rules ?? []).filter(([k, v]) => k === 'disallow' && v && v !== '/').map(([, v]) => v);
for (const g of groups) {
  if (g === star || g.rules.some(([k, v]) => k === 'disallow' && v === '/')) continue;
  const missing = starDisallow.filter((d) => !g.rules.some(([k, v]) => k === 'disallow' && v === d));
  if (missing.length > 0)
    warn(
      '/robots.txt',
      `[${g.agents.slice(0, 3).join(', ')}${g.agents.length > 3 ? ', …' : ''}] grubu "*" disallow'larını içermiyor: ${missing.join(' ')}`
    );
}

// ── sitemap ───────────────────────────────────────────────────
const smRes = await get('/sitemap.xml');
if (smRes.status !== 200) err('/sitemap.xml', `HTTP ${smRes.status}`);
const smXml = smRes.status === 200 ? await smRes.text() : '';
const locs = [...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
if (locs.length === 0) err('/sitemap.xml', 'hiç <loc> yok');

// ── sayfalar ──────────────────────────────────────────────────
async function checkPage(loc) {
  const path = new URL(loc).pathname;
  const res = await get(path);
  if (res.status !== 200) return err(path, `sitemap'te ama HTTP ${res.status}`);
  const html = await res.text();
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html;

  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1]).trim());
  if (titles.length !== 1) err(path, `<title> sayısı ${titles.length} (1 olmalı)`);
  else {
    const parts = titles[0].split(/\s[|–—-]\s/).map((s) => s.trim().toLowerCase());
    if (new Set(parts).size !== parts.length) err(path, `title'da tekrar eden parça (çift marka?): "${titles[0]}"`);
    if (titles[0].length > 65) warn(path, `title ${titles[0].length} karakter (~60 üstü kesilebilir)`);
  }

  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) err(path, `<h1> sayısı ${h1} (1 olmalı)`);

  const metaTags = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const desc = metaTags.find((a) => a.name === 'description')?.content;
  if (!desc) err(path, 'meta description yok');
  else if (desc.length < 50 || desc.length > 175) warn(path, `description ${desc.length} karakter (50–175 önerilir)`);
  const robotsMeta = metaTags.find((a) => a.name === 'robots')?.content ?? '';
  if (/noindex/i.test(robotsMeta)) err(path, "noindex ama sitemap'te");

  const linkTags = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const canonical = linkTags.find((a) => a.rel === 'canonical')?.href;
  if (!canonical) err(path, 'canonical yok');
  else if (trimSlash(new URL(canonical).pathname) !== trimSlash(path)) err(path, `canonical farklı: ${canonical}`);

  const lang = html.match(/<html[^>]*\slang="([^"]*)"/i)?.[1];
  if (!lang) err(path, '<html lang> yok');

  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (blocks.length === 0) warn(path, 'JSON-LD yok');
  const defined = new Set();
  const refs = new Set();
  const orgIds = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    const keys = Object.keys(node).filter((k) => k !== '@type');
    const id = node['@id'];
    if (typeof id === 'string' && id.includes('#')) {
      if (keys.length === 1) refs.add(id);
      else defined.add(id);
      const types = [].concat(node['@type'] ?? []);
      if (node.address && types.some((t) => /Organization|LocalBusiness/.test(t))) orgIds.add(id);
    }
    Object.values(node).forEach(walk);
  };
  for (const b of blocks) {
    try {
      walk(JSON.parse(b));
    } catch {
      err(path, 'JSON-LD parse edilemiyor');
    }
  }
  if (orgIds.size > 1) err(path, `aynı sayfada birden çok işletme @id'si: ${[...orgIds].join(', ')}`);
  for (const id of refs) if (!defined.has(id)) err(path, `asılı @id referansı (tanım yok): ${id}`);
}

const queue = [...locs];
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (queue.length > 0) await checkPage(queue.shift());
  })
);

// ── llms.txt / ai.txt ─────────────────────────────────────────
const llmsRes = await get('/llms.txt');
if (llmsRes.status !== 200) err('/llms.txt', `HTTP ${llmsRes.status}`);
else {
  const llms = await llmsRes.text();
  const missing = locs.filter((l) => !llms.includes(l));
  if (missing.length > 0)
    warn(
      '/llms.txt',
      `sitemap'te olup llms.txt'te olmayan ${missing.length} URL (drift): ${missing.slice(0, 5).join(' ')}${missing.length > 5 ? ' …' : ''}`
    );
}
const aiRes = await get('/ai.txt');
if (aiRes.status !== 200) err('/ai.txt', `HTTP ${aiRes.status}`);
else {
  const ai = await aiRes.text();
  const training = ai.match(/AI Training:\s*(Yes|No)/i)?.[1]?.toLowerCase();
  const gpt = groups.find((g) => g.agents.some((a) => a.toLowerCase() === 'gptbot'));
  const robotsAllowsTraining = !!gpt && !gpt.rules.some(([k, v]) => k === 'disallow' && v === '/');
  if (training === 'no' && robotsAllowsTraining)
    warn('/ai.txt', 'ai.txt "AI Training: No" ama robots.txt GPTBot\'a izin veriyor (çelişki)');
  if (training === 'yes' && !robotsAllowsTraining)
    warn('/ai.txt', 'ai.txt "AI Training: Yes" ama robots.txt GPTBot\'u engelliyor (çelişki)');
}

// ── özet ──────────────────────────────────────────────────────
console.log(`\nTaranan URL: ${locs.length}`);
for (const w of warns) console.log(`  UYARI  ${w}`);
for (const e of errors) console.log(`  HATA   ${e}`);
console.log(`\n${errors.length} hata, ${warns.length} uyarı`);
process.exit(errors.length > 0 ? 1 : 0);
