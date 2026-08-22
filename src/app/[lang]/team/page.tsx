import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { personGroups, guestSpeakers, type Person } from '@/content/people';
import { activeDebaters } from '@/content/practiceDebates';
import { hasImage } from '@/lib/img';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'টিম · Team' };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const src = parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0].slice(0, 2);
  return src.toUpperCase();
}

function PersonCard({ p, i }: { p: Person; i: number }) {
  const photo = p.photo && hasImage(p.photo) ? p.photo : null;
  return (
    <article
      className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card overflow-hidden`}
      style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.05}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(150deg,rgba(30,58,138,0.1),rgba(201,162,39,0.1))]">
        {photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={photo} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="avatar-placeholder grid h-full w-full place-items-center">
            <span className="font-en-display text-[2.4rem] leading-none text-[var(--primary)] opacity-60">{initials(p.name)}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-[1.05rem] leading-7">{p.name}</h3>
        <p className="mt-1 text-[0.82rem] font-bold text-[var(--primary)]">{p.role}</p>
        {p.affiliation && <p className="mt-2 text-[0.82rem] leading-6 text-[var(--text-secondary)]">{p.affiliation}</p>}
        {p.note && <p className="mt-2 text-[0.76rem] leading-6 text-[var(--muted-foreground)]">{p.note}</p>}
      </div>
    </article>
  );
}

export default async function TeamPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const bands = ['notes', 'house', 'gallery', 'chamber', 'oppo'] as const;

  return (
    <>
      <PageHero eyebrow={bn ? 'কমিটি · উপদেষ্টা · মেন্টর' : 'Committees · advisors · mentors'} title={d.team.title} sub={d.team.sub} />

      {/* দ্রুত নেভিগেশন — ক্লিক করলে সরাসরি সেই কমিটিতে */}
      <nav aria-label={bn ? 'কমিটি তালিকা' : 'Committee list'} className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="section-shell flex flex-wrap justify-center gap-2 py-4">
          {[
            ...personGroups.map((g) => ({ id: g.slug, label: bn ? g.title : g.titleEn })),
            { id: 'guests', label: bn ? 'অতিথি বক্তা ও বিচারক' : 'Guest speakers' },
            { id: 'debaters', label: bn ? 'সক্রিয় বিতার্কিক' : 'Active debaters' },
          ].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="focus-ring rounded-full border border-[var(--border-strong)] px-3.5 py-1.5 text-[0.8rem] font-bold text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--primary)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {personGroups.map((g, gi) => (
        <Section key={g.slug} band={bands[gi % bands.length]} id={g.slug}>
          <SectionHead eyebrow={bn ? g.blurb : g.blurbEn} title={bn ? g.title : g.titleEn} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.people.map((p, i) => <PersonCard key={p.name} p={p} i={i} />)}
          </div>
        </Section>
      ))}

      <Section band="notes" id="guests">
        <SectionHead eyebrow={bn ? 'অতিথি ও সহযোগী' : 'Guests and collaborators'} title={bn ? 'অতিথি বক্তা ও বিচারক' : 'Guest speakers & adjudicators'} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guestSpeakers.map((p, i) => <PersonCard key={p.name} p={p} i={i} />)}
        </div>
      </Section>

      <Section band="house" id="debaters">
        <SectionHead eyebrow={d.team.debatersSub} title={d.team.debatersTitle} />
        <div className="bench-panel p-5 sm:p-7">
          <ul className="flex flex-wrap gap-2">
            {activeDebaters.map((n) => (
              <li key={n} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-[0.82rem] font-semibold text-[var(--text-secondary)]">
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.78rem] leading-7 text-[var(--muted-foreground)]">
            {bn
              ? 'এটি আংশিক তালিকা। নাম যোগ, সংশোধন বা সরাতে চাইলে যোগাযোগ পাতা থেকে জানাও।'
              : 'This is a partial list. To add, correct or remove a name, write to us from the contact page.'}
          </p>
        </div>
      </Section>
    </>
  );
}
