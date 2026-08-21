import type { Metadata, Viewport } from 'next';
import { site } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.nameBn} | ${site.nameEn}`,
    template: `%s | ${site.short}`,
  },
  description:
    'বগুড়া জেলার প্রথম পেশাদার ও একমাত্র জেলাভিত্তিক কেন্দ্রীয় বিতর্ক সংগঠন। নিয়মিত অনুশীলনী বিতর্ক, কর্মশালা ও প্রতিযোগিতা।',
  applicationName: site.nameEn,
  keywords: ['বিতর্ক', 'বগুড়া', 'debate', 'Bogura', 'Bogura Debating Society', 'BDS', 'motion bank', 'বিতর্ক কর্মশালা'],
  openGraph: {
    type: 'website',
    siteName: site.nameEn,
    title: `${site.nameBn} — ${site.sloganBn}`,
    description: site.identityBn,
    locale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.nameEn,
    description: site.identityEn,
  },
  icons: { icon: '/brand/mark.png', apple: '/brand/mark.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f4' },
    { media: '(prefers-color-scheme: dark)', color: '#080c16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/** থিম flash (FOUC) ঠেকাতে render-এর আগেই ক্লাস বসিয়ে দেয় */
const themeScript = `
(function(){
  try{
    var t = localStorage.getItem('bds-theme');
    if(!t){ t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
    if(t === 'dark'){ document.documentElement.classList.add('dark'); }
  }catch(e){}
})();
`;

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.nameEn,
  alternateName: site.nameBn,
  url: site.domain,
  email: site.email,
  telephone: site.phoneIntl,
  foundingDate: site.foundedISO,
  slogan: site.sloganEn,
  description: site.identityEn,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Romena Afaz Road',
    addressLocality: 'Bogura',
    postalCode: '5800',
    addressCountry: 'BD',
  },
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&family=Hind+Siliguri:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800;900&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
