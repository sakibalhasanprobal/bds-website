import type { Lang } from '@/content/site';

const BN = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/** ইংরেজি সংখ্যাকে বাংলা অঙ্কে বদলায় — বাংলা পাতায় ০১, ১৯, ২৫ দেখাবে */
export function toBn(value: number | string): string {
  return String(value).replace(/[0-9]/g, (dg) => BN[Number(dg)]);
}

/** ভাষা অনুযায়ী সংখ্যা */
export function num(value: number | string, lang: Lang): string {
  return lang === 'bn' ? toBn(value) : String(value);
}

/** দুই অঙ্কের ক্রমিক সংখ্যা: 1 → ০১ / 01 */
export function pad2(value: number, lang: Lang): string {
  return num(String(value).padStart(2, '0'), lang);
}
