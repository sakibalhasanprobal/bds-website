import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/Photo';
import { PageHero, Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { getAllPosts } from '@/lib/blog';
import { num } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'নোটিশ ও ঘোষণা · Notices' };

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow={bn ? `${num(posts.length, lang)}টি লেখা` : `${posts.length} post${posts.length === 1 ? '' : 's'}`}
        title={d.blog.title}
        sub={d.blog.sub}
      />
      <Section band="notes">
        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[var(--border-strong)] p-10 text-center text-[var(--muted-foreground)]">
            {d.blog.empty}
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((p, i) => (
              <article
                key={p.slug}
                className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card group overflow-hidden`}
                style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.05}s` }}
              >
                <Link href={`/${lang}/blog/${p.slug}`} className="focus-ring block">
                  {p.cover && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Photo src={p.cover} alt="" label={p.title} showPath={false}
                        className="h-full w-full object-cover" imgClassName="transition duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-[0.72rem] font-bold text-[var(--muted-foreground)]">{p.date}</p>
                    <h2 className="mt-2 text-[1.15rem] leading-7">{p.title}</h2>
                    <p className="mt-2 line-clamp-3 text-[0.88rem] leading-7 text-[var(--text-secondary)]">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-[var(--primary)]">
                      {d.common.readMore} <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
