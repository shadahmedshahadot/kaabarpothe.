import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { HotelListing } from '@/features/hotels/components/hotel-listing'
import { hotels } from '@/data/hotels'

export const metadata: Metadata = {
  title: 'মক্কা ও মদিনার হোটেল | সাকিনাহ ট্রাভেলস',
  description: 'মক্কা ও মদিনায় হাতে বাছাই করা ৩ থেকে ৫-তারকা হোটেল, হারাম ও মসজিদে নববী থেকে হাঁটার দূরত্বে। স্বাধীনভাবে অথবা প্যাকেজের অংশ হিসেবে বুক করুন।',
}

export default function HotelsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="হোটেল বুকিং"
        title="হারাম ও মসজিদে নববীর কাছের হোটেল।"
        description="প্রতিটি বাজেটের জন্য ৩-তারকা থেকে ৫-তারকা অপশন। হোটেল আলাদাভাবে বুক করুন — যেকোনো প্যাকেজ থেকে স্বাধীন।"
      />
      <HotelListing hotels={hotels} />
    </PageShell>
  )
}
