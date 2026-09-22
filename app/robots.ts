import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';
import { AI_POLICY, AI_SEARCH_AGENTS, AI_TRAINING_AGENTS, DISALLOWED_PATHS } from '@/data/ai-policy';

type Rule = Extract<MetadataRoute.Robots['rules'], unknown[]>[number];

export default function robots(): MetadataRoute.Robots {
  const rules: Rule[] = [
    { userAgent: '*', allow: '/', disallow: DISALLOWED_PATHS },
    {
      // Bir bot yalnızca kendine en özgü grubu uygular, "*" grubunu miras almaz:
      // bu yüzden disallow listesi burada da tekrar edilir.
      userAgent: AI_POLICY === 'allow-all' ? [...AI_SEARCH_AGENTS, ...AI_TRAINING_AGENTS] : AI_SEARCH_AGENTS,
      allow: '/',
      disallow: DISALLOWED_PATHS,
    },
  ];
  if (AI_POLICY === 'search-only') {
    rules.push({ userAgent: AI_TRAINING_AGENTS, disallow: '/' });
  }

  return { rules, sitemap: absoluteUrl('/sitemap.xml') };
}
