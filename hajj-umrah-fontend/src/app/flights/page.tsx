import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { FlightListing } from '@/features/flights/components/flight-listing'

export const metadata: Metadata = {
  title: 'জেদ্দা ও মদিনার ফ্লাইট | সাকিনাহ ট্রাভেলস',
  description: 'ঢাকা ও চট্টগ্রাম থেকে বিমান, সৌদিয়া, এমিরেটস, কাতার এয়ারওয়েজ, টার্কিশ এয়ারলাইন্স এবং আরও অনেক এয়ারলাইন্সে স্বাধীনভাবে হজ্জ ও উমরাহ ফ্লাইট বুক করুন।',
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
