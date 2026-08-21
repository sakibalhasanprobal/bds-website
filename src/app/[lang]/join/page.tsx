import { CheckCircle2, Sparkles, UsersRound, ShieldCheck } from 'lucide-react';
import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang, memberBenefits, formats } from '@/content/site';
import { getDict } from '@/content/dict';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'সদস্য হও · Join BDS' };

const upazilas = [
  'বগুড়া সদর', 'শাজাহানপুর', 'শিবগঞ্জ', 'গাবতলী', 'দুপচাঁচিয়া', 'কাহালু',
  'নন্দীগ্রাম', 'শেরপুর', 'ধুনট', 'সারিয়াকান্দি', 'সোনাতলা', 'আদমদীঘি', 'অন্যান্য',
];

const field =
  'focus-ring w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.92rem]';
const labelCls = 'block text-[0.8rem] font-bold text-[var(--text-secondary)]';

export default async function JoinPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const kinds = [
    { icon: UsersRound, title: bn ? 'সাধারণ সদস্য' : 'General Member',
      body: bn ? 'যে কেউ আবেদন করতে পারে। অনুশীলনী বিতর্ক, কর্মশালা ও Intra Championship-এ অংশগ্রহণ।' : 'Open to anyone. Access to practice debates, workshops and the Intra Championship.' },
    { icon: Sparkles, title: bn ? 'Fresher’s — "Join The Legacy"' : 'Fresher’s — “Join The Legacy”',
      body: bn ? 'নতুন শিক্ষাবর্ষে যারা প্রথমবার বিতর্কে আসছে, তাদের জন্য বিশেষ ব্যাচ।' : 'A dedicated intake for students coming to debate for the first time.' },
    { icon: ShieldCheck, title: bn ? 'Sub Executive — "Join The Team"' : 'Sub Executive — “Join The Team”',
      body: bn ? 'সংগঠন পরিচালনায় যুক্ত হতে চাইলে — ইভেন্ট, কনটেন্ট, লজিস্টিকস ও প্রশিক্ষণ টিমে।' : 'For those who want to help run BDS — events, content, logistics and training.' },
  ];

  return (
    <>
      <PageHero eyebrow={bn ? 'অভিজ্ঞতা লাগবে না' : 'No experience required'} title={d.join.title} sub={d.join.sub} />

      {/* সুবিধা */}
      <Section band="gallery">
        <SectionHead eyebrow={bn ? 'অফিসিয়াল প্রতিশ্রুতি' : 'What we promise'} title={d.join.benefits} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {memberBenefits.map((b, i) => (
            <div key={b.en} className="reveal paper-card interactive-card p-5" style={{ ['--reveal-delay' as string]: `${i * 0.05}s` }}>
              <CheckCircle2 className="size-5 text-[var(--accent)]" aria-hidden />
              <p className="mt-3 text-[0.92rem] font-bold leading-7">{bn ? b.bn : b.en}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* তিন ধরনের রিক্রুটমেন্ট */}
      <Section band="house">
        <SectionHead eyebrow={bn ? 'বছরে কয়েকবার খোলে' : 'Opens a few times a year'} title={d.join.typesTitle} />
        <div className="grid gap-5 lg:grid-cols-3">
          {kinds.map((k, i) => (
            <article key={k.title} className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card bar-card p-6 pb-10`} style={{ ['--reveal-delay' as string]: `${i * 0.06}s` }}>
              <k.icon className="size-6 text-[var(--primary)]" aria-hidden />
              <h3 className="mt-3.5 text-[1.1rem] leading-7">{k.title}</h3>
              <p className="mt-2.5 text-[0.88rem] leading-7 text-[var(--text-secondary)]">{k.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ফর্ম */}
      <Section band="notes">
        <div className="bench-panel mx-auto max-w-3xl p-6 sm:p-9">
          <SectionHead eyebrow={bn ? 'পূরণ করতে ২ মিনিট' : 'Two minutes to fill'} title={d.join.formTitle} />

          <form
            name="bds-join"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action={`/${lang}/thanks/`}
            className="grid gap-5"
          >
            <input type="hidden" name="form-name" value="bds-join" />
            <p className="hidden">
              <label>{bn ? 'এটি খালি রাখো' : 'Leave this empty'}<input name="bot-field" /></label>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="j-name">{d.join.name} *</label>
                <input id="j-name" name="name" required className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className={labelCls} htmlFor="j-phone">{d.join.phone} *</label>
                <input id="j-phone" name="phone" type="tel" required className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className={labelCls} htmlFor="j-email">{d.join.email}</label>
                <input id="j-email" name="email" type="email" className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className={labelCls} htmlFor="j-inst">{d.join.institution} *</label>
                <input id="j-inst" name="institution" required className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className={labelCls} htmlFor="j-class">{d.join.classYear}</label>
                <input id="j-class" name="class" className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className={labelCls} htmlFor="j-area">{d.join.area}</label>
                <select id="j-area" name="area" className={`${field} mt-1.5`} defaultValue="">
                  <option value="" disabled>{bn ? 'বেছে নাও' : 'Select'}</option>
                  {upazilas.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="j-fb">{d.join.fb}</label>
              <input id="j-fb" name="facebook" type="url" placeholder="https://facebook.com/…" className={`${field} mt-1.5`} />
            </div>

            <fieldset>
              <legend className={labelCls}>{d.join.experience}</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {[d.join.expNew, d.join.expSchool, d.join.expRegular].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-[0.88rem]">
                    <input type="radio" name="experience" value={opt} className="size-4 accent-[var(--primary)]" />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelCls}>{d.join.interests}</legend>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2.5">
                {formats.map((f) => (
                  <label key={f.key} className="flex items-center gap-2 text-[0.88rem]">
                    <input type="checkbox" name="interests" value={f.bn} className="size-4 accent-[var(--primary)]" />
                    {bn ? f.bn : f.en}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label className={labelCls} htmlFor="j-why">{d.join.why}</label>
              <textarea id="j-why" name="why" rows={4} className={`${field} mt-1.5 resize-y`} />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn btn-primary focus-ring">{d.join.submit}</button>
              <p className="text-[0.75rem] leading-6 text-[var(--muted-foreground)]">
                {bn ? 'তোমার তথ্য শুধু BDS-এর সদস্য ব্যবস্থাপনায় ব্যবহৃত হবে।' : 'Your details are used only for BDS membership administration.'}
              </p>
            </div>
          </form>

          <p className="mt-6 rounded-lg border border-dashed border-[var(--border-strong)] p-4 text-[0.78rem] leading-7 text-[var(--muted-foreground)]">
            {d.join.formNote}
          </p>
        </div>
      </Section>
    </>
  );
}
