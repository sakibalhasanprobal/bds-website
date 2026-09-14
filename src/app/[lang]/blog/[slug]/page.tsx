import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Photo from '@/components/Photo';
import { Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { getAllPosts, getPost } from '@/lib/blog';
import { docMeta, urlFor } from '@/lib/seo';
import { site } from '@/content/site';

export function generateStaticParams() {
  const posts = getAllPosts();
  return LANGS.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(decodeURIComponent(slug));
  if (!post) return {};
  return docMeta(lang, `/blog/${post.slug}`, post.title, post.excerpt, { openGraph: { type: 'article' } as Metadata['openGraph'] });
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const post = getPost(decodeURIComponent(slug));
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: lang === 'bn' ? 'bn-BD' : 'en',
    mainEntityOfPage: urlFor(lang as 'bn' | 'en', `/blog/${post.slug}`),
    image: [`${site.domain}/brand/og.png`],
    author: { '@type': 'Organization', name: site.nameEn, url: site.domain },
    publisher: { '@type': 'Organization', name: site.nameEn, url: site.domain, logo: { '@type': 'ImageObject', url: `${site.domain}/brand/mark.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="band band-chamber border-b border-[var(--border)] py-12 sm:py-16">
        <div className="section-shell">
          <Link href={`/${lang}/blog`} className="focus-ring mb-6 inline-flex items-center gap-2 text-[0.84rem] font-bold text-[var(--primary)]">
            <ArrowLeft className="size-4" aria-hidden /> {d.blog.title}
          </Link>
          <div className="max-w-3xl animate-fade-up">
            <p className="text-[0.8rem] font-bold text-[var(--muted-foreground)]">{post.date}</p>
            <h1 className="mt-2 text-[clamp(1.8rem,3.6vw,2.9rem)] leading-tight">{post.title}</h1>
            <div className="hairline mt-5 max-w-md" />
          </div>
        </div>
      </section>

      <Section band="notes">
        <article className="bench-panel mx-auto max-w-3xl p-6 sm:p-10">
          {post.cover && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[var(--radius)]">
              <Photo src={post.cover} alt="" label={post.title} showPath={false} className="h-full w-full object-cover" />
            </div>
          )}
          <div
            className="blog-body"
            /* বিশ্বস্ত উৎস: শুধু অ্যাডমিন প্যানেল থেকে লেখা markdown */
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </Section>
    </>
  );
}
