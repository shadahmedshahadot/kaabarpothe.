import type { Metadata } from 'next'
import { PageShell } from '@/components/layouts/page-shell'
import { BookingSuccess } from '@/features/booking/components/booking-success'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'বুকিং অনুরোধ গৃহীত | সাকিনাহ ট্রাভেলস',
  robots: { index: false, follow: false },
}

export default async function BookingSuccessPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  return (
    <PageShell>
      <BookingSuccess code={code} />
    </PageShell>
  )
}
