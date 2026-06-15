'use client'

import { Filter, SlidersHorizontal } from 'lucide-react'
import { Select } from '@/components/ui/input'
import { useFlightStore } from '@/store/flights'
import { FLIGHT_AIRLINES, FLIGHT_CITIES, type CabinClass } from '@/data/flights'
import { FlightCard } from './flight-card'

export function FlightListing() {
  const { filteredFlights, filters, setFilters, resetFilters } = useFlightStore()

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filteredFlights.length}</span>টি ফ্লাইট উপলব্ধ
          </p>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার:
            </div>
            <Select value={filters.fromCity} onChange={e => setFilters({ fromCity: e.target.value })} className="w-auto min-w-[120px]">
              <option value="all">থেকে: সব</option>
              {FLIGHT_CITIES.map(c => <option key={c} value={c}>থেকে: {c}</option>)}
            </Select>
            <Select value={filters.toCity} onChange={e => setFilters({ toCity: e.target.value })} className="w-auto min-w-[120px]">
              <option value="all">পর্যন্ত: সব</option>
              {FLIGHT_CITIES.map(c => <option key={c} value={c}>পর্যন্ত: {c}</option>)}
            </Select>
            <Select value={filters.airline} onChange={e => setFilters({ airline: e.target.value })} className="w-auto min-w-[150px]">
              <option value="all">সব এয়ারলাইন</option>
              {FLIGHT_AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
            </Select>
            <Select value={filters.cabin} onChange={e => setFilters({ cabin: e.target.value as CabinClass | 'all' })} className="w-auto min-w-[140px]">
              <option value="all">সব কেবিন</option>
              <option value="economy">ইকোনমি</option>
              <option value="economy-plus">ইকোনমি প্লাস</option>
              <option value="business">বিজনেস</option>
              <option value="first">ফার্স্ট</option>
            </Select>
            <Select value={filters.sortBy} onChange={e => setFilters({ sortBy: e.target.value as typeof filters.sortBy })} className="w-auto min-w-[160px]">
              <option value="recommended">প্রস্তাবিত</option>
              <option value="price-asc">মূল্য: কম থেকে বেশি</option>
              <option value="price-desc">মূল্য: বেশি থেকে কম</option>
              <option value="duration">সবচেয়ে কম সময়কাল</option>
              <option value="departure">সবচেয়ে আগে প্রস্থান</option>
            </Select>
            <label className="inline-flex items-center gap-2 text-sm text-foreground/70 px-3 h-10 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <input
                type="checkbox"
                checked={filters.nonStopOnly}
                onChange={e => setFilters({ nonStopOnly: e.target.checked })}
                className="rounded border-border"
              />
              শুধু সরাসরি
            </label>
            <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
              রিসেট
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFlights.map((f, i) => <FlightCard key={f.id} flight={f} index={i} />)}
        </div>

        {filteredFlights.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>আপনার ফিল্টারের সাথে কোনো ফ্লাইট মেলেনি।</p>
            <button onClick={resetFilters} className="mt-3 text-sm text-primary hover:underline">ফিল্টার রিসেট করুন</button>
          </div>
        )}
      </div>
    </section>
  )
}
