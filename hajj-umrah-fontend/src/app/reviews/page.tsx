'use client'

import { motion } from 'framer-motion'
import { Star, BadgeCheck } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { formatDate } from '@/utils/format'
import { testimonials } from '@/data/testimonials'

export default function ReviewsPage() {
  const ratingCounts = [5, 4, 3, 2, 1].map(r => ({ stars: r, count: testimonials.filter(t => t.rating === r).length }))
  const total = testimonials.length
  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / total

  return (
    <PageShell>
      <PageHero
        eyebrow="হাজীরা কী বলেন"
        title="১২,০০০+ যাচাইকৃত রিভিউ। ৪.৯ গড়।"
        description="এই পৃষ্ঠার প্রতিটি রিভিউ এমন একজন হাজীর কাছ থেকে যিনি আমাদের সাথে তার যাত্রা সম্পন্ন করেছেন। কোন ফিল্টারিং নেই, কোন সম্পাদনা নেই — শুধু সত্যিকারের গল্প।"
      />

      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto bg-card border border-border rounded-3xl p-8 sm:p-12"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center">
              <p className="text-6xl sm:text-7xl font-bold text-foreground mb-3">
                <AnimatedCounter to={avg} decimals={1} />
              </p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 }}
                  >
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground"><AnimatedCounter to={12420} suffix="+" /></span> যাচাইকৃত রিভিউয়ের ভিত্তিতে
              </p>
            </div>

            <div className="space-y-2">
              {ratingCounts.map(({ stars, count }, idx) => {
                const pct = total ? (count / total) * 100 : 0
                return (
                  <motion.div
                    key={stars}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-8 text-foreground font-medium">{stars}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + idx * 0.08, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-amber-500"
                      />
                    </div>
                    <span className="w-10 text-right text-muted-foreground tabular-nums">{count}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  {t.verified && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                      <BadgeCheck className="w-3 h-3" /> যাচাইকৃত
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5 line-clamp-5">{t.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatar} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.location}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatDate(t.date)}</span>
                </div>
                <p className="text-[10px] text-primary uppercase tracking-wider mt-3 font-semibold">{t.packageName}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
