import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/ui';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata = { title: 'ধন্যবাদ · Thank you' };

export default async function ThanksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);
  const bn = lang === 'bn';

  return (
    <Section band="chamber" className="min-h-[70vh] grid place-items-center">
      <div className="bench-panel mx-auto max-w-xl p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-[var(--accent)]" aria-hidden />
        <h1 className="mt-5 text-[clamp(1.6rem,3vw,2.3rem)]">{bn ? 'ধন্যবাদ!' : 'Thank you!'}</h1>
        <p className="mt-4 text-[0.98rem] leading-8 text-[var(--text-secondary)]">
          {bn
            ? 'তোমার বার্তা আমাদের কাছে পৌঁছেছে। BDS টিম শীঘ্রই যোগাযোগ করবে।'
            : 'Your message has reached us. The BDS team will get back to you soon.'}
        </p>
        <Link href={`/${lang}`} className="btn btn-primary focus-ring mt-7">{d.notFound.cta}</Link>
      </div>
    </Section>
  );
}
