'use client'

import { use } from 'react'
import { BookingTracker } from '@/features/booking/components/booking-tracker'

export default function PilgrimBookingDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params)
  return <BookingTracker code={code} />
}
