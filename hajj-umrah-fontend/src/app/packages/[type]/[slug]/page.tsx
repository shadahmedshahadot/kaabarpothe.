import { notFound } from 'next/navigation'

import { PageShell } from '@/components/layouts/page-shell'
import { BreadcrumbJsonLd } from '@/components/common'
import { PackageDetail } from '@/features/packages/components/package-detail'
import { adaptPackage } from '@/redux/fetchres/package/adapter'
import { fetchPackage } from '@/lib/seo-fetch'

export default async function PackagePage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}) {
  const { type, slug } = await params
  const dto = await fetchPackage(slug)
  if (!dto) notFound()

  const pkg = adaptPackage(dto)
  if (pkg.type !== type) notFound()

  const finalPrice = Math.max(0, pkg.price - pkg.discount)
  const isHajj = pkg.type === 'hajj'
  const label = isHajj ? 'হজ্জ' : 'উমরাহ'

  const touristTripLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.name,
    description: pkg.shortDescription || pkg.description,
    image: pkg.cover || pkg.gallery?.[0],
    touristType: ['Muslim pilgrims', 'Religious tourists'],
    itinerary: (pkg.itinerary ?? []).map(d => ({
      '@type': 'ItemList',
      name: `Day ${d.day}: ${d.title}`,
      description: d.description,
    })),
    offers: {
      '@type': 'Offer',
      price: finalPrice,
      priceCurrency: 'USD',
      availability:
        pkg.availability === 'soldout'
          ? 'https://schema.org/SoldOut'
          : pkg.availability === 'limited'
            ? 'https://schema.org/LimitedAvailability'
            : 'https://schema.org/InStock',
      url: `https://kaabarpothe.com/packages/${pkg.type}/${pkg.slug}`,
      validFrom: pkg.departureDate,
      priceValidUntil: pkg.departureDate,
    },
    aggregateRating:
      pkg.reviewsCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: pkg.rating,
            reviewCount: pkg.reviewsCount,
            bestRating: 5,
          }
        : undefined,
    provider: { '@type': 'TravelAgency', name: 'কাবার পথে', url: 'https://kaabarpothe.com' },
  }

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name,
    description: pkg.shortDescription || pkg.description,
    image: pkg.gallery?.length ? pkg.gallery : pkg.cover,
    brand: { '@type': 'Brand', name: 'কাবার পথে' },
    sku: pkg.id,
    offers: {
      '@type': 'Offer',
      price: finalPrice,
      priceCurrency: 'USD',
      availability:
        pkg.availability === 'soldout'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      url: `https://kaabarpothe.com/packages/${pkg.type}/${pkg.slug}`,
    },
    aggregateRating:
      pkg.reviewsCount > 0
        ? { '@type': 'AggregateRating', ratingValue: pkg.rating, reviewCount: pkg.reviewsCount, bestRating: 5 }
        : undefined,
  }

  const faqLd = pkg.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pkg.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { label: `${label} প্যাকেজ`, href: `/packages/${pkg.type}` },
          { label: pkg.name },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <PackageDetail pkg={pkg} />
    </PageShell>
  )
}
