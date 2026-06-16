import { baseApi } from '@/redux/api/baseApi'

export interface UploadedFile {
  url: string
  publicId: string
  width?: number
  height?: number
  format?: string
  bytes?: number
}

export const uploadApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    uploadSingle: builder.mutation<{ data: UploadedFile }, FormData>({
      query: body => ({
        url: '/uploads/single',
        method: 'POST',
        body,
      }),
    }),
    uploadMultiple: builder.mutation<{ data: UploadedFile[] }, FormData>({
      query: body => ({
        url: '/uploads/multiple',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useUploadSingleMutation, useUploadMultipleMutation } = uploadApi
