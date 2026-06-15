import { LineChart } from '@/features/admin/components/chart'

const REVENUE_DATA = [45000, 52000, 48000, 61000, 73000, 89000, 95000, 87000, 102000, 118000, 124000, 142000]
const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']

export function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-foreground">আয়ের প্রবণতা</h3>
          <p className="text-xs text-muted-foreground">গত ১২ মাস</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">আয়</span>
          <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground">বুকিং</span>
        </div>
      </div>
      <LineChart data={REVENUE_DATA} />
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase">
        {MONTHS.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  )
}
