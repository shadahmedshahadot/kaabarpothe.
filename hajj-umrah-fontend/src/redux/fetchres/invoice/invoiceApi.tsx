import { baseApi } from '@/redux/api/baseApi'

export type InvoiceStatus = 'PAID' | 'PENDING' | 'REFUNDED' | 'CANCELLED'
export type InvoiceMethod =
  | 'CARD'
  | 'BANK_TRANSFER'
  | 'PAYPAL'
  | 'APPLE_PAY'
  | 'KLARNA'
  | 'AFFIRM'
  | 'BKASH'
  | 'NAGAD'
  | 'SSLCOMMERZ'

export interface InvoiceBookingDto {
  id: string
  bookingCode: string
  packageName: string
  packageType: 'HAJJ' | 'UMRAH'
  totalAmount: number
  paidAmount: number
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID' | 'REFUNDED'
  departureDate: string
  returnDate: string
  pilgrimName: string
  pilgrimEmail: string
  pilgrimPhone: string
  userId?: string | null
}

export interface InvoiceDto {
  id: string
  invoiceNumber: string
  paymentId: string
  bookingId: string
  bookingCode: string
  pilgrimName: string
  pilgrimEmail?: string | null
  pilgrimPhone?: string | null
  packageName?: string | null
  packageType?: 'HAJJ' | 'UMRAH' | null
  amount: number
  method: InvoiceMethod
  rawStatus: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED'
  status: InvoiceStatus
  description: string
  installmentNumber?: number | null
  installmentsTotal?: number | null
  issueDate: string
  dueDate: string
  paidDate?: string | null
  createdAt: string
  updatedAt: string
  booking?: InvoiceBookingDto | null
}

export interface InvoiceSummary {
  paid: number
  pending: number
  refunded: number
  cancelled: number
  paidCount: number
  pendingCount: number
}

export interface InvoiceListResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: { items: InvoiceDto[]; summary: InvoiceSummary }
}

export interface InvoiceItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: InvoiceDto
}

export interface InvoiceListQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  bookingId?: string
  userId?: string
  status?: InvoiceStatus
  search?: string
  from?: string
  to?: string
}

export interface CreateInvoicePayload {
  bookingId: string
  amount: number
  method?: InvoiceMethod
  status?: 'PENDING' | 'COMPLETED'
  date?: string
  transactionId?: string
  installmentNumber?: number
  installmentsTotal?: number
}

export interface UpdateInvoicePayload {
  amount?: number
  method?: InvoiceMethod
  status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  date?: string
  transactionId?: string
  installmentNumber?: number
  installmentsTotal?: number
}

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getInvoices: builder.query<InvoiceListResponse, InvoiceListQuery | void>({
      query: params => ({ url: '/invoices', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data?.items
          ? [
              ...result.data.items.map(i => ({ type: 'invoice' as const, id: i.id })),
              { type: 'invoice' as const, id: 'LIST' },
            ]
          : [{ type: 'invoice' as const, id: 'LIST' }],
    }),
    getInvoice: builder.query<InvoiceItemResponse, string>({
      query: id => ({ url: `/invoices/${encodeURIComponent(id)}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'invoice', id }],
    }),
    createInvoice: builder.mutation<InvoiceItemResponse, CreateInvoicePayload>({
      query: body => ({ url: '/invoices', method: 'POST', body }),
      invalidatesTags: [
        { type: 'invoice', id: 'LIST' },
        { type: 'payment', id: 'LIST' },
        { type: 'booking', id: 'LIST' },
      ],
    }),
    updateInvoice: builder.mutation<InvoiceItemResponse, { id: string; body: UpdateInvoicePayload }>({
      query: ({ id, body }) => ({ url: `/invoices/${encodeURIComponent(id)}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'invoice', id },
        { type: 'invoice', id: 'LIST' },
        { type: 'booking', id: 'LIST' },
      ],
    }),
    markInvoicePaid: builder.mutation<InvoiceItemResponse, string>({
      query: id => ({ url: `/invoices/${encodeURIComponent(id)}/mark-paid`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'invoice', id },
        { type: 'invoice', id: 'LIST' },
        { type: 'booking', id: 'LIST' },
      ],
    }),
    deleteInvoice: builder.mutation<void, string>({
      query: id => ({ url: `/invoices/${encodeURIComponent(id)}`, method: 'DELETE' }),
      invalidatesTags: [
        { type: 'invoice', id: 'LIST' },
        { type: 'booking', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useMarkInvoicePaidMutation,
  useDeleteInvoiceMutation,
} = invoiceApi

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  PAID: 'পরিশোধিত',
  PENDING: 'অপেক্ষমাণ',
  REFUNDED: 'ফেরত',
  CANCELLED: 'বাতিল',
}

export const INVOICE_STATUS_TONE: Record<InvoiceStatus, 'success' | 'warning' | 'info' | 'danger'> = {
  PAID: 'success',
  PENDING: 'warning',
  REFUNDED: 'info',
  CANCELLED: 'danger',
}

export const INVOICE_METHOD_LABEL: Record<InvoiceMethod, string> = {
  CARD: 'কার্ড',
  BANK_TRANSFER: 'ব্যাংক ট্রান্সফার',
  PAYPAL: 'PayPal',
  APPLE_PAY: 'Apple Pay',
  KLARNA: 'Klarna',
  AFFIRM: 'Affirm',
  BKASH: 'bKash',
  NAGAD: 'Nagad',
  SSLCOMMERZ: 'SSLCommerz',
}
