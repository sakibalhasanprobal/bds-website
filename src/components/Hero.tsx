import Link from 'next/link';
import { Users, Gavel, GraduationCap, School, Mic, CalendarDays, Quote } from 'lucide-react';
import type { Lang } from '@/content/site';
import { heroStats, heroImages } from '@/content/site';
import { getDict } from '@/content/dict';
import { tickerMotions } from '@/content/motions';
import Photo from './Photo';

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  gavel: Gavel, school: School, mic: Mic, 'calendar-days': CalendarDays, users: Users,
};

const chipPos = ['stat-tl', 'stat-tr', 'stat-bl', 'stat-br'];

/** ছবিগুলো অ্যাডমিন প্যানেল (সাইট তথ্য → হিরো ছবি) থেকে বদলানো যায় */
const thumbs = heroImages.thumbs;

export default function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const bn = lang === 'bn';

  return (
    <>
      <section className="hero-stage band band-chamber overflow-hidden border-b border-[var(--border)]">
        <div className="section-shell grid min-h-[calc(100vh-150px)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr]">
          {/* ── বাম কলাম ── */}
          <div className="max-w-2xl animate-fade-up">
            <p className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[rgba(255,255,255,0.6)] px-3.5 py-1.5 text-[0.72rem] font-bold text-[var(--primary)] dark:bg-[rgba(15,22,38,0.6)]">
              {d.home.heroEyebrow}
            </p>

            <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.12]">
              <span className="block">{d.home.heroLine1}</span>
              <span className="mt-1 block text-[var(--primary)]">{d.home.heroLine2}</span>
            </h1>

            <div className="hairline mt-6 max-w-lg" />

            <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-[var(--text-secondary)]">{d.home.heroBody}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/join`} className="btn btn-primary focus-ring">
                <Users className="size-5" aria-hidden /> {d.home.ctaJoin}
              </Link>
              <Link href={`/${lang}/practice-debates`} className="btn btn-ghost focus-ring">
                <Gavel className="size-5 text-[var(--primary)]" aria-hidden /> {d.home.ctaPractice}
              </Link>
              <Link href={`/${lang}/campus-connect`} className="btn btn-ghost focus-ring">
                <GraduationCap className="size-5 text-[var(--primary)]" aria-hidden /> {d.home.ctaWorkshop}
              </Link>
            </div>
          </div>

          {/* ── ডান কলাম: মঞ্চ ── */}
          <div className="stage-shell group relative mx-auto w-full max-w-[600px] animate-fade-up-delay">
            <div className="orbit hidden sm:block" aria-hidden />

            {thumbs.map((t, i) => (
              <div key={t.src} className={`thumb thumb-${i + 1}`} aria-hidden>
                <Photo src={t.src} alt="" label={t.label} showPath={false} className="h-full w-full object-cover" />
              </div>
            ))}

            <div className="stage-frame lens">
              <Photo
                src={heroImages.main.src}
                alt={bn ? 'বগুড়া ডিবেটিং সোসাইটির একটি আয়োজনের মুহূর্ত' : 'A moment from a Bogura Debating Society event'}
                label={bn ? 'মূল ছবি এখানে বসবে' : 'Main photo goes here'}
                className="h-full w-full object-cover"
                imgClassName="transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.16),transparent_32%),linear-gradient(180deg,transparent,rgba(11,18,32,0.16))]" />
            </div>

            {heroStats.map((s, i) => {
              const Icon = icons[s.icon] ?? Gavel;
              return (
                <div key={s.icon} className={`stat-chip ${chipPos[i]}`}>
                  <div>
                    <p className="font-en-display text-[1.7rem] leading-none text-[var(--foreground)]">{bn ? s.value : s.valueEn}</p>
                    <p className="mt-1 max-w-[110px] text-[0.68rem] font-bold leading-4 text-[var(--text-secondary)]">{bn ? s.bn : s.en}</p>
                  </div>
                  <Icon className="size-5 shrink-0 text-[var(--primary)]" aria-hidden />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MOTION TICKER ── */}
      <div className="ticker" aria-label={bn ? 'BDS-এর আয়োজনে ব্যবহৃত motion' : 'Motions used at BDS events'}>
        <div className="ticker-track py-2.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {tickerMotions.map((m) => (
                <span key={`${dup}-${m.id}`} className="flex shrink-0 items-center gap-2.5 px-6 text-[0.85rem] font-semibold">
                  <Quote className="size-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
                  {m.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
