import { baseApi } from '@/redux/api/baseApi'

export type NotificationType =
  | 'BOOKING_RECEIVED'
  | 'STATUS_UPDATED'
  | 'DOCUMENTS_REQUESTED'
  | 'DOCUMENTS_UPLOADED'
  | 'PAYMENT_APPROVED'
  | 'VISA_UPDATE'
  | 'FLIGHT_ASSIGNED'
  | 'HOTEL_ASSIGNED'
  | 'TRANSPORTATION_ASSIGNED'
  | 'BOOKING_CONFIRMED'
  | 'BOOKING_COMPLETED'
  | 'BOOKING_CANCELLED'
  | 'MESSAGE_RECEIVED'
  | 'GENERIC'

export interface NotificationDto {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string | null
  bookingId?: string | null
  read: boolean
  readAt?: string | null
  metadata?: Record<string, unknown> | null
  createdAt: string
}

export interface NotificationListResponse {
  statusCode: number
  success: boolean
  meta?: { page: number; limit: number; total: number; unread: number }
  data: NotificationDto[]
}

export interface NotificationQuery {
  page?: number
  limit?: number
  read?: 'true' | 'false'
  type?: NotificationType
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<NotificationListResponse, NotificationQuery | void>({
      query: params => ({ url: '/notifications', method: 'GET', params: params ?? undefined }),
      providesTags: result =>
        result?.data
          ? [
              ...result.data.map(n => ({ type: 'notification' as const, id: n.id })),
              { type: 'notification' as const, id: 'LIST' },
            ]
          : [{ type: 'notification' as const, id: 'LIST' }],
    }),
    getUnreadCount: builder.query<{ data: { count: number } }, void>({
      query: () => ({ url: '/notifications/unread-count', method: 'GET' }),
      providesTags: [{ type: 'notification', id: 'UNREAD' }],
    }),
    markNotificationRead: builder.mutation<{ data: NotificationDto }, string>({
      query: id => ({ url: `/notifications/${encodeURIComponent(id)}/read`, method: 'PATCH' }),
      invalidatesTags: [{ type: 'notification', id: 'LIST' }, { type: 'notification', id: 'UNREAD' }],
    }),
    markAllNotificationsRead: builder.mutation<{ data: { ok: boolean } }, void>({
      query: () => ({ url: `/notifications/read-all`, method: 'PATCH' }),
      invalidatesTags: [{ type: 'notification', id: 'LIST' }, { type: 'notification', id: 'UNREAD' }],
    }),
    deleteNotification: builder.mutation<void, string>({
      query: id => ({ url: `/notifications/${encodeURIComponent(id)}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'notification', id: 'LIST' }, { type: 'notification', id: 'UNREAD' }],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi
