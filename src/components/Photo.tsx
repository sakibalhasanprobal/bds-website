import { ImageIcon } from 'lucide-react';
import { hasImage } from '@/lib/img';

/**
 * ছবি দেখানোর কম্পোনেন্ট — দুইভাবে কাজ করে:
 *
 *  ১) বিল্ড করার সময় ছবিটা /public-এ থাকলে → সাধারণ <img> (lazy loading, alt — সবই ঠিক)
 *  ২) বিল্ডের সময় না থাকলে → দুই স্তরের div:
 *        নিচের স্তরে placeholder, উপরের স্তরে background-image
 *     ফাইলটা পরে যোগ করলে উপরের স্তর নিজে থেকেই ছবিটা দেখাবে এবং
 *     placeholder ঢেকে দেবে — **আবার build করার দরকার নেই**।
 *     ফাইল না থাকলে উপরের স্তর ফাঁকা থাকে, ভাঙা ছবির আইকনও আসে না।
 */
export default function Photo({
  src,
  alt,
  label,
  className = '',
  imgClassName = '',
  showPath = true,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
  showPath?: boolean;
}) {
  if (hasImage(src)) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={src} alt={alt} className={`${className} ${imgClassName}`} loading="lazy" />
    );
  }

  return (
    <div className={`relative isolate ${className}`} role="img" aria-label={alt}>
      {/* নিচের স্তর — ছবি না থাকলে এটাই দেখা যায় */}
      <div className="absolute inset-0 z-0 grid place-items-center bg-[linear-gradient(135deg,rgba(30,58,138,0.16),rgba(201,162,39,0.18))] p-4 text-center">
        <div>
          <ImageIcon className="mx-auto size-7 text-[var(--primary)] opacity-70" aria-hidden />
          <p className="mt-2 text-[0.75rem] font-bold leading-tight text-[var(--primary)]">{label}</p>
          {showPath && (
            <p className="mt-1 font-en-ui text-[0.6rem] leading-tight text-[var(--muted-foreground)] opacity-70">{src}</p>
          )}
        </div>
      </div>

      {/* উপরের স্তর — ফাইলটা থাকলে ছবি, না থাকলে স্বচ্ছ */}
      <div
        className={`absolute inset-0 z-10 bg-cover bg-center bg-no-repeat ${imgClassName}`}
        style={{ backgroundImage: `url('${src}')` }}
      />
    </div>
  );
}
