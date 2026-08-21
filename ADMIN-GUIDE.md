# BDS অ্যাডমিন প্যানেল — সেটআপ ও ব্যবহারের নির্দেশিকা

ওয়েবসাইটের নিচে (ফুটারের "কমিউনিটি" অংশে) **"অ্যাডমিন প্যানেল"** লিংক আছে —
অথবা সরাসরি `তোমার-সাইট.netlify.app/admin/` খোলো।

লগইন করে যা যা করা যায়:

| অংশ | যা করা যায় |
|---|---|
| 📝 ব্লগ | নতুন পোস্ট লেখা, ছবিসহ, প্রকাশ/খসড়া |
| ⚙️ সাইট তথ্য | স্লোগান, ঠিকানা, ফোন, সংখ্যা, হিরোর ছবি, সংগঠনের ভাবনার উদ্ধৃতি |
| 🏆 আয়োজন | নতুন ইভেন্ট যোগ, ফলাফল/দল/বিচারক আপডেট, ছবি |
| ⚖️ অনুশীলনী বিতর্ক | নতুন সেশন যোগ (২০তম, ২১তম…) |
| 💬 মোশন ব্যাংক | নতুন মোশন যোগ |
| 🏫 ক্যাম্পাস কানেক্ট | নতুন প্রতিষ্ঠান যোগ |
| 👥 টিম | সদস্য যোগ/বাদ, ছবি বসানো |
| 🧭 টাইমলাইন · অংশীদার · FAQ | সব সম্পাদনাযোগ্য |

**সেভ চাপলে কী হয়:** পরিবর্তনটা GitHub-এ কমিট হয় → Netlify নিজে থেকে নতুন সাইট
বিল্ড করে → ১–২ মিনিটের মধ্যে লাইভ। কোনো আলাদা সার্ভার নেই, সব ফ্রি।

---

## এক-বারের সেটআপ (মোট ~১০ মিনিট)

### ধাপ ১ — GitHub-এ repo (২ মিনিট)
1. github.com/new → নাম: **bds-website** → Private → **Create repository**
2. Claude-কে repo-তে access দাও: github.com/settings/installations →
   **Claude** → Repository access → **bds-website** যোগ করো
3. তারপর Claude-কে বলো — পুরো কোড push হয়ে যাবে

### ধাপ ২ — Netlify-কে GitHub-এর সাথে যুক্ত করা (৩ মিনিট)
- **নতুন সাইট হলে:** Netlify → Add new project → Import an existing project →
  GitHub → **bds-website** → Deploy (সেটিংস নিজে থেকেই ঠিক থাকবে — netlify.toml আছে)
- **আগের drag-drop সাইট রাখতে চাইলে:** ওই সাইটে ঢুকে → Site configuration →
  Build & deploy → Link repository → GitHub → **bds-website**
  (তাহলে আগের ঠিকানাই থাকবে)

⚠ এরপর থেকে আর drag-drop কোরো না — সব আপডেট অ্যাডমিন প্যানেল বা GitHub দিয়েই হবে।

### ধাপ ৩ — অ্যাডমিন লগইন চালু করা (৫ মিনিট, একবারই)
Decap CMS-এর লগইন GitHub দিয়ে হয়। তার জন্য:
1. github.com/settings/developers → **OAuth Apps** → **New OAuth App**
   - Application name: `BDS Admin`
   - Homepage URL: `https://তোমার-সাইট.netlify.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Register → **Client ID** কপি করো → **Generate a new client secret** → সেটাও কপি
2. Netlify → তোমার সাইট → **Site configuration → Access & security →
   OAuth → Install provider** → Provider: GitHub → Client ID আর Secret বসাও → Install
3. ব্যস। এখন `তোমার-সাইট.netlify.app/admin/` → **Login with GitHub** কাজ করবে।

কে কে লগইন করতে পারবে? — যাদের GitHub অ্যাকাউন্টের **bds-website repo-তে access**
আছে। নতুন অ্যাডমিন যোগ করতে চাইলে repo → Settings → Collaborators-এ তাকে যোগ করো।

---

## রোজকার ব্যবহার

- নতুন অনুশীলনী বিতর্ক হলো? → অ্যাডমিন → ⚖️ অনুশীলনী বিতর্ক → সেশনের তালিকা →
  **Add** → পূরণ করে **Publish**। মোশনটা 💬 মোশন ব্যাংকেও যোগ করে দিও —
  শ্রেষ্ঠ বক্তার পাতা নিজে থেকেই আপডেট হবে।
- ছবি বদলাতে? → ⚙️ সাইট তথ্য → হিরো ছবি → ছবির ঘরে ক্লিক → আপলোড → Publish।
- ব্লগ লিখতে? → 📝 ব্লগ → **New ব্লগ পোস্ট** → লিখে Publish।

মিনিট দুয়েক পরে সাইট রিফ্রেশ করলেই পরিবর্তন দেখা যাবে।
(Netlify → Deploys ট্যাবে বিল্ডের অগ্রগতি দেখা যায়।)
