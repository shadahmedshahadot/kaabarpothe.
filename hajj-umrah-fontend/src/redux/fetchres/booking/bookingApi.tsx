import { baseApi } from '@/redux/api/baseApi'

export interface BookingTravelerDto {
  id?: string
  fullName: string
  gender: 'MALE' | 'FEMALE'
  dateOfBirth: string
  passportNumber: string
  passportExpiry: string
  nationality: string
  mobile: string
  email: string
  emergencyContact?: string | null
}

export interface BookingPaymentDto {
  id: string
  transactionId: string
  bookingCode: string
  pilgrimName: string
  amount: number
  method: string
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED'
  date: string
  installmentNumber?: number | null
  installmentsTotal?: number | null
}

export interface BookingDto {
  id: string
  bookingCode: string
  packageId: string
  packageName: string
  packageType: 'HAJJ' | 'UMRAH'
  userId: string | null
  pilgrimName: string
  pilgrimEmail: string
  pilgrimPhone: string
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' | 'REFUNDED'
  totalAmount: number
  paidAmount: number
  installmentsCount: number
  installmentsPaid: number
  departureDate: string
  returnDate: string
  pilgrimsCount: number
  bookedDate: string
  notes?: string | null
  visaStatus: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
  documentsStatus: 'INCOMPLETE' | 'COMPLETE'
  travelers?: BookingTravelerDto[]
  payments?: BookingPaymentDto[]
}

export interface BookingListResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: BookingDto[]
}

export interface BookingItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: BookingDto
}

export interface BookingListQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  status?: BookingDto['status']
  paymentStatus?: BookingDto['paymentStatus']
  packageId?: string
  userId?: string
  search?: string
}

export const bookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query<BookingListResponse, BookingListQuery | void>({
      query: params => ({ url: '/bookings', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(b => ({ type: 'booking' as const, id: b.id })),
              { type: 'booking' as const, id: 'LIST' },
            ]
          : [{ type: 'booking' as const, id: 'LIST' }],
    }),
    getBooking: builder.query<BookingItemResponse, string>({
      query: idOrCode => ({ url: `/bookings/${idOrCode}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'booking', id }],
    }),
    createBooking: builder.mutation<BookingItemResponse, Record<string, unknown>>({
      query: body => ({ url: '/bookings', method: 'POST', body }),
      invalidatesTags: [{ type: 'booking', id: 'LIST' }],
    }),
    updateBooking: builder.mutation<BookingItemResponse, { id: string; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: `/bookings/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'booking', id: 'LIST' },
      ],
    }),
    deleteBooking: builder.mutation<void, string>({
      query: id => ({ url: `/bookings/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'booking', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi
