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
  useGetPackagesQuery,
  useDeletePackageMutation,
  type PackageDto,
} from '@/redux/fetchres/package/packageApi'

export default function AdminPackagesPage() {
  const { data, isLoading, isError } = useGetPackagesQuery({ limit: 100 })
  const [deletePackage] = useDeletePackageMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const onDelete = async (pkg: PackageDto) => {
    const ok = window.confirm(`"${pkg.name}" মুছে ফেলবেন?`)
    if (!ok) return
    setPendingId(pkg.id)
    try {
      await deletePackage(pkg.id).unwrap()
      toast.success('প্যাকেজ মুছে ফেলা হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <>
      <PageTitle
        title="প্যাকেজ"
        description="একই জায়গা থেকে সমস্ত হজ্জ ও উমরাহ প্যাকেজ পরিচালনা করুন।"
        action={
          <Link
            href="/admin/packages/new"
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" /> প্যাকেজ তৈরি করুন
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-rose-500">প্যাকেজ লোড করতে ব্যর্থ হয়েছে।</div>
      ) : (
        <DataTable<PackageDto>
          data={data?.data ?? []}
          searchPlaceholder="প্যাকেজ অনুসন্ধান…"
          columns={[
            {
              key: 'name',
              label: 'প্যাকেজ',
              render: p => (
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    {p.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.cover} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                        {p.type === 'HAJJ' ? 'HJ' : 'UM'}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {p.tier.toLowerCase()} · {p.duration} দিন
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: 'type',
              label: 'ধরন',
              render: p => (
                <Badge variant={p.type === 'HAJJ' ? 'accent' : 'secondary'} className="uppercase">
                  {p.type}
                </Badge>
              ),
            },
            {
              key: 'price',
              label: 'মূল্য',
              render: p => (
                <span className="font-bold text-foreground">
                  {formatCurrency(p.price - p.discount)}
                </span>
              ),
            },
            {
              key: 'status',
              label: 'অবস্থা',
              render: p => (
                <Badge variant={p.status === 'PUBLISHED' ? 'success' : 'warning'}>
                  {p.status.toLowerCase()}
                </Badge>
              ),
            },
            {
              key: 'availability',
              label: 'উপলব্ধতা',
              render: p => (
                <Badge
                  variant={
                    p.availability === 'SOLDOUT'
                      ? 'danger'
                      : p.availability === 'LIMITED'
                        ? 'warning'
                        : 'success'
                  }
                >
                  {p.availability === 'LIMITED' ? `${p.seatsLeft} বাকি` : p.availability.toLowerCase()}
                </Badge>
              ),
            },
            {
              key: 'bookings',
              label: 'বুকিং',
              render: p => (
                <span className="font-medium text-foreground">
                  {p.bookingsCount.toLocaleString()}
                </span>
              ),
            },
            {
              key: 'actions',
              label: 'অ্যাকশন',
              render: p => (
                <div className="flex items-center gap-1 justify-end">
                  <Link
                    href={`/packages/${p.type.toLowerCase()}/${p.slug}`}
                    className="p-1.5 hover:bg-muted rounded"
                    title="দেখুন"
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href={`/admin/packages/${p.id}/edit`}
                    className="p-1.5 hover:bg-muted rounded"
                    title="সম্পাদনা"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => onDelete(p)}
                    disabled={pendingId === p.id}
                    className="p-1.5 hover:bg-muted rounded text-rose-500 disabled:opacity-50"
                    title="মুছুন"
                  >
                    {pendingId === p.id ? (
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
