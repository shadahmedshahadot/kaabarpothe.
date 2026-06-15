import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'যোগাযোগ করুন | সাকিনাহ ট্রাভেলস',
  description: '২৪/৭ হাজী সহায়তা। হজ্জ বা উমরাহ প্যাকেজ, গ্রুপ বুকিং, বা ভিসা সংক্রান্ত প্রশ্নের জন্য আমাদের আলেম টিমের সাথে কথা বলুন।',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
