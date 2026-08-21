import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Buddy from '@/components/Buddy';
import { LANGS, type Lang } from '@/content/site';
import { getDict } from '@/content/dict';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = (LANGS.includes(raw as Lang) ? raw : 'bn') as Lang;
  const d = getDict(lang);

  return (
    <div lang={d.htmlLang}>
      {/* html-এর lang attribute ঠিক করে দেয় (static export-এ root layout একটাই) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(d.htmlLang)};`,
        }}
      />
      <a href="#main" className="skip-link focus-ring">{d.common.skipToContent}</a>
      <SiteHeader lang={lang} />
      <main id="main">{children}</main>
      <SiteFooter lang={lang} />
      <Buddy lang={lang} />
    </div>
  );
}
