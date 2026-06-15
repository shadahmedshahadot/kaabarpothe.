import { CreditCard, Download, CheckCircle2 } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { StatCard } from '@/components/ui/stat-card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { payments } from '@/data/payments'

export default function PilgrimPaymentsPage() {
  const my = payments.filter(p => p.bookingId === 'bkg-1001')
  const total = my.reduce((s, p) => s + p.amount, 0)
  return (
    <>
      <PageTitle title="পেমেন্ট ইতিহাস" description={`আপনার বুকিং জুড়ে ${my.length}টি লেনদেন।`} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="মোট পরিশোধিত" value={formatCurrency(total)} icon={<CheckCircle2 className="w-5 h-5" />} index={0} />
        <StatCard label="বকেয়া" value={formatCurrency(0)} icon={<CreditCard className="w-5 h-5" />} index={1} />
        <StatCard label="ফেরত প্রদত্ত" value={formatCurrency(0)} icon={<Download className="w-5 h-5" />} index={2} />
        <StatCard label="পরবর্তী পেমেন্ট" value="—" icon={<CreditCard className="w-5 h-5" />} index={3} />
      </div>

      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {my.map(p => (
          <div key={p.id} className="flex items-center gap-4 p-5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${p.status === 'completed' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">কিস্তি {p.installmentNumber}/{p.installmentsTotal}</p>
              <p className="text-xs text-muted-foreground font-mono">{p.transactionId}</p>
              <p className="text-xs text-muted-foreground">{formatDate(p.date)} · মাধ্যম {p.method}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">{formatCurrency(p.amount)}</p>
              <Badge variant={p.status === 'completed' ? 'success' : 'warning'} className="text-[10px]">{p.status}</Badge>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg" title="রিসিপ্ট ডাউনলোড"><Download className="w-4 h-4 text-muted-foreground" /></button>
          </div>
        ))}
      </div>
    </>
  )
}
