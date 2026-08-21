'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Copy, Check, X } from 'lucide-react';
import type { Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { motions, motionFormats, motionTopics, formatTagClass, type MotionFormat, type MotionTopic } from '@/content/motions';
import { num } from '@/lib/num';

export default function MotionBank({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const bn = lang === 'bn';
  const [q, setQ] = useState('');
  const [fmt, setFmt] = useState<MotionFormat | 'all'>('all');
  const [topic, setTopic] = useState<MotionTopic | 'all'>('all');
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd/Ctrl + K → সার্চে ফোকাস
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) setQ('');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return motions.filter((m) => {
      if (fmt !== 'all' && m.format !== fmt) return false;
      if (topic !== 'all' && m.topic !== topic) return false;
      if (!needle) return true;
      return `${m.text} ${m.usedIn} ${m.usedInEn} ${m.topic} ${m.format}`.toLowerCase().includes(needle);
    });
  }, [q, fmt, topic]);

  const copy = async (m: { id: string; text: string }) => {
    try {
      await navigator.clipboard.writeText(m.text);
      setCopied(m.id);
      setTimeout(() => setCopied(null), 1600);
    } catch { /* clipboard unavailable */ }
  };

  const chip = (active: boolean) =>
    `focus-ring rounded-full border px-3 py-1.5 text-[0.78rem] font-bold transition ${
      active
        ? 'border-transparent bg-[var(--primary)] text-[var(--primary-foreground)]'
        : 'border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
    }`;

  return (
    <div>
      {/* সার্চ */}
      <div className="bench-panel p-5 sm:p-6">
        <label htmlFor="motion-search" className="sr-only">{d.common.search}</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[var(--muted-foreground)]" aria-hidden />
          <input
            id="motion-search"
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={d.motions.searchPlaceholder}
            className="focus-ring w-full rounded-full border border-[var(--border-strong)] bg-[var(--surface)] py-3.5 pl-11 pr-24 text-[0.95rem]"
          />
          {q ? (
            <button type="button" onClick={() => setQ('')} aria-label={d.common.closeMenu}
              className="focus-ring absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-[rgba(30,58,138,0.08)]">
              <X className="size-4" aria-hidden />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--border-strong)] px-2 py-1 font-en-ui text-[0.68rem] font-bold text-[var(--muted-foreground)] sm:block">
              Ctrl K
            </kbd>
          )}
        </div>

        <div className="mt-5 grid gap-4">
          <div>
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{d.motions.filterFormat}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={chip(fmt === 'all')} onClick={() => setFmt('all')}>{d.common.all}</button>
              {motionFormats.map((f) => (
                <button key={f} type="button" className={chip(fmt === f)} onClick={() => setFmt(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{d.motions.filterTopic}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={chip(topic === 'all')} onClick={() => setTopic('all')}>{d.common.all}</button>
              {motionTopics.map((t) => (
                <button key={t} type="button" className={chip(topic === t)} onClick={() => setTopic(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-[0.82rem] font-bold text-[var(--muted-foreground)]" role="status" aria-live="polite">
          {`${num(results.length, lang)}${d.motions.count}`}
        </p>
      </div>

      {/* ফলাফল */}
      {results.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-[var(--border-strong)] p-8 text-center text-[0.9rem] text-[var(--muted-foreground)]">
          {d.common.noResult}
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {results.map((m, i) => (
            <li key={m.id} className="reveal paper-card interactive-card flex flex-col p-5" style={{ ['--reveal-delay' as string]: `${Math.min(i, 6) * 0.04}s` }}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`tag ${formatTagClass[m.format]}`}>{m.format}</span>
                <span className="tag tag-bp">{m.topic}</span>
              </div>
              <p className="mt-3 flex-1 text-[1rem] font-semibold leading-8">{m.text}</p>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-[var(--border)] pt-3">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{d.motions.usedIn}</p>
                  <p className="mt-0.5 text-[0.8rem] font-semibold">{bn ? m.usedIn : m.usedInEn}</p>
                  {m.date && <p className="text-[0.72rem] text-[var(--muted-foreground)]">{m.date}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => copy(m)}
                  className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-3 py-1.5 text-[0.74rem] font-bold transition hover:border-[var(--accent)]"
                >
                  {copied === m.id ? <Check className="size-3.5 text-[var(--primary)]" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                  {copied === m.id ? d.common.copied : d.common.copy}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
