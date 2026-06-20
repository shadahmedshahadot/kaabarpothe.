import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ type: string; slug: string }> }): Promise<Metadata> {
  const { type, slug } = await params
  const isHajj = type === 'hajj'
  const label = isHajj ? 'হজ্জ' : 'উমরাহ'
  const title = `${label} প্যাকেজ — ${slug.replace(/-/g, ' ')}`
  return {
    title,
    description: `${label} প্যাকেজ ${slug.replace(/-/g, ' ')} — কাবার পথে। সৌদি মন্ত্রণালয় অনুমোদিত, আলেম পরিচালিত।`,
    alternates: { canonical: `/packages/${type}/${slug}` },
    openGraph: {
      title: `${title} | কাবার পথে`,
      description: `${label} প্যাকেজ বিস্তারিত — ইটিনারারি, হোটেল, ফ্লাইট ও মূল্য।`,
      url: `/packages/${type}/${slug}`,
      type: 'website',
    },
  }
}

export default function PackageDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
