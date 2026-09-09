# Vercel-এ সাইট চালু করার নিয়ম

এই রিপোজিটরি এখন **Vercel-রেডি**। আলাদা কোনো সেটিং লাগবে না — `vercel.json`-এ
বিল্ড কমান্ড, আউটপুট ফোল্ডার, রিডাইরেক্ট আর অ্যাডমিন লগইনের রুট সব বলা আছে।

---

## ধাপ ১ — Vercel-এর সাথে GitHub কানেক্ট করো

Vercel → **Settings → Authentication** → **GitHub**-এর পাশে **Connect** →
GitHub-এ **Authorize Vercel**।

(এটা একবারই করতে হয়। এটা ছাড়া Vercel রিপোজিটরি পড়তে পারে না।)

## ধাপ ২ — প্রজেক্ট ইমপোর্ট করো

Vercel → **Add New → Project** → **Import Git Repository** →
`sakibalhasanprobal/bds-website` বেছে নাও।

- **Project Name:** `boguradebatingsociety`
- **Framework Preset / Build settings:** কিছুই বদলাতে হবে না,
  `vercel.json` নিজেই ঠিক করে নেবে (`npm run build`, আউটপুট `out`)।

**Deploy** চাপো। ২–৩ মিনিটে সাইট লাইভ:
`https://boguradebatingsociety.vercel.app`

> এরপর থেকে অ্যাডমিন প্যানেলে সেভ চাপলেই GitHub-এ কমিট হবে আর
> Vercel নিজে নতুন বিল্ড দিয়ে সাইট আপডেট করে দেবে — এখন Cloudflare যেভাবে করে।

---

## ধাপ ৩ — অ্যাডমিন প্যানেলের লগইন

**এখনই কিছু করতে হবে না।** অ্যাডমিন প্যানেলের GitHub লগইন আপাতত
Cloudflare-এর ঠিকানা দিয়ে চলবে, Vercel-এর সাইট থেকেও কাজ করবে।

পুরোপুরি Cloudflare বাদ দিতে চাইলে নিচের তিনটা কাজ করতে হবে (একবারই):

1. **GitHub OAuth অ্যাপে callback বদলাও**
   github.com → Settings → Developer settings → OAuth Apps → *BDS Admin (Cloudflare)* →
   **Authorization callback URL** →
   `https://boguradebatingsociety.vercel.app/callback`

2. **Vercel-এ দুইটা Environment Variable দাও**
   Project → Settings → Environment Variables:

   | Name | Value | ধরন |
   |---|---|---|
   | `GITHUB_CLIENT_ID` | `Ov23lixroIoUOk3EZ9mW` | Plain |
   | `GITHUB_CLIENT_SECRET` | GitHub OAuth অ্যাপের সিক্রেট | Sensitive |

3. **`public/admin/config.yml`-এ এক লাইন বদলাও**

   ```yaml
   base_url: https://boguradebatingsociety.vercel.app
   ```

   (এখন আছে `https://boguradebatingsociety.pages.dev`)

তিনটা হয়ে গেলে Cloudflare-এর প্রজেক্ট মুছে দিলেও সাইট ও অ্যাডমিন দুটোই চলবে।

---

## কোথায় কী আছে

| ফাইল | কাজ |
|---|---|
| `vercel.json` | Vercel-এর বিল্ড সেটিং, `/` → `/bn/` রিডাইরেক্ট, `/auth` ও `/callback` রুট |
| `api/auth.js` | অ্যাডমিন লগইন ধাপ ১ (GitHub-এ পাঠায়) — Vercel ফাংশন |
| `api/callback.js` | অ্যাডমিন লগইন ধাপ ২ (টোকেন এনে CMS-কে দেয়) — Vercel ফাংশন |
| `functions/auth.js`, `functions/callback.js` | ঐ একই কাজ, Cloudflare-এর জন্য (রেখে দেওয়া হয়েছে) |
| `public/admin/` | অ্যাডমিন প্যানেল (পাসওয়ার্ড লক + Sveltia CMS) |
| `src/content/data/*.json` | সাইটের সব লেখা ও তথ্য — অ্যাডমিন প্যানেল এগুলোই এডিট করে |

## কাস্টম ডোমেইন লাগালে

Vercel → Project → Settings → Domains → ডোমেইন যোগ করো।
ফর্মগুলো নিজে থেকেই নতুন ডোমেইনের "ধন্যবাদ" পাতায় ফিরবে, আলাদা কিছু বদলাতে হবে না।
শুধু অ্যাডমিন লগইন যদি Vercel-এ সরিয়ে থাকো, তাহলে GitHub OAuth অ্যাপের
callback URL-ও নতুন ডোমেইনে বদলে নিও।
