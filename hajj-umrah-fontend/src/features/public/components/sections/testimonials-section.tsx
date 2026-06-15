'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { getFeaturedTestimonials } from '@/data/testimonials'

const items = getFeaturedTestimonials()

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx(i => (i + 1) % items.length)
  const prev = () => setIdx(i => (i - 1 + items.length) % items.length)
  const t = items[idx]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.95_0.05_70_/_0.5),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,oklch(0.92_0.06_150_/_0.3),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="হাজীদের কথা"
          title="যে গল্পগুলো আমাদের এগিয়ে নিয়ে যায়।"
          description="যাচাইকৃত হাজীদের প্রকৃত রিভিউ যারা আমাদের সাথে পবিত্র যাত্রা সম্পন্ন করেছেন।"
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto">
          <Quote className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-24 h-24 text-primary/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-xl shadow-primary/5"
            >
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 font-medium text-balance">
                "{t.content}"
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.avatar} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.location} • {t.packageName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={prev} className="w-10 h-10 rounded-xl bg-muted hover:bg-primary hover:text-white text-foreground transition-colors flex items-center justify-center">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} className="w-10 h-10 rounded-xl bg-foreground hover:bg-primary text-background transition-colors flex items-center justify-center">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1.5 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-primary' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
