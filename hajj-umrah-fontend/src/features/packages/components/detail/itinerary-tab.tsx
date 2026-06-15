'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { Package } from '@/data/packages'

export function ItineraryTab({ pkg }: { pkg: Package }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">দিনভিত্তিক ভ্রমণসূচি</h2>
      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
        <div className="space-y-6">
          {pkg.itinerary.map(day => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative pl-14"
            >
              <div className="absolute left-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-amber-500 text-white font-bold flex items-center justify-center shadow-lg">
                {day.day}
              </div>
              <div className="bg-muted/40 rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-1">{day.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{day.description}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {day.activities.map(a => (
                    <li key={a} className="flex items-start gap-2 text-xs text-foreground/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
