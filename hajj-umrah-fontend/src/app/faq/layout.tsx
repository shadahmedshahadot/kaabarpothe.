import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'প্রশ্নোত্তর | সাকিনাহ ট্রাভেলস',
  description: 'হজ্জ ও উমরাহ প্যাকেজ বুকিং, ভিসা, পেমেন্ট এবং যাত্রা সম্পর্কিত সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ।',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
