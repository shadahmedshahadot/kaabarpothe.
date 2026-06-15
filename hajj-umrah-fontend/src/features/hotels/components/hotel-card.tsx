'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, MapPin, Utensils, ArrowRight, BedDouble } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { type Hotel } from '@/data/hotels'

export function HotelCard({ hotel, index = 0 }: { hotel: Hotel; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-card rounded-3xl border border-border hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow overflow-hidden"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }} className="absolute inset-0">
          <Image
            src={hotel.cover}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {hotel.featured && <Badge variant="default">Featured</Badge>}
          <Badge variant={hotel.city === 'Makkah' ? 'accent' : 'secondary'}>{hotel.city}</Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <div className="flex items-center gap-0.5 mb-1.5">
            {Array.from({ length: hotel.category }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h3 className="text-lg font-bold leading-tight drop-shadow">{hotel.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-3">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{hotel.distanceFromHaram}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[40px]">{hotel.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
          <div className="flex items-center gap-1.5 text-foreground/70">
            <BedDouble className="w-3.5 h-3.5 text-primary" /> {hotel.roomTypes.length} room types
          </div>
          <div className="flex items-center gap-1.5 text-foreground/70">
            <Utensils className="w-3.5 h-3.5 text-accent" /> {hotel.meals.split('·')[0].trim()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(hotel.pricePerNight)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">per night · from</p>
          </div>
          <motion.div whileHover={{ scale: 1.04, x: 2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={`/hotels/${hotel.slug}`}
              className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              View details <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
