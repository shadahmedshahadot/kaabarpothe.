'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessagesSquare } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-foreground via-foreground to-primary/30"
        >
          {/* Decorative */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
              <defs>
                <radialGradient id="cta-g" cx="80%" cy="20%">
                  <stop offset="0%" stopColor="oklch(0.62 0.16 70)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="oklch(0.62 0.16 70)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="600" height="300" fill="url(#cta-g)" />
              <pattern id="cta-p" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="white" opacity="0.3" />
              </pattern>
              <rect width="600" height="300" fill="url(#cta-p)" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-12 gap-8 items-center p-10 sm:p-16">
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 mb-4">যাত্রা শুরু করুন</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-5 text-balance">
                আলেমের সাথে কথা বলুন।<br />
                <span className="text-amber-400">আস্থার সাথে</span> বুক করুন।
              </h2>
              <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                আমাদের আলেম দলের সাথে ১৫-মিনিটের পরামর্শ আপনাকে সঠিক প্যাকেজ বেছে নিতে, ডকুমেন্ট প্রস্তুত করতে এবং আপনার আধ্যাত্মিক যাত্রা পরিকল্পনায় সাহায্য করে।
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="/packages/umrah"
                className="inline-flex items-center justify-between gap-3 bg-gradient-to-r from-primary to-amber-500 text-primary-foreground px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] transition-all group"
              >
                <span className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5" />
                  প্যাকেজ দেখুন
                </span>
                <span className="text-xs opacity-80">শুরু →</span>
              </Link>

              <Link href="/contact" className="inline-flex items-center justify-between gap-3 bg-white/10 backdrop-blur text-white border border-white/20 px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-colors">
                <span className="flex items-center gap-3"><MessagesSquare className="w-5 h-5" /> ফ্রি ১৫-মিনিট পরামর্শ</span>
                <span className="text-xs opacity-80">বুক →</span>
              </Link>

              <a href="tel:+8801700000000" className="inline-flex items-center justify-between gap-3 text-white/80 px-6 py-3 rounded-2xl hover:text-white transition-colors">
                <span className="flex items-center gap-3"><Phone className="w-4 h-4" /> +৮৮০ ১৭০০-০০০০০০</span>
                <span className="text-xs">২৪/৭</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
