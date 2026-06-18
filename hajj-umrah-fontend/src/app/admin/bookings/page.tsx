'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
  STATUS_LABEL,
  STATUS_TONE,
  type BookingDto,
} from '@/redux/fetchres/booking/bookingApi'

const paymentVariant = (s: BookingDto['paymentStatus']) =>
  s === 'PAID' ? 'success' : s === 'PARTIAL' ? 'warning' : s === 'REFUNDED' ? 'info' : 'danger'

export default function AdminBookingsPage() {
  const { data, isLoading, isError } = useGetBookingsQuery({ limit: 100 })
  const [deleteBooking] = useDeleteBookingMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const bookings = data?.data ?? []
  const pendingCount = bookings.filter(b => b.status === 'PENDING_REVIEW' || b.status === 'PENDING').length

  const onDelete = async (booking: BookingDto) => {
    if (!confirm(`"${booking.bookingCode}" মুছবেন?`)) return
    setPendingId(booking.id)
    try {
      await deleteBooking(booking.id).unwrap()
      toast.success('বুকিং মুছে ফেলা হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <>
      <PageTitle
        title="বুকিং"
        description={`${bookings.length} বুকিং · ${pendingCount} অপেক্ষমাণ`}
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-rose-500">বুকিং লোড করতে ব্যর্থ হয়েছে।</div>
      ) : (
        <DataTable<BookingDto>
          data={bookings}
          searchPlaceholder="বুকিং, হাজীর নাম, কোড অনুসন্ধান…"
          columns={[
            {
              key: 'code',
              label: 'বুকিং',
              render: b => (
                <div>
                  <p className="font-mono font-semibold text-foreground text-xs">{b.bookingCode}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(b.bookedDate)}</p>
                </div>
              ),
            },
            {
              key: 'pilgrim',
              label: 'হাজী',
              render: b => (
                <div>
                  <p className="font-semibold text-foreground">{b.pilgrimName}</p>
                  <p className="text-xs text-muted-foreground">{b.pilgrimEmail}</p>
                </div>
              ),
            },
            {
              key: 'package',
              label: 'প্যাকেজ',
              render: b => (
                <div>
                  <p className="text-foreground font-medium">{b.packageName}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.pilgrimsCount} হাজী · {formatDate(b.departureDate)}
                  </p>
                </div>
              ),
            },
            {
              key: 'amount',
              label: 'পরিমাণ',
              render: b => (
                <div>
                  <p className="font-bold text-foreground">{formatCurrency(b.totalAmount)}</p>
                  <p className="text-xs text-muted-foreground">
                    পরিশোধিত: {formatCurrency(b.paidAmount)}
                  </p>
                </div>
              ),
            },
            {
              key: 'status',
              label: 'অবস্থা',
              render: b => (
                <div className="flex flex-col gap-1 items-start">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_TONE[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                  <Badge variant={paymentVariant(b.paymentStatus) as any} className="text-[10px]">
                    {b.paymentStatus.toLowerCase()}
                  </Badge>
                </div>
              ),
            },
            {
              key: 'actions',
              label: '',
              render: b => (
                <div className="flex items-center gap-1 justify-end">
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="p-1.5 hover:bg-muted rounded"
                    title="বিস্তারিত"
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => onDelete(b)}
                    disabled={pendingId === b.id}
                    className="p-1.5 hover:bg-muted rounded text-rose-500 disabled:opacity-50"
                    title="মুছুন"
                  >
                    {pendingId === b.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ),
              className: 'text-right',
            },
          ]}
        />
      )}
    </>
  )
}
