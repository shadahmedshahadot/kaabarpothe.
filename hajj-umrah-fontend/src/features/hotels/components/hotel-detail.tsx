'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, MapPin, BedDouble, Utensils, Wifi, ShieldCheck, ArrowRight, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { type Hotel, hotelNights } from '@/data/hotels'
import { useCartStore } from '@/store/cart'
import { ROUTES } from '@/constants'

export function HotelDetail({ hotel }: { hotel: Hotel }) {
  const router = useRouter()
  const [activeImg, setActiveImg] = useState(hotel.cover)
  const [roomId, setRoomId] = useState(hotel.roomTypes[0].id)
  const nights = hotelNights(hotel)
  const addItem = useCartStore(s => s.addItem)

  const room = hotel.roomTypes.find(r => r.id === roomId) ?? hotel.roomTypes[0]

  const handleAdd = () => {
    addItem({
      kind: 'hotel',
      refId: hotel.id,
      title: hotel.name,
      subtitle: `${hotel.city} · ${room.name}`,
      meta: {
        roomTypeId: room.id,
        roomTypeName: room.name,
        nights,
        pricePerNight: room.pricePerNight,
      },
      unitPrice: room.pricePerNight * nights,
      qty: 1,
      image: hotel.cover,
    })
    router.push(ROUTES.booking.root)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href={ROUTES.home} className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href={ROUTES.hotels.root} className="hover:text-foreground">Hotels</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{hotel.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-border">
                <Image src={activeImg} alt={hotel.name} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" priority />
                <div className="absolute top-4 left-4 flex gap-2">
                  {hotel.featured && <Badge variant="default">Featured</Badge>}
                  <Badge variant={hotel.city === 'Makkah' ? 'accent' : 'secondary'}>{hotel.city}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {hotel.images.map(img => (
                  <button
                    key={img}
                    onClick={() => setActiveImg(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${img === activeImg ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  >
                    <Image src={img} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: hotel.category }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{hotel.category}-Star Hotel</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{hotel.name}</h1>
              <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5 mb-4">
                <MapPin className="w-4 h-4 text-primary" /> {hotel.address} · {hotel.distanceFromHaram}
              </p>
              <p className="text-base text-foreground/80 leading-relaxed">{hotel.description}</p>
            </div>

            <Section title="Room types" icon={BedDouble}>
              <div className="space-y-3">
                {hotel.roomTypes.map(rt => (
                  <label
                    key={rt.id}
                    className={`flex items-start gap-4 border rounded-2xl p-4 cursor-pointer transition-colors ${rt.id === roomId ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}
                  >
                    <input
                      type="radio"
                      name="room"
                      value={rt.id}
                      checked={rt.id === roomId}
                      onChange={() => setRoomId(rt.id)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1 grid sm:grid-cols-[1fr_auto] gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{rt.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Up to {rt.capacity} guests · {rt.available} available · {rt.board.replace('-', ' ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">{formatCurrency(rt.pricePerNight)}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">per night</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </Section>

            <Section title="Facilities" icon={Wifi}>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                {hotel.facilities.map(f => (
                  <div key={f} className="flex items-center gap-2 text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Meal information" icon={Utensils}>
              <p className="text-sm text-foreground/80">{hotel.meals}</p>
            </Section>

            <Section title="Availability" icon={Calendar}>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <Row label="Check-in" value={formatDate(hotel.checkInDate)} />
                <Row label="Check-out" value={formatDate(hotel.checkOutDate)} />
                <Row label="Total nights" value={`${nights} nights`} />
                <Row label="Total rooms" value={hotel.totalRooms.toLocaleString()} />
              </div>
            </Section>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{room.name}</p>
                  <p className="text-4xl font-bold text-foreground leading-none mt-1">{formatCurrency(room.pricePerNight)}</p>
                  <p className="text-xs text-muted-foreground mt-1">per night · {room.board.replace('-', ' ')}</p>
                </div>
                <Badge variant="success">{room.available} left</Badge>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 mb-5 pt-4 border-t border-border">
                <div className="flex justify-between"><span>{nights} nights × {formatCurrency(room.pricePerNight)}</span><span className="font-medium text-foreground">{formatCurrency(room.pricePerNight * nights)}</span></div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Add to booking <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-muted-foreground text-center mt-3 inline-flex items-center gap-1.5 justify-center w-full">
                <ShieldCheck className="w-3 h-3" /> Book independently or combine with flights & transport
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-5">
              <h3 className="font-bold text-foreground mb-3 text-sm">Trusted by pilgrims</h3>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-2xl font-bold text-foreground">{hotel.rating}</p>
                  <p className="text-xs text-muted-foreground">{hotel.reviewsCount.toLocaleString()} reviews</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{hotel.bookingsCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">past stays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" /> {title}
      </h2>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}
