import { Download, FileText } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'

const invoices = [
  { id: 'INV-2026-0001', booking: 'HJ-2026-1001', amount: 6750, date: '2025-11-20', desc: 'প্রিমিয়াম হজ্জ ২০২৬ — কিস্তি ১' },
  { id: 'INV-2026-0024', booking: 'HJ-2026-1001', amount: 6750, date: '2025-12-20', desc: 'প্রিমিয়াম হজ্জ ২০২৬ — কিস্তি ২' },
  { id: 'INV-2026-0089', booking: 'HJ-2026-1001', amount: 6750, date: '2026-01-20', desc: 'প্রিমিয়াম হজ্জ ২০২৬ — কিস্তি ৩' },
  { id: 'INV-2026-0142', booking: 'HJ-2026-1001', amount: 6748, date: '2026-02-20', desc: 'প্রিমিয়াম হজ্জ ২০২৬ — কিস্তি ৪ (চূড়ান্ত)' },
]

export default function InvoicesPage() {
  return (
    <>
      <PageTitle title="ইনভয়েস" description="আপনার রেকর্ডের জন্য ইনভয়েস ও রিসিপ্ট ডাউনলোড করুন।" />

      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {invoices.map(i => (
          <div key={i.id} className="flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono font-semibold text-foreground text-sm">{i.id}</p>
              <p className="text-xs text-muted-foreground">{i.desc}</p>
              <p className="text-xs text-muted-foreground">{formatDate(i.date)} · {i.booking}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-foreground">{formatCurrency(i.amount)}</p>
              <Badge variant="success" className="text-[10px]">পরিশোধিত</Badge>
            </div>
            <button className="px-3 py-2 bg-foreground text-background rounded-lg text-xs font-semibold hover:bg-primary inline-flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> PDF</button>
          </div>
        ))}
      </div>
    </>
  )
}
