'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plane, Clock, Briefcase, Utensils, Users, Calendar, MapPin, CheckCircle2, ArrowRight, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { type Flight, flightTotal } from '@/data/flights'
import { useCartStore } from '@/store/cart'
import { ROUTES } from '@/constants'

export function FlightDetail({ flight }: { flight: Flight }) {
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)
  const total = flightTotal(flight)
  const nonStop = flight.transits.length === 0
  const seatPct = ((flight.seatsTotal - flight.seatsAvailable) / flight.seatsTotal) * 100

  const handleAdd = () => {
    addItem({
      kind: 'flight',
      refId: flight.id,
      title: `${flight.airlineName} ${flight.flightNumber}`,
      subtitle: `${flight.departureCity} → ${flight.arrivalCity} · ${flight.departureDate}`,
      meta: {
        cabinClass: flight.cabinClass,
        baggage: flight.baggageAllowance,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        totalDuration: flight.totalDuration,
      },
      unitPrice: total,
      qty: 1,
      image: '',
    })
    router.push(ROUTES.booking.root)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href={ROUTES.home} className="hover:text-foreground">হোম</Link>
          <span>/</span>
          <Link href={ROUTES.flights.root} className="hover:text-foreground">ফ্লাইট</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{flight.flightNumber}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card border border-border rounded-3xl p-8"
            >
              <div className="flex items-start justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-lg font-bold flex items-center justify-center shadow-lg">
                    {flight.airlineLogo}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{flight.airlineName}</h1>
                    <p className="text-sm text-muted-foreground">ফ্লাইট {flight.flightNumber} · <span className="capitalize">{flight.cabinClass.replace('-', ' ')}</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {flight.featured && <Badge variant="default">বৈশিষ্ট্যযুক্ত</Badge>}
                  <Badge variant={nonStop ? 'success' : 'outline'}>{nonStop ? 'সরাসরি' : `${flight.transits.length}টি স্টপ`}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 mb-8">
                <div>
                  <p className="text-4xl font-bold text-foreground leading-none">{flight.departureTime}</p>
                  <p className="text-sm font-semibold text-foreground mt-2">{flight.departureCity}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{flight.departureAirport}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{flight.departureDate}</p>
                </div>
                <div className="flex flex-col items-center text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> {flight.totalDuration}
                  </div>
                  <div className="w-32 h-px bg-border my-2 relative">
                    <Plane className="w-4 h-4 text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-full p-0.5" />
                  </div>
                  <span className="text-xs">{flight.transitDuration}</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-foreground leading-none">{flight.arrivalTime}</p>
                  <p className="text-sm font-semibold text-foreground mt-2">{flight.arrivalCity}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{flight.arrivalAirport}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{flight.arrivalDate}</p>
                </div>
              </div>

              {flight.transits.length > 0 && (
                <div className="rounded-2xl border border-border bg-muted/30 p-5">
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> লেওভার
                  </h3>
                  <div className="space-y-2">
                    {flight.transits.map((t, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-semibold text-foreground">{t.city}</p>
                          <p className="text-xs text-muted-foreground">{t.airport}</p>
                        </div>
                        <Badge variant="outline">{t.duration} লেওভার</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <Section title="অন্তর্ভুক্ত যা আছে" icon={CheckCircle2}>
              <div className="grid sm:grid-cols-2 gap-3">
                <Item icon={Briefcase} label="ব্যাগেজ অ্যালাউন্স" value={flight.baggageAllowance} />
                <Item icon={Utensils} label="বোর্ডে খাবার" value={flight.mealInfo} />
                <Item icon={Users} label="কেবিন ক্লাস" value={<span className="capitalize">{flight.cabinClass.replace('-', ' ')}</span>} />
                <Item icon={Calendar} label="বুকিং স্ট্যাটাস" value={<span className="capitalize">{flight.bookingStatus}</span>} />
              </div>
            </Section>

            <Section title="শিডিউল বিস্তারিত" icon={Calendar}>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <Row label="প্রস্থানের বিমানবন্দর" value={flight.departureAirport} />
                <Row label="আগমনের বিমানবন্দর" value={flight.arrivalAirport} />
                <Row label="মোট যাত্রা" value={flight.totalDuration} />
                <Row label="ট্রানজিট তথ্য" value={flight.transitDuration} />
              </div>
            </Section>

            {flight.notes && (
              <Section title="নোট" icon={Info}>
                <p className="text-sm text-foreground/80 leading-relaxed">{flight.notes}</p>
              </Section>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-end justify-between mb-4">
                <div>
                  {flight.discount > 0 && (
                    <p className="text-sm text-muted-foreground line-through">{formatCurrency(flight.price + flight.taxes)}</p>
                  )}
                  <p className="text-4xl font-bold text-foreground leading-none">{formatCurrency(total)}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">জন প্রতি</p>
                </div>
                {flight.discount > 0 && <Badge variant="danger">সাশ্রয় {formatCurrency(flight.discount)}</Badge>}
              </div>

              <div className="text-xs text-muted-foreground space-y-1 mb-5 pt-4 border-t border-border">
                <div className="flex justify-between"><span>মূল ভাড়া</span><span>{formatCurrency(flight.price)}</span></div>
                <div className="flex justify-between"><span>কর ও ফি</span><span>{formatCurrency(flight.taxes)}</span></div>
                {flight.discount > 0 && <div className="flex justify-between text-emerald-700"><span>ছাড়</span><span>−{formatCurrency(flight.discount)}</span></div>}
              </div>

              <div className="rounded-xl bg-muted/40 p-3 mb-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">অবশিষ্ট সিট</span>
                  <span className="font-semibold text-foreground">{flight.seatsAvailable} / {flight.seatsTotal}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${seatPct}%` }} />
                </div>
              </div>

              {flight.bookingStatus === 'soldout' ? (
                <button disabled className="w-full bg-muted text-muted-foreground py-3 rounded-xl font-semibold text-sm cursor-not-allowed">
                  বিক্রি শেষ — ওয়েটলিস্টে যুক্ত হোন
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  বুকিংয়ে যুক্ত করুন <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <p className="text-[11px] text-muted-foreground text-center mt-3">
                আলাদা ফ্লাইট অথবা হোটেল ও পরিবহনের সাথে একত্রিত করুন।
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="font-bold text-foreground mb-3 text-sm">হাজীদের বিশ্বস্ত</h3>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-2xl font-bold text-foreground">{flight.rating}</p>
                  <p className="text-xs text-muted-foreground">{flight.reviewsCount}টি রিভিউ</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{flight.bookingsCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">পূর্ববর্তী বুকিং</p>
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

function Item({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-3">
      <Icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground font-medium">{value}</p>
      </div>
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
