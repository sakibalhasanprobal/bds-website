import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Photo from '@/components/Photo';
import { Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { getAllPosts, getPost } from '@/lib/blog';

export function generateStaticParams() {
  const posts = getAllPosts();
  return LANGS.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const post = getPost(decodeURIComponent(slug));
  if (!post) notFound();

  return (
    <>
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
