import { baseApi } from '@/redux/api/baseApi'

export interface HotelRoomTypeDto {
  id?: string
  name: string
  capacity: number
  pricePerNight: number
  available: number
  board: 'ROOM_ONLY' | 'BREAKFAST' | 'HALF_BOARD' | 'FULL_BOARD'
}

export interface HotelDto {
  id: string
  slug: string
  name: string
  category: number
  city: 'MAKKAH' | 'MADINAH'
  country: string
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
  rating: number
  reviewsCount: number
  bookingsCount: number
  status: 'ACTIVE' | 'INACTIVE'
  featured: boolean
  notes?: string | null
  roomTypes?: HotelRoomTypeDto[]
}

export interface HotelListResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: HotelDto[]
}

export interface HotelItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: HotelDto
}

export interface HotelListQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  city?: HotelDto['city']
  status?: HotelDto['status']
  featured?: boolean
  search?: string
}

export const hotelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHotels: builder.query<HotelListResponse, HotelListQuery | void>({
      query: params => ({ url: '/hotels', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(h => ({ type: 'hotel' as const, id: h.id })),
              { type: 'hotel' as const, id: 'LIST' },
            ]
          : [{ type: 'hotel' as const, id: 'LIST' }],
    }),
    getHotel: builder.query<HotelItemResponse, string>({
      query: idOrSlug => ({ url: `/hotels/${encodeURIComponent(idOrSlug)}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'hotel', id }],
    }),
    createHotel: builder.mutation<HotelItemResponse, FormData>({
      query: body => ({ url: '/hotels', method: 'POST', body }),
      invalidatesTags: [{ type: 'hotel', id: 'LIST' }],
    }),
    updateHotel: builder.mutation<HotelItemResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: `/hotels/${encodeURIComponent(id)}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'hotel', id },
        { type: 'hotel', id: 'LIST' },
      ],
    }),
    deleteHotel: builder.mutation<void, string>({
      query: id => ({ url: `/hotels/${encodeURIComponent(id)}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'hotel', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi
