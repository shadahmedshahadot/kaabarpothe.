'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

import { SectionHeading } from '@/components/ui/section-heading'
import { PackageCard } from '@/components/ui/package-card'
import { useGetPackagesQuery } from '@/redux/fetchres/package/packageApi'
import { adaptPackage } from '@/redux/fetchres/package/adapter'

export function FeaturedPackages() {
  const [tab, setTab] = useState<'all' | 'hajj' | 'umrah'>('all')
  const { data, isLoading, isError } = useGetPackagesQuery({ featured: true, limit: 12 })

  const list = useMemo(() => {
    const all = (data?.data ?? []).map(adaptPackage)
    return all.filter(p => tab === 'all' || p.type === tab).slice(0, 6)
  }, [data, tab])

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
                className={`relative px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="featured-tab"
                    className="absolute inset-0 bg-muted rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">
                  {t === 'all' ? 'সব' : t === 'umrah' ? 'উমরাহ' : 'হজ্জ'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-rose-500">
            প্যাকেজ লোড করতে ব্যর্থ হয়েছে। সার্ভার চালু আছে কি?
          </div>
        )}

        {!isLoading && !isError && list.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">কোন প্যাকেজ পাওয়া যায়নি।</div>
        )}

        {!isLoading && !isError && list.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}

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
