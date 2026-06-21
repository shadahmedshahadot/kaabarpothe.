import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { fetchPackage } from '@/lib/seo-fetch'

export async function generateMetadata({ params }: { params: Promise<{ type: string; slug: string }> }): Promise<Metadata> {
  const { type, slug } = await params
  const isHajj = type === 'hajj'
  const label = isHajj ? 'হজ্জ' : 'উমরাহ'
  const fallbackName = slug.replace(/-/g, ' ')
  const canonical = `/packages/${type}/${slug}`

  const pkg = await fetchPackage(slug)

  const name = pkg?.name ?? fallbackName
  const finalPrice = pkg ? Math.max(0, (pkg.price ?? 0) - (pkg.discount ?? 0)) : null
  const priceFragment = finalPrice ? ` $${finalPrice.toLocaleString('en-US')} থেকে।` : ''
  const description =
    pkg?.shortDescription ??
    pkg?.description?.slice(0, 160) ??
    `${label} প্যাকেজ ${name} — কাবার পথে। সৌদি মন্ত্রণালয় অনুমোদিত, আলেম পরিচালিত।${priceFragment}`
  const title = `${name} — ${label} প্যাকেজ`
  const ogImage = pkg?.cover || pkg?.gallery?.[0] || SITE.ogImage

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

export default function PackageDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
