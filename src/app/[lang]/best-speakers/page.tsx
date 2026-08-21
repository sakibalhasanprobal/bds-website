import { Award } from 'lucide-react';
import { PageHero, Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { bestSpeakers } from '@/content/practiceDebates';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'শ্রেষ্ঠ বক্তারা · Best Speakers' };

export default async function BestSpeakersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  return (
    <>
      <PageHero
        eyebrow={bn ? 'Unveiling The Best Speakers ২০২৫–২৬' : 'Unveiling The Best Speakers 2025–26'}
        title={d.bestSpeakers.title}
        sub={d.bestSpeakers.sub}
      />

      <Section band="gallery">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bestSpeakers.map((s, i) => (
            <li
              key={`${s.session}-${s.name}`}
              className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card relative overflow-hidden p-5`}
              style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.05}s` }}
            >
              <span className="absolute right-4 top-4 text-[0.7rem] font-bold text-[var(--muted-foreground)]">{s.session}</span>
              <span className="grid size-11 place-items-center rounded-xl bg-[rgba(201,162,39,0.16)]">
                <Award className="size-5 text-[var(--accent)]" aria-hidden />
              </span>
              <h2 className="mt-3.5 text-[1.1rem] leading-7">{s.name}</h2>
              <span className={`tag mt-2 ${s.format === 'সংসদীয়' ? 'tag-shongshodio' : 'tag-shonatoni'}`}>{s.format}</span>
              <p className="mt-3 border-t border-[var(--border)] pt-3 text-[0.82rem] leading-7 text-[var(--text-secondary)]">{s.motion}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
