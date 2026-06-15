'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plane, Clock, Users, ArrowRight, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { type Flight, flightTotal } from '@/data/flights'
import { ROUTES } from '@/constants'

export function FlightCard({ flight, index = 0 }: { flight: Flight; index?: number }) {
  const total = flightTotal(flight)
  const nonStop = flight.transits.length === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-3xl border border-border hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              {flight.airlineLogo}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground truncate">{flight.airlineName}</p>
              <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {flight.featured && <Badge variant="default">Featured</Badge>}
            <Badge variant={nonStop ? 'success' : 'outline'} className="capitalize">
              {nonStop ? 'Non-stop' : `${flight.transits.length} stop`}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-5">
          <div>
            <p className="text-2xl font-bold text-foreground leading-none">{flight.departureTime}</p>
            <p className="text-xs text-muted-foreground mt-1">{flight.departureCity}</p>
            <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider mt-0.5">{flight.departureDate}</p>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
              <Clock className="w-3 h-3" /> {flight.totalDuration}
            </div>
            <div className="w-24 h-px bg-border my-1.5 relative">
              <Plane className="w-3.5 h-3.5 text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-full p-0.5" />
            </div>
            <span className="text-[10px] text-muted-foreground/80">{flight.transitDuration}</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground leading-none">{flight.arrivalTime}</p>
            <p className="text-xs text-muted-foreground mt-1">{flight.arrivalCity}</p>
            <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider mt-0.5">{flight.arrivalDate}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-foreground/70 mb-5 pb-5 border-b border-border">
          <span className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-primary" /> {flight.baggageAllowance.split('+')[0].trim()}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-accent" /> {flight.seatsAvailable} seats</span>
          <span className="capitalize inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> {flight.cabinClass.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {flight.discount > 0 && <p className="text-xs text-muted-foreground line-through">{formatCurrency(flight.price + flight.taxes)}</p>}
            <p className="text-2xl font-bold text-foreground">{formatCurrency(total)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Per passenger</p>
          </div>
          <motion.div whileHover={{ scale: 1.04, x: 2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={ROUTES.flights.detail(flight.slug)}
              className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Select flight
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
