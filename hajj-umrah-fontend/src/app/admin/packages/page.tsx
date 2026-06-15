'use client'

import Link from 'next/link'
import { Plus, Edit, Copy, Trash2, MoreVertical, Eye } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { packages } from '@/data/packages'

export default function AdminPackagesPage() {
  return (
    <>
      <PageTitle
        title="প্যাকেজ"
        description="একই জায়গা থেকে সমস্ত হজ্জ ও উমরাহ প্যাকেজ পরিচালনা করুন।"
        action={
          <Link href="/admin/packages/new" className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors">
            <Plus className="w-4 h-4" /> প্যাকেজ তৈরি করুন
          </Link>
        }
      />

      <DataTable
        data={packages}
        searchPlaceholder="প্যাকেজ অনুসন্ধান…"
        columns={[
          {
            key: 'name',
            label: 'প্যাকেজ',
            render: p => (
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.cover} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {p.type === 'hajj' ? 'HJ' : 'UM'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{p.tier} · {p.duration} দিন</p>
                </div>
              </div>
            ),
          },
          { key: 'type', label: 'ধরন', render: p => <Badge variant={p.type === 'hajj' ? 'accent' : 'secondary'} className="uppercase">{p.type}</Badge> },
          { key: 'price', label: 'মূল্য', render: p => <span className="font-bold text-foreground">{formatCurrency(p.price - p.discount)}</span> },
          { key: 'status', label: 'অবস্থা', render: p => <Badge variant={p.status === 'published' ? 'success' : 'warning'}>{p.status}</Badge> },
          { key: 'availability', label: 'উপলব্ধতা', render: p => <Badge variant={p.availability === 'soldout' ? 'danger' : p.availability === 'limited' ? 'warning' : 'success'}>{p.availability === 'limited' ? `${p.seatsLeft} বাকি` : p.availability}</Badge> },
          { key: 'bookings', label: 'বুকিং', render: p => <span className="font-medium text-foreground">{p.bookingsCount.toLocaleString()}</span> },
          {
            key: 'actions',
            label: 'অ্যাকশন',
            render: p => (
              <div className="flex items-center gap-1 justify-end">
                <Link href={`/packages/${p.type}/${p.slug}`} className="p-1.5 hover:bg-muted rounded" title="দেখুন"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
                <button className="p-1.5 hover:bg-muted rounded" title="সম্পাদনা"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-muted rounded" title="ডুপ্লিকেট"><Copy className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-muted rounded text-rose-500" title="মুছুন"><Trash2 className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-muted rounded"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
              </div>
            ),
            className: 'text-right',
          },
        ]}
      />
    </>
  )
}