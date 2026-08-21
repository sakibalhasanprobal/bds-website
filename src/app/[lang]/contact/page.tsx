import { MapPin, Mail, Phone, Facebook, Building2 } from 'lucide-react';
import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang, site } from '@/content/site';
import { getDict } from '@/content/dict';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'যোগাযোগ · Contact' };

const field = 'focus-ring w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.92rem]';
const labelCls = 'block text-[0.8rem] font-bold text-[var(--text-secondary)]';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const rows = [
    { icon: MapPin, label: d.contact.address, value: bn ? site.addressBn : site.addressEn },
    { icon: Building2, label: d.contact.office, value: bn ? site.officeBn : site.officeEn },
    { icon: Phone, label: d.contact.phone, value: site.phone, href: `tel:${site.phoneIntl}` },
    { icon: Mail, label: d.contact.email, value: site.email, href: `mailto:${site.email}` },
    { icon: Facebook, label: d.contact.social, value: 'facebook.com/boguradebatingsociety', href: site.facebook },
  ];

  return (
    <>
      <PageHero eyebrow={bn ? 'বগুড়া, বাংলাদেশ' : 'Bogura, Bangladesh'} title={d.contact.title} sub={d.contact.sub} />

      <Section band="house">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="bench-panel p-6 sm:p-8">
            <SectionHead eyebrow={bn ? 'সরাসরি লিখতে পারো' : 'Reach us directly'} title={d.contact.infoTitle} />
            <ul className="grid gap-4">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-3 border-b border-[var(--border)] pb-4 last:border-0">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-[rgba(30,58,138,0.1)]">
                    <r.icon className="size-4 text-[var(--primary)]" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{r.label}</p>
                    {r.href ? (
                      <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer noopener"
                        className="focus-ring break-words text-[0.92rem] font-semibold hover:text-[var(--primary)]">{r.value}</a>
                    ) : (
                      <p className="break-words text-[0.92rem] font-semibold">{r.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${site.mapQuery}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost focus-ring mt-6 w-full"
            >
              <MapPin className="size-4 text-[var(--primary)]" aria-hidden />
              {bn ? 'ম্যাপে দেখো' : 'Open in Maps'}
            </a>
          </div>

          <div className="bench-panel p-6 sm:p-9">
            <SectionHead eyebrow={bn ? 'টিম উত্তর দেবে' : 'The team will reply'} title={d.contact.formTitle} />
            <form
              method="POST"
              action="https://formsubmit.co/boguradebatingsociety@gmail.com"
              className="grid gap-5"
            >
              <input type="hidden" name="_subject" value={bn ? 'BDS ওয়েবসাইট: যোগাযোগ ফর্মের বার্তা' : 'BDS website: contact form message'} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={`https://boguradebatingsociety.pages.dev/${lang}/thanks/`} />
              <p className="hidden"><label>{bn ? 'খালি রাখো' : 'Leave empty'}<input name="_honey" /></label></p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="c-name">{d.join.name} *</label>
                  <input id="c-name" name="name" required className={`${field} mt-1.5`} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-email">{d.contact.email} *</label>
                  <input id="c-email" name="email" type="email" required className={`${field} mt-1.5`} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-phone">{d.contact.phone}</label>
                  <input id="c-phone" name="phone" type="tel" className={`${field} mt-1.5`} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="c-subject">{d.contact.subject}</label>
                  <select id="c-subject" name="subject" className={`${field} mt-1.5`} defaultValue={d.contact.subjects[0]}>
                    {d.contact.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls} htmlFor="c-msg">{d.contact.message} *</label>
                <textarea id="c-msg" name="message" rows={6} required className={`${field} mt-1.5 resize-y`} />
              </div>

              <button type="submit" className="btn btn-primary focus-ring justify-self-start">{d.contact.send}</button>
            </form>

            <p className="mt-6 rounded-lg border border-dashed border-[var(--border-strong)] p-4 text-[0.78rem] leading-7 text-[var(--muted-foreground)]">
              {d.join.formNote}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
