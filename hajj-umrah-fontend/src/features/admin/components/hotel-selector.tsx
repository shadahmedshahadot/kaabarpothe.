'use client'

import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'

import { Select } from '@/components/ui/input'
import { useGetHotelsQuery, type HotelDto } from '@/redux/fetchres/hotel/hotelApi'

export interface SelectedHotelSnapshot {
  hotelMakkahName?: string
  hotelMakkahStars?: number
  hotelMakkahDistance?: string
  hotelMakkahImage?: string
  hotelMadinahName?: string
  hotelMadinahStars?: number
  hotelMadinahDistance?: string
  hotelMadinahImage?: string
}

interface Props {
  city: 'MAKKAH' | 'MADINAH'
  value: {
    name: string
    stars: string | number
    distance: string
    image: string
  }
  onChange: (next: { name: string; stars: string; distance: string; image: string }) => void
}

export function HotelSelector({ city, value, onChange }: Props) {
  const { data, isLoading, isError } = useGetHotelsQuery({ city, status: 'ACTIVE', limit: 100 })

  const hotels = useMemo(() => data?.data ?? [], [data])

  const handleSelect = (id: string) => {
    if (!id) {
      onChange({ name: '', stars: '', distance: '', image: '' })
      return
    }
    const h: HotelDto | undefined = hotels.find(x => x.id === id)
    if (!h) return
    onChange({
      name: h.name,
      stars: String(h.category),
      distance: h.distanceFromHaram,
      image: h.cover,
    })
  }

  // Try to match current value back to a hotel by name (for prefill on edit)
  const selectedId = useMemo(() => {
    if (!value.name) return ''
    return hotels.find(h => h.name === value.name)?.id ?? ''
  }, [hotels, value.name])

  return (
    <div className="space-y-2">
      <Select
        value={selectedId}
        onChange={e => handleSelect(e.target.value)}
        disabled={isLoading}
      >
        <option value="">— হোটেল নির্বাচন করুন —</option>
        {hotels.map(h => (
          <option key={h.id} value={h.id}>
            {h.name} · {h.category}★ · {h.distanceFromHaram}
          </option>
        ))}
      </Select>

      {isLoading && (
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" /> হোটেল লোড হচ্ছে…
        </p>
      )}
      {isError && (
        <p className="text-xs text-rose-500">হোটেল লোড করতে ব্যর্থ হয়েছে।</p>
      )}
      {!isLoading && !isError && hotels.length === 0 && (
        <p className="text-xs text-muted-foreground">
          এই শহরের জন্য কোনো হোটেল নেই।{' '}
          <a href="/admin/hotels/new" className="text-primary underline">
            একটি যোগ করুন
          </a>
        </p>
      )}

      {value.name && (
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          {value.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.image} alt={value.name} className="w-16 h-16 object-cover rounded-lg" />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {value.stars}★ · {value.distance}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
