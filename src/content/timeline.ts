// টাইমলাইন, অংশীদার ও FAQ — ডেটা data/misc.json-এ (অ্যাডমিন প্যানেল থেকে এডিটযোগ্য)
import data from './data/misc.json';

export type TimelineItem = {
  date: string;
  dateEn: string;
  kicker: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  href?: string;
  star?: boolean;
};

export type Partner = {
  name: string;
  relation: string;
  relationEn: string;
  kind: 'org' | 'institution' | 'sponsor' | 'authority';
};

export const timeline = data.timeline as TimelineItem[];
export const partners = data.partners as Partner[];
export const faqs = data.faqs as { q: string; keywords: string[]; a: string }[];
