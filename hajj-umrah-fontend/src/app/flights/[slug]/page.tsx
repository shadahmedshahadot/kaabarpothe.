import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layouts/page-shell'
import { FlightDetail } from '@/features/flights/components/flight-detail'
import { flights, getFlight, flightTotal } from '@/data/flights'

export const dynamicParams = false

export async function generateStaticParams() {
  return flights.map(f => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const flight = getFlight(slug)
  if (!flight) return { title: 'ফ্লাইট পাওয়া যায়নি' }
  return {
    title: `${flight.airlineName} ${flight.flightNumber} — ${flight.departureCity} → ${flight.arrivalCity} | সাকিনাহ ট্রাভেলস`,
    description: `${flight.departureCity} থেকে ${flight.arrivalCity} পর্যন্ত ${flight.airlineName} ${flight.flightNumber} বুক করুন। ${flight.totalDuration} · ${flight.cabinClass}।`,
  }
}

export default async function FlightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const flight = getFlight(slug)
  if (!flight || flight.status !== 'active') notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Flight',
    flightNumber: flight.flightNumber,
    airline: { '@type': 'Airline', name: flight.airlineName, iataCode: flight.airlineLogo },
    departureAirport: { '@type': 'Airport', name: flight.departureAirport },
    arrivalAirport: { '@type': 'Airport', name: flight.arrivalAirport },
    departureTime: `${flight.departureDate}T${flight.departureTime}:00`,
    arrivalTime: `${flight.arrivalDate}T${flight.arrivalTime}:00`,
    offers: {
      '@type': 'Offer',
      price: flightTotal(flight),
      priceCurrency: 'USD',
      availability:
        flight.bookingStatus === 'soldout' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
  }

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FlightDetail flight={flight} />
    </PageShell>
  )
}
