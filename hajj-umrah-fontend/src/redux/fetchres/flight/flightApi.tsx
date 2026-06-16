import { baseApi } from '@/redux/api/baseApi'

export interface FlightTransitDto {
  id?: string
  airport: string
  city: string
  duration: string
  position?: number
}

export interface FlightDto {
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
  transitDuration: string
  totalDuration: string
  cabinClass: 'ECONOMY' | 'ECONOMY_PLUS' | 'BUSINESS' | 'FIRST'
  baggageAllowance: string
  mealInfo: string
  seatsTotal: number
  seatsAvailable: number
  bookingStatus: 'OPEN' | 'CLOSED' | 'WAITLIST' | 'SOLDOUT'
  price: number
  taxes: number
  discount: number
  notes?: string | null
  status: 'ACTIVE' | 'INACTIVE'
  featured: boolean
  rating: number
  reviewsCount: number
  bookingsCount: number
  publishedAt: string
  transits: FlightTransitDto[]
}

export interface FlightListResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: FlightDto[]
}

export interface FlightItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: FlightDto
}

export interface FlightListQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  departureCity?: string
  arrivalCity?: string
  cabinClass?: FlightDto['cabinClass']
  status?: FlightDto['status']
  featured?: boolean
  search?: string
}

export const flightApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFlights: builder.query<FlightListResponse, FlightListQuery | void>({
      query: params => ({ url: '/flights', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(f => ({ type: 'flight' as const, id: f.id })),
              { type: 'flight' as const, id: 'LIST' },
            ]
          : [{ type: 'flight' as const, id: 'LIST' }],
    }),
    getFlight: builder.query<FlightItemResponse, string>({
      query: idOrSlug => ({ url: `/flights/${idOrSlug}`, method: 'GET' }),
      providesTags: (_r, _e, idOrSlug) => [{ type: 'flight', id: idOrSlug }],
    }),
    createFlight: builder.mutation<FlightItemResponse, FormData>({
      query: body => ({ url: '/flights', method: 'POST', body }),
      invalidatesTags: [{ type: 'flight', id: 'LIST' }],
    }),
    updateFlight: builder.mutation<FlightItemResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: `/flights/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'flight', id },
        { type: 'flight', id: 'LIST' },
      ],
    }),
    deleteFlight: builder.mutation<void, string>({
      query: id => ({ url: `/flights/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'flight', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetFlightsQuery,
  useGetFlightQuery,
  useCreateFlightMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
} = flightApi
