import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { TransportListing } from '@/features/transports/components/transport-listing'
import { transports } from '@/data/transports'

export const metadata: Metadata = {
  title: 'পরিবহন সেবা',
  description: 'মক্কা ও মদিনায় বিমানবন্দর ট্রান্সফার, আন্তঃনগর কোচ, যিয়ারত ট্যুর এবং হারাম শাটল সেবা। স্বাধীনভাবে অথবা প্যাকেজের সাথে বুক করুন।',
  keywords: ['মক্কা পরিবহন', 'মদিনা পরিবহন', 'যিয়ারত ট্যুর', 'হারাম শাটল', 'Hajj transport'],
  alternates: { canonical: '/transportation' },
  openGraph: {
    title: 'পরিবহন সেবা | কাবার পথে',
    description: 'মক্কা ও মদিনায় বিমানবন্দর ট্রান্সফার, যিয়ারত ট্যুর, হারাম শাটল।',
    url: '/transportation',
  },
}

export default function TransportationPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="পরিবহন"
        title="সৌদি আরবে স্থল পরিবহন।"
        description="বিমানবন্দর ট্রান্সফার, আন্তঃনগর কোচ, যিয়ারত ট্যুর এবং হারাম শাটল। আলাদাভাবে অথবা আপনার হোটেল ও ফ্লাইটের সাথে বুক করুন।"
      />
      <TransportListing transports={transports} />
    </PageShell>
  )
}
