'use client';

import { useRef, useState } from 'react';
import { X, Send, MessageCircleQuestion } from 'lucide-react';
import type { Lang } from '@/content/site';
import { getDict } from '@/content/dict';
import { faqs } from '@/content/timeline';

type Msg = { id: number; role: 'bot' | 'user'; text: string };

/** কীওয়ার্ড মিলিয়ে FAQ থেকে উত্তর — কোনো বাইরের API নয়, সব ব্রাউজারেই চলে */
function answer(q: string): string | null {
  const s = q.trim().toLowerCase();
  if (!s) return null;
  const words = s.split(/\s+/).filter((w) => w.length > 2);
  let best: { score: number; a: string } | null = null;
  for (const f of faqs) {
    const hay = `${f.q} ${f.keywords.join(' ')}`.toLowerCase();
    const score = words.reduce((n, w) => (hay.includes(w) ? n + 1 : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, a: f.a };
  }
  return best ? best.a : null;
}

export default function Buddy({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const idRef = useRef(1);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'bot', text: d.buddy.greeting }]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const reply = answer(q) ?? d.buddy.fallback;
    setMsgs((m) => [
      ...m,
      { id: idRef.current++, role: 'user', text: q },
      { id: idRef.current++, role: 'bot', text: reply },
    ]);
    setInput('');
  };

  return (
    <div className="buddy-shell">
      {open ? (
        <div className="buddy-panel" role="dialog" aria-label={d.buddy.eyebrow}>
          <div className="buddy-header">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/buddy.svg" alt="" className="size-9" />
              </span>
              <div>
                <p className="text-[0.95rem] font-extrabold leading-tight">{d.buddy.eyebrow}</p>
                <p className="text-[0.72rem] opacity-80">{d.buddy.chip}</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={d.buddy.close} className="focus-ring grid size-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="buddy-messages">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.86rem] leading-6 ${
                  m.role === 'bot'
                    ? 'bg-[rgba(30,58,138,0.08)] text-[var(--foreground)]'
                    : 'ml-auto bg-[var(--primary)] text-[var(--primary-foreground)]'
                }`}
              >
                {m.text}
              </div>
            ))}

            <div className="pt-2">
              <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{d.buddy.suggestions}</p>
              <div className="flex flex-wrap gap-1.5">
                {faqs.slice(0, 5).map((f) => (
                  <button
                    key={f.q}
                    type="button"
                    onClick={() => ask(f.q)}
                    className="focus-ring rounded-full border border-[var(--border-strong)] px-2.5 py-1 text-[0.72rem] font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--primary)]"
                  >
                    {f.q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); ask(input); }}
            className="flex items-center gap-2 border-t border-[var(--border)] p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={d.buddy.placeholder}
              aria-label={d.buddy.placeholder}
              className="focus-ring min-w-0 flex-1 rounded-full border border-[var(--border-strong)] bg-[var(--paper)] px-4 py-2.5 text-[0.86rem]"
            />
            <button type="submit" aria-label={d.buddy.send} className="btn btn-primary focus-ring !p-3">
              <Send className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} aria-label={d.buddy.open} className="buddy-launcher focus-ring">
          <span className="buddy-glow" aria-hidden />
          <span className="buddy-copy">
            <span className="buddy-eyebrow">{d.buddy.eyebrow}</span>
            <span className="buddy-title">{d.buddy.title}</span>
            <span className="buddy-chip"><MessageCircleQuestion className="size-3.5" aria-hidden />{d.buddy.chip}</span>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/buddy.svg" alt="" className="buddy-mascot float-gentle" />
        </button>
      )}
    </div>
  );
}
