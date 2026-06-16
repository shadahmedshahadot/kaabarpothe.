'use client'

import { use, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { PageShell } from '@/components/layouts/page-shell'
import { FlightBooking } from '@/features/flights/components/flight-booking'
import { useGetFlightQuery } from '@/redux/fetchres/flight/flightApi'
import { adaptFlight } from '@/redux/fetchres/flight/adapter'

export default function FlightBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const { data, isLoading, isError, error } = useGetFlightQuery(slug)

  const flight = useMemo(() => (data?.data ? adaptFlight(data.data) : null), [data])

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex justify-center py-40">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </PageShell>
    )
  }

  const status = (error as { status?: number })?.status
  if (isError && status === 404) notFound()

  if (isError || !flight) notFound()
  if (flight.status !== 'active' || flight.bookingStatus === 'soldout') notFound()

  return (
    <PageShell>
      <FlightBooking flight={flight} />
    </PageShell>
  )
}
