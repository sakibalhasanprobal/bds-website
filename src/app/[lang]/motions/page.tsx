import { PageHero, Section } from '@/components/ui';
import MotionBank from '@/components/MotionBank';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { motions } from '@/content/motions';
import { num } from '@/lib/num';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'Motion Bank' };

export default async function MotionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  return (
    <>
      <PageHero
        eyebrow={bn ? `${num(motions.length, lang)}টি যাচাইকৃত motion` : `${motions.length} verified motions`}
        title={d.motions.title}
        sub={d.motions.sub}
      />
      <Section band="notes">
        <MotionBank lang={lang} />
      </Section>
    </>
  );
}
