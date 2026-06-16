'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Plane, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import {
  useGetFlightsQuery,
  useDeleteFlightMutation,
  type FlightDto,
} from '@/redux/fetchres/flight/flightApi'

export default function AdminFlightsPage() {
  const { data, isLoading, isError } = useGetFlightsQuery({ limit: 100 })
  const [deleteFlight] = useDeleteFlightMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const onDelete = async (flight: FlightDto) => {
    if (!confirm(`"${flight.flightNumber}" মুছবেন?`)) return
    setPendingId(flight.id)
    try {
      await deleteFlight(flight.id).unwrap()
      toast.success('ফ্লাইট মুছে ফেলা হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <>
      <PageTitle
        title="ফ্লাইট"
        description="স্বতন্ত্র ফ্লাইট বুকিংয়ের জন্য এয়ারলাইন সময়সূচি, আসন ইনভেন্টরি এবং মূল্য পরিচালনা করুন।"
        action={
          <Link
            href="/admin/flights/new"
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" /> ফ্লাইট তৈরি করুন
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-rose-500">ফ্লাইট লোড করতে ব্যর্থ হয়েছে।</div>
      ) : (
        <DataTable<FlightDto>
          data={data?.data ?? []}
          searchPlaceholder="ফ্লাইট নম্বর, এয়ারলাইন, শহর দিয়ে অনুসন্ধান…"
          columns={[
            {
              key: 'flight',
              label: 'ফ্লাইট',
              render: f => (
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {f.airlineLogo}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{f.flightNumber}</p>
                    <p className="text-xs text-muted-foreground truncate">{f.airlineName}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'route',
              label: 'রুট',
              render: f => (
                <div className="text-sm">
                  <p className="font-medium text-foreground flex items-center gap-1.5">
                    {f.departureCity} <Plane className="w-3.5 h-3.5 text-muted-foreground" /> {f.arrivalCity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {f.departureDate?.slice(0, 10)} · {f.totalDuration}
                  </p>
                </div>
              ),
            },
            {
              key: 'cabin',
              label: 'কেবিন',
              render: f => (
                <Badge variant="outline" className="capitalize">
                  {f.cabinClass.replace('_', ' ').toLowerCase()}
                </Badge>
              ),
            },
            {
              key: 'seats',
              label: 'আসন',
              render: f => (
                <span
                  className={
                    f.seatsAvailable === 0
                      ? 'text-rose-600 font-semibold'
                      : 'text-foreground font-medium'
                  }
                >
                  {f.seatsAvailable} / {f.seatsTotal}
                </span>
              ),
            },
            {
              key: 'price',
              label: 'মোট',
              render: f => (
                <span className="font-bold text-foreground">
                  {formatCurrency(f.price + f.taxes - f.discount)}
                </span>
              ),
            },
            {
              key: 'status',
              label: 'অবস্থা',
              render: f => (
                <Badge variant={f.status === 'ACTIVE' ? 'success' : 'warning'}>
                  {f.status === 'ACTIVE' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                </Badge>
              ),
            },
            {
              key: 'actions',
              label: 'অ্যাকশন',
              render: f => (
                <div className="flex items-center gap-1 justify-end">
                  <Link
                    href={`/flights/${f.slug}`}
                    className="p-1.5 hover:bg-muted rounded"
                    title="দেখুন"
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href={`/admin/flights/${f.id}/edit`}
                    className="p-1.5 hover:bg-muted rounded"
                    title="সম্পাদনা"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => onDelete(f)}
                    disabled={pendingId === f.id}
                    className="p-1.5 hover:bg-muted rounded text-rose-500 disabled:opacity-50"
                    title="মুছুন"
                  >
                    {pendingId === f.id ? (
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
