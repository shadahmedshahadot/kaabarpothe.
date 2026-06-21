import { baseApi } from '@/redux/api/baseApi'

export type BookingStatus =
  | 'PENDING'
  | 'PENDING_REVIEW'
  | 'DOCUMENTS_REQUIRED'
  | 'UNDER_VERIFICATION'
  | 'WAITING_FOR_PAYMENT'
  | 'PAYMENT_RECEIVED'
  | 'VISA_PROCESSING'
  | 'FLIGHT_RESERVED'
  | 'HOTEL_RESERVED'
  | 'TRANSPORTATION_CONFIRMED'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED'

export type PaymentStatusBooking = 'UNPAID' | 'PARTIAL' | 'PAID' | 'REFUNDED'
export type VisaStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
export type BookingDocumentStatus = 'REQUESTED' | 'UPLOADED' | 'VERIFIED' | 'REJECTED'

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

export interface BookingTimelineEventDto {
  id: string
  bookingId: string
  eventType: string
  title: string
  description?: string | null
  performedById?: string | null
  performedByName?: string | null
  visibleToUser: boolean
  metadata?: Record<string, unknown> | null
  createdAt: string
}

export interface BookingStatusHistoryDto {
  id: string
  bookingId: string
  fromStatus?: BookingStatus | null
  toStatus: BookingStatus
  changedById?: string | null
  changedByName?: string | null
  note?: string | null
  createdAt: string
}

export interface BookingMessageDto {
  id: string
  bookingId: string
  senderId?: string | null
  senderName: string
  senderRole: 'ADMIN' | 'USER' | 'SYSTEM'
  content: string
  attachments: string[]
  readAt?: string | null
  createdAt: string
}

export interface BookingDocumentDto {
  id: string
  bookingId: string
  type: string
  name: string
  description?: string | null
  fileUrl?: string | null
  fileName?: string | null
  uploadedById?: string | null
  uploadedByRole?: 'ADMIN' | 'USER' | 'SYSTEM' | null
  status: BookingDocumentStatus
  requestedAt: string
  uploadedAt?: string | null
  verifiedAt?: string | null
  rejectionReason?: string | null
}

export interface AdminActivityLogDto {
  id: string
  adminId?: string | null
  adminName?: string | null
  bookingId?: string | null
  action: string
  details?: Record<string, unknown> | null
  note?: string | null
  createdAt: string
}

export interface BookingAssignmentDto {
  id: string
  bookingId: string
  staffId: string
  role: 'CONSULTANT' | 'STAFF'
  assignedById?: string | null
  assignedAt: string
  staff?: { id: string; full_name: string; email: string; avatar?: string | null }
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
  pilgrimNationality?: string | null
  pilgrimPassportNo?: string | null
  pilgrimPassportExp?: string | null
  flightId?: string | null
  hotelId?: string | null
  transportId?: string | null
  assignedConsultantId?: string | null
  assignedConsultant?: { id: string; full_name: string; email: string; avatar?: string | null } | null
  status: BookingStatus
  paymentStatus: PaymentStatusBooking
  totalAmount: number
  paidAmount: number
  installmentsCount: number
  installmentsPaid: number
  departureDate: string
  returnDate: string
  pilgrimsCount: number
  bookedDate: string
  notes?: string | null
  adminNotes?: string | null
  specialRequests?: string | null
  visaStatus: VisaStatus
  documentsStatus: 'INCOMPLETE' | 'COMPLETE'
  travelers?: BookingTravelerDto[]
  payments?: BookingPaymentDto[]
  statusHistory?: BookingStatusHistoryDto[]
  timelineEvents?: BookingTimelineEventDto[]
  documents?: BookingDocumentDto[]
  messages?: BookingMessageDto[]
  assignments?: BookingAssignmentDto[]
  package?: { id: string; name: string; type: string; tier: string; cover?: string }
  user?: { id: string; full_name: string; email: string; phone?: string | null; avatar?: string | null }
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
  status?: BookingStatus
  paymentStatus?: PaymentStatusBooking
  packageId?: string
  userId?: string
  search?: string
}

