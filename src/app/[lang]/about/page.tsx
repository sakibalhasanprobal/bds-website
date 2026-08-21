import Link from 'next/link';
import { Star, ArrowRight, Target, Eye, Heart } from 'lucide-react';
import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang, purpose, site, activities } from '@/content/site';
import { getDict } from '@/content/dict';
import { timeline } from '@/content/timeline';
import { pad2 } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'আমাদের সম্পর্কে · About' };

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const pillars = [
    { icon: Target, title: bn ? 'লক্ষ্য' : 'Mission',
      body: bn ? 'তরুণদের মধ্যে যুক্তিবাদী চিন্তা, গবেষণা ও সংলাপের সংস্কৃতি গড়ে তোলা।' : 'To build a culture of reasoned thinking, research and dialogue among young people.' },
    { icon: Eye, title: bn ? 'দৃষ্টিভঙ্গি' : 'Vision',
      body: bn ? 'বগুড়ার প্রতিটি স্কুল ও কলেজে একটি সক্রিয় বিতর্ক চর্চার জায়গা তৈরি করা।' : 'An active space for debate in every school and college of Bogura.' },
    { icon: Heart, title: bn ? 'মূল্যবোধ' : 'Values',
      body: bn ? 'যুক্তি, সহনশীলতা, গবেষণা, অন্তর্ভুক্তি এবং একে অপরের কথা শোনার অভ্যাস।' : 'Reason, tolerance, research, inclusion — and the habit of listening.' },
  ];

  return (
    <>
      <PageHero eyebrow={bn ? `প্রতিষ্ঠা ${site.founded}` : `Founded ${site.foundedEn}`} title={d.about.title} sub={d.about.sub} />

      {/* গল্প */}
      <Section band="notes">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="bench-panel p-6 sm:p-9">
            <p className="eyebrow mb-2">{d.about.purposeTitle}</p>
            <h2 className="text-[clamp(1.4rem,2.4vw,2.1rem)]">
              {bn ? 'বগুড়ার প্রথম পেশাদার বিতর্ক সংগঠন' : 'Bogura’s first professional debating organisation'}
            </h2>
            <div className="hairline mt-4 max-w-sm" />
            <p className="mt-6 text-[1rem] leading-8 text-[var(--text-secondary)]">{bn ? purpose.bn : purpose.en}</p>
            <p className="mt-4 text-[0.78rem] text-[var(--muted-foreground)]">— {d.about.purposeNote}</p>

            <p className="mt-7 text-[0.96rem] leading-8 text-[var(--text-secondary)]">
              {bn
                ? '২০২৫ সালের এপ্রিলে যাত্রা শুরু করে BDS। প্রথম প্রতিযোগিতা ছিল সম্পূর্ণ অনলাইন — ১৩০-এর বেশি শিক্ষার্থী একক বক্তৃতায় অংশ নেয়। এরপর আগস্টে বনানী হাউসে প্রথম অফলাইন আয়োজন, তারপর ধারাবাহিক অনুশীলনী বিতর্ক, স্কুল-কলেজের কর্মশালা এবং জেলার বাইরে উপজেলা পর্যায়ে পৌঁছানো।'
                : 'BDS began in April 2025. Its first competition was entirely online — more than 130 students took part in a solo speech contest. August brought the first offline event at Banani House, and after that a steady rhythm: weekly practice debates, school and college workshops, and a reach that eventually extended past the city into the upazilas.'}
            </p>
            <p className="mt-4 text-[0.96rem] leading-8 text-[var(--text-secondary)]">
              {bn
                ? 'এক বছর চার মাসে ১৯টি আনুষ্ঠানিক অনুশীলনী বিতর্ক, ১৭টিরও বেশি প্রতিষ্ঠানে কর্মশালা এবং সাতটি বড় আয়োজন — প্রতিটির রেকর্ড এই সাইটে রাখা আছে।'
                : 'In sixteen months: nineteen formal practice debates, workshops at more than seventeen institutions and seven major events — every one of them recorded on this site.'}
            </p>
          </div>

          <div className="grid gap-4 content-start">
            {pillars.map((p, i) => (
              <div key={p.title} className="reveal paper-card interactive-card p-5" style={{ ['--reveal-delay' as string]: `${i * 0.07}s` }}>
                <p.icon className="size-5 text-[var(--accent)]" aria-hidden />
                <h3 className="mt-3 text-[1.1rem]">{p.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-7 text-[var(--text-secondary)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* নিয়মিত কার্যক্রম */}
      <Section band="house">
        <SectionHead eyebrow={bn ? 'অফিসিয়াল তালিকা' : 'Official list'} title={bn ? 'নিয়মিত কার্যক্রম' : 'Regular activities'} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {activities.map((a, i) => (
            <div key={a.icon} className="reveal paper-card p-5" style={{ ['--reveal-delay' as string]: `${i * 0.05}s` }}>
              <span className="font-en-display text-[1.5rem] leading-none text-[var(--accent)]">{pad2(i + 1, lang)}</span>
              <p className="mt-3 text-[0.9rem] font-semibold leading-7">{bn ? a.bn : a.en}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* টাইমলাইন */}
      <Section band="chamber">
        <SectionHead eyebrow={d.about.timelineSub} title={d.about.timelineTitle} center />
        <div className="flow mt-10">
          {timeline.map((t, i) => (
            <div key={`${t.date}-${t.title}`} className="flow-item">
              <div className="flow-dot" aria-hidden>
                {t.star ? <Star className="size-4 fill-[var(--accent)] text-[var(--accent)]" /> : pad2(i + 1, lang)}
              </div>
              <article
                className={`flow-card reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card p-5`}
                style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.05}s` }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag tag-shonatoni">{bn ? t.date : t.dateEn}</span>
                  <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{t.kicker}</span>
                </div>
                <h3 className="mt-3 text-[1.1rem] leading-7">{bn ? t.title : t.titleEn}</h3>
                <p className="mt-2 text-[0.88rem] leading-7 text-[var(--text-secondary)]">{bn ? t.body : t.bodyEn}</p>
                {t.href && (
                  <Link href={`/${lang}${t.href}`} className="focus-ring mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-[var(--primary)]">
                    {d.common.readMore} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
              </article>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
