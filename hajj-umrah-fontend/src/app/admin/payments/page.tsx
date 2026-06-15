'use client'

import { CreditCard, Wallet, RefreshCw, AlertTriangle } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { payments } from '@/data/payments'

export default function AdminPaymentsPage() {
  const total = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0)
  const pending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const failed = payments.filter(p => p.status === 'failed').length

  return (
    <>
      <PageTitle title="পেমেন্ট" description="বুকিং, রিফান্ড এবং কিস্তির সমস্ত লেনদেন।" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <PayStat label="মোট প্রাপ্ত" value={formatCurrency(total)} color="text-emerald-600" Icon={Wallet} />
        <PayStat label="অপেক্ষমাণ" value={formatCurrency(pending)} color="text-amber-600" Icon={RefreshCw} />
        <PayStat label="ফেরত দেওয়া" value={formatCurrency(0)} color="text-sky-600" Icon={RefreshCw} />
        <PayStat label="ব্যর্থ" value={failed.toString()} color="text-rose-600" Icon={AlertTriangle} />
      </div>

      <DataTable
        data={payments}
        searchPlaceholder="লেনদেন অনুসন্ধান…"
        columns={[
          { key: 'tx', label: 'লেনদেন', render: p => (
            <div>
              <p className="font-mono text-xs font-semibold text-foreground">{p.transactionId}</p>
              <p className="text-xs text-muted-foreground">{formatDate(p.date)} {new Date(p.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          )},
          { key: 'pilgrim', label: 'হাজী', render: p => <span className="font-medium text-foreground">{p.pilgrimName}</span> },
          { key: 'booking', label: 'বুকিং', render: p => <span className="text-xs font-mono text-muted-foreground">{p.bookingCode}</span> },
          { key: 'method', label: 'পদ্ধতি', render: p => (
            <Badge variant="outline" className="capitalize">
              <CreditCard className="w-3 h-3" /> {p.method.replace('-', ' ')}
            </Badge>
          )},
          { key: 'installment', label: 'কিস্তি', render: p => p.installmentNumber ? <span className="text-sm text-foreground">{p.installmentNumber}/{p.installmentsTotal}</span> : <span className="text-muted-foreground text-xs">পূর্ণ</span> },
          { key: 'amount', label: 'পরিমাণ', render: p => <span className="font-bold text-foreground">{formatCurrency(p.amount)}</span> },
          { key: 'status', label: 'অবস্থা', render: p => (
            <Badge variant={p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : p.status === 'failed' ? 'danger' : 'info'}>{p.status}</Badge>
          )},
        ]}
      />
    </>
  )
}

function PayStat({ label, value, color, Icon }: { label: string; value: string; color: string; Icon: any }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}