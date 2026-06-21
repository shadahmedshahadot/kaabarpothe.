import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { BreadcrumbJsonLd } from '@/components/common'

export const metadata: Metadata = {
  title: 'রিভিউ ও প্রশংসাপত্র',
  description: 'যাচাইকৃত হজ্জ ও উমরাহ হাজীদের কাছ থেকে আসল রিভিউ পড়ুন। ১২,০০০+ রিভিউ। ৪.৯ গড় রেটিং।',
  keywords: ['কাবার পথে রিভিউ', 'হজ্জ এজেন্সি রিভিউ', 'উমরাহ রিভিউ', 'হাজী মতামত'],
  alternates: { canonical: '/reviews' },
  openGraph: { title: 'রিভিউ ও প্রশংসাপত্র | কাবার পথে', description: '১২,০০০+ যাচাইকৃত হাজী রিভিউ।', url: '/reviews' },
}

const aggregateRatingLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${SITE.name} — হজ্জ ও উমরাহ সেবা`,
  description: SITE.description,
  brand: { '@type': 'Brand', name: SITE.name },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 12420,
    bestRating: 5,
    worstRating: 1,
  },
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'রিভিউ' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }} />
      {children}
    </>
  )
}
