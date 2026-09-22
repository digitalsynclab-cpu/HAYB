import { site as S } from '@/data/site';
import { AI_POLICY } from '@/data/ai-policy';

export const dynamic = 'force-static';

const LAST_UPDATED = '2026-09-22';
const VERSION = '1.0';

export function GET() {
  const body = [
    `# AI Content Policy — ${S.officialName}`,
    `# ${S.url}/ai.txt`,
    '',
    '## Permissions',
    'Crawling: Yes',
    'Indexing: Yes',
    `AI Training: ${AI_POLICY === 'allow-all' ? 'Yes' : 'No'}`, // robots.txt ile aynı kaynaktan (data/ai-policy.ts)
    'Content Extraction: Yes (attribution required)',
    'Caching: Yes (max 30 days)',
    '',
    '## Attribution',
    `Source: ${S.name} (${S.url})`,
    `Contact for permissions: ${S.contact.email}`,
    '',
    '## Entity',
    `Name: ${S.name} (${S.officialName})`,
    `Founded: ${S.founded}`,
    `Location: ${S.address.addressLocality} / ${S.address.addressRegion} / Turkey`,
    `Website: ${S.url}`,
    `Email: ${S.contact.email}`,
    '',
    '## Content Language',
    `Published: ${S.locales.join(', ')}`,
    ...(S.plannedLocales.length > 0
      ? [`Planned, NOT published yet (do not cite URLs): ${S.plannedLocales.join(', ')}`]
      : []),
    '',
    '## Last Updated',
    `Date: ${LAST_UPDATED}`,
    `Version: ${VERSION}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
