import { CheckCircle2, CreditCard, Clock } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'

const plan = [
  { num: 1, amount: 6750, date: '2025-11-20', status: 'paid' },
  { num: 2, amount: 6750, date: '2025-12-20', status: 'paid' },
  { num: 3, amount: 6750, date: '2026-01-20', status: 'paid' },
  { num: 4, amount: 6748, date: '2026-02-20', status: 'paid' },
]

export default function InstallmentsPage() {
  const total = plan.reduce((s, p) => s + p.amount, 0)
  const paid = plan.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  return (
    <>
      <PageTitle title="কিস্তি পরিকল্পনা" description="HJ-2026-1001 এর জন্য আপনার নির্ধারিত পেমেন্ট।" />

      {/* Progress */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">সামগ্রিক অগ্রগতি</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(paid)} / {formatCurrency(total)}</p>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${(paid / total) * 100}%` }} />
        </div>
        <p className="text-xs text-emerald-700 mt-2 font-semibold">১০০% পরিশোধিত — অগ্রিম হজ্জ মোবারক! 🌙</p>
      </div>

      <div className="space-y-3">
        {plan.map(p => (
          <div key={p.num} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.status === 'paid' ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
              {p.status === 'paid' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">কিস্তি {p.num} / {plan.length}</p>
              <p className="text-xs text-muted-foreground">নির্ধারিত তারিখ {p.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-foreground text-lg">{formatCurrency(p.amount)}</p>
              <Badge variant="success" className="text-[10px]">{p.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
