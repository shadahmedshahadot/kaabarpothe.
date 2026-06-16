import { baseApi } from '@/redux/api/baseApi'

export interface UserDocumentDto {
  id: string
  type: string
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED'
  uploadedDate?: string | null
  fileUrl?: string | null
  createdAt: string
}

export interface UserDto {
  id: string
  full_name: string
  email: string
  role: 'ADMIN' | 'USER'
  phone?: string | null
  dateOfBirth?: string | null
  gender?: 'MALE' | 'FEMALE' | null
  nationality?: string | null
  address?: string | null
  city?: string | null
  country?: string | null
  avatar?: string | null
  passportNumber?: string | null
  passportIssueDate?: string | null
  passportExpiryDate?: string | null
  passportCountry?: string | null
  emergencyContactName?: string | null
  emergencyContactRelationship?: string | null
  emergencyContactPhone?: string | null
  bookingsCount: number
  totalSpent: number
  joinedDate: string
  createdAt: string
  updatedAt: string
  documents?: UserDocumentDto[]
}

export interface UserItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: UserDto
}

export interface UserListResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: UserDto[]
}

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserItemResponse, void>({
      query: () => ({ url: '/user/me', method: 'GET' }),
      providesTags: [{ type: 'user', id: 'ME' }],
    }),
    updateMe: builder.mutation<UserItemResponse, FormData>({
      query: body => ({ url: '/user/me', method: 'PATCH', body }),
      invalidatesTags: [{ type: 'user', id: 'ME' }],
    }),
    getUsers: builder.query<UserListResponse, { page?: number; limit?: number; role?: 'ADMIN' | 'USER'; search?: string } | void>({
      query: params => ({ url: '/user', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(u => ({ type: 'user' as const, id: u.id })),
              { type: 'user' as const, id: 'LIST' },
            ]
          : [{ type: 'user' as const, id: 'LIST' }],
    }),
    getUser: builder.query<UserItemResponse, string>({
      query: id => ({ url: `/user/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'user', id }],
    }),
    updateUser: builder.mutation<UserItemResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: `/user/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'user', id },
        { type: 'user', id: 'LIST' },
      ],
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({ url: `/user/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'user', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi
