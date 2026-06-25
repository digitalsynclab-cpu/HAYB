'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '905073420661';
const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba. Ben HAYB internet sitesinden size ulaşıyorum.');

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

/* ─── Tüm site bilgisi ─────────────────────────────── */
const KNOWLEDGE = [
  // Web paketleri — güncel fiyatlar
  {
    k: ['web', 'site', 'internet', 'fiyat', 'paket', 'starter', 'business', 'professional', 'premium', '5000', '10000', '15000', '20000', 'ssl', 'vercel', 'domain', 'alan adı'],
    a: `HAYB Web Site Paketleri:\n\n• **STARTER – 5.000 ₺**: 3 günde teslim, 3 sayfa, .com.tr/.net.tr (1 Yıl) domain, SSL, Mobil & Tablet uyumlu, WhatsApp, İletişim Formu, Google Harita, KVKK, Modern UI/UX, Hız Optimizasyonu, CDN.\n\n• **BUSINESS – 10.000 ₺**: 4 günde teslim, 5 sayfaya kadar, .com.tr/.net.tr (2 Yıl) domain, Starter özellikleri +Dashboard, Ürün Yönetimi, Yönetim Paneli, Güçlü SEO, Gelişmiş SEO, Blog, Referanslar, Teklif Formu, XML Sitemap.\n\n• **PROFESSIONAL – 15.000 ₺** (Önerilen): 5 günde teslim, 10 sayfaya kadar, .com/.net/.org (1 Yıl) domain, Business özellikleri + Google Analytics, Schema SEO, Google Search Console.\n\n• **PREMIUM – 20.000 ₺**: 7 günde teslim, Sınırsız sayfa, .com/.net/.org (1 Yıl) domain, Professional özellikleri + Çoklu Dil Desteği, Premium Animasyonlar, Yapay Zeka Asistan, 7/24 Canlı Destek.`,
  },
  // Özel Proje
  {
    k: ['özel proje', 'özel yazılım', 'startup', 'girişim', 'sosyal ağ', 'platform', 'büyük proje', 'enterprise'],
    a: `Özel Proje hizmetimiz büyük ölçekli ve özel ihtiyaçlar için tasarlandı:\n\n• Sosyal ağ ve topluluk platformları\n• Startup / girişim ürünleri\n• Tam kapsamlı UI/UX tasarım\n• Sıfırdan yazılım mimarisi\n• Backend API & veritabanı\n• Yapay zeka entegrasyonu\n• Otomasyon altyapısı\n• DevOps & CI/CD kurulumu\n• 7/24 teknik destek & SLA garantisi\n\nFiyat projenin kapsamına göre belirlenir. WhatsApp'tan bizimle iletişime geçin!`,
  },
  // Mobil uygulama
  {
    k: ['mobil', 'uygulama', 'ios', 'android', 'app', 'react native'],
    a: `Mobil uygulama geliştirme hizmetimizde yapabileceklerimiz:\n\n• iOS & Android native tasarım\n• React Native cross-platform geliştirme\n• Swift (iOS) / Kotlin (Android) native seçeneği\n• Push notification sistemi\n• Ödeme sistemi entegrasyonu (iyzico, Stripe)\n• App Store & Google Play yayını\n• Yapay zeka özellikleri\n• Backend API entegrasyonu\n\nFiyat proje kapsamına göre belirlenir — ücretsiz keşif görüşmesi yapılır. WhatsApp'tan ulaşın!`,
  },
  // Sosyal medya
  {
    k: ['sosyal', 'medya', 'instagram', 'post', 'story', 'reels', 'haftalık', 'aylık', '3 aylık', 'içerik', 'tasarım'],
    a: `Sosyal Medya Yönetim Paketleri:\n\n• **Haftalık – 3.000 ₺**: 6 post + 4 story + 2 reels + logo tasarımı, marka uyumlu, PNG + kaynak dosya, 2 revizyon.\n\n• **Aylık – 10.000 ₺** (Önerilen): 20 post + 18 story + 8 reels + logo + marka kimlik rehberi + içerik takvimi, 8 revizyon.\n\n• **3 Aylık – 25.000 ₺**: Aylık paketin tüm özellikleri + video/reels tasarımı + reklam görseli + satış platformları logo/banner + kampanya içerikleri + haftalık rapor + öncelikli destek.`,
  },
  // QR Menü
  {
    k: ['qr', 'menü', 'menu', 'restoran', 'kafe', 'dijital menü'],
    a: `QR Menü Paketleri:\n\n• **QR Menü Temel – 1.500 ₺**: Dijital QR menü, mobil uyumlu, 1 şube, 6 ay destek.\n\n• **QR Menü Standart – 3.000 ₺**: Temel + kategori/ürün yönetimi, marka rengi/logo, çoklu şube, sınırsız güncelleme, 1 yıl destek.\n\n• **QR Menü Premium – 5.000 ₺** (Önerilen): Standart + yapay zeka ile profesyonel ürün görselleri + özel tema + sınırsız şube + öncelikli destek.`,
  },
  // Destek / süre / teslim
  {
    k: ['destek', 'süre', 'ne kadar', 'kaç gün', 'teslim', 'bakım', 'revizyon'],
    a: `Teslim süreleri pakete göre değişir:\n• Starter: 3 gün\n• Business: 4 gün\n• Professional: 5 gün\n• Premium: 7 gün\n\nPremium pakette 7/24 canlı destek dahildir. Diğer paketlerde yayın sonrası destek için anlaşma yapılabilir.`,
  },
  // Projeler / portfolyo
  {
    k: ['proje', 'portfolyo', 'örnek', 'bebekler', 'ekotakip', 'qr menü sistemi'],
    a: `Tamamladığımız projelerden bazıları:\n\n• **BebeklerSoruyor**: Anne ve anne adayları için topluluk platformu (bebeklersoruyor.com)\n• **EkoTakip Pro**: Enerji, su ve doğalgaz tüketim takip platformu\n• **QR Menü Sistemi**: Restoran ve kafeler için dijital menü altyapısı`,
  },
  // Hakkımda / kim
  {
    k: ['kim', 'hayb', 'hakkında', 'siz', 'ne yapıyorsunuz', 'ne yapıyor', 'teknoloji', 'şirket'],
    a: `HAYB, işletmelere dijital sistem kuran bir teknoloji şirketidir. Web uygulamaları, mobil uygulamalar, yapay zeka sistemleri, otomasyon altyapıları ve özel yazılım geliştirme hizmetleri sunuyoruz. Her projeyi işletmenizin büyüme altyapısı olarak ele alıyoruz.`,
  },
  // İletişim
  {
    k: ['iletişim', 'ulaş', 'whatsapp', 'telefon', 'mesaj', 'nasıl ulaşabilirim', 'görüşme'],
    a: `WhatsApp üzerinden hızlıca ulaşabilirsiniz. Aşağıdaki "WhatsApp ile Yaz" butonuna tıklamanız yeterli. İletişim formundan da mesaj bırakabilirsiniz.`,
  },
  // SEO
  {
    k: ['seo', 'google', 'arama', 'optimizasyon', 'search console', 'analytics', 'schema'],
    a: `SEO hizmetlerimiz pakete göre değişir:\n\n• **Business ve üstü**: Güçlü SEO, Gelişmiş SEO Optimizasyonu, XML Sitemap\n• **Professional ve üstü**: + Google Analytics, Schema SEO (Yapısal Veri), Google Search Console\n• **Premium**: Tüm SEO özellikleri dahil`,
  },
  // Yapay zeka
  {
    k: ['yapay zeka', 'ai', 'artificial', 'zeka', 'asistan', 'chatbot'],
    a: `Yapay zeka hizmetlerimiz:\n\n• Premium web paketinde Yapay Zeka Asistan dahildir\n• QR Menü Premium'da yapay zeka ile otomatik ürün görseli üretimi\n• Özel projelerde AI model entegrasyonu ve chatbot geliştirme\n• Otomasyon sistemlerine AI entegrasyonu`,
  },
  // Alan adı / domain
  {
    k: ['domain', 'alan adı', '.com', '.tr', '.net', '.org'],
    a: `Alan adı (domain) bilgileri:\n\n• **Starter**: .com.tr / .net.tr / .org.tr — 1 Yıl Ücretsiz\n• **Business**: .com.tr / .net.tr / .org.tr — 2 Yıl Ücretsiz\n• **Professional**: .com / .net / .org — 1 Yıl Ücretsiz\n• **Premium**: .com / .net / .org — 1 Yıl Ücretsiz`,
  },
];

const GREETINGS = [
  'Merhaba! 👋 Size nasıl yardımcı olabilirim?',
  'Selam! Bir şey mi merak ediyorsunuz?',
  'Merhaba! Paketlerimiz veya projelerimiz hakkında soru sorabilirsiniz.',
];

const FALLBACKS = [
  'Bu konuda size en iyi WhatsApp üzerinden yardımcı olabiliriz. Hemen yazabilirsiniz!',
  'Tam olarak anlayamadım, biraz daha açabilir misiniz? Ya da WhatsApp\'tan bize ulaşabilirsiniz.',
  'Bunun için WhatsApp\'tan bize yazırsanız daha detaylı bilgi verebiliriz.',
];

function getAnswer(input: string): string {
  const lower = input.toLowerCase().trim();

  // Selamlama
  if (['merhaba', 'selam', 'hey', 'iyi günler', 'günaydın'].some(g => lower.includes(g))) {
    return 'Merhaba! 😊 Size nasıl yardımcı olabilirim? Web sitesi, sosyal medya, QR menü veya projelerimiz hakkında soru sorabilirsiniz.';
  }

  // Teşekkür
  if (['teşekkür', 'sağ ol', 'tamam', 'anladım', 'harika'].some(g => lower.includes(g))) {
    return 'Rica ederim! Başka bir sorunuz olursa buradayım. Daha fazla bilgi için WhatsApp\'tan da yazabilirsiniz.';
  }

  // Bilgi tabanı araması
  for (const item of KNOWLEDGE) {
    if (item.k.some(k => lower.includes(k))) {
      return item.a;
    }
  }

  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

/* ─── Logo SVG (inline — dış URL'ye bağlı değil) ── */
function HAYBLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="HAYB Logo">
      <rect width="100" height="100" fill="#060B14" />
      {/* H harfi sola, B harfi sağa — basit HAYB logosu */}
      <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="700" fontFamily="Arial, sans-serif" fill="white" letterSpacing="-2">H</text>
    </svg>
  );
}

