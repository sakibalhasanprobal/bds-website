// মোশন ব্যাংক — ডেটা data/motions.json-এ (অ্যাডমিন প্যানেল থেকে এডিটযোগ্য)
import data from './data/motions.json';

export type MotionFormat = 'সনাতনী' | 'সংসদীয়' | 'বারোয়ারি' | 'একক বক্তৃতা';
export type MotionTopic =
  | 'শিক্ষা' | 'রাজনীতি' | 'প্রযুক্তি' | 'সমাজ'
  | 'সংস্কৃতি' | 'পরিবেশ' | 'ক্রীড়া' | 'অর্থনীতি' | 'গণমাধ্যম';

export type Motion = {
  id: string;
  text: string;
  textEn?: string;
  format: MotionFormat;
  topic: MotionTopic;
  usedIn: string;
  usedInEn: string;
  date?: string;
};

export const formatTagClass: Record<MotionFormat, string> = {
  'সনাতনী': 'tag-shonatoni',
  'সংসদীয়': 'tag-shongshodio',
  'বারোয়ারি': 'tag-baroari',
  'একক বক্তৃতা': 'tag-shol',
};

export const motions = data.motions as Motion[];

export const motionTopics: MotionTopic[] = [
  'শিক্ষা', 'সমাজ', 'প্রযুক্তি', 'সংস্কৃতি', 'পরিবেশ', 'ক্রীড়া', 'অর্থনীতি', 'রাজনীতি', 'গণমাধ্যম',
];
export const motionFormats: MotionFormat[] = ['সনাতনী', 'সংসদীয়', 'বারোয়ারি', 'একক বক্তৃতা'];

const tickerIds = ['pd-16', 'pd-17', 'pd-11', 'pd-10', 'tk-26', 'tt-final', 'pd-19', 'pd-04'];
export const tickerMotions = tickerIds
  .map((id) => motions.find((m) => m.id === id))
  .filter((m): m is Motion => Boolean(m));
