export type CabinClass = 'economy' | 'economy-plus' | 'business' | 'first'
export type FlightStatus = 'active' | 'inactive'
export type BookingStatus = 'open' | 'closed' | 'waitlist' | 'soldout'

export interface FlightTransit {
  airport: string
  city: string
  duration: string
}

export interface Flight {
  id: string
  slug: string
  airlineName: string
  airlineLogo: string
  flightNumber: string

  departureAirport: string
  arrivalAirport: string
  departureCity: string
  arrivalCity: string

  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string

  transits: FlightTransit[]
  transitDuration: string
  totalDuration: string

  cabinClass: CabinClass
  baggageAllowance: string
  mealInfo: string

  seatsTotal: number
  seatsAvailable: number
  bookingStatus: BookingStatus

  price: number
  taxes: number
  discount: number

  notes: string
  status: FlightStatus
  featured: boolean

  rating: number
  reviewsCount: number
  bookingsCount: number

  publishedAt: string
}

export const FLIGHT_AIRLINES = [
  'বিমান বাংলাদেশ এয়ারলাইন্স',
  'সৌদিয়া',
  'এমিরেটস',
  'কাতার এয়ারওয়েজ',
  'টার্কিশ এয়ারলাইন্স',
  'ফ্লাইদুবাই',
] as const

export const FLIGHT_CITIES = ['ঢাকা', 'চট্টগ্রাম', 'জেদ্দা', 'মদিনা'] as const

export const flightTotal = (f: Flight) => f.price + f.taxes - f.discount
