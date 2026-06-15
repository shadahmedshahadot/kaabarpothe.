import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { HotelListing } from '@/features/hotels/components/hotel-listing'
import { hotels } from '@/data/hotels'

export const metadata: Metadata = {
  title: 'Makkah & Madinah Hotels | Sakinah Travels',
  description: 'Hand-picked 3 to 5-star hotels in Makkah and Madinah, walking distance from Haram and Masjid Nabawi. Book independently or as part of a package.',
}

export default function HotelsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Hotel bookings"
        title="Hotels near Haram & Masjid Nabawi."
        description="3-star to 5-star options for every budget. Book hotels on their own — independent from any package."
      />
      <HotelListing hotels={hotels} />
    </PageShell>
  )
}
