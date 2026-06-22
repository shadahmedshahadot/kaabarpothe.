import { FileCheck, Upload, Download } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/format'
import { getPilgrim } from '@/data/pilgrims'

export default function PilgrimDocumentsPage() {
  const me = getPilgrim('p-001')
  const documents = me?.documents ?? []
  return (
    <>
      <PageTitle title="ডকুমেন্ট" description="আপনার ভ্রমণ ডকুমেন্ট আপলোড, যাচাই ও ডাউনলোড করুন।" action={<button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"><Upload className="w-4 h-4" /> ডকুমেন্ট আপলোড</button>} />

      {documents.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
          কোনো ডকুমেন্ট নেই।
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {documents.map(d => (
          <div key={d.type} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${d.status === 'verified' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{d.type}</p>
                <p className="text-xs text-muted-foreground">{d.uploadedDate ? `আপলোড ${formatDate(d.uploadedDate)}` : 'এখনো আপলোড করা হয়নি'}</p>
              </div>
              <Badge variant={d.status === 'verified' ? 'success' : 'warning'} className="text-[10px]">{d.status}</Badge>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 border border-border py-2 rounded-lg text-xs font-semibold hover:bg-muted inline-flex items-center justify-center gap-1"><Download className="w-3.5 h-3.5" /> ডাউনলোড</button>
              <button className="flex-1 border border-border py-2 rounded-lg text-xs font-semibold hover:bg-muted inline-flex items-center justify-center gap-1"><Upload className="w-3.5 h-3.5" /> প্রতিস্থাপন</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
