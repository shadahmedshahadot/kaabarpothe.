import type { Metadata } from 'next'
import { PageShell } from '@/components/layouts/page-shell'
import { BookingWizard } from '@/features/booking/components/booking-wizard'

export const metadata: Metadata = {
  title: 'আপনার বুকিং সম্পন্ন করুন',
  description: 'হজ্জ/উমরাহ প্যাকেজ, ফ্লাইট, হোটেল এবং পরিবহনের জন্য কেন্দ্রীয় বুকিং প্রক্রিয়া।',
  robots: { index: false, follow: false },
  alternates: { canonical: '/booking' },
}

export default function BookingPage() {
  return (
    <PageShell>
      <BookingWizard />
    </PageShell>
  )
}
