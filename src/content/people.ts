// টিম — ডেটা data/people.json-এ (অ্যাডমিন প্যানেল থেকে এডিটযোগ্য)
import data from './data/people.json';

export type Person = {
  name: string;
  role: string;
  affiliation?: string;
  note?: string;
  photo?: string;
};

export type PersonGroup = {
  slug: string;
  title: string;
  titleEn: string;
  blurb: string;
  blurbEn: string;
  people: Person[];
};

export const personGroups = data.groups as PersonGroup[];
export const guestSpeakers = data.guests as Person[];
