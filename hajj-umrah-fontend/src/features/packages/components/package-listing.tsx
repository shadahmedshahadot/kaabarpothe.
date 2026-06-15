'use client'

import { useState, useMemo } from 'react'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { PackageCard } from '@/components/ui/package-card'
import { Select } from '@/components/ui/input'
import type { Package, PackageType } from '@/data/packages'

interface Props {
  packages: Package[]
  type: PackageType
}

export function PackageListing({ packages, type }: Props) {
  const [sort, setSort] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')
  const [tier, setTier] = useState<string>('all')
  const [duration, setDuration] = useState<string>('all')

  const filtered = useMemo(() => {
    let list = [...packages]
    if (tier !== 'all') list = list.filter(p => p.tier === tier)
    if (duration !== 'all') {
      const [min, max] = duration.split('-').map(Number)
      list = list.filter(p => p.duration >= min && (!max || p.duration <= max))
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - a.discount - (b.price - b.discount))
    else if (sort === 'price-desc') list.sort((a, b) => b.price - b.discount - (a.price - a.discount))
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else list.sort((a, b) => b.bookingsCount - a.bookingsCount)
    return list
  }, [packages, sort, tier, duration])

  const tierOptions = type === 'hajj' ? ['economy', 'standard', 'premium', 'vip'] : ['budget', 'economy', 'premium', 'luxury']

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span>টি প্যাকেজ পাওয়া গেছে
          </p>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার:
            </div>
            <Select value={tier} onChange={e => setTier(e.target.value)} className="w-auto min-w-[140px]">
              <option value="all">সব টিয়ার</option>
              {tierOptions.map(t => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
            </Select>
            <Select value={duration} onChange={e => setDuration(e.target.value)} className="w-auto min-w-[140px]">
              <option value="all">যেকোনো সময়কাল</option>
              <option value="5-9">৫-৯ দিন</option>
              <option value="10-14">১০-১৪ দিন</option>
              <option value="15-25">১৫+ দিন</option>
            </Select>
            <Select value={sort} onChange={e => setSort(e.target.value as any)} className="w-auto min-w-[160px]">
              <option value="popular">সবচেয়ে জনপ্রিয়</option>
              <option value="price-asc">মূল্য: কম থেকে বেশি</option>
              <option value="price-desc">মূল্য: বেশি থেকে কম</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>আপনার ফিল্টারের সাথে কোনো প্যাকেজ মেলেনি।</p>
          </div>
        )}
      </div>
    </section>
  )
}
