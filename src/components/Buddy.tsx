'use client';

import { useRef, useState } from 'react';
import { X, Send, MessageCircleQuestion, Phone, Mail } from 'lucide-react';
import type { Lang } from '@/content/site';
import { site } from '@/content/site';
import { getDict } from '@/content/dict';
import { faqs } from '@/content/timeline';

type Msg = { id: number; role: 'bot' | 'user'; text: string; contact?: boolean };

/**
 * কীওয়ার্ড মিলিয়ে FAQ থেকে উত্তর — কোনো বাইরের API নয়, সব ব্রাউজারেই চলে।
 * আংশিক প্রশ্ন মিললেও উত্তর আসে:
 *  - প্রশ্নের শব্দ FAQ-এর প্রশ্ন/কীওয়ার্ডে আছে কি না (আংশিক মিলসহ)
 *  - FAQ-এর কীওয়ার্ড প্রশ্নের ভেতরে আছে কি না (কীওয়ার্ড-মিলের ওজন বেশি)
 */
function answer(q: string): string | null {
  const s = q.trim().toLowerCase().replace(/[?।,!.;:"'"]/g, ' ');
  if (!s) return null;
  const words = s.split(/\s+/).filter((w) => w.length > 1);
  let best: { score: number; a: string } | null = null;
  for (const f of faqs) {
    const kws = f.keywords.map((k) => k.toLowerCase());
    const hay = `${f.q} ${f.keywords.join(' ')}`.toLowerCase();
    let score = 0;
    // FAQ-এর কীওয়ার্ড প্রশ্নের ভেতরে (আংশিক হলেও) — শক্ত সংকেত
    for (const k of kws) if (k.length > 1 && s.includes(k)) score += 3;
    // প্রশ্নের শব্দ FAQ-টেক্সটে
    for (const w of words) {
      if (hay.includes(w)) { score += 1; continue; }
      // বাংলা বিভক্তি-সহ আংশিক মিল: শব্দের প্রথম অংশ (৩+ অক্ষর) দিয়ে চেষ্টা
      if (w.length > 3 && hay.includes(w.slice(0, w.length - 1))) score += 1;
      else if (w.length > 4 && hay.includes(w.slice(0, w.length - 2))) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { score, a: f.a };
  }
  // ন্যূনতম আস্থা: শুধু ১ পয়েন্টের দুর্বল মিল হলে উত্তর নয়
  return best && best.score >= 2 ? best.a : null;
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
    const found = answer(q);
    setMsgs((m) => [
      ...m,
      { id: idRef.current++, role: 'user', text: q },
      found
        ? { id: idRef.current++, role: 'bot', text: found }
        : { id: idRef.current++, role: 'bot', text: d.buddy.fallback, contact: true },
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
                {m.contact && (
                  <span className="mt-2.5 grid gap-1.5">
                    <a
                      href={`tel:${site.phoneIntl}`}
                      className="focus-ring flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-[0.82rem] font-bold text-[var(--primary)] hover:border-[var(--accent)]"
                    >
                      <Phone className="size-3.5 shrink-0" aria-hidden /> {site.phone}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="focus-ring flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-[0.82rem] font-bold text-[var(--primary)] hover:border-[var(--accent)]"
                    >
                      <Mail className="size-3.5 shrink-0" aria-hidden /> <span className="break-all">{site.email}</span>
                    </a>
                  </span>
                )}
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
