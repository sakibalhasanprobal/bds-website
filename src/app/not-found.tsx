import Link from 'next/link';
import { bn } from '@/content/dict';

export const metadata = { title: '404' };

export default function NotFound() {
  return (
    <div className="band band-oppo grid min-h-screen place-items-center p-6">
      <div className="bench-panel max-w-xl p-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] leading-snug">{bn.notFound.motion}</h1>
        <div className="hairline mx-auto mt-5 max-w-[12rem]" />
        <p className="mt-5 text-[0.95rem] leading-8 text-[var(--text-secondary)]">{bn.notFound.body}</p>
        <Link href="/bn" className="btn btn-primary focus-ring mt-7">{bn.notFound.cta}</Link>
      </div>
    </div>
  );
}
