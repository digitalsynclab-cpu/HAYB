import { describe, expect, it } from 'vitest';
import { getAnswer, normalize, GREETING, FALLBACK } from '@/components/assistant/engine';
import { webPackages, socialMediaPlans, qrMenuPlans } from '@/data/pricing';

describe('normalize', () => {
  it('Türkçe büyük İ ve aksanları doğru katlar', () => {
    expect(normalize('İletişim')).toBe('iletisim');
    expect(normalize('QR MENÜ Fiyatı?')).toBe('qr menu fiyati');
    expect(normalize('  Sosyal   Medya!! ')).toBe('sosyal medya');
  });
});

describe('asistan yönlendirmesi', () => {
  it('"QR menü fiyatı" QR Menü cevabına gider', () => {
    const a = getAnswer('QR menü fiyatı');
    expect(a).toContain('QR Menü');
    expect(a).not.toContain('STARTER');
  });
  it('"Web sitesi fiyatı" web paketlerine gider', () => {
    expect(getAnswer('Web sitesi fiyatı')).toContain('STARTER');
  });
  it('"Sosyal medya paketi" sosyal medya paketlerine gider', () => {
    const a = getAnswer('Sosyal medya paketi');
    expect(a).toContain('Haftalık Paket');
    expect(a).not.toContain('STARTER');
  });
  it('"Merhaba, QR menü fiyatı?" yalnızca selamlama dönmez', () => {
    const a = getAnswer('Merhaba, QR menü fiyatı?');
    expect(a).not.toBe(GREETING);
    expect(a).toContain('QR Menü');
  });
  it('yalnızca selamlama ve teşekkür yanıtlanır', () => {
    expect(getAnswer('Merhaba')).toBe(GREETING);
    expect(getAnswer('Teşekkürler')).toContain('Rica ederim');
  });
  it('"İLETİŞİM" büyük İ ile de eşleşir', () => {
    expect(getAnswer('İLETİŞİM')).toContain('WhatsApp');
  });
  it('boş ve anlamsız girdi fallback döner', () => {
    expect(getAnswer('   ')).toBe(FALLBACK);
    expect(getAnswer('xyzqw')).toBe(FALLBACK);
  });
});

describe('mobil öncelik ve mobil oyun', () => {
  it('"mobil uygulama" mobil uygulama cevabına gider (QR/web değil)', () => {
    const a = getAnswer('Mobil uygulama yaptırmak istiyorum');
    expect(a).toContain('Mobil uygulama');
    expect(a).not.toContain('STARTER');
    expect(a).not.toContain('QR Menü paketleri');
  });
  it('"mobil oyun" BB Block ve mağaza bağlantılarını verir', () => {
    const a = getAnswer('mobil oyun yapıyor musunuz?');
    expect(a).toContain('BB Block: Wood Puzzle');
    expect(a).toContain('https://apps.apple.com/us/app/bb-block-wood-puzzle/id6798715444');
    expect(a).toContain('play.google.com/store/apps/details?id=com.eyegames.bbblock');
  });
  it('"QR menü fiyatı" hâlâ QR cevabına gider', () => {
    expect(getAnswer('qr menü fiyatı')).toContain('QR Menü paketleri');
  });
});

