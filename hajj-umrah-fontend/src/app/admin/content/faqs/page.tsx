import { Plus, Edit, Trash2 } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { faqs, faqCategories } from '@/data/faqs'

export default function AdminFAQsPage() {
  return (
    <>
      <PageTitle
        title="প্রশ্নোত্তর"
        description={`${faqCategories.length} ক্যাটাগরিতে ${faqs.length} প্রশ্ন`}
        action={
          <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors">
            <Plus className="w-4 h-4" /> প্রশ্নোত্তর যোগ করুন
          </button>
        }
      />

      <div className="space-y-8">
        {faqCategories.map(cat => {
          const items = faqs.filter(f => f.category === cat)
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
                  {cat} <Badge variant="outline">{items.length}</Badge>
                </h2>
                <button className="text-xs text-primary font-semibold hover:underline">+ {cat} এ যোগ করুন</button>
              </div>
              <div className="bg-card border border-border rounded-2xl divide-y divide-border">
                {items.map(f => (
                  <div key={f.id} className="p-5 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground mb-1">{f.question}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{f.answer}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button className="p-1.5 hover:bg-muted rounded"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                        <button className="p-1.5 hover:bg-muted rounded text-rose-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
