import Link from 'next/link'
import type { ComponentType } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { formatRelativeDate } from '@/utils/format'
import { ROUTES } from '@/constants'

export interface ActivityItem {
  Icon: ComponentType<{ className?: string }>
  color: string
  text: string
  time: string
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">সাম্প্রতিক কার্যকলাপ</h3>
        <Link href={ROUTES.admin.inquiries} className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1">
          জিজ্ঞাসা <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((a, i) => (
          <div key={i} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors">
            <div className={`w-9 h-9 rounded-xl bg-${a.color}-500/10 text-${a.color}-600 flex items-center justify-center flex-shrink-0`}>
              <a.Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{a.text}</p>
              <p className="text-xs text-muted-foreground">{formatRelativeDate(a.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
