import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layouts/page-shell'
import { TransportDetail } from '@/features/transports/components/transport-detail'
import { transports, getTransport } from '@/data/transports'

export const dynamicParams = false

export async function generateStaticParams() {
  return transports.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const transport = getTransport(slug)
  if (!transport) return { title: 'Service not found' }
  return {
    title: `${transport.name} | Sakinah Travels`,
    description: `${transport.routeDetails} From $${transport.price} ${transport.pricingUnit}.`,
  }
}

export default async function TransportationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const transport = getTransport(slug)
  if (!transport || transport.status !== 'active') notFound()
  return (
    <PageShell>
      <TransportDetail transport={transport} />
    </PageShell>
  )
}
