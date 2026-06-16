'use client'

import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'

import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { HotelListing } from '@/features/hotels/components/hotel-listing'
import { useGetHotelsQuery } from '@/redux/fetchres/hotel/hotelApi'
import { adaptHotel } from '@/redux/fetchres/hotel/adapter'

export default function HotelsPage() {
  const { data, isLoading, isError } = useGetHotelsQuery({ status: 'ACTIVE', limit: 100 })

  const hotels = useMemo(() => (data?.data ?? []).map(adaptHotel), [data])

  return (
    <PageShell>
      <PageHero
        eyebrow="হোটেল বুকিং"
        title="হারাম ও মসজিদে নববীর কাছের হোটেল।"
        description="প্রতিটি বাজেটের জন্য ৩-তারকা থেকে ৫-তারকা অপশন। হোটেল আলাদাভাবে বুক করুন — যেকোনো প্যাকেজ থেকে স্বাধীন।"
      />
      {isLoading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-40 text-rose-500">
          হোটেল লোড করতে ব্যর্থ হয়েছে। সার্ভার চালু আছে কি?
        </div>
      ) : (
        <HotelListing hotels={hotels} />
      )}
    </PageShell>
  )
}
