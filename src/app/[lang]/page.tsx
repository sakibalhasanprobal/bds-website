import Link from 'next/link';
import {
  Gavel, GraduationCap, Trophy, Landmark, Send, ArrowRight, MapPin,
  Users, School, Scale, Quote, CheckCircle2,
} from 'lucide-react';
import Hero from '@/components/Hero';
import Photo from '@/components/Photo';
import { Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang, impactStats, activities, formats, purpose, site, vision } from '@/content/site';
import { getDict } from '@/content/dict';
import { practiceDebates } from '@/content/practiceDebates';
import { campusStops } from '@/content/campus';
import { featuredEvents } from '@/content/events';
import { personGroups } from '@/content/people';
import { partners as partnerList } from '@/content/timeline';
import { num, pad2 } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const actIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  gavel: Gavel, 'graduation-cap': GraduationCap, trophy: Trophy, landmark: Landmark, send: Send,
};
const statIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  gavel: Gavel, school: School, users: Users, 'map-pin': MapPin, scale: Scale,
};

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const latest = practiceDebates.filter((p) => !p.missing).slice(-3).reverse();
  const campusHighlights = campusStops.filter((c) => c.highlight && c.attendance).slice(0, 3);
  const execGroups = personGroups.filter((g) => ['advisors', 'mentors', 'executive', 'student-advisors'].includes(g.slug));

  return (
    <>
      <Hero lang={lang} />

      {/* ── ২. আসল সংখ্যা ── */}
      <Section band="house">
        <div className="bench-panel p-5 sm:p-7">
          <SectionHead eyebrow={d.home.statsSub} title={d.home.statsTitle} center />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {impactStats.map((s, i) => {
              const Icon = statIcons[s.icon] ?? Gavel;
              return (
                <div key={s.icon} className="reveal paper-card interactive-card p-5" style={{ ['--reveal-delay' as string]: `${i * 0.06}s` }}>
                  <Icon className="size-5 text-[var(--accent)]" aria-hidden />
                  <p className="mt-3 font-en-display text-[2.1rem] leading-none text-[var(--primary)]">{bn ? s.value : s.valueEn}</p>
                  <p className="mt-2 text-[0.86rem] font-semibold leading-snug">{bn ? s.bn : s.en}</p>
                  <p className="mt-1.5 text-[0.7rem] leading-snug text-[var(--muted-foreground)]">{bn ? s.note : s.noteEn}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── ৩. আমরা যা করি ── */}
      <Section band="notes">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <div className="bench-panel flex flex-col p-6 sm:p-8">
            <p className="eyebrow mb-2">{d.about.purposeTitle}</p>
            <h2 className="text-[clamp(1.4rem,2.3vw,2rem)]">{bn ? 'যুক্তি, গবেষণা ও সংলাপ' : 'Reason, research and dialogue'}</h2>
            <div className="hairline mt-4 max-w-xs" />
            <p className="mt-5 text-[0.96rem] leading-8 text-[var(--text-secondary)]">{bn ? purpose.bn : purpose.en}</p>
            <p className="mt-4 text-[0.75rem] text-[var(--muted-foreground)]">— {d.about.purposeNote}</p>
            <Link href={`/${lang}/about`} className="btn btn-ghost focus-ring mt-6 self-start sm:mt-auto sm:pt-6">
              {d.common.readMore} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="bench-panel p-6 sm:p-8">
            <SectionHead eyebrow={d.home.activitiesSub} title={d.home.activitiesTitle} />
            <ul className="grid gap-3">
              {activities.map((a, i) => {
                const Icon = actIcons[a.icon] ?? Gavel;
                return (
                  <li
                    key={a.icon}
                    className="reveal paper-card interactive-card flex items-start gap-3 p-4"
                    style={{ ['--reveal-delay' as string]: `${i * 0.05}s` }}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[rgba(30,58,138,0.1)]">
                      <Icon className="size-4.5 text-[var(--primary)]" aria-hidden />
                    </span>
                    <span className="text-[0.92rem] font-semibold leading-7">{bn ? a.bn : a.en}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── ৪. বিতর্কের ধরন ── */}
      <Section band="oppo">
        <SectionHead eyebrow={d.home.formatsSub} title={d.home.formatsTitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formats.map((f, i) => (
            <article
              key={f.key}
              className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card bar-card p-5 pb-9`}
              style={{ ['--reveal-delay' as string]: `${i * 0.05}s` }}
            >
              <h3 className="flex items-center gap-2.5 text-[1.15rem]">
                <span className={`fmt-dot fmt-${f.key}`} aria-hidden />
                {bn ? f.bn : f.en}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-7 text-[var(--text-secondary)]">{bn ? f.descBn : f.descEn}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── ৫. সর্বশেষ অনুশীলনী বিতর্ক ── */}
      <Section band="house">
        <div className="bench-panel p-5 sm:p-7">
          <SectionHead
            eyebrow={d.home.practiceSub}
            title={d.home.practiceTitle}
            action={
              <Link href={`/${lang}/practice-debates`} className="btn btn-ghost focus-ring shrink-0">
                {d.home.practiceAll} <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((p, i) => (
              <article key={p.no} className="reveal paper-card interactive-card p-5" style={{ ['--reveal-delay' as string]: `${i * 0.07}s` }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-en-display text-[1.6rem] leading-none text-[var(--accent)]">{pad2(p.no, lang)}</span>
                  <span className={`tag ${p.format === 'সংসদীয়' ? 'tag-shongshodio' : 'tag-shonatoni'}`}>{p.format}</span>
                </div>
                <h3 className="mt-3 text-[1.02rem] leading-7">{p.motion}</h3>
                <dl className="mt-4 space-y-1.5 text-[0.8rem]">
                  <div className="flex gap-2">
                    <dt className="shrink-0 text-[var(--muted-foreground)]">{d.practice.colWinner}:</dt>
                    <dd className="font-bold text-[var(--primary)]">{p.winner}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 text-[var(--muted-foreground)]">{d.practice.colBest}:</dt>
                    <dd className="font-semibold">{p.bestSpeaker}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ── ৬. Campus Connect ── */}
      <Section band="gallery">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="bench-panel p-6 sm:p-8">
            <SectionHead eyebrow={d.home.campusSub} title={d.home.campusTitle} />
            <div className="grid gap-3">
              {campusHighlights.map((c, i) => (
                <Link
                  key={c.institution}
                  href={`/${lang}/campus-connect`}
                  className="reveal paper-card interactive-card focus-ring flex items-start gap-4 p-4"
                  style={{ ['--reveal-delay' as string]: `${i * 0.06}s` }}
                >
                  <span className="font-en-display text-[1.5rem] leading-none text-[var(--accent)]">{c.attendance}</span>
                  <div>
                    <p className="text-[0.92rem] font-bold leading-6">{c.institution}</p>
                    <p className="mt-0.5 text-[0.76rem] text-[var(--muted-foreground)]">{c.date} · {c.area}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href={`/${lang}/campus-connect`} className="btn btn-primary focus-ring mt-6">
              {d.home.campusAll} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="bench-panel flex flex-col justify-center p-6 sm:p-8">
            <p className="eyebrow mb-2">{bn ? 'যেখানে পৌঁছেছি' : 'Where we have been'}</p>
            <h3 className="text-[1.3rem]">{bn ? 'বগুড়া শহর ছাড়িয়ে তিন উপজেলায়' : 'Beyond the city, into three upazilas'}</h3>
            <ul className="mt-5 grid gap-2.5">
              {['বগুড়া শহর', 'দুপচাঁচিয়া', 'গাবতলী', 'শিবগঞ্জ / মহাস্থান'].map((area) => {
                const n = campusStops.filter((c) => c.area === area).length;
                return (
                  <li key={area} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] px-4 py-2.5">
                    <span className="flex items-center gap-2 text-[0.9rem] font-semibold">
                      <MapPin className="size-4 text-[var(--primary)]" aria-hidden /> {area}
                    </span>
                    <span className="font-en-ui text-[0.8rem] font-bold text-[var(--muted-foreground)]">
                      {num(n, lang)} {bn ? 'টি আয়োজন' : n === 1 ? 'session' : 'sessions'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── ৭. বড় আয়োজন ── */}
      <Section band="chamber">
        <SectionHead
          eyebrow={d.home.eventsSub}
          title={d.home.eventsTitle}
          action={
            <Link href={`/${lang}/events`} className="btn btn-ghost focus-ring shrink-0">
              {d.common.viewAll} <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredEvents.map((e, i) => (
            <article
              key={e.slug}
              className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card group overflow-hidden`}
              style={{ ['--reveal-delay' as string]: `${i * 0.06}s` }}
            >
              <Link href={`/${lang}/events/${e.slug}`} className="focus-ring block">
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`tag ${e.tag}`}>{e.tagLabel}</span>
                    <span className="text-[0.72rem] font-bold text-[var(--muted-foreground)]">{bn ? e.date : e.dateEn}</span>
                  </div>
                  <h3 className="mt-3 text-[1.05rem] leading-7">{bn ? e.title : e.titleEn}</h3>
                  <p className="mt-2 line-clamp-3 text-[0.85rem] leading-6 text-[var(--text-secondary)]">{bn ? e.summary : e.summaryEn}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-[var(--primary)]">
                    {d.common.readMore} <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* ── ৮. সংগঠনের ভাবনা ── */}
      <Section>
        <div className="vision-showcase">
          <div className="vision-panel">
            <div className="vision-portrait">
              <Photo
                src={vision.photo}
                alt={bn ? 'BDS-এর নেতৃত্ব' : 'BDS leadership'}
                label={vision.photoLabel}
                className="h-full min-h-[240px] w-full object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">{d.home.visionEyebrow}</p>
              <p className="font-en-ui text-[0.7rem] font-bold tracking-[0.14em] text-[var(--muted-foreground)]">
                {bn ? 'OUR BELIEF' : 'আমাদের বিশ্বাস'}
              </p>
              <blockquote className="vision-quote mt-4">
                <Quote className="mb-2 inline size-7 text-[var(--accent)]" aria-hidden />
                <p>{bn ? vision.quote : vision.quoteEn}</p>
              </blockquote>
              <div className="vision-mark" aria-hidden />
              <p className="text-[0.95rem] font-bold">{bn ? site.nameBn : site.nameEn}</p>
              <p className="mt-1 text-[0.8rem] text-[var(--muted-foreground)]">
                {bn ? `প্রতিষ্ঠা ${site.founded}` : `Founded ${site.foundedEn}`}
              </p>
                          </div>
          </div>
        </div>
      </Section>

      {/* ── ৯. টিম ── */}
      <Section band="notes">
        <SectionHead
          eyebrow={d.home.teamSub}
          title={d.home.teamTitle}
          action={
            <Link href={`/${lang}/team`} className="btn btn-ghost focus-ring shrink-0">
              {d.common.viewAll} <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {execGroups.map((g, i) => (
            <Link
              key={g.slug}
              href={`/${lang}/team#${g.slug}`}
              className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card bar-card focus-ring block p-5 pb-9`}
              style={{ ['--reveal-delay' as string]: `${i * 0.06}s` }}
            >
              <p className="font-en-display text-[1.6rem] leading-none text-[var(--accent)]">{pad2(g.people.length, lang)}</p>
              <h3 className="mt-3 text-[1.05rem]">{bn ? g.title : g.titleEn}</h3>
              <p className="mt-2 text-[0.85rem] leading-6 text-[var(--text-secondary)]">{bn ? g.blurb : g.blurbEn}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── ১০. অংশীদার ── */}
      <Section band="house">
        <SectionHead
          eyebrow={d.home.partnersSub}
          title={d.home.partnersTitle}
          action={
            <Link href={`/${lang}/partners`} className="btn btn-ghost focus-ring shrink-0">
              {d.common.viewAll} <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="flex flex-wrap gap-2.5">
          {partnerList.map((p) => (
            <span key={p.name} className="paper-card px-4 py-2.5 text-[0.84rem] font-semibold text-[var(--text-secondary)]">
              {p.name}
            </span>
          ))}
        </div>
      </Section>

      {/* ── ১১. যুক্ত হও ── */}
      <Section band="oppo" className="!pb-0">
        <div className="bench-panel !rounded-b-none p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.5rem,3vw,2.4rem)] text-[var(--primary)]">{d.home.joinTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-8 text-[var(--text-secondary)]">{d.home.joinBody}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={`/${lang}/join`} className="btn btn-primary focus-ring">
              <Users className="size-5" aria-hidden /> {d.nav.join} <ArrowRight className="size-5" aria-hidden />
            </Link>
            <Link href={`/${lang}/motions`} className="btn btn-ghost focus-ring">
              <CheckCircle2 className="size-5 text-[var(--primary)]" aria-hidden /> {d.nav.motions}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
