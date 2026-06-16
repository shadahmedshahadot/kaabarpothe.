import type { Flight } from '@/data/flights'
import type { FlightDto } from './flightApi'

const cabinMap: Record<FlightDto['cabinClass'], Flight['cabinClass']> = {
  ECONOMY: 'economy',
  ECONOMY_PLUS: 'economy-plus',
  BUSINESS: 'business',
  FIRST: 'first',
}

export const adaptFlight = (dto: FlightDto): Flight =>
  ({
    id: dto.id,
    slug: dto.slug,
    airlineName: dto.airlineName,
    airlineLogo: dto.airlineLogo,
    flightNumber: dto.flightNumber,
    departureAirport: dto.departureAirport,
    arrivalAirport: dto.arrivalAirport,
    departureCity: dto.departureCity,
    arrivalCity: dto.arrivalCity,
    departureDate: dto.departureDate?.slice(0, 10) ?? '',
    departureTime: dto.departureTime,
    arrivalDate: dto.arrivalDate?.slice(0, 10) ?? '',
    arrivalTime: dto.arrivalTime,
    transits: (dto.transits ?? []).map(t => ({
      airport: t.airport,
      city: t.city,
      duration: t.duration,
    })),
    transitDuration: dto.transitDuration,
    totalDuration: dto.totalDuration,
    cabinClass: cabinMap[dto.cabinClass],
    baggageAllowance: dto.baggageAllowance,
    mealInfo: dto.mealInfo,
    seatsTotal: dto.seatsTotal,
    seatsAvailable: dto.seatsAvailable,
    bookingStatus: dto.bookingStatus.toLowerCase() as Flight['bookingStatus'],
    price: dto.price,
    taxes: dto.taxes,
    discount: dto.discount,
    notes: dto.notes ?? '',
    status: dto.status.toLowerCase() as Flight['status'],
    featured: dto.featured,
    rating: dto.rating,
    reviewsCount: dto.reviewsCount,
    bookingsCount: dto.bookingsCount,
    publishedAt: dto.publishedAt?.slice(0, 10) ?? '',
  }) as Flight
