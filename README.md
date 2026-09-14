# বগুড়া ডিবেটিং সোসাইটি — অফিসিয়াল ওয়েবসাইট

বগুড়া ডিবেটিং সোসাইটির (BDS) ওয়েবসাইটের সোর্স কোড।
Next.js দিয়ে বানানো, সম্পূর্ণ স্ট্যাটিক সাইট — বাংলা ও ইংরেজি দুই ভাষায়।

**লাইভ:** https://boguradebatingsociety.pages.dev
**অ্যাডমিন প্যানেল:** https://boguradebatingsociety.pages.dev/admin/

---

## কীভাবে চলে

```
অ্যাডমিন প্যানেলে সেভ  →  GitHub-এ কমিট  →  Cloudflare Pages বিল্ড  →  ১–২ মিনিটে লাইভ
```

সাইটের সব লেখা ও তথ্য `src/content/data/*.json` ফাইলে থাকে, আর নোটিশগুলো
`content/blog/*.md`-তে। অ্যাডমিন প্যানেল এই ফাইলগুলোই এডিট করে — কোড ছোঁয়ার দরকার হয় না।

কোনো ডাটাবেস নেই, সার্ভার নেই। বিল্ডের সময় সব পাতা আগেই তৈরি হয়ে যায়,
তাই সাইট দ্রুত চলে আর হোস্টিং খরচ শূন্য।

---

## হোস্টিং — Cloudflare Pages

| সেটিং | মান |
|---|---|
| প্রজেক্ট | `boguradebatingsociety` |
| বিল্ড কমান্ড | `npm run build` |
| আউটপুট ডিরেক্টরি | `out` |
| প্রোডাকশন ব্রাঞ্চ | `main` |
| Environment variable | `NODE_VERSION` = `22` |

অ্যাডমিন লগইনের জন্য আরও দুইটা variable লাগে (GitHub OAuth অ্যাপ থেকে):

| নাম | ধরন |
|---|---|
| `GITHUB_CLIENT_ID` | Text |
| `GITHUB_CLIENT_SECRET` | Secret |

`main` ব্রাঞ্চে কিছু পুশ হলেই Cloudflare নিজে নতুন বিল্ড দিয়ে সাইট আপডেট করে দেয়।

### Vercel-এ নিতে চাইলে

রিপোজিটরিতে `vercel.json` আর `api/auth.js`, `api/callback.js` রাখা আছে — Vercel-এ
ইমপোর্ট করলেই কাজ করবে, আলাদা সেটিং লাগবে না। বিস্তারিত ধাপ `VERCEL.md`-তে।

---

## ফর্ম

যোগাযোগ, সদস্য হও আর কর্মশালার অনুরোধ — তিনটা ফর্মই
[FormSubmit](https://formsubmit.co) দিয়ে চলে, জমা পড়লে মেইল যায়
`boguradebatingsociety@gmail.com`-এ। কোনো সার্ভার বা API key লাগে না।

> প্রথমবার একটা ফর্ম টেস্ট সাবমিট করে জিমেইলে FormSubmit-এর মেইল থেকে
> **Activate** চাপতে হয় — একবারই।

---

## স্থানীয়ভাবে চালানো

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # স্ট্যাটিক সাইট তৈরি হবে out/ ফোল্ডারে
```

Node 20 বা তার উপরে দরকার।

---

## ফোল্ডার কাঠামো

```
src/app/[lang]/        প্রতিটি পাতা (bn ও en দুই ভাষার জন্য একই কোড)
src/components/        হেডার, ফুটার, হিরো, FAQ বট, কার্ড ইত্যাদি
src/content/data/      সাইটের সব লেখা ও তথ্য (অ্যাডমিন প্যানেল এগুলো এডিট করে)
src/content/*.ts       ওই JSON ফাইলগুলোর টাইপ-সহ র‍্যাপার
src/lib/seo.ts         প্রতিটি পাতার টাইটেল, বিবরণ, canonical ও hreflang
content/blog/          নোটিশ ও ঘোষণার পোস্ট (markdown)
public/admin/          অ্যাডমিন প্যানেল (পাসওয়ার্ড লক + Sveltia CMS)
public/images/         সাইটে ব্যবহৃত ছবি
functions/             Cloudflare Pages ফাংশন — অ্যাডমিন লগইনের GitHub OAuth
api/                   ঐ একই কাজ Vercel-এর জন্য
```

---

## প্রযুক্তিগত নোট

- **Next.js 15** (App Router), `output: 'export'` — বিল্ডে পুরো সাইট স্ট্যাটিক HTML হয়ে যায়
- **Tailwind CSS v4**, ডার্ক মোডসহ
- **ভাষা** — `/bn` আর `/en`, দুইটাই বিল্ডের সময় তৈরি হয়; লেখা আসে `src/content/dict.ts` থেকে
- **SEO** — প্রতি পাতায় আলাদা বিবরণ, canonical, hreflang, og:image; sitemap ও robots.txt
  অটো তৈরি হয়; নোটিশে NewsArticle আর আয়োজনে Event schema বসে
- **CMS** — [Sveltia CMS](https://github.com/sveltia/sveltia-cms), Decap-এর কনফিগেই চলে।
  দরকারে `/admin/?classic` দিলে পুরনো Decap এডিটর খোলে

---

## লাইসেন্স ও কৃতজ্ঞতা

কোড ও কনটেন্ট বগুড়া ডিবেটিং সোসাইটির। ছবি ও লেখা সংগঠনের নিজস্ব।
