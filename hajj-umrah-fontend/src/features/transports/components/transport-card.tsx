'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Users, MapPin, ArrowRight, Bus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { type Transport, TRANSPORT_TYPES } from '@/data/transports'

const typeLabel = (t: Transport['type']) => TRANSPORT_TYPES.find(x => x.value === t)?.label ?? t

export function TransportCard({ transport, index = 0 }: { transport: Transport; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-card rounded-3xl border border-border hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0">
          <Image src={transport.cover} alt={transport.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          {transport.featured && <Badge variant="default">Featured</Badge>}
          <Badge variant="outline" className="bg-card/90">{typeLabel(transport.type)}</Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-foreground mb-2 leading-tight">{transport.name}</h3>

        <div className="space-y-1.5 text-xs text-foreground/70 mb-4">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{transport.pickupLocation} → {transport.dropoffLocation}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent" /> {transport.travelDuration}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-secondary" /> up to {transport.capacity}</span>
            <span className="inline-flex items-center gap-1.5 capitalize"><Bus className="w-3.5 h-3.5 text-muted-foreground" /> {transport.vehicleType.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(transport.price)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{transport.pricingUnit.replace('-', ' ')}</p>
          </div>
          <motion.div whileHover={{ scale: 1.04, x: 2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={`/transportation/${transport.slug}`}
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
