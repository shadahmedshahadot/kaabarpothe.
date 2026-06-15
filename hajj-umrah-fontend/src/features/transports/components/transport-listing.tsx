'use client'

import { useMemo, useState } from 'react'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { Select } from '@/components/ui/input'
import { type Transport, TRANSPORT_TYPES } from '@/data/transports'
import { TransportCard } from './transport-card'

export function TransportListing({ transports }: { transports: Transport[] }) {
  const [type, setType] = useState<string>('all')
  const [sort, setSort] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended')

  const filtered = useMemo(() => {
    let list = [...transports.filter(t => t.status === 'active')]
    if (type !== 'all') list = list.filter(t => t.type === type)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.bookingsCount - a.bookingsCount)
    return list
  }, [transports, type, sort])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span> services available
          </p>
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> Filters:
            </div>
            <Select value={type} onChange={e => setType(e.target.value)} className="w-auto min-w-[160px]">
              <option value="all">All types</option>
              {TRANSPORT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </Select>
            <Select value={sort} onChange={e => setSort(e.target.value as typeof sort)} className="w-auto min-w-[160px]">
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => <TransportCard key={t.id} transport={t} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>No transportation services match your filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
