import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `হোটেল — ${slug.replace(/-/g, ' ')}`,
    description: 'মক্কা ও মদিনার হোটেল বিস্তারিত — অবস্থান, সুবিধা ও মূল্য।',
    alternates: { canonical: `/hotels/${slug}` },
    openGraph: {
      title: `হোটেল বিস্তারিত | কাবার পথে`,
      description: 'হারাম ও মসজিদে নববীর কাছের হোটেল।',
      url: `/hotels/${slug}`,
    },
  }
}

export default function HotelDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