describe('fiyat tutarlılığı: asistan cevapları data/pricing.ts ile aynı', () => {
  it('her web paketinin adı ve fiyatı cevapta geçer', () => {
    const a = getAnswer('web sitesi fiyatı');
    for (const p of webPackages) expect(a).toContain(`${p.name} – ${p.price}`);
  });
  it('sosyal medya fiyatları', () => {
    const a = getAnswer('sosyal medya');
    for (const p of socialMediaPlans) expect(a).toContain(p.price);
  });
  it('QR menü fiyatları güncel: 2.500 / 5.000 / 7.500', () => {
    expect(qrMenuPlans.map((p) => p.price)).toEqual(['2.500 ₺', '5.000 ₺', '7.500 ₺']);
  });
  it('QR menü fiyatları', () => {
    const a = getAnswer('qr menü');
    for (const p of qrMenuPlans) expect(a).toContain(p.price);
  });
  it('paket kimlikleri benzersizdir', () => {
    const ids = [...webPackages, ...socialMediaPlans, ...qrMenuPlans].map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('asistan yeni içerikleri bilir', () => {
  it('kampanya ve indirim sorusu kampanya bilgisini verir', () => {
    for (const q of ['Kampanya var mı?', 'indirim ne kadar', 'İndirimli fiyatlar']) {
      const a = getAnswer(q);
      expect(a, q).toContain('%35');
      expect(a, q).toContain('tarihine kadar');
    }
  });
  it('şablon sorusu 8 şablonu listeler', () => {
    const a = getAnswer('Web sitesi şablonları var mı?');
    expect(a).toContain('/template/web1');
    expect(a).toContain('/template/web8');
    expect(getAnswer('template')).toContain('Kahvehan');
  });
  it('yönetim paneli örneklerini bilir', () => {
    const a = getAnswer('Yönetim paneli örnekleri');
    expect(a).toContain('StoreHub');
    expect(a).toContain('/hizmetler/yonetim-paneli');
  });
  it('logo fiyatını ve reklam paketlerini bilir', () => {
    expect(getAnswer('logo tasarımı fiyatı')).toContain('499');
    const ads = getAnswer('Google Ads ve Meta reklam paketi');
    expect(ads).toContain('15.000');
    expect(ads).toContain('Google hediye');
    expect(ads).toContain('bütçe');
  });
  it('KVKK ve çerez sorusu firma unvanını verir', () => {
    expect(getAnswer('KVKK veri sorumlusu kim')).toContain('Yunus Emre Başkan');
    expect(getAnswer('çerez politikası')).toContain('/cerez-politikasi');
  });
  it('mobil uygulama cevabı Taleb-e ve EkoTakip Pro’yu içerir', () => {
    const a = getAnswer('Mobil uygulama örnekleri');
    expect(a).toContain('Taleb-e');
    expect(a).toContain('EkoTakip Pro');
    expect(getAnswer('Taleb-e nedir')).toContain('Taleb-e');
  });
  it('önceki yönlendirmeler bozulmadı', () => {
    expect(getAnswer('QR menü fiyatı')).toContain('QR Menü');
    expect(getAnswer('Mobil oyun')).toContain('BB Block');
    expect(getAnswer('Sosyal medya paketi')).toContain('Haftalık Paket');
    expect(getAnswer('Web sitesi fiyatı')).toContain('STARTER');
  });
});

import { getReply, START_TOPICS } from '@/components/assistant/engine';

describe('asistan cevap yapısı (kısayollar ve öneriler)', () => {
  it('her cevapta WhatsApp kısayolu ve önerilen sorular vardır', () => {
    const r = getReply('Kampanya var mı?');
    expect(r.topicId).toBe('campaign');
    expect(r.actions.some((a) => a.href.startsWith('/paketler'))).toBe(true);
    const wa = r.actions.find((a) => a.external)!;
    expect(wa.href).toContain('wa.me');
    expect(r.followUps.length).toBeGreaterThanOrEqual(2);
  });
  it('açılış konu kartlarının her biri anlamlı bir konuya yönlenir', () => {
    for (const t of START_TOPICS) {
      const r = getReply(t.label);
      expect(r.topicId, t.label).not.toBeNull();
    }
  });
  it('önerilen soruların hepsi yanıtlanabilir', () => {
    for (const q of ['Kampanya', 'Web şablonları', 'Mobil uygulama', 'Teslim süresi', 'Alan adı', 'Özel yazılım', 'Teklif almak istiyorum', 'İletişim']) {
      expect(getReply(q).topicId, q).not.toBeNull();
    }
  });
  it('konu bulunamazsa nazik yanıt ve varsayılan öneriler döner', () => {
    const r = getReply('asdf qwer');
    expect(r.topicId).toBeNull();
    expect(r.followUps.length).toBeGreaterThan(0);
  });
});
