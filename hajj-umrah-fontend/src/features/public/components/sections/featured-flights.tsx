'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, Plane } from 'lucide-react'

import { SectionHeading } from '@/components/ui/section-heading'
import { FlightCard } from '@/features/flights/components/flight-card'
import { useGetFlightsQuery } from '@/redux/fetchres/flight/flightApi'
import { adaptFlight } from '@/redux/fetchres/flight/adapter'

export function FeaturedFlights() {
  const { data, isLoading, isError } = useGetFlightsQuery({ featured: true, status: 'ACTIVE', limit: 6 })

  const flights = useMemo(() => (data?.data ?? []).map(adaptFlight), [data])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="বাছাইকৃত ফ্লাইট"
            title="হারামের পথে সরাসরি — আপনার পছন্দের সময়ে।"
            description="বিশ্বস্ত এয়ারলাইন, প্রতিযোগিতামূলক মূল্য, পবিত্র যাত্রার জন্য বিশেষভাবে নির্বাচিত।"
            align="left"
            className="!max-w-2xl !mx-0"
          />
          <Link
            href="/flights"
            className="self-start inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            সব ফ্লাইট দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-rose-500">
            ফ্লাইট লোড করতে ব্যর্থ হয়েছে। সার্ভার চালু আছে কি?
          </div>
        )}

        {!isLoading && !isError && flights.length === 0 && (
          <div className="text-center py-20 text-muted-foreground inline-flex flex-col items-center w-full gap-2">
            <Plane className="w-10 h-10" />
            <p>এখনও কোনো ফিচার্ড ফ্লাইট প্রকাশিত হয়নি।</p>
          </div>
        )}

        {!isLoading && !isError && flights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
