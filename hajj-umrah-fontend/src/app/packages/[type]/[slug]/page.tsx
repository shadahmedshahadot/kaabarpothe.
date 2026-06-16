'use client'

import { use, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { PageShell } from '@/components/layouts/page-shell'
import { PackageDetail } from '@/features/packages/components/package-detail'
import { useGetPackageQuery } from '@/redux/fetchres/package/packageApi'
import { adaptPackage } from '@/redux/fetchres/package/adapter'

export default function PackagePage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}) {
  const { type, slug } = use(params)
  const { data, isLoading, isError, error } = useGetPackageQuery(slug)

  const pkg = useMemo(() => (data?.data ? adaptPackage(data.data) : null), [data])

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
          প্যাকেজ লোড করতে ব্যর্থ হয়েছে। সার্ভার চালু আছে কি?
        </div>
      </PageShell>
    )
  }

  if (!pkg) notFound()
  if (pkg.type !== type) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.name,
    description: pkg.shortDescription,
    offers: {
      '@type': 'Offer',
      price: pkg.price - pkg.discount,
      priceCurrency: 'USD',
      availability:
        pkg.availability === 'soldout'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
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
