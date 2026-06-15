import { Accordion, AccordionItem } from '@/components/ui/accordion'
import type { Package } from '@/data/packages'

export function FAQTab({ pkg }: { pkg: Package }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h2>
      <Accordion>
        {pkg.faqs.map(f => (
          <AccordionItem key={f.q} title={f.q}>{f.a}</AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
