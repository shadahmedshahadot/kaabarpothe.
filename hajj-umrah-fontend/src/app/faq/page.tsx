'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { faqs, faqCategories } from '@/data/faqs'
import { SITE } from '@/constants/site'

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('সব')

  const filtered = faqs.filter(f =>
    (category === 'সব' || f.category === category) &&
    (f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <PageShell>
      <PageHero
        eyebrow="প্রশ্ন আছে?"
        title="সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ।"
        description="বুকিং, ভিসা, পেমেন্ট এবং যাত্রা সম্পর্কে যা যা জানা প্রয়োজন। আপনার উত্তর খুঁজে পাচ্ছেন না? আমাদের সাথে যোগাযোগ করুন।"
      >
        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="প্রশ্নোত্তর অনুসন্ধান করুন..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="!h-14 pl-12 text-base shadow-lg"
          />
        </div>
      </PageHero>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="flex flex-wrap gap-2 mb-10 justify-center"
          >
            {['সব', ...faqCategories].map(c => (
              <motion.button
                key={c}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category === c ? 'bg-foreground text-background' : 'bg-muted text-foreground hover:bg-muted/70'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </motion.div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">আপনার অনুসন্ধানের সাথে কোন প্রশ্নোত্তর মিলেনি।</p>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-10">
              <Accordion>
                {filtered.map(f => (
                  <AccordionItem key={f.id} title={f.question}>{f.answer}</AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <div className="mt-12 bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">এখনও প্রশ্ন আছে?</h3>
            <p className="text-muted-foreground mb-6">আমাদের টিম ২৪/৭ উপলব্ধ। আমরা সাধারণত ২ ঘণ্টার মধ্যে উত্তর দিই।</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/contact" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
                যোগাযোগ করুন
              </a>
              <a href={`tel:${SITE.contact.phoneHref}`} className="inline-flex items-center gap-2 border border-border bg-card text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
                কল করুন {SITE.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
