import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import MotionProvider from '@/components/MotionProvider';
import { site, seo } from '@/data/site';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: site.url,
    type: 'website',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hirush Automation engineering solutions for PLC programming and electrical control design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.twitterTitle,
    description: seo.twitterDescription,
    images: ['/assets/images/og-image.png'],
  },
  icons: {
    icon: [{ url: site.logo, type: 'image/png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: site.name,
              url: site.url,
              logo: `${site.url}${site.logo}`,
              description: seo.ogDescription,
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-white text-[#333333] font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
