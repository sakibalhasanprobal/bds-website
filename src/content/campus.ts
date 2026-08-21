// ক্যাম্পাস কানেক্ট — ডেটা data/campus.json-এ (অ্যাডমিন প্যানেল থেকে এডিটযোগ্য)
import data from './data/campus.json';

export type CampusStop = {
  date: string;
  institution: string;
  area: string;
  attendance?: string;
  note: string;
  highlight?: boolean;
};

export const campusStops = data.stops as CampusStop[];
export const workshopCurriculum = data.curriculum as { bn: string; en: string }[];
export const campusAreas = ['বগুড়া শহর', 'দুপচাঁচিয়া', 'গাবতলী', 'শিবগঞ্জ / মহাস্থান'];
