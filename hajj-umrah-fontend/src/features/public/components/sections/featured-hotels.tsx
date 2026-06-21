'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, BedDouble } from 'lucide-react'

import { SectionHeading } from '@/components/ui/section-heading'
import { HotelCard } from '@/features/hotels/components/hotel-card'
import { useGetHotelsQuery } from '@/redux/fetchres/hotel/hotelApi'
import { adaptHotel } from '@/redux/fetchres/hotel/adapter'

export function FeaturedHotels() {
  const { data, isLoading, isError } = useGetHotelsQuery({ featured: true, status: 'ACTIVE', limit: 6 })

  const hotels = useMemo(() => (data?.data ?? []).map(adaptHotel), [data])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="বাছাইকৃত হোটেল"
            title="হারাম ও মসজিদে নববীর কাছের প্রিমিয়াম হোটেল।"
            description="৩-তারকা থেকে ৫-তারকা — প্রতিটি বাজেটের জন্য, হাঁটার দূরত্বে।"
            align="left"
            className="!max-w-2xl !mx-0"
          />
          <Link
            href="/hotels"
            className="self-start inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            সব হোটেল দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-rose-500">
            হোটেল লোড করতে ব্যর্থ হয়েছে। সার্ভার চালু আছে কি?
          </div>
        )}

        {!isLoading && !isError && hotels.length === 0 && (
          <div className="text-center py-20 text-muted-foreground inline-flex flex-col items-center w-full gap-2">
            <BedDouble className="w-10 h-10" />
            <p>এখনও কোনো ফিচার্ড হোটেল প্রকাশিত হয়নি।</p>
          </div>
        )}

        {!isLoading && !isError && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((h, i) => (
              <HotelCard key={h.id} hotel={h} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
