'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Check, Loader2, Printer, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
  useMarkInvoicePaidMutation,
  useUpdateInvoiceMutation,
  INVOICE_METHOD_LABEL,
  type InvoiceMethod,
} from '@/redux/fetchres/invoice/invoiceApi'
import { ROUTES } from '@/constants'
import { InvoiceView } from '@/features/invoices/components/invoice-view'

const METHOD_OPTIONS: InvoiceMethod[] = [
  'BANK_TRANSFER', 'CARD', 'BKASH', 'NAGAD', 'SSLCOMMERZ', 'PAYPAL', 'APPLE_PAY', 'KLARNA', 'AFFIRM',
]

export default function AdminInvoiceDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params?.id

  const { data, isLoading, isError } = useGetInvoiceQuery(id!, { skip: !id })
  const invoice = data?.data

  const [updateInvoice, { isLoading: updating }] = useUpdateInvoiceMutation()
  const [markPaid, { isLoading: marking }] = useMarkInvoicePaidMutation()
  const [deleteInvoice, { isLoading: deleting }] = useDeleteInvoiceMutation()

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<{ amount: number; method: InvoiceMethod; status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'; date: string }>({
    amount: 0,
    method: 'BANK_TRANSFER',
    status: 'PENDING',
    date: '',
  })

  const startEdit = () => {
    if (!invoice) return
    setForm({
      amount: invoice.amount,
      method: invoice.method,
      status: invoice.rawStatus,
      date: invoice.issueDate.slice(0, 10),
    })
    setEditing(true)
  }

  const onSave = async () => {
    if (!invoice) return
    try {
      await updateInvoice({ id: invoice.id, body: form }).unwrap()
      toast.success('সংরক্ষিত')
      setEditing(false)
    } catch (err: any) {
      toast.error(err?.data?.message || 'সংরক্ষণ ব্যর্থ')
    }
  }

  const onMarkPaid = async () => {
    if (!invoice) return
    try {
      await markPaid(invoice.id).unwrap()
      toast.success('পরিশোধিত হিসাবে চিহ্নিত')
    } catch (err: any) {
      toast.error(err?.data?.message || 'আপডেট ব্যর্থ')
    }
  }

  const onDelete = async () => {
    if (!invoice) return
    if (!confirm(`ইনভয়েস "${invoice.invoiceNumber}" মুছবেন?`)) return
    try {
      await deleteInvoice(invoice.id).unwrap()
      toast.success('মুছে ফেলা হয়েছে')
      router.push(ROUTES.admin.invoices)
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ')
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
        <Link href={ROUTES.admin.invoices} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> তালিকায় ফিরে যান
        </Link>
        {invoice && (
          <div className="flex flex-wrap gap-2">
            {invoice.status === 'PENDING' && (
              <button
                onClick={onMarkPaid}
                disabled={marking}
                className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-emerald-700 disabled:opacity-60"
              >
                {marking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                পরিশোধিত চিহ্নিত
              </button>
            )}
            <button
              onClick={() => (editing ? setEditing(false) : startEdit())}
              className="px-3 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted"
            >
              {editing ? 'বাতিল' : 'সম্পাদনা'}
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-2 bg-foreground text-background rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"
            >
              <Printer className="w-4 h-4" /> প্রিন্ট
            </button>
            <button
              onClick={onDelete}
              disabled={deleting}
              className="px-3 py-2 border border-rose-200 text-rose-700 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-rose-50 disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" /> মুছুন
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="bg-card border border-border rounded-2xl p-8 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> লোড হচ্ছে…
        </div>
      )}

      {isError && (
        <div className="bg-card border border-rose-200 rounded-2xl p-8 text-center text-sm text-rose-600">
          ইনভয়েস পাওয়া যায়নি।
        </div>
      )}

      {invoice && editing && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 print:hidden">
          <p className="text-sm font-semibold text-foreground mb-4">সম্পাদনা</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">পরিমাণ</span>
              <input
                type="number"
                min={1}
                step="0.01"
                value={form.amount || ''}
                onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">তারিখ</span>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">পদ্ধতি</span>
              <select
                value={form.method}
                onChange={e => setForm(f => ({ ...f, method: e.target.value as InvoiceMethod }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                {METHOD_OPTIONS.map(m => <option key={m} value={m}>{INVOICE_METHOD_LABEL[m]}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">অবস্থা</span>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as typeof form.status }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED (PAID)</option>
                <option value="FAILED">FAILED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <button
              onClick={onSave}
              disabled={updating}
              className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-60"
            >
              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              সংরক্ষণ
            </button>
          </div>
        </div>
      )}

      {invoice && <InvoiceView invoice={invoice} />}
    </>
  )
}
