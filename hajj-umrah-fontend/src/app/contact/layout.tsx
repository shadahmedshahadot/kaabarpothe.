import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'যোগাযোগ করুন',
  description: '২৪/৭ হাজী সহায়তা। হজ্জ বা উমরাহ প্যাকেজ, গ্রুপ বুকিং, বা ভিসা সংক্রান্ত প্রশ্নের জন্য আমাদের আলেম টিমের সাথে কথা বলুন। ফোন: +৮৮০ ১৪০১-৬৯৬৫২৫।',
  keywords: ['কাবার পথে যোগাযোগ', 'হজ্জ এজেন্সি ঢাকা', 'উমরাহ এজেন্সি যোগাযোগ', 'Hajj agency contact'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'যোগাযোগ করুন | কাবার পথে',
    description: 'ঢাকা, ধানমন্ডি ২৭, লেভেল ৭, শপ্তক স্কয়ার। ফোন: +৮৮০ ১৪০১-৬৯৬৫২৫।',
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
