'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import {
  useGetHotelsQuery,
  useDeleteHotelMutation,
  type HotelDto,
} from '@/redux/fetchres/hotel/hotelApi'

export default function AdminHotelsPage() {
  const { data, isLoading, isError } = useGetHotelsQuery({ limit: 100 })
  const [deleteHotel] = useDeleteHotelMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const onDelete = async (hotel: HotelDto) => {
    if (!confirm(`"${hotel.name}" মুছবেন?`)) return
    setPendingId(hotel.id)
    try {
      await deleteHotel(hotel.id).unwrap()
      toast.success('হোটেল মুছে ফেলা হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <>
      <PageTitle
        title="হোটেল"
        description="মক্কা ও মদিনার সকল হোটেল পরিচালনা করুন।"
        action={
          <Link
            href="/admin/hotels/new"
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" /> হোটেল তৈরি করুন
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-rose-500">হোটেল লোড করতে ব্যর্থ হয়েছে।</div>
      ) : (
        <DataTable<HotelDto>
          data={data?.data ?? []}
          searchPlaceholder="হোটেল অনুসন্ধান…"
          columns={[
            {
              key: 'name',
              label: 'হোটেল',
              render: h => (
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    {h.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={h.cover} alt={h.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                        H
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{h.name}</p>
                    <p className="text-xs text-muted-foreground">{h.category} তারকা · {h.totalRooms} রুম</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'city',
              label: 'শহর',
              render: h => (
                <Badge variant={h.city === 'MAKKAH' ? 'accent' : 'secondary'}>
                  {h.city === 'MAKKAH' ? 'মক্কা' : 'মদিনা'}
                </Badge>
              ),
            },
            {
              key: 'price',
              label: 'প্রতি রাত',
              render: h => (
                <span className="font-bold text-foreground">{formatCurrency(h.pricePerNight)}</span>
              ),
            },
            {
              key: 'rating',
              label: 'রেটিং',
              render: h => (
                <span className="font-medium text-foreground">
                  {h.rating.toFixed(1)} ★ ({h.reviewsCount})
                </span>
              ),
            },
            {
              key: 'status',
              label: 'অবস্থা',
              render: h => (
                <Badge variant={h.status === 'ACTIVE' ? 'success' : 'warning'}>
                  {h.status === 'ACTIVE' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                </Badge>
              ),
            },
            {
              key: 'actions',
              label: 'অ্যাকশন',
              render: h => (
                <div className="flex items-center gap-1 justify-end">
                  <Link href={`/hotels/${h.slug}`} className="p-1.5 hover:bg-muted rounded" title="দেখুন">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href={`/admin/hotels/${h.id}/edit`}
                    className="p-1.5 hover:bg-muted rounded"
                    title="সম্পাদনা"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => onDelete(h)}
                    disabled={pendingId === h.id}
                    className="p-1.5 hover:bg-muted rounded text-rose-500 disabled:opacity-50"
                    title="মুছুন"
                  >
                    {pendingId === h.id ? (
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
