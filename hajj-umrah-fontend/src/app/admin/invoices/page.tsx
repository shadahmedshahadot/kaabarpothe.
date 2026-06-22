'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, FileText, Loader2, Plus, Trash2, Wallet, RefreshCw, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  useGetInvoicesQuery,
  useDeleteInvoiceMutation,
  useMarkInvoicePaidMutation,
  INVOICE_STATUS_LABEL,
  INVOICE_STATUS_TONE,
  INVOICE_METHOD_LABEL,
  type InvoiceDto,
} from '@/redux/fetchres/invoice/invoiceApi'
import { ROUTES } from '@/constants'

export default function AdminInvoicesPage() {
  const { data, isLoading, isError } = useGetInvoicesQuery({ limit: 100, sort: 'date', order: 'desc' })
  const [deleteInvoice] = useDeleteInvoiceMutation()
  const [markPaid] = useMarkInvoicePaidMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const invoices = data?.data?.items ?? []
  const summary = data?.data?.summary

  const onDelete = async (inv: InvoiceDto) => {
    if (!confirm(`ইনভয়েস "${inv.invoiceNumber}" মুছবেন?`)) return
    setPendingId(inv.id)
    try {
      await deleteInvoice(inv.id).unwrap()
      toast.success('ইনভয়েস মুছে ফেলা হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
    } finally {
      setPendingId(null)
    }
  }

  const onMarkPaid = async (inv: InvoiceDto) => {
    setPendingId(inv.id)
    try {
      await markPaid(inv.id).unwrap()
      toast.success('পরিশোধিত হিসাবে চিহ্নিত')
    } catch (err: any) {
      toast.error(err?.data?.message || 'আপডেট ব্যর্থ')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <>
      <PageTitle
        title="ইনভয়েস"
        description={`${invoices.length} ইনভয়েস · ${summary?.pendingCount ?? 0} অপেক্ষমাণ`}
        action={
          <Link
            href={ROUTES.admin.invoiceNew}
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"
          >
            <Plus className="w-4 h-4" /> নতুন ইনভয়েস
          </Link>
        }
      />

      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Stat label="পরিশোধিত" value={formatCurrency(summary.paid)} color="text-emerald-600" Icon={Wallet} />
          <Stat label="অপেক্ষমাণ" value={formatCurrency(summary.pending)} color="text-amber-600" Icon={RefreshCw} />
          <Stat label="ফেরত" value={formatCurrency(summary.refunded)} color="text-sky-600" Icon={RefreshCw} />
          <Stat label="বাতিল" value={summary.cancelled > 0 ? formatCurrency(summary.cancelled) : '0'} color="text-rose-600" Icon={AlertTriangle} />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : isError ? (
        <div className="text-center py-20 text-rose-500">ইনভয়েস লোড ব্যর্থ।</div>
      ) : (
        <DataTable<InvoiceDto>
          data={invoices}
          searchPlaceholder="ইনভয়েস, বুকিং, হাজী…"
          columns={[
            {
              key: 'invoice',
              label: 'ইনভয়েস',
              render: i => (
                <div>
                  <p className="font-mono text-xs font-semibold text-foreground">{i.invoiceNumber}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(i.issueDate)}</p>
                </div>
              ),
            },
            { key: 'pilgrim', label: 'হাজী', render: i => <span className="font-medium text-foreground">{i.pilgrimName}</span> },
            { key: 'booking', label: 'বুকিং', render: i => <span className="text-xs font-mono text-muted-foreground">{i.bookingCode}</span> },
            { key: 'desc', label: 'বিবরণ', render: i => <span className="text-xs text-muted-foreground line-clamp-1">{i.description}</span> },
            { key: 'method', label: 'পদ্ধতি', render: i => <Badge variant="outline">{INVOICE_METHOD_LABEL[i.method]}</Badge> },
            { key: 'amount', label: 'পরিমাণ', render: i => <span className="font-bold text-foreground">{formatCurrency(i.amount)}</span> },
            { key: 'status', label: 'অবস্থা', render: i => <Badge variant={INVOICE_STATUS_TONE[i.status]}>{INVOICE_STATUS_LABEL[i.status]}</Badge> },
            {
              key: 'actions',
              label: 'অ্যাকশন',
              render: i => (
                <div className="flex gap-1 justify-end">
                  {i.status === 'PENDING' && (
                    <button
                      onClick={() => onMarkPaid(i)}
                      disabled={pendingId === i.id}
                      className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-700 disabled:opacity-50"
                      title="পরিশোধিত চিহ্নিত করুন"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  )}
                  <Link href={ROUTES.admin.invoiceDetail(i.id)} className="p-2 rounded-lg hover:bg-muted text-foreground" title="দেখুন">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(i)}
                    disabled={pendingId === i.id}
                    className="p-2 rounded-lg hover:bg-rose-100 text-rose-700 disabled:opacity-50"
                    title="মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  )
}

function Stat({ label, value, color, Icon }: { label: string; value: string; color: string; Icon: any }) {
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
