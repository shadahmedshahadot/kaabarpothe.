import { baseApi } from '@/redux/api/baseApi'

export interface PackageItineraryDay {
  id?: string
  day: number
  title: string
  description: string
  activities: string[]
}

export interface PackageFaqItem {
  id?: string
  question: string
  answer: string
}

export interface PackageDto {
  id: string
  slug: string
  name: string
  type: 'HAJJ' | 'UMRAH'
  tier: 'BUDGET' | 'ECONOMY' | 'STANDARD' | 'PREMIUM' | 'VIP' | 'LUXURY'
  shortDescription: string
  description: string
  duration: number
  departureDate: string
  returnDate: string
  price: number
  discount: number
  status: 'PUBLISHED' | 'DRAFT'
  availability: 'AVAILABLE' | 'LIMITED' | 'SOLDOUT'
  seatsLeft: number
  rating: number
  reviewsCount: number
  bookingsCount: number
  featured: boolean
  hotelMakkahName: string
  hotelMakkahStars: number
  hotelMakkahDistance: string
  hotelMakkahImage: string
  hotelMadinahName: string
  hotelMadinahStars: number
  hotelMadinahDistance: string
  hotelMadinahImage: string
  flightAirline: string
  flightDeparture: string
  flightArrival: string
  flightClass: string
  meals: string
  transport: string
  ziyarah: string[]
  visa: string
  included: string[]
  excluded: string[]
  highlights: string[]
  groupSize: string
  gallery: string[]
  cover: string
  itinerary?: PackageItineraryDay[]
  faqs?: PackageFaqItem[]
}

export interface PackageListResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: { page: number; limit: number; total: number }
  data: PackageDto[]
}

export interface PackageItemResponse {
  statusCode: number
  success: boolean
  message: string
  data: PackageDto
}

export interface PackageListQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  type?: 'HAJJ' | 'UMRAH'
  tier?: PackageDto['tier']
  status?: PackageDto['status']
  featured?: boolean
  search?: string
}

export const packageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPackages: builder.query<PackageListResponse, PackageListQuery | void>({
      query: (params) => ({
        url: '/packages',
        method: 'GET',
        params: params ?? undefined,
      }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(p => ({ type: 'package' as const, id: p.id })),
              { type: 'package' as const, id: 'LIST' },
            ]
          : [{ type: 'package' as const, id: 'LIST' }],
    }),
    getPackage: builder.query<PackageItemResponse, string>({
      query: idOrSlug => ({
        url: `/packages/${encodeURIComponent(idOrSlug)}`,
        method: 'GET',
      }),
      providesTags: (_r, _e, idOrSlug) => [{ type: 'package', id: idOrSlug }],
    }),
    createPackage: builder.mutation<PackageItemResponse, FormData>({
      query: body => ({
        url: '/packages',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'package', id: 'LIST' }],
    }),
    updatePackage: builder.mutation<PackageItemResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/packages/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'package', id },
        { type: 'package', id: 'LIST' },
      ],
    }),
    deletePackage: builder.mutation<void, string>({
      query: id => ({
        url: `/packages/${encodeURIComponent(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'package', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetPackagesQuery,
  useGetPackageQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi
