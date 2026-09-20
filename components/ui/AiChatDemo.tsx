'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, Send } from 'lucide-react';

interface Line {
  from: 'user' | 'ai';
  text: string;
}

/**
 * Örnek senaryo: bir kafenin yapay zekâ işletme asistanı, müşteriyle otomatik yazışır.
 * Tümü demodur (gerçek bir işletme veya müşteri değildir).
 */
const SCRIPT: Line[] = [
  { from: 'user', text: 'Merhaba, bu akşam 4 kişilik masa var mı?' },
  { from: 'ai', text: 'Merhaba! Bu akşam 20:00’de 4 kişilik, pencere kenarı bir masamız var. Rezervasyon yapayım mı?' },
  { from: 'user', text: 'Evet, Ayşe Yılmaz adına lütfen.' },
  { from: 'ai', text: 'Rezervasyonunuz oluşturuldu: bugün 20:00, 4 kişi. Öncesinde size hatırlatma göndereceğim.' },
  { from: 'user', text: 'Glütensiz seçenekler var mı?' },
  { from: 'ai', text: 'Evet, menüde 6 glütensiz ürünümüz var. Listeyi hemen göndereyim mi?' },
];

/** Hangi mesaj sayısında hangi otomasyon adımı tamamlanır */
const AUTOMATION = [
  { at: 2, text: 'Müşteri talebi anlaşıldı' },
  { at: 4, text: 'Rezervasyon takvime eklendi' },
  { at: 4, text: 'Hatırlatma mesajı planlandı' },
  { at: 6, text: 'Menü bilgisi veriden okundu' },
];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function AiChatDemo({ className = '' }: { className?: string }) {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<Line['from'] | null>(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Yalnızca ekranda görünürken oynat (pil ve performans)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        setShown(0);
        await wait(700);
        for (let i = 0; i < SCRIPT.length && !cancelled; i++) {
          const line = SCRIPT[i];
          setTyping(line.from);
          await wait(line.from === 'ai' ? 1300 : 800);
          if (cancelled) return;
          setTyping(null);
          setShown(i + 1);
          await wait(600 + line.text.length * 14);
        }
        await wait(3800);
      }
    })();
    return () => {
      cancelled = true;
      setTyping(null);
    };
  }, [visible]);

  const count = shown;
  const lines = SCRIPT.slice(0, count);

  return (
    <figure ref={rootRef} className={className}>
      <p className="sr-only">
        Örnek senaryo: bir kafenin yapay zekâ asistanı müşterinin masa talebini yanıtlar, rezervasyonu oluşturur ve menü sorusunu cevaplar. Tüm veriler demodur.
      </p>
      <div aria-hidden className="grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-10">
        {/* Telefon çerçevesi */}
        <div className="mx-auto w-full max-w-[19rem] rounded-[2.4rem] border-[6px] border-ink-700 bg-ink-950 p-1.5 shadow-glass">
          <div className="relative overflow-hidden rounded-[1.9rem] bg-ink-900">
            <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink-950" />
            {/* Başlık */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-ink-800 px-4 pb-3 pt-9">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-xs font-extrabold text-ink-950">AI</span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Örnek Kafe Asistanı</p>
                <p className="flex items-center gap-1.5 text-[0.7rem] text-fg-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Çevrimiçi · 7/24
                </p>
              </div>
            </div>
            {/* Mesajlar */}
            <div className="flex h-[23rem] flex-col justify-end gap-2 overflow-hidden px-3 py-3 text-[0.82rem] leading-snug sm:h-[25rem]">
              {lines.map((l, i) => (
                <p
                  key={i}
                  className={`msg-in max-w-[86%] rounded-2xl px-3.5 py-2 ${
                    l.from === 'user' ? 'from-user ml-auto rounded-br-sm bg-lime text-ink-950' : 'rounded-bl-sm bg-white/10 text-fg'
                  }`}
                >
                  {l.text}
                </p>
              ))}
              {typing && (
                <div className={`msg-in flex w-14 items-center justify-center gap-1 rounded-2xl px-3.5 py-3 ${typing === 'user' ? 'from-user ml-auto rounded-br-sm bg-lime/80' : 'rounded-bl-sm bg-white/10'}`}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className={`typing-dot h-1.5 w-1.5 rounded-full ${typing === 'user' ? 'bg-ink-950' : 'bg-fg-muted'}`} style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
              )}
            </div>
            {/* Yazı alanı */}
            <div className="flex items-center gap-2 border-t border-white/10 bg-ink-800 px-3 py-2.5">
              <span className="flex-1 rounded-full bg-ink-950 px-3.5 py-2 text-[0.75rem] text-fg-muted">Mesaj yazın…</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink-950">
                <Send className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Arka planda çalışan otomasyon */}
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-fg-muted">Arka planda otomatik</p>
          <ul className="mt-3 space-y-2.5">
            {AUTOMATION.map((a) => {
              const done = count >= a.at;
              return (
                <li key={a.text} className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-[0.9rem] transition-colors duration-500 ${done ? 'border-lime/40 bg-lime/[0.07]' : 'border-white/10 opacity-50'}`}>
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${done ? 'check-in bg-lime text-ink-950' : 'border border-white/20'}`}>{done && <Check className="h-3.5 w-3.5" />}</span>
                  {a.text}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-fg-muted">İşletmenizin sık sorulan sorularını, rezervasyon ve stok bilgisini öğrenir; müşteriyle 7/24 yazışır ve işi sizin sistemlerinize işler.</p>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-fg-muted">Örnek senaryo ve demo veri. Gerçek bir işletme veya müşteri değildir.</figcaption>
    </figure>
  );
}
