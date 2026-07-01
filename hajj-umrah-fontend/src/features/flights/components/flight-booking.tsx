'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Plane } from 'lucide-react'
import { type Flight, flightTotal } from '@/data/flights'
import { useCartStore } from '@/redux/cart'
import { ROUTES } from '@/constants'

export function FlightBooking({ flight }: { flight: Flight }) {
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    addItem({
      kind: 'flight',
      refId: flight.id,
      title: `${flight.airlineName} ${flight.flightNumber}`,
      subtitle: `${flight.departureCity} → ${flight.arrivalCity} · ${flight.departureDate}`,
      meta: {
        cabinClass: flight.cabinClass,
        baggage: flight.baggageAllowance,
        departureDate: flight.departureDate,
        departureTime: flight.departureTime,
        arrivalDate: flight.arrivalDate,
        arrivalTime: flight.arrivalTime,
        totalDuration: flight.totalDuration,
      },
      unitPrice: flightTotal(flight),
      qty: 1,
      image: '',
    })

    router.replace(ROUTES.booking.root)
  }, [addItem, flight, router])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary inline-flex items-center justify-center mb-4">
          <Plane className="w-6 h-6" />
        </div>
        <p className="text-lg font-bold text-foreground">আপনার বুকিংয়ে ফ্লাইট যোগ করা হচ্ছে…</p>
        <p className="text-sm text-muted-foreground mt-1">কেন্দ্রীয় চেকআউটে নিয়ে যাওয়া হচ্ছে।</p>
      </div>
    </div>
  )
}
