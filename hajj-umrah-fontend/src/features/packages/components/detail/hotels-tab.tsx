import Image from 'next/image'
import { Star, MapPin } from 'lucide-react'
import type { Package } from '@/data/packages'

type Hotel = Package['hotelMakkah']

export function HotelsTab({ pkg }: { pkg: Package }) {
  const hotels: { city: string; hotel: Hotel }[] = [
    { city: 'মক্কা', hotel: pkg.hotelMakkah },
    { city: 'মদিনা', hotel: pkg.hotelMadinah },
  ]
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {hotels.map(({ city, hotel }) => (
        <HotelCard key={city} city={city} hotel={hotel} />
      ))}
    </div>
  )
}

function HotelCard({ city, hotel }: { city: string; hotel: Hotel }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="h-48 relative">
        <Image src={hotel.image} alt={`${hotel.name} — ${city}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 text-sm font-bold text-foreground z-10">
          {city}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">{hotel.name}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> {hotel.distance}</p>
      </div>
    </div>
  )
}
