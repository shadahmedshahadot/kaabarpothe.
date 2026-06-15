'use client'

import { useMemo, useState } from 'react'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { Select } from '@/components/ui/input'
import { type Hotel } from '@/data/hotels'
import { HotelCard } from './hotel-card'

export function HotelListing({ hotels }: { hotels: Hotel[] }) {
  const [city, setCity] = useState<string>('all')
  const [stars, setStars] = useState<string>('all')
  const [sort, setSort] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended')

  const filtered = useMemo(() => {
    let list = [...hotels.filter(h => h.status === 'active')]
    if (city !== 'all') list = list.filter(h => h.city === city)
    if (stars !== 'all') list = list.filter(h => h.category === Number(stars))
    if (sort === 'price-asc') list.sort((a, b) => a.pricePerNight - b.pricePerNight)
    else if (sort === 'price-desc') list.sort((a, b) => b.pricePerNight - a.pricePerNight)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.bookingsCount - a.bookingsCount)
    return list
  }, [hotels, city, stars, sort])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span> টি হোটেল উপলব্ধ
          </p>
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার:
            </div>
            <Select value={city} onChange={e => setCity(e.target.value)} className="w-auto min-w-[120px]">
              <option value="all">সকল শহর</option>
              <option value="Makkah">মক্কা</option>
              <option value="Madinah">মদিনা</option>
            </Select>
            <Select value={stars} onChange={e => setStars(e.target.value)} className="w-auto min-w-[120px]">
              <option value="all">যেকোনো রেটিং</option>
              <option value="3">৩-স্টার</option>
              <option value="4">৪-স্টার</option>
              <option value="5">৫-স্টার</option>
            </Select>
            <Select value={sort} onChange={e => setSort(e.target.value as typeof sort)} className="w-auto min-w-[160px]">
              <option value="recommended">প্রস্তাবিত</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
              <option value="rating">সর্বোচ্চ রেটেড</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>আপনার ফিল্টারের সাথে কোনো হোটেল মেলেনি।</p>
          </div>
        )}
      </div>
    </section>
  )
}
