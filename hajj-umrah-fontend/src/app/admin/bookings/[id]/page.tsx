'use client'

import { use } from 'react'
import { AdminBookingManager } from '@/features/booking/components/admin-booking-manager'

export default function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <AdminBookingManager id={id} />
}
