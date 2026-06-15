import { CheckCircle2, XCircle } from 'lucide-react'
import type { Package } from '@/data/packages'

export function InclusionsTab({ pkg }: { pkg: Package }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <InclusionList
        title="অন্তর্ভুক্ত যা আছে"
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
        items={pkg.included}
        bullet={<span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">✓</span>}
      />
      <InclusionList
        title="অন্তর্ভুক্ত নয়"
        icon={<XCircle className="w-6 h-6 text-rose-500" />}
        items={pkg.excluded}
        bullet={<span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 flex items-center justify-center mt-0.5 flex-shrink-0">×</span>}
      />
    </div>
  )
}

function InclusionList({ title, icon, items, bullet }: { title: string; icon: React.ReactNode; items: string[]; bullet: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">{icon} {title}</h2>
      <ul className="space-y-3">
        {items.map(i => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
            {bullet}
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}
