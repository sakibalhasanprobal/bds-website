// অনুশীলনী বিতর্ক আর্কাইভ — ডেটা data/practice.json-এ (অ্যাডমিন প্যানেল থেকে এডিটযোগ্য)
import data from './data/practice.json';
import type { MotionFormat } from './motions';

export type PracticeDebate = {
  no: number;
  noBn: string;
  format: MotionFormat;
  motionId?: string;
  motion: string;
  winner: string;
  bestSpeaker: string;
  adjudicator: string;
  missing?: boolean;
};

export const practiceDebates = data.sessions as PracticeDebate[];
export const activeDebaters = data.activeDebaters as string[];

/** প্রতি সেশনের শ্রেষ্ঠ বক্তা — নিজে থেকেই তৈরি হয় */
export const bestSpeakers = practiceDebates
  .filter((d) => !d.missing && d.bestSpeaker !== '—')
  .map((d) => ({ name: d.bestSpeaker, session: d.noBn, motion: d.motion, format: d.format }));
