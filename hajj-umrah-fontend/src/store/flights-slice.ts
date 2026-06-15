import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { flights as seed, type CabinClass, type Flight, flightTotal } from '@/data/flights'

export type FlightSort = 'recommended' | 'price-asc' | 'price-desc' | 'duration' | 'departure'

export interface FlightFilters {
  airline: string
  fromCity: string
  toCity: string
  cabin: CabinClass | 'all'
  nonStopOnly: boolean
  priceMax: number
  sortBy: FlightSort
}

const defaultFilters: FlightFilters = {
  airline: 'all',
  fromCity: 'all',
  toCity: 'all',
  cabin: 'all',
  nonStopOnly: false,
  priceMax: 5000,
  sortBy: 'recommended',
}

const apply = (list: Flight[], f: FlightFilters): Flight[] => {
  let r = list.filter(x => x.status === 'active')
  if (f.airline !== 'all') r = r.filter(x => x.airlineName === f.airline)
  if (f.fromCity !== 'all') r = r.filter(x => x.departureCity === f.fromCity)
  if (f.toCity !== 'all') r = r.filter(x => x.arrivalCity === f.toCity)
  if (f.cabin !== 'all') r = r.filter(x => x.cabinClass === f.cabin)
  if (f.nonStopOnly) r = r.filter(x => x.transits.length === 0)
  r = r.filter(x => flightTotal(x) <= f.priceMax)

  const parseMin = (d: string) => {
    const m = d.match(/(\d+)h\s*(\d*)m?/)
    if (!m) return 0
    return Number(m[1]) * 60 + Number(m[2] || 0)
  }

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
      r.sort((a, b) => (a.departureDate + a.departureTime).localeCompare(b.departureDate + b.departureTime))
      break
    default:
      r.sort((a, b) => Number(b.featured) - Number(a.featured) || b.bookingsCount - a.bookingsCount)
  }
  return r
}

export interface FlightsState {
  flights: Flight[]
  filteredFlights: Flight[]
  filters: FlightFilters
}

const initialState: FlightsState = {
  flights: seed,
  filteredFlights: apply(seed, defaultFilters),
  filters: defaultFilters,
}

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FlightFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredFlights = apply(state.flights, state.filters)
    },
    resetFilters(state) {
      state.filters = defaultFilters
      state.filteredFlights = apply(state.flights, defaultFilters)
    },
  },
})

export const flightsActions = flightsSlice.actions
export default flightsSlice.reducer
