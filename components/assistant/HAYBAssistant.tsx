'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import Link from 'next/link';
import { getAnswer, GREETING } from '@/components/assistant/engine';
import { whatsappUrl } from '@/data/site';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

const QUICK = ['Kampanya', 'Mobil uygulama', 'Web şablonları', 'Web sitesi fiyatları', 'Reklam yönetimi', 'Logo tasarımı', 'Mobil oyun', 'Yönetim paneli'];

const INTERNAL = /(\/(?:template|fiyatlandirma|hizmetler|projeler|proje-baslat|iletisim|kvkk|gizlilik-politikasi|cerez-politikasi)[\w/-]*)/g;
const linkCls = 'font-semibold underline underline-offset-2 hover:text-lime';

/** Cevaplardaki bağlantıları tıklanabilir yapar: harici (http/https) ve site içi yollar (/template/web1 gibi). */
function linkify(text: string) {
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
        <Link key={`p${i}-${j}`} href={seg} className={linkCls}>
          {seg}
        </Link>
      ) : (
        <span key={`s${i}-${j}`}>{seg}</span>
      ),
    );
  });
}

export default function HAYBAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'assistant', text: GREETING }]);
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { id: nextId.current++, role: 'user', text },
      { id: nextId.current++, role: 'assistant', text: getAnswer(text) },
    ]);
    setInput('');
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
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
    return () => document.removeEventListener('keydown', onKey);
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
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(38rem,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-ink-900 shadow-glass sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 id={titleId} className="font-bold">
              HAYB Asistan
            </h2>
            <button type="button" onClick={close} aria-label="Asistanı kapat" className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10">
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <div ref={logRef} role="log" aria-live="polite" aria-label="Sohbet" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <p
                key={m.id}
                className={`max-w-[92%] whitespace-pre-line [overflow-wrap:anywhere] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed ${
                  m.role === 'user' ? 'ml-auto rounded-br-sm bg-lime text-ink-950' : 'rounded-bl-sm bg-white/10 text-fg'
                }`}
              >
                {m.role === 'assistant' ? linkify(m.text) : m.text}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="min-h-10 rounded-full border border-white/20 px-3.5 text-sm text-fg-muted transition hover:border-lime/60 hover:text-fg"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <label htmlFor={`${titleId}-input`} className="sr-only">
              Sorunuzu yazın
            </label>
            <input
              id={`${titleId}-input`}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sorunuzu yazın…"
              autoComplete="off"
              className="min-h-11 flex-1 rounded-xl border border-white/15 bg-ink-950 px-4 text-fg placeholder:text-fg-muted focus:border-lime"
            />
            <button type="submit" aria-label="Gönder" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-ink-950">
              <Send aria-hidden className="h-5 w-5" />
            </button>
          </form>

          <a
            href={whatsappUrl('Merhaba, HAYB internet sitesinden size ulaşıyorum.')}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t border-white/10 px-4 py-3 text-center text-sm font-semibold text-lime hover:bg-white/5"
          >
            WhatsApp ile yaz
          </a>
        </div>
      )}
    </>
  );
}
