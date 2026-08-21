// ═══════════════════════════════════════════════════════════════
//  সাইটের মূল তথ্য — সব ডেটা এখন data/site.json থেকে আসে।
//  ⚙ অ্যাডমিন প্যানেল (/admin) ওই JSON ফাইলটাই এডিট করে।
// ═══════════════════════════════════════════════════════════════
import data from './data/site.json';

export type Lang = 'bn' | 'en';
export const LANGS: Lang[] = ['bn', 'en'];

export const site = data.site;
export const purpose = data.purpose;
export const activities = data.activities;
export const heroStats = data.heroStats;
export const impactStats = data.impactStats;
export const memberBenefits = data.memberBenefits;
export const formats = data.formats;
export const heroImages = data.hero;
export const vision = data.vision;
