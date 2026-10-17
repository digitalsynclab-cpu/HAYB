// IndexNow: Bing, Yandex vb. arama motorlarına sitemap'teki tüm URL'lerin güncellendiğini bildirir.
// ChatGPT ve Copilot aramaları Bing indeksini kullanır; yayından sonra çalıştırın: node scripts/indexnow.mjs
const HOST = 'www.hayb.com.tr';
const KEY = '815cf23c69636715253b6072e04d0d67'; // public/815cf23c69636715253b6072e04d0d67.txt ile aynı olmalı

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error('Sitemap boş ya da okunamadı.');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URL gönderildi → HTTP ${res.status}`);
