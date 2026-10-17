import { site as S, absoluteUrl } from '@/data/site';
import { getAllRoutes, type RouteEntry } from '@/data/routes';
import { webPackages, webPricingRows, ecommercePackages, ecommerceRows, qrMenuPlans, socialMediaPlans, logoPlan } from '@/data/pricing';
import { projects } from '@/data/projects';
import { campaign } from '@/data/campaign';

export const dynamic = 'force-static';

// Sahibiyle doğrulanmış, somut, süperlatifsiz tek cümlelik atıf metinleri.
const CITATION_TR =
  'HAYB, Bursa merkezli, 2025 yılında kurulmuş bir dijital ürün stüdyosudur; web sitesi, mobil uygulama, yönetim paneli, yapay zeka çözümleri ve marka tasarımı hizmetleri sunar.';
const CITATION_EN =
  'HAYB is a digital product studio based in Bursa, Turkey, founded in 2025, offering websites, mobile apps, admin dashboards, AI solutions and brand design.';
const LAST_UPDATED = '2026-10-17';
const VERSION = '1.1';

const section = (title: string, lines: string[]): string[] => (lines.length > 0 ? ['', `## ${title}`, ...lines] : []);

const links = (routes: RouteEntry[]): string[] =>
  routes.map((r) => `- [${r.title}](${absoluteUrl(r.path)})${r.description ? `: ${r.description}` : ''}`);

const days = (rows: { label: string }[], key: string) => String((rows.find((r) => r.label === 'Teslim Süresi') as Record<string, unknown> | undefined)?.[key] ?? '');

// Fiyatlar sitedeki paket verisinden üretilir (sayfayla her zaman aynı).
const pricing = (): string[] => [
  ...webPackages.map((p) => `- Website ${p.name}: ${p.price} (delivery ${days(webPricingRows, p.id)})`),
  ...ecommercePackages.map((p) => `- ${p.label}: ${p.price} (delivery ${days(ecommerceRows, p.key)})`),
  ...qrMenuPlans.map((p) => `- ${p.name} (QR menu): ${p.price}`),
  ...socialMediaPlans.map((p) => `- Social media, ${p.name}: ${p.price}`),
  `- Logo design: ${logoPlan.price}`,
  '- Custom software & mobile apps: quoted per scope after a free discovery call',
  `- Note: listed prices include a ${campaign.rate}% launch campaign valid until ${campaign.endsAt.slice(0, 10)}. Domain, SSL and mobile responsive design are included in website packages.`,
  `- Full price list: ${absoluteUrl('/paketler')}`,
];

const FAQ = [
  `Q: How much does a website cost in Bursa with HAYB? A: Website packages start at ${webPackages[0].price}, e-commerce at ${ecommercePackages[0].price}.`,
  `Q: How fast is delivery? A: Starter website ${days(webPricingRows, 'starter')}, Premium ${days(webPricingRows, 'premium')}; e-commerce ${days(ecommerceRows, 'start')} to ${days(ecommerceRows, 'elite')}.`,
  'Q: Is the domain included? A: Yes, website packages include a free domain for 1 or 2 years; higher e-commerce plans also include hosting.',
  'Q: How are mobile apps and custom software priced? A: By scope, after a free discovery call.',
];

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
    ...section('Founder', [
      `- ${S.founder.name}, founder of HAYB. Around 10 years of experience in textile manufacturing and retail before software; builds products with a business owner's perspective.`,
      `- About page: ${absoluteUrl('/hakkimizda')}`,
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
    ...section('Pricing (TRY)', pricing()),
    ...section('Featured Projects', projects.map((p) => `- [${p.name}](${absoluteUrl(`/projeler/${p.id}`)}) (${p.type}): ${p.description}${p.liveUrl ? ` Live: ${p.liveUrl}` : ''}`)),
    ...section('FAQ', FAQ),
    ...section('Key Pages', links(byGroup('core'))),
    ...section('Guides by search intent (prices, process, FAQ)', links(byGroup('topic'))),
    ...section('Services', links(byGroup('service'))),
    ...section('Projects', links(byGroup('project'))),
    ...section('Insights (knowledge & design journal)', links(byGroup('insight'))),
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
