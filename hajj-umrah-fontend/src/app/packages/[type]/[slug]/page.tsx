import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layouts/page-shell'
import { PackageDetail } from '@/features/packages/components/package-detail'
import { getPackage, packages } from '@/data/packages'

export const dynamicParams = false

export async function generateStaticParams() {
  return packages.map(p => ({ type: p.type, slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ type: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const pkg = getPackage(slug)
  if (!pkg) return { title: 'প্যাকেজ পাওয়া যায়নি' }
  return {
    title: `${pkg.name} | সাকিনাহ ট্রাভেলস`,
    description: pkg.shortDescription,
    openGraph: {
      title: pkg.name,
      description: pkg.shortDescription,
      type: 'website',
    },
  }
}

export default async function PackagePage({ params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params
  const pkg = getPackage(slug)
  if (!pkg || pkg.type !== type) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.name,
    description: pkg.shortDescription,
    offers: {
      '@type': 'Offer',
      price: pkg.price - pkg.discount,
      priceCurrency: 'USD',
      availability: pkg.availability === 'soldout' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewsCount,
    },
  }

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackageDetail pkg={pkg} />
    </PageShell>
  )
}
