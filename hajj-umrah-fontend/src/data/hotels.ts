export type HotelCategory = 3 | 4 | 5
export type HotelStatus = 'active' | 'inactive'
export type RoomBoard = 'room-only' | 'breakfast' | 'half-board' | 'full-board'

export interface HotelRoomType {
  id: string
  name: string
  capacity: number
  pricePerNight: number
  available: number
  board: RoomBoard
}

export interface Hotel {
  id: string
  slug: string
  name: string
  category: HotelCategory
  city: 'Makkah' | 'Madinah'
  country: 'Saudi Arabia'
  address: string
  distanceFromHaram: string
  images: string[]
  cover: string
  description: string
  facilities: string[]
  meals: string
  checkInDate: string
  checkOutDate: string
  totalRooms: number
  pricePerNight: number
  roomTypes: HotelRoomType[]
  rating: number
  reviewsCount: number
  bookingsCount: number
  status: HotelStatus
  featured: boolean
  notes: string
}

export const hotels: Hotel[] = []

export const getHotel = (_slug: string): Hotel | undefined => undefined
export const getHotelById = (_id: string): Hotel | undefined => undefined
export const getActiveHotels = (): Hotel[] => []
export const getFeaturedHotels = (): Hotel[] => []
export const getHotelsByCity = (_city: Hotel['city']): Hotel[] => []

export const hotelNights = (h: Hotel) => {
  const a = new Date(h.checkInDate).getTime()
  const b = new Date(h.checkOutDate).getTime()
  return Math.max(1, Math.round((b - a) / 86_400_000))
}

export const hotelTotal = (h: Hotel, nights = hotelNights(h)) => h.pricePerNight * nights
