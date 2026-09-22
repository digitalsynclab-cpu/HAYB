// robots.txt VE ai.txt bu dosyadan beslenir → iki dosya birbiriyle çelişemez.
// Karar: kullanıcı global görünürlük/GEO istedi → 'allow-all'.
//  'allow-all'   : arama/atıf botları + eğitim botları serbest (GEO-first)
//  'search-only' : yalnızca arama/atıf botları serbest, eğitim botları engelli
export type AiPolicy = 'allow-all' | 'search-only';
export const AI_POLICY: AiPolicy = 'allow-all';

// Arama / atıf / kullanıcı tetikli erişim: her iki politikada da serbest.
export const AI_SEARCH_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'DuckAssistBot',
  'Bingbot',
];

// Eğitim / veri toplama botları. Yeni bot çıkarsa resmi dokümandan doğrulayıp ekleyin.
export const AI_TRAINING_AGENTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
  'Omgilibot',
  'Bytespider',
  'Meta-ExternalAgent',
];

// robots.txt'te tüm gruplarda tekrar edilecek disallow listesi.
export const DISALLOWED_PATHS = ['/api/', '/_next/'];
