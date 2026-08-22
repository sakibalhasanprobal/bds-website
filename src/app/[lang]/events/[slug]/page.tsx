import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Quote, Trophy, Users, Scale } from 'lucide-react';
import { Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { events } from '@/content/events';

export function generateStaticParams() {
  return LANGS.flatMap((lang) => events.map((e) => ({ lang, slug: e.slug })));
}

export default async function EventDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();

  return (
    <>
      <section className="band band-chamber border-b border-[var(--border)] py-12 sm:py-16">
        <div className="section-shell">
          <Link href={`/${lang}/events`} className="focus-ring mb-6 inline-flex items-center gap-2 text-[0.84rem] font-bold text-[var(--primary)]">
            <ArrowLeft className="size-4" aria-hidden /> {d.events.title}
          </Link>
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`tag ${e.tag}`}>{e.tagLabel}</span>
                <span className="text-[0.76rem] font-bold text-[var(--muted-foreground)]">{bn ? e.date : e.dateEn}</span>
              </div>
              <p className="eyebrow mt-4">{bn ? e.kicker : e.kickerEn}</p>
              <h1 className="mt-2 text-[clamp(1.8rem,3.6vw,2.9rem)]">{bn ? e.title : e.titleEn}</h1>
              <div className="hairline mt-5 max-w-md" />
              <p className="mt-5 text-[1rem] leading-8 text-[var(--text-secondary)]">{bn ? e.summary : e.summaryEn}</p>
            </div>
          </div>
        </div>
      </section>

      <Section band="notes">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="bench-panel p-6 sm:p-8">
            <h2 className="text-[1.25rem]">{d.events.details}</h2>
            <div className="hairline mt-4 max-w-[10rem]" />
            <dl className="mt-5 grid gap-3">
              {e.details.map((r) => (
                <div key={r.label} className="grid gap-1 border-b border-[var(--border)] pb-3 last:border-0 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.78rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{r.label}</dt>
                  <dd className="text-[0.92rem] font-semibold leading-7">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid content-start gap-6">
            {e.motions && (
              <div className="bench-panel p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-[1.25rem]"><Quote className="size-5 text-[var(--accent)]" aria-hidden /> {d.events.motionsLabel}</h2>
                <ul className="mt-5 grid gap-3">
                  {e.motions.map((m) => (
                    <li key={m.label} className="paper-card p-4">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{m.label}</p>
                      <p className="mt-2 text-[0.98rem] font-semibold leading-8">{m.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {e.results && (
              <div className="bench-panel p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-[1.25rem]"><Trophy className="size-5 text-[var(--accent)]" aria-hidden /> {d.events.resultsLabel}</h2>
                <dl className="mt-5 grid gap-3">
                  {e.results.map((r) => (
                    <div key={r.label} className="rounded-lg bg-[rgba(201,162,39,0.1)] p-3.5">
                      <dt className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{r.label}</dt>
                      <dd className="mt-1 text-[0.95rem] font-bold text-[var(--primary)]">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {(e.teams || e.adjudicators) && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {e.teams && (
              <div className="bench-panel p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-[1.25rem]"><Users className="size-5 text-[var(--accent)]" aria-hidden /> {d.events.teamsLabel}</h2>
                <ul className="mt-5 grid gap-3">
                  {e.teams.map((t, i) => (
                    <li key={t.institution} className={`paper-card p-4 ${i % 2 ? 'bench-opp' : 'bench-gov'}`}>
                      <p className="text-[0.94rem] font-bold">{t.institution}</p>
                      <p className="mt-1.5 text-[0.85rem] leading-7 text-[var(--text-secondary)]">{t.speakers.join(' · ')}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {e.adjudicators && (
              <div className="bench-panel p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-[1.25rem]"><Scale className="size-5 text-[var(--accent)]" aria-hidden /> {d.events.adjLabel}</h2>
                <ul className="mt-5 grid gap-2.5">
                  {e.adjudicators.map((a) => (
                    <li key={a} className="rounded-lg border border-[var(--border)] p-3.5 text-[0.88rem] leading-7">{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
