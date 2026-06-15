import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { FlightListing } from '@/features/flights/components/flight-listing'

export const metadata: Metadata = {
  title: 'Flights to Jeddah & Madinah | Sakinah Travels',
  description: 'Book Hajj & Umrah flights independently from Dhaka and Chattogram with Biman, Saudia, Emirates, Qatar Airways, Turkish Airlines, and more.',
}

export default function FlightsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Flight bookings"
        title="Hajj & Umrah flights, booked separately."
        description="Dhaka and Chattogram departures to Jeddah and Madinah. Choose any flight on its own — no package required."
      />
      <FlightListing />
    </PageShell>
  )
}
