import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layouts/page-shell'
import { HotelDetail } from '@/features/hotels/components/hotel-detail'
import { hotels, getHotel } from '@/data/hotels'

export const dynamicParams = false

export async function generateStaticParams() {
  return hotels.map(h => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hotel = getHotel(slug)
  if (!hotel) return { title: 'Hotel not found' }
  return {
    title: `${hotel.name} | Sakinah Travels`,
    description: `${hotel.category}-star hotel in ${hotel.city}. ${hotel.distanceFromHaram}. From $${hotel.pricePerNight}/night.`,
  }
}

export default async function HotelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hotel = getHotel(slug)
  if (!hotel || hotel.status !== 'active') notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    starRating: { '@type': 'Rating', ratingValue: hotel.category },
    address: { '@type': 'PostalAddress', addressLocality: hotel.city, addressCountry: hotel.country, streetAddress: hotel.address },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: hotel.rating, reviewCount: hotel.reviewsCount },
    priceRange: `$${hotel.pricePerNight} per night`,
  }

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HotelDetail hotel={hotel} />
    </PageShell>
  )
}
