'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { STORAGE_KEY, convertPrices, isLocale, type Locale } from '@/lib/i18n/locale';

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
}

const LocaleCtx = createContext<Ctx>({ locale: 'tr', setLocale: () => {}, pickerOpen: false, openPicker: () => {}, closePicker: () => {} });
export const useLocale = () => useContext(LocaleCtx);

type Dict = Record<string, string>;
let dictCache: Promise<{ en: Dict; de: Dict }> | null = null;
const loadDict = () => (dictCache ??= import('@/data/i18n-dict').then((m) => ({ en: m.DICT_EN, de: m.DICT_DE })));

const ATTRS = ['placeholder', 'aria-label', 'title'] as const;
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE']);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Sayfa metinlerini seçili dile çeviren katman. Metinler sunucuda Türkçe üretilir; dil değişince tarayıcıda
 * sözlükten (data/i18n-dict.ts) çevrilir, ₺ tutarları seçili para birimine çevrilir. Orijinal metinler saklanır,
 * Türkçeye dönüldüğünde birebir geri yüklenir. Şablon demo sayfalarına (/template/...) dokunulmaz.
 */
function useTranslateDom(locale: Locale, pathname: string) {
  const textOrig = useRef(new WeakMap<Node, string>());
  const textOut = useRef(new WeakMap<Node, string>());
  const attrState = useRef(new WeakMap<Element, Map<string, { orig: string; out: string }>>());
  const splitState = useRef(new WeakMap<Element, { html: string; label: string }>());

  useEffect(() => {
    const active: Locale = pathname.startsWith('/template/') ? 'tr' : locale;
    let disposed = false;
    let dict: Dict = {};
    let observer: MutationObserver | null = null;

    const tr = (s: string): string => {
      if (active === 'tr') return s;
      const trimmed = s.trim();
      if (!trimmed) return s;
      let hit = dict[trimmed];
      if (hit === undefined) {
        // "Etiket: değer" biçimindeki satırlar (paket özellikleri) iki parça olarak çevrilir
        const i = trimmed.indexOf(': ');
        if (i > 0) {
          const l = dict[trimmed.slice(0, i)];
          const r = dict[trimmed.slice(i + 2)];
          if (l !== undefined || r !== undefined) hit = `${l ?? trimmed.slice(0, i)}: ${r ?? trimmed.slice(i + 2)}`;
        }
      }
      const base = hit !== undefined ? s.replace(trimmed, hit) : s;
      return convertPrices(base, active);
    };

    const doText = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest('[data-i18n-split],[data-no-i18n]')) return;
      const known = textOut.current.get(node);
      if (known === undefined || node.data !== known) textOrig.current.set(node, node.data);
      const orig = textOrig.current.get(node) ?? node.data;
      const out = tr(orig);
      if (node.data !== out) node.data = out;
      textOut.current.set(node, out);
    };

    const doAttrs = (el: Element) => {
      if (el.closest('[data-no-i18n]')) return;
      let m = attrState.current.get(el);
      for (const a of ATTRS) {
        const cur = el.getAttribute(a);
        if (cur === null) continue;
        const st = m?.get(a);
        const orig = st && st.out === cur ? st.orig : cur;
        const out = tr(orig);
        if (cur !== out) el.setAttribute(a, out);
        if (!m) attrState.current.set(el, (m = new Map()));
        m.set(a, { orig, out });
      }
    };

    const doSplit = (el: Element) => {
      const st = splitState.current.get(el);
      if (active === 'tr') {
        if (st && el.hasAttribute('data-i18n-split')) {
          el.innerHTML = st.html;
          el.setAttribute('aria-label', st.label);
          el.removeAttribute('data-i18n-split');
        }
        return;
      }
      const label = st?.label ?? el.getAttribute('aria-label') ?? '';
      const out = dict[label.trim()];
      if (!out) return;
      if (!st) splitState.current.set(el, { html: el.innerHTML, label });
      if (!el.hasAttribute('data-i18n-split')) {
        el.innerHTML = esc(out);
        el.setAttribute('aria-label', out);
        el.setAttribute('data-i18n-split', '');
      }
    };

    const walk = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) return doText(root as Text);
      if (root.nodeType !== Node.ELEMENT_NODE) return;
      const el = root as Element;
      if (SKIP_TAGS.has(el.tagName)) return;
      el.querySelectorAll('[data-split]').forEach(doSplit);
      if (el.matches('[data-split]')) doSplit(el);
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = tw.nextNode())) doText(n as Text);
      doAttrs(el);
      el.querySelectorAll('[placeholder],[aria-label],[title]').forEach(doAttrs);
    };

    const start = async () => {
      if (active !== 'tr') {
        const d = await loadDict();
        if (disposed) return;
        dict = active === 'en' ? d.en : d.de;
      }
      document.documentElement.lang = active;
      walk(document.body);
      let scheduled = false;
      const pending = new Set<Node>();
      const flush = () => {
        scheduled = false;
        pending.forEach((n) => n.isConnected && walk(n));
        pending.clear();
      };
      observer = new MutationObserver((records) => {
        for (const r of records) {
          if (r.type === 'characterData') {
            const t = r.target as Text;
            if (textOut.current.get(t) === t.data) continue;
            pending.add(t);
          } else if (r.type === 'attributes') {
            pending.add(r.target);
          } else {
            r.addedNodes.forEach((n) => pending.add(n));
          }
        }
        if (pending.size && !scheduled) {
          scheduled = true;
          requestAnimationFrame(flush);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });
    };

    void start();
    return () => {
      disposed = true;
      observer?.disconnect();
    };
  }, [locale, pathname]);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>('tr');
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(v)) setLocaleState(v);
    } catch {
      /* depolama kapalıysa Türkçe kalır */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* yok say */
    }
  }, []);

  useTranslateDom(locale, pathname);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, pickerOpen, openPicker: () => setPickerOpen(true), closePicker: () => setPickerOpen(false) }),
    [locale, setLocale, pickerOpen],
  );
  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}
