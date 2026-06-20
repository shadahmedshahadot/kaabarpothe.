import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { FlightListing } from '@/features/flights/components/flight-listing'

export const metadata: Metadata = {
  title: 'জেদ্দা ও মদিনার ফ্লাইট',
  description: 'ঢাকা ও চট্টগ্রাম থেকে বিমান, সৌদিয়া, এমিরেটস, কাতার এয়ারওয়েজ, টার্কিশ এয়ারলাইন্স এবং আরও এয়ারলাইন্সে হজ্জ ও উমরাহ ফ্লাইট বুক করুন।',
  keywords: ['জেদ্দা ফ্লাইট', 'মদিনা ফ্লাইট', 'ঢাকা টু জেদ্দা', 'হজ্জ ফ্লাইট', 'উমরাহ ফ্লাইট', 'Dhaka Jeddah flight'],
  alternates: { canonical: '/flights' },
  openGraph: {
    title: 'জেদ্দা ও মদিনার ফ্লাইট | কাবার পথে',
    description: 'ঢাকা ও চট্টগ্রাম থেকে সরাসরি জেদ্দা ও মদিনা ফ্লাইট বুকিং।',
    url: '/flights',
  },
}

export default function FlightsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="ফ্লাইট বুকিং"
        title="হজ্জ ও উমরাহ ফ্লাইট, আলাদাভাবে বুক করুন।"
        description="ঢাকা ও চট্টগ্রাম থেকে জেদ্দা ও মদিনার উদ্দেশ্যে প্রস্থান। যেকোনো ফ্লাইট আলাদাভাবে নির্বাচন করুন — কোনো প্যাকেজ প্রয়োজন নেই।"
      />
      <FlightListing />
    </PageShell>
  )
}
