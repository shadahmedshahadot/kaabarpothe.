import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { ROUTES } from '@/constants'
import type { Booking } from '@/data/bookings'

export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">সাম্প্রতিক বুকিং</h3>
        <Link href={ROUTES.admin.bookings} className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1">
          সব দেখুন <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {bookings.map(b => <BookingRow key={b.id} booking={b} />)}
      </div>
    </div>
  )
}

function BookingRow({ booking }: { booking: Booking }) {
  const gradient = booking.packageType === 'hajj' ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-teal-500'
  const code = booking.packageType === 'hajj' ? 'HJ' : 'UM'
  return (
    <Link href={`${ROUTES.admin.bookings}/${booking.id}`} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
        {code}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">{booking.pilgrimName}</p>
        <p className="text-xs text-muted-foreground truncate">{booking.bookingCode} · {booking.packageName}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-foreground">{formatCurrency(booking.totalAmount)}</p>
        <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'outline'} className="text-[10px]">{booking.status}</Badge>
      </div>
    </Link>
  )
}
