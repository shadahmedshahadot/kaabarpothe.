'use client'

import Link from 'next/link'
import { Eye, MoreVertical } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { bookings } from '@/data/bookings'

const statusVariant = (s: string) => s === 'confirmed' ? 'success' : s === 'pending' ? 'warning' : s === 'cancelled' ? 'danger' : 'info'
const paymentVariant = (s: string) => s === 'paid' ? 'success' : s === 'partial' ? 'warning' : s === 'refunded' ? 'info' : 'danger'

export default function AdminBookingsPage() {
  return (
    <>
      <PageTitle title="বুকিং" description={`${bookings.length} বুকিং · ${bookings.filter(b => b.status === 'pending').length} অপেক্ষমাণ`} />

      <DataTable
        data={bookings}
        searchPlaceholder="বুকিং, হাজীর নাম, কোড অনুসন্ধান…"
        columns={[
          { key: 'code', label: 'বুকিং', render: b => (
            <div>
              <p className="font-mono font-semibold text-foreground text-xs">{b.bookingCode}</p>
              <p className="text-xs text-muted-foreground">{formatDate(b.bookedDate)}</p>
            </div>
          )},
          { key: 'pilgrim', label: 'হাজী', render: b => (
            <div>
              <p className="font-semibold text-foreground">{b.pilgrimName}</p>
              <p className="text-xs text-muted-foreground">{b.pilgrimEmail}</p>
            </div>
          )},
          { key: 'package', label: 'প্যাকেজ', render: b => (
            <div>
              <p className="text-foreground font-medium">{b.packageName}</p>
              <p className="text-xs text-muted-foreground">{b.pilgrimsCount} হাজী · {formatDate(b.departureDate)}</p>
            </div>
          )},
          { key: 'amount', label: 'পরিমাণ', render: b => (
            <div>
              <p className="font-bold text-foreground">{formatCurrency(b.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">পরিশোধিত: {formatCurrency(b.paidAmount)}</p>
            </div>
          )},
          { key: 'status', label: 'অবস্থা', render: b => (
            <div className="flex flex-col gap-1 items-start">
              <Badge variant={statusVariant(b.status) as any}>{b.status}</Badge>
              <Badge variant={paymentVariant(b.paymentStatus) as any} className="text-[10px]">{b.paymentStatus}</Badge>
            </div>
          )},
          { key: 'actions', label: '', render: b => (
            <div className="flex items-center gap-1 justify-end">
              <Link href={`/admin/bookings/${b.id}`} className="p-1.5 hover:bg-muted rounded"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
              <button className="p-1.5 hover:bg-muted rounded"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
            </div>
          ), className: 'text-right' },
        ]}
      />
    </>
  )
}