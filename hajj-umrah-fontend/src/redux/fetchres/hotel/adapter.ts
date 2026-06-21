import type { Hotel, RoomBoard, HotelCategory } from '@/data/hotels'
import type { HotelDto, HotelRoomTypeDto } from './hotelApi'
import { safeImage } from '@/lib/safe-image'

const boardMap: Record<HotelRoomTypeDto['board'], RoomBoard> = {
  ROOM_ONLY: 'room-only',
  BREAKFAST: 'breakfast',
  HALF_BOARD: 'half-board',
  FULL_BOARD: 'full-board',
}

export const adaptHotel = (dto: HotelDto): Hotel =>
  ({
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    category: dto.category as HotelCategory,
    city: dto.city === 'MAKKAH' ? 'Makkah' : 'Madinah',
    country: 'Saudi Arabia',
    address: dto.address,
    distanceFromHaram: dto.distanceFromHaram,
    images: (dto.images ?? []).map((src, i) => safeImage(src, `${dto.id}-${i}`)),
    cover: safeImage(dto.cover, dto.id),
    description: dto.description,
    facilities: dto.facilities,
    meals: dto.meals,
    checkInDate: dto.checkInDate?.slice(0, 10) ?? '',
    checkOutDate: dto.checkOutDate?.slice(0, 10) ?? '',
    totalRooms: dto.totalRooms,
    pricePerNight: dto.pricePerNight,
    rating: dto.rating,
    reviewsCount: dto.reviewsCount,
    bookingsCount: dto.bookingsCount,
    status: dto.status.toLowerCase() as Hotel['status'],
    featured: dto.featured,
    notes: dto.notes ?? '',
    roomTypes: (dto.roomTypes ?? []).map(r => ({
      id: r.id ?? '',
      name: r.name,
      capacity: r.capacity,
      pricePerNight: r.pricePerNight,
      available: r.available,
      board: boardMap[r.board],
    })),
  }) as Hotel
