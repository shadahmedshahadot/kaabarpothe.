import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { TransportListing } from '@/features/transports/components/transport-listing'
import { transports } from '@/data/transports'

export const metadata: Metadata = {
  title: 'Transportation Services | Sakinah Travels',
  description: 'Airport transfers, intercity coaches, ziyarah tours, and Haram shuttle services in Makkah and Madinah. Book independently or bundled.',
}

export default function TransportationPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Transportation"
        title="Ground transport in Saudi Arabia."
        description="Airport transfers, intercity coaches, ziyarah tours, and Haram shuttles. Book on their own or with your hotel and flight."
      />
      <TransportListing transports={transports} />
    </PageShell>
  )
}