interface ApiResp<T> {
  statusCode: number
  success: boolean
  message?: string
  data: T
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
      query: idOrCode => ({ url: `/bookings/${encodeURIComponent(idOrCode)}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'booking', id }],
    }),
    createBooking: builder.mutation<BookingItemResponse, Record<string, unknown>>({
      query: body => ({ url: '/bookings', method: 'POST', body }),
      invalidatesTags: [{ type: 'booking', id: 'LIST' }, { type: 'notification', id: 'LIST' }],
    }),
    updateBooking: builder.mutation<BookingItemResponse, { id: string; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: `/bookings/${encodeURIComponent(id)}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'booking', id: 'LIST' },
      ],
    }),
    deleteBooking: builder.mutation<void, string>({
      query: id => ({ url: `/bookings/${encodeURIComponent(id)}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'booking', id: 'LIST' }],
    }),

    updateBookingStatus: builder.mutation<BookingItemResponse, { id: string; status: BookingStatus; note?: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/status`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'booking', id: 'LIST' },
        { type: 'bookingTimeline', id },
        { type: 'bookingActivity', id },
      ],
    }),
    assignConsultant: builder.mutation<BookingItemResponse, { id: string; staffId: string; role?: 'CONSULTANT' | 'STAFF'; note?: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/assign-consultant`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'bookingTimeline', id },
        { type: 'bookingActivity', id },
      ],
    }),
    requestBookingDocuments: builder.mutation<
      ApiResp<BookingDocumentDto[]>,
      { id: string; documents: Array<{ type: string; name?: string; description?: string }> }
    >({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/documents/request`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'bookingDocument', id },
        { type: 'bookingTimeline', id },
      ],
    }),
    uploadBookingDocument: builder.mutation<
      ApiResp<BookingDocumentDto>,
      { id: string; documentId?: string; type?: string; name?: string; fileUrl: string; fileName?: string }
    >({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/documents/upload`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'bookingDocument', id },
        { type: 'bookingTimeline', id },
      ],
    }),
    verifyBookingDocument: builder.mutation<
      ApiResp<BookingDocumentDto>,
      { id: string; documentId: string; status: 'VERIFIED' | 'REJECTED'; reason?: string }
    >({
      query: ({ id, documentId, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/documents/${encodeURIComponent(documentId)}/verify`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'booking', id },
        { type: 'bookingDocument', id },
        { type: 'bookingTimeline', id },
      ],
    }),
    updateBookingNotes: builder.mutation<BookingItemResponse, { id: string; adminNotes?: string; notes?: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/notes`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'booking', id }],
    }),
    assignFlight: builder.mutation<BookingItemResponse, { id: string; flightId: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/assign-flight`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'booking', id }, { type: 'bookingTimeline', id }],
    }),
    assignHotel: builder.mutation<BookingItemResponse, { id: string; hotelId: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/assign-hotel`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'booking', id }, { type: 'bookingTimeline', id }],
    }),
    assignTransport: builder.mutation<BookingItemResponse, { id: string; transportId: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/assign-transport`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'booking', id }, { type: 'bookingTimeline', id }],
    }),
    updateBookingPayment: builder.mutation<BookingItemResponse, { id: string; paidAmount?: number; paymentStatus?: PaymentStatusBooking; note?: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/payment`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'booking', id }, { type: 'bookingTimeline', id }, { type: 'bookingActivity', id }],
    }),
    updateBookingVisa: builder.mutation<BookingItemResponse, { id: string; visaStatus: VisaStatus; note?: string }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/visa`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'booking', id }, { type: 'bookingTimeline', id }],
    }),
    getBookingMessages: builder.query<ApiResp<BookingMessageDto[]>, string>({
      query: id => ({ url: `/bookings/${encodeURIComponent(id)}/messages`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'bookingMessage', id }],
    }),
    sendBookingMessage: builder.mutation<ApiResp<BookingMessageDto>, { id: string; content: string; attachments?: string[] }>({
      query: ({ id, ...body }) => ({ url: `/bookings/${encodeURIComponent(id)}/messages`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'bookingMessage', id }],
    }),
    getBookingTimeline: builder.query<ApiResp<BookingTimelineEventDto[]>, string>({
      query: id => ({ url: `/bookings/${encodeURIComponent(id)}/timeline`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'bookingTimeline', id }],
    }),
    getBookingDocuments: builder.query<ApiResp<BookingDocumentDto[]>, string>({
      query: id => ({ url: `/bookings/${encodeURIComponent(id)}/documents`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'bookingDocument', id }],
    }),
    getBookingActivityLog: builder.query<ApiResp<AdminActivityLogDto[]>, string>({
      query: id => ({ url: `/bookings/${encodeURIComponent(id)}/activity-log`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'bookingActivity', id }],
    }),
    getBookingStatusHistory: builder.query<ApiResp<BookingStatusHistoryDto[]>, string>({
      query: id => ({ url: `/bookings/${encodeURIComponent(id)}/status-history`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'bookingTimeline', id: `${id}-history` }],
    }),
  }),
})

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
  useAssignConsultantMutation,
  useRequestBookingDocumentsMutation,
  useUploadBookingDocumentMutation,
  useVerifyBookingDocumentMutation,
  useUpdateBookingNotesMutation,
  useAssignFlightMutation,
  useAssignHotelMutation,
  useAssignTransportMutation,
  useUpdateBookingPaymentMutation,
  useUpdateBookingVisaMutation,
  useGetBookingMessagesQuery,
  useSendBookingMessageMutation,
  useGetBookingTimelineQuery,
  useGetBookingDocumentsQuery,
  useGetBookingActivityLogQuery,
  useGetBookingStatusHistoryQuery,
} = bookingApi

