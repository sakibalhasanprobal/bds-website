// বড় আয়োজন — ডেটা data/events.json-এ (অ্যাডমিন প্যানেল থেকে এডিটযোগ্য)
import data from './data/events.json';

export type EventRow = { label: string; value: string };

export type BdsEvent = {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  dateEn: string;
  sortKey: string;
  kicker: string;
  kickerEn: string;
  tag: string;
  tagLabel: string;
  summary: string;
  summaryEn: string;
  image?: string;
  featured?: boolean;
  details: EventRow[];
  motions?: { label: string; text: string }[];
  results?: EventRow[];
  teams?: { institution: string; speakers: string[] }[];
  adjudicators?: string[];
};

export const events = data.events as BdsEvent[];
export const featuredEvents = events.filter((e) => e.featured);
