import { AlertCircle } from 'lucide-react';
import { PageHero, Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { practiceDebates } from '@/content/practiceDebates';
import { pad2 } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'অনুশীলনী বিতর্ক · Practice Debates' };

export default async function PracticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  const total = practiceDebates.length;
  const trad = practiceDebates.filter((p) => p.format === 'সনাতনী' && !p.missing).length;
  const parl = practiceDebates.filter((p) => p.format === 'সংসদীয়').length;

  const summary = [
    { v: bn ? '১৯' : '19', l: d.practice.total },
    { v: bn ? '১৭' : String(trad + 1), l: d.practice.traditional },
    { v: bn ? '২' : String(parl), l: d.practice.parliamentary },
  ];

  return (
    <>
      <PageHero eyebrow={bn ? 'সপ্তাহে ৩–৪টি সেশন' : 'Three to four sessions a week'} title={d.practice.title} sub={d.practice.sub}>
        <div className="mt-8 flex flex-wrap gap-3">
          {summary.map((s) => (
            <div key={s.l} className="paper-card px-5 py-3">
              <span className="font-en-display text-[1.6rem] leading-none text-[var(--primary)]">{s.v}</span>
              <span className="ml-2 text-[0.82rem] font-semibold text-[var(--text-secondary)]">{s.l}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section band="house">
        {/* ডেস্কটপ: টেবিল */}
        <div className="bench-panel hidden overflow-hidden p-2 md:block">
          <div className="overflow-x-auto">
            <table className="data-table">
              <caption className="sr-only">{d.practice.title}</caption>
              <thead>
                <tr>
                  <th scope="col">{d.practice.colNo}</th>
                  <th scope="col">{d.practice.colFormat}</th>
                  <th scope="col" className="min-w-[22rem]">{d.practice.colMotion}</th>
                  <th scope="col">{d.practice.colWinner}</th>
                  <th scope="col">{d.practice.colBest}</th>
                  <th scope="col">{d.practice.colAdj}</th>
                </tr>
              </thead>
              <tbody>
                {practiceDebates.map((p) => (
                  <tr key={p.no} className={p.missing ? 'opacity-60' : ''}>
                    <td className="font-en-display text-[1.1rem] text-[var(--accent)]">{pad2(p.no, lang)}</td>
                    <td>
                      <span className={`tag ${p.format === 'সংসদীয়' ? 'tag-shongshodio' : 'tag-shonatoni'}`}>{p.format}</span>
                    </td>
                    <td className="font-semibold">
                      {p.missing ? (
                        <span className="inline-flex items-center gap-2 text-[var(--muted-foreground)]">
                          <AlertCircle className="size-4" aria-hidden /> {d.practice.missing}
                        </span>
                      ) : p.motion}
                    </td>
                    <td className="font-bold text-[var(--primary)]">{p.winner}</td>
                    <td>{p.bestSpeaker}</td>
                    <td className="text-[var(--muted-foreground)]">{p.adjudicator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* মোবাইল: কার্ড */}
        <div className="grid gap-4 md:hidden">
          {practiceDebates.map((p, i) => (
            <article
              key={p.no}
              className={`reveal paper-card p-5 ${p.missing ? 'opacity-70' : ''}`}
              style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.04}s` }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-en-display text-[1.5rem] leading-none text-[var(--accent)]">{pad2(p.no, lang)}</span>
                <span className={`tag ${p.format === 'সংসদীয়' ? 'tag-shongshodio' : 'tag-shonatoni'}`}>{p.format}</span>
              </div>
              <h2 className="mt-3 text-[1rem] leading-7">{p.missing ? d.practice.missing : p.motion}</h2>
              {!p.missing && (
                <dl className="mt-4 grid gap-1.5 text-[0.82rem]">
                  <div className="flex gap-2"><dt className="text-[var(--muted-foreground)]">{d.practice.colWinner}:</dt><dd className="font-bold text-[var(--primary)]">{p.winner}</dd></div>
                  <div className="flex gap-2"><dt className="text-[var(--muted-foreground)]">{d.practice.colBest}:</dt><dd className="font-semibold">{p.bestSpeaker}</dd></div>
                  <div className="flex gap-2"><dt className="text-[var(--muted-foreground)]">{d.practice.colAdj}:</dt><dd>{p.adjudicator}</dd></div>
                </dl>
              )}
            </article>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 rounded-lg border border-dashed border-[var(--border-strong)] p-4 text-[0.82rem] leading-7 text-[var(--muted-foreground)]">
          <AlertCircle className="mt-1 size-4 shrink-0" aria-hidden />
          {d.practice.missingNote}
        </p>
      </Section>
    </>
  );
}
