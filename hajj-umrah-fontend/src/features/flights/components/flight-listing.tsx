'use client'

import { useMemo, useState } from 'react'
import { Filter, Loader2, SlidersHorizontal } from 'lucide-react'

import { Select } from '@/components/ui/input'
import { FLIGHT_AIRLINES, FLIGHT_CITIES, flightTotal, type CabinClass, type Flight } from '@/data/flights'
import { FlightCard } from './flight-card'
import { useGetFlightsQuery } from '@/redux/fetchres/flight/flightApi'
import { adaptFlight } from '@/redux/fetchres/flight/adapter'

type SortBy = 'recommended' | 'price-asc' | 'price-desc' | 'duration' | 'departure'

interface Filters {
  airline: string
  fromCity: string
  toCity: string
  cabin: CabinClass | 'all'
  nonStopOnly: boolean
  priceMax: number
  sortBy: SortBy
}

const defaultFilters: Filters = {
  airline: 'all',
  fromCity: 'all',
  toCity: 'all',
  cabin: 'all',
  nonStopOnly: false,
  priceMax: 5000,
  sortBy: 'recommended',
}

const parseMin = (d: string) => {
  const m = d.match(/(\d+)h\s*(\d*)m?/)
  if (!m) return 0
  return Number(m[1]) * 60 + Number(m[2] || 0)
}

const applyFilters = (list: Flight[], f: Filters): Flight[] => {
  let r = list.filter(x => x.status === 'active')
  if (f.airline !== 'all') r = r.filter(x => x.airlineName === f.airline)
  if (f.fromCity !== 'all') r = r.filter(x => x.departureCity === f.fromCity)
  if (f.toCity !== 'all') r = r.filter(x => x.arrivalCity === f.toCity)
  if (f.cabin !== 'all') r = r.filter(x => x.cabinClass === f.cabin)
  if (f.nonStopOnly) r = r.filter(x => x.transits.length === 0)
  r = r.filter(x => flightTotal(x) <= f.priceMax)

  switch (f.sortBy) {
    case 'price-asc':
      r.sort((a, b) => flightTotal(a) - flightTotal(b))
      break
    case 'price-desc':
      r.sort((a, b) => flightTotal(b) - flightTotal(a))
      break
    case 'duration':
      r.sort((a, b) => parseMin(a.totalDuration) - parseMin(b.totalDuration))
      break
    case 'departure':
      r.sort(
        (a, b) =>
          (a.departureDate + a.departureTime).localeCompare(b.departureDate + b.departureTime),
      )
      break
    default:
      r.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.bookingsCount - a.bookingsCount,
      )
  }
  return r
}

export function FlightListing() {
  const [filters, setFiltersState] = useState<Filters>(defaultFilters)
  const { data, isLoading, isError } = useGetFlightsQuery({ status: 'ACTIVE', limit: 100 })

  const setFilters = (patch: Partial<Filters>) => setFiltersState(prev => ({ ...prev, ...patch }))
  const resetFilters = () => setFiltersState(defaultFilters)

  const filtered = useMemo(() => {
    const all = (data?.data ?? []).map(adaptFlight)
    return applyFilters(all, filters)
  }, [data, filters])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span>টি ফ্লাইট উপলব্ধ
          </p>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার:
            </div>
            <Select
              value={filters.fromCity}
              onChange={e => setFilters({ fromCity: e.target.value })}
              className="w-auto min-w-[120px]"
            >
              <option value="all">থেকে: সব</option>
              {FLIGHT_CITIES.map(c => (
                <option key={c} value={c}>
                  থেকে: {c}
                </option>
              ))}
            </Select>
            <Select
              value={filters.toCity}
              onChange={e => setFilters({ toCity: e.target.value })}
              className="w-auto min-w-[120px]"
            >
              <option value="all">পর্যন্ত: সব</option>
              {FLIGHT_CITIES.map(c => (
                <option key={c} value={c}>
                  পর্যন্ত: {c}
                </option>
              ))}
            </Select>
            <Select
              value={filters.airline}
              onChange={e => setFilters({ airline: e.target.value })}
              className="w-auto min-w-[150px]"
            >
              <option value="all">সব এয়ারলাইন</option>
              {FLIGHT_AIRLINES.map(a => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </Select>
            <Select
              value={filters.cabin}
              onChange={e => setFilters({ cabin: e.target.value as CabinClass | 'all' })}
              className="w-auto min-w-[140px]"
            >
              <option value="all">সব কেবিন</option>
              <option value="economy">ইকোনমি</option>
              <option value="economy-plus">ইকোনমি প্লাস</option>
              <option value="business">বিজনেস</option>
              <option value="first">ফার্স্ট</option>
            </Select>
            <Select
              value={filters.sortBy}
              onChange={e => setFilters({ sortBy: e.target.value as SortBy })}
              className="w-auto min-w-[160px]"
            >
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
            <button
              onClick={resetFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              রিসেট
            </button>
          </div>
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

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>আপনার ফিল্টারের সাথে কোনো ফ্লাইট মেলেনি।</p>
            <button onClick={resetFilters} className="mt-3 text-sm text-primary hover:underline">
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
