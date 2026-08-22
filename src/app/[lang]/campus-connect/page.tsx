import { MapPin, CheckCircle2, Mail, Phone } from 'lucide-react';
import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang, site } from '@/content/site';
import { getDict } from '@/content/dict';
import { campusStops, workshopCurriculum, campusAreas } from '@/content/campus';
import { num } from '@/lib/num';
import { pad2 } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'Campus Connect' };

export default async function CampusPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  return (
    <>
      <PageHero
        eyebrow={bn ? '১৭+ প্রতিষ্ঠান · ৩ উপজেলা' : '17+ institutions · 3 upazilas'}
        title={d.campus.title}
        sub={d.campus.sub}
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {campusAreas.map((area) => {
            const n = campusStops.filter((c) => c.area === area).length;
            return (
              <div key={area} className="paper-card p-4">
                <MapPin className="size-4 text-[var(--accent)]" aria-hidden />
                <p className="mt-2 font-en-display text-[1.5rem] leading-none text-[var(--primary)]">{num(n, lang)}</p>
                <p className="mt-1 text-[0.78rem] font-semibold leading-snug">{area}</p>
              </div>
            );
          })}
        </div>
      </PageHero>

      {/* সব stop */}
      <Section band="gallery">
        <SectionHead
          eyebrow={bn ? 'সম্পূর্ণ রেকর্ড' : 'The complete record'}
          title={bn ? 'যেসব প্রতিষ্ঠানে আমরা গিয়েছি' : 'Where we have been'}
        />

        <div className="bench-panel hidden overflow-hidden p-2 lg:block">
          <div className="overflow-x-auto">
            <table className="data-table">
              <caption className="sr-only">{d.campus.title}</caption>
              <thead>
                <tr>
                  <th scope="col">{d.campus.colDate}</th>
                  <th scope="col" className="min-w-[18rem]">{d.campus.colInstitution}</th>
                  <th scope="col">{d.campus.colArea}</th>
                  <th scope="col">{d.campus.colAttendance}</th>
                  <th scope="col" className="min-w-[16rem]">{d.campus.colNote}</th>
                </tr>
              </thead>
              <tbody>
                {campusStops.map((c) => (
                  <tr key={`${c.date}-${c.institution}`}>
                    <td className="whitespace-nowrap text-[var(--muted-foreground)]">{c.date}</td>
                    <td className="font-semibold">
                      {c.institution}
                      {c.highlight && <span className="tag tag-romyo ml-2">★</span>}
                    </td>
                    <td><span className="tag tag-bp">{c.area}</span></td>
                    <td className="font-en-display text-[1.1rem] text-[var(--primary)]">{c.attendance ?? '—'}</td>
                    <td className="text-[var(--text-secondary)]">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 lg:hidden">
          {campusStops.map((c, i) => (
            <article key={`${c.date}-${c.institution}`} className="reveal paper-card p-5" style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.04}s` }}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag tag-bp">{c.area}</span>
                <span className="text-[0.72rem] font-bold text-[var(--muted-foreground)]">{c.date}</span>
                {c.attendance && <span className="tag tag-shonatoni">{c.attendance}</span>}
              </div>
              <h2 className="mt-3 text-[1.02rem] leading-7">{c.institution}</h2>
              <p className="mt-2 text-[0.85rem] leading-7 text-[var(--text-secondary)]">{c.note}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* কারিকুলাম + অনুরোধ */}
      <Section band="house">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="bench-panel p-6 sm:p-8">
            <SectionHead eyebrow={bn ? 'নির্ধারিত কাঠামো' : 'A fixed structure'} title={d.campus.curriculum} />
            <ol className="grid gap-2.5">
              {workshopCurriculum.map((w, i) => (
                <li key={w.en} className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-3.5">
                  <span className="font-en-display text-[1.05rem] leading-6 text-[var(--accent)]">{pad2(i + 1, lang)}</span>
                  <span className="text-[0.9rem] font-semibold leading-7">{bn ? w.bn : w.en}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bench-panel flex flex-col justify-center p-6 sm:p-8">
            <p className="eyebrow mb-2">{bn ? 'বিনামূল্যে' : 'Free of charge'}</p>
            <h2 className="text-[clamp(1.3rem,2.2vw,1.9rem)]">{d.campus.requestTitle}</h2>
            <div className="hairline mt-4 max-w-xs" />
            <p className="mt-4 text-[0.9rem] leading-7 text-[var(--text-secondary)]">{d.campus.requestBody}</p>

            {/* কর্মশালার অনুরোধ ফর্ম */}
            <form
              method="POST"
              action="https://formsubmit.co/boguradebatingsociety@gmail.com"
              className="mt-5 grid gap-4"
            >
              <input type="hidden" name="_subject" value={bn ? 'BDS ওয়েবসাইট: কর্মশালার অনুরোধ' : 'BDS website: workshop request'} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={`https://boguradebatingsociety.pages.dev/${lang}/thanks/`} />
              <p className="hidden"><label>{bn ? 'খালি রাখুন' : 'Leave empty'}<input name="_honey" /></label></p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.8rem] font-bold text-[var(--text-secondary)]" htmlFor="w-name">{bn ? 'আপনার নাম' : 'Your name'} *</label>
                  <input id="w-name" name="name" required className="focus-ring mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-[0.9rem]" />
                </div>
                <div>
                  <label className="block text-[0.8rem] font-bold text-[var(--text-secondary)]" htmlFor="w-phone">{bn ? 'মোবাইল নম্বর' : 'Mobile number'} *</label>
                  <input id="w-phone" name="mobile" type="tel" required className="focus-ring mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-[0.9rem]" />
                </div>
              </div>
              <div>
                <label className="block text-[0.8rem] font-bold text-[var(--text-secondary)]" htmlFor="w-inst">{bn ? 'প্রতিষ্ঠানের নাম' : 'Institution name'} *</label>
                <input id="w-inst" name="institution" required className="focus-ring mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-[0.9rem]" />
              </div>
              <div>
                <label className="block text-[0.8rem] font-bold text-[var(--text-secondary)]" htmlFor="w-role">{bn ? 'উক্ত প্রতিষ্ঠানে আপনি' : 'Your role at the institution'} *</label>
                <select id="w-role" name="role" required defaultValue="" className="focus-ring mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-[0.9rem]">
                  <option value="" disabled>{bn ? 'বেছে নিন' : 'Select'}</option>
                  {(bn
                    ? ['শিক্ষার্থী', 'শিক্ষক', 'অ্যালামনাই', 'কর্তৃপক্ষ / স্টাফ', 'অভিভাবক']
                    : ['Student', 'Teacher', 'Alumni', 'Authority / staff', 'Guardian']
                  ).map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary focus-ring justify-self-start">
                {bn ? 'অনুরোধ পাঠান' : 'Send request'}
              </button>
            </form>

            <ul className="mt-6 grid gap-2.5 border-t border-[var(--border)] pt-5 text-[0.9rem]">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-[var(--primary)]" aria-hidden />
                <a href={`tel:${site.phoneIntl}`} className="focus-ring font-semibold hover:text-[var(--primary)]">{site.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-[var(--primary)]" aria-hidden />
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(bn ? 'কর্মশালার অনুরোধ' : 'Workshop request')}`} className="focus-ring break-all font-semibold hover:text-[var(--primary)]">{site.email}</a>
              </li>
            </ul>
            <p className="mt-3 text-[0.84rem] leading-7 text-[var(--text-secondary)]">
              {bn ? 'চাইলে আমাদের ' : 'You can also message our '}
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="focus-ring font-bold text-[var(--primary)] underline underline-offset-4">
                {bn ? 'Facebook পেজে নক করতে পারেন' : 'Facebook page'}
              </a>
              {bn ? '।' : '.'}
            </p>
            <div className="mt-5 flex items-start gap-2 rounded-lg bg-[rgba(201,162,39,0.12)] p-4 text-[0.84rem] leading-7">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-[var(--accent)]" aria-hidden />
              {bn
                ? 'যেসব প্রতিষ্ঠানে বিতর্ক ক্লাব নেই, কর্মশালার পর সেখানে ক্লাব গঠনে আমরা সাহায্য করি। আপনি চাইলে আপনার প্রতিষ্ঠানেও সেটা সম্ভব।'
                : 'Where there is no debate club yet, we help start one after the workshop. If you want, the same is possible at your institution.'}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
