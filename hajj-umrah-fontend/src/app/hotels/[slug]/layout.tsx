import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { fetchHotel } from '@/lib/seo-fetch'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const canonical = `/hotels/${slug}`
  const hotel = await fetchHotel(slug)

  const fallbackName = slug.replace(/-/g, ' ')
  const name = hotel?.name ?? fallbackName
  const cityBn = hotel?.city === 'MAKKAH' ? 'মক্কা' : hotel?.city === 'MADINAH' ? 'মদিনা' : ''
  const stars = hotel?.category ? `${hotel.category}-তারকা ` : ''
  const priceFragment = hotel?.pricePerNight ? ` প্রতি রাত $${hotel.pricePerNight}।` : ''
  const description =
    hotel?.description?.slice(0, 160) ||
    `${stars}হোটেল ${name}${cityBn ? `, ${cityBn}` : ''}। হারামের কাছের প্রিমিয়াম থাকা ব্যবস্থা।${priceFragment}`
  const title = hotel ? `${name}${cityBn ? ` — ${cityBn}` : ''}` : `হোটেল — ${fallbackName}`
  const ogImage = hotel?.cover || hotel?.images?.[0] || SITE.ogImage

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: canonical,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
  }
}

export default function HotelDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
