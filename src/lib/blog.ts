import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

/**
 * ব্লগ — content/blog/ ফোল্ডারের markdown ফাইল থেকে।
 * অ্যাডমিন প্যানেলের "ব্লগ" অংশ থেকে নতুন পোস্ট লিখলে এখানেই ফাইল তৈরি হয়।
 *
 * ফাইলের কাঠামো:
 *   ---
 *   title: শিরোনাম
 *   date: ২১ আগস্ট ২০২৬        (পাঠকদের যেভাবে দেখাবে)
 *   cover: /images/uploads/x.jpg  (ঐচ্ছিক)
 *   excerpt: এক লাইনের সারসংক্ষেপ
 *   published: true
 *   ---
 *   মূল লেখা markdown-এ…
 */

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  cover?: string;
  excerpt: string;
  html: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body: raw.slice(m[0].length) };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8');
      const { meta, body } = parseFrontmatter(raw);
      return {
        slug: f.replace(/\.md$/, ''),
        title: meta.title ?? f,
        date: meta.date ?? '',
        cover: meta.cover || undefined,
        excerpt: meta.excerpt ?? '',
        published: meta.published !== 'false',
        html: marked.parse(body, { async: false }) as string,
      };
    })
    .filter((p) => p.published)
    // ফাইলের নাম YYYY-MM-DD- দিয়ে শুরু হয়, তাই নাম উল্টো সাজালেই নতুনটা আগে
    .sort((a, b) => (a.slug < b.slug ? 1 : -1))
    .map(({ published: _p, ...rest }) => rest);
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
