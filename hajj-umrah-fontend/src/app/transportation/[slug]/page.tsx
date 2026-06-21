import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layouts/page-shell'
import { BreadcrumbJsonLd } from '@/components/common'
import { SITE } from '@/constants/site'
import { TransportDetail } from '@/features/transports/components/transport-detail'
import { transports, getTransport } from '@/data/transports'

export const dynamicParams = false

export async function generateStaticParams() {
  return transports.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const transport = getTransport(slug)
  if (!transport) return { title: 'সেবা পাওয়া যায়নি' }
  return {
    title: transport.name,
    description: `${transport.routeDetails} $${transport.price} ${transport.pricingUnit} থেকে।`,
    alternates: { canonical: `/transportation/${transport.slug}` },
    openGraph: {
      title: `${transport.name} | কাবার পথে`,
      description: transport.routeDetails,
      url: `/transportation/${transport.slug}`,
    },
  }
}

export default async function TransportationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const transport = getTransport(slug)
  if (!transport || transport.status !== 'active') notFound()

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: transport.name,
    description: transport.routeDetails,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: transport.serviceCoverage,
    serviceType: transport.type,
    offers: {
      '@type': 'Offer',
      price: transport.price,
      priceCurrency: 'USD',
      url: `${SITE.url}/transportation/${transport.slug}`,
      availability:
        transport.availability === 'soldout'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
    },
    aggregateRating:
      transport.reviewsCount > 0
        ? { '@type': 'AggregateRating', ratingValue: transport.rating, reviewCount: transport.reviewsCount, bestRating: 5 }
        : undefined,
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { label: 'পরিবহন', href: '/transportation' },
          { label: transport.name },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <TransportDetail transport={transport} />
    </PageShell>
  )
}
