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
            <span className="font-bold text-foreground">{filteredFlights.length}</span> flights available
          </p>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> Filters:
            </div>
            <Select value={filters.fromCity} onChange={e => setFilters({ fromCity: e.target.value })} className="w-auto min-w-[120px]">
              <option value="all">From: All</option>
              {FLIGHT_CITIES.map(c => <option key={c} value={c}>From: {c}</option>)}
            </Select>
            <Select value={filters.toCity} onChange={e => setFilters({ toCity: e.target.value })} className="w-auto min-w-[120px]">
              <option value="all">To: All</option>
              {FLIGHT_CITIES.map(c => <option key={c} value={c}>To: {c}</option>)}
            </Select>
            <Select value={filters.airline} onChange={e => setFilters({ airline: e.target.value })} className="w-auto min-w-[150px]">
              <option value="all">All airlines</option>
              {FLIGHT_AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
            </Select>
            <Select value={filters.cabin} onChange={e => setFilters({ cabin: e.target.value as CabinClass | 'all' })} className="w-auto min-w-[140px]">
              <option value="all">All cabins</option>
              <option value="economy">Economy</option>
              <option value="economy-plus">Economy Plus</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </Select>
            <Select value={filters.sortBy} onChange={e => setFilters({ sortBy: e.target.value as typeof filters.sortBy })} className="w-auto min-w-[160px]">
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Shortest duration</option>
              <option value="departure">Earliest departure</option>
            </Select>
            <label className="inline-flex items-center gap-2 text-sm text-foreground/70 px-3 h-10 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <input
                type="checkbox"
                checked={filters.nonStopOnly}
                onChange={e => setFilters({ nonStopOnly: e.target.checked })}
                className="rounded border-border"
              />
              Non-stop only
            </label>
            <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFlights.map((f, i) => <FlightCard key={f.id} flight={f} index={i} />)}
        </div>

        {filteredFlights.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>No flights match your filters.</p>
            <button onClick={resetFilters} className="mt-3 text-sm text-primary hover:underline">Reset filters</button>
          </div>
        )}
      </div>
    </section>
  )
}
