import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layouts/page-shell'
import { FlightBooking } from '@/features/flights/components/flight-booking'
import { flights, getFlight } from '@/data/flights'

export const dynamicParams = false

export async function generateStaticParams() {
  return flights.filter(f => f.status === 'active' && f.bookingStatus !== 'soldout').map(f => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const flight = getFlight(slug)
  return {
    title: flight ? `${flight.airlineName} ${flight.flightNumber} বুক করুন | সাকিনাহ ট্রাভেলস` : 'ফ্লাইট বুক করুন',
    robots: { index: false, follow: false },
  }
}

export default async function BookFlightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const flight = getFlight(slug)
  if (!flight || flight.status !== 'active' || flight.bookingStatus === 'soldout') notFound()
  return (
    <PageShell>
      <FlightBooking flight={flight} />
    </PageShell>
  )
}
