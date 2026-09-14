import type { Metadata } from 'next';
import { site, LANGS, type Lang } from '@/content/site';

/**
 * SEO — প্রতিটি পাতার নিজস্ব টাইটেল, বিবরণ, canonical আর hreflang এক জায়গা থেকে।
 * নতুন পাতা যোগ করলে নিচের PAGE_SEO-তে এক লাইন যোগ করলেই হবে।
 */

export const OG_IMAGE = '/brand/og.png';

type Entry = {
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
};

export const PAGE_SEO: Record<string, Entry> = {
  '': {
    titleBn: 'বগুড়া ডিবেটিং সোসাইটি',
    titleEn: 'Bogura Debating Society',
    descBn:
      'বগুড়া জেলার প্রথম পেশাদার ও একমাত্র জেলাভিত্তিক কেন্দ্রীয় বিতর্ক সংগঠন। সাপ্তাহিক অনুশীলনী বিতর্ক, বিনামূল্যে কর্মশালা আর জেলাজুড়ে ক্যাম্পাস কানেক্ট।',
    descEn:
      "Bogura district's first professional and only district-wide central debating organisation — weekly practice debates, free workshops and Campus Connect across the district.",
  },
  '/about': {
    titleBn: 'আমাদের সম্পর্কে · About',
    titleEn: 'About BDS',
    descBn:
      '২০২৫ সালে যাত্রা শুরু করা বগুড়া ডিবেটিং সোসাইটির লক্ষ্য, কাজের ধরন ও এ পর্যন্ত পথচলার গল্প এক জায়গায়।',
    descEn:
      'The story of Bogura Debating Society since 2025 — our purpose, how we work and what we have built so far.',
  },
  '/practice-debates': {
    titleBn: 'অনুশীলনী বিতর্ক · Practice Debates',
    titleEn: 'Practice Debates',
    descBn:
      'BDS-এর সাপ্তাহিক অনুশীলনী বিতর্কের পূর্ণ আর্কাইভ — প্রতিটি সেশনের বিষয়, বিজয়ী পক্ষ, শ্রেষ্ঠ বক্তা ও বিচারকের রেকর্ড।',
    descEn:
      'The full archive of weekly BDS practice debates — motions, winning sides, best speakers and adjudicators from every session.',
  },
  '/motions': {
    titleBn: 'মোশন ব্যাংক · Motion Bank',
    titleEn: 'Motion Bank',
    descBn:
      'BDS-এর আয়োজনে ব্যবহৃত বিতর্কের বিষয়ের সংগ্রহ — ধরন ও টপিক অনুযায়ী খুঁজে নেওয়ার সুবিধাসহ, বিতার্কিক ও ক্লাবের জন্য উন্মুক্ত।',
    descEn:
      'A searchable bank of motions used at BDS events, organised by format and topic — free for debaters and clubs to use.',
  },
  '/campus-connect': {
    titleBn: 'ক্যাম্পাস কানেক্ট · Campus Connect',
    titleEn: 'Campus Connect',
    descBn:
      'বগুড়া শহর থেকে দুপচাঁচিয়া, গাবতলী ও শিবগঞ্জ — যেসব শিক্ষাপ্রতিষ্ঠানে BDS বিনামূল্যে বিতর্ক কর্মশালা করেছে তার পূর্ণ রেকর্ড।',
    descEn:
      'Every institution where BDS has run a free debate workshop — from Bogura city to Dupchanchia, Gabtali and Shibganj.',
  },
  '/events': {
    titleBn: 'আয়োজন · Events',
    titleEn: 'Events',
    descBn:
      'বগুড়া ডিবেটিং সোসাইটির প্রতিযোগিতা, কর্মশালা ও বিশেষ আয়োজনের তালিকা — বিষয়, ফলাফল ও বিচারকমণ্ডলীসহ।',
    descEn:
      'Tournaments, workshops and special events organised by Bogura Debating Society, with motions, results and adjudicators.',
  },
  '/best-speakers': {
    titleBn: 'শ্রেষ্ঠ বক্তারা · Best Speakers',
    titleEn: 'Best Speakers',
    descBn:
      'প্রতিটি অনুশীলনী সেশনের শ্রেষ্ঠ বক্তার সংকলিত রেকর্ড — কারা নিয়মিত মঞ্চ মাতাচ্ছেন, এক নজরে।',
    descEn:
      'The best speaker from every BDS practice session, compiled in one record.',
  },
  '/team': {
    titleBn: 'টিম · Team',
    titleEn: 'Team',
    descBn:
      'বগুড়া ডিবেটিং সোসাইটির কার্যনির্বাহী কমিটি, প্রতিষ্ঠাতা কমিটি, শিক্ষার্থী উপদেষ্টা, মেন্টর ও সক্রিয় বিতার্কিকদের তালিকা।',
    descEn:
      'The executive committee, founding committee, student advisors, mentors and active debaters of Bogura Debating Society.',
  },
  '/blog': {
    titleBn: 'নোটিশ ও ঘোষণা · Notices',
    titleEn: 'Notice & Announcements',
    descBn:
      'BDS-এর অফিসিয়াল নোটিশ, ঘোষণা আর খবর — কমিটি ঘোষণা থেকে আয়োজনের আপডেট, সব এক জায়গায়।',
    descEn:
      'Official notices, announcements and news from Bogura Debating Society — all in one place.',
  },
  '/join': {
    titleBn: 'সদস্য হও · Join BDS',
    titleEn: 'Join BDS',
    descBn:
      'বগুড়া ডিবেটিং সোসাইটির সদস্য হতে চাও? ফর্মটি পূরণ করো — বিতর্কের অভিজ্ঞতা না থাকলেও সমস্যা নেই, শেখানো আমাদের কাজ।',
    descEn:
      'Want to join Bogura Debating Society? Fill in the form — no prior debating experience needed, we teach from scratch.',
  },
  '/partners': {
    titleBn: 'অংশীদার · Partners',
    titleEn: 'Partners',
    descBn:
      'যেসব প্রতিষ্ঠান, ক্লাব ও সংগঠনের সঙ্গে কাঁধ মিলিয়ে বগুড়া ডিবেটিং সোসাইটি কাজ করে।',
    descEn:
      'The institutions, clubs and organisations Bogura Debating Society works alongside.',
  },
  '/contact': {
    titleBn: 'যোগাযোগ · Contact',
    titleEn: 'Contact',
    descBn:
      'বগুড়া ডিবেটিং সোসাইটির ঠিকানা, ফোন, ইমেইল ও Facebook — কর্মশালা, অংশীদারিত্ব বা যেকোনো প্রশ্নে সরাসরি যোগাযোগ করো।',
    descEn:
      'Address, phone, email and Facebook for Bogura Debating Society — reach us about workshops, partnerships or anything else.',
  },
  '/thanks': {
    titleBn: 'ধন্যবাদ · Thank you',
    titleEn: 'Thank you',
    descBn: 'তোমার বার্তা আমাদের কাছে পৌঁছেছে। BDS টিম শীঘ্রই যোগাযোগ করবে।',
    descEn: 'Your message has reached us. The BDS team will get back to you soon.',
  },
};

function normalise(rawLang: string): Lang {
  return (LANGS.includes(rawLang as Lang) ? rawLang : 'bn') as Lang;
}

export function urlFor(lang: Lang, path: string) {
  return `${site.domain}/${lang}${path}/`;
}

/** একটি রুটের সম্পূর্ণ SEO মেটাডেটা — canonical, hreflang, OG ও Twitter কার্ডসহ */
export function pageMeta(rawLang: string, path: string, extra?: Partial<Metadata>): Metadata {
  const lang = normalise(rawLang);
  const bn = lang === 'bn';
  const e = PAGE_SEO[path];
  const title = e ? (bn ? e.titleBn : e.titleEn) : site.nameEn;
  const description = e ? (bn ? e.descBn : e.descEn) : bn ? site.identityBn : site.identityEn;
  return docMeta(lang, path, title, description, extra);
}

/** ব্লগ পোস্ট ও ইভেন্টের মতো ডায়নামিক পাতার জন্য */
export function docMeta(
  rawLang: string,
  path: string,
  title: string,
  description: string,
  extra?: Partial<Metadata>,
): Metadata {
  const lang = normalise(rawLang);
  const url = urlFor(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        bn: urlFor('bn', path),
        en: urlFor('en', path),
        'x-default': urlFor('bn', path),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: site.nameEn,
      title,
      description,
      locale: lang === 'bn' ? 'bn_BD' : 'en_US',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.nameEn }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
    ...extra,
  };
}
