/**
 * Destek talebi kategorisi — support_tickets tablosunda ayrı bir kolon yok (şema
 * değişikliği bu fazda yapılmıyor), bu yüzden kategori "[Kategori] Konu" biçiminde
 * subject alanının başına gömülüp parse edilerek gösteriliyor.
 */
export const SUPPORT_CATEGORIES = ['Satış', 'Ödeme', 'Teknik', 'Partner Hesabı', 'Diğer'] as const;
export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number];

export function formatTicketSubject(category: string, title: string): string {
  return `[${category}] ${title}`;
}

export function parseTicketSubject(subject: string): { category: string | null; title: string } {
  const match = subject.match(/^\[([^\]]+)\]\s*(.*)$/);
  if (match && (SUPPORT_CATEGORIES as readonly string[]).includes(match[1])) {
    return { category: match[1], title: match[2] };
  }
  return { category: null, title: subject };
}
