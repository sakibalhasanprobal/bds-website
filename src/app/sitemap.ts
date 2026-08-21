import type { MetadataRoute } from 'next';
import { site, LANGS } from '@/content/site';
import { events } from '@/content/events';

const routes = [
  '', '/about', '/practice-debates', '/motions', '/campus-connect',
  '/events', '/best-speakers', '/team', '/join', '/partners', '/contact',
];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const lang of LANGS) {
    for (const r of routes) {
      entries.push({
        url: `${site.domain}/${lang}${r}/`,
        changeFrequency: r === '' ? 'weekly' : 'monthly',
        priority: r === '' ? 1 : 0.7,
      });
    }
    for (const e of events) {
      entries.push({ url: `${site.domain}/${lang}/events/${e.slug}/`, changeFrequency: 'yearly', priority: 0.6 });
    }
  }
  return entries;
}
