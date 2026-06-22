'use client'

import Link from 'next/link'
import { Download, FileText, Loader2, ExternalLink } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  useGetInvoicesQuery,
  INVOICE_STATUS_LABEL,
  INVOICE_STATUS_TONE,
} from '@/redux/fetchres/invoice/invoiceApi'
import { ROUTES } from '@/constants'

export default function InvoicesPage() {
  const { data, isLoading, isError, refetch } = useGetInvoicesQuery({ limit: 50, sort: 'date', order: 'desc' })
  const invoices = data?.data?.items ?? []
  const summary = data?.data?.summary

  return (
    <>
      <PageTitle title="ইনভয়েস" description="আপনার রেকর্ডের জন্য ইনভয়েস ও রিসিপ্ট ডাউনলোড করুন।" />

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <SummaryStat label="পরিশোধিত" value={formatCurrency(summary.paid)} tone="text-emerald-600" />
          <SummaryStat label="অপেক্ষমাণ" value={formatCurrency(summary.pending)} tone="text-amber-600" />
          <SummaryStat label="ফেরত" value={formatCurrency(summary.refunded)} tone="text-sky-600" />
          <SummaryStat label="বাতিল" value={formatCurrency(summary.cancelled)} tone="text-rose-600" />
        </div>
      )}

      {isLoading && (
        <div className="bg-card border border-border rounded-2xl p-8 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> লোড হচ্ছে…
        </div>
      )}

      {isError && (
        <div className="bg-card border border-rose-200 rounded-2xl p-8 text-center text-sm">
          <p className="text-rose-600 mb-2">ইনভয়েস লোড করা যায়নি।</p>
          <button onClick={() => refetch()} className="text-primary text-xs underline">পুনরায় চেষ্টা করুন</button>
        </div>
      )}

      {!isLoading && !isError && invoices.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
          কোনো ইনভয়েস নেই।
        </div>
      )}

      {invoices.length > 0 && (
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {invoices.map(i => (
            <div key={i.id} className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono font-semibold text-foreground text-sm">{i.invoiceNumber}</p>
                <p className="text-xs text-muted-foreground truncate">{i.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(i.issueDate)} · {i.bookingCode}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-foreground">{formatCurrency(i.amount)}</p>
                <Badge variant={INVOICE_STATUS_TONE[i.status]} className="text-[10px]">
                  {INVOICE_STATUS_LABEL[i.status]}
                </Badge>
              </div>
              <Link
                href={`${ROUTES.pilgrim.invoices}/${i.id}`}
                className="px-3 py-2 bg-foreground text-background rounded-lg text-xs font-semibold hover:bg-primary inline-flex items-center gap-1.5 shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" /> দেখুন
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function SummaryStat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold ${tone} mt-1`}>{value}</p>
    </div>
  )
}
