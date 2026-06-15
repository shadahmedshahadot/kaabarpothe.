'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Clock, Users, MapPin, ArrowRight } from 'lucide-react'
import { Badge } from './badge'
import { formatCurrency } from '@/utils/format'
import type { Package } from '@/data/packages'

export function PackageCard({ pkg, index = 0 }: { pkg: Package; index?: number }) {
  const discountedPrice = pkg.price - pkg.discount
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/40 shadow-sm hover:shadow-2xl hover:shadow-primary/15 transition-shadow"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={pkg.cover}
            alt={pkg.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={index < 3}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {pkg.featured && <Badge variant="default">বৈশিষ্ট্যযুক্ত</Badge>}
          <Badge variant={pkg.type === 'hajj' ? 'accent' : 'secondary'}>{pkg.type.toUpperCase()}</Badge>
        </div>
        {pkg.discount > 0 && (
          <motion.div
            initial={{ rotate: -8, scale: 0 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 + 0.3, type: 'spring', stiffness: 200 }}
            className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10"
          >
            সাশ্রয় {formatCurrency(pkg.discount)}
          </motion.div>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white z-10">
          <div>
            <p className="text-xs opacity-90 mb-0.5">{pkg.duration} দিন</p>
            <h3 className="text-xl font-bold leading-tight drop-shadow">{pkg.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur rounded-full px-2.5 py-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold">{pkg.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">{pkg.shortDescription}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="flex items-center gap-2 text-foreground/70"><Clock className="w-4 h-4 text-primary" /> {pkg.duration} দিন</div>
          <div className="flex items-center gap-2 text-foreground/70"><Users className="w-4 h-4 text-accent" /> {pkg.groupSize}</div>
          <div className="flex items-center gap-2 text-foreground/70 col-span-2"><MapPin className="w-4 h-4 text-secondary" /> {pkg.hotelMakkah.distance}</div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            {pkg.discount > 0 && <p className="text-xs text-muted-foreground line-through">{formatCurrency(pkg.price)}</p>}
            <p className="text-2xl font-bold text-foreground">{formatCurrency(discountedPrice)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">জন প্রতি</p>
          </div>
          <motion.div whileHover={{ scale: 1.04, x: 2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={`/packages/${pkg.type}/${pkg.slug}`}
              className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors group/btn"
            >
              বিস্তারিত দেখুন
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
