import { site as S, absoluteUrl } from '@/data/site';
import { getAllRoutes, type RouteEntry } from '@/data/routes';

export const dynamic = 'force-static';

// Sahibiyle doğrulanmış, somut, süperlatifsiz tek cümlelik atıf metinleri.
const CITATION_TR =
  'HAYB, Bursa merkezli, 2025 yılında kurulmuş bir dijital ürün stüdyosudur; web sitesi, mobil uygulama, yönetim paneli, yapay zeka çözümleri ve marka tasarımı hizmetleri sunar.';
const CITATION_EN =
  'HAYB is a digital product studio based in Bursa, Turkey, founded in 2025, offering websites, mobile apps, admin dashboards, AI solutions and brand design.';
const LAST_UPDATED = '2026-09-22';
const VERSION = '1.0';

const section = (title: string, lines: string[]): string[] => (lines.length > 0 ? ['', `## ${title}`, ...lines] : []);

const links = (routes: RouteEntry[]): string[] =>
  routes.map((r) => `- [${r.title}](${absoluteUrl(r.path)})${r.description ? `: ${r.description}` : ''}`);

export function GET() {
  const routes = getAllRoutes();
  const byGroup = (g: RouteEntry['group']) => routes.filter((r) => r.group === g);

  const body = [
    `# ${S.officialName}`,
    '',
    `> ${CITATION_EN}`,
    ...section('Entity', [
      `- Name: ${S.name} (${S.officialName})`,
      `- Founded: ${S.founded}`,
      `- Location: ${S.address.addressLocality}, ${S.address.addressRegion}, Turkey`,
      `- Website: ${S.url}`,
    ]),
    ...section('Contact', [`- Email: ${S.contact.email}`, `- WhatsApp: ${S.contact.whatsappUrl}`]),
    ...section('Products & Services', [
      'Website design & development',
      'Custom software',
      'Admin dashboards',
      'Mobile apps & games',
      'AI solutions',
      'Social media design',
      'Brand & logo design',
      'Google & Meta ads management',
      'HAYB Data Service (business data lookup & export)',
    ]),
    ...section('Key Pages', links(byGroup('core'))),
    ...section('Services', links(byGroup('service'))),
    ...section('Projects', links(byGroup('project'))),
    ...section('Legal', links(byGroup('legal'))),
    ...section('Recommended Citation', [`- EN: ${CITATION_EN}`, `- TR: ${CITATION_TR}`]),
    ...section('Content Languages', [
      `- Published: ${S.locales.join(', ')}`,
      ...(S.plannedLocales.length > 0
        ? [`- Planned, NOT published yet (do not cite URLs): ${S.plannedLocales.join(', ')}`]
        : []),
    ]),
    ...section('Last Updated', [`- Date: ${LAST_UPDATED}`, `- Version: ${VERSION}`]),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
