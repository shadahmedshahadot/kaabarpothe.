export type TransportType = 'airport-transfer' | 'intercity' | 'ziyarah-tour' | 'haram-shuttle' | 'private-hire'
export type VehicleType = 'sedan' | 'suv' | 'minivan' | 'coach' | 'luxury-coach' | 'mercedes-v-class'
export type TransportStatus = 'active' | 'inactive'

export interface Transport {
  id: string
  slug: string
  name: string
  type: TransportType
  vehicleType: VehicleType
  capacity: number
  images: string[]
  cover: string
  pickupLocation: string
  dropoffLocation: string
  routeDetails: string
  serviceCoverage: string[]
  driverName: string
  driverContact: string
  travelDuration: string
  price: number
  pricingUnit: 'per-person' | 'per-vehicle'
  availability: 'available' | 'limited' | 'soldout'
  status: TransportStatus
  featured: boolean
  rating: number
  reviewsCount: number
  bookingsCount: number
  notes: string
}

export const transports: Transport[] = []

export const getTransport = (slug: string) => transports.find(t => t.slug === slug)
export const getTransportById = (id: string) => transports.find(t => t.id === id)
export const getActiveTransports = () => transports.filter(t => t.status === 'active')
export const getFeaturedTransports = () => transports.filter(t => t.featured && t.status === 'active')

export const TRANSPORT_TYPES: { value: TransportType; label: string }[] = [
  { value: 'airport-transfer', label: 'বিমানবন্দর স্থানান্তর' },
  { value: 'intercity', label: 'আন্তঃনগর' },
  { value: 'ziyarah-tour', label: 'যিয়ারত ট্যুর' },
  { value: 'haram-shuttle', label: 'হারাম শাটল' },
  { value: 'private-hire', label: 'প্রাইভেট হায়ার' },
]