export function HAYBAssistant() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: GREETINGS[0] },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setShowGreeting(true), 2500);
    const t2 = setTimeout(() => setShowGreeting(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [messages, open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: 'user', text: trimmed };
    const answer = getAnswer(trimmed);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Kısa gecikme ile asistan cevabı — daha doğal hissettiriyor
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    }, 400);
  };

  return (
    <>
      {/* Chat penceresi */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[90] w-[calc(100vw-32px)] sm:w-[360px] max-h-[70vh] flex flex-col rounded-2xl border border-[#2563EB]/20 bg-[#0A1220] shadow-2xl shadow-black/70 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#060B14] border-b border-[#2563EB]/15 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2563EB]/30">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F0F6FF] text-sm font-semibold">HAYB Asistan</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-green-400 text-[10px]">Çevrimiçi</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0" aria-label="Kapat">
              <X size={15} className="text-[#8BA3C7]" />
            </button>
          </div>

          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-[9px]">H</span>
                  </div>
                )}
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#2563EB] text-white rounded-tr-sm'
                    : 'bg-[#111E35] text-[#C8D8F0] border border-[#2563EB]/10 rounded-tl-sm'
                }`}>
                  {/* Bold markdown basit render */}
                  {msg.text.split('**').map((part, j) =>
                    j % 2 === 1
                      ? <strong key={j} className="text-[#F0F6FF]">{part}</strong>
                      : <span key={j}>{part}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Hızlı sorular */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-none">
            {['Web paketleri', 'Sosyal medya', 'QR Menü', 'Mobil Uygulama', 'Özel Proje'].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); setTimeout(handleSend, 0); setMessages(prev => [...prev, { role: 'user', text: q }]); setTimeout(() => setMessages(prev => [...prev, { role: 'assistant', text: getAnswer(q) }]), 400); }}
                className="px-3 py-1.5 rounded-full text-[10px] font-medium border border-[#2563EB]/20 bg-[#2563EB]/08 text-[#60A5FA] whitespace-nowrap hover:bg-[#2563EB]/15 transition-colors flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* WhatsApp butonu */}
          <div className="px-3 pb-2 flex-shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-green-500/15 hover:bg-green-500/25 border border-green-500/20 text-green-400 text-xs font-medium transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ile Yaz
            </a>
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-[#2563EB]/10 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Mesaj yazın..."
              className="flex-1 bg-[#111E35] border border-[#2563EB]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#F0F6FF] placeholder-[#8BA3C7]/40 focus:outline-none focus:border-[#2563EB]/40 min-h-[44px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
              aria-label="Gönder"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Karşılama balonu */}
      {showGreeting && !open && (
        <div className="fixed bottom-24 right-20 z-[90] bg-[#0D1526] border border-[#2563EB]/20 rounded-2xl rounded-br-sm px-4 py-2 shadow-xl pointer-events-none">
          <p className="text-[#F0F6FF] text-xs whitespace-nowrap">👋 Merhaba! Yardımcı olabilir miyim?</p>
        </div>
      )}

      {/* Buton */}
      <button
        onClick={() => { setOpen(p => !p); setShowGreeting(false); }}
        className="fixed bottom-6 right-4 sm:right-6 z-[90] w-14 h-14 rounded-full shadow-2xl shadow-[#2563EB]/25 hover:scale-110 active:scale-95 transition-transform duration-200 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] border-2 border-[#3B82F6]/40 flex items-center justify-center"
        aria-label={open ? 'Asistanı kapat' : 'HAYB Asistan'}
      >
        {open
          ? <X size={22} className="text-white" />
          : <span className="text-white font-bold text-lg tracking-tighter">H</span>
        }
      </button>
    </>
  );
}
