import type { Metadata, Viewport } from 'next'
import { SITE } from './site'

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'প্রিমিয়াম হজ্জ ও উমরাহ প্যাকেজ। বিশ্বব্যাপী ৫০,০০০+ হাজী দ্বারা বিশ্বস্ত।',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'প্রিমিয়াম হজ্জ ও উমরাহ প্যাকেজ। আলেম পরিচালিত, সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত।',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const rootViewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fef9f3' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1625' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
