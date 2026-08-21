'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import type { Lang } from '@/content/site';
import { getDict } from '@/content/dict';

const navItems = (d: ReturnType<typeof getDict>) => [
  { href: '/', label: d.nav.home },
  { href: '/about', label: d.nav.about },
  { href: '/practice-debates', label: d.nav.practice },
  { href: '/motions', label: d.nav.motions },
  { href: '/campus-connect', label: d.nav.campus },
  { href: '/events', label: d.nav.events },
  { href: '/blog', label: d.nav.blog },
  { href: '/team', label: d.nav.team },
];

export default function SiteHeader({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const items = navItems(d);
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('bds-theme', next ? 'dark' : 'light'); } catch { /* private mode */ }
  };

  const otherLang: Lang = lang === 'bn' ? 'en' : 'bn';
  const rest = pathname.replace(/^\/(bn|en)/, '') || '/';
  const langHref = `/${otherLang}${rest === '/' ? '' : rest}`;

  const isActive = (href: string) => {
    const full = `/${lang}${href === '/' ? '' : href}`;
    return href === '/' ? pathname === full || pathname === `${full}/` : pathname.startsWith(full);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] shadow-[0_12px_38px_rgba(11,18,32,0.06)] backdrop-blur-[20px]">
      <div className="section-shell flex min-h-[76px] items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          aria-label={lang === 'bn' ? 'বগুড়া ডিবেটিং সোসাইটি — হোম' : 'Bogura Debating Society — home'}
          className="focus-ring inline-flex shrink-0 items-center rounded-xl transition hover:-translate-y-0.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-light.png" alt="" className="h-[46px] w-auto object-contain sm:h-[54px] dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-dark.png" alt="" className="hidden h-[46px] w-auto object-contain sm:h-[54px] dark:block" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label={lang === 'bn' ? 'প্রধান মেনু' : 'Main navigation'}>
          {items.map((it) => (
            <Link
              key={it.href}
              href={`/${lang}${it.href === '/' ? '' : it.href}`}
              className={`focus-ring rounded-full px-3 py-2 text-[0.86rem] font-semibold transition ${
                isActive(it.href)
                  ? 'bg-[rgba(30,58,138,0.1)] text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[rgba(30,58,138,0.06)] hover:text-[var(--primary)]'
              }`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={langHref}
            className="focus-ring hidden items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-3 py-2 text-[0.8rem] font-bold transition hover:border-[var(--accent)] sm:inline-flex"
          >
            <Languages className="size-4" aria-hidden />
            {d.common.switchLang}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? d.common.toLight : d.common.toDark}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-3 py-2 text-[0.8rem] font-bold transition hover:border-[var(--accent)]"
          >
            {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
            <span className="hidden sm:inline">{dark ? d.common.light : d.common.dark}</span>
          </button>
          <Link href={`/${lang}/join`} className="btn btn-primary focus-ring hidden !px-4 !py-2 !text-[0.85rem] sm:inline-flex">
            {d.nav.join}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? d.common.closeMenu : d.common.openMenu}
            aria-expanded={open}
            className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-[var(--border-strong)] xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] xl:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {items.map((it) => (
              <Link
                key={it.href}
                href={`/${lang}${it.href === '/' ? '' : it.href}`}
                className="focus-ring rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[rgba(30,58,138,0.06)] hover:text-[var(--primary)]"
              >
                {it.label}
              </Link>
            ))}
            <Link href={`/${lang}/contact`} className="focus-ring rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)]">
              {d.nav.contact}
            </Link>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href={langHref} className="btn btn-ghost focus-ring !px-4 !py-2 !text-[0.82rem]">
                {d.common.switchLang}
              </Link>
              <Link href={`/${lang}/join`} className="btn btn-primary focus-ring !px-4 !py-2 !text-[0.82rem]">
                {d.nav.join}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
