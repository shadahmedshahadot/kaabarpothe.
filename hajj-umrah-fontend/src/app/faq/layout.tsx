import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'প্রশ্নোত্তর',
  description: 'হজ্জ ও উমরাহ প্যাকেজ বুকিং, ভিসা, পেমেন্ট এবং যাত্রা সম্পর্কিত সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ।',
  keywords: ['হজ্জ FAQ', 'উমরাহ প্রশ্ন', 'হজ্জ ভিসা প্রশ্ন', 'উমরাহ পেমেন্ট'],
  alternates: { canonical: '/faq' },
  openGraph: { title: 'প্রশ্নোত্তর | কাবার পথে', description: 'হজ্জ ও উমরাহ সংক্রান্ত সকল প্রশ্নের উত্তর।', url: '/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
