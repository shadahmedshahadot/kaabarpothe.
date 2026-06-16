'use client'

import { use, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { PageShell } from '@/components/layouts/page-shell'
import { HotelDetail } from '@/features/hotels/components/hotel-detail'
import { useGetHotelQuery } from '@/redux/fetchres/hotel/hotelApi'
import { adaptHotel } from '@/redux/fetchres/hotel/adapter'

export default function HotelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const { data, isLoading, isError, error } = useGetHotelQuery(slug)

  const hotel = useMemo(() => (data?.data ? adaptHotel(data.data) : null), [data])

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

  if (isError) {
    return (
      <PageShell>
        <div className="text-center py-40 text-rose-500">
          হোটেল লোড করতে ব্যর্থ হয়েছে। সার্ভার চালু আছে কি?
        </div>
      </PageShell>
    )
  }

  if (!hotel || hotel.status !== 'active') notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    starRating: { '@type': 'Rating', ratingValue: hotel.category },
    address: {
      '@type': 'PostalAddress',
      addressLocality: hotel.city,
      addressCountry: hotel.country,
      streetAddress: hotel.address,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hotel.rating,
      reviewCount: hotel.reviewsCount,
    },
    priceRange: `$${hotel.pricePerNight} per night`,
  }

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HotelDetail hotel={hotel} />
    </PageShell>
  )
}
