import type { MetadataRoute } from 'next';
import { site, LANGS } from '@/content/site';
import { events } from '@/content/events';
import { getAllPosts } from '@/lib/blog';

const routes = [
  '', '/about', '/practice-debates', '/motions', '/campus-connect',
  '/events', '/best-speakers', '/team', '/blog', '/join', '/partners', '/contact',
];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const posts = getAllPosts();
  const now = new Date();

  for (const lang of LANGS) {
    for (const r of routes) {
      entries.push({
        url: `${site.domain}/${lang}${r}/`,
        lastModified: now,
        changeFrequency: r === '' || r === '/blog' ? 'weekly' : 'monthly',
        priority: r === '' ? 1 : 0.7,
        alternates: {
          languages: {
            bn: `${site.domain}/bn${r}/`,
            en: `${site.domain}/en${r}/`,
          },
        },
      });
    }
    for (const e of events) {
      entries.push({ url: `${site.domain}/${lang}/events/${e.slug}/`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 });
    }
    for (const p of posts) {
      entries.push({ url: `${site.domain}/${lang}/blog/${p.slug}/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    }
  }
  return entries;
}
