import { formatCurrency, formatDate } from '@/utils/format'
import { Badge } from '@/components/ui/badge'
import {
  INVOICE_METHOD_LABEL,
  INVOICE_STATUS_LABEL,
  INVOICE_STATUS_TONE,
  type InvoiceDto,
} from '@/redux/fetchres/invoice/invoiceApi'

interface Props {
  invoice: InvoiceDto
}

export function InvoiceView({ invoice }: Props) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 print:border-0 print:rounded-none print:shadow-none print:p-0">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-border">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">INVOICE</p>
          <p className="font-mono text-2xl font-bold text-foreground mt-1">{invoice.invoiceNumber}</p>
          <div className="mt-2">
            <Badge variant={INVOICE_STATUS_TONE[invoice.status]}>{INVOICE_STATUS_LABEL[invoice.status]}</Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">সাকিনাহ হজ্জ ও উমরাহ</p>
          <p className="text-sm text-foreground mt-1">support@sakinah.com</p>
          <p className="text-xs text-muted-foreground">www.sakinah.com</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 py-6 border-b border-border">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">বিল প্রাপক</p>
          <p className="font-semibold text-foreground">{invoice.pilgrimName}</p>
          {invoice.pilgrimEmail && <p className="text-sm text-muted-foreground">{invoice.pilgrimEmail}</p>}
          {invoice.pilgrimPhone && <p className="text-sm text-muted-foreground">{invoice.pilgrimPhone}</p>}
        </div>
        <div className="sm:text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">তারিখসমূহ</p>
          <p className="text-sm text-foreground">ইস্যু: <span className="font-medium">{formatDate(invoice.issueDate)}</span></p>
          <p className="text-sm text-foreground">প্রদেয়: <span className="font-medium">{formatDate(invoice.dueDate)}</span></p>
          {invoice.paidDate && <p className="text-sm text-emerald-600">পরিশোধ: <span className="font-medium">{formatDate(invoice.paidDate)}</span></p>}
          <p className="text-xs text-muted-foreground mt-1 font-mono">বুকিং: {invoice.bookingCode}</p>
        </div>
      </div>

      <div className="py-6 border-b border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="py-2 font-semibold">বিবরণ</th>
              <th className="py-2 font-semibold text-center">কিস্তি</th>
              <th className="py-2 font-semibold text-right">পরিমাণ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="py-3 align-top">
                <p className="font-medium text-foreground">{invoice.description}</p>
                {invoice.packageName && <p className="text-xs text-muted-foreground">{invoice.packageName}</p>}
              </td>
              <td className="py-3 text-center text-sm">
                {invoice.installmentNumber && invoice.installmentsTotal
                  ? `${invoice.installmentNumber} / ${invoice.installmentsTotal}`
                  : '—'}
              </td>
              <td className="py-3 text-right font-semibold">{formatCurrency(invoice.amount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">পেমেন্ট পদ্ধতি</p>
          <p className="text-sm text-foreground font-medium mt-1">{INVOICE_METHOD_LABEL[invoice.method]}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">মোট</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(invoice.amount)}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        <p>ধন্যবাদ। আপনার যাত্রা পবিত্র ও কল্যাণময় হোক।</p>
        <p className="mt-1">কোনো প্রশ্ন থাকলে support@sakinah.com</p>
      </div>
    </div>
  )
}
