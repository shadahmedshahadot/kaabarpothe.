import { Mail, Phone, MessageCircle, AlertCircle } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatRelativeDate } from '@/utils/format'
import { inquiries } from '@/data/inquiries'

const priorityColor = (p: string) => p === 'high' ? 'danger' : p === 'medium' ? 'warning' : 'outline'
const statusColor = (s: string) => s === 'new' ? 'info' : s === 'in-progress' ? 'warning' : s === 'responded' ? 'success' : 'outline'

export default function AdminInquiriesPage() {
  return (
    <>
      <PageTitle
        title="অনুসন্ধান"
        description={`${inquiries.filter(i => i.status === 'new').length} নতুন · ${inquiries.filter(i => i.status === 'in-progress').length} চলমান`}
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Stat label="নতুন" value={inquiries.filter(i => i.status === 'new').length} color="text-sky-600" Icon={Mail} />
        <Stat label="চলমান" value={inquiries.filter(i => i.status === 'in-progress').length} color="text-amber-600" Icon={MessageCircle} />
        <Stat label="উচ্চ অগ্রাধিকার" value={inquiries.filter(i => i.priority === 'high').length} color="text-rose-600" Icon={AlertCircle} />
      </div>

      <div className="space-y-3">
        {inquiries.map(i => (
          <div key={i.id} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 text-primary font-bold flex items-center justify-center flex-shrink-0">
                {i.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <div>
                    <p className="font-semibold text-foreground">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.email} · {i.phone}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Badge variant={priorityColor(i.priority) as any}>{i.priority}</Badge>
                    <Badge variant={statusColor(i.status) as any}>{i.status}</Badge>
                    <Badge variant="outline">{i.type}</Badge>
                  </div>
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{i.subject}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{i.message}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{formatRelativeDate(i.createdDate)}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-muted hover:bg-muted/70 rounded-lg font-semibold text-foreground">উত্তর দিন</button>
                    <button className="px-3 py-1.5 bg-foreground text-background hover:bg-primary rounded-lg font-semibold">বরাদ্দ করুন</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Stat({ label, value, color, Icon }: { label: string; value: number; color: string; Icon: any }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-muted/40 ${color} flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  )
}
