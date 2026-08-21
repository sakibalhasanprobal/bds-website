import fs from 'node:fs';
import path from 'node:path';

/**
 * বিল্ড করার সময় দেখে নেয় ছবিটা সত্যিই /public-এ আছে কিনা।
 * না থাকলে component একটা সুন্দর placeholder দেখায় — ভাঙা image icon নয়।
 * ছবি যোগ করার পর শুধু আবার build দিলেই হবে।
 */
export function hasImage(publicPath: string): boolean {
  try {
    const clean = publicPath.split('?')[0];
    return fs.existsSync(path.join(process.cwd(), 'public', clean.replace(/^\//, '')));
  } catch {
    return false;
  }
}
