'use client';
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import { getReply, GREETING, START_TOPICS, type Reply, type ReplyAction } from '@/components/assistant/engine';
import { whatsappUrl } from '@/data/site';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  reply?: Reply;
}

const clock = () => new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
const greetingMessage = (): Message => ({ id: 0, role: 'assistant', text: GREETING, time: clock() });

const INTERNAL = /(\/(?:template|fiyatlandirma|hizmetler|projeler|proje-baslat|iletisim|kvkk|gizlilik-politikasi|cerez-politikasi|hakkimizda)[\w/#-]*)/g;
const linkCls = 'font-semibold text-lime underline underline-offset-2';

/** Cevaplardaki bağlantıları tıklanabilir yapar: harici (http/https) ve site içi yollar (/template/web1 gibi). */
function linkify(text: string, onNavigate: () => void) {
  return text.split(/(https?:\/\/[^\s]+)/g).flatMap((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return [
        <a key={`u${i}`} href={part} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {part.includes('apple.com') ? 'App Store bağlantısı' : part.includes('play.google.com') ? 'Google Play bağlantısı' : part}
        </a>,
      ];
    }
    // split, yakalama grubu sayesinde eşleşen site içi yolları tek indekslerde döndürür
    return part.split(INTERNAL).map((seg, j) =>
      j % 2 === 1 ? (
        <Link key={`p${i}-${j}`} href={seg} onClick={onNavigate} className={linkCls}>
          {seg}
        </Link>
      ) : (
        <span key={`s${i}-${j}`}>{seg}</span>
      ),
    );
  });
}

/** Düz metni okunaklı bloklara çevirir: "• " ile başlayan satırlar madde işaretli liste olur. */
function Rich({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const out: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = (k: number) => {
    if (!bullets.length) return;
    out.push(
      <ul key={`ul${k}`} className="space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span className="min-w-0">{linkify(b, onNavigate)}</span>
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };
  text.split('\n').forEach((line, i) => {
    if (line.startsWith('• ')) bullets.push(line.slice(2));
    else {
      flush(i);
      if (line.trim()) out.push(<p key={`p${i}`}>{linkify(line, onNavigate)}</p>);
    }
  });
  flush(999);
  return <div className="space-y-2.5">{out}</div>;
}

function Avatar() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border border-lime/40 bg-ink-950">
      <Image src="/brand/hayb-mark-small.png" alt="" width={20} height={20} className="h-5 w-5" />
    </span>
  );
}

function Action({ a, onNavigate }: { a: ReplyAction; onNavigate: () => void }) {
  const cls =
    'press inline-flex min-h-10 items-center gap-1.5 rounded-full border border-lime/50 px-3.5 text-sm font-semibold text-lime transition hover:bg-lime hover:text-ink-950';
  return a.external ? (
    <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {a.label} <ArrowUpRight aria-hidden className="h-4 w-4" />
    </a>
  ) : (
    <Link href={a.href} onClick={onNavigate} className={cls}>
      {a.label} <ArrowUpRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}

export default function HAYBAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => [greetingMessage()]);
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const typingRef = useRef(false);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const started = messages.length > 1;
  const lastReply = [...messages].reverse().find((m) => m.reply)?.reply;
  const lastAssistantId = [...messages].reverse().find((m) => m.role === 'assistant')?.id;

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);
  // Site içi bağlantıya gidince (özellikle mobilde) asistan ekranı kapanır, sayfa görünür.
  const onNavigate = useCallback(() => setOpen(false), []);

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || typingRef.current) return;
    const reply = getReply(text);
    setMessages((m) => [...m, { id: nextId.current++, role: 'user', text, time: clock() }]);
    setInput('');
    typingRef.current = true;
    setTyping(true);
    const delay = Math.min(1200, 550 + reply.text.length * 1.1);
    timers.current.push(
      window.setTimeout(() => {
        setMessages((m) => [...m, { id: nextId.current++, role: 'assistant', text: reply.text, time: clock(), reply }]);
        typingRef.current = false;
        setTyping(false);
      }, delay),
    );
  }, []);

  const reset = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    typingRef.current = false;
    setTyping(false);
    setInput('');
    setMessages([greetingMessage()]);
  }, []);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  // Yeni mesaj veya "yazıyor" göstergesi geldiğinde en alta kaydır
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  // Açıkken: mobilde arka plan kaydırması kilitlenir; klavye açılınca panel görünür alana sığar (visualViewport).
  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia('(max-width: 639px)');
    const vv = window.visualViewport;
    const prevOverflow = document.body.style.overflow;
    if (mobile.matches) document.body.style.overflow = 'hidden';

    const fit = () => {
      const el = panelRef.current;
      if (!el) return;
      if (mobile.matches && vv) {
        el.style.height = `${vv.height}px`;
        el.style.top = `${vv.offsetTop}px`;
      } else {
        el.style.height = '';
        el.style.top = '';
      }
      const log = logRef.current;
      if (log) log.scrollTop = log.scrollHeight;
    };
    fit();
    vv?.addEventListener('resize', fit);
    vv?.addEventListener('scroll', fit);

    // Klavye yalnızca masaüstünde kendiliğinden açılır; dokunmatik cihazda kullanıcı yazmak için dokunur.
    if (window.matchMedia('(min-width: 640px) and (pointer: fine)').matches) inputRef.current?.focus();
    else panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab') return;
      const els = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input') ?? []);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      vv?.removeEventListener('resize', fit);
      vv?.removeEventListener('scroll', fit);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="fixed bottom-4 right-4 z-40 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-lime px-5 font-semibold text-ink-950 shadow-lime transition hover:scale-[1.03] sm:bottom-6 sm:right-6"
        >
          <MessageCircle aria-hidden className="h-6 w-6" />
          <span className="hidden sm:inline">HAYB Asistan</span>
          <span className="sr-only sm:hidden">HAYB Asistan&apos;ı aç</span>
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="asst-in fixed inset-x-0 top-0 z-[70] flex h-[100dvh] flex-col overflow-hidden bg-ink-900 outline-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[min(40rem,calc(100dvh-3rem))] sm:w-[25rem] sm:rounded-3xl sm:border sm:border-white/15 sm:shadow-glass"
        >
          {/* Başlık */}
          <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-lime/40 bg-ink-950">
              <Image src="/brand/hayb-mark-small.png" alt="" width={26} height={26} className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <h2 id={titleId} className="truncate text-base font-bold">
                HAYB Asistan
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-fg-muted">
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-lime" /> <span className="truncate">Çevrimiçi · 7/24</span>
              </p>
            </div>
            {started && (
              <button type="button" onClick={reset} aria-label="Sohbeti temizle" className="grid h-11 w-11 place-items-center rounded-xl text-fg-muted hover:bg-white/10 hover:text-fg">
                <RotateCcw aria-hidden className="h-5 w-5" />
              </button>
            )}
            <a
              href={whatsappUrl('Merhaba, HAYB internet sitesinden size ulaşıyorum.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp'ta devam et"
              className="grid h-11 w-11 place-items-center rounded-xl text-lime hover:bg-white/10"
            >
              <MessageCircle aria-hidden className="h-5 w-5" />
            </a>
            <button type="button" onClick={close} aria-label="Asistanı kapat" className="grid h-11 w-11 place-items-center rounded-xl hover:bg-white/10">
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>

          {/* Sohbet */}
          <div ref={logRef} role="log" aria-live="polite" aria-label="Sohbet" className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`msg-in flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex max-w-[92%] items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && <Avatar />}
                  <div
                    className={`min-w-0 [overflow-wrap:anywhere] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed ${
                      m.role === 'user' ? 'rounded-br-md bg-lime font-medium text-ink-950' : 'rounded-bl-md bg-white/[0.08] text-fg'
                    }`}
                  >
                    {m.role === 'assistant' ? <Rich text={m.text} onNavigate={onNavigate} /> : m.text}
                  </div>
                </div>
                <span className={`mt-1 text-[0.7rem] text-fg-muted ${m.role === 'assistant' ? 'ml-10' : ''}`}>{m.time}</span>
                {m.reply && m.id === lastAssistantId && !typing && (
                  <div className="ml-10 mt-2 flex flex-wrap gap-2">
                    {m.reply.actions.map((a) => (
                      <Action key={a.label} a={a} onNavigate={onNavigate} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="msg-in flex items-end gap-2" aria-label="Asistan yazıyor">
                <Avatar />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-3.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="typing-dot h-2 w-2 rounded-full bg-fg-muted" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {!started && (
              <div className="pt-1">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-fg-muted">Popüler konular</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {START_TOPICS.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => send(t.label)}
                      className="press flex min-h-[3.6rem] flex-col items-start justify-center rounded-xl border border-white/12 bg-white/[0.04] px-3.5 text-left transition hover:border-lime/60 hover:bg-white/[0.08]"
                    >
                      <span className="text-[0.92rem] font-semibold leading-tight">{t.label}</span>
                      <span className="text-xs text-fg-muted">{t.hint}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-fg-muted">Otomatik asistanım; kesin teklif ve özel talepler için WhatsApp&apos;tan bize yazabilirsiniz.</p>
              </div>
            )}
          </div>

          {/* Önerilen sorular (tek satır, yatay kaydırılır) */}
          {started && lastReply && !typing && (
            <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-4 pb-2 pt-1">
              {lastReply.followUps.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="press min-h-10 shrink-0 whitespace-nowrap rounded-full border border-white/20 px-4 text-sm text-fg-muted transition hover:border-lime/60 hover:text-fg"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Yazı alanı */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-ink-900 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <label htmlFor={`${titleId}-input`} className="sr-only">
              Sorunuzu yazın
            </label>
            <input
              id={`${titleId}-input`}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => window.setTimeout(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight }), 250)}
              placeholder="Sorunuzu yazın…"
              autoComplete="off"
              enterKeyHint="send"
              className="min-h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-ink-950 px-5 text-base text-fg placeholder:text-fg-muted focus:border-lime"
            />
            <button
              type="submit"
              aria-label="Gönder"
              disabled={!input.trim() || typing}
              className="press grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-ink-950 transition disabled:opacity-40"
            >
              <Send aria-hidden className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
