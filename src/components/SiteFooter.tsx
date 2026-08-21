import Link from 'next/link';
import { MapPin, Mail, Phone, ExternalLink, Lock } from 'lucide-react';
import type { Lang } from '@/content/site';
import { site } from '@/content/site';
import { getDict } from '@/content/dict';

export default function SiteFooter({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const bn = lang === 'bn';

  const links = [
    { href: '/about', label: d.nav.about },
    { href: '/practice-debates', label: d.nav.practice },
    { href: '/motions', label: d.nav.motions },
    { href: '/campus-connect', label: d.nav.campus },
    { href: '/events', label: d.nav.events },
    { href: '/blog', label: d.nav.blog },
    { href: '/best-speakers', label: bn ? 'শ্রেষ্ঠ বক্তারা' : 'Best speakers' },
    { href: '/team', label: d.nav.team },
  ];

  return (
    <footer className="band band-notes border-t border-[var(--border)] pt-12">
      <div className="section-shell">
        <div className="grid gap-10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-light.png" alt={bn ? site.nameBn : site.nameEn} className="h-[62px] w-auto object-contain dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-dark.png" alt="" className="hidden h-[62px] w-auto object-contain dark:block" />
            </div>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-7 text-[var(--text-secondary)]">{d.footer.blurb}</p>
            <ul className="mt-5 space-y-2 text-[0.86rem] text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 shrink-0 text-[var(--primary)]" aria-hidden />
                <span>{bn ? site.addressBn : site.addressEn}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-[var(--primary)]" aria-hidden />
                <a href={`tel:${site.phoneIntl}`} className="focus-ring hover:text-[var(--primary)]">{site.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-[var(--primary)]" aria-hidden />
                <a href={`mailto:${site.email}`} className="focus-ring break-all hover:text-[var(--primary)]">{site.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[1.05rem]">{d.footer.links}</h3>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={`/${lang}${l.href}`} className="focus-ring text-[var(--text-secondary)] hover:text-[var(--primary)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[1.05rem]">{d.footer.community}</h3>
            <ul className="mt-4 space-y-2 text-[0.88rem]">
              <li><Link href={`/${lang}/join`} className="focus-ring text-[var(--text-secondary)] hover:text-[var(--primary)]">{d.nav.join}</Link></li>
              <li><Link href={`/${lang}/campus-connect`} className="focus-ring text-[var(--text-secondary)] hover:text-[var(--primary)]">{bn ? 'কর্মশালা চাই' : 'Request a workshop'}</Link></li>
              <li><Link href={`/${lang}/partners`} className="focus-ring text-[var(--text-secondary)] hover:text-[var(--primary)]">{d.nav.partners}</Link></li>
              <li><Link href={`/${lang}/contact`} className="focus-ring text-[var(--text-secondary)] hover:text-[var(--primary)]">{d.nav.contact}</Link></li>
              <li>
                <a href={site.facebook} target="_blank" rel="noreferrer noopener" className="focus-ring inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--primary)]">
                  <ExternalLink className="size-3.5" aria-hidden /> Facebook
                </a>
              </li>
              <li>
                <a href="/admin/" className="focus-ring inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--primary)]">
                  <Lock className="size-3.5" aria-hidden /> {bn ? 'অ্যাডমিন প্যানেল' : 'Admin panel'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] py-6 text-center text-[0.8rem] text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} {bn ? site.nameBn : site.nameEn} · {bn ? site.sloganBn : site.sloganEn}
        </div>
      </div>
    </footer>
  );
}
