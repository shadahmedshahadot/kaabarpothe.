'use client'

import Link from 'next/link'
import { Eye, Mail, Phone } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { pilgrims } from '@/data/pilgrims'

export default function AdminPilgrimsPage() {
  return (
    <>
      <PageTitle title="হাজী" description={`${pilgrims.length} নিবন্ধিত হাজী`} />
      <DataTable
        data={pilgrims}
        searchPlaceholder="হাজী অনুসন্ধান…"
        columns={[
          { key: 'p', label: 'হাজী', render: p => (
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.avatar} text-white font-bold flex items-center justify-center`}>
                {p.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-semibold text-foreground">{p.fullName}</p>
                <p className="text-xs text-muted-foreground">{p.city}, {p.country}</p>
              </div>
            </div>
          )},
          { key: 'contact', label: 'যোগাযোগ', render: p => (
            <div className="text-sm">
              <p className="text-foreground/80 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {p.email}</p>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs"><Phone className="w-3 h-3" /> {p.phone}</p>
            </div>
          )},
          { key: 'passport', label: 'পাসপোর্ট', render: p => (
            <div className="text-sm">
              <p className="font-mono text-foreground">{p.passport.number}</p>
              <p className="text-xs text-muted-foreground">মেয়াদ {formatDate(p.passport.expiryDate, { year: 'numeric', month: 'short' })}</p>
            </div>
          )},
          { key: 'bookings', label: 'বুকিং', render: p => <span className="font-semibold text-foreground">{p.bookingsCount}</span> },
          { key: 'spent', label: 'মোট ব্যয়', render: p => <span className="font-bold text-foreground">{formatCurrency(p.totalSpent)}</span> },
          { key: 'docs', label: 'ডকুমেন্ট', render: p => {
            const verified = p.documents.filter(d => d.status === 'verified').length
            return <Badge variant={verified === p.documents.length ? 'success' : 'warning'}>{verified}/{p.documents.length} যাচাইকৃত</Badge>
          }},
          { key: 'actions', label: '', render: p => (
            <Link href={`/admin/pilgrims/${p.id}`} className="p-1.5 hover:bg-muted rounded inline-block"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
          ), className: 'text-right' },
        ]}
      />
    </>
  )
}