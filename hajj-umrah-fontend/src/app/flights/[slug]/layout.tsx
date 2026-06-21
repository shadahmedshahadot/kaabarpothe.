import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { fetchFlight } from '@/lib/seo-fetch'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const canonical = `/flights/${slug}`
  const flight = await fetchFlight(slug)

  const fallbackName = slug.replace(/-/g, ' ')
  const title = flight
    ? `${flight.airlineName ?? 'ফ্লাইট'} ${flight.flightNumber ?? ''} — ${flight.departureCity ?? ''} → ${flight.arrivalCity ?? ''}`.trim()
    : `ফ্লাইট — ${fallbackName}`

  const priceFragment = flight?.price ? ` $${flight.price} থেকে।` : ''
  const description = flight
    ? `${flight.departureCity ?? ''} (${flight.departureAirport ?? ''}) → ${flight.arrivalCity ?? ''} (${flight.arrivalAirport ?? ''})। ${flight.totalDuration ?? ''} ${flight.cabinClass ?? ''}।${priceFragment}`.trim()
    : 'হজ্জ ও উমরাহ ফ্লাইট বিস্তারিত — মূল্য, সময়সূচী ও বুকিং।'
  const ogImage = flight?.airlineLogo || SITE.ogImage

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: canonical,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
  }
}

export default function FlightDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
