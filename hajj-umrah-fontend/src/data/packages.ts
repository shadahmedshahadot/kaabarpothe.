export type PackageType = 'hajj' | 'umrah'
export type PackageTier = 'budget' | 'economy' | 'standard' | 'premium' | 'vip' | 'luxury'

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface PackageFAQ {
  q: string
  a: string
}

export interface Package {
  id: string
  slug: string
  name: string
  type: PackageType
  tier: PackageTier
  shortDescription: string
  description: string
  duration: number
  departureDate: string
  returnDate: string
  price: number
  discount: number
  status: 'published' | 'draft'
  availability: 'available' | 'limited' | 'soldout'
  seatsLeft: number
  rating: number
  reviewsCount: number
  bookingsCount: number
  featured: boolean
  hotelMakkah: { name: string; stars: number; distance: string; image: string }
  hotelMadinah: { name: string; stars: number; distance: string; image: string }
  flight: { airline: string; departure: string; arrival: string; class: string }
  meals: string
  transport: string
  ziyarah: string[]
  visa: string
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  gallery: string[]
  cover: string
  faqs: PackageFAQ[]
  highlights: string[]
  groupSize: string
}

export const packages: Package[] = []

export const getPackage = (slug: string) => packages.find(p => p.slug === slug)
export const getPackagesByType = (type: PackageType) => packages.filter(p => p.type === type)
export const getFeaturedPackages = () => packages.filter(p => p.featured)
