import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'রিভিউ ও প্রশংসাপত্র',
  description: 'যাচাইকৃত হজ্জ ও উমরাহ হাজীদের কাছ থেকে আসল রিভিউ পড়ুন। ১২,০০০+ রিভিউ। ৪.৯ গড় রেটিং।',
  keywords: ['কাবার পথে রিভিউ', 'হজ্জ এজেন্সি রিভিউ', 'উমরাহ রিভিউ', 'হাজী মতামত'],
  alternates: { canonical: '/reviews' },
  openGraph: { title: 'রিভিউ ও প্রশংসাপত্র | কাবার পথে', description: '১২,০০০+ যাচাইকৃত হাজী রিভিউ।', url: '/reviews' },
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
