'use client'

import { Loader2 } from 'lucide-react'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { useGetBookingsQuery } from '@/redux/fetchres/booking/bookingApi'

export default function PilgrimBookingsPage() {
  const { data, isLoading, isError } = useGetBookingsQuery({ limit: 100 })

  const my = data?.data ?? []

  return (
    <>
      <PageTitle title="আমার বুকিং" description="আপনার পূর্বের ও আসন্ন সকল হজ্জ-উমরাহ।" />

      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-rose-500">
          বুকিং লোড করতে ব্যর্থ হয়েছে।
        </div>
      )}

      {!isLoading && !isError && my.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          এখনও কোনো বুকিং নেই।
        </div>
      )}

      <div className="space-y-4">
        {my.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div
                className={`bg-gradient-to-br ${
                  b.packageType === 'HAJJ'
                    ? 'from-amber-400 via-orange-500 to-rose-500'
                    : 'from-emerald-400 via-teal-500 to-cyan-500'
                } p-8 text-white relative`}
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-15"
                  viewBox="0 0 200 150"
                  preserveAspectRatio="none"
                >
                  <pattern id={`pb-${b.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1.5" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#pb-${b.id})`} />
                </svg>
                <p className="relative text-xs uppercase tracking-wider opacity-80 mb-2">
                  {b.bookingCode}
                </p>
                <h3 className="relative text-2xl font-bold mb-1">{b.packageName}</h3>
                <p className="relative text-sm opacity-90">
                  {formatDate(b.departureDate)} → {formatDate(b.returnDate)}
                </p>
              </div>

              <div className="md:col-span-2 p-6 grid sm:grid-cols-3 gap-4">
                <Info
                  label="অবস্থা"
                  value={
                    <Badge
                      variant={
                        b.status === 'CONFIRMED'
                          ? 'success'
                          : b.status === 'COMPLETED'
                            ? 'info'
                            : 'warning'
                      }
                    >
                      {b.status.toLowerCase()}
                    </Badge>
                  }
                />
                <Info
                  label="ভিসা"
                  value={
                    <Badge variant={b.visaStatus === 'APPROVED' ? 'success' : 'warning'}>
                      {b.visaStatus.toLowerCase()}
                    </Badge>
                  }
                />
                <Info
                  label="পেমেন্ট"
                  value={
                    <Badge variant={b.paymentStatus === 'PAID' ? 'success' : 'warning'}>
                      {b.paymentStatus.toLowerCase()}
                    </Badge>
                  }
                />
                <Info
                  label="মোট"
                  value={
                    <span className="font-bold text-foreground text-lg">
                      {formatCurrency(b.totalAmount)}
                    </span>
                  }
                />
                <Info
                  label="পরিশোধিত"
                  value={
                    <span className="font-bold text-emerald-600 text-lg">
                      {formatCurrency(b.paidAmount)}
                    </span>
                  }
                />
                <Info
                  label="হাজী সংখ্যা"
                  value={<span className="font-semibold text-foreground">{b.pilgrimsCount}</span>}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      {value}
    </div>
  )
}
