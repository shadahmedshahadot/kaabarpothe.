import { notFound } from 'next/navigation'

import { PageShell } from '@/components/layouts/page-shell'
import { BreadcrumbJsonLd } from '@/components/common'
import { FlightDetail } from '@/features/flights/components/flight-detail'
import { adaptFlight } from '@/redux/fetchres/flight/adapter'
import { fetchFlight } from '@/lib/seo-fetch'

export default async function FlightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dto = await fetchFlight(slug)
  if (!dto) notFound()

  const flight = adaptFlight(dto)

  const flightLd = {
    '@context': 'https://schema.org',
    '@type': 'Flight',
    flightNumber: flight.flightNumber,
    airline: { '@type': 'Airline', name: flight.airlineName, iataCode: flight.airlineName },
    departureAirport: {
      '@type': 'Airport',
      name: flight.departureAirport,
      iataCode: flight.departureAirport,
      address: { '@type': 'PostalAddress', addressLocality: flight.departureCity },
    },
    arrivalAirport: {
      '@type': 'Airport',
      name: flight.arrivalAirport,
      iataCode: flight.arrivalAirport,
      address: { '@type': 'PostalAddress', addressLocality: flight.arrivalCity },
    },
    departureTime: `${flight.departureDate}T${flight.departureTime}`,
    arrivalTime: `${flight.arrivalDate}T${flight.arrivalTime}`,
    estimatedFlightDuration: flight.totalDuration,
    offers: {
      '@type': 'Offer',
      price: flight.price,
      priceCurrency: 'USD',
      availability:
        flight.bookingStatus === 'soldout'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
    },
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { label: 'ফ্লাইট', href: '/flights' },
          { label: `${flight.airlineName} ${flight.flightNumber}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(flightLd) }} />
      <FlightDetail flight={flight} />
    </PageShell>
  )
}
