'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { useGetBookingsQuery } from '@/redux/fetchres/booking/bookingApi'
import {
  useCreateInvoiceMutation,
  type CreateInvoicePayload,
  type InvoiceMethod,
} from '@/redux/fetchres/invoice/invoiceApi'
import { ROUTES } from '@/constants'

const METHOD_OPTIONS: InvoiceMethod[] = [
  'BANK_TRANSFER', 'CARD', 'BKASH', 'NAGAD', 'SSLCOMMERZ', 'PAYPAL', 'APPLE_PAY', 'KLARNA', 'AFFIRM',
]

export default function AdminInvoiceNewPage() {
  const router = useRouter()
  const { data: bookingResp, isLoading: bookingsLoading } = useGetBookingsQuery({ limit: 200 })
  const [createInvoice, { isLoading: saving }] = useCreateInvoiceMutation()
  const bookings = bookingResp?.data ?? []

  const [form, setForm] = useState<CreateInvoicePayload & { status: 'PENDING' | 'COMPLETED' }>({
    bookingId: '',
    amount: 0,
    method: 'BANK_TRANSFER',
    status: 'PENDING',
    date: new Date().toISOString().slice(0, 10),
    installmentNumber: undefined,
    installmentsTotal: undefined,
  })

  const setField = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(f => ({ ...f, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.bookingId) return toast.error('বুকিং নির্বাচন করুন')
    if (!form.amount || form.amount <= 0) return toast.error('পরিমাণ লিখুন')

    try {
      const res = await createInvoice({
        bookingId: form.bookingId,
        amount: Number(form.amount),
        method: form.method,
        status: form.status,
        date: form.date,
        installmentNumber: form.installmentNumber ? Number(form.installmentNumber) : undefined,
        installmentsTotal: form.installmentsTotal ? Number(form.installmentsTotal) : undefined,
      }).unwrap()
      toast.success('ইনভয়েস তৈরি হয়েছে')
      router.push(ROUTES.admin.invoiceDetail(res.data.id))
    } catch (err: any) {
      toast.error(err?.data?.message || 'তৈরি ব্যর্থ')
    }
  }

  return (
    <>
      <Link href={ROUTES.admin.invoices} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> ইনভয়েস তালিকা
      </Link>

      <PageTitle title="নতুন ইনভয়েস" description="একটি বুকিংয়ের জন্য ইনভয়েস তৈরি করুন।" />

      <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 max-w-2xl space-y-5">
        <Field label="বুকিং *">
          <select
            value={form.bookingId}
            onChange={e => setField('bookingId', e.target.value)}
            disabled={bookingsLoading}
            className="input"
            required
          >
            <option value="">— বুকিং নির্বাচন করুন —</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>
                {b.bookingCode} · {b.pilgrimName} · {b.packageName}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="পরিমাণ (USD) *">
            <input
              type="number"
              min={1}
              step="0.01"
              value={form.amount || ''}
              onChange={e => setField('amount', Number(e.target.value))}
              className="input"
              required
            />
          </Field>
          <Field label="ইস্যু তারিখ">
            <input
              type="date"
              value={form.date}
              onChange={e => setField('date', e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="পেমেন্ট পদ্ধতি">
            <select value={form.method} onChange={e => setField('method', e.target.value as InvoiceMethod)} className="input">
              {METHOD_OPTIONS.map(m => <option key={m} value={m}>{m.replace('_', ' ')}</option>)}
            </select>
          </Field>
          <Field label="অবস্থা">
            <select
              value={form.status}
              onChange={e => setField('status', e.target.value as 'PENDING' | 'COMPLETED')}
              className="input"
            >
              <option value="PENDING">PENDING (অপেক্ষমাণ)</option>
              <option value="COMPLETED">PAID (পরিশোধিত)</option>
            </select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="কিস্তি নম্বর">
            <input
              type="number"
              min={1}
              value={form.installmentNumber ?? ''}
              onChange={e => setField('installmentNumber', e.target.value ? Number(e.target.value) : undefined)}
              className="input"
            />
          </Field>
          <Field label="মোট কিস্তি">
            <input
              type="number"
              min={1}
              value={form.installmentsTotal ?? ''}
              onChange={e => setField('installmentsTotal', e.target.value ? Number(e.target.value) : undefined)}
              className="input"
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href={ROUTES.admin.invoices} className="px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted">
            বাতিল
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            ইনভয়েস তৈরি করুন
          </button>
        </div>
      </form>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          font-size: 0.875rem;
          outline: none;
        }
        :global(.input:focus) { border-color: hsl(var(--primary)); }
      `}</style>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}
