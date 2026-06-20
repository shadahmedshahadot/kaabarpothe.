import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `ফ্লাইট — ${slug.replace(/-/g, ' ')}`,
    description: 'হজ্জ ও উমরাহ ফ্লাইট বিস্তারিত — মূল্য, সময়সূচী ও বুকিং।',
    alternates: { canonical: `/flights/${slug}` },
    openGraph: {
      title: `ফ্লাইট বিস্তারিত | কাবার পথে`,
      description: 'ঢাকা/চট্টগ্রাম থেকে জেদ্দা ও মদিনা ফ্লাইট।',
      url: `/flights/${slug}`,
    },
  }
}

export default function FlightDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
