import { PageHero, Section, SectionHead } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { partners } from '@/content/timeline';
import { num } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'অংশীদার · Partners' };

export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const kinds = ['org', 'institution', 'sponsor', 'authority'] as const;
  const bands = ['house', 'gallery', 'notes', 'chamber'] as const;

  return (
    <>
      <PageHero
        eyebrow={bn ? `${num(partners.length, lang)}টি সংগঠন ও প্রতিষ্ঠান` : `${partners.length} organisations and institutions`}
        title={d.partners.title}
        sub={d.partners.sub}
      />

      {kinds.map((k, ki) => {
        const list = partners.filter((p) => p.kind === k);
        if (!list.length) return null;
        return (
          <Section key={k} band={bands[ki % bands.length]}>
            <SectionHead title={d.partners.kinds[k]} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <article
                  key={p.name}
                  className={`reveal ${i % 2 ? 'reveal-left' : ''} paper-card interactive-card p-5`}
                  style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.05}s` }}
                >
                  <h2 className="text-[1.02rem] leading-7">{p.name}</h2>
                  <p className="mt-2 text-[0.85rem] leading-7 text-[var(--text-secondary)]">{bn ? p.relation : p.relationEn}</p>
                </article>
              ))}
            </div>
            {k === 'authority' && (
              <p className="mt-5 rounded-lg border border-dashed border-[var(--border-strong)] p-4 text-[0.78rem] leading-7 text-[var(--muted-foreground)]">
                {bn
                  ? 'সরকারি সংস্থার সাথে BDS নির্দিষ্ট আয়োজনে সহযোগিতায় কাজ করেছে। এটি কোনো স্থায়ী অংশীদারিত্ব বা অনুমোদন নয়, এবং তাঁদের লোগো ব্যবহার করা হয়নি।'
                  : 'BDS has worked in cooperation with these public bodies on specific events. This is not a standing partnership or endorsement, and their logos are not used.'}
              </p>
            )}
          </Section>
        );
      })}
    </>
  );
}
