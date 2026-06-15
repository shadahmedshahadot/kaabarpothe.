'use client'

import { motion } from 'framer-motion'
import { Search, FileCheck, CreditCard, Plane } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const steps = [
  { n: '০১', Icon: Search, title: 'প্যাকেজ বেছে নিন', desc: 'বাজেট, তারিখ ও সুবিধা অনুযায়ী আমাদের বাছাইকৃত হজ্জ ও উমরাহ প্যাকেজ ব্রাউজ করুন। পাশাপাশি তুলনা করুন।' },
  { n: '০২', Icon: FileCheck, title: 'রিজার্ভ ও ডকুমেন্ট জমা', desc: '২৫% জমা দিয়ে আপনার জায়গা নিশ্চিত করুন। পাসপোর্ট ও ছবি আপলোড করুন। ভিসা প্রক্রিয়া আমাদের দল সামলায়।' },
  { n: '০৩', Icon: CreditCard, title: 'কিস্তিতে পরিশোধ', desc: 'অবশিষ্ট ব্যালেন্স ২-৬ মাসিক কিস্তিতে ভাগ করুন। অটো-পে বা ম্যানুয়াল — আপনার পছন্দ।' },
  { n: '০৪', Icon: Plane, title: 'আস্থার সাথে যাত্রা', desc: 'আপনার গ্রুপের সাথে দেখা করুন, প্রিমিয়াম কিট নিন এবং আগমন থেকে ফেরা পর্যন্ত সম্পূর্ণ সহায়তায় যাত্রা শুরু করুন।' },
]

export function ProcessSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="কীভাবে কাজ করে"
          title="বুকিং থেকে বোর্ডিং পর্যন্ত চার ধাপে।"
          description="সহজ, স্বচ্ছ প্রক্রিয়া যেন আপনি সবচেয়ে গুরুত্বপূর্ণ বিষয়ে — আপনার আধ্যাত্মিক প্রস্তুতিতে মনোনিবেশ করতে পারেন।"
          className="mb-16"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.svg
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="hidden lg:block absolute top-12 left-0 right-0 h-2 w-full"
            viewBox="0 0 1200 4" preserveAspectRatio="none"
          >
            <motion.path
              d="M0 2 L1200 2"
              stroke="oklch(0.62 0.16 70)"
              strokeWidth="2"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </motion.svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white shadow-lg shadow-primary/25"
                  >
                    <s.Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-3xl font-bold text-muted-foreground/30 tabular-nums">{s.n}</span>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
