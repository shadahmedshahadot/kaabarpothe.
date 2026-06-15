import type { Metadata } from 'next'
import { PageShell } from '@/components/layouts/page-shell'
import { BookingWizard } from '@/features/booking/components/booking-wizard'

export const metadata: Metadata = {
  title: 'Complete your booking | Sakinah Travels',
  description: 'Centralized booking flow for Hajj/Umrah packages, flights, hotels, and transportation.',
  robots: { index: false, follow: false },
}

export default function BookingPage() {
  return (
    <PageShell>
      <BookingWizard />
    </PageShell>
  )
}