export const STATUS_LABEL: Record<BookingStatus, string> = {
  PENDING: 'Pending',
  PENDING_REVIEW: 'Pending Review',
  DOCUMENTS_REQUIRED: 'Documents Required',
  UNDER_VERIFICATION: 'Under Verification',
  WAITING_FOR_PAYMENT: 'Waiting for Payment',
  PAYMENT_RECEIVED: 'Payment Received',
  VISA_PROCESSING: 'Visa Processing',
  FLIGHT_RESERVED: 'Flight Reserved',
  HOTEL_RESERVED: 'Hotel Reserved',
  TRANSPORTATION_CONFIRMED: 'Transportation Confirmed',
  CONFIRMED: 'Confirmed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
}

export const STATUS_TONE: Record<BookingStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
  PENDING_REVIEW: 'bg-amber-100 text-amber-700 border-amber-200',
  DOCUMENTS_REQUIRED: 'bg-sky-100 text-sky-700 border-sky-200',
  UNDER_VERIFICATION: 'bg-sky-100 text-sky-700 border-sky-200',
  WAITING_FOR_PAYMENT: 'bg-orange-100 text-orange-700 border-orange-200',
  PAYMENT_RECEIVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  VISA_PROCESSING: 'bg-violet-100 text-violet-700 border-violet-200',
  FLIGHT_RESERVED: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  HOTEL_RESERVED: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  TRANSPORTATION_CONFIRMED: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  CONFIRMED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-200',
  COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-rose-100 text-rose-700 border-rose-200',
  REJECTED: 'bg-rose-100 text-rose-700 border-rose-200',
}

export const ALL_STATUSES: BookingStatus[] = [
  'PENDING_REVIEW',
  'DOCUMENTS_REQUIRED',
  'UNDER_VERIFICATION',
  'WAITING_FOR_PAYMENT',
  'PAYMENT_RECEIVED',
  'VISA_PROCESSING',
  'FLIGHT_RESERVED',
  'HOTEL_RESERVED',
  'TRANSPORTATION_CONFIRMED',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'REJECTED',
]
