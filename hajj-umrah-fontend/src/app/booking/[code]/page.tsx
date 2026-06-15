import type { Metadata } from 'next'
import { PageShell } from '@/components/layouts/page-shell'
import { BookingConfirmation } from '@/features/booking/components/booking-confirmation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'বুকিং নিশ্চিতকরণ | সাকিনাহ ট্রাভেলস',
  robots: { index: false, follow: false },
}

export default async function BookingConfirmationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  return (
    <PageShell>
      <BookingConfirmation code={code} />
    </PageShell>
  )
}
