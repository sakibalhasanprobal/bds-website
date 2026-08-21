import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Lang } from '@/content/site';

/** ভাষা-সচেতন লিংক — /bn/... বা /en/... prefix নিজে যোগ করে */
export function L({
  lang, href, children, className, ...rest
}: { lang: Lang; href: string; children: ReactNode; className?: string } & Record<string, unknown>) {
  const to = href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')
    ? href
    : `/${lang}${href === '/' ? '' : href}`;
  return (
    <Link href={to} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function Section({
  band, children, id, className = '',
}: { band?: 'house' | 'oppo' | 'gallery' | 'chamber' | 'notes'; children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`band ${band ? `band-${band}` : ''} section-pad ${className}`}>
      <div className="section-shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow, title, sub, action, center = false,
}: { eyebrow?: string; title: string; sub?: string; action?: ReactNode; center?: boolean }) {
  return (
    <div className={`mb-8 flex flex-col gap-4 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-[clamp(1.5rem,2.6vw,2.3rem)]">{title}</h2>
        {sub && <p className="mt-3 text-[0.98rem] text-[var(--text-secondary)]">{sub}</p>}
        {!center && <div className="hairline mt-5 max-w-sm" />}
      </div>
      {action}
    </div>
  );
}

export function Stat({
  value, label, note, className = '',
}: { value: string; label: string; note?: string; className?: string }) {
  return (
    <div className={`paper-card interactive-card p-5 ${className}`}>
      <p className="font-en-display text-[2.1rem] leading-none text-[var(--primary)]">{value}</p>
      <p className="mt-2 text-sm font-semibold leading-snug text-[var(--foreground)]">{label}</p>
      {note && <p className="mt-1.5 text-[0.72rem] leading-snug text-[var(--muted-foreground)]">{note}</p>}
    </div>
  );
}

export function Tag({ cls, children }: { cls: string; children: ReactNode }) {
  return <span className={`tag ${cls}`}>{children}</span>;
}

export function PageHero({
  lang, eyebrow, title, sub, children,
}: { lang?: Lang; eyebrow?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="band band-chamber border-b border-[var(--border)] py-14 sm:py-20">
      <div className="section-shell">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-[clamp(1.9rem,4vw,3.1rem)]">{title}</h1>
          <div className="hairline mt-5 max-w-md" />
          {sub && <p className="mt-5 text-[1.02rem] leading-8 text-[var(--text-secondary)]">{sub}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
