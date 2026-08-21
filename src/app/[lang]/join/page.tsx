import { CheckCircle2, Sparkles, UsersRound, ShieldCheck, Info } from 'lucide-react';
import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang, memberBenefits } from '@/content/site';
import { getDict } from '@/content/dict';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'সদস্য হও · Join BDS' };

const field =
  'focus-ring w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.92rem]';
const labelCls = 'block text-[0.8rem] font-bold text-[var(--text-secondary)]';
const hintCls = 'mt-1 text-[0.72rem] leading-5 text-[var(--muted-foreground)]';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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

  // প্রশ্নগুলো BDS-এর অফিসিয়াল সদস্য ফর্ম অনুযায়ী
  const phoneOwnerOpts = bn
    ? ['আমার নিজেরই', 'বাবার', "মা'এর", 'বড় ভাইয়ের', 'বড় বোনের']
    : ['My own', "Father's", "Mother's", "Elder brother's", "Elder sister's"];
  const practiceOpts = bn
    ? ['নতুন শিখতে চাই', 'মাঝে মধ্যে চর্চা করি', 'প্রতিনিয়ত চর্চা করি']
    : ['New — want to learn', 'Practise occasionally', 'Practise regularly'];
  const weeklyOpts = bn
    ? ['৫–৭ ঘণ্টা', '১০–১২ ঘণ্টা', '১৪–১৮ ঘণ্টা', 'আমার অফুরন্ত সময়']
    : ['5–7 hours', '10–12 hours', '14–18 hours', 'I have unlimited time'];

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
          <SectionHead eyebrow={bn ? 'পূরণ করতে ৩ মিনিট' : 'Three minutes to fill'} title={d.join.formTitle} />

          <form
            method="POST"
            action="https://formsubmit.co/boguradebatingsociety@gmail.com"
            className="grid gap-5"
          >
            <input type="hidden" name="_subject" value={bn ? 'BDS ওয়েবসাইট: নতুন সদস্য আবেদন' : 'BDS website: new membership application'} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`https://boguradebatingsociety.pages.dev/${lang}/thanks/`} />
            <p className="hidden">
              <label>{bn ? 'এটি খালি রাখো' : 'Leave this empty'}<input name="_honey" /></label>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="j-name-en">{bn ? 'তোমার নাম (Full Name)' : 'Full name (English)'} *</label>
                <input id="j-name-en" name="name-english" required className={`${field} mt-1.5`} />
                <p className={hintCls}>{bn ? 'পুরো নাম দিও, ইংরেজিতে' : 'Your full name, in English'}</p>
              </div>
              <div>
                <label className={labelCls} htmlFor="j-name-bn">{bn ? 'তোমার নাম (বাংলায়)' : 'Full name (Bangla)'} *</label>
                <input id="j-name-bn" name="name-bangla" required className={`${field} mt-1.5`} />
                <p className={hintCls}>{bn ? 'পুরো নাম দিও, বাংলায়' : 'Your full name, in Bangla'}</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="j-phone">{bn ? 'ফোন নম্বর' : 'Phone number'} *</label>
                <input id="j-phone" name="phone" type="tel" required className={`${field} mt-1.5`} />
                <p className={hintCls}>
                  {bn
                    ? 'নিজের নাম্বার হলে ভালো, বাবা-মায়ের নাম্বারও চলবে। WhatsApp আছে এমন নাম্বার হলে আরও ভালো।'
                    : 'Preferably your own; a parent’s number also works. A number with WhatsApp is even better.'}
                </p>
              </div>
              <div>
                <label className={labelCls} htmlFor="j-email">{bn ? 'ই-মেইল' : 'Email address'} *</label>
                <input id="j-email" name="email" type="email" required className={`${field} mt-1.5`} />
                <p className={hintCls}>
                  {bn ? 'ই-মেইলটা ঠিকভাবে দিও, আর ইনবক্সটা মাঝে মাঝে চেক কোরো।' : 'Type it carefully — and do check your inbox.'}
                </p>
              </div>
            </div>

            <fieldset>
              <legend className={labelCls}>{bn ? 'ফোন নাম্বারটা কার?' : 'Whose number is it?'} *</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {phoneOwnerOpts.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-[0.88rem]">
                    <input type="radio" name="phone-owner" value={opt} required className="size-4 accent-[var(--primary)]" />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="j-inst">{bn ? 'শিক্ষা প্রতিষ্ঠানের নাম' : 'Educational institution'} *</label>
                <input id="j-inst" name="institution" required className={`${field} mt-1.5`} />
                <p className={hintCls}>{bn ? 'স্কুল, কলেজ বা বিশ্ববিদ্যালয়ের নাম' : 'School, college or university'}</p>
              </div>
              <div>
                <label className={labelCls} htmlFor="j-class">{bn ? 'এডুকেশন লেভেল' : 'Education level'} *</label>
                <input id="j-class" name="education-level" required className={`${field} mt-1.5`} />
                <p className={hintCls}>
                  {bn ? 'কোন শ্রেণিতে পড়ছ; ভার্সিটি হলে কোন বর্ষ বা সেমিস্টার' : 'Your class — or year/semester if at university'}
                </p>
              </div>
              <div>
                <label className={labelCls} htmlFor="j-dob">{bn ? 'জন্মতারিখ' : 'Date of birth'} *</label>
                <input id="j-dob" name="date-of-birth" type="date" required className={`${field} mt-1.5`} />
                <p className={hintCls}>{bn ? 'জন্মসনদ বা জাতীয় পরিচয়পত্র অনুযায়ী' : 'As on your birth certificate or NID'}</p>
              </div>
              <div>
                <label className={labelCls} htmlFor="j-blood">{bn ? 'রক্তের গ্রুপ' : 'Blood group'} *</label>
                <select id="j-blood" name="blood-group" required className={`${field} mt-1.5`} defaultValue="">
                  <option value="" disabled>{bn ? 'বেছে নাও' : 'Select'}</option>
                  {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="j-fb">{bn ? 'ফেসবুক প্রোফাইল লিংক' : 'Facebook profile link'} *</label>
              <input id="j-fb" name="facebook" type="url" required placeholder="https://facebook.com/…" className={`${field} mt-1.5`} />
            </div>

            <div>
              <label className={labelCls} htmlFor="j-address">{bn ? 'বর্তমান ঠিকানা' : 'Current address'} *</label>
              <input id="j-address" name="address" required placeholder={bn ? 'যেমন: জলেশ্বরিতলা, বগুড়া সদর, বগুড়া' : 'e.g. Jaleshwaritola, Bogura Sadar, Bogura'} className={`${field} mt-1.5`} />
            </div>

            <fieldset>
              <legend className={labelCls}>{bn ? 'বিতর্ক কতদিন পর পর চর্চা করা হয় তোমার?' : 'How often do you practise debate?'} *</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {practiceOpts.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-[0.88rem]">
                    <input type="radio" name="practice-frequency" value={opt} required className="size-4 accent-[var(--primary)]" />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelCls}>{bn ? 'সপ্তাহে গড়ে কতক্ষণ সময় দিতে পারবে BDS-কে?' : 'How many hours a week can you give BDS?'} *</legend>
              <p className={hintCls}>
                {bn ? 'পুরো এক সপ্তাহে সব মিলিয়ে BDS-এর জন্য কতটা সময় রাখতে পারবে?' : 'Across a whole week, how much time can you set aside for BDS in total?'}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                {weeklyOpts.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-[0.88rem]">
                    <input type="radio" name="weekly-time" value={opt} required className="size-4 accent-[var(--primary)]" />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label className={labelCls} htmlFor="j-why">{bn ? 'BDS-এ কেন যুক্ত হতে চাও, শুনি?' : 'Why do you want to join BDS?'} *</label>
              <textarea id="j-why" name="why" rows={4} required className={`${field} mt-1.5 resize-y`} />
              <p className={hintCls}>{bn ? 'একটু বিস্তারিত আর সত্যি কথাই লেখো কেমন!' : 'Be a little detailed — and honest!'}</p>
            </div>

            <div>
              <label className={labelCls} htmlFor="j-ref">{bn ? 'Member Reference (ঐচ্ছিক)' : 'Member reference (optional)'}</label>
              <input id="j-ref" name="member-reference" className={`${field} mt-1.5`} />
              <p className={hintCls}>{bn ? 'BDS-এর কোনো সদস্যের রেফারেন্স থাকলে নামটা লেখো' : 'If a current BDS member referred you, write their name'}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn btn-primary focus-ring">{d.join.submit}</button>
              <p className="text-[0.75rem] leading-6 text-[var(--muted-foreground)]">
                {bn ? 'তোমার তথ্য শুধু BDS-এর সদস্য ব্যবস্থাপনায় ব্যবহৃত হবে।' : 'Your details are used only for BDS membership administration.'}
              </p>
            </div>
          </form>

          {/* নির্দেশনা */}
          <div className="mt-6 rounded-lg border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] p-4">
            <p className="flex items-center gap-2 text-[0.8rem] font-bold">
              <Info className="size-4 text-[var(--accent)]" aria-hidden /> {bn ? 'নির্দেশনা' : 'What happens next'}
            </p>
            <ul className="mt-2 grid gap-1.5 pl-6 text-[0.78rem] leading-6 text-[var(--text-secondary)] [list-style:disc]">
              <li>
                {bn
                  ? 'ফর্ম জমা দেওয়ার ২৪–৪৮ ঘণ্টার মধ্যে তোমার ই-মেইল বা ফোন নাম্বারে Messenger ও WhatsApp গ্রুপের লিংক পাঠানো হবে।'
                  : 'Within 24–48 hours of submitting, you’ll get the Messenger & WhatsApp group links by email or phone.'}
              </li>
              <li>
                {bn
                  ? 'পরিচিত কেউ আগে থেকেই BDS-এর সদস্য হলে ফর্ম পূরণের পর তাকে বলো — সে-ই তোমাকে গ্রুপে যুক্ত করে নেবে।'
                  : 'If someone you know is already a BDS member, ask them after submitting — they can add you to the groups directly.'}
              </li>
              <li>
                {bn
                  ? 'লিংক না পেলে ৩–৪ দিন অপেক্ষা করো; তারপরও না পেলে আমাদের Facebook পেজে মেসেজ কোরো। গ্রুপে ঢুকলেই যাবতীয় তথ্য পেয়ে যাবে।'
                  : 'No link after 3–4 days? Message our Facebook page. Once you join the groups, you’ll find everything there.'}
              </li>
            </ul>
          </div>

          <p className="mt-4 rounded-lg border border-dashed border-[var(--border-strong)] p-4 text-[0.78rem] leading-7 text-[var(--muted-foreground)]">
            {d.join.formNote}
          </p>
        </div>
      </Section>
    </>
  );
}
