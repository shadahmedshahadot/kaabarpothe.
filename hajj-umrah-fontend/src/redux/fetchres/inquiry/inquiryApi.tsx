import { baseApi } from '@/redux/api/baseApi'

export type InquiryType = 'GENERAL' | 'PACKAGE' | 'CONSULTATION'
export type InquiryPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface CreateInquiryBody {
  name: string
  email: string
  phone: string
  type: InquiryType
  subject: string
  message: string
  packageId?: string | null
  priority?: InquiryPriority
}

export interface InquiryItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    id: string
    name: string
    email: string
    phone: string
    type: InquiryType
    subject: string
    message: string
    status: 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED'
    priority: InquiryPriority
    createdAt: string
  }
}

export const inquiryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createInquiry: builder.mutation<InquiryItemResponse, CreateInquiryBody>({
      query: body => ({ url: '/inquiries', method: 'POST', body }),
      invalidatesTags: [{ type: 'inquiry', id: 'LIST' }],
    }),
  }),
})

export const { useCreateInquiryMutation } = inquiryApi
