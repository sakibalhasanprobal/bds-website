import Link from 'next/link';

/**
 * রুট `/` — Netlify-তে `_redirects` ফাইলই আসল কাজটা করে (/ → /bn/)।
 * এই পাতাটি fallback: JavaScript ছাড়া বা অন্য কোনো হোস্টে-ও ভাষা বেছে নেওয়া যাবে।
 */
export const metadata = {
  title: 'Bogura Debating Society',
  robots: { index: false },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/bn/" />
      <div className="band band-chamber grid min-h-screen place-items-center p-6">
        <div className="bench-panel max-w-md p-10 text-center">
          <h1 className="text-[1.6rem]">বগুড়া ডিবেটিং সোসাইটি</h1>
          <p className="mt-2 font-en-display text-[1.1rem] text-[var(--muted-foreground)]">Bogura Debating Society</p>
          <div className="hairline mx-auto mt-5 max-w-[10rem]" />
          <p className="mt-5 text-[0.9rem] text-[var(--text-secondary)]">ভাষা বেছে নাও · Choose a language</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/bn" className="btn btn-primary focus-ring">বাংলা</Link>
            <Link href="/en" className="btn btn-ghost focus-ring">English</Link>
          </div>
        </div>
      </div>
    </>
  );
}
