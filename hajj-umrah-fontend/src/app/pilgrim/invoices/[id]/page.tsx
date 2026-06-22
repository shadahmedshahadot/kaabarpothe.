'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Printer, Loader2 } from 'lucide-react'
import { useGetInvoiceQuery } from '@/redux/fetchres/invoice/invoiceApi'
import { ROUTES } from '@/constants'
import { InvoiceView } from '@/features/invoices/components/invoice-view'

export default function PilgrimInvoiceDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const { data, isLoading, isError } = useGetInvoiceQuery(id!, { skip: !id })
  const invoice = data?.data

  return (
    <>
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link href={ROUTES.pilgrim.invoices} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> ইনভয়েস তালিকা
        </Link>
        {invoice && (
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"
          >
            <Printer className="w-4 h-4" /> প্রিন্ট / PDF
          </button>
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

      {invoice && <InvoiceView invoice={invoice} />}
    </>
  )
}
