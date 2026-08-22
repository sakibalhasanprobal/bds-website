import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { events } from '@/content/events';
import { num } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'আয়োজন · Events' };

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const sorted = [...events].sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));

  return (
    <>
      <PageHero eyebrow={bn ? `${num(events.length, lang)}টি আয়োজন` : `${events.length} events`} title={d.events.title} sub={d.events.sub} />

      <Section band="chamber">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((e, i) => (
            <article
              key={e.slug}
              className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card group overflow-hidden`}
              style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.05}s` }}
            >
              <Link href={`/${lang}/events/${e.slug}`} className="focus-ring block">
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`tag ${e.tag}`}>{e.tagLabel}</span>
                    <span className="text-[0.72rem] font-bold text-[var(--muted-foreground)]">{bn ? e.date : e.dateEn}</span>
                  </div>
                  <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-wider text-[var(--accent)]">{bn ? e.kicker : e.kickerEn}</p>
                  <h2 className="mt-1.5 text-[1.15rem] leading-7">{bn ? e.title : e.titleEn}</h2>
                  <p className="mt-2 text-[0.86rem] leading-7 text-[var(--text-secondary)]">{bn ? e.summary : e.summaryEn}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-[var(--primary)]">
                    {d.events.details} <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
