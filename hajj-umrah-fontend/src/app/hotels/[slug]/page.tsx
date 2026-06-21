import { notFound } from 'next/navigation'

import { PageShell } from '@/components/layouts/page-shell'
import { BreadcrumbJsonLd } from '@/components/common'
import { HotelDetail } from '@/features/hotels/components/hotel-detail'
import { adaptHotel } from '@/redux/fetchres/hotel/adapter'
import { fetchHotel } from '@/lib/seo-fetch'

export default async function HotelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dto = await fetchHotel(slug)
  if (!dto) notFound()

  const hotel = adaptHotel(dto)
  if (hotel.status !== 'active') notFound()

  const hotelLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.description,
    image: hotel.images?.length ? hotel.images : hotel.cover,
    starRating: { '@type': 'Rating', ratingValue: hotel.category, bestRating: 5 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: hotel.city,
      addressCountry: hotel.country,
      streetAddress: hotel.address,
    },
    amenityFeature: (hotel.facilities ?? []).map(f => ({
      '@type': 'LocationFeatureSpecification',
      name: f,
      value: true,
    })),
    aggregateRating:
      hotel.reviewsCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: hotel.rating,
            reviewCount: hotel.reviewsCount,
            bestRating: 5,
          }
        : undefined,
    priceRange: `$${hotel.pricePerNight}`,
    makesOffer: (hotel.roomTypes ?? []).map(r => ({
      '@type': 'Offer',
      name: r.name,
      price: r.pricePerNight,
      priceCurrency: 'USD',
      availability: r.available > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    })),
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { label: 'হোটেল', href: '/hotels' },
          { label: hotel.name },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelLd) }} />
      <HotelDetail hotel={hotel} />
    </PageShell>
  )
}
