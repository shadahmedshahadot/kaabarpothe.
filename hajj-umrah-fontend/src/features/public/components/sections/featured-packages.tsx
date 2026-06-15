'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { PackageCard } from '@/components/ui/package-card'
import { packages } from '@/data/packages'

export function FeaturedPackages() {
  const [tab, setTab] = useState<'all' | 'hajj' | 'umrah'>('all')
  const list = packages.filter(p => p.featured).filter(p => tab === 'all' || p.type === tab).slice(0, 6)

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="বাছাইকৃত প্রস্থান"
            title="আপনার মতো হাজীদের পছন্দের প্যাকেজ।"
            description="বাজেট উমরাহ থেকে ভিআইপি হজ্জ — প্রতিটি প্যাকেজ আমাদের আলেম পর্যালোচনা বোর্ড দ্বারা যাচাইকৃত।"
            align="left"
            className="!max-w-2xl !mx-0"
          />

          <div className="inline-flex p-1 bg-card border border-border rounded-xl self-start">
            {(['all', 'umrah', 'hajj'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab === t && (
                  <motion.span layoutId="featured-tab" className="absolute inset-0 bg-muted rounded-lg" transition={{ type: 'spring', bounce: 0.2 }} />
                )}
                <span className="relative z-10">{t === 'all' ? 'সব' : t === 'umrah' ? 'উমরাহ' : 'হজ্জ'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/packages/umrah"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-xl font-semibold hover:bg-primary transition-colors group"
          >
            সব প্যাকেজ দেখুন
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
